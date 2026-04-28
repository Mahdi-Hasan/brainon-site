import type { SVGProps } from "react";

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "aria-hidden": true,
} as const;

export function OrbitGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 600 600" {...baseProps} {...props}>
      <defs>
        <radialGradient id="og-fade" cx="50%" cy="50%" r="55%">
          <stop offset="40%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#og-fade)" />
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.35">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="300" cy="300" r={40 + i * 28} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="0.4" opacity="0.18">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 300 + Math.cos(a) * 290;
          const y = 300 + Math.sin(a) * 290;
          return <line key={i} x1="300" y1="300" x2={x} y2={y} />;
        })}
      </g>
      <circle cx="300" cy="300" r="4" fill="currentColor" />
      <circle cx="300" cy="160" r="6" fill="currentColor" opacity="0.85" />
      <circle cx="440" cy="300" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="180" cy="380" r="2.5" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function Blueprint(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 320" {...baseProps} {...props}>
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.18">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="320" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30} x2="480" y2={i * 30} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <path d="M60 250 L160 180 L240 220 L340 110 L420 150" />
        <circle cx="160" cy="180" r="4" fill="currentColor" />
        <circle cx="240" cy="220" r="4" fill="currentColor" />
        <circle cx="340" cy="110" r="4" fill="currentColor" />
      </g>
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.55">
        <rect x="60" y="60" width="120" height="60" />
        <rect x="220" y="60" width="200" height="40" />
        <rect x="220" y="120" width="80" height="40" />
        <rect x="320" y="120" width="100" height="40" />
      </g>
    </svg>
  );
}

export function PulseRing(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 320" {...baseProps} {...props}>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <circle cx="160" cy="160" r="40" opacity="1" />
        <circle cx="160" cy="160" r="80" opacity="0.55" />
        <circle cx="160" cy="160" r="120" opacity="0.32" />
        <circle cx="160" cy="160" r="156" opacity="0.16" />
      </g>
      <g fill="currentColor">
        <circle cx="160" cy="160" r="6" />
        <circle cx="160" cy="40" r="3" opacity="0.75" />
        <circle cx="280" cy="160" r="3" opacity="0.55" />
        <circle cx="40" cy="200" r="2.5" opacity="0.45" />
        <circle cx="220" cy="260" r="2.5" opacity="0.4" />
      </g>
    </svg>
  );
}

export function ArrowMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" {...baseProps} {...props}>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M12 52 L52 12" />
        <path d="M28 12 L52 12 L52 36" />
      </g>
    </svg>
  );
}

export function NodesGraph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 360" {...baseProps} {...props}>
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.6">
        <line x1="80" y1="240" x2="200" y2="120" />
        <line x1="200" y1="120" x2="320" y2="200" />
        <line x1="320" y1="200" x2="420" y2="100" />
        <line x1="80" y1="240" x2="320" y2="200" />
        <line x1="200" y1="120" x2="420" y2="100" />
        <line x1="80" y1="240" x2="160" y2="320" />
        <line x1="160" y1="320" x2="320" y2="200" />
      </g>
      <g fill="currentColor">
        <circle cx="80" cy="240" r="7" />
        <circle cx="200" cy="120" r="5" opacity="0.85" />
        <circle cx="320" cy="200" r="9" />
        <circle cx="420" cy="100" r="4" opacity="0.7" />
        <circle cx="160" cy="320" r="4" opacity="0.7" />
      </g>
      <g stroke="currentColor" strokeWidth="0.4" opacity="0.25">
        <rect x="40" y="40" width="400" height="280" />
      </g>
    </svg>
  );
}

export function StackedBars(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 320" {...baseProps} {...props}>
      <g stroke="currentColor" strokeWidth="0.4" opacity="0.2">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="40" y1={40 + i * 36} x2="440" y2={40 + i * 36} />
        ))}
      </g>
      <g fill="currentColor">
        {[140, 220, 90, 260, 180, 200, 120, 240].map((h, i) => (
          <rect
            key={i}
            x={60 + i * 44}
            y={300 - h}
            width="28"
            height={h}
            opacity={0.35 + (i / 9)}
          />
        ))}
      </g>
      <line x1="40" y1="300" x2="440" y2="300" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function AsymmetricMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" {...baseProps} {...props}>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <rect x="20" y="20" width="160" height="160" />
        <rect x="60" y="60" width="80" height="80" />
        <line x1="20" y1="20" x2="180" y2="180" />
        <line x1="180" y1="20" x2="20" y2="180" opacity="0.4" />
      </g>
      <circle cx="100" cy="100" r="8" fill="currentColor" />
    </svg>
  );
}
