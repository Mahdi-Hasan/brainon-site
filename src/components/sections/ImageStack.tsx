"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { OrbitGrid, Blueprint, NodesGraph } from "@/components/art/SvgArt";
import { Scope, HexNode, Constellation, WaveLine, Ticks, CornerBracket, PlusGrid } from "@/components/art/MoreSvgArt";

const PANELS = [
  {
    src: "/art/cobalt-field.svg",
    alt: "Cobalt radial field — discovery phase",
    kicker: "01 · Field notes",
    label: "Discover",
    mood: "Cool · listening",
    ratio: "aspect-[3/4]",
    drift: "anim-drift-y",
  },
  {
    src: "/art/bone-grid.svg",
    alt: "Bone-coloured measurement grid — design phase",
    kicker: "02 · Measure",
    label: "Design",
    mood: "Quiet · precise",
    ratio: "aspect-[4/5]",
    drift: "anim-drift-diag",
  },
  {
    src: "/art/ember-mesh.svg",
    alt: "Ember mesh gradient — build phase",
    kicker: "03 · Compose",
    label: "Build",
    mood: "Hot · committed",
    ratio: "aspect-[3/4]",
    drift: "anim-drift-y anim-delay-1200",
  },
];

export function ImageStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();

      // Reveal stagger on first scroll into view.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = ref.current?.querySelectorAll<HTMLElement>("[data-panel]") ?? [];
        gsap.from(panels, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            once: true,
          },
        });
      });

      // Continuous parallax — each panel translates at a different rate as the
      // section scrolls past, so the layout feels alive instead of static.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const panels = ref.current?.querySelectorAll<HTMLElement>("[data-parallax]") ?? [];
        panels.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? "0");
          if (!speed) return;
          gsap.fromTo(
            el,
            { yPercent: -speed },
            {
              yPercent: speed,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        });

        // Diagram inner nodes drift on scrub for parallax depth on top of CSS keyframes.
        const nodes = ref.current?.querySelectorAll<HTMLElement>("[data-mood-node]") ?? [];
        nodes.forEach((node, j) => {
          gsap.fromTo(
            node,
            { x: (j % 2 === 0 ? -16 : 16), y: (j % 3 === 0 ? 10 : -10) },
            {
              x: (j % 2 === 0 ? 16 : -16),
              y: (j % 3 === 0 ? -10 : 10),
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bone)]"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <div className="container-page">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Studio · Atmosphere</p>
          <h2
            className="md:col-span-9 font-display tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95 }}
          >
            <span className="display-italic">Three moods,</span>{" "}
            <span className="display-heavy">one studio.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Top row: image 1 + image 2 + synth-diagram aside */}
          <figure
            data-panel
            data-parallax="3"
            className="group relative col-span-12 md:col-span-4 md:col-start-1 overflow-hidden"
          >
            <div className={`relative ${PANELS[0].ratio} w-full overflow-hidden bg-[var(--color-paper)]`}>
              <Image
                src={PANELS[0].src}
                alt={PANELS[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${PANELS[0].drift}`}
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-30" />
              <span aria-hidden className="pointer-events-none absolute inset-0 text-[var(--color-bone)]/30 mix-blend-overlay anim-spin-slower">
                <OrbitGrid className="h-full w-full" />
              </span>
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-bone)]/85">
                mood · 01 — {PANELS[0].mood}
              </span>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">{PANELS[0].kicker}</span>
              <span className="font-display text-xl tracking-tight">
                <span className="display-italic">{PANELS[0].label}</span>
              </span>
            </figcaption>
          </figure>

          <figure
            data-panel
            data-parallax="-5"
            className="group relative col-span-12 md:col-span-4 md:col-start-5 md:mt-16 overflow-hidden"
          >
            <div className={`relative ${PANELS[1].ratio} w-full overflow-hidden bg-[var(--color-paper)]`}>
              <Image
                src={PANELS[1].src}
                alt={PANELS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${PANELS[1].drift}`}
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-20" />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 text-[var(--color-ink)]/35 anim-drift-x">
                <Blueprint className="h-full w-full" />
              </span>
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-ink)]/70">
                mood · 02 — {PANELS[1].mood}
              </span>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">{PANELS[1].kicker}</span>
              <span className="font-display text-xl tracking-tight">
                <span className="display-italic">{PANELS[1].label}</span>
              </span>
            </figcaption>
          </figure>

          {/* Synthesizing diagram aside — fills the previously-empty top-right rectangle */}
          <aside
            data-panel
            data-parallax="6"
            className="relative col-span-12 md:col-span-3 md:col-start-10 md:mt-32 md:self-start"
            aria-hidden
          >
            <div className="relative aspect-[3/5] w-full overflow-hidden border border-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] bg-[color-mix(in_oklab,var(--color-paper)_60%,transparent)]">
              <span className="pointer-events-none absolute inset-0 text-[var(--color-ink)]/25">
                <PlusGrid className="h-full w-full" preserveAspectRatio="none" />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-[18%] size-24 -translate-x-1/2 text-[var(--color-cobalt)]/70 anim-drift-orbit">
                <Scope className="h-full w-full" />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 text-[var(--color-cobalt)]/55 anim-drift-x">
                <Constellation className="h-full w-full" preserveAspectRatio="none" />
              </span>
              <span className="pointer-events-none absolute left-4 bottom-16 size-12 text-[var(--color-ember)] anim-drift-y">
                <HexNode className="h-full w-full" />
              </span>
              <span className="pointer-events-none absolute right-4 bottom-10 h-6 w-24 text-[var(--color-cobalt)]/60 anim-drift-x anim-delay-600">
                <WaveLine className="h-full w-full" preserveAspectRatio="none" />
              </span>
              <span data-mood-node className="pointer-events-none absolute left-[28%] top-[32%] size-2 rounded-full bg-[var(--color-cobalt)] anim-pulse-soft" />
              <span data-mood-node className="pointer-events-none absolute right-[24%] top-[58%] size-3 rounded-full bg-[var(--color-ember)] anim-pulse-soft anim-delay-600" />
              <span data-mood-node className="pointer-events-none absolute left-[40%] bottom-[18%] size-2 rounded-full bg-[var(--color-ink)]/80 anim-pulse-soft anim-delay-1200" />
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                fig · synth — three into one
              </span>
              <span className="pointer-events-none absolute right-3 bottom-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                ↻ studio loop
              </span>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
              ¶ Synth — one studio
            </p>
          </aside>

          {/* Bottom row: image 3 + process narrative + small phase-arc diagram */}
          <figure
            data-panel
            data-parallax="-4"
            className="group relative col-span-12 md:col-span-3 md:col-start-2 md:mt-12 overflow-hidden"
          >
            <div className={`relative ${PANELS[2].ratio} w-full overflow-hidden bg-[var(--color-paper)]`}>
              <Image
                src={PANELS[2].src}
                alt={PANELS[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${PANELS[2].drift}`}
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-30" />
              <span aria-hidden className="pointer-events-none absolute inset-0 text-[var(--color-bone)]/30 mix-blend-overlay anim-drift-orbit">
                <NodesGraph className="h-full w-full" />
              </span>
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-bone)]/85">
                mood · 03 — {PANELS[2].mood}
              </span>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">{PANELS[2].kicker}</span>
              <span className="font-display text-xl tracking-tight">
                <span className="display-italic">{PANELS[2].label}</span>
              </span>
            </figcaption>
          </figure>

          <aside
            data-panel
            className="col-span-12 md:col-span-5 md:col-start-6 md:mt-12 md:self-center md:pl-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
              ¶ Process — three movements
            </p>
            <p
              className="mt-6 font-display tracking-[-0.02em] text-[var(--color-ink)]/85"
              style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)", lineHeight: 1.3 }}
            >
              <span className="display-italic">Discover</span> the constraint nobody wrote down.{" "}
              <span className="display-italic">Design</span> the smallest thing that proves it.{" "}
              <span className="display-italic">Build</span> only what survives the proof.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
              {[
                ["Phase 01", "1–2 wks"],
                ["Phase 02", "2–4 wks"],
                ["Phase 03", "4–18 wks"],
              ].map(([k, v], i) => (
                <div key={k} className="relative">
                  <span className="absolute -top-2 left-0 h-px w-full bg-[color-mix(in_oklab,var(--color-ink)_15%,transparent)]">
                    <span
                      data-mood-node
                      className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-[var(--color-cobalt)] anim-pulse-soft"
                      style={{ animationDelay: `${i * -600}ms` }}
                    />
                  </span>
                  <dt>{k}</dt>
                  <dd className="mt-1 text-[var(--color-ink)]">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* Bottom-right phase arc diagram — pairs with the process narrative */}
          <aside
            data-panel
            data-parallax="4"
            className="relative col-span-12 md:col-span-3 md:col-start-11 md:mt-12 md:self-center"
            aria-hidden
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] bg-[color-mix(in_oklab,var(--color-paper)_60%,transparent)]">
              <span className="pointer-events-none absolute inset-0 text-[var(--color-ink)]/25">
                <Blueprint className="h-full w-full" />
              </span>
              <span className="pointer-events-none absolute inset-x-4 top-6 h-12 text-[var(--color-cobalt)]/60 anim-drift-x">
                <WaveLine className="h-full w-full" preserveAspectRatio="none" />
              </span>
              <span className="pointer-events-none absolute inset-x-4 top-1/2 h-6 -translate-y-1/2 text-[var(--color-fog)]/85 anim-drift-x anim-delay-600">
                <Ticks className="h-full w-full" preserveAspectRatio="none" />
              </span>
              <span className="pointer-events-none absolute right-3 bottom-3 size-10 text-[var(--color-ember)] anim-drift-diag">
                <CornerBracket className="h-full w-full" />
              </span>
              <span data-mood-node className="pointer-events-none absolute left-[18%] top-[32%] size-2 rounded-full bg-[var(--color-cobalt)] anim-pulse-soft" />
              <span data-mood-node className="pointer-events-none absolute left-1/2 top-[58%] size-2.5 rounded-full bg-[var(--color-ember)] anim-pulse-soft anim-delay-600" />
              <span data-mood-node className="pointer-events-none absolute right-[18%] bottom-[22%] size-2 rounded-full bg-[var(--color-ink)] anim-pulse-soft anim-delay-1200" />
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                fig · arc — phase tempo
              </span>
              <span className="pointer-events-none absolute right-3 bottom-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                wk 1 → wk 24
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
