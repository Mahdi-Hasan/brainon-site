"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { STATS } from "@/content/site";
import { Floaters, StatsFloaters } from "@/components/art/Floaters";
import { Ticks, WaveLine, PlusGrid, Constellation } from "@/components/art/MoreSvgArt";

const STAT_DECOR = [Ticks, WaveLine, PlusGrid, Constellation];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-stat]") ?? [];
        items.forEach((item, i) => {
          gsap.from(item, {
            opacity: 0,
            y: 50,
            scale: 0.96,
            duration: 1,
            ease: "expo.out",
            delay: i * 0.07,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
      className="relative overflow-hidden"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <Floaters floaters={StatsFloaters} />
      <div className="container-page relative">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">By the numbers</p>
          <h2 className="md:col-span-9 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95 }}>
            <span className="display-heavy">Compounding</span>{" "}
            <span className="display-italic">since 2017.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden bg-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] md:grid-cols-4">
          {STATS.map((s, i) => {
            const Decor = STAT_DECOR[i % STAT_DECOR.length];
            const driftClass = ["anim-drift-y", "anim-drift-x", "anim-drift-diag", "anim-drift-orbit"][i % 4];
            return (
            <div
              key={s.label}
              data-stat
              className="group relative flex flex-col justify-between overflow-hidden bg-[var(--color-bone)] p-8 transition-colors duration-500 hover:bg-[var(--color-paper)] md:p-12"
              style={{ minHeight: "clamp(14rem, 22vh, 22rem)" }}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-6 top-1/2 size-44 -translate-y-1/2 text-[var(--color-cobalt)] opacity-10 transition-opacity duration-500 group-hover:opacity-30 ${driftClass}`}
              >
                <Decor className="h-full w-full" />
              </span>

              <span
                aria-hidden
                className="relative font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]"
              >
                /{s.label.split(" ")[0].toLowerCase()}
              </span>
              <div className="relative">
                <p
                  className="font-display tracking-[-0.05em]"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    lineHeight: 0.85,
                    fontVariationSettings: '"opsz" 144, "SOFT" 0, "wght" 900',
                  }}
                >
                  {s.value}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fog)]">
                  {s.label}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
