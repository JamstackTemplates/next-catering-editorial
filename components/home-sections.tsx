import type { ReactNode } from 'react';
import {
  FoldedNapkinArt,
  SaffronCrocusArt,
  SaffronRibbon,
  ZoneRingMapArt,
} from './artwork';
import {
  ArchWatermark,
  EditorialCornerMarks,
  FolioRule,
  LinenHemDivider,
} from './dividers';
import { DietaryRoundel } from './icons';
import { SiteLink } from './site-link';
import { dietaryMarks } from '../content/dietary';
import { formatPricePerHead, type CateringMenu } from '../content/menus';
import { deliveryZones, formatFee } from '../content/zones';
import { asset } from '../lib/paths';

type ChildrenProps = { children: ReactNode };

/* ----------------------------------------------------------------------------
   1. Cover Hero — editorial cover with mounted light/dark culinary plate
   ---------------------------------------------------------------------------- */

function CoverHeroRoot({ children }: ChildrenProps) {
  return (
    <section className="border-ticking-bottom relative overflow-x-clip pt-6 pb-14 sm:pt-10 lg:pt-12 lg:pb-18">
      {/* Subtle architectural Bermondsey arch watermark behind the headline */}
      <div className="pointer-events-none absolute -top-6 -left-16 z-0 hidden opacity-85 lg:block">
        <ArchWatermark className="h-[26rem] w-[26rem]" />
      </div>

      <div className="wrap relative z-10">
        {/* Hanging saffron ribbon dropping from the masthead into the cover gutter */}
        <div className="pointer-events-none absolute -top-6 right-2 z-20 sm:-top-10 lg:left-[44%] lg:right-auto lg:-top-12">
          <SaffronRibbon width={26} height={86} />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="relative z-10 pr-8 sm:pr-10 lg:col-span-5 lg:pr-2">{children}</div>

          <div className="relative lg:col-span-7">
            <figure className="plate-frame relative">
              <EditorialCornerMarks />
              <div className="relative overflow-hidden bg-paper">
                <img
                  src={asset('/hero-table-light.jpg')}
                  alt="Overhead photograph of Saffron & Linen's Long-Table Feast on cream linen with a French blue ticking-stripe runner: saffron jewelled rice with barberries and charred lemon, blistered sourdough flatbreads with whipped labneh, roast squash with Puy lentils, honeyed figs with feta, and charred hispi cabbage."
                  width={1200}
                  height={896}
                  fetchPriority="high"
                  className="hero-photo-light block aspect-[1200/896] w-full object-cover"
                />
                <img
                  src={asset('/hero-table-dark.jpg')}
                  alt="Candlelit overhead photograph of Saffron & Linen's Long-Table Feast on dark espresso linen with a slate ticking-stripe runner: saffron jewelled rice with barberries and charred lemon, blistered sourdough flatbreads with whipped labneh, roast squash with Puy lentils, honeyed figs with feta, and charred hispi cabbage."
                  width={1200}
                  height={896}
                  fetchPriority="high"
                  className="hero-photo-dark block aspect-[1200/896] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-rule/80 px-1 pt-2">
                <span className="folio text-ink">Plate I · The Long-Table Feast</span>
                <span className="font-editorial text-xs italic text-muted">
                  Saffron jewelled rice, warm flatbreads &amp; seasonal platters · Bermondsey SE1
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverIssue({ children }: ChildrenProps) {
  return (
    <p className="kicker mb-4 inline-flex items-center gap-2.5 pr-8 text-muted">
      <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function CoverHeading({ children }: ChildrenProps) {
  return (
    <h1 className="font-editorial text-[clamp(3.1rem,8.5vw,5.4rem)] italic leading-[0.95] text-ink">
      {children}
    </h1>
  );
}

function CoverSubline({ children }: ChildrenProps) {
  return (
    <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted sm:text-[1.125rem]">
      {children}
    </p>
  );
}

function CoverActions({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-5">
        <SiteLink href={primaryHref} className="button">
          {primaryLabel}
        </SiteLink>
        <SiteLink
          href={secondaryHref}
          className="text-link text-sm font-semibold tracking-[0.08em] uppercase"
        >
          {secondaryLabel}
        </SiteLink>
      </div>
      <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-rule/80 pt-4">
        <div>
          <dt className="folio text-[0.65rem]">Menus</dt>
          <dd className="mt-0.5 font-editorial text-xl italic text-ink">6 seasonal</dd>
        </div>
        <div className="border-l border-rule/70 pl-4">
          <dt className="folio text-[0.65rem]">Guests</dt>
          <dd className="mt-0.5 font-editorial text-xl italic tabular-nums text-ink">10 – 300</dd>
        </div>
        <div className="border-l border-rule/70 pl-4">
          <dt className="folio text-[0.65rem]">Kitchen</dt>
          <dd className="mt-0.5 font-editorial text-xl italic text-ink">SE1 Arch</dd>
        </div>
      </dl>
    </div>
  );
}

export const CoverHero = Object.assign(CoverHeroRoot, {
  Issue: CoverIssue,
  Heading: CoverHeading,
  Subline: CoverSubline,
  Actions: CoverActions,
});

/* ----------------------------------------------------------------------------
   2. Contents — two-column magazine contents page with dotted leaders & napkin
   ---------------------------------------------------------------------------- */

export function ContentsSection({
  eyebrow,
  heading,
  note,
  menus,
}: {
  eyebrow: string;
  heading: ReactNode;
  note: ReactNode;
  menus: readonly CateringMenu[];
}) {
  return (
    <section aria-labelledby="contents-heading" className="wrap py-16 sm:py-20">
      <div className="editorial-frame surface-laid-paper relative p-6 sm:p-10 lg:p-12">
        <EditorialCornerMarks />
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">{eyebrow}</p>
            <h2 id="contents-heading" className="mt-2 font-editorial text-4xl italic text-ink">
              {heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>
            <div className="mt-8 hidden lg:block">
              <FoldedNapkinArt />
            </div>
          </div>

          <ol className="space-y-5 lg:col-span-8">
            {menus.map(menu => (
              <li key={menu.id} className="group border-b border-rule/75 pb-4 last:border-b-0 last:pb-0">
                <SiteLink
                  href={`/menus/#${menu.id}`}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 no-underline hover:no-underline"
                >
                  <span className="font-editorial text-3xl italic leading-none text-saffron">
                    {menu.number}
                  </span>
                  <span className="font-editorial text-2xl italic text-ink group-hover:text-link group-hover:underline">
                    {menu.name}
                  </span>
                  <span className="dotted-leader hidden sm:block" aria-hidden="true" />
                  <span className="ml-auto text-sm font-semibold tabular-nums text-ink">
                    {formatPricePerHead(menu.pricePerHeadPence)}
                  </span>
                </SiteLink>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 pl-10 text-sm text-muted">
                  <span>{menu.format}</span>
                  <span className="tabular-nums text-xs uppercase tracking-[0.1em]">
                    Min {menu.minGuests} guests
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   3. The Four Questions — full-bleed French linen blue-stripe band
   ---------------------------------------------------------------------------- */

function FourQuestionsRoot({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="four-questions-heading" className="surface-french-linen py-18 sm:py-22">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-white/20 pb-5">
          <div>
            <p className="kicker text-band-muted">{eyebrow}</p>
            <h2
              id="four-questions-heading"
              className="mt-2 font-editorial text-3xl italic text-band-ink sm:text-4xl"
            >
              {heading}
            </h2>
          </div>
          <span className="folio text-band-muted">Four Questions Before You Enquire</span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
      </div>
    </section>
  );
}

function FourQuestionsItem({
  number,
  title,
  href,
  linkLabel,
  stagger = false,
  children,
}: {
  number: string;
  title: string;
  href: string;
  linkLabel: string;
  stagger?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col border-t border-white/25 pt-5 ${
        stagger ? 'lg:mt-8' : ''
      }`}
    >
      <span className="font-editorial text-5xl italic leading-none text-saffron">{number}</span>
      <h3 className="mt-4 font-editorial text-2xl italic text-band-ink">{title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-band-muted">{children}</p>
      <SiteLink
        href={href}
        className="mt-4 inline-block text-xs font-semibold tracking-[0.14em] uppercase text-saffron underline underline-offset-4 hover:text-band-ink"
      >
        {linkLabel}
      </SiteLink>
    </div>
  );
}

export const FourQuestionsBand = Object.assign(FourQuestionsRoot, {
  Item: FourQuestionsItem,
});

/* ----------------------------------------------------------------------------
   4. Dietary, done properly — pull quote over crocus + horizontal roundels
   ---------------------------------------------------------------------------- */

export function DietarySection({
  eyebrow,
  pullQuote,
  statement,
}: {
  eyebrow: string;
  pullQuote: ReactNode;
  statement: string;
}) {
  return (
    <section aria-labelledby="dietary-heading" className="wrap py-18 sm:py-22">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-3 flex justify-center">
          <SaffronCrocusArt className="h-24 w-24" />
        </div>
        <p className="kicker">{eyebrow}</p>
        <h2
          id="dietary-heading"
          className="mt-2 font-editorial text-4xl italic text-ink sm:text-5xl"
        >
          {pullQuote}
        </h2>
      </div>

      <dl className="mt-12 grid gap-6 border-y-2 border-double border-rule-strong py-8 sm:grid-cols-2 lg:grid-cols-5">
        {dietaryMarks.map(mark => (
          <div key={mark.id} className="flex items-start gap-3.5 lg:flex-col lg:items-center lg:text-center">
            <DietaryRoundel id={mark.id} size="md" />
            <div>
              <dt className="font-editorial text-lg italic text-ink">{mark.label}</dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-muted">{mark.note}</dd>
            </div>
          </div>
        ))}
      </dl>

      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted">
        {statement}
      </p>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   5. Where we deliver — split layout: zone ring map left, zone list right
   ---------------------------------------------------------------------------- */

export function DeliveryPreviewSection({
  eyebrow,
  heading,
  intro,
  linkLabel,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  linkLabel: string;
}) {
  return (
    <section aria-labelledby="delivery-preview-heading" className="wrap py-14 sm:py-18">
      <FolioRule left={eyebrow} right="Bermondsey SE1 Outwards" className="mb-10" />
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ZoneRingMapArt size="compact" />
        </div>
        <div className="lg:col-span-6">
          <h2 id="delivery-preview-heading" className="font-editorial text-3xl italic text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-muted">{intro}</p>

          <ul className="mt-7 divide-y divide-rule border-y border-rule-strong">
            {deliveryZones.map(zone => (
              <li key={zone.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <div>
                  <span className="font-editorial text-xl italic text-ink">{zone.name}</span>
                  <p className="text-xs text-muted">
                    Min {zone.minGuests} guests ·{' '}
                    {zone.staffedOnly ? 'Staffed events only' : 'Drop-off or staffed'}
                  </p>
                </div>
                <span className="font-semibold tabular-nums text-ink">
                  {formatFee(zone.deliveryFeePence)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <SiteLink href="/delivery/" className="text-link text-sm font-semibold tracking-[0.06em] uppercase">
              {linkLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   6. How a quote works — recipe-method column with hanging oversized numerals
   ---------------------------------------------------------------------------- */

function QuoteStepsRoot({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="quote-steps-heading" className="relative overflow-x-clip py-16 sm:py-20">
      <LinenHemDivider className="mb-14" />
      <div className="wrap">
        <div className="mx-auto max-w-2xl">
          <p className="kicker">{eyebrow}</p>
          <h2 id="quote-steps-heading" className="mt-2 font-editorial text-3xl italic text-ink sm:text-4xl">
            {heading}
          </h2>
          <ol className="mt-10 space-y-8 border-t border-rule-strong pt-8">{children}</ol>
        </div>
      </div>
    </section>
  );
}

function QuoteStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-rule/60 pb-7">
      <span className="font-editorial text-5xl italic leading-none text-saffron">{number}</span>
      <div>
        <h3 className="font-editorial text-2xl italic text-ink">{title}</h3>
        <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{children}</p>
      </div>
    </li>
  );
}

export const QuoteStepsSection = Object.assign(QuoteStepsRoot, {
  Step: QuoteStep,
});

/* ----------------------------------------------------------------------------
   7. From the editor — two-column letter on deep paper with drop cap & signature
   ---------------------------------------------------------------------------- */

export function EditorLetterSection({
  eyebrow,
  heading,
  signatureName,
  signatureRole,
  ctaLabel,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  signatureName: string;
  signatureRole: string;
  ctaLabel: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="editor-letter-heading"
      className="surface-linen-deep border-stitched-band relative overflow-hidden py-18 sm:py-22"
    >
      {/* Subtle Bermondsey arch watermark on the right margin */}
      <div className="pointer-events-none absolute -right-12 -bottom-12 z-0 hidden opacity-70 lg:block">
        <ArchWatermark className="h-80 w-80" />
      </div>

      <div className="wrap relative z-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">{eyebrow}</p>
            <h2 id="editor-letter-heading" className="mt-2 font-editorial text-3xl italic text-ink sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-8 hidden lg:block">
              <FoldedNapkinArt className="w-40" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-4 text-[1.025rem] leading-relaxed text-ink/90 md:columns-2 md:gap-10">
              {children}
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-rule-strong pt-6">
              <div>
                <p className="font-editorial text-3xl italic text-ink">{signatureName}</p>
                <p className="kicker mt-1">{signatureRole}</p>
              </div>
              <SiteLink href="/contact/" className="button">
                {ctaLabel}
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
