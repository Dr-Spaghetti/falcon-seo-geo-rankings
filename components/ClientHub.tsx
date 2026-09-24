import Link from "next/link";
import type { LfClient } from "@/lib/lf";
import { resolveBrandLogoUrl } from "@/lib/lf-logo";
import {
  GreekMeanderFrame,
  IonicColumn,
  LegalCircuitWatermark,
  MapThumbPlaceholder,
  OrnateSealRing,
} from "@/components/hub/HubDecor";

/**
 * Shared premium dark branded hub — Nick DJ Law hub SoT is the master template.
 * Exact chrome: ornate gold Greek-meander frame, Ionic columns, seal crest,
 * dark legal watermark ground, Office Locations card language.
 * Per-firm: crest/logo, name, counts, --brand-* tokens only.
 */
export function ClientHub({ client }: { client: LfClient }) {
  const base = `/clients/${client.slug}`;
  const logoUrl = resolveBrandLogoUrl(client.slug);
  const countsLine = `${client.location_count} locations | ${client.scan_count.toLocaleString()} Total scans`;

  return (
    <div className="relative space-y-8 text-slate-100">
      {/* Large subtle legal + circuit watermark on page ground */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <LegalCircuitWatermark className="h-full min-h-[720px] w-full text-white opacity-[0.07]" />
      </div>

      {/* Framed hero — thick ornate gold Greek-key frame */}
      <section
        className="relative overflow-hidden rounded-[18px] px-7 py-9 shadow-2xl shadow-black/55 sm:px-12 sm:py-11"
        style={{
          backgroundImage:
            "linear-gradient(145deg, rgba(0,0,0,0.4) 0%, transparent 45%), var(--brand-hero)",
          backgroundColor: "var(--brand-surface)",
        }}
        aria-label={`${client.name} client dashboard`}
      >
        <GreekMeanderFrame className="pointer-events-none absolute inset-0 z-[2] h-full w-full" />

        {/* faint line-chart watermark inside frame */}
        <svg
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-white opacity-[0.09]"
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

        <div className="relative z-[3] flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
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

          {/* Center stack */}
          <div className="min-w-0 flex-1 space-y-1.5 px-2 text-center">
            <h1
              className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]"
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

          {/* Right: Ionic columns flanking ornate seal + firm logo */}
          <div className="flex shrink-0 items-end justify-center gap-0 sm:gap-1 lg:w-[17rem]">
            <IonicColumn className="mb-1 hidden h-[11.5rem] w-auto sm:block" />
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              <OrnateSealRing className="pointer-events-none absolute inset-0 h-full w-full" />
              <div
                className="relative z-[1] flex h-[76%] w-[76%] items-center justify-center overflow-hidden rounded-full"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--brand) 78%, #050805)",
                  boxShadow: "inset 0 0 16px rgba(0,0,0,0.5)",
                }}
              >
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={`${client.name} logo`}
                    width={150}
                    height={150}
                    className="h-[90%] w-[90%] object-contain"
                    style={{ filter: "none" }}
                  />
                ) : (
                  <span className="px-2 text-center text-[10px] font-medium uppercase tracking-wider text-white/50">
                    Crest unavailable
                  </span>
                )}
              </div>
            </div>
            <IonicColumn className="mb-1 hidden h-[11.5rem] w-auto sm:block" />
          </div>
        </div>
      </section>

      {/* Office Locations — SoT: gold tab, black serif underlined (not thin gold text alone) */}
      <section aria-label="Office Locations" className="space-y-4">
        <div
          className="inline-block rounded-md px-3.5 py-1.5 font-serif text-base font-bold tracking-tight underline decoration-2 underline-offset-[5px] shadow-sm sm:text-lg"
          style={{
            color: "#0a0a0a",
            backgroundColor: "var(--brand-accent)",
            textDecorationColor: "#0a0a0a",
          }}
        >
          Office Locations
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {client.locations.map((loc) => (
            <article
              key={loc.place_id}
              className="flex flex-col rounded-xl border bg-[#1a1c22]/95 p-5 shadow-md shadow-black/40"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--brand-accent) 60%, transparent)",
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--brand-accent) 28%, transparent), 0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg font-bold text-white underline decoration-white/40 decoration-2 underline-offset-4">
                  {loc.city || loc.name}
                </h3>
                <span
                  className="shrink-0 rounded-full bg-[#2a2c34] px-2.5 py-0.5 text-xs font-medium tabular-nums text-white/75 ring-1 ring-white/10"
                  title="Scan count"
                >
                  {loc.scan_count.toLocaleString()} scans
                </span>
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-sm leading-snug text-white/85">
                  {loc.address || "Address unavailable"}
                </p>
                <div className="shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
                  <MapThumbPlaceholder
                    className="h-14 w-[5.25rem]"
                    label={loc.city || loc.name}
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Link
                  href={`${base}/locations/${loc.place_id}`}
                  className="inline-flex items-center gap-1 rounded-md border border-[color:var(--brand-accent)] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-surface)]"
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
