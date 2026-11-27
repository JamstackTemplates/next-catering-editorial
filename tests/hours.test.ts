import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('Saffron & Linen office hours in Europe/London handle Friday close, Saturday and BST switches', () => {
  assert.doesNotThrow(() => validateHours(business.officeHours));
  const officeAt = (iso: string) => openingLabel(business.officeHours, 'Europe/London', new Date(iso));

  // Friday 2026-11-20 (GMT = UTC+0): 17:29 open, 17:30 closed until Monday 09:00
  assert.equal(officeAt('2026-11-20T17:29:00Z'), 'Open now · until 17:30');
  assert.equal(officeAt('2026-11-20T17:30:00Z'), 'Closed · opens Monday at 09:00');

  // Saturday 2026-11-21 closed
  assert.equal(officeAt('2026-11-21T12:00:00Z'), 'Closed · opens Monday at 09:00');

  // UK springs forward to BST (UTC+1) on Sunday 2026-03-29: Monday 2026-03-30 08:00Z is 09:00 BST
  assert.equal(officeAt('2026-03-30T07:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(officeAt('2026-03-30T08:00:00Z'), 'Open now · until 17:30');
  assert.equal(officeAt('2026-03-30T16:29:00Z'), 'Open now · until 17:30');
  assert.equal(officeAt('2026-03-30T16:30:00Z'), 'Closed · opens Tuesday at 09:00');

  // UK falls back to GMT (UTC+0) on Sunday 2026-10-25: Monday 2026-10-26 09:00Z is 09:00 GMT
  assert.equal(officeAt('2026-10-26T08:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(officeAt('2026-10-26T09:00:00Z'), 'Open now · until 17:30');
  assert.equal(officeAt('2026-10-26T17:29:00Z'), 'Open now · until 17:30');
  assert.equal(officeAt('2026-10-26T17:30:00Z'), 'Closed · opens Tuesday at 09:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
});
