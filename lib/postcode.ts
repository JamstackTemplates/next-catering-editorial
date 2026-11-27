import { deliveryZones, type DeliveryZone } from '../content/zones.ts';

export type PostcodeLookupResult =
  | {
      status: 'matched';
      outward: string;
      zone: DeliveryZone;
    }
  | {
      status: 'outside';
      outward: string;
      message: string;
    }
  | {
      status: 'empty';
      outward: '';
      message: string;
    };

export const OUTSIDE_AREA_MESSAGE =
  'Outside our usual areas — tell us the postcode in your enquiry and we will see what we can do.';

/**
 * Normalise user postcode input into an uppercase UK outward code.
 * Examples: "se1" -> "SE1", "N16 7AB" -> "N16", "SW1A 1AA" -> "SW1A", "GU14AZ" -> "GU1".
 */
export function normaliseOutwardCode(input: string): string {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, ' ');
  if (!cleaned) return '';

  // If whitespace is present, take the outward part before the first space.
  if (cleaned.includes(' ')) {
    return cleaned.split(' ')[0].replace(/[^A-Z0-9]/g, '');
  }

  const compact = cleaned.replace(/[^A-Z0-9]/g, '');
  // If a full UK postcode was entered without a space (e.g. "N167AB"), strip the 3-char inward code.
  if (compact.length >= 5 && /\d[A-Z]{2}$/.test(compact)) {
    return compact.slice(0, -3);
  }
  return compact;
}

/**
 * Look up a UK postcode or outward district against our four delivery zones.
 * Checks exact districts in Zones 1 and 2 first, then postcode area prefixes for Zones 3 and 4.
 */
export function lookupPostcode(
  input: string,
  zones: readonly DeliveryZone[] = deliveryZones,
): PostcodeLookupResult {
  const outward = normaliseOutwardCode(input);
  if (!outward) {
    return { status: 'empty', outward: '', message: 'Enter a postcode district such as SE1, N16 or GU1.' };
  }

  // Must look like a UK outward code: 1-2 letters followed by 1-2 digits and optional letter (e.g. SE1, EC1A, N16).
  const match = /^([A-Z]{1,2})(\d{1,2})([A-Z])?$/.exec(outward);
  if (!match) {
    return { status: 'outside', outward, message: OUTSIDE_AREA_MESSAGE };
  }

  const area = match[1];
  const districtWithoutSubLetter = `${match[1]}${match[2]}`;

  // 1. Exact district match in Zone 1 (central) and Zone 2 (inner).
  for (const zoneId of ['central', 'inner'] as const) {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) continue;
    if (zone.districts.includes(outward) || zone.districts.includes(districtWithoutSubLetter)) {
      return { status: 'matched', outward, zone };
    }
  }

  // 2. Fallback area match in Zone 3 (outer London) and Zone 4 (Home Counties).
  for (const zoneId of ['outer', 'home-counties'] as const) {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) continue;
    if (zone.districts.includes(area)) {
      return { status: 'matched', outward, zone };
    }
  }

  return { status: 'outside', outward, message: OUTSIDE_AREA_MESSAGE };
}
