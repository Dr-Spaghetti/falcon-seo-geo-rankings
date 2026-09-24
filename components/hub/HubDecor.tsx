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
 * Header-center justify mark — SoT raster: white wordmark + TWO GREEN ARROWS.
 * People/human icons are WRONG (Nick punch 2026-09-24).
 */
export function JustifyMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${HUB}/justify-mark.png`}
      alt="justify"
      className={className}
      draggable={false}
    />
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
