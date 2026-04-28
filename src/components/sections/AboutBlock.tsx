"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap, SplitText } from "@/lib/gsap-init";
import { Scope, HexNode, CornerBracket } from "@/components/art/MoreSvgArt";

export function AboutBlock() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headline = ref.current?.querySelector<HTMLElement>("[data-about-headline]");
        if (!headline) return;
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
          <p className="eyebrow md:col-span-3">About · Studio · Practice</p>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
