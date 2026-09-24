/**
 * Hub chrome — photoreal assets cropped from Nick DJ SoT PNG
 * (_shots/sot-2026-09-24/dj-law-hub-sot.png → public/brands/_hub/).
 * Flat SVG gold frame/columns/seal intentionally retired (Design HARD FAIL 616687b).
 */

import {
  JUSTIFY_ARROWS_PATH,
  JUSTIFY_ARROWS_VIEWBOX,
} from "@/components/hub/justify-arrows-path";

const HUB = "/brands/_hub";

/** Photoreal meander frame + Ionic columns + seal ring (center transparent). */
export function HeroChromePlate({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/hero-chrome-plate.png`}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}

/** Photoreal Ionic column (left). */
export function IonicColumnLeft({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/column-left.png`}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}

/** Photoreal Ionic column (right). */
export function IonicColumnRight({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/column-right.png`}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}

/** Photoreal ornate seal ring — center transparent for firm crest. */
export function OrnateSealRing({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/seal-ring.png`}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}

/** Dense circuit / scales / columns watermark cropped from SoT ground. */
export function LegalCircuitWatermark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/watermark-ground.png`}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}

/**
 * Two thick filled ⌝ corner chevrons (no shaft) — traced from
 * public/brands/_hub/justify-mark.png. Stacked ~40% diagonal overlap.
 * N1: green arrows only, never people icons.
 */
export function JustifyCornerArrows({ className }: { className?: string }) {
  // Exact official chevrons: potrace of green pixels from public/brands/_justify/logo.png
  return (
    <svg
      data-logo-slot="justify-arrows"
      className={className}
      viewBox={JUSTIFY_ARROWS_VIEWBOX}
      fill="#00d68f"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={JUSTIFY_ARROWS_PATH} />
    </svg>
  );
}

/**
 * Header-center justify mark — wordmark + shared corner-chevron SVG
 * (same arrows as hero; no raster crop).
 */
export function JustifyMark({ className }: { className?: string }) {
  return (
    <span
      data-logo-slot="header-justify-mark"
      className={`inline-flex items-center justify-center gap-1 leading-none text-white ${className ?? ""}`}
      role="img"
      aria-label="justify"
    >
      <span className="relative top-px font-sans text-[1.05em] font-bold leading-none tracking-tight">
        justify
      </span>
      <JustifyCornerArrows className="relative -top-px h-[0.9em] w-[0.9em] shrink-0 self-center" />
    </span>
  );
}

/** Dark satellite-style map thumb cropped from SoT (teal pin). */
export function MapThumbPlaceholder({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/map-sat-thumb.png`}
      alt={label ? `Map of ${label}` : "Map preview"}
      className={className}
      draggable={false}
    />
  );
}

/** @deprecated flat SVG retired — maps to photoreal plate */
export function GreekMeanderFrame(_props: { className?: string }) {
  /* Retired 2026-09-24 CoS: no ornate Greek-key / meander / filigree. */
  return null;
}

/** @deprecated flat SVG retired — maps to photoreal column */
export function IonicColumn({ className }: { className?: string }) {
  return <IonicColumnLeft className={className} />;
}
