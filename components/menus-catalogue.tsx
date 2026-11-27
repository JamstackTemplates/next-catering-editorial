'use client';

import { useEffect, useMemo, useState } from 'react';
import { dietaryMarks, type DietaryId } from '../content/dietary';
import {
  formatPricePerHead,
  formatPriceShort,
  formatServiceStyles,
  menuDietaryCoverage,
  type CateringMenu,
  type ServiceStyle,
} from '../content/menus';
import { deliveryZones, zoneById, type ZoneId } from '../content/zones';
import {
  criteriaFromSearchParams,
  criteriaToQueryString,
  defaultCriteria,
  effectiveMinGuests,
  filterMenus,
  type MenuFilterCriteria,
} from '../lib/menu-finder';
import { MenuVignette, SaffronRibbon } from './artwork';
import { EditorialCornerMarks, RunningStitchDivider } from './dividers';
import {
  CalendarLeafIcon,
  DietaryRoundel,
  DropOffCrateIcon,
  GuestsSettingIcon,
  StaffedTrayIcon,
} from './icons';
import { SiteLink } from './site-link';

export function MenusCatalogue({ allMenus }: { allMenus: readonly CateringMenu[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [criteria, setCriteria] = useState<MenuFilterCriteria>(defaultCriteria);

  // Hydrate filter state from URL query string on mount (shareable links).
  useEffect(() => {
    setHydrated(true);
    const params = new URLSearchParams(window.location.search);
    const parsed = criteriaFromSearchParams(params);
    if (
      parsed.guests !== null ||
      parsed.dietary.length > 0 ||
      parsed.zone !== '' ||
      parsed.serviceStyle !== 'any'
    ) {
      setCriteria(parsed);
    }
  }, []);

  // Mirror state to URL query string whenever criteria changes after hydration.
  useEffect(() => {
    if (!hydrated) return;
    const qs = criteriaToQueryString(criteria);
    const nextUrl = qs ? `${window.location.pathname}?${qs}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, '', nextUrl);
  }, [criteria, hydrated]);

  const result = useMemo(() => filterMenus(allMenus, criteria), [allMenus, criteria]);
  const hasActiveFilters =
    criteria.guests !== null ||
    criteria.dietary.length > 0 ||
    criteria.zone !== '' ||
    criteria.serviceStyle !== 'any';

  function toggleDietary(id: DietaryId) {
    setCriteria(prev => ({
      ...prev,
      dietary: prev.dietary.includes(id)
        ? prev.dietary.filter(x => x !== id)
        : [...prev.dietary, id],
    }));
  }

  function setServiceStyle(style: ServiceStyle | 'any') {
    setCriteria(prev => ({ ...prev, serviceStyle: style }));
  }

  function clearFilters() {
    setCriteria(defaultCriteria);
  }

  return (
    <>
      {/* Interactive Menu Finder — hidden without JavaScript */}
      {hydrated ? (
        <section
          aria-labelledby="finder-heading"
          className="wrap mb-14"
        >
          <div className="editorial-frame surface-linen-deep relative p-6 sm:p-8">
            <EditorialCornerMarks />
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
              <div>
                <p className="kicker">Order of Service · Menu Finder</p>
                <h2 id="finder-heading" className="mt-1 font-editorial text-2xl italic text-ink sm:text-3xl">
                  Narrow the issue to your event
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <p
                  className="font-editorial text-xl italic text-ink tabular-nums"
                  role="status"
                  aria-live="polite"
                >
                  {result.matchCount} of {result.availableCount} menus fit
                </p>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="button button-quiet min-h-9 px-3 py-1 text-xs"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-12">
              {/* Guest count */}
              <div className="md:col-span-3">
                <label htmlFor="finder-guests" className="kicker block text-ink">
                  Guest count
                </label>
                <input
                  id="finder-guests"
                  type="number"
                  min={1}
                  max={500}
                  inputMode="numeric"
                  placeholder="e.g. 45"
                  value={criteria.guests ?? ''}
                  onChange={e => {
                    const val = e.target.value.trim();
                    const parsed = val ? Number.parseInt(val, 10) : NaN;
                    setCriteria(prev => ({
                      ...prev,
                      guests: Number.isFinite(parsed) && parsed > 0 ? parsed : null,
                    }));
                  }}
                  className="ruled-input mt-2 tabular-nums"
                />
              </div>

              {/* Delivery zone */}
              <div className="md:col-span-4">
                <label htmlFor="finder-zone" className="kicker block text-ink">
                  Delivery zone
                </label>
                <select
                  id="finder-zone"
                  value={criteria.zone}
                  onChange={e =>
                    setCriteria(prev => ({ ...prev, zone: e.target.value as ZoneId | '' }))
                  }
                  className="ruled-input mt-2"
                >
                  <option value="">Any delivery zone</option>
                  {deliveryZones.map(zone => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} (min {zone.minGuests})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service style */}
              <fieldset className="md:col-span-5">
                <legend className="kicker text-ink">Service style</legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {(
                    [
                      { value: 'any', label: 'Any style' },
                      { value: 'drop-off', label: 'Drop-off' },
                      { value: 'staffed', label: 'Staffed' },
                    ] as const
                  ).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      data-active={criteria.serviceStyle === opt.value}
                      aria-pressed={criteria.serviceStyle === opt.value}
                      onClick={() => setServiceStyle(opt.value)}
                      className="letterpress-chip"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Dietary checkboxes */}
            <fieldset className="mt-6 border-t border-rule/70 pt-5">
              <legend className="kicker text-ink">
                Dietary requirements (all selected must be covered)
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {dietaryMarks.map(mark => {
                  const checked = criteria.dietary.includes(mark.id);
                  return (
                    <label
                      key={mark.id}
                      data-active={checked}
                      className="letterpress-chip cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleDietary(mark.id)}
                      />
                      <DietaryRoundel id={mark.id} size="xs" inverted={checked} />
                      <span>{mark.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {result.notice ? (
              <p
                className="mt-5 border-l-2 border-primary bg-paper px-4 py-3 text-sm font-medium text-ink"
                role="status"
              >
                {result.notice}
              </p>
            ) : result.matchCount === 0 && hasActiveFilters ? (
              <p
                className="mt-5 border-l-2 border-primary bg-paper px-4 py-3 text-sm text-ink"
                role="status"
              >
                No single menu matches all filters at once. Clear a filter or{' '}
                <SiteLink href="/contact/" className="text-link">
                  request a bespoke quote
                </SiteLink>{' '}
                — we often combine menus for mixed rooms.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* The Comparison Spread — food-guide supplement table */}
      <section aria-labelledby="comparison-heading" className="wrap mb-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Supplement · Side-by-Side</p>
            <h2 id="comparison-heading" className="mt-1 font-editorial text-3xl italic text-ink sm:text-4xl">
              The Comparison Spread
            </h2>
          </div>
          <p className="text-xs text-muted">
            Prices are indicative per guest in GBP; written quotes are final.
          </p>
        </div>

        <div className="overflow-x-auto border-y-2 border-ink">
          <table className="comparison-table w-full min-w-[54rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="kicker w-40 py-4 pr-4 align-bottom text-ink">
                  Menu
                </th>
                {result.ordered.map(menu => {
                  const matches = result.matchingIds.has(menu.id);
                  const dimmed = (hasActiveFilters && !matches) || !menu.available;
                  return (
                    <th
                      key={menu.id}
                      scope="col"
                      className={`relative min-w-36 border-l border-rule/80 px-4 pt-6 pb-4 align-bottom transition-opacity ${
                        dimmed ? 'opacity-45' : ''
                      }`}
                    >
                      {hasActiveFilters && matches ? (
                        <span className="pointer-events-none absolute top-0 right-3">
                          <SaffronRibbon width={14} height={28} />
                        </span>
                      ) : null}
                      <span className="folio block">{menu.number}</span>
                      <a
                        href={`#${menu.id}`}
                        className="mt-1 block font-editorial text-lg italic leading-snug text-ink no-underline hover:text-link hover:underline"
                      >
                        {menu.name}
                      </a>
                      {!menu.available ? (
                        <span className="mt-1 inline-block text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-primary">
                          Out of season
                        </span>
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/80">
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  Format
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top text-muted ${dimmed ? 'opacity-45' : ''}`}
                    >
                      {menu.format}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  From £/head
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top font-semibold tabular-nums text-ink ${dimmed ? 'opacity-45' : ''}`}
                    >
                      from {formatPriceShort(menu.pricePerHeadPence)}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  Min–max guests
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  const effMin = effectiveMinGuests(menu, criteria.zone);
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top tabular-nums text-ink ${dimmed ? 'opacity-45' : ''}`}
                    >
                      {effMin}–{menu.maxGuests}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  Lead time
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top tabular-nums text-ink ${dimmed ? 'opacity-45' : ''}`}
                    >
                      {menu.leadTimeDays} {menu.leadTimeDays === 1 ? 'day' : 'days'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  Service style
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top text-ink ${dimmed ? 'opacity-45' : ''}`}
                    >
                      {formatServiceStyles(menu.serviceStyles)}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  Dietary covered
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  const covered = menuDietaryCoverage(menu);
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top ${dimmed ? 'opacity-45' : ''}`}
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {covered.map(id => (
                          <DietaryRoundel key={id} id={id} size="xs" />
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row" className="kicker py-3.5 pr-4 align-top text-muted">
                  Zones served
                </th>
                {result.ordered.map(menu => {
                  const dimmed = (hasActiveFilters && !result.matchingIds.has(menu.id)) || !menu.available;
                  return (
                    <td
                      key={menu.id}
                      className={`border-l border-rule/70 px-4 py-3.5 align-top text-xs text-muted ${dimmed ? 'opacity-45' : ''}`}
                    >
                      {menu.zones.map(z => zoneById.get(z)?.shortName ?? z).join(', ')}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Menu Spreads — alternating magazine spreads */}
      <section aria-label="Menu spreads" className="wrap space-y-6">
        {result.ordered.map((menu, index) => {
          const matches = result.matchingIds.has(menu.id);
          const dimmed = hasActiveFilters && !matches;
          const reversed = index % 2 === 1;
          const showRibbon = menu.available && (!hasActiveFilters || matches);

          return (
            <div key={menu.id}>
              {index > 0 ? <RunningStitchDivider /> : null}
              <article
                id={menu.id}
                data-menu-id={menu.id}
                data-matched={matches ? 'true' : 'false'}
                className={`group relative scroll-mt-24 py-6 transition-opacity ${
                  !menu.available
                    ? 'opacity-70 grayscale-[0.55]'
                    : dimmed
                      ? 'opacity-45'
                      : ''
                }`}
              >
                {/* Hanging saffron ribbon bookmark beside matching spreads */}
                {showRibbon ? (
                  <div className="pointer-events-none absolute -top-2 right-0 sm:right-4">
                    <SaffronRibbon
                      width={22}
                      height={62}
                      label={hasActiveFilters ? 'Matches your event filters' : undefined}
                    />
                  </div>
                ) : null}

                <div className="grid items-start gap-10 lg:grid-cols-12">
                  {/* Vignette + oversized contents number column */}
                  <div
                    className={`flex flex-col items-start gap-4 lg:col-span-4 ${
                      reversed ? 'lg:order-2 lg:items-end lg:text-right' : ''
                    }`}
                  >
                    <span className="font-editorial text-[4.5rem] italic leading-none text-saffron/90 sm:text-[5.5rem]">
                      {menu.number}
                    </span>
                    <MenuVignette menuId={menu.id} />
                    {!menu.available && menu.availabilityNote ? (
                      <div className="mt-2">
                        <span className="stamp-out-of-season">Out of season</span>
                        <p className="mt-2 text-xs font-medium text-muted">{menu.availabilityNote}</p>
                      </div>
                    ) : null}
                  </div>

                  {/* Editorial content + dishes + spec sidebar */}
                  <div className={`lg:col-span-8 ${reversed ? 'lg:order-1' : ''}`}>
                    <p className="kicker">{menu.format}</p>
                    <h2 className="mt-2 font-editorial text-3xl italic text-ink sm:text-4xl">
                      {menu.name}
                    </h2>
                    <p className="drop-cap mt-4 max-w-2xl text-[1.025rem] leading-relaxed text-muted">
                      {menu.description}
                    </p>

                    <div className="mt-8 grid gap-8 border-t border-rule pt-6 md:grid-cols-12">
                      {/* Dish list */}
                      <div className="md:col-span-7">
                        <h3 className="kicker mb-4 text-ink">Sample Dishes</h3>
                        <ul className="space-y-3.5">
                          {menu.dishes.map(dish => (
                            <li
                              key={dish.name}
                              className="flex items-start justify-between gap-4 border-b border-rule/50 pb-3"
                            >
                              <div>
                                <p className="font-editorial text-lg leading-snug text-ink">
                                  {dish.name}
                                </p>
                                {dish.detail ? (
                                  <p className="mt-0.5 text-sm text-muted">{dish.detail}</p>
                                ) : null}
                              </div>
                              <div className="flex shrink-0 flex-wrap justify-end gap-1 pt-0.5">
                                {dish.dietary.map(markId => (
                                  <DietaryRoundel key={markId} id={markId} size="xs" />
                                ))}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Spec sidebar */}
                      <aside
                        aria-label={`${menu.name} specifications`}
                        className="editorial-frame surface-laid-paper relative p-5 md:col-span-5"
                      >
                        <h3 className="kicker mb-4 text-ink">At a Glance</h3>
                        <dl className="space-y-3.5 text-sm">
                          <div className="border-b border-rule/70 pb-3">
                            <dt className="kicker text-[0.68rem]">Indicative price</dt>
                            <dd className="mt-1 font-editorial text-xl italic tabular-nums text-ink">
                              {formatPricePerHead(menu.pricePerHeadPence)}
                            </dd>
                          </div>
                          <div className="flex items-start gap-2.5 border-b border-rule/70 pb-3">
                            <GuestsSettingIcon className="mt-0.5 h-5 w-5 shrink-0" />
                            <div>
                              <dt className="kicker text-[0.68rem]">Guest numbers</dt>
                              <dd className="mt-0.5 tabular-nums text-ink">
                                {menu.minGuests}–{menu.maxGuests} guests
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5 border-b border-rule/70 pb-3">
                            <CalendarLeafIcon className="mt-0.5 h-5 w-5 shrink-0" />
                            <div>
                              <dt className="kicker text-[0.68rem]">Notice required</dt>
                              <dd className="mt-0.5 tabular-nums text-ink">
                                {menu.leadTimeDays} {menu.leadTimeDays === 1 ? 'day' : 'days'}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5 border-b border-rule/70 pb-3">
                            {menu.serviceStyles.includes('staffed') ? (
                              <StaffedTrayIcon className="mt-0.5 h-5 w-5 shrink-0" />
                            ) : (
                              <DropOffCrateIcon className="mt-0.5 h-5 w-5 shrink-0" />
                            )}
                            <div>
                              <dt className="kicker text-[0.68rem]">Service style</dt>
                              <dd className="mt-0.5 text-ink">
                                {formatServiceStyles(menu.serviceStyles)}
                              </dd>
                            </div>
                          </div>
                          <div>
                            <dt className="kicker text-[0.68rem]">Zones served</dt>
                            <dd className="mt-1 text-ink">
                              {menu.zones.map(z => zoneById.get(z)?.name ?? z).join(' · ')}
                            </dd>
                          </div>
                        </dl>

                        {menu.available ? (
                          <div className="mt-5 pt-2">
                            <SiteLink href="/contact/" className="button w-full text-xs">
                              Ask about this menu
                            </SiteLink>
                          </div>
                        ) : null}
                      </aside>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </section>
    </>
  );
}
