import type { DietaryId } from '../content/dietary.ts';
import { menuDietaryCoverage, orderedMenus, type CateringMenu, type ServiceStyle } from '../content/menus.ts';
import { zoneById, type ZoneId } from '../content/zones.ts';

export interface MenuFilterCriteria {
  /** Desired guest count, or null when unset. */
  guests: number | null;
  /** Dietary marks that must each be covered by at least one dish on the menu. */
  dietary: readonly DietaryId[];
  /** Selected delivery zone ID, or '' for any zone. */
  zone: ZoneId | '';
  /** Selected service style, or 'any'. */
  serviceStyle: ServiceStyle | 'any';
}

export interface MenuFinderResult {
  /** IDs of menus that match all criteria. */
  matchingIds: Set<string>;
  /** Menus ordered with matching available menus first, then dimmed non-matching, then out-of-season. */
  ordered: CateringMenu[];
  /** Count of matching menus. */
  matchCount: number;
  /** Count of currently available (in-season) menus. */
  availableCount: number;
  /** Optional contextual notice, e.g. when Zone 4 is combined with drop-off. */
  notice: string | null;
}

export const defaultCriteria: MenuFilterCriteria = {
  guests: null,
  dietary: [],
  zone: '',
  serviceStyle: 'any',
};

/** Compute the effective minimum guest count for a menu in an optional zone. */
export function effectiveMinGuests(menu: CateringMenu, zoneId: ZoneId | ''): number {
  if (!zoneId) return menu.minGuests;
  const zone = zoneById.get(zoneId);
  return zone ? Math.max(menu.minGuests, zone.minGuests) : menu.minGuests;
}

/** Check whether a single menu satisfies all filter criteria. */
export function menuMatchesCriteria(menu: CateringMenu, criteria: MenuFilterCriteria): boolean {
  // Unavailable / out-of-season menus never match.
  if (!menu.available) return false;

  const selectedZone = criteria.zone ? zoneById.get(criteria.zone) : undefined;

  if (selectedZone) {
    if (!menu.zones.includes(selectedZone.id)) return false;
    if (selectedZone.staffedOnly) {
      if (criteria.serviceStyle === 'drop-off') return false;
      if (!menu.serviceStyles.includes('staffed')) return false;
    }
  }

  if (criteria.serviceStyle !== 'any' && !menu.serviceStyles.includes(criteria.serviceStyle)) {
    return false;
  }

  if (criteria.guests !== null && Number.isFinite(criteria.guests) && criteria.guests > 0) {
    const min = effectiveMinGuests(menu, criteria.zone);
    if (criteria.guests < min || criteria.guests > menu.maxGuests) {
      return false;
    }
  }

  if (criteria.dietary.length > 0) {
    const coverage = new Set(menuDietaryCoverage(menu));
    for (const need of criteria.dietary) {
      if (!coverage.has(need)) return false;
    }
  }

  return true;
}

/** Filter and order menus according to the finder criteria. */
export function filterMenus(
  allMenus: readonly CateringMenu[],
  criteria: MenuFilterCriteria,
): MenuFinderResult {
  const baseOrder = orderedMenus(allMenus);
  const availableCount = baseOrder.filter(m => m.available).length;
  const selectedZone = criteria.zone ? zoneById.get(criteria.zone) : undefined;

  let notice: string | null = null;
  if (selectedZone?.staffedOnly && criteria.serviceStyle === 'drop-off') {
    notice = `${selectedZone.name} is staffed events only — drop-off delivery is not available in this zone.`;
  }

  const matching: CateringMenu[] = [];
  const nonMatchingAvailable: CateringMenu[] = [];
  const unavailable: CateringMenu[] = [];

  for (const menu of baseOrder) {
    if (!menu.available) {
      unavailable.push(menu);
    } else if (menuMatchesCriteria(menu, criteria)) {
      matching.push(menu);
    } else {
      nonMatchingAvailable.push(menu);
    }
  }

  return {
    matchingIds: new Set(matching.map(m => m.id)),
    ordered: [...matching, ...nonMatchingAvailable, ...unavailable],
    matchCount: matching.length,
    availableCount,
    notice,
  };
}

/** Parse URLSearchParams into validated MenuFilterCriteria. */
export function criteriaFromSearchParams(params: URLSearchParams): MenuFilterCriteria {
  const guestsRaw = params.get('guests');
  const parsedGuests = guestsRaw ? Number.parseInt(guestsRaw, 10) : NaN;
  const guests = Number.isFinite(parsedGuests) && parsedGuests > 0 ? parsedGuests : null;

  const validDietary = new Set<DietaryId>(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free']);
  const dietaryParam = params.get('dietary') ?? '';
  const dietary = dietaryParam
    .split(',')
    .map(s => s.trim())
    .filter((s): s is DietaryId => validDietary.has(s as DietaryId));

  const zoneRaw = params.get('zone') ?? '';
  const zone: ZoneId | '' = zoneById.has(zoneRaw as ZoneId) ? (zoneRaw as ZoneId) : '';

  const serviceRaw = params.get('service') ?? '';
  const serviceStyle: ServiceStyle | 'any' =
    serviceRaw === 'drop-off' || serviceRaw === 'staffed' ? serviceRaw : 'any';

  return { guests, dietary, zone, serviceStyle };
}

/** Serialise MenuFilterCriteria to a query string (without leading ?). */
export function criteriaToQueryString(criteria: MenuFilterCriteria): string {
  const params = new URLSearchParams();
  if (criteria.guests !== null && criteria.guests > 0) params.set('guests', String(criteria.guests));
  if (criteria.dietary.length > 0) params.set('dietary', criteria.dietary.join(','));
  if (criteria.zone) params.set('zone', criteria.zone);
  if (criteria.serviceStyle !== 'any') params.set('service', criteria.serviceStyle);
  return params.toString();
}
