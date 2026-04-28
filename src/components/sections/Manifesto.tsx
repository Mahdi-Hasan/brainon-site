"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { PRINCIPLES } from "@/content/site";
import { OrbitGrid, PulseRing, NodesGraph, AsymmetricMark } from "@/components/art/SvgArt";
import { Floaters, ManifestoFloaters } from "@/components/art/Floaters";
import { HexNode, Scope, ArrowLoop, CrosshairMark } from "@/components/art/MoreSvgArt";

const PRINCIPLE_ART = [OrbitGrid, PulseRing, NodesGraph, AsymmetricMark];
const PRINCIPLE_ICON = [HexNode, Scope, ArrowLoop, CrosshairMark];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-principle]") ?? [];
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-void)] text-[var(--color-void-fg)]"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <Floaters floaters={ManifestoFloaters} />
      <div className="container-page relative">
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3" style={{ color: "color-mix(in oklab, var(--color-void-fg) 70%, transparent)" }}>
            Operating principles
          </p>
          <h2 className="md:col-span-9 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95 }}>
            <span className="display-italic">We work the way</span>{" "}
            <span className="display-heavy">we wish other studios did.</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-px md:grid-cols-2">
          {PRINCIPLES.map((p, i) => {
            const Art = PRINCIPLE_ART[i % PRINCIPLE_ART.length];
            const Icon = PRINCIPLE_ICON[i % PRINCIPLE_ICON.length];
            const driftClass = ["anim-drift-y", "anim-drift-orbit", "anim-drift-diag", "anim-pulse-soft"][i % 4];
            return (
              <li
                key={p.n}
                data-principle
                className="group relative grid grid-cols-[auto_1fr] gap-8 overflow-hidden bg-[var(--color-void)] p-10 outline outline-1 outline-white/8 transition-colors hover:bg-[color-mix(in_oklab,var(--color-void)_92%,white_8%)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -bottom-16 size-72 text-white opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:opacity-25 anim-spin-slow"
                >
                  <Art className="h-full w-full" />
                </span>

                <div className="relative flex flex-col items-start gap-4">
                  <span className={`inline-block size-12 text-[var(--color-cobalt)] ${driftClass}`}>
                    <Icon className="h-full w-full" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/40">{p.n}</span>
                </div>

                <div className="relative">
                  <h3 className="mb-3 font-display text-2xl leading-tight tracking-tight">
                    <span className="display-heavy">{p.h}</span>
                  </h3>
                  <p className="max-w-md text-[var(--text-base)] leading-[1.55] text-white/70">{p.b}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute right-8 top-8 text-white/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-[-4px]"
                >
                  ↗
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
