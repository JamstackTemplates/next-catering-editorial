import type { ReactNode } from 'react';
import { ArchWatermark, FolioRule } from './dividers';

/**
 * Editorial section opener for inner pages:
 * kicker ("Section 02 · Delivery"), large italic title, two-column standfirst with drop cap,
 * folio rule underneath, and an optional small motif illustration.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  folio,
  motif,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  folio?: string;
  motif?: ReactNode;
}) {
  return (
    <header className="relative overflow-x-clip pt-[clamp(2.5rem,5vw,4.25rem)] pb-[clamp(1.75rem,3vw,2.75rem)]">
      <div className="pointer-events-none absolute -top-10 -left-14 z-0 hidden opacity-65 lg:block">
        <ArchWatermark className="h-72 w-72" />
      </div>
      <div className="wrap relative z-10">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className={motif ? 'md:col-span-9' : 'md:col-span-12'}>
            <p className="kicker">{eyebrow}</p>
            <h1
              id={id}
              className="mt-3 font-editorial text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.02] text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-6 max-w-4xl text-[1.0625rem] leading-relaxed text-muted md:columns-2 md:gap-10">
                {children}
              </div>
            ) : null}
          </div>
          {motif ? (
            <div className="hidden justify-self-end md:col-span-3 md:block" aria-hidden="true">
              {motif}
            </div>
          ) : null}
        </div>
        <FolioRule left={eyebrow} right={folio ?? 'The Menu Issue'} className="mt-8" />
      </div>
    </header>
  );
}
