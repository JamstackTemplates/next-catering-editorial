import assert from 'node:assert/strict';
import { test } from 'node:test';
import { lookupPostcode, normaliseOutwardCode, OUTSIDE_AREA_MESSAGE } from '../lib/postcode.ts';

test('normalises lowercase, full postcodes and compact codes to outward district', () => {
  assert.equal(normaliseOutwardCode('se1'), 'SE1');
  assert.equal(normaliseOutwardCode('  N16 7AB '), 'N16');
  assert.equal(normaliseOutwardCode('N167AB'), 'N16');
  assert.equal(normaliseOutwardCode('SW1A 1AA'), 'SW1A');
});

test('maps representative postcodes to Zones 1–4 and outside areas', () => {
  const se1 = lookupPostcode('se1');
  assert.equal(se1.status, 'matched');
  assert.equal(se1.zone.id, 'central');

  const n16 = lookupPostcode('N16 7AB');
  assert.equal(n16.status, 'matched');
  assert.equal(n16.zone.id, 'inner');

  const e17 = lookupPostcode('E17');
  assert.equal(e17.status, 'matched');
  assert.equal(e17.zone.id, 'outer');

  const gu1 = lookupPostcode('GU1');
  assert.equal(gu1.status, 'matched');
  assert.equal(gu1.zone.id, 'home-counties');

  const bs1 = lookupPostcode('BS1');
  assert.equal(bs1.status, 'outside');
  assert.equal(bs1.message, OUTSIDE_AREA_MESSAGE);
});

test('central London sub-districts like SW1A and EC1A still match Zone 1', () => {
  const sw1a = lookupPostcode('SW1A 1AA');
  assert.equal(sw1a.status, 'matched');
  assert.equal(sw1a.zone.id, 'central');

  const ec1a = lookupPostcode('EC1A');
  assert.equal(ec1a.status, 'matched');
  assert.equal(ec1a.zone.id, 'central');
});
