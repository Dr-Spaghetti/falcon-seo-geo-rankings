"use client";

import type { ScanKind, ScanKindFilter } from "@/lib/lf-scan-kind";
import { SCAN_KIND_LABEL } from "@/lib/lf-scan-kind";

const CHIP_BASE =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export function ScanKindFilterChips({
  value,
  onChange,
  counts,
  tone = "hub",
}: {
  value: ScanKindFilter;
  onChange: (next: ScanKindFilter) => void;
  counts?: { all: number; geo: number; seo: number };
  /** hub = dark client hub; light = navy location dashboard */
  tone?: "hub" | "light";
}) {
  const items: { id: ScanKindFilter; label: string; count?: number }[] = [
    { id: "all", label: "All", count: counts?.all },
    { id: "geo", label: "GEO", count: counts?.geo },
    { id: "seo", label: "SEO", count: counts?.seo },
  ];

  const ringOffset =
    tone === "hub"
      ? "focus-visible:ring-offset-[#101726]"
      : "focus-visible:ring-offset-navy-100";
  const idle =
    tone === "hub"
      ? "border border-slate-600/80 bg-[#172238] text-hub-text hover:border-[color:color-mix(in_srgb,var(--hub-metal)_50%,transparent)] hover:text-[#f7e492]"
      : "border border-navy-200/80 bg-navy-50/90 text-navy-700 hover:border-navy-400 hover:text-navy-900";
  const active =
    tone === "hub"
      ? "gold-badge text-[#0a1120] shadow-sm"
      : "border border-navy-800 bg-navy-800 text-white shadow-sm";
  const ring =
    tone === "hub" ? "focus-visible:ring-[#f7e492]" : "focus-visible:ring-navy-600";

  return (
    <div
      role="group"
      aria-label="Filter by GEO or SEO"
      className="flex flex-wrap items-center gap-2"
      data-scan-kind-chips
    >
      {items.map((item) => {
        const selected = value === item.id;
        const title =
          item.id === "all"
            ? "Show all"
            : `${SCAN_KIND_LABEL[item.id].short} — ${SCAN_KIND_LABEL[item.id].detail}`;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected}
            title={title}
            onClick={() => onChange(item.id)}
            className={`${CHIP_BASE} ${ring} ${ringOffset} ${selected ? active : idle}`}
            data-scan-kind-chip={item.id}
            data-active={selected ? "true" : "false"}
          >
            <span>{item.label}</span>
            {typeof item.count === "number" ? (
              <span className="tabular-nums opacity-80">
                {item.count.toLocaleString("en-US")}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** Badge for a single report/scan (light navy location table). */
export function ScanKindBadge({
  kind,
  platform,
}: {
  kind: ScanKind | null;
  platform?: string | null;
}) {
  if (!kind) return null;
  const meta = SCAN_KIND_LABEL[kind];
  const title = platform
    ? `${meta.short} — ${meta.detail} (${platform})`
    : `${meta.short} — ${meta.detail}`;
  const colors =
    kind === "geo"
      ? "border-violet-300 bg-violet-50 text-violet-800"
      : "border-sky-300 bg-sky-50 text-sky-800";

  return (
    <span
      title={title}
      data-scan-kind-badge={kind}
      data-platform={platform || undefined}
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors}`}
    >
      {meta.short}
    </span>
  );
}

/** Compact hub location-card chips showing which kinds exist at that office. */
export function LocationKindBadges({
  geoCount,
  seoCount,
}: {
  geoCount: number;
  seoCount: number;
}) {
  if (geoCount <= 0 && seoCount <= 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5" data-location-kind-badges>
      {geoCount > 0 ? (
        <span
          title={`GEO — LLM / geo grid · ${geoCount.toLocaleString("en-US")} scans`}
          data-scan-kind-badge="geo"
          className="inline-flex items-center rounded-full border border-violet-400/50 bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-200"
        >
          GEO
        </span>
      ) : null}
      {seoCount > 0 ? (
        <span
          title={`SEO — Google / Maps · ${seoCount.toLocaleString("en-US")} scans`}
          data-scan-kind-badge="seo"
          className="inline-flex items-center rounded-full border border-sky-400/50 bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-200"
        >
          SEO
        </span>
      ) : null}
    </div>
  );
}
