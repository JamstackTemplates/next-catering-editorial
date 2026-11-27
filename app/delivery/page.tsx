import type { Metadata } from 'next';
import { ZoneRingMapArt } from '../../components/artwork';
import { FolioRule, RunningStitchDivider } from '../../components/dividers';
import { PageHead } from '../../components/page-head';
import { PostcodeChecker } from '../../components/postcode-checker';
import { SiteLink } from '../../components/site-link';
import { deliveryZones, formatFee } from '../../content/zones';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Delivery & Service Areas',
  description:
    'Check your London or Home Counties postcode zone, delivery fees, guest minimums, service windows and venue access checklist.',
  alternates: { canonical: absoluteUrl('/delivery/') },
};

const VENUE_CHECKLIST = [
  {
    title: 'Lifts, stairs and floor level',
    detail: 'Tell us if there is a service lift, narrow staircase or long carry from the street so we bring the right crates and crew.',
  },
  {
    title: 'Loading bay and parking',
    detail: 'Let us know about loading-bay time slots, red routes, congestion-zone access or building security sign-in.',
  },
  {
    title: 'Kitchen and finishing space',
    detail: 'Drop-off platters need no kitchen at all. Staffed bowl food and plated dinners need a prep surface and power or oven access.',
  },
  {
    title: 'Setup and clear-down windows',
    detail: 'Share when our team can arrive before guests and when the venue requires us to clear down.',
  },
  {
    title: 'Tables, linen and hire',
    detail: 'Tell us whether tables are already in place or if you would like us to quote for linen, crockery and glassware.',
  },
] as const;

export default function DeliveryPage() {
  return (
    <>
      <PageHead
        eyebrow="Section 02 · Delivery"
        title="Delivery & service areas"
        folio="Pages 19–24"
      >
        <p className="drop-cap">
          We cook in railway arches in Bermondsey, London SE1, and deliver across four concentric
          zones covering Central, Inner and Outer London and the Home Counties.
        </p>
        <p className="mt-3 md:mt-0">
          Look up your venue postcode below or read the full zone table for fees, guest minimums
          and extra notice periods. Collection from our production kitchen is by arrangement only.
        </p>
      </PageHead>

      {/* Newspaper-style postcode look-up box (client enhancement) */}
      <PostcodeChecker />

      {/* Zone ring map + four zones listed beside it */}
      <section aria-labelledby="zone-map-heading" className="wrap mb-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ZoneRingMapArt size="large" />
          </div>
          <div className="lg:col-span-5">
            <p className="kicker">Concentric Rings · SE1</p>
            <h2 id="zone-map-heading" className="mt-2 font-editorial text-3xl italic text-ink sm:text-4xl">
              From Tower Bridge outwards
            </h2>
            <ol className="mt-6 space-y-5 border-t border-rule pt-5">
              {deliveryZones.map((zone, idx) => (
                <li key={zone.id} className="border-b border-rule/70 pb-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-editorial text-2xl italic text-ink">
                      <span className="mr-2 text-saffron">0{idx + 1}</span>
                      {zone.name}
                    </h3>
                    <span className="font-semibold tabular-nums text-ink">
                      {formatFee(zone.deliveryFeePence)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{zone.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Full Zone Table */}
      <section aria-labelledby="zone-table-heading" className="wrap mb-16">
        <FolioRule left="Zone Tariff & Districts" right="All prices in GBP" className="mb-6" />
        <h2 id="zone-table-heading" className="font-editorial text-3xl italic text-ink">
          Delivery zones in detail
        </h2>
        <div className="mt-6 overflow-x-auto border-y-2 border-ink">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="kicker py-3.5 pr-4 text-ink">Zone</th>
                <th scope="col" className="kicker px-4 py-3.5 text-ink">Fee</th>
                <th scope="col" className="kicker px-4 py-3.5 text-ink">Staffed service</th>
                <th scope="col" className="kicker px-4 py-3.5 text-ink">Min guests</th>
                <th scope="col" className="kicker px-4 py-3.5 text-ink">Extra notice</th>
                <th scope="col" className="kicker pl-4 py-3.5 text-ink">Postcode districts / areas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/80">
              {deliveryZones.map(zone => (
                <tr key={zone.id}>
                  <th scope="row" className="py-4 pr-4 font-editorial text-lg italic text-ink">
                    {zone.name}
                  </th>
                  <td className="px-4 py-4 font-semibold tabular-nums text-ink">
                    {formatFee(zone.deliveryFeePence)}
                  </td>
                  <td className="px-4 py-4 text-ink">
                    {zone.staffedOnly ? 'Staffed events only' : 'Drop-off or staffed'}
                  </td>
                  <td className="px-4 py-4 tabular-nums text-ink">{zone.minGuests}</td>
                  <td className="px-4 py-4 tabular-nums text-ink">
                    {zone.extraLeadDays === 0
                      ? 'None'
                      : `+${zone.extraLeadDays} ${zone.extraLeadDays === 1 ? 'day' : 'days'}`}
                  </td>
                  <td className="pl-4 py-4 text-muted">{zone.districtsDisplay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          Outside these postcodes? Tell us the venue postcode in your enquiry and we will see what
          we can do.
        </p>
      </section>

      {/* Service windows timetable strip */}
      <section aria-labelledby="service-windows-heading" className="surface-french-linen py-14">
        <div className="wrap">
          <p className="kicker text-band-muted">Timetable Strip</p>
          <h2 id="service-windows-heading" className="mt-1 font-editorial text-3xl italic text-band-ink sm:text-4xl">
            Service windows
          </h2>
          <div className="mt-8 grid gap-6 border-t border-white/25 pt-6 md:grid-cols-3">
            <div>
              <p className="font-editorial text-4xl italic tabular-nums text-saffron">06:30–22:00</p>
              <h3 className="mt-2 font-editorial text-xl italic text-band-ink">Kitchen dispatch</h3>
              <p className="mt-1.5 text-sm text-band-muted">
                First breakfast platters leave Bermondsey at 06:30; final evening drop-offs depart
                by 22:00.
              </p>
            </div>
            <div>
              <p className="font-editorial text-4xl italic tabular-nums text-saffron">23:30</p>
              <h3 className="mt-2 font-editorial text-xl italic text-band-ink">Staffed finish</h3>
              <p className="mt-1.5 text-sm text-band-muted">
                All staffed receptions, bowl food evenings and plated dinners must finish service by
                23:30 so our team clears down cleanly.
              </p>
            </div>
            <div>
              <p className="font-editorial text-4xl italic text-saffron">No midnight runs</p>
              <h3 className="mt-2 font-editorial text-xl italic text-band-ink">Same-day service</h3>
              <p className="mt-1.5 text-sm text-band-muted">
                We do not cover events running past midnight. Let us know your schedule when you
                enquire so we can plan dispatch and staffing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RunningStitchDivider className="wrap" />

      {/* Venue checklist */}
      <section aria-labelledby="venue-checklist-heading" className="wrap py-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">Before You Enquire</p>
            <h2 id="venue-checklist-heading" className="mt-2 font-editorial text-3xl italic text-ink sm:text-4xl">
              What to tell us about your venue
            </h2>
            <p className="mt-3 text-muted">
              A few practical notes help us quote accurately first time and avoid surprises on the
              day.
            </p>
            <div className="mt-7">
              <SiteLink href="/contact/" className="button">
                Request a quote
              </SiteLink>
            </div>
          </div>

          <ul className="space-y-4 lg:col-span-7">
            {VENUE_CHECKLIST.map(item => (
              <li
                key={item.title}
                className="flex items-start gap-4 border-b border-rule/80 pb-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-ink font-editorial text-base italic text-primary"
                >
                  ✓
                </span>
                <div>
                  <h3 className="font-editorial text-xl italic text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
