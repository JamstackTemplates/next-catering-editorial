import { dietaryById, type DietaryId } from '../content/dietary';

/** Letterpress roundel stamp for a dietary mark (V, VE, GF, DF, NM). */
export function DietaryRoundel({
  id,
  size = 'sm',
  inverted = false,
}: {
  id: DietaryId;
  size?: 'xs' | 'sm' | 'md';
  inverted?: boolean;
}) {
  const mark = dietaryById.get(id);
  if (!mark) return null;

  const sizeClass =
    size === 'md'
      ? 'h-10 w-10 text-xs'
      : size === 'xs'
        ? 'h-6 w-6 text-[0.625rem]'
        : 'h-7 w-7 text-[0.6875rem]';

  const toneClass = inverted
    ? 'border-on-primary/70 text-on-primary bg-transparent'
    : id === 'vegan' || id === 'vegetarian'
      ? 'border-sage text-ink bg-sage/15'
      : id === 'gluten-free'
        ? 'border-saffron text-ink bg-saffron/15'
        : id === 'dairy-free'
          ? 'border-linen-blue text-ink bg-linen-blue/15'
          : 'border-primary/70 text-ink bg-primary/10';

  return (
    <span
      title={`${mark.label} — ${mark.note}`}
      aria-label={mark.label}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-sans font-bold tracking-[0.06em] ${sizeClass} ${toneClass}`}
    >
      {mark.code}
    </span>
  );
}

/** Drop-off crate icon (editorial 1.5px ink line). */
export function DropOffCrateIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="1" fill="var(--saffron)" fillOpacity="0.28" transform="translate(1.5 1.5)" />
      <rect x="3.5" y="7.5" width="17" height="12.5" rx="1" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M3.5 12 H20.5 M9 7.5 V5.5 C9 4.5 9.8 4 12 4 C14.2 4 15 4.5 15 5.5 V7.5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 15.5 H14.5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Staffed server with tray icon. */
export function StaffedTrayIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4.5 15 A7.5 7.5 0 0 1 19.5 15 Z" fill="var(--linen-blue)" fillOpacity="0.24" transform="translate(1.5 1.5)" />
      <path d="M4.5 14.5 A7.5 7.5 0 0 1 19.5 14.5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="5.5" r="1.5" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.4" />
      <path d="M2.5 15.5 H21.5 M6 19.5 H18" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Lead-time calendar leaf icon. */
export function CalendarLeafIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="1" fill="var(--sage)" fillOpacity="0.22" transform="translate(1.5 1.5)" />
      <rect x="3.5" y="5.5" width="17" height="14.5" rx="1" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M3.5 10 H20.5 M8 3.5 V7 M16 3.5 V7" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 15 C11 13 13.5 12.5 15.5 13 C15 15 13.5 16.5 11.5 17 C10.3 17.3 9.3 16.4 9 15 Z" stroke="var(--primary)" strokeWidth="1.4" />
    </svg>
  );
}

/** Guests as overhead place settings icon. */
export function GuestsSettingIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5.5" fill="var(--saffron)" fillOpacity="0.26" transform="translate(1.5 1.5)" />
      <circle cx="12" cy="12" r="5.5" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="var(--rule)" strokeWidth="1.2" />
      <path d="M3.5 7 V17 M2.3 7 V10.5 M4.7 7 V10.5 M20.5 7 V17 M20.5 7 C21.8 8.5 21.8 11 20.5 12" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Editorial telephone icon. */
export function PhoneIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5.5 4.5 H9 L10.8 9 L8.6 10.6 C9.8 13 11.5 14.7 13.9 15.9 L15.5 13.7 L20 15.5 V19 C20 19.8 19.3 20.5 18.5 20.5 C10.8 20.5 4.5 14.2 4.5 6.5 C4.5 5.4 4.9 4.5 5.5 4.5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Editorial envelope icon. */
export function EmailIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 6.5 L12 13 L20 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
