import { useId } from 'react';

/**
 * Signature element: the saffron linen ribbon bookmark with a forked end.
 * Used in the masthead/hero, beside matching menu spreads, and on matching comparison columns.
 */
export function SaffronRibbon({
  className = '',
  height = 76,
  width = 24,
  label,
}: {
  className?: string;
  height?: number;
  width?: number;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 84"
      width={width}
      height={height}
      className={`saffron-ribbon shrink-0 ${className}`}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {/* Risograph offset fill */}
      <path
        d="M4 0 H24 V78 L14 67 L4 78 Z"
        fill="var(--saffron)"
        transform="translate(2 2)"
      />
      {/* Deep saffron fold shadow at top */}
      <path d="M4 0 H24 V8 H4 Z" fill="var(--primary)" fillOpacity="0.28" />
      {/* Ink outline */}
      <path
        d="M4 0 V77 L14 66 L24 77 V0"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Running stitch detail */}
      <line
        x1="8"
        y1="6"
        x2="8"
        y2="68"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <line
        x1="20"
        y1="6"
        x2="20"
        y2="68"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

/**
 * Hero illustration: "The Long Table at Six"
 * Overhead flat-lay editorial illustration with 1.5px ink line, risograph 2px offset fills,
 * halftone dot shadows, French linen blue-stripe runner, saffron rice platter, bowls,
 * flatbread board, wine glasses, folded napkins and a server's hands setting down a dish.
 */
export function HeroTableArt({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const halftoneId = `hero-ht-${uid}`;
  const weaveId = `hero-wv-${uid}`;

  return (
    <svg
      viewBox="0 0 740 600"
      className={`block h-auto w-full select-none ${className}`}
      role="img"
      aria-label="Overhead editorial illustration of a linen-draped long table with a blue-stripe runner, a platter of saffron rice, dipping bowls, flatbreads, wine glasses, folded napkins, and a server's hands setting down a dish."
    >
      <defs>
        <pattern id={halftoneId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" fill="var(--halftone)" />
        </pattern>
        <pattern id={weaveId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 H10 M5 0 V10" stroke="var(--rule)" strokeWidth="0.6" strokeOpacity="0.45" />
        </pattern>
      </defs>

      {/* Linen tablecloth base */}
      <rect x="26" y="24" width="698" height="552" rx="4" fill="var(--paper-deep)" transform="translate(3 3)" />
      <rect x="24" y="22" width="698" height="552" rx="4" fill={`url(#${weaveId})`} stroke="var(--ink)" strokeWidth="1.5" />

      {/* French linen blue-stripe table runner down the centre */}
      <g>
        <rect x="220" y="22" width="256" height="552" fill="var(--paper)" />
        <rect x="220" y="22" width="256" height="552" fill={`url(#${weaveId})`} />
        {/* Left & right ticking stripes */}
        <line x1="236" y1="22" x2="236" y2="574" stroke="var(--linen-blue)" strokeWidth="5" strokeOpacity="0.85" />
        <line x1="244" y1="22" x2="244" y2="574" stroke="var(--linen-blue)" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="452" y1="22" x2="452" y2="574" stroke="var(--linen-blue)" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="460" y1="22" x2="460" y2="574" stroke="var(--linen-blue)" strokeWidth="5" strokeOpacity="0.85" />
        {/* Runner border stitching */}
        <line x1="220" y1="22" x2="220" y2="574" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="476" y1="22" x2="476" y2="574" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 4" />
      </g>

      {/* Halftone shadows under vessels */}
      <ellipse cx="358" cy="252" rx="112" ry="74" fill={`url(#${halftoneId})`} />
      <rect x="264" y="388" width="184" height="114" rx="22" fill={`url(#${halftoneId})`} />
      <circle cx="154" cy="184" r="46" fill={`url(#${halftoneId})`} />
      <circle cx="590" cy="364" r="42" fill={`url(#${halftoneId})`} />
      <circle cx="566" cy="482" r="24" fill={`url(#${halftoneId})`} />
      <circle cx="166" cy="466" r="24" fill={`url(#${halftoneId})`} />

      {/* Centrepiece: Oval platter of saffron jewelled rice */}
      <g transform="translate(348 242)">
        {/* Riso offset platter fill */}
        <ellipse cx="2.5" cy="2.5" rx="110" ry="72" fill="var(--paper)" />
        <ellipse cx="0" cy="0" rx="110" ry="72" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        <ellipse cx="0" cy="0" rx="95" ry="59" fill="none" stroke="var(--rule)" strokeWidth="1.1" />
        {/* Mound of saffron rice (offset fill + ink) */}
        <path
          d="M-74 4 C-78 -32, -26 -50, 12 -46 C54 -42, 82 -20, 76 12 C70 40, 26 50, -22 44 C-58 40, -72 24, -74 4 Z"
          fill="var(--saffron)"
          transform="translate(2.5 2.5)"
        />
        <path
          d="M-74 4 C-78 -32, -26 -50, 12 -46 C54 -42, 82 -20, 76 12 C70 40, 26 50, -22 44 C-58 40, -72 24, -74 4 Z"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        {/* Herb leaves in sage */}
        <path d="M-24 -12 C-16 -24, -2 -20, -6 -6 C-14 -4, -22 -6, -24 -12 Z" fill="var(--sage)" stroke="var(--ink)" strokeWidth="1.2" />
        <path d="M22 10 C32 2, 44 10, 34 22 C24 22, 20 16, 22 10 Z" fill="var(--sage)" stroke="var(--ink)" strokeWidth="1.2" />
        <path d="M-6 18 C4 10, 14 16, 8 28 C-2 28, -8 24, -6 18 Z" fill="var(--sage)" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Charred lemon half */}
        <circle cx="-42" cy="12" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
        <path d="M-42 0 V24 M-54 12 H-30 M-50 4 L-34 20 M-50 20 L-34 4" stroke="var(--primary)" strokeWidth="1" />
        {/* Barberries / pomegranate jewels */}
        <circle cx="-12" cy="-26" r="3" fill="var(--primary)" />
        <circle cx="14" cy="-22" r="2.8" fill="var(--primary)" />
        <circle cx="38" cy="-8" r="3.2" fill="var(--primary)" />
        <circle cx="-26" cy="24" r="2.8" fill="var(--primary)" />
        <circle cx="4" cy="-2" r="3" fill="var(--primary)" />
        <circle cx="48" cy="16" r="2.6" fill="var(--primary)" />
        {/* Serving spoon */}
        <path d="M62 24 L106 58" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M62 24 L106 58" stroke="var(--paper-deep)" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Wooden board of warm flatbreads & dips (lower centre) */}
      <g transform="translate(254 378)">
        <rect x="2.5" y="2.5" width="182" height="110" rx="18" fill="var(--paper-deep)" />
        <rect x="0" y="0" width="182" height="110" rx="18" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        {/* Board handle */}
        <path d="M182 42 H208 C216 42 216 68 208 68 H182" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.6" />
        <circle cx="198" cy="55" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.3" />
        {/* Flatbreads stacked */}
        <ellipse cx="64" cy="54" rx="44" ry="30" fill="var(--saffron)" fillOpacity="0.45" transform="translate(2 2)" />
        <ellipse cx="64" cy="54" rx="44" ry="30" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <ellipse cx="78" cy="60" rx="40" ry="26" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
        {/* Blister marks */}
        <circle cx="62" cy="52" r="3" fill="var(--primary)" fillOpacity="0.55" />
        <circle cx="84" cy="48" r="2.5" fill="var(--primary)" fillOpacity="0.55" />
        <circle cx="94" cy="66" r="3.5" fill="var(--primary)" fillOpacity="0.55" />
        <circle cx="70" cy="70" r="2" fill="var(--primary)" fillOpacity="0.55" />
        {/* Small dip bowl on board */}
        <circle cx="144" cy="48" r="22" fill="var(--sage)" fillOpacity="0.55" transform="translate(2 2)" />
        <circle cx="144" cy="48" r="22" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M134 48 C138 40, 150 40, 154 48 C150 56, 138 56, 134 48 Z" fill="none" stroke="var(--primary)" strokeWidth="1.3" />
      </g>

      {/* Left place setting: stoneware bowl, folded napkin & cutlery */}
      <g transform="translate(142 174)">
        <circle cx="2.5" cy="2.5" r="44" fill="var(--paper)" />
        <circle cx="0" cy="0" r="44" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="30" fill="var(--sage)" fillOpacity="0.35" stroke="var(--ink)" strokeWidth="1.3" />
        {/* Roasted squash slices inside */}
        <path d="M-14 -8 A14 14 0 0 1 12 -10" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M-10 12 A14 14 0 0 0 14 8" stroke="var(--saffron)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* Folded linen napkin (bottom left) with saffron ribbon band */}
      <g transform="translate(76 308)">
        <rect x="2.5" y="2.5" width="84" height="118" rx="2" fill="var(--paper)" />
        <rect x="0" y="0" width="84" height="118" rx="2" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="16" y1="0" x2="16" y2="118" stroke="var(--linen-blue)" strokeWidth="2.5" strokeOpacity="0.7" />
        <line x1="22" y1="0" x2="22" y2="118" stroke="var(--linen-blue)" strokeWidth="1" strokeOpacity="0.6" />
        {/* Saffron menu tie */}
        <rect x="0" y="48" width="84" height="16" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.3" />
        {/* Knife & fork beside napkin */}
        <path d="M-18 14 V104 M-23 14 V38 M-13 14 V38" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M102 16 V104 M102 16 C110 28 110 52 102 62" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" fill="var(--paper-deep)" />
      </g>

      {/* Wine glasses (top-left & bottom-right) */}
      <g transform="translate(158 458)">
        <circle cx="0" cy="0" r="22" fill="var(--paper)" fillOpacity="0.7" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="14" fill="var(--primary)" fillOpacity="0.22" stroke="var(--ink)" strokeWidth="1.1" />
        <circle cx="0" cy="0" r="3" fill="var(--ink)" />
      </g>
      <g transform="translate(558 474)">
        <circle cx="0" cy="0" r="22" fill="var(--paper)" fillOpacity="0.7" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="14" fill="var(--saffron)" fillOpacity="0.32" stroke="var(--ink)" strokeWidth="1.1" />
        <circle cx="0" cy="0" r="3" fill="var(--ink)" />
      </g>

      {/* Right side: ceramic dish of charred hispi cabbage */}
      <g transform="translate(580 354)">
        <circle cx="2.5" cy="2.5" r="40" fill="var(--paper)" />
        <circle cx="0" cy="0" r="40" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M-24 -6 C-12 -22, 18 -20, 24 0 C14 20, -16 22, -24 -6 Z" fill="var(--sage)" fillOpacity="0.55" stroke="var(--ink)" strokeWidth="1.4" />
        <path d="M-16 -2 L14 4 M-8 -10 L6 12" stroke="var(--primary)" strokeWidth="1.3" strokeLinecap="round" />
      </g>

      {/* Server's hands entering from upper right setting down a dish of figs & labneh */}
      <g transform="translate(492 52)">
        {/* Small glazed dish */}
        <circle cx="88" cy="116" r="44" fill={`url(#${halftoneId})`} />
        <circle cx="82" cy="110" r="42" fill="var(--paper)" transform="translate(2 2)" />
        <circle cx="80" cy="108" r="42" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        <circle cx="80" cy="108" r="30" fill="var(--saffron)" fillOpacity="0.3" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="72" cy="102" r="8" fill="var(--primary)" fillOpacity="0.75" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="90" cy="114" r="7" fill="var(--primary)" fillOpacity="0.75" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="76" cy="120" r="6" fill="var(--sage)" fillOpacity="0.7" stroke="var(--ink)" strokeWidth="1.2" />

        {/* Server sleeve & hand (top) */}
        <path
          d="M158 -16 L108 58 C100 68 88 72 80 68 C74 64 78 52 88 44 L126 -16 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* French linen apron cuff */}
        <path d="M122 -16 L166 12 L154 30 L110 2 Z" fill="var(--linen-blue)" fillOpacity="0.82" stroke="var(--ink)" strokeWidth="1.5" />

        {/* Server second hand cradling lower rim */}
        <path
          d="M236 146 L138 134 C124 132 118 122 122 114 C126 108 138 110 150 112 L236 116 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M188 106 L236 110 V152 L184 146 Z" fill="var(--linen-blue)" fillOpacity="0.82" stroke="var(--ink)" strokeWidth="1.5" />
      </g>

      {/* Small scattered salt pinch & olive oil cruet (top centre) */}
      <g transform="translate(332 94)">
        <circle cx="0" cy="0" r="16" fill="var(--paper-deep)" transform="translate(2 2)" />
        <circle cx="0" cy="0" r="16" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="48" cy="-6" r="11" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
        <circle cx="45" cy="-8" r="1.3" fill="var(--ink)" />
        <circle cx="51" cy="-4" r="1.3" fill="var(--ink)" />
        <circle cx="48" cy="-10" r="1.3" fill="var(--ink)" />
      </g>
    </svg>
  );
}

/** Saffron crocus motif with three burnt-saffron threads. */
export function SaffronCrocusArt({ className = 'h-24 w-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* Offset riso petal fills */}
      <g transform="translate(2.5 2.5)">
        <path d="M60 96 C38 80 30 56 44 38 C54 50 60 68 60 96 Z" fill="var(--linen-blue)" fillOpacity="0.24" />
        <path d="M60 96 C82 80 90 56 76 38 C66 50 60 68 60 96 Z" fill="var(--linen-blue)" fillOpacity="0.24" />
        <path d="M60 96 C48 72 48 44 60 28 C72 44 72 72 60 96 Z" fill="var(--saffron)" fillOpacity="0.28" />
      </g>
      {/* Petals ink */}
      <path d="M60 96 C38 80 30 56 44 38 C54 50 60 68 60 96 Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M60 96 C82 80 90 56 76 38 C66 50 60 68 60 96 Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M60 96 C48 72 48 44 60 28 C72 44 72 72 60 96 Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Slender sage leaves */}
      <path d="M60 112 V94 M60 104 C44 96 34 86 24 72 M60 104 C76 96 86 86 96 72" fill="none" stroke="var(--sage)" strokeWidth="1.6" strokeLinecap="round" />
      {/* Three saffron threads */}
      <path d="M60 82 C54 58 46 36 34 22" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M60 82 C60 56 60 32 60 14" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M60 82 C66 58 74 36 86 22" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="34" cy="22" r="3" fill="var(--primary)" />
      <circle cx="60" cy="14" r="3" fill="var(--primary)" />
      <circle cx="86" cy="22" r="3" fill="var(--primary)" />
    </svg>
  );
}

/** Folded pleated napkin & place card illustration for Contents and Editor's letter. */
export function FoldedNapkinArt({ className = 'w-44' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" className={`block h-auto ${className}`} aria-hidden="true">
      {/* Offset paper fill */}
      <rect x="24" y="24" width="112" height="128" rx="3" fill="var(--paper-deep)" transform="translate(3 3)" />
      <rect x="24" y="24" width="112" height="128" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Napkin pleats */}
      <line x1="48" y1="24" x2="48" y2="152" stroke="var(--rule)" strokeWidth="1.2" />
      <line x1="72" y1="24" x2="72" y2="152" stroke="var(--rule)" strokeWidth="1.2" />
      <line x1="96" y1="24" x2="96" y2="152" stroke="var(--linen-blue)" strokeWidth="3" strokeOpacity="0.7" />
      <line x1="103" y1="24" x2="103" y2="152" stroke="var(--linen-blue)" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Saffron ribbon wrap */}
      <rect x="24" y="76" width="112" height="16" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.4" />
      {/* Tucked place card */}
      <g transform="translate(78 38) rotate(8)">
        <rect x="2.5" y="2.5" width="94" height="62" rx="2" fill="var(--paper)" />
        <rect x="0" y="0" width="94" height="62" rx="2" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="6" y="6" width="82" height="50" fill="none" stroke="var(--rule)" strokeWidth="1" />
        <line x1="18" y1="24" x2="76" y2="24" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="26" y1="36" x2="68" y2="36" stroke="var(--primary)" strokeWidth="1.3" />
      </g>
      {/* Sprig of thyme */}
      <path d="M52 104 C56 80 68 62 82 50" fill="none" stroke="var(--sage)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="60" cy="82" r="2.5" fill="var(--sage)" />
      <circle cx="70" cy="68" r="2.5" fill="var(--sage)" />
      <circle cx="78" cy="58" r="2.5" fill="var(--sage)" />
    </svg>
  );
}

/**
 * Stylised London Zone Ring Map:
 * Thames as a linen-blue ribbon, Tower Bridge mark at SE1 Bermondsey,
 * and four concentric dashed rings labelled Zones 1–4.
 */
export function ZoneRingMapArt({
  size = 'large',
  className = '',
}: {
  size?: 'compact' | 'large';
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const htId = `map-ht-${uid}`;

  return (
    <svg
      viewBox="0 0 520 440"
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label="Stylised delivery zone ring map of London showing the River Thames, Tower Bridge near our Bermondsey kitchen, and four concentric delivery rings from Zone 1 Central to Zone 4 Home Counties."
    >
      <defs>
        <pattern id={htId} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--halftone)" />
        </pattern>
      </defs>

      {/* Frame */}
      <rect x="8" y="8" width="504" height="424" rx="3" fill="var(--paper-deep)" transform="translate(2.5 2.5)" />
      <rect x="8" y="8" width="504" height="424" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />

      {/* Concentric zone rings centred around SE1 (260, 224) */}
      {/* Zone 4: Home Counties */}
      <circle cx="260" cy="224" r="192" fill={`url(#${htId})`} fillOpacity="0.45" stroke="var(--rule)" strokeWidth="1.5" strokeDasharray="6 6" />
      {/* Zone 3: Outer London */}
      <circle cx="260" cy="224" r="144" fill="var(--paper-deep)" fillOpacity="0.65" stroke="var(--linen-blue)" strokeWidth="1.5" strokeDasharray="5 5" />
      {/* Zone 2: Inner London */}
      <circle cx="260" cy="224" r="96" fill="var(--saffron)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Zone 1: Central */}
      <circle cx="260" cy="224" r="50" fill="var(--saffron)" fillOpacity="0.32" stroke="var(--primary)" strokeWidth="1.75" />

      {/* River Thames as a linen-blue ribbon */}
      <path
        d="M20 264 C78 260, 118 232, 166 236 C214 240, 232 214, 266 218 C308 222, 336 250, 382 238 C428 226, 462 236, 502 224"
        fill="none"
        stroke="var(--linen-blue)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeOpacity="0.35"
        transform="translate(2 2)"
      />
      <path
        d="M20 264 C78 260, 118 232, 166 236 C214 240, 232 214, 266 218 C308 222, 336 250, 382 238 C428 226, 462 236, 502 224"
        fill="none"
        stroke="var(--linen-blue)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Tower Bridge stylised twin towers at Bermondsey SE1 */}
      <g transform="translate(260 218)">
        <rect x="-12" y="-14" width="6" height="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
        <rect x="6" y="-14" width="6" height="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
        <path d="M-12 -14 L-9 -20 L-6 -14 M6 -14 L9 -20 L12 -14 M-6 -10 H6 M-18 2 H18" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="0" cy="11" r="4.5" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.3" />
      </g>

      {/* Zone labels */}
      <g fontFamily="var(--font-sans)" fontWeight="700" fontSize={size === 'compact' ? '12' : '11'} letterSpacing="1.4">
        <text x="260" y="191" textAnchor="middle" fill="var(--ink)">ZONE 1</text>
        <text x="260" y="143" textAnchor="middle" fill="var(--ink)">ZONE 2 · INNER</text>
        <text x="260" y="95" textAnchor="middle" fill="var(--ink)">ZONE 3 · OUTER</text>
        <text x="260" y="48" textAnchor="middle" fill="var(--muted)">ZONE 4 · HOME COUNTIES</text>
      </g>

      {/* Kitchen caption */}
      <g fontFamily="var(--font-display)" fontStyle="italic" fontSize="13">
        <text x="260" y="254" textAnchor="middle" fill="var(--ink)">Bermondsey SE1</text>
      </g>

      {/* Compass rose (bottom right) */}
      <g transform="translate(464 384)">
        <circle cx="0" cy="0" r="18" fill="var(--paper)" stroke="var(--rule)" strokeWidth="1" />
        <path d="M0 -13 L3 0 L0 13 L-3 0 Z" fill="var(--primary)" />
        <path d="M-13 0 L0 -3 L13 0 L0 3 Z" fill="var(--ink)" />
        <text x="0" y="-21" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="700" fill="var(--muted)">N</text>
      </g>
    </svg>
  );
}

/**
 * Menu spread vignettes: one small flat-lay editorial illustration per menu ID.
 */
export function MenuVignette({
  menuId,
  className = 'w-full max-w-[16rem]',
}: {
  menuId: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 220 170" className={`block h-auto ${className}`} aria-hidden="true">
      {menuId === 'reception-canapes' ? (
        /* Canapé tray */
        <g>
          <rect x="22" y="34" width="176" height="104" rx="14" fill="var(--paper-deep)" transform="translate(3 3)" />
          <rect x="22" y="34" width="176" height="104" rx="14" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="34" y="46" width="152" height="80" rx="8" fill="none" stroke="var(--rule)" strokeWidth="1" />
          {[
            [62, 70, 'var(--saffron)'],
            [110, 70, 'var(--primary)'],
            [158, 70, 'var(--sage)'],
            [62, 106, 'var(--linen-blue)'],
            [110, 106, 'var(--saffron)'],
            [158, 106, 'var(--primary)'],
          ].map(([cx, cy, fill], idx) => (
            <g key={idx}>
              <circle cx={Number(cx) + 2} cy={Number(cy) + 2} r="13" fill={String(fill)} fillOpacity="0.45" />
              <circle cx={Number(cx)} cy={Number(cy)} r="13" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx={Number(cx)} cy={Number(cy)} r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1" />
            </g>
          ))}
        </g>
      ) : menuId === 'bowl-food' ? (
        /* Nest of bowls */
        <g>
          <circle cx="84" cy="72" r="42" fill="var(--saffron)" fillOpacity="0.35" transform="translate(2.5 2.5)" />
          <circle cx="84" cy="72" r="42" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="84" cy="72" r="26" fill="none" stroke="var(--primary)" strokeWidth="1.3" strokeDasharray="4 3" />

          <circle cx="148" cy="102" r="36" fill="var(--sage)" fillOpacity="0.38" transform="translate(2.5 2.5)" />
          <circle cx="148" cy="102" r="36" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="148" cy="102" r="22" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />

          <circle cx="72" cy="126" r="26" fill="var(--linen-blue)" fillOpacity="0.3" transform="translate(2 2)" />
          <circle cx="72" cy="126" r="26" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M126 42 L176 70" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ) : menuId === 'long-table-feast' ? (
        /* Long sharing platter */
        <g>
          <ellipse cx="110" cy="86" rx="88" ry="48" fill="var(--paper-deep)" transform="translate(3 3)" />
          <ellipse cx="110" cy="86" rx="88" ry="48" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <ellipse cx="110" cy="86" rx="68" ry="32" fill="var(--saffron)" fillOpacity="0.35" stroke="var(--ink)" strokeWidth="1.3" />
          <path d="M62 86 Q110 62 158 86 Q110 110 62 86 Z" fill="var(--sage)" fillOpacity="0.45" stroke="var(--ink)" strokeWidth="1.3" />
          <circle cx="92" cy="84" r="5" fill="var(--primary)" />
          <circle cx="128" cy="88" r="5" fill="var(--primary)" />
          <circle cx="110" cy="78" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1" />
        </g>
      ) : menuId === 'plated-dinner' ? (
        /* Plated three-course setting */
        <g>
          <circle cx="110" cy="86" r="54" fill="var(--paper-deep)" transform="translate(3 3)" />
          <circle cx="110" cy="86" r="54" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="110" cy="86" r="38" fill="var(--paper)" stroke="var(--rule)" strokeWidth="1.2" />
          <path d="M88 86 C96 68, 124 68, 132 86 C124 102, 96 102, 88 86 Z" fill="var(--primary)" fillOpacity="0.32" stroke="var(--ink)" strokeWidth="1.4" />
          <circle cx="110" cy="86" r="7" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Cutlery */}
          <path d="M36 44 V128 M31 44 V66 M41 44 V66" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M184 44 V128 M184 44 C192 54 192 78 184 86" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      ) : menuId === 'working-lunch' ? (
        /* Kraft lunch box */
        <g>
          <rect x="40" y="34" width="140" height="102" rx="4" fill="var(--paper-deep)" transform="translate(3 3)" />
          <rect x="40" y="34" width="140" height="102" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          {/* Diagonal sourdough sandwiches */}
          <polygon points="54,50 112,50 54,116" fill="var(--saffron)" fillOpacity="0.4" stroke="var(--ink)" strokeWidth="1.4" />
          <polygon points="116,54 116,120 60,120" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
          {/* Salad cup */}
          <circle cx="148" cy="74" r="20" fill="var(--sage)" fillOpacity="0.48" stroke="var(--ink)" strokeWidth="1.4" />
          {/* Flapjack square */}
          <rect x="132" y="102" width="32" height="22" rx="2" fill="var(--primary)" fillOpacity="0.35" stroke="var(--ink)" strokeWidth="1.3" />
        </g>
      ) : menuId === 'breakfast-meeting' ? (
        /* Breakfast pastry basket */
        <g>
          <ellipse cx="110" cy="88" rx="76" ry="52" fill="var(--paper-deep)" transform="translate(3 3)" />
          <ellipse cx="110" cy="88" rx="76" ry="52" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="6 3" />
          {/* Cardamom bun swirl */}
          <circle cx="82" cy="82" r="24" fill="var(--saffron)" fillOpacity="0.48" stroke="var(--ink)" strokeWidth="1.4" />
          <path d="M82 82 m-14 0 a14 14 0 1 1 28 0 a10 10 0 1 1 -20 0 a6 6 0 1 1 12 0" fill="none" stroke="var(--primary)" strokeWidth="1.4" />
          {/* Croissant */}
          <path d="M116 66 C138 56, 162 74, 152 100 C138 92, 124 88, 116 66 Z" fill="var(--saffron)" fillOpacity="0.32" stroke="var(--ink)" strokeWidth="1.4" />
          {/* Orange juice carafe */}
          <circle cx="128" cy="116" r="16" fill="var(--primary)" fillOpacity="0.38" stroke="var(--ink)" strokeWidth="1.4" />
        </g>
      ) : (
        /* Garden party grill board */
        <g>
          <rect x="28" y="38" width="164" height="94" rx="12" fill="var(--paper-deep)" transform="translate(3 3)" />
          <rect x="28" y="38" width="164" height="94" rx="12" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          {/* Grill lines */}
          <line x1="48" y1="54" x2="172" y2="54" stroke="var(--rule)" strokeWidth="1.5" />
          <line x1="48" y1="85" x2="172" y2="85" stroke="var(--rule)" strokeWidth="1.5" />
          <line x1="48" y1="116" x2="172" y2="116" stroke="var(--rule)" strokeWidth="1.5" />
          {/* Skewers */}
          <line x1="56" y1="118" x2="116" y2="50" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="74" y="84" width="14" height="14" rx="2" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.3" />
          <circle cx="96" cy="72" r="7" fill="var(--primary)" fillOpacity="0.55" stroke="var(--ink)" strokeWidth="1.3" />
          <line x1="104" y1="118" x2="164" y2="50" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="122" y="84" width="14" height="14" rx="2" fill="var(--sage)" fillOpacity="0.55" stroke="var(--ink)" strokeWidth="1.3" />
          <circle cx="144" cy="72" r="7" fill="var(--saffron)" stroke="var(--ink)" strokeWidth="1.3" />
        </g>
      )}
    </svg>
  );
}

/** 404 illustration: "Missing from the table" — empty place setting with askew cutlery and crumbs. */
export function EmptyPlaceSettingArt({ className = 'w-full max-w-md' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const htId = `empty-ht-${uid}`;

  return (
    <svg
      viewBox="0 0 380 260"
      className={`block h-auto ${className}`}
      role="img"
      aria-label="Overhead illustration of an empty place setting with knife and fork askew, scattered crumbs, and a place card reading Course not found."
    >
      <defs>
        <pattern id={htId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="var(--halftone)" />
        </pattern>
      </defs>

      {/* Linen mat */}
      <rect x="18" y="18" width="344" height="224" rx="4" fill="var(--paper-deep)" transform="translate(3 3)" />
      <rect x="18" y="18" width="344" height="224" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* Plate shadow */}
      <circle cx="196" cy="144" r="68" fill={`url(#${htId})`} />

      {/* Empty ceramic plate */}
      <circle cx="190" cy="138" r="66" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
      <circle cx="190" cy="138" r="46" fill="none" stroke="var(--rule)" strokeWidth="1.2" />

      {/* Scattered crumbs */}
      <circle cx="174" cy="128" r="2.2" fill="var(--primary)" />
      <circle cx="186" cy="148" r="1.8" fill="var(--ink)" />
      <circle cx="206" cy="132" r="2.4" fill="var(--saffron)" />
      <circle cx="198" cy="156" r="1.6" fill="var(--ink)" />
      <circle cx="222" cy="166" r="2" fill="var(--primary)" />

      {/* Askew fork (left) */}
      <g transform="translate(76 138) rotate(-14)">
        <path d="M0 -52 V54 M-6 -52 V-24 M6 -52 V-24 M-6 -24 Q0 -18 6 -24" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      </g>

      {/* Askew knife (right) */}
      <g transform="translate(304 136) rotate(11)">
        <path d="M0 -54 V54 M0 -54 C10 -40 10 -8 0 2" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" fill="var(--paper-deep)" />
      </g>

      {/* Place card above plate */}
      <g transform="translate(116 32) rotate(-3)">
        <rect x="2.5" y="2.5" width="148" height="44" rx="2" fill="var(--saffron)" fillOpacity="0.35" />
        <rect x="0" y="0" width="148" height="44" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
        <text
          x="74"
          y="27"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontStyle="italic"
          fontSize="16"
          fill="var(--ink)"
        >
          Course not found
        </text>
      </g>
    </svg>
  );
}
