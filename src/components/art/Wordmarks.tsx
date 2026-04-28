import type { SVGProps } from "react";

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

export function NorthwindMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 40" {...base} {...props}>
      <text x="0" y="29" fontFamily="Fraunces, serif" fontWeight="900" fontSize="32" letterSpacing="-1.5">
        Northwind
      </text>
      <circle cx="208" cy="20" r="6" />
    </svg>
  );
}

export function LumenMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 40" {...base} {...props}>
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <circle cx="20" cy="20" r="12" />
        <line x1="20" y1="6" x2="20" y2="34" />
        <line x1="6" y1="20" x2="34" y2="20" />
      </g>
      <text x="44" y="28" fontFamily="Inter Tight, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.5">
        Lumen Health
      </text>
    </svg>
  );
}

export function AtlasMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 40" {...base} {...props}>
      <text x="0" y="30" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="26" letterSpacing="2">
        ATLAS//
      </text>
    </svg>
  );
}

export function CipherMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 40" {...base} {...props}>
      <g fill="currentColor">
        <rect x="0" y="14" width="12" height="12" transform="rotate(45 6 20)" />
      </g>
      <text x="22" y="28" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="500" fontSize="24">
        Cipher
      </text>
    </svg>
  );
}

export function KindredMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 40" {...base} {...props}>
      <text x="0" y="29" fontFamily="Inter Tight, sans-serif" fontWeight="200" fontSize="30" letterSpacing="-0.5">
        kindred
      </text>
      <text x="120" y="29" fontFamily="Inter Tight, sans-serif" fontWeight="900" fontSize="30">
        ▲
      </text>
    </svg>
  );
}

export function NimbusMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 40" {...base} {...props}>
      <g fill="currentColor">
        <circle cx="14" cy="22" r="8" />
        <circle cx="28" cy="22" r="8" opacity="0.7" />
        <circle cx="42" cy="22" r="8" opacity="0.45" />
      </g>
      <text x="56" y="29" fontFamily="Fraunces, serif" fontWeight="700" fontSize="22">
        Nimbus
      </text>
    </svg>
  );
}

export const WORDMARKS = [
  { name: "Northwind", Component: NorthwindMark },
  { name: "Lumen", Component: LumenMark },
  { name: "Atlas", Component: AtlasMark },
  { name: "Cipher", Component: CipherMark },
  { name: "Kindred", Component: KindredMark },
  { name: "Nimbus", Component: NimbusMark },
];
