import assert from 'node:assert/strict';
import { test } from 'node:test';
import { menus } from '../content/menus.ts';
import {
  criteriaFromSearchParams,
  criteriaToQueryString,
  defaultCriteria,
  effectiveMinGuests,
  filterMenus,
} from '../lib/menu-finder.ts';

test('effective minimum guests is the larger of menu and zone minimums', () => {
  const workingLunch = menus.find(m => m.id === 'working-lunch')!;
  const reception = menus.find(m => m.id === 'reception-canapes')!;

  assert.equal(effectiveMinGuests(workingLunch, 'central'), 10);
  assert.equal(effectiveMinGuests(workingLunch, 'outer'), 20);
  assert.equal(effectiveMinGuests(reception, 'outer'), 30);
  assert.equal(effectiveMinGuests(reception, 'home-counties'), 60);
});

test('25 guests + vegan + Zone 2 returns exactly Long-Table Feast, Working Lunch and Breakfast Meeting', () => {
  const result = filterMenus(menus, {
    guests: 25,
    dietary: ['vegan'],
    zone: 'inner',
    serviceStyle: 'any',
  });
  assert.deepEqual(
    [...result.matchingIds].sort(),
    ['breakfast-meeting', 'long-table-feast', 'working-lunch'],
  );
  assert.equal(result.matchCount, 3);
  assert.equal(result.matchingIds.has('garden-party'), false);
});

test('unavailable garden party never matches any filter combination', () => {
  const unfiltered = filterMenus(menus, defaultCriteria);
  assert.equal(unfiltered.matchingIds.has('garden-party'), false);
  assert.equal(unfiltered.ordered[unfiltered.ordered.length - 1].id, 'garden-party');

  const staffedOutdoor = filterMenus(menus, {
    guests: 80,
    dietary: ['vegetarian'],
    zone: 'outer',
    serviceStyle: 'staffed',
  });
  assert.equal(staffedOutdoor.matchingIds.has('garden-party'), false);
});

test('Zone 4 + drop-off returns no menus and explains Zone 4 is staffed events only', () => {
  const result = filterMenus(menus, {
    guests: 80,
    dietary: [],
    zone: 'home-counties',
    serviceStyle: 'drop-off',
  });
  assert.equal(result.matchCount, 0);
  assert.ok(result.notice && /staffed events only/i.test(result.notice));
});

test('40 guests + Zone 3 + staffed includes Bowl Food', () => {
  const result = filterMenus(menus, {
    guests: 40,
    dietary: [],
    zone: 'outer',
    serviceStyle: 'staffed',
  });
  assert.ok(result.matchingIds.has('bowl-food'));
});

test('filter criteria round-trip cleanly through URL search params', () => {
  const criteria = {
    guests: 45,
    dietary: ['vegan', 'gluten-free'] as const,
    zone: 'inner' as const,
    serviceStyle: 'staffed' as const,
  };
  const qs = criteriaToQueryString(criteria);
  const parsed = criteriaFromSearchParams(new URLSearchParams(qs));
  assert.deepEqual(parsed, criteria);
});
