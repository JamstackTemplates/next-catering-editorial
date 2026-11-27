import { business } from '../content/business';
import { deliveryZones, formatFee } from '../content/zones';
import { EmailIcon, PhoneIcon } from './icons';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="surface-linen-deep border-stitched-band mt-20 pt-14 pb-10">
      <div className="wrap">
        <div className="grid gap-10 pb-12 md:grid-cols-12">
          {/* Colophon brand column */}
          <div className="md:col-span-5">
            <p className="kicker mb-2">Colophon · Back Page</p>
            <p className="font-editorial text-3xl italic text-ink">
              {business.wordmark.leading}{' '}
              <span className="not-italic text-saffron">{business.wordmark.ampersand}</span>{' '}
              {business.wordmark.trailing}
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Event and corporate catering cooked from our railway-arch production kitchen in{' '}
              {business.kitchenLocation}. Collection by arrangement only.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 text-link wrap-anywhere"
              >
                <EmailIcon />
                <span>{business.email}</span>
              </a>
              {business.phone ? (
                <a
                  href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-ink no-underline hover:underline"
                >
                  <PhoneIcon />
                  <span className="tabular-nums">{business.phone}</span>
                </a>
              ) : null}
            </div>
            <p className="mt-3 text-xs text-muted">{business.officeHoursSummary}</p>
          </div>

          {/* Issue index */}
          <div className="md:col-span-3">
            <h2 className="kicker mb-4 text-ink">In This Issue</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <SiteLink href="/" className="text-ink no-underline hover:text-link hover:underline">
                  Cover &amp; Contents
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/menus/" className="text-ink no-underline hover:text-link hover:underline">
                  The Menus &amp; Comparison
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/delivery/" className="text-ink no-underline hover:text-link hover:underline">
                  Delivery &amp; Service Areas
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/kitchen/" className="text-ink no-underline hover:text-link hover:underline">
                  The Kitchen &amp; Allergens
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/contact/" className="text-link">
                  Request a quote
                </SiteLink>
              </li>
            </ul>
          </div>

          {/* Delivery zones summary */}
          <div className="md:col-span-4">
            <h2 className="kicker mb-4 text-ink">Delivery Zones</h2>
            <ul className="space-y-2 text-sm text-muted">
              {deliveryZones.map(zone => (
                <li key={zone.id} className="flex items-baseline justify-between gap-2 border-b border-rule/60 pb-1.5">
                  <span className="text-ink">{zone.name}</span>
                  <span className="tabular-nums text-xs">
                    {formatFee(zone.deliveryFeePence)} · min {zone.minGuests}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom colophon strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-xs text-muted">
          <p className="folio">
            Cooked in Bermondsey · {business.issueLine}
          </p>
          <span title="Made with love by jamstacks.net">
            with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            <a
              className="no-underline hover:text-link hover:underline"
              href="https://jamstacks.net"
            >
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
