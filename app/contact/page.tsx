import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { EditorialCornerMarks } from '../../components/dividers';
import { EmailIcon, PhoneIcon } from '../../components/icons';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Request a quote',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        eyebrow="Section 04 · Enquiries"
        title={business.enquiries.title}
        folio="Back Cover"
      >
        <p className="drop-cap">{business.enquiries.introduction}</p>
        <p className="mt-3 md:mt-0">
          Use the enquiry form or email us directly — both reach the same office desk in
          Bermondsey.
        </p>
      </PageHead>

      <div className="wrap grid items-start gap-10 pb-12 lg:grid-cols-12">
        {/* Left: Linen-framed enquiry form or static email fallback */}
        <section aria-label="Quote enquiry form" className="lg:col-span-7">
          <div className="editorial-frame surface-linen-deep relative p-6 sm:p-8">
            <EditorialCornerMarks />
            <p className="kicker mb-4">Written Quote Enquiry</p>
            {hosted ? (
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            ) : (
              <div>
                <h2 className="font-editorial text-2xl italic text-ink sm:text-3xl">
                  Write to us directly
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  The online enquiry form is not connected on this preview. Send your event details
                  directly to{' '}
                  <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>{' '}
                  and we will reply within one working day with a written quote or a few questions.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${business.email}`} className="button">
                    Email {business.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right: Place-card with contact details, office hours & checklist */}
        <aside aria-label="Contact details and enquiry checklist" className="lg:col-span-5">
          <div className="editorial-frame surface-laid-paper relative p-6 sm:p-8">
            <div className="border-b border-rule pb-5">
              <p className="kicker">Direct Desk · Bermondsey</p>
              <div className="mt-4 space-y-3">
                <p>
                  <a
                    className="inline-flex items-center gap-2.5 text-link wrap-anywhere"
                    href={`mailto:${business.email}`}
                  >
                    <EmailIcon />
                    <span>{business.email}</span>
                  </a>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <CopyEmail email={business.email} />
                </div>
                {business.phone ? (
                  <p>
                    <a
                      className="inline-flex items-center gap-2.5 font-medium tabular-nums text-ink no-underline hover:text-link hover:underline"
                      href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                    >
                      <PhoneIcon />
                      <span>{business.phone}</span>
                    </a>
                  </p>
                ) : null}
              </div>

              <div className="mt-5 space-y-2 border-t border-rule/70 pt-4">
                <p className="text-xs text-muted">{business.kitchenLocation}</p>
                <p className="text-xs text-muted">{business.officeHoursSummary}</p>
                <div className="pt-1">
                  <OpenBadge
                    hours={business.officeHours}
                    staticLabel={business.officeHoursSummary}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-editorial text-2xl italic text-ink">What to include</h2>
              <p className="mt-1.5 text-xs text-muted">
                Helpful details to mention in your message so we can prepare an accurate written
                quote:
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/90">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-primary" aria-hidden="true">
                      —
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
