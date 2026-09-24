import Link from "next/link";
import type { LfClient } from "@/lib/lf";
import { OfficialLogo } from "@/components/hub/OfficialLogo";
import { JUSTIFY_LOCAL_LOGO, getFirmLogo } from "@/lib/brand-logos";
import { hubStatLabels } from "@/lib/hub-labels";

/**
 * Shared premium ClientHub — Nick HTML SoT (2026-09-24) style.
 * Circuit-bg + Cinzel/Inter. Official firm logo rendered as-is between the gold
 * pillars (no ring / disc / plate / circular crop / mask); no Greek-key border.
 * Per-firm chrome via --brand-accent / --hub-* tokens (not DJ-gold stamped).
 */
export function ClientHub({ client }: { client: LfClient }) {
  const base = `/clients/${client.slug}`;
  const firmLogo = getFirmLogo(client.slug);
  const { locations: locationsLabel, scans: scansLabel } = hubStatLabels(
    client.location_count,
    client.scan_count,
  );
  const isLongName = client.name.length > 34;

  // Real latest scan from location data (no fake "Operational & Synced")
  const latestDates = client.locations
    .map((l) => l.latest_iso)
    .filter((d): d is string => Boolean(d))
    .sort();
  const latestIso = latestDates.length ? latestDates[latestDates.length - 1] : null;
  const latestLabel = latestIso
    ? `Latest scan ${formatScanDate(latestIso)}`
    : null;

  return (
    <div className="relative flex flex-col gap-6 text-slate-100">
      {/* Hero — no ornate Greek-key / filigree border (CoS 2026-09-24).
          Keep CSS gold pillars only. Soft slate card edge, not meander. */}
      <section
        className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[color-mix(in_srgb,var(--hub-card)_92%,#000)] p-6 shadow-xl"
        aria-label={`${client.name} client dashboard`}
      >
        <div className="relative z-10 flex flex-col items-center justify-between gap-6 px-2 [--firm-logo-max-h:128px] [--firm-logo-max-w:min(340px,calc(100vw-190px))] xl:flex-row xl:px-4 xl:[--firm-logo-max-h:148px] xl:[--firm-logo-max-w:460px]">
          {/* Left: OFFICIAL Justify Local logo file, untouched (no text + arrows rebuild) */}
          <div
            data-logo-slot="hero-justify"
            className="flex shrink-0 items-center justify-center self-stretch"
          >
            <OfficialLogo
              logo={JUSTIFY_LOCAL_LOGO}
              slot="hero-justify"
              className="h-[72px] w-auto md:h-[88px]"
            />
          </div>

          {/* Center stack */}
          <div className="flex min-w-0 flex-1 flex-col items-center px-2 text-center xl:px-4">
            <h1
              className={
                isLongName
                  ? "line-clamp-2 max-w-[28ch] font-serif text-base font-bold uppercase leading-snug tracking-wider text-[#f0d481] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-lg md:text-xl"
                  : "font-serif text-2xl font-bold uppercase tracking-widest text-[#f0d481] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-3xl"
              }
            >
              {client.name}
            </h1>
            <p className="mb-2 mt-0.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-hub-text">
              Client Dashboard
            </p>
            {/* Stats pill: one line at 390 (tighter tracking/padding <640px);
                each segment is nowrap, so any wrap on very narrow screens
                happens only between the two segments, never mid-label. */}
            <div
              data-hub-stats
              className="gold-badge-outline mb-2 max-w-full rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-wide text-[#f7e492] sm:px-5 sm:text-xs sm:tracking-wider"
            >
              <span className="whitespace-nowrap">{locationsLabel}</span>
              <span aria-hidden="true" className="mx-1.5 text-[#f7e492]/80 sm:mx-2">|</span>
              <span className="whitespace-nowrap">{scansLabel}</span>
            </div>
            <p className="text-xs font-normal text-hub-text">
              Select a location to review rankings, filters, and scan reports.
            </p>
          </div>

          {/* Right: gold pillars flanking the OFFICIAL firm logo file, as-is.
              Clear space logo box -> pillar: 24px (xl row layout), 16px (stacked <1280px).
              Shared template for every client: no ring, disc, plate, circular
              crop, mask, filter or recolor. Aspect locked to natural size. */}
          <div
            data-pillar-cluster
            className="flex max-w-full shrink-0 items-stretch gap-4 xl:gap-6"
          >
            <CssGoldPillar />
            <div
              data-logo-slot="firm-logo"
              className="flex min-w-0 items-center justify-center"
            >
              {firmLogo ? (
                <OfficialLogo
                  logo={firmLogo}
                  slot="firm-logo"
                  priority
                  className="h-auto"
                  style={{
                    // Fit inside (--firm-logo-max-w x --firm-logo-max-h), ratio locked.
                    width: `min(var(--firm-logo-max-w), calc(var(--firm-logo-max-h) * ${firmLogo.width} / ${firmLogo.height}))`,
                  }}
                />
              ) : (
                <span className="flex h-24 w-32 items-center justify-center px-1 text-center text-[10px] uppercase tracking-wider text-hub-text">
                  Logo unavailable
                </span>
              )}
            </div>
            <CssGoldPillar />
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section aria-label="Office Locations" className="flex flex-col gap-3">
        <div>
          <span className="gold-badge inline-flex items-center gap-1.5 rounded-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <LocationOnIcon className="h-3.5 w-3.5" />
            Office Locations
          </span>
        </div>

        <div data-location-grid className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {client.locations.map((loc) => {
            const locLatest =
              loc.latest_iso || loc.latest_date
                ? `Latest scan ${formatScanDate(loc.latest_iso || loc.latest_date || "")}`
                : latestLabel;
            return (
              <article
                key={loc.place_id}
                data-location-card
                className="relative flex cursor-pointer flex-col justify-between rounded-xl border border-slate-700/70 bg-[#101726]/90 p-5 shadow-xl sm:p-6 backdrop-blur-sm transition-all duration-200 hover:border-[color:color-mix(in_srgb,var(--hub-metal)_60%,transparent)]"
              >
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-slate-800 pb-3">
                    <h2
                      className="min-w-0 break-words font-serif text-xl font-bold leading-tight text-white underline decoration-2 underline-offset-[5px] xl:text-2xl"
                      style={{
                        textDecorationColor:
                          "color-mix(in srgb, var(--hub-metal) 60%, transparent)",
                      }}
                    >
                      {loc.city || loc.name}
                    </h2>
                    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-700/80 bg-[#172238] px-3 py-1 text-[13px] font-medium text-hub-text">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      {loc.scan_count.toLocaleString()} scans
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="break-words text-[15px] leading-relaxed text-hub-text xl:text-base">
                        {loc.address || "Address unavailable"}
                      </p>
                      {locLatest ? (
                        <div className="flex items-center gap-2 pt-2 text-sm font-medium text-emerald-400">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                          {locLatest}
                        </div>
                      ) : null}
                    </div>
                    {/* CSS radar/grid thumb + glowing pin (HTML SoT ADOPT) */}
                    <div
                      className="pointer-events-none relative flex h-20 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-700/80 bg-[#0a1120]"
                      aria-hidden
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      <LocationOnIcon className="relative z-10 h-6 w-6 text-emerald-400 drop-shadow-[0_0_6px_rgba(0,214,143,0.8)]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end border-t border-slate-800/80 pt-3">
                  {/* Stretched link: its ::after covers the whole card, so title,
                      address and map all open the dashboard with ONE link / tab stop (no
                      nested interactive elements). No transform/filter on the link so
                      the ::after stays anchored to the <article>. */}
                  <Link
                    href={`${base}/locations/${loc.place_id}`}
                    aria-label={`Open dashboard for ${loc.city || loc.name}`}
                    data-card-link
                    className="gold-badge inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold shadow-sm transition-shadow after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:shadow-[0_0_0_2px_rgba(247,228,146,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7e492] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101726] focus-visible:after:ring-2 focus-visible:after:ring-[#f7e492]/70 xl:text-[15px]"
                  >
                    <span>Open dashboard</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {client.locations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-16 text-center">
            <p className="text-sm font-medium text-white/90">
              No locations in this firm hub
            </p>
            <p className="mt-1 text-sm text-hub-text">
              Location rankings will appear here once scans are available.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function CssGoldPillar() {
  // Stretches to the firm logo's height (parent is items-stretch).
  return (
    <div className="flex min-h-[72px] flex-col items-center" aria-hidden>
      <div
        className="h-1.5 w-5 shrink-0 rounded-t-sm"
        style={{
          background:
            "linear-gradient(to right, var(--hub-metal), var(--hub-metal-light))",
        }}
      />
      <div
        className="w-3.5 flex-1 border-x border-[#f7e492]/40 shadow-sm"
        style={{
          background:
            "linear-gradient(to bottom, #e3bf52, #b89228, #e3bf52)",
        }}
      />
      <div
        className="h-2 w-5 shrink-0 rounded-b-sm"
        style={{
          background:
            "linear-gradient(to right, var(--hub-metal-dark), var(--hub-metal))",
        }}
      />
    </div>
  );
}

function LocationOnIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function formatScanDate(raw: string): string {
  // Accept ISO YYYY-MM-DD or display strings like "9/4/2026 4:55 PM"
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const d = new Date(`${iso[1]}-${iso[2]}-${iso[3]}T12:00:00Z`);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  const slash = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slash) {
    return `${slash[1]}/${slash[2]}/${slash[3]}`;
  }
  return raw;
}
