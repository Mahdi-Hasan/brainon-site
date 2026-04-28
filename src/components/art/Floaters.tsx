"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CrosshairMark, HexNode, StackLayers, Scope, Constellation } from "@/components/art/MoreSvgArt";
import { OrbitGrid, PulseRing } from "@/components/art/SvgArt";

type Floater = {
  Art: ComponentType<SVGProps<SVGSVGElement>>;
  top: string;
  left?: string;
  right?: string;
  size: string;
  rotate?: string;
  opacity?: number;
  drift: "anim-drift-y" | "anim-drift-x" | "anim-drift-diag" | "anim-drift-orbit" | "anim-spin-slow" | "anim-spin-slower" | "anim-pulse-soft";
  delay?: string;
  color?: string;
};

type Props = {
  floaters: Floater[];
  className?: string;
};

export function Floaters({ floaters, className = "" }: Props) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {floaters.map((f, i) => {
        const { Art } = f;
        const animClass = reduce ? "" : `${f.drift} ${f.delay ?? ""}`.trim();
        return (
          <span
            key={i}
            className={`absolute ${animClass}`}
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              width: f.size,
              height: f.size,
              transform: f.rotate ? `rotate(${f.rotate})` : undefined,
              opacity: f.opacity ?? 0.5,
              color: f.color ?? "currentColor",
            }}
          >
            <Art className="h-full w-full" />
          </span>
        );
      })}
    </div>
  );
}

// Curated layouts that compose nicely behind sections.
export const HeroFloaters: Floater[] = [
  { Art: HexNode, top: "12%", left: "6%", size: "44px", drift: "anim-drift-y", color: "var(--color-cobalt)", opacity: 0.7 },
  { Art: CrosshairMark, top: "18%", right: "8%", size: "56px", drift: "anim-drift-orbit", color: "var(--color-ink)", opacity: 0.4 },
  { Art: Scope, top: "55%", left: "4%", size: "64px", drift: "anim-pulse-soft", color: "var(--color-cobalt)", opacity: 0.5 },
  { Art: Constellation, top: "68%", right: "12%", size: "120px", drift: "anim-drift-diag", color: "var(--color-ink)", opacity: 0.35 },
  { Art: StackLayers, top: "30%", right: "30%", size: "36px", drift: "anim-drift-y", delay: "anim-delay-1200", color: "var(--color-cobalt)", opacity: 0.5 },
];

export const ManifestoFloaters: Floater[] = [
  { Art: OrbitGrid, top: "-10%", right: "-6%", size: "32vw", drift: "anim-spin-slower", color: "white", opacity: 0.06 },
  { Art: PulseRing, top: "55%", left: "-8%", size: "36vw", drift: "anim-spin-slow", color: "var(--color-cobalt)", opacity: 0.08 },
  { Art: HexNode, top: "20%", left: "12%", size: "40px", drift: "anim-drift-y", color: "white", opacity: 0.4 },
  { Art: CrosshairMark, top: "75%", right: "10%", size: "48px", drift: "anim-drift-orbit", color: "var(--color-cobalt)", opacity: 0.7 },
];

export const StatsFloaters: Floater[] = [
  { Art: Constellation, top: "10%", left: "-4%", size: "260px", drift: "anim-drift-x", color: "var(--color-ink)", opacity: 0.18 },
  { Art: Scope, top: "60%", right: "4%", size: "80px", drift: "anim-pulse-soft", color: "var(--color-cobalt)", opacity: 0.6 },
];

export const ServicesFloaters: Floater[] = [
  { Art: HexNode, top: "5%", right: "8%", size: "60px", drift: "anim-drift-y", color: "var(--color-cobalt)", opacity: 0.5 },
  { Art: StackLayers, top: "85%", left: "10%", size: "72px", drift: "anim-drift-diag", color: "var(--color-ink)", opacity: 0.3 },
];

export const ContactCTAFloaters: Floater[] = [
  { Art: OrbitGrid, top: "-15%", left: "-10%", size: "55vh", drift: "anim-spin-slower", color: "white", opacity: 0.16 },
  { Art: HexNode, top: "20%", right: "8%", size: "64px", drift: "anim-drift-y", color: "white", opacity: 0.6 },
  { Art: Scope, top: "70%", left: "20%", size: "80px", drift: "anim-pulse-soft", color: "white", opacity: 0.5 },
  { Art: CrosshairMark, top: "60%", right: "15%", size: "56px", drift: "anim-drift-orbit", color: "white", opacity: 0.55 },
];

// Animated ticker badge — orbiting label round a center dot
export function OrbitBadge({ label, className = "" }: { label: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`relative grid size-32 place-items-center ${className}`}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="orbit-path" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" fill="none" />
        </defs>
        <text
          fill="currentColor"
          fontFamily="JetBrains Mono, monospace"
          fontSize="13"
          letterSpacing="6"
          textLength="490"
        >
          <textPath href="#orbit-path">{label.repeat(4).toUpperCase()}</textPath>
        </text>
      </svg>
      <span className="size-2 rounded-full bg-current" />
    </motion.span>
  );
}
