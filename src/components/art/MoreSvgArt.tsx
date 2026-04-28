import type { SVGProps } from "react";

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "aria-hidden": true,
} as const;

export function CrosshairMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <circle cx="40" cy="40" r="22" />
        <circle cx="40" cy="40" r="6" />
        <line x1="40" y1="2" x2="40" y2="20" />
        <line x1="40" y1="60" x2="40" y2="78" />
        <line x1="2" y1="40" x2="20" y2="40" />
        <line x1="60" y1="40" x2="78" y2="40" />
      </g>
    </svg>
  );
}

export function HexNode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <polygon points="40,6 70,24 70,56 40,74 10,56 10,24" />
        <polygon points="40,22 56,32 56,48 40,58 24,48 24,32" />
      </g>
      <circle cx="40" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

export function TerminalCaret(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 26 L30 40 L16 54" />
        <line x1="36" y1="56" x2="64" y2="56" />
      </g>
      <rect x="10" y="14" width="60" height="52" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

export function StackLayers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <path d="M40 12 L70 26 L40 40 L10 26 Z" />
        <path d="M10 40 L40 54 L70 40" opacity="0.7" />
        <path d="M10 54 L40 68 L70 54" opacity="0.4" />
      </g>
    </svg>
  );
}

export function ArrowLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 28 A24 24 0 1 1 14 52" />
        <path d="M14 22 L14 32 L24 32" />
        <path d="M66 58 A24 24 0 0 1 66 32" />
        <path d="M66 64 L66 54 L56 54" />
      </g>
    </svg>
  );
}

export function BarStep(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g fill="currentColor">
        <rect x="10" y="50" width="10" height="22" />
        <rect x="26" y="38" width="10" height="34" opacity="0.85" />
        <rect x="42" y="22" width="10" height="50" opacity="0.7" />
        <rect x="58" y="10" width="10" height="62" opacity="0.55" />
      </g>
    </svg>
  );
}

export function Scope(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <circle cx="40" cy="40" r="30" />
        <line x1="40" y1="10" x2="40" y2="70" strokeDasharray="3 3" />
        <line x1="10" y1="40" x2="70" y2="40" strokeDasharray="3 3" />
      </g>
      <circle cx="40" cy="40" r="5" fill="currentColor" />
      <circle cx="58" cy="22" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Constellation(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 80" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.5">
        <line x1="14" y1="60" x2="40" y2="22" />
        <line x1="40" y1="22" x2="78" y2="38" />
        <line x1="78" y1="38" x2="106" y2="14" />
        <line x1="78" y1="38" x2="92" y2="64" />
      </g>
      <g fill="currentColor">
        <circle cx="14" cy="60" r="3" />
        <circle cx="40" cy="22" r="4" />
        <circle cx="78" cy="38" r="5" />
        <circle cx="106" cy="14" r="3" opacity="0.7" />
        <circle cx="92" cy="64" r="3" opacity="0.7" />
      </g>
    </svg>
  );
}

export function PlusGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        {Array.from({ length: 5 }).flatMap((_, r) =>
          Array.from({ length: 5 }).map((_, c) => {
            const x = 30 + c * 35;
            const y = 30 + r * 35;
            return (
              <g key={`${r}-${c}`}>
                <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
                <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
              </g>
            );
          })
        )}
      </g>
    </svg>
  );
}

export function WaveLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" {...base} {...props}>
      <path
        d="M0 30 Q 25 5, 50 30 T 100 30 T 150 30 T 200 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 38 Q 25 13, 50 38 T 100 38 T 150 38 T 200 38"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

export function Ticks(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 30" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={i} x1={i * 10} y1={i % 5 === 0 ? 0 : 8} x2={i * 10} y2="22" />
        ))}
      </g>
    </svg>
  );
}

export function CornerBracket(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 60" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <path d="M0 16 L0 0 L16 0" />
        <path d="M44 0 L60 0 L60 16" />
        <path d="M60 44 L60 60 L44 60" />
        <path d="M16 60 L0 60 L0 44" />
      </g>
    </svg>
  );
}
