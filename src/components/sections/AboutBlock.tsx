"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap, SplitText } from "@/lib/gsap-init";
import { Scope, HexNode, CornerBracket, Constellation, WaveLine, Ticks } from "@/components/art/MoreSvgArt";
import { OrbitGrid, Blueprint } from "@/components/art/SvgArt";

export function AboutBlock() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headline = ref.current?.querySelector<HTMLElement>("[data-about-headline]");
        if (headline) {
          const split = new SplitText(headline, { type: "chars,words" });
          gsap.set(split.chars, { yPercent: 110, opacity: 0 });
          gsap.to(split.chars, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.014,
            scrollTrigger: { trigger: headline, start: "top 78%", once: true },
          });
          return () => split.revert();
        }
      });

      // Diagram parallax — scrub-driven translate on the two embedded SVGs.
      // Inner layers also have CSS keyframe drifts so motion is always visible,
      // not only while the user is actively scrolling.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const diagrams = ref.current?.querySelectorAll<HTMLElement>("[data-diagram]") ?? [];
        diagrams.forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            el,
            { yPercent: 18 * dir, opacity: 0.55 },
            {
              yPercent: -18 * dir,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );

          // Inner nodes additionally translate on scrub for depth (CSS handles the
          // continuous loop; this adds scroll-tied motion on top).
          const nodes = el.querySelectorAll<HTMLElement>("[data-diagram-node]");
          nodes.forEach((node, j) => {
            gsap.fromTo(
              node,
              { x: (j % 2 === 0 ? -18 : 18), y: (j % 3 === 0 ? 12 : -12) },
              {
                x: (j % 2 === 0 ? 18 : -18),
                y: (j % 3 === 0 ? -12 : 12),
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              }
            );
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-bone)] scroll-mt-24"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <span aria-hidden className="pointer-events-none absolute -right-12 top-12 size-32 text-[var(--color-cobalt)] opacity-50 anim-drift-orbit">
        <Scope className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute left-[8%] bottom-12 size-12 text-[var(--color-ink)]/30 anim-drift-y">
        <HexNode className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute right-[10%] bottom-16 hidden size-9 text-[var(--color-ink)]/35 md:block">
        <CornerBracket className="h-full w-full" />
      </span>

      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3 flex flex-col gap-10">
            <p className="eyebrow">About · Studio · Practice</p>

            <div className="hidden md:block">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
                ¶ 001 — House note
              </p>
              <p
                className="mt-4 font-display tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)", lineHeight: 1.25 }}
              >
                <span className="display-italic">&ldquo;Senior all the way down.&rdquo;</span>
              </p>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                — operating principle, day one
              </p>
            </div>

            <ul className="hidden md:block space-y-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink)]/70">
              <li>01 · No juniors on critical path</li>
              <li>02 · Same engineer scope &amp; ship</li>
              <li>03 · Async-first, time-zone honest</li>
              <li>04 · Code we&apos;d sign our names to</li>
            </ul>

            <div className="hidden md:block border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
                ¶ 002 — Where we work
              </p>
              <ul className="mt-4 space-y-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink)]/80">
                <li className="flex items-baseline justify-between gap-3">
                  <span>Dhaka</span>
                  <span className="text-[var(--color-fog)]">UTC+6</span>
                </li>
                <li className="flex items-baseline justify-between gap-3">
                  <span>Berlin</span>
                  <span className="text-[var(--color-fog)]">UTC+1</span>
                </li>
                <li className="flex items-baseline justify-between gap-3">
                  <span>NYC</span>
                  <span className="text-[var(--color-fog)]">UTC−5</span>
                </li>
                <li className="flex items-baseline justify-between gap-3">
                  <span>Singapore</span>
                  <span className="text-[var(--color-fog)]">UTC+8</span>
                </li>
                <li className="flex items-baseline justify-between gap-3">
                  <span>Lagos</span>
                  <span className="text-[var(--color-fog)]">UTC+1</span>
                </li>
              </ul>
              <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                ↻ at least one hub awake — always
              </p>
            </div>

            <div className="hidden md:block border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
                ¶ 003 — Stack
              </p>
              <p className="mt-4 font-mono text-xs leading-6 uppercase tracking-[0.18em] text-[var(--color-ink)]/75">
                TypeScript · Go · Rust · Python · Postgres · Kafka · k8s · LLM eval pipelines
              </p>
            </div>
          </div>
          <div className="md:col-span-9">
            <h2
              data-about-headline
              className="font-display tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.92 }}
            >
              <span className="display-heavy">A studio of</span>{" "}
              <span className="display-italic" style={{ color: "var(--color-cobalt)" }}>
                builders, not subcontractors.
              </span>
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-9">
              <p className="md:col-span-5 max-w-xl text-[var(--text-lg)] leading-[1.5] text-[var(--color-ink)]/75">
                BrainOn is a senior-staffed software studio. We don&apos;t run discovery to win work then quietly swap in juniors. The engineers who scope your project are the engineers who ship it.
              </p>

              <dl className="md:col-span-4 grid grid-cols-2 gap-x-6 gap-y-8 self-start">
                {[
                  { label: "Founded", value: "2017" },
                  { label: "Practice", value: "Distributed · 5 hubs" },
                  { label: "Team", value: "34 senior" },
                  { label: "Engagement", value: "8–24 weeks" },
                ].map((m) => (
                  <div key={m.label}>
                    <dt className="eyebrow mb-2">{m.label}</dt>
                    <dd className="font-display text-2xl tracking-tight">
                      <span className="display-heavy">{m.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Primary diagram — fills the rectangle directly under the description. */}
              <div
                data-diagram
                className="md:col-span-5 relative aspect-[16/10] w-full overflow-hidden border border-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--color-paper)_70%,transparent)]"
                aria-hidden
              >
                <span className="pointer-events-none absolute inset-0 text-[var(--color-cobalt)]/40 anim-spin-slower">
                  <OrbitGrid className="h-full w-full" />
                </span>
                <span className="pointer-events-none absolute -left-6 top-6 size-24 text-[var(--color-cobalt)] opacity-70 anim-drift-orbit">
                  <Scope className="h-full w-full" />
                </span>
                <span className="pointer-events-none absolute right-8 bottom-10 size-16 text-[var(--color-ink)]/55 anim-drift-y anim-delay-600">
                  <HexNode className="h-full w-full" />
                </span>
                <span className="pointer-events-none absolute left-10 bottom-6 h-8 w-40 text-[var(--color-cobalt)]/70 anim-drift-x">
                  <WaveLine className="h-full w-full" preserveAspectRatio="none" />
                </span>
                <span data-diagram-node className="pointer-events-none absolute right-12 top-10 size-3 rounded-full bg-[var(--color-cobalt)] anim-pulse-soft" />
                <span data-diagram-node className="pointer-events-none absolute left-1/3 top-1/2 size-2 rounded-full bg-[var(--color-ink)]/70 anim-pulse-soft anim-delay-600" />
                <span data-diagram-node className="pointer-events-none absolute right-1/4 bottom-1/3 size-2.5 rounded-full bg-[var(--color-ember)] anim-pulse-soft anim-delay-1200" />
                <span className="pointer-events-none absolute left-4 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                  fig · A — practice topology
                </span>
                <span className="pointer-events-none absolute right-4 bottom-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                  47 launches · ↻
                </span>
              </div>

              {/* Secondary diagram — fills the rectangle under the metrics dl. */}
              <div
                data-diagram
                className="md:col-span-4 relative aspect-[16/10] w-full overflow-hidden border border-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--color-paper)_70%,transparent)]"
                aria-hidden
              >
                <span className="pointer-events-none absolute inset-0 text-[var(--color-ink)]/35">
                  <Blueprint className="h-full w-full" />
                </span>
                <span className="pointer-events-none absolute right-4 top-6 w-32 text-[var(--color-cobalt)]/70 anim-drift-orbit anim-delay-1200">
                  <Constellation className="h-full w-full" />
                </span>
                <span className="pointer-events-none absolute left-6 bottom-6 h-6 w-40 text-[var(--color-cobalt)]/50 anim-drift-x anim-delay-600">
                  <Ticks className="h-full w-full" preserveAspectRatio="none" />
                </span>
                <span className="pointer-events-none absolute right-6 bottom-6 size-10 text-[var(--color-ember)] anim-drift-diag">
                  <CornerBracket className="h-full w-full" />
                </span>
                <span data-diagram-node className="pointer-events-none absolute left-8 top-1/3 size-2 rounded-full bg-[var(--color-ink)] anim-pulse-soft" />
                <span data-diagram-node className="pointer-events-none absolute left-1/2 top-1/2 size-3 rounded-full bg-[var(--color-cobalt)] anim-pulse-soft anim-delay-600" />
                <span data-diagram-node className="pointer-events-none absolute right-1/3 bottom-1/4 size-2 rounded-full bg-[var(--color-ember)]/85 anim-pulse-soft anim-delay-1200" />
                <span className="pointer-events-none absolute left-4 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                  fig · B — engagement arc
                </span>
                <span className="pointer-events-none absolute right-4 bottom-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                  8 → 24 wk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
