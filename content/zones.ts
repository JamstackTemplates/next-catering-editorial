/** Delivery zone identifier referenced by menus and the postcode checker. */
export type ZoneId = 'central' | 'inner' | 'outer' | 'home-counties';

export interface DeliveryZone {
  /** Stable URL-safe zone identifier. */
  id: ZoneId;
  /** Short zone number label for tables and maps (e.g. "Zone 1"). */
  shortName: string;
  /** Display name including area title. */
  name: string;
  /** Plain-English summary of coverage for tables and prose. */
  summary: string;
  /**
   * Explicit UK postcode outward districts (Zones 1–2) or postcode area prefixes (Zone 3–4).
   * Districts in Zones 1–2 must be unique across zones and valid outward codes.
   */
  districts: readonly string[];
  /** Human-readable district coverage string for tables. */
  districtsDisplay: string;
  /** Delivery fee in integer GBP pence. */
  deliveryFeePence: number;
  /** Whether staffed service is available in this zone. */
  staffedAvailable: boolean;
  /** True when drop-off is not offered in this zone (staffed events only). */
  staffedOnly: boolean;
  /** Minimum guest count for deliveries to this zone. */
  minGuests: number;
  /** Extra notice days required on top of a menu's base lead time. */
  extraLeadDays: number;
}

export const deliveryZones: readonly DeliveryZone[] = [
  {
    id: 'central',
    shortName: 'Zone 1',
    name: 'Zone 1 · Central',
    summary: 'The City, West End, South Bank and Bermondsey — ten minutes from our arches.',
    districts: ['EC1', 'EC2', 'EC3', 'EC4', 'WC1', 'WC2', 'W1', 'SW1', 'SE1', 'E1'],
    districtsDisplay: 'EC1–EC4, WC1, WC2, W1, SW1, SE1, E1',
    deliveryFeePence: 2500,
    staffedAvailable: true,
    staffedOnly: false,
    minGuests: 10,
    extraLeadDays: 0,
  },
  {
    id: 'inner',
    shortName: 'Zone 2',
    name: 'Zone 2 · Inner London',
    summary: 'Islington, Camden, Hackney, Canary Wharf, Brixton, Clapham and Kensington.',
    districts: [
      'N1', 'N5', 'N7', 'N16',
      'NW1', 'NW3', 'NW5',
      'E2', 'E3', 'E8', 'E14',
      'SE5', 'SE11', 'SE15', 'SE16',
      'SW4', 'SW8', 'SW9',
      'W2', 'W11',
    ],
    districtsDisplay: 'N1, N5, N7, N16, NW1, NW3, NW5, E2, E3, E8, E14, SE5, SE11, SE15, SE16, SW4, SW8, SW9, W2, W11',
    deliveryFeePence: 4000,
    staffedAvailable: true,
    staffedOnly: false,
    minGuests: 10,
    extraLeadDays: 0,
  },
  {
    id: 'outer',
    shortName: 'Zone 3',
    name: 'Zone 3 · Outer London',
    summary: 'All other London postcode districts inside the M25.',
    districts: ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'],
    districtsDisplay: 'Every other E, EC, N, NW, SE, SW, W and WC district inside the M25',
    deliveryFeePence: 6500,
    staffedAvailable: true,
    staffedOnly: false,
    minGuests: 20,
    extraLeadDays: 1,
  },
  {
    id: 'home-counties',
    shortName: 'Zone 4',
    name: 'Zone 4 · Home Counties',
    summary: 'Country houses, barns and studios across Surrey, Kent, Sussex, Hertfordshire, Essex, Berkshire and Buckinghamshire.',
    districts: ['GU', 'KT', 'RH', 'TN', 'ME', 'AL', 'SG', 'CM', 'RG', 'SL', 'HP'],
    districtsDisplay: 'GU, KT, RH, TN, ME, AL, SG, CM, RG, SL, HP postcode areas',
    deliveryFeePence: 12000,
    staffedAvailable: true,
    staffedOnly: true,
    minGuests: 60,
    extraLeadDays: 3,
  },
];

export const zoneById: ReadonlyMap<ZoneId, DeliveryZone> = new Map(
  deliveryZones.map(zone => [zone.id, zone]),
);

/** Format a delivery fee in GBP (whole pounds when pence is 00, otherwise £X.XX). */
export function formatFee(pence: number): string {
  const pounds = pence / 100;
  return pence % 100 === 0 ? `£${pounds.toFixed(0)}` : `£${pounds.toFixed(2)}`;
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const outwardDistrictPattern = /^[A-Z]{1,2}\d[A-Z\d]?$/;
const areaPrefixPattern = /^[A-Z]{1,2}$/;

export function validateZones(zones: readonly DeliveryZone[] = deliveryZones): void {
  const seenIds = new Set<string>();
  const seenExplicitDistricts = new Map<string, string>();

  for (const zone of zones) {
    if (!zone.id || !slugPattern.test(zone.id)) {
      throw new Error(`zones.${zone.id || '(missing)'}: id must be a URL-safe slug`);
    }
    if (seenIds.has(zone.id)) {
      throw new Error(`zones.${zone.id}: duplicate id`);
    }
    seenIds.add(zone.id);

    if (!zone.name.trim()) throw new Error(`zones.${zone.id}.name: required`);
    if (!zone.summary.trim()) throw new Error(`zones.${zone.id}.summary: required`);
    if (!Number.isInteger(zone.deliveryFeePence) || zone.deliveryFeePence < 0 || zone.deliveryFeePence >= 100000) {
      throw new Error(`zones.${zone.id}.deliveryFeePence: must be a non-negative integer under 100000 pence`);
    }
    if (!Number.isInteger(zone.minGuests) || zone.minGuests < 1 || zone.minGuests > 500) {
      throw new Error(`zones.${zone.id}.minGuests: must be between 1 and 500`);
    }
    if (!Number.isInteger(zone.extraLeadDays) || zone.extraLeadDays < 0) {
      throw new Error(`zones.${zone.id}.extraLeadDays: must be a non-negative integer`);
    }
    if (!zone.districts.length) {
      throw new Error(`zones.${zone.id}.districts: at least one district or postcode area is required`);
    }

    const isExplicitDistrictZone = zone.id === 'central' || zone.id === 'inner';
    for (const district of zone.districts) {
      if (isExplicitDistrictZone) {
        if (!outwardDistrictPattern.test(district)) {
          throw new Error(`zones.${zone.id}.districts: "${district}" is not a valid UK outward postcode district`);
        }
        const existing = seenExplicitDistricts.get(district);
        if (existing) {
          throw new Error(`zones.${zone.id}.districts: "${district}" is already assigned to zone "${existing}"`);
        }
        seenExplicitDistricts.set(district, zone.id);
      } else if (!areaPrefixPattern.test(district)) {
        throw new Error(`zones.${zone.id}.districts: "${district}" must be a 1–2 letter UK postcode area prefix`);
      }
    }
  }
}
