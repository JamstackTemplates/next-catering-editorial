'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { formatFee } from '../content/zones';
import { lookupPostcode, type PostcodeLookupResult } from '../lib/postcode';
import { EditorialCornerMarks } from './dividers';
import { SiteLink } from './site-link';

/**
 * Newspaper-style postcode district look-up box for /delivery/.
 * Hidden without JavaScript — the full zone table with districts below serves as the static answer.
 */
export function PostcodeChecker() {
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<PostcodeLookupResult | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(lookupPostcode(query));
  }

  return (
    <section aria-labelledby="postcode-checker-heading" className="wrap mb-14">
      <div className="editorial-frame surface-linen-deep relative p-6 sm:p-8">
        <EditorialCornerMarks />
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="kicker">Postcode Look-Up</p>
            <h2
              id="postcode-checker-heading"
              className="mt-1 font-editorial text-2xl italic text-ink sm:text-3xl"
            >
              Check your venue’s delivery zone
            </h2>
            <p className="mt-2 text-sm text-muted">
              Enter a postcode or outward district — for example <span className="font-semibold text-ink">SE1</span>,{' '}
              <span className="font-semibold text-ink">N16</span> or <span className="font-semibold text-ink">GU1</span>.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end md:col-span-7">
            <div className="flex-1">
              <label htmlFor="postcode-input" className="kicker block text-ink">
                Venue postcode
              </label>
              <input
                id="postcode-input"
                type="text"
                autoComplete="postal-code"
                placeholder="e.g. N16 7AB"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="ruled-input mt-1 uppercase"
              />
            </div>
            <button type="submit" className="button shrink-0">
              Check zone
            </button>
          </form>
        </div>

        <div className="mt-5" role="status" aria-live="polite">
          {result?.status === 'matched' ? (
            <div className="border-t border-rule pt-5">
              <p className="kicker text-link">Matched · {result.outward}</p>
              <p className="mt-1 font-editorial text-2xl italic text-ink">{result.zone.name}</p>
              <p className="mt-2 text-sm text-muted">{result.zone.summary}</p>
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <dt className="kicker inline text-[0.68rem]">Delivery fee: </dt>
                  <dd className="inline font-semibold tabular-nums text-ink">
                    {formatFee(result.zone.deliveryFeePence)}
                  </dd>
                </div>
                <div>
                  <dt className="kicker inline text-[0.68rem]">Minimum guests: </dt>
                  <dd className="inline font-semibold tabular-nums text-ink">
                    {result.zone.minGuests}
                  </dd>
                </div>
                <div>
                  <dt className="kicker inline text-[0.68rem]">Service: </dt>
                  <dd className="inline font-semibold text-ink">
                    {result.zone.staffedOnly ? 'Staffed events only' : 'Drop-off or staffed'}
                  </dd>
                </div>
                <div>
                  <dt className="kicker inline text-[0.68rem]">Extra notice: </dt>
                  <dd className="inline font-semibold tabular-nums text-ink">
                    {result.zone.extraLeadDays === 0
                      ? 'Standard menu notice'
                      : `+${result.zone.extraLeadDays} ${result.zone.extraLeadDays === 1 ? 'day' : 'days'}`}
                  </dd>
                </div>
              </dl>
            </div>
          ) : result?.status === 'outside' ? (
            <div className="border-t border-rule pt-5">
              <p className="kicker text-primary">Outside standard zones · {result.outward}</p>
              <p className="mt-1.5 text-sm text-ink">
                {result.message}{' '}
                <SiteLink href="/contact/" className="text-link">
                  Request a quote
                </SiteLink>
              </p>
            </div>
          ) : result?.status === 'empty' ? (
            <p className="border-t border-rule pt-4 text-sm text-muted">{result.message}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
