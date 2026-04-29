"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap, ScrollTrigger } from "@/lib/gsap-init";
import { OrbitGrid, Blueprint, NodesGraph, ArrowMark } from "@/components/art/SvgArt";
import { Scope, HexNode, Constellation, WaveLine, Ticks, CornerBracket, PlusGrid } from "@/components/art/MoreSvgArt";

const FRAMES = [
  {
    kicker: "01 · Discover",
    big: "We listen first.",
    body: "Two weeks paired with your team. We ride along, take notes, and write a memo that names the actual problem.",
    Art: OrbitGrid,
  },
  {
    kicker: "02 · Design",
    big: "We make it real.",
    body: "Tokenized design systems and prototypes you can actually click. Decisions get made in the artifact, not the slide deck.",
    Art: Blueprint,
  },
  {
    kicker: "03 · Build",
    big: "Senior pods, no hand-offs.",
    body: "The engineers in discovery are the engineers shipping. Pull requests merge daily. Demos happen weekly.",
    Art: NodesGraph,
  },
  {
    kicker: "04 · Hand off",
    big: "We leave a paper trail.",
    body: "Runbooks, ADRs, observability dashboards, an enabled team. The next chapter is written by you.",
    Art: ArrowMark,
  },
];

export function PinnedStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        const frames = sectionRef.current?.querySelectorAll<HTMLElement>("[data-frame]") ?? [];
        const arts = sectionRef.current?.querySelectorAll<HTMLElement>("[data-art]") ?? [];
        const dots = sectionRef.current?.querySelectorAll<HTMLElement>("[data-dot]") ?? [];
        const stage = stickyRef.current;
        if (!stage || frames.length === 0) return;

        const labels = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>("[data-step-label]") ?? []);
        const fills = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>("[data-step-fill]") ?? []);

        gsap.set(frames, { opacity: 0, y: 80, filter: "blur(12px)" });
        gsap.set(arts, { opacity: 0, scale: 0.8, rotate: -6 });
        gsap.set(frames[0], { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(arts[0], { opacity: 1, scale: 1, rotate: 0 });
        gsap.set(dots, { backgroundColor: "color-mix(in oklab, var(--color-ink) 18%, transparent)", scale: 1 });
        if (dots[0]) gsap.set(dots[0], { backgroundColor: "var(--color-cobalt)", scale: 1.6 });
        if (labels.length) {
          gsap.set(labels, { color: "var(--color-fog)" });
          if (labels[0]) gsap.set(labels[0], { color: "var(--color-ink)" });
        }
        if (fills.length) {
          gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });
          if (fills[0]) gsap.set(fills[0], { scaleX: 1 });
        }

        // Slightly tighter than 1 step per viewport — feels snappier without becoming jumpy.
        const stepHeight = window.innerHeight * 0.7;
        const totalScroll = stepHeight * frames.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 0.6,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const fillRail = railRef.current?.querySelector<HTMLElement>("[data-rail-fill]");
        if (fillRail) {
          tl.to(fillRail, { scaleY: 1, ease: "none", duration: frames.length }, 0);
        }

        for (let i = 1; i < frames.length; i++) {
          const prevFrame = frames[i - 1];
          const frame = frames[i];
          const prevArt = arts[i - 1];
          const art = arts[i];
          const prevDot = dots[i - 1];
          const dot = dots[i];
          const prevLabel = labels[i - 1];
          const label = labels[i];
          const prevFill = fills[i - 1];
          const fill = fills[i];

          tl.addLabel(`step-${i}`, i)
            .to(prevFrame, { opacity: 0, y: -80, filter: "blur(10px)", duration: 1, ease: "power2.inOut" }, i - 0.5)
            .to(prevArt, { opacity: 0, scale: 0.85, rotate: 5, duration: 1, ease: "power2.inOut" }, i - 0.5)
            .fromTo(
              frame,
              { opacity: 0, y: 80, filter: "blur(12px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" },
              i - 0.5
            )
            .fromTo(
              art,
              { opacity: 0, scale: 1.15, rotate: -8 },
              { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: "power2.out" },
              i - 0.5
            )
            .to(prevDot, { backgroundColor: "color-mix(in oklab, var(--color-ink) 18%, transparent)", scale: 1, duration: 0.4, ease: "power2.out" }, i - 0.3)
            .to(dot, { backgroundColor: "var(--color-cobalt)", scale: 1.6, duration: 0.4, ease: "power2.out" }, i - 0.3);

          if (prevLabel) tl.to(prevLabel, { color: "var(--color-fog)", duration: 0.4, ease: "none" }, i - 0.3);
          if (label) tl.to(label, { color: "var(--color-ink)", duration: 0.4, ease: "none" }, i - 0.3);
          if (prevFill) tl.to(prevFill, { scaleX: 0, transformOrigin: "right center", duration: 0.4, ease: "power2.in" }, i - 0.3);
          if (fill) tl.fromTo(fill, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, i - 0.3);
        }

        // Re-measure once fonts settle and after ambient diagrams paint, otherwise
        // the pin can latch to an out-of-date height and frames render stacked.
        if (typeof document !== "undefined" && "fonts" in document) {
          document.fonts.ready.then(() => ScrollTrigger.refresh());
        }
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-paper)]"
      aria-label="How we work"
    >
      <div ref={stickyRef} className="relative grid h-[100svh] place-items-center overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-[8vw] -top-[20vh] h-[80vh] w-[80vh] rounded-full"
          style={{
            background: "radial-gradient(closest-side, color-mix(in oklab, var(--color-cobalt) 18%, transparent), transparent 65%)",
          }}
        />

        {/* Ambient diagrams — fill empty zones with subtle scrub + drift motion. */}
        <span
          aria-hidden
          data-ambient="tl-square"
          className="pointer-events-none absolute left-[42%] top-[6%] hidden size-24 text-[var(--color-cobalt)]/55 anim-drift-diag md:block"
        >
          <Scope className="h-full w-full" />
        </span>
        <span
          aria-hidden
          data-ambient="tr-grid"
          className="pointer-events-none absolute right-[3%] top-[5%] hidden h-[22vh] w-[26vw] text-[var(--color-cobalt)]/50 md:block"
        >
          <span className="absolute inset-0 anim-drift-orbit">
            <Constellation className="h-full w-full" />
          </span>
          <span className="absolute right-4 top-3 size-12 anim-drift-y text-[var(--color-ink)]/35">
            <HexNode className="h-full w-full" />
          </span>
          <span className="absolute left-3 bottom-3 h-6 w-32 anim-drift-x text-[var(--color-cobalt)]/65">
            <WaveLine className="h-full w-full" preserveAspectRatio="none" />
          </span>
        </span>
        <span
          aria-hidden
          data-ambient="bottom-strip"
          className="pointer-events-none absolute inset-x-[var(--spacing-margin)] bottom-[6%] hidden h-[14vh] md:block"
        >
          <span className="absolute inset-0 text-[var(--color-ink)]/25">
            <PlusGrid className="h-full w-full" preserveAspectRatio="none" />
          </span>
          <span className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 anim-drift-x text-[var(--color-cobalt)]/50">
            <WaveLine className="h-full w-full" preserveAspectRatio="none" />
          </span>
          <span className="absolute right-[18%] bottom-1 h-5 w-[28%] text-[var(--color-fog)]/80 anim-drift-x anim-delay-600">
            <Ticks className="h-full w-full" preserveAspectRatio="none" />
          </span>
          <span className="absolute left-[6%] top-2 size-10 text-[var(--color-ember)] anim-drift-y">
            <CornerBracket className="h-full w-full" />
          </span>
        </span>

        <div className="container-page relative grid h-full grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow mb-6">How we work</p>
            <p className="max-w-sm text-[var(--text-base)] leading-[1.5] text-[var(--color-ink)]/70">
              A 4-phase practice we&apos;ve refined across 47 launches. Each phase has its own deliverables and exit criteria.
            </p>

            {/* Phase progress — active step shows cobalt fill + ink label, others stay muted. */}
            <ol className="mt-8 hidden grid-cols-4 gap-3 md:grid" aria-label="Pipeline phases">
              {FRAMES.map((f, i) => (
                <li key={i} className="relative flex flex-col">
                  <span className="relative h-px w-full bg-[color-mix(in_oklab,var(--color-ink)_15%,transparent)]">
                    <span
                      data-step-fill
                      className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-cobalt)]"
                    />
                  </span>
                  <span className="mt-3 flex items-center gap-2">
                    <span data-dot className="inline-block size-1.5 rounded-full" aria-hidden />
                    <span
                      data-step-label
                      className="font-mono text-xs uppercase tracking-[0.2em]"
                      style={{ color: "var(--color-fog)" }}
                    >
                      {f.kicker.split(" · ")[0]}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Artwork stage */}
          <div className="relative md:col-span-4 md:col-start-5" style={{ height: "min(56vh, 30rem)" }}>
            {FRAMES.map(({ Art, kicker }, i) => (
              <div
                key={i}
                data-art
                className="absolute inset-0 grid place-items-center will-change-transform"
                style={{
                  color: i === 0 ? "var(--color-cobalt)" : "var(--color-ink)",
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                <Art className="h-full w-full" />
                <span className="sr-only">{kicker} illustration</span>
              </div>
            ))}
          </div>

          {/* Copy stage */}
          <div className="relative md:col-span-4 md:col-start-9" style={{ height: "min(56vh, 30rem)" }}>
            {FRAMES.map((f, i) => (
              <article
                key={i}
                data-frame
                className="absolute inset-0 flex flex-col justify-center will-change-transform"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-cobalt)]"
                  style={{ marginBottom: "0.75em" }}
                >
                  {f.kicker}
                </p>
                <h3
                  className="font-display tracking-[-0.04em]"
                  style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", lineHeight: 0.92 }}
                >
                  <span className="display-heavy">{f.big.split(" ").slice(0, -1).join(" ")}</span>{" "}
                  <span className="display-italic">{f.big.split(" ").slice(-1)}</span>
                </h3>
                <p className="mt-6 max-w-md text-[var(--text-base)] leading-[1.55] text-[var(--color-ink)]/75">
                  {f.body}
                </p>
              </article>
            ))}
          </div>

          {/* Progress rail */}
          <div
            ref={railRef}
            className="absolute right-[var(--spacing-margin)] top-1/2 hidden h-[22vh] -translate-y-1/2 flex-col gap-3 md:flex"
            aria-hidden
          >
            <div className="relative ml-auto h-full w-px bg-[color-mix(in_oklab,var(--color-ink)_15%,transparent)]">
              <div
                data-rail-fill
                className="absolute inset-x-0 top-0 origin-top scale-y-0 bg-[var(--color-cobalt)]"
                style={{ height: "100%" }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile stack */}
      <div className="container-page block space-y-16 pb-24 md:hidden">
        {FRAMES.map(({ Art, ...f }, i) => (
          <article key={i} className="grid grid-cols-[auto_1fr] items-start gap-6">
            <div className="size-20 shrink-0" style={{ color: "var(--color-cobalt)" }}>
              <Art className="h-full w-full" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-cobalt)]">{f.kicker}</p>
              <h3 className="mt-2 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", lineHeight: 0.95 }}>
                <span className="display-heavy">{f.big.split(" ").slice(0, -1).join(" ")}</span>{" "}
                <span className="display-italic">{f.big.split(" ").slice(-1)}</span>
              </h3>
              <p className="mt-3 text-[var(--text-base)] leading-[1.55] text-[var(--color-ink)]/70">{f.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
