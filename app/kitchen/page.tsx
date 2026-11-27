import type { Metadata } from 'next';
import { FoldedNapkinArt, SaffronCrocusArt } from '../../components/artwork';
import { EditorialCornerMarks, FolioRule, RunningStitchDivider } from '../../components/dividers';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'The Kitchen',
  description:
    'Inside our Bermondsey railway-arch production kitchen: Nadia Hale, our London and Kent suppliers, allergen labelling, and staffed service.',
  alternates: { canonical: absoluteUrl('/kitchen/') },
};

const SUPPLIERS = [
  { name: 'Bermondsey Bread Co.', produce: 'Country sourdough and morning pastries' },
  { name: 'Elm Lane Farm, Kent', produce: 'Seasonal field vegetables, squash and brassicas' },
  { name: 'Hale & Sons, Billingsgate', produce: 'Day-boat line-caught fish and shellfish' },
  { name: 'Tamworth Hill', produce: 'Free-range poultry, lamb and outdoor-reared pork' },
  { name: 'Marsh Lane Dairy', produce: 'Farmhouse cheese, burrata, labneh and cultured cream' },
] as const;

export default function KitchenPage() {
  return (
    <>
      <PageHead
        eyebrow="Section 03 · The Kitchen"
        title="The Kitchen"
        folio="Pages 25–30"
        motif={<FoldedNapkinArt className="w-36" />}
      >
        <p className="drop-cap">
          Our production kitchen sits beneath a brick railway arch in Bermondsey, London SE1, a
          short walk from Tower Bridge. It is a working kitchen, not a café — collection is by
          arrangement only.
        </p>
        <p className="mt-3 md:mt-0">
          Every morning starts with bread from round the corner, vegetables from Kent and a prep
          list written for that day’s rooms.
        </p>
      </PageHead>

      {/* Feature-story opening pull quote */}
      <section aria-label="Kitchen philosophy" className="wrap py-6">
        <blockquote className="mx-auto max-w-4xl border-y border-rule py-10 text-center">
          <p className="font-editorial text-3xl italic leading-snug text-ink sm:text-5xl">
            “Cook the morning of the event, season as you would for a restaurant table, and never
            make an organiser guess what is in a dish.”
          </p>
          <footer className="kicker mt-5">— {business.founder}, Founder &amp; Head Chef</footer>
        </blockquote>
      </section>

      {/* Three-column editorial story */}
      <section aria-labelledby="story-heading" className="wrap py-12">
        <p className="kicker">Feature Story</p>
        <h2 id="story-heading" className="mt-2 font-editorial text-3xl italic text-ink sm:text-4xl">
          From Spitalfields delis to a Bermondsey arch
        </h2>

        <div className="mt-7 space-y-5 text-[1.025rem] leading-relaxed text-ink/90 md:columns-2 lg:columns-3 lg:gap-10">
          <p className="drop-cap">
            Nadia Hale spent her early twenties running deli kitchens in Spitalfields, learning how
            to make salads, slow-roasts and tarts hold their brightness at room temperature without
            losing their edge. Ten years of cooking for London launches, studio dinners and gallery
            openings followed before she took on a railway arch in Bermondsey.
          </p>
          <p>
            The arch gives us long steel benches, deck ovens and a cold room built for early starts.
            Breakfast platters are baked and boxed from 05:00; lunch salads are dressed just before
            dispatch; evening bowls and plated courses are prepped to 90 per cent in SE1 and
            finished fresh at your venue.
          </p>
          <p>
            We keep our menus deliberately tight — six core formats in season at a time — so every
            dish is tested for travel, service speed and clear dietary coverage. Nothing leaves the
            arch without a printed dish card and full allergen sheet.
          </p>
        </div>
      </section>

      <RunningStitchDivider className="wrap" />

      {/* Suppliers ("With thanks to") + Allergens boxed sidebar */}
      <section aria-label="Suppliers and allergen controls" className="wrap py-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Credits column */}
          <div className="lg:col-span-6">
            <p className="kicker">Credits · With Thanks To</p>
            <h2 className="mt-2 font-editorial text-3xl italic text-ink">Our suppliers</h2>
            <p className="mt-3 text-sm text-muted">
              Short supply lines mean we know where the produce was grown or landed that week.
            </p>
            <dl className="mt-6 divide-y divide-rule border-y border-rule">
              {SUPPLIERS.map(supplier => (
                <div key={supplier.name} className="py-4">
                  <dt className="font-editorial text-xl italic text-ink">{supplier.name}</dt>
                  <dd className="mt-0.5 text-sm text-muted">{supplier.produce}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Boxed allergen sidebar */}
          <aside
            aria-labelledby="kitchen-allergens-heading"
            className="editorial-frame surface-linen-deep relative p-6 sm:p-8 lg:col-span-6"
          >
            <EditorialCornerMarks />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kicker">Kitchen Protocol</p>
                <h2
                  id="kitchen-allergens-heading"
                  className="mt-1 font-editorial text-3xl italic text-ink"
                >
                  Allergens &amp; labelling
                </h2>
              </div>
              <SaffronCrocusArt className="h-16 w-16 shrink-0" />
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/90">
              <p>
                Every platter, box and buffet station arrives with printed letterpress dish cards
                carrying the five dietary marks (V, VE, GF, DF, NM) alongside a complete 14-allergen
                matrix for your host or venue manager.
              </p>
              <p>
                We prepare gluten-free and vegan plates on separate benches with dedicated utensils
                and sealed transport trays, labelled clearly with the guest’s requirement.
              </p>
              <p className="border-t border-rule pt-4 font-medium text-ink">
                {business.allergenStatement}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Staffing, linen and hire */}
      <section aria-labelledby="staffing-heading" className="wrap mt-12">
        <FolioRule left="Service & Hire" right="Arranged Per Quote" className="mb-8" />
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="staffing-heading" className="font-editorial text-3xl italic text-ink">
              Staffing, linen &amp; hire
            </h2>
          </div>
          <div className="space-y-4 text-muted md:col-span-8 md:columns-2 md:gap-8">
            <p>
              For drop-off menus, food arrives ready to place straight onto your meeting table or
              serving counter in recyclable boxes or returnable stoneware platters.
            </p>
            <p>
              For staffed receptions, bowl food and plated dinners, our chefs and front-of-house
              team manage finishing, circulation, wine service and clear-down. French linen
              cloths, napkins, stoneware crockery and glassware are arranged per quote.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8">
          <p className="font-editorial text-2xl italic text-ink">
            Planning a reception, lunch or long-table dinner?
          </p>
          <SiteLink href="/contact/" className="button">
            Request a quote
          </SiteLink>
        </div>
      </section>
    </>
  );
}
