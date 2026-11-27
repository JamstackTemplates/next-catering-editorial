import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { dietaryMarks, validateDietary } from '../content/dietary.ts';
import { menuDietaryCoverage, menus, validateMenus } from '../content/menus.ts';
import { deliveryZones, validateZones } from '../content/zones.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'issueLine', 'kitchenLocation', 'allergenStatement'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 5, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('dietary, delivery zones and menus pass validation', () => {
  assert.doesNotThrow(() => validateDietary(dietaryMarks));
  assert.doesNotThrow(() => validateZones(deliveryZones));
  assert.doesNotThrow(() => validateMenus(menus));
});

test('menu validation rejects invalid prices, guest bounds, references and missing availability notes with item names', () => {
  const sample = menus[0];

  assert.throws(
    () => validateMenus([sample, { ...sample, number: '99' }]),
    /reception-canapes.*duplicate menu id/,
  );
  assert.throws(
    () => validateMenus([{ ...sample, pricePerHeadPence: 25000 }]),
    /reception-canapes\.pricePerHeadPence/,
  );
  assert.throws(
    () => validateMenus([{ ...sample, minGuests: 50, maxGuests: 20 }]),
    /reception-canapes\.minGuests\/maxGuests/,
  );
  assert.throws(
    () => validateMenus([{ ...sample, leadTimeDays: 0 }]),
    /reception-canapes\.leadTimeDays/,
  );
  assert.throws(
    () => validateMenus([{ ...sample, serviceStyles: [] }]),
    /reception-canapes\.serviceStyles/,
  );
  assert.throws(
    () => validateMenus([{ ...sample, zones: ['mars' as never] }]),
    /reception-canapes\.zones.*mars/,
  );
  assert.throws(
    () => validateMenus([{ ...sample, available: false, availabilityNote: '' }]),
    /reception-canapes\.availabilityNote/,
  );
  assert.throws(
    () =>
      validateMenus([
        {
          ...sample,
          dishes: [{ name: 'Mystery dish', dietary: ['keto' as never] }],
        },
      ]),
    /reception-canapes\.dishes\["Mystery dish"\]\.dietary.*keto/,
  );
});

test('zone validation rejects duplicate or malformed districts in Zones 1–2', () => {
  const duplicateDistrict = deliveryZones.map(z =>
    z.id === 'inner' ? { ...z, districts: [...z.districts, 'SE1'] } : z,
  );
  assert.throws(() => validateZones(duplicateDistrict), /zones\.inner\.districts.*SE1.*central/);

  const badDistrict = deliveryZones.map(z =>
    z.id === 'central' ? { ...z, districts: ['NOT-A-POSTCODE'] } : z,
  );
  assert.throws(() => validateZones(badDistrict), /zones\.central\.districts.*NOT-A-POSTCODE/);
});

test('vegan dishes also count toward vegetarian coverage on a menu', () => {
  const workingLunch = menus.find(m => m.id === 'working-lunch')!;
  const veganOnlyMenu = {
    ...workingLunch,
    dishes: [{ name: 'Herb salad', dietary: ['vegan' as const] }],
  };
  const coverage = menuDietaryCoverage(veganOnlyMenu);
  assert.ok(coverage.includes('vegan'));
  assert.ok(coverage.includes('vegetarian'));
});

test('structured data emits FoodEstablishment with London SE1 only and derived menus', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'FoodEstablishment');
  assert.deepEqual(data.servesCuisine, ['Modern British', 'Middle Eastern', 'Mediterranean']);
  assert.equal(data.priceRange, '££–£££');
  assert.equal(data.address.addressLocality, 'London');
  assert.equal(data.address.postalCode, 'SE1');
  assert.equal('streetAddress' in data.address, false);
  assert.equal(data.areaServed.length, deliveryZones.length);
  assert.equal(data.hasMenu.hasMenuSection.length, menus.filter(m => m.available).length);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('allergen statement is wired into Menus and The Kitchen and copy obeys enquiry wording rules', () => {
  const menusSource = readFileSync(new URL('../app/menus/page.tsx', import.meta.url), 'utf8');
  const kitchenSource = readFileSync(new URL('../app/kitchen/page.tsx', import.meta.url), 'utf8');
  assert.ok(menusSource.includes('business.allergenStatement'), 'Menus page must include allergen statement');
  assert.ok(kitchenSource.includes('business.allergenStatement'), 'Kitchen page must include allergen statement');

  const copyFiles = [
    '../app/page.tsx',
    '../app/menus/page.tsx',
    '../app/delivery/page.tsx',
    '../app/kitchen/page.tsx',
    '../app/contact/page.tsx',
    '../content/business.ts',
  ];
  const forbidden = /\b(book now|order now|confirmed booking|checkout|reserve now)\b/i;
  for (const file of copyFiles) {
    const text = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.equal(forbidden.test(text), false, `${file} contains forbidden booking/order wording`);
  }
});
