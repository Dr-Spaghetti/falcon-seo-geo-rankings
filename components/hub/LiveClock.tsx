"use client";

import { useEffect, useState } from "react";

/**
 * Live America/New_York clock, e.g. "24th Sep, 11:43 AM EST" (sm+),
 * "11:43 AM EST" below 640px so the mobile header stays one row.
 * Server / first paint: stable-width placeholder (no clock text) so SSR HTML
 * matches the client's first paint — avoids React #418 / #423 / #425.
 * Live label only after mount.
 */
export function LiveClock({ className }: { className?: string }) {
  const [label, setLabel] = useState<{ full: string; short: string; iso: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setLabel({ ...formatNy(d), iso: d.toISOString() });
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      className={className}
      dateTime={label?.iso}
      aria-live="off"
      suppressHydrationWarning
      style={{
        display: "inline-block",
        textAlign: "right",
        whiteSpace: "nowrap",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {label ? (
        <>
          {/* <640px: time + zone only, so the header stays one row */}
          <span className="sm:hidden">{label.short}</span>
          <span className="hidden sm:inline">{label.full}</span>
        </>
      ) : (
        "\u00a0"
      )}
    </time>
  );
}

function formatNy(d: Date): { full: string; short: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).formatToParts(d);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayNum = Number(get("day"));
  const day = `${dayNum}${ordinal(dayNum)}`;
  const month = get("month");
  const hour = get("hour");
  const minute = get("minute");
  const dayPeriod = get("dayPeriod");
  const tz = get("timeZoneName") || "ET";
  return {
    full: `${day} ${month}, ${hour}:${minute} ${dayPeriod} ${tz}`,
    short: `${hour}:${minute} ${dayPeriod} ${tz}`,
  };
}

function ordinal(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}
