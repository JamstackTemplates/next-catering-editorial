'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Live office-hours status badge.
 * Static/no-JS output stays neutral ("Office hours: Mon–Fri 09:00–17:30");
 * in the browser it computes status in Europe/London and refreshes every minute.
 */
export function OpenBadge({
  hours,
  staticLabel = 'Office hours: Mon–Fri 09:00–17:30',
}: {
  hours: readonly OpeningHours[];
  staticLabel?: string;
}) {
  const [label, setLabel] = useState(staticLabel);

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');

  return (
    <span className="inline-flex items-center gap-2 border border-rule bg-paper px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase text-ink">
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? 'bg-sage' : 'bg-muted/60'}`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
