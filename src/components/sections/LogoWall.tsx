"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { WORDMARKS } from "@/components/art/Wordmarks";
import { Ticks, PlusGrid } from "@/components/art/MoreSvgArt";

export function LogoWall() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cells = ref.current?.querySelectorAll<HTMLElement>("[data-logo]") ?? [];
        gsap.from(cells, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            once: true,
          },
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
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 top-1/2 hidden size-44 -translate-y-1/2 text-[var(--color-cobalt)] opacity-20 anim-drift-y md:block"
      >
        <PlusGrid className="h-full w-full" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-8 hidden h-6 w-44 text-[var(--color-ink)] opacity-30 anim-drift-x md:block"
      >
        <Ticks className="h-full w-full" preserveAspectRatio="none" />
      </span>

      <div className="container-page relative">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Trusted by</p>
            <p
              className="font-display tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.1 }}
            >
              <span className="display-italic">Teams that ship.</span>
            </p>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
            Six of forty-seven · Selected on permission, not popularity
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] md:grid-cols-3 lg:grid-cols-6">
          {WORDMARKS.map(({ name, Component }) => (
            <li
              key={name}
              data-logo
              className="group flex h-28 items-center justify-center bg-[var(--color-bone)] px-6 transition-colors duration-500 hover:bg-[var(--color-paper)]"
            >
              <Component className="h-7 w-auto text-[var(--color-ink)]/60 transition-all duration-500 group-hover:text-[var(--color-cobalt)]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
