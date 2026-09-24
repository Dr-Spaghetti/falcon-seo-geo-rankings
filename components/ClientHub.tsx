import Link from "next/link";
import type { LfClient } from "@/lib/lf";
import { resolveBrandLogoUrl } from "@/lib/lf-logo";

/**
 * Shared premium dark branded hub (Nick DJ Law mock SoT).
 * Same template for all LF_CLIENT_NAV hubs; per-firm tokens via --brand-* CSS vars.
 * Firm logos: official binaries under public/brands/{slug}/ only — displayed as-is.
 */
export function ClientHub({
  client,
  badge,
}: {
  client: LfClient;
  /** Optional chip under the hero (e.g. "Firm hub") */
  badge?: string;
}) {
  const base = `/clients/${client.slug}`;
  const logoUrl = resolveBrandLogoUrl(client.slug);
  const countsLine = `${client.location_count} locations | ${client.scan_count.toLocaleString()} Total scans`;

  return (
    <div className="relative space-y-7 text-slate-100">
      {/* Subtle shared watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, var(--brand-accent) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, var(--brand-soft) 0%, transparent 50%)",
        }}
      />

      {/* Framed hero */}
      <section
        className="relative overflow-hidden rounded-2xl border-[3px] px-5 py-6 shadow-xl shadow-black/40 sm:px-8 sm:py-8"
        style={{
          borderColor: "var(--brand-accent)",
          backgroundImage:
            "linear-gradient(145deg, rgba(0,0,0,0.25) 0%, transparent 40%), var(--brand-hero)",
          backgroundColor: "var(--brand-surface)",
        }}
        aria-label={`${client.name} client dashboard`}
      >
        {/* faint chart watermark inside frame */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          aria-hidden
          preserveAspectRatio="none"
          viewBox="0 0 800 200"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="0,140 80,120 160,130 240,90 320,100 400,60 480,80 560,40 640,70 720,30 800,50"
          />
        </svg>

        <div className="relative flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Justify Local mark */}
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brands/_justify/logo.png"
                alt="justify local"
                width={140}
                height={61}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </div>

            <div className="min-w-0 space-y-1.5">
              <h1
                className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
                style={{ color: "var(--brand-accent)" }}
              >
                {client.name}
              </h1>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm"
                style={{ color: "var(--brand-accent)" }}
              >
                CLIENT DASHBOARD
              </p>
              <p
                className="text-base font-medium tabular-nums sm:text-lg"
                style={{ color: "var(--brand-accent)" }}
              >
                {countsLine}
              </p>
              <p className="max-w-xl text-sm italic leading-relaxed text-white/70">
                Select a location to review rankings, filters, and scan reports.
              </p>
              {badge ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1"
                    style={{
                      color: "var(--brand-accent)",
                      backgroundColor:
                        "color-mix(in srgb, var(--brand-accent) 12%, transparent)",
                      boxShadow:
                        "inset 0 0 0 1px color-mix(in srgb, var(--brand-accent) 35%, transparent)",
                    }}
                  >
                    {badge}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Firm logo — official file as-is; never invent / recolor */}
          <div className="flex shrink-0 items-center justify-center lg:justify-end">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={`${client.name} logo`}
                width={160}
                height={160}
                className="h-28 w-28 rounded-full object-contain sm:h-36 sm:w-36"
                // No CSS filter / tint — display binary as-is
                style={{ filter: "none" }}
              />
            ) : (
              <div
                className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-dashed text-center sm:h-36 sm:w-36"
                style={{
                  borderColor: "color-mix(in srgb, var(--brand-accent) 45%, transparent)",
                  color: "var(--brand-accent)",
                  backgroundColor: "color-mix(in srgb, var(--brand-surface) 80%, black)",
                }}
                role="img"
                aria-label={`${client.name} logo unavailable`}
              >
                <span className="px-2 text-[10px] font-semibold uppercase tracking-wider opacity-80">
                  Logo
                </span>
                <span className="mt-0.5 max-w-[6.5rem] truncate px-2 text-xs font-medium">
                  {client.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section aria-label="Office Locations" className="space-y-3">
        <div
          className="inline-flex rounded-lg px-3 py-1.5 text-sm font-serif font-semibold shadow-sm"
          style={{
            color: "var(--brand-surface)",
            backgroundColor: "var(--brand-accent)",
          }}
        >
          Office Locations
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {client.locations.map((loc) => (
            <article
              key={loc.place_id}
              className="flex flex-col rounded-xl border border-white/10 bg-[#1c1e24]/95 p-5 shadow-md shadow-black/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white underline decoration-white/30 underline-offset-4">
                  {loc.city || loc.name}
                </h3>
                <span
                  className="shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums text-white/90 ring-1 ring-white/15"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--brand-primary, var(--brand)) 55%, #0a0a0a)",
                  }}
                  title="Scan count"
                >
                  {loc.scan_count.toLocaleString()} scans
                </span>
              </div>
              <p className="mt-2 text-sm leading-snug text-white/75">
                {loc.address || "Address unavailable"}
              </p>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div className="min-w-0 text-xs text-white/45">
                  {loc.rating != null && loc.rating > 0 ? (
                    <span>
                      ★ {loc.rating.toFixed(1)}
                      {loc.reviews != null ? ` · ${loc.reviews}` : ""}
                    </span>
                  ) : (
                    <span>No rating yet</span>
                  )}
                </div>
                <Link
                  href={`${base}/locations/${loc.place_id}`}
                  className="inline-flex items-center gap-1 rounded-md border border-[color:var(--brand-accent)] px-3 py-1.5 text-sm font-medium text-[color:var(--brand-accent)] transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-surface)]"
                >
                  Open dashboard
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {client.locations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-16 text-center">
            <p className="text-sm font-medium text-white/90">
              No locations in this firm hub
            </p>
            <p className="mt-1 text-sm text-white/55">
              Rebuild client data from the Local Falcon census archive.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
