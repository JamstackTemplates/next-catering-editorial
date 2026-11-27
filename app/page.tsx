import type { Metadata } from 'next';
import {
  ContentsSection,
  CoverHero,
  DeliveryPreviewSection,
  DietarySection,
  EditorLetterSection,
  FourQuestionsBand,
  QuoteStepsSection,
} from '../components/home-sections';
import { business } from '../content/business';
import { menus } from '../content/menus';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const availableMenus = menus.filter(menu => menu.available);

  return (
    <>
      {/* 1. Cover Hero */}
      <CoverHero>
        <CoverHero.Issue>{business.issueLine}</CoverHero.Issue>
        <CoverHero.Heading>
          Feed the room,
          <br />
          beautifully.
        </CoverHero.Heading>
        <CoverHero.Subline>
          Six menus for receptions, board lunches and long tables across London. Compare them by
          guest count, dietary needs and delivery zone, then ask us for a written quote.
        </CoverHero.Subline>
        <CoverHero.Actions
          primaryHref="/menus/"
          primaryLabel="Compare the menus"
          secondaryHref="/contact/"
          secondaryLabel="Request a quote"
        />
      </CoverHero>

      {/* 2. Contents */}
      <ContentsSection
        eyebrow="Contents · This Season"
        heading="In the Menu Issue"
        note="Every currently available menu, priced per head. Jump straight to a spread or compare them side by side."
        menus={availableMenus}
      />

      {/* 3. The Four Questions — full-bleed French linen band */}
      <FourQuestionsBand eyebrow="Quick Reference" heading="The four questions">
        <FourQuestionsBand.Item
          number="01"
          title="Menu"
          href="/menus/"
          linkLabel="Compare all menus"
        >
          From early-morning pastries to three-course plated dinners, each menu is built around a
          clear room format and indicative price per head.
        </FourQuestionsBand.Item>
        <FourQuestionsBand.Item
          number="02"
          title="Dietary"
          href="/menus/#comparison-heading"
          linkLabel="Filter by dietary marks"
          stagger
        >
          Every menu covers vegetarian, vegan, gluten-free and dairy-free guests, with clear
          letterpress marks printed on the table.
        </FourQuestionsBand.Item>
        <FourQuestionsBand.Item
          number="03"
          title="Guests"
          href="/menus/"
          linkLabel="Check guest minimums"
        >
          Drop-off breakfasts and working lunches start at 10 guests; receptions, bowl food and
          feasts scale smoothly up to 300.
        </FourQuestionsBand.Item>
        <FourQuestionsBand.Item
          number="04"
          title="Where"
          href="/delivery/"
          linkLabel="Look up your postcode"
          stagger
        >
          Four concentric delivery zones radiate from our Bermondsey arch across Central, Inner and
          Outer London and the Home Counties.
        </FourQuestionsBand.Item>
      </FourQuestionsBand>

      {/* 4. Dietary, done properly */}
      <DietarySection
        eyebrow="Dietary, Done Properly"
        pullQuote="Every dish wears its marks."
        statement={business.allergenStatement}
      />

      {/* 5. Where we deliver */}
      <DeliveryPreviewSection
        eyebrow="Delivery & Service Areas"
        heading="Four rings from Bermondsey"
        intro="We cook in railway arches near Tower Bridge and dispatch chilled or finished hot across London and the Home Counties."
        linkLabel="Check your postcode and delivery table"
      />

      {/* 6. How a quote works */}
      <QuoteStepsSection eyebrow="How a Quote Works" heading="Three clear steps to the table">
        <QuoteStepsSection.Step number="01" title="Compare menus and zones">
          Use the menu finder and postcode look-up to check indicative per-head prices, guest
          minimums, lead times and dietary coverage before you write.
        </QuoteStepsSection.Step>
        <QuoteStepsSection.Step number="02" title="Send your event brief">
          Tell us the date, venue postcode, guest numbers, dietary counts and preferred format. We
          reply within one working day with a tailored written quote or a few quick questions.
        </QuoteStepsSection.Step>
        <QuoteStepsSection.Step number="03" title="Confirm in writing">
          Take the time you need to review the written quote with your team. Nothing is held or
          arranged until you accept the quote and we confirm in writing.
        </QuoteStepsSection.Step>
      </QuoteStepsSection>

      {/* 7. From the editor */}
      <EditorLetterSection
        eyebrow="From the Editor"
        heading="A note from our Bermondsey arch"
        signatureName={business.founder}
        signatureRole="Founder & Head Chef"
        ctaLabel="Request a quote"
      >
        <p className="drop-cap">
          Good event food should never feel like it travelled in a van. We started Saffron &amp;
          Linen under a railway arch in Bermondsey with a simple rule: cook the morning of the
          event, season boldly, and write menus that organisers can read in five minutes without
          chasing a spreadsheet.
        </p>
        <p>
          Whether you are feeding twelve partners over a Tuesday board table or two hundred guests
          at a gallery opening, the same kitchen team roasts the squash, bakes the flatbreads and
          labels every dietary plate by hand. Send us the rough shape of your room and we will
          put together a clear written quote.
        </p>
      </EditorLetterSection>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
