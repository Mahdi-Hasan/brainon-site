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

export function HorizontalWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;

        const getDistance = () => {
          const viewport = stage.clientWidth || window.innerWidth;
          return Math.max(0, track.scrollWidth - viewport);
        };

        const tween = gsap.to(track, {
          x: () => `-${getDistance()}px`,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Re-measure once fonts have settled
        if (typeof document !== "undefined" && "fonts" in document) {
          document.fonts.ready.then(() => {
            tween.scrollTrigger?.refresh();
          });
        }

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[var(--color-bone)] scroll-mt-24"
      style={{ paddingTop: "var(--spacing-section)" }}
    >
      {/* Heading lives OUTSIDE the pinned stage so it doesn't eat the viewport. */}
      <div className="container-page mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">Selected work · 2024–2026</p>
        <h2
          className="md:col-span-7 font-display tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95 }}
        >
          <span className="display-heavy">Tools that get used</span>{" "}
          <span className="display-italic">until they don&apos;t need us.</span>
        </h2>
        <aside className="md:col-span-2 md:col-start-11 self-end border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
          <p>
            <span className="text-[var(--color-ink)]">5 cases</span> · pin &amp; scroll
          </p>
          <p className="mt-3 normal-case tracking-normal text-[var(--color-ink)]/70">
            Each shipped to production, still in use, still measurable.
          </p>
        </aside>
      </div>

      {/* Pinned stage — exactly 100svh so the entire viewport is the canvas while horizontal scroll runs. */}
      <div
        ref={stageRef}
        className="relative h-[100svh] w-full overflow-hidden"
      >
        <div className="flex h-full items-center">
          <div
            ref={trackRef}
            className="flex items-center gap-8 pl-[var(--spacing-margin)] pr-[var(--spacing-margin)] will-change-transform"
          >
            {WORK.map((w, i) => {
              const Art = SECTOR_ART[w.sector] ?? OrbitGrid;
              return (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="group flex aspect-[4/5] h-[78svh] shrink-0 flex-col justify-between bg-[var(--color-paper)] p-8 outline outline-1 outline-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] transition-all duration-700 hover:outline-[color-mix(in_oklab,var(--color-ink)_30%,transparent)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
                      {String(i + 1).padStart(2, "0")} / {String(WORK.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
                      {w.year} · {w.sector}
                    </span>
                  </div>

                  <div
                    aria-hidden
                    className="my-6 relative grid place-items-center"
                    style={{ minHeight: "min(40vh, 18rem)" }}
                  >
                    <span className="absolute inset-0 grid place-items-center text-[var(--color-cobalt)] opacity-25 transition-opacity duration-700 group-hover:opacity-60">
                      <Art className="h-[85%] w-[85%]" />
                    </span>
                    <span
                      className="font-display relative"
                      style={{
                        fontSize: "clamp(4rem, 11vw, 9rem)",
                        fontVariationSettings: '"opsz" 144, "SOFT" 0, "wght" 900',
                        letterSpacing: "-0.06em",
                        lineHeight: 0.85,
                        color: "var(--color-cobalt)",
                      }}
                    >
                      {w.metric.value}
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fog)]">
                        {w.client}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-[1.05] tracking-tight">
                        <span className="display-heavy">{w.title}</span>
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="shrink-0 text-2xl text-[var(--color-ink)] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              );
            })}

            <Link
              href="#contact"
              className="grid aspect-[4/5] h-[78svh] shrink-0 place-items-center bg-[var(--color-ink)] p-8 text-[var(--color-bone)]"
            >
              <span
                className="font-display tracking-[-0.04em]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 0.95 }}
              >
                <span className="display-italic">Start yours</span>{" "}
                <span className="display-heavy">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Edge-fade hints so users feel the horizontal motion */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-bone)] to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-bone)] to-transparent"
        />

        {/* Scroll hint */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]"
        >
          Scroll →
        </span>
      </div>
    </section>
  );
}
