import type { ReactNode } from 'react';

/** Running-stitch divider: dashed linen thread with a burnt-saffron knot in the centre. */
export function RunningStitchDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`my-10 flex items-center gap-4 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 20" className="h-5 w-full" preserveAspectRatio="none">
        <line
          x1="0"
          y1="10"
          x2="274"
          y2="10"
          stroke="var(--rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <g transform="translate(300 10)">
          <path
            d="M-16 0 L-8 -5 L0 0 L8 5 L16 0 M-16 0 L-8 5 L0 0 L8 -5 L16 0"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="0" r="2.75" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1" />
        </g>
        <line
          x1="326"
          y1="10"
          x2="600"
          y2="10"
          stroke="var(--rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Folio rule: double-hairline magazine rule with diamond ornament carrying issue/page folio labels. */
export function FolioRule({
  left,
  right,
  className = '',
}: {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-rule-strong pt-1 ${className}`}>
      <div className="flex items-center gap-4 border-t border-rule/70 pt-2.5">
        <span className="folio">{left}</span>
        <span className="h-px flex-1 bg-rule/60" aria-hidden="true" />
        <span className="text-[0.65rem] text-saffron" aria-hidden="true">
          ◆
        </span>
        <span className="h-px flex-1 bg-rule/60" aria-hidden="true" />
        {right ? <span className="folio">{right}</span> : null}
      </div>
    </div>
  );
}

/**
 * Woven linen hemstitch section border: French-blue ticking selvedge bars
 * framing a delicate burnt-saffron diamond fleuron.
 */
export function LinenHemDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`wrap my-2 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-4">
        <span className="h-[5px] flex-1 border-y border-linen-blue/40 bg-[repeating-linear-gradient(90deg,var(--rule-strong)_0_1px,transparent_1px_9px)]" />
        <svg viewBox="0 0 64 16" className="h-4 w-16 shrink-0">
          <path
            d="M4 8 H20 M44 8 H60"
            stroke="var(--linen-blue)"
            strokeWidth="1.25"
            strokeOpacity="0.65"
          />
          <path
            d="M24 8 L32 2 L40 8 L32 14 Z"
            fill="var(--saffron)"
            fillOpacity="0.28"
            stroke="var(--primary)"
            strokeWidth="1.2"
          />
          <circle cx="32" cy="8" r="2" fill="var(--primary)" />
        </svg>
        <span className="h-[5px] flex-1 border-y border-linen-blue/40 bg-[repeating-linear-gradient(90deg,var(--rule-strong)_0_1px,transparent_1px_9px)]" />
      </div>
    </div>
  );
}

/**
 * Corner printer's registration ornaments for letterpress frames and photographic plates.
 */
export function EditorialCornerMarks({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-primary/80" />
      <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-primary/80" />
      <span className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-primary/80" />
      <span className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 border-b-2 border-r-2 border-primary/80" />
    </div>
  );
}

/**
 * Subtle architectural railway-arch & saffron-thread background watermark
 * evoking our Bermondsey SE1 arch kitchen.
 */
export function ArchWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 320"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Concentric Bermondsey brick-arch curves */}
      <path
        d="M36 310 V176 C36 92 100 32 180 32 C260 32 324 92 324 176 V310"
        fill="none"
        stroke="var(--watermark-ink)"
        strokeWidth="2"
      />
      <path
        d="M58 310 V178 C58 106 112 54 180 54 C248 54 302 106 302 178 V310"
        fill="none"
        stroke="var(--watermark-ink)"
        strokeWidth="1.25"
        strokeDasharray="6 6"
      />
      <path
        d="M84 310 V182 C84 122 126 78 180 78 C234 78 276 122 276 182 V310"
        fill="none"
        stroke="var(--watermark-ink)"
        strokeWidth="1"
      />
      {/* Subtle keystone cross */}
      <path
        d="M180 18 V46 M168 32 H192"
        stroke="var(--watermark-ink)"
        strokeWidth="1.5"
      />
      {/* Delicate saffron crocus silhouette inside the arch */}
      <path
        d="M180 264 V196 M180 218 C162 198 156 172 168 154 C176 168 180 186 180 218 Z M180 218 C198 198 204 172 192 154 C184 168 180 186 180 218 Z M180 206 C172 180 164 156 152 142 M180 206 V136 M180 206 C188 180 196 156 208 142"
        fill="none"
        stroke="var(--watermark-ink)"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
