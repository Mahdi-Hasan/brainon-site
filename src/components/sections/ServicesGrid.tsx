"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { SERVICES } from "@/content/site";
import { Blueprint, NodesGraph, PulseRing, StackedBars } from "@/components/art/SvgArt";
import { Floaters, ServicesFloaters } from "@/components/art/Floaters";
import { TerminalCaret, ArrowLoop, BarStep, HexNode, CornerBracket } from "@/components/art/MoreSvgArt";

const SERVICE_ART = [Blueprint, NodesGraph, PulseRing, StackedBars];
const SERVICE_ICON = [TerminalCaret, HexNode, ArrowLoop, BarStep];

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = sectionRef.current?.querySelectorAll<HTMLElement>("[data-service]") ?? [];
        rows.forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 80,
            duration: 1.1,
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
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bone)] scroll-mt-24"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <Floaters floaters={ServicesFloaters} />
      <div className="container-page relative">
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Practice</p>
          <h2 className="md:col-span-9 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95 }}>
            <span className="display-heavy">Four disciplines.</span>{" "}
            <span className="display-italic">One studio.</span>
          </h2>
        </div>

        <ul className="border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)]">
          {SERVICES.map((s, i) => {
            const Art = SERVICE_ART[i % SERVICE_ART.length];
            const Icon = SERVICE_ICON[i % SERVICE_ICON.length];
            const driftClass = ["anim-drift-y", "anim-drift-x", "anim-drift-diag", "anim-drift-orbit"][i % 4];
            return (
              <li
                key={s.id}
                data-service
                className="group relative grid grid-cols-1 gap-8 overflow-hidden border-b border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] py-12 transition-colors duration-700 hover:bg-[var(--color-paper)] md:grid-cols-12 md:py-16"
              >
                {/* Decorative artwork — fades in on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[var(--spacing-margin)] top-1/2 hidden h-44 w-72 -translate-y-1/2 text-[var(--color-cobalt)] opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-60 md:block"
                  style={{ transform: "translate(2rem, -50%)" }}
                >
                  <Art className="h-full w-full" />
                </span>

                <div className="md:col-span-2 relative flex items-start gap-4">
                  <span className={`relative inline-block size-14 text-[var(--color-cobalt)] ${driftClass}`}>
                    <Icon className="h-full w-full" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
                    /{s.id}
                  </span>
                </div>

                <div className="md:col-span-5 relative">
                  <h3
                    className="font-display tracking-[-0.04em]"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 0.95 }}
                  >
                    <span className="display-heavy">{s.title}</span>
                  </h3>
                  <p className="mt-4 max-w-md text-[var(--text-base)] leading-[1.55] text-[var(--color-ink)]/70">
                    {s.body}
                  </p>
                </div>

                <div className="md:col-span-4 md:col-start-9 relative">
                  <p className="eyebrow mb-4">Capabilities</p>
                  <ul className="font-mono text-sm leading-7">
                    {s.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-3">
                        <span aria-hidden style={{ color: "var(--color-cobalt)" }}>
                          ◇
                        </span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-1 md:col-start-12 self-end relative">
                  <span
                    aria-hidden
                    className="relative block size-8 text-[var(--color-ink)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <CornerBracket className="h-full w-full" />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
