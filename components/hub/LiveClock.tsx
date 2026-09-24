"use client";

import { useEffect, useState } from "react";

/** Live America/New_York clock, e.g. "24th Sep, 11:43 AM EST" */
export function LiveClock({ className }: { className?: string }) {
  const [label, setLabel] = useState(() => formatNy(new Date()));

  useEffect(() => {
    const tick = () => setLabel(formatNy(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} dateTime={new Date().toISOString()} aria-live="off">
      {label}
    </time>
  );
}

function formatNy(d: Date): string {
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
  return `${day} ${month}, ${hour}:${minute} ${dayPeriod} ${tz}`;
}

function ordinal(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}
