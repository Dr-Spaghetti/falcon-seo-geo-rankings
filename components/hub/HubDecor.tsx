/**
 * Hub chrome — photoreal assets cropped from Nick DJ SoT PNG
 * (_shots/sot-2026-09-24/dj-law-hub-sot.png → public/brands/_hub/).
 * Flat SVG gold frame/columns/seal intentionally retired (Design HARD FAIL 616687b).
 */

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
  // Traced from justify-mark.png: each ⌝ arm is 12×4 px → thickness/length = 1/3.
  // Front at (4,0), back at (0,5); viewBox 16×17 matches PNG arrow crop aspect.
  return (
    <svg
      className={className}
      viewBox="0 0 16 17"
      fill="#00d68f"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
    >
      {/* Back (lower-left) — ox=0 oy=5 L=12 T=4 */}
      <path d="M0 5h12v12H8V9H0z" />
      {/* Front (upper-right) — ox=4 oy=0 L=12 T=4 */}
      <path d="M4 0h12v12h-4V4H4z" />
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
      className={`inline-flex items-center gap-1 leading-none text-white ${className ?? ""}`}
      role="img"
      aria-label="justify"
    >
      <span className="font-sans text-[1.05em] font-bold tracking-tight">
        justify
      </span>
      <JustifyCornerArrows className="h-[0.9em] w-[0.9em] shrink-0" />
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
export function GreekMeanderFrame({ className }: { className?: string }) {
  return <HeroChromePlate className={className} />;
}

/** @deprecated flat SVG retired — maps to photoreal column */
export function IonicColumn({ className }: { className?: string }) {
  return <IonicColumnLeft className={className} />;
}
