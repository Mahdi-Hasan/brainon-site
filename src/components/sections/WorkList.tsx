"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { WORK } from "@/content/site";
import { Blueprint, NodesGraph, PulseRing, StackedBars, OrbitGrid } from "@/components/art/SvgArt";

const SECTOR_ART: Record<string, typeof Blueprint> = {
  Fintech: StackedBars,
  Healthcare: PulseRing,
  Logistics: NodesGraph,
  Security: OrbitGrid,
  Education: Blueprint,
};

export function WorkList() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = ref.current?.querySelectorAll<HTMLElement>("[data-work-row]") ?? [];
        rows.forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              once: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-bone)]"
      style={{ paddingBlock: "calc(var(--spacing-section) * 0.7)" }}
    >
      <div className="container-page">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Case studies · Detail</p>
          <h3
            className="md:col-span-9 font-display tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.02 }}
          >
            <span className="display-italic">Open any case</span>{" "}
            <span className="display-heavy">for the full story.</span>
          </h3>
        </div>

        <ul className="border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)]">
          {WORK.map((w, i) => {
            const Art = SECTOR_ART[w.sector] ?? OrbitGrid;
            return (
              <li key={w.slug} data-work-row>
                <Link
                  href={`/work/${w.slug}`}
                  className="group grid grid-cols-1 items-center gap-6 border-b border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] py-10 transition-colors duration-700 hover:bg-[var(--color-paper)] md:grid-cols-12 md:py-12"
                >
                  <span className="md:col-span-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-5 flex items-center gap-5">
                    <span aria-hidden className="size-10 shrink-0 text-[var(--color-cobalt)] opacity-70">
                      <Art className="h-full w-full" />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">{w.client} · {w.sector}</p>
                      <h4 className="mt-2 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1 }}>
                        <span className="display-heavy">{w.title}</span>
                      </h4>
                    </div>
                  </div>
                  <p className="md:col-span-3 text-[var(--text-sm)] leading-[1.55] text-[var(--color-ink)]/70">
                    {w.summary}
                  </p>
                  <div className="md:col-span-2 md:col-start-10 text-right">
                    <p
                      className="font-display tracking-[-0.05em]"
                      style={{
                        fontSize: "clamp(2rem, 3.5vw, 3rem)",
                        fontVariationSettings: '"opsz" 144, "SOFT" 0, "wght" 900',
                        lineHeight: 0.85,
                        color: "var(--color-cobalt)",
                      }}
                    >
                      {w.metric.value}
                    </p>
                    <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-fog)]">{w.metric.label}</p>
                  </div>
                  <span
                    aria-hidden
                    className="md:col-span-1 md:col-start-12 self-center text-right text-2xl text-[var(--color-ink)] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
