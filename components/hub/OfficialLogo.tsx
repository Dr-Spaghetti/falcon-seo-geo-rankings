import type { CSSProperties } from "react";
import type { BrandLogo } from "@/lib/brand-logos";

/**
 * Renders an official logo file exactly as shipped: plain <img>, natural
 * width/height attributes (locks aspect ratio), no filter / mask / crop /
 * object-fit / ring / plate. Size it with height OR width only. Files whose
 * transparent padding is asymmetric get a translate-only optical centring.
 * data-logo-img lets the fidelity + centering gates find the rendered box.
 */
export function OfficialLogo({
  logo,
  slot,
  className,
  style,
  priority = false,
}: {
  logo: BrandLogo;
  slot: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-logo-img={slot}
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      draggable={false}
      decoding="async"
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      className={`block max-w-none ${className ?? ""}`}
      style={{
        aspectRatio: `${logo.width} / ${logo.height}`,
        // Optical centring for files with asymmetric transparent padding (no crop).
        ...(logo.inkOffsetPct
          ? { transform: `translate(${-logo.inkOffsetPct.x}%, ${-logo.inkOffsetPct.y}%)` }
          : {}),
        ...style,
      }}
    />
  );
}
