/**
 * Decorative SVG chrome for Nick DJ hub SoT — Greek meander frame,
 * Ionic columns, ornate seal ring, page watermark (scales + columns + circuit).
 */

/** Thick ornate gold Greek-key / meander frame overlay (absolute inset-0). */
export function GreekMeanderFrame({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 280"
      preserveAspectRatio="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hub-gold-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e6a8" />
          <stop offset="22%" stopColor="#e0bf6a" />
          <stop offset="48%" stopColor="#c9a04a" />
          <stop offset="72%" stopColor="#8a6a28" />
          <stop offset="100%" stopColor="#e8c878" />
        </linearGradient>
        <linearGradient id="hub-gold-hi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff3c0" />
          <stop offset="40%" stopColor="#d0a854" />
          <stop offset="100%" stopColor="#6a5220" />
        </linearGradient>
        <pattern id="hub-meander" width="32" height="16" patternUnits="userSpaceOnUse">
          {/* Classic Greek key step */}
          <path
            d="M1 13 H9 V3 H17 V13 H25 V3 H33"
            fill="none"
            stroke="#3a2a0c"
            strokeWidth="3.2"
            strokeLinejoin="miter"
          />
          <path
            d="M1 13 H9 V3 H17 V13 H25 V3 H33"
            fill="none"
            stroke="#f0d78a"
            strokeWidth="1.6"
            strokeLinejoin="miter"
          />
        </pattern>
        <filter id="hub-frame-glow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>
      {/* Outer thick metallic bevel */}
      <rect
        x="4"
        y="4"
        width="992"
        height="272"
        rx="16"
        ry="16"
        fill="none"
        stroke="url(#hub-gold-bevel)"
        strokeWidth="14"
        filter="url(#hub-frame-glow)"
      />
      {/* Highlight rim */}
      <rect
        x="10"
        y="10"
        width="980"
        height="260"
        rx="12"
        ry="12"
        fill="none"
        stroke="#fff3c0"
        strokeWidth="1.2"
        opacity="0.45"
      />
      {/* Dark recess under meander */}
      <rect
        x="16"
        y="16"
        width="968"
        height="248"
        rx="10"
        ry="10"
        fill="none"
        stroke="#1a1408"
        strokeWidth="5"
        opacity="0.65"
      />
      {/* Meander bands */}
      <rect x="24" y="18" width="952" height="16" fill="url(#hub-meander)" />
      <rect x="24" y="246" width="952" height="16" fill="url(#hub-meander)" />
      {/* Vertical meander sides */}
      <g opacity="0.95">
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 40 + i * 17;
          return (
            <g key={i}>
              <path
                d={`M20 ${y} H32 V${y + 8} H26 V${y + 16} H20`}
                fill="none"
                stroke="#3a2a0c"
                strokeWidth="2.4"
              />
              <path
                d={`M20 ${y} H32 V${y + 8} H26 V${y + 16} H20`}
                fill="none"
                stroke="#f0d78a"
                strokeWidth="1.1"
              />
              <path
                d={`M980 ${y} H968 V${y + 8} H974 V${y + 16} H980`}
                fill="none"
                stroke="#3a2a0c"
                strokeWidth="2.4"
              />
              <path
                d={`M980 ${y} H968 V${y + 8} H974 V${y + 16} H980`}
                fill="none"
                stroke="#f0d78a"
                strokeWidth="1.1"
              />
            </g>
          );
        })}
      </g>
      {/* Corner ornaments */}
      <g fill="url(#hub-gold-hi)">
        <path d="M16 16 L48 16 L48 26 L26 26 L26 48 L16 48 Z" />
        <path d="M984 16 L952 16 L952 26 L974 26 L974 48 L984 48 Z" />
        <path d="M16 264 L48 264 L48 254 L26 254 L26 232 L16 232 Z" />
        <path d="M984 264 L952 264 L952 254 L974 254 L974 232 L984 232 Z" />
      </g>
      <g stroke="url(#hub-gold-bevel)" strokeWidth="1.8" fill="none" opacity="0.9">
        <path d="M52 42 C64 26, 84 26, 92 42" />
        <path d="M948 42 C936 26, 916 26, 908 42" />
        <path d="M52 238 C64 254, 84 254, 92 238" />
        <path d="M948 238 C936 254, 916 254, 908 238" />
      </g>
    </svg>
  );
}

/** Stylized Ionic column (gold) — larger / more structural. */
export function IonicColumn({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 220"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="col-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a5220" />
          <stop offset="22%" stopColor="#e8c878" />
          <stop offset="48%" stopColor="#f5e6a8" />
          <stop offset="70%" stopColor="#c9a04a" />
          <stop offset="100%" stopColor="#5a4218" />
        </linearGradient>
        <linearGradient id="col-cap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff3c0" />
          <stop offset="55%" stopColor="#d0a854" />
          <stop offset="100%" stopColor="#8a6a28" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="12" rx="2" fill="url(#col-cap)" />
      {/* Volutes */}
      <path
        d="M6 26 C2 12, 16 6, 22 18 C26 8, 38 8, 42 18 C48 6, 62 12, 58 26 Z"
        fill="url(#col-cap)"
      />
      <circle cx="14" cy="18" r="6" fill="none" stroke="#5a4218" strokeWidth="1.6" />
      <circle cx="50" cy="18" r="6" fill="none" stroke="#5a4218" strokeWidth="1.6" />
      <circle cx="14" cy="18" r="2.5" fill="#8a6a28" />
      <circle cx="50" cy="18" r="2.5" fill="#8a6a28" />
      <rect x="12" y="26" width="40" height="10" rx="1" fill="url(#col-gold)" />
      {/* Shaft */}
      <rect x="16" y="36" width="32" height="152" fill="url(#col-gold)" />
      <g stroke="#5a4218" strokeWidth="1.1" opacity="0.55">
        <line x1="22" y1="38" x2="22" y2="186" />
        <line x1="28" y1="38" x2="28" y2="186" />
        <line x1="32" y1="38" x2="32" y2="186" />
        <line x1="36" y1="38" x2="36" y2="186" />
        <line x1="42" y1="38" x2="42" y2="186" />
      </g>
      <g stroke="#fff3c0" strokeWidth="0.7" opacity="0.35">
        <line x1="24" y1="38" x2="24" y2="186" />
        <line x1="40" y1="38" x2="40" y2="186" />
      </g>
      <rect x="12" y="188" width="40" height="8" fill="url(#col-cap)" />
      <rect x="6" y="196" width="52" height="10" rx="1" fill="url(#col-gold)" />
      <rect x="2" y="206" width="60" height="10" rx="2" fill="url(#col-cap)" />
    </svg>
  );
}

/** Ornate beaded gold circular seal ring around firm logo. */
export function OrnateSealRing({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="seal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3c0" />
          <stop offset="35%" stopColor="#e0bf6a" />
          <stop offset="65%" stopColor="#8a6a28" />
          <stop offset="100%" stopColor="#f0d78a" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke="url(#seal-gold)" strokeWidth="10" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1a1408" strokeWidth="3" opacity="0.55" />
      <circle cx="100" cy="100" r="83" fill="none" stroke="url(#seal-gold)" strokeWidth="4" />
      {Array.from({ length: 56 }).map((_, i) => {
        const a = (i / 56) * Math.PI * 2;
        const cx = 100 + Math.cos(a) * 91;
        const cy = 100 + Math.sin(a) * 91;
        return <circle key={i} cx={cx} cy={cy} r="2.6" fill="#f0d78a" />;
      })}
    </svg>
  );
}

/** Page ground watermark: scales of justice + Ionic columns + circuit motifs. */
export function LegalCircuitWatermark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M90 100 h56 v28 h-10 v520 h-36 v-520 h-10 z" />
        <path d="M78 72 h80 v28 h-80 z" />
        <path d="M86 58 c14-28 62-28 76 0" />
        <path d="M1050 110 h56 v28 h-10 v500 h-36 v-500 h-10 z" />
        <path d="M1038 82 h80 v28 h-80 z" />
        <path d="M1046 68 c14-28 62-28 76 0" />
        {/* Scales + wreath */}
        <circle cx="600" cy="300" r="95" />
        <circle cx="600" cy="300" r="78" />
        <circle cx="600" cy="300" r="62" strokeDasharray="4 6" />
        <line x1="600" y1="190" x2="600" y2="460" />
        <line x1="490" y1="250" x2="710" y2="250" />
        <path d="M490 250 L440 340 L540 340 Z" />
        <path d="M710 250 L660 340 L760 340 Z" />
        <circle cx="490" cy="350" r="28" />
        <circle cx="710" cy="350" r="28" />
        <path d="M550 460 h100 v36 h-100 z" />
        {/* Circuit */}
        <path d="M160 520 H380 V590 H520" />
        <circle cx="160" cy="520" r="5" fill="currentColor" />
        <circle cx="380" cy="520" r="5" fill="currentColor" />
        <circle cx="520" cy="590" r="5" fill="currentColor" />
        <path d="M680 500 H920 V570 H1080" />
        <circle cx="680" cy="500" r="5" fill="currentColor" />
        <circle cx="920" cy="500" r="5" fill="currentColor" />
        <circle cx="1080" cy="570" r="5" fill="currentColor" />
        <path d="M140 660 H360 V720 H240 V760" />
        <path d="M820 640 H980 V730 H1120" />
        <path d="M280 160 h36 v22 h-8 v420 h-20 v-420 h-8 z" opacity="0.55" />
        <path d="M860 180 h36 v22 h-8 v400 h-20 v-400 h-8 z" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Header-center justify mark (white wordmark + teal arrows). */
export function JustifyMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 148 36"
      role="img"
      aria-label="justify"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="28"
        fill="#ffffff"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.6"
      >
        justify
      </text>
      <g fill="#2dd4bf" transform="translate(112,2)">
        <path d="M2 20 L14 8 L11 8 L11 0 L19 0 L19 8 L16 8 L28 20 L20 20 L20 28 L10 28 L10 20 Z" transform="scale(0.5)" />
        <path
          d="M2 20 L14 8 L11 8 L11 0 L19 0 L19 8 L16 8 L28 20 L20 20 L20 28 L10 28 L10 20 Z"
          transform="translate(12,-3) scale(0.5)"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

/** Dark satellite-map-like placeholder thumbnail with teal pin. */
export function MapThumbPlaceholder({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      role="img"
      aria-label={label ? `Map of ${label}` : "Map preview"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="map-sat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2a22" />
          <stop offset="35%" stopColor="#2f4234" />
          <stop offset="65%" stopColor="#3d5240" />
          <stop offset="100%" stopColor="#1e2820" />
        </linearGradient>
      </defs>
      <rect width="120" height="80" rx="5" fill="url(#map-sat)" />
      <g stroke="#556b54" strokeWidth="2.2" opacity="0.75">
        <path d="M0 42 H120" />
        <path d="M44 0 V80" />
        <path d="M0 18 H62 V80" />
        <path d="M74 0 V52 H120" />
      </g>
      <g stroke="#6a7d68" strokeWidth="1.1" opacity="0.5">
        <path d="M8 62 H112" />
        <path d="M92 8 V72" />
        <path d="M20 8 H50 V40" />
      </g>
      <g transform="translate(56,24)">
        <path
          d="M14 0 C6.3 0 0 6.3 0 14 C0 24 14 40 14 40 S28 24 28 14 C28 6.3 21.7 0 14 0 Z"
          fill="#14b8a6"
        />
        <circle cx="14" cy="14" r="5.5" fill="#0f172a" />
      </g>
    </svg>
  );
}
