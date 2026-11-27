import type { Metadata } from 'next';
import { SaffronCrocusArt } from '../../components/artwork';
import { EditorialCornerMarks, FolioRule } from '../../components/dividers';
import { MenusCatalogue } from '../../components/menus-catalogue';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { menus } from '../../content/menus';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Menus',
  description:
    'Compare our six London catering menus by guest count, dietary marks, delivery zone and service style, priced per head.',
  alternates: { canonical: absoluteUrl('/menus/') },
};

export default function MenusPage() {
  return (
    <>
      <PageHead
        eyebrow="Section 01 · The Menus"
        title="The Menus"
        folio="Pages 04–18"
        motif={<SaffronCrocusArt className="h-24 w-24" />}
      >
        <p className="drop-cap">
          Six ways to feed a room, priced per head. Filter by guest numbers, dietary needs,
          delivery zone and service style, or read each spread in full below.
        </p>
        <p className="mt-3 md:mt-0">
          Every menu is cooked to order in our Bermondsey kitchen. Indicative prices exclude
          delivery fees and any optional linen, crockery or waiting staff, which we itemise clearly
          in your written quote.
        </p>
      </PageHead>

      <MenusCatalogue allMenus={menus} />

      {/* Allergen footnote & closing CTA */}
      <section aria-labelledby="menus-allergen-heading" className="wrap mt-16">
        <FolioRule left="Allergen Note & Enquiries" right="The Menu Issue" className="mb-8" />
        <div className="editorial-frame surface-linen-deep relative p-6 sm:p-8">
          <EditorialCornerMarks />
          <div className="grid items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 id="menus-allergen-heading" className="kicker text-ink">
                Allergens &amp; Labelling
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {business.allergenStatement}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <SiteLink href="/contact/" className="button">
                Request a quote
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
