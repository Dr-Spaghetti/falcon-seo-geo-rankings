import Link from "next/link";
import type { LfClient } from "@/lib/lf";
import { resolveBrandLogoUrl } from "@/lib/lf-logo";
import {
  HeroChromePlate,
  LegalCircuitWatermark,
  MapThumbPlaceholder,
} from "@/components/hub/HubDecor";

/**
 * Shared premium dark branded hub — Nick DJ Law hub SoT is the master template.
 * Photoreal chrome cropped from SoT PNG (not flat SVG gold).
 * Per-firm: crest/logo, name, counts, --brand-* tokens only.
 */
export function ClientHub({ client }: { client: LfClient }) {
  const base = `/clients/${client.slug}`;
  const logoUrl = resolveBrandLogoUrl(client.slug);
  const countsLine = `${client.location_count} locations | ${client.scan_count.toLocaleString()} Total scans`;

  return (
    <div className="relative space-y-7 text-slate-100">
      {/* Dense legal + circuit watermark from SoT ground */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <LegalCircuitWatermark className="h-full min-h-[720px] w-full object-cover opacity-[0.22]" />
      </div>

      {/* Framed hero — photoreal SoT chrome plate + overlay typography/crest */}
      <section
        className="relative overflow-hidden rounded-[18px] shadow-2xl shadow-black/55"
        style={{ backgroundColor: "#181a1e" }}
        aria-label={`${client.name} client dashboard`}
      >
        {/* Photoreal plate: meander frame + columns + seal ring */}
        <HeroChromePlate className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-fill" />

        {/* faint line-chart watermark inside plate */}
        <svg
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full text-white opacity-[0.08]"
          aria-hidden
          preserveAspectRatio="none"
          viewBox="0 0 800 220"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            points="40,160 100,140 160,150 220,110 280,120 340,80 400,100 460,55 520,90 580,45 640,75 700,40 760,60"
          />
        </svg>

        {/* Crest locked to photoreal seal hole (~84.5% x, ~52% y of plate) */}
        <div
          className="pointer-events-none absolute z-[4] flex items-center justify-center overflow-hidden rounded-full"
          style={{
            right: "7.5%",
            top: "50%",
            transform: "translateY(-52%)",
            width: "min(6.6rem, 14%)",
            height: "min(6.6rem, 58%)",
            backgroundColor: "color-mix(in srgb, var(--brand) 78%, #050805)",
            boxShadow: "inset 0 0 16px rgba(0,0,0,0.5)",
          }}
          aria-hidden={!logoUrl}
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={`${client.name} logo`}
              width={150}
              height={150}
              className="pointer-events-auto h-[88%] w-[88%] object-contain"
            />
          ) : (
            <span className="px-2 text-center text-[9px] font-medium uppercase tracking-wider text-white/50">
              Crest unavailable
            </span>
          )}
        </div>

        <div className="relative z-[3] flex min-h-[11.5rem] flex-col items-stretch gap-4 px-7 py-8 sm:min-h-[13rem] sm:px-10 sm:py-9 lg:flex-row lg:items-center lg:gap-3">
          {/* Left: justify local mark */}
          <div className="flex shrink-0 justify-center lg:w-[9.5rem] lg:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brands/_justify/logo.png"
              alt="justify local"
              width={150}
              height={66}
              className="h-14 w-auto object-contain sm:h-[4.5rem]"
            />
          </div>

          {/* Center stack — dynamic firm typography (leave right pad for seal) */}
          <div className="min-w-0 flex-1 space-y-1.5 px-2 text-center lg:pr-[16%]">
            <h1
              className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem]"
              style={{
                color: "var(--brand-accent)",
                textShadow:
                  "0 1px 0 rgba(255,255,255,0.18), 0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              {client.name}
            </h1>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs"
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
            <p
              className="mx-auto max-w-xl text-sm italic leading-relaxed"
              style={{
                color:
                  "color-mix(in srgb, var(--brand-accent) 55%, #ffffff)",
              }}
            >
              Select a location to review rankings, filters, and scan reports.
            </p>
          </div>
        </div>
      </section>

      {/* Office Locations — simplified density (Nick punch: too busy for older clients) */}
      <section aria-label="Office Locations" className="space-y-3">
        <h2
          className="font-serif text-base font-semibold tracking-tight sm:text-lg"
          style={{ color: "var(--brand-accent)" }}
        >
          Office Locations
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {client.locations.map((loc) => (
            <article
              key={loc.place_id}
              className="flex flex-col rounded-lg bg-[#1a1c22]/90 p-4"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--brand-accent) 35%, transparent)",
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  {loc.city || loc.name}
                </h3>
                <span className="shrink-0 text-xs tabular-nums text-white/45">
                  {loc.scan_count.toLocaleString()} scans
                </span>
              </div>

              <div className="mt-2 flex items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-sm leading-snug text-white/75">
                  {loc.address || "Address unavailable"}
                </p>
                <div className="shrink-0 overflow-hidden rounded">
                  <MapThumbPlaceholder
                    className="h-12 w-14 object-cover"
                    label={loc.city || loc.name}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  href={`${base}/locations/${loc.place_id}`}
                  className="text-sm font-medium text-white/90 underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)]"
                  style={{ color: "var(--brand-accent)" }}
                >
                  Open dashboard →
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
