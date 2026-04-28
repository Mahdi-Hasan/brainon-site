"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";

const PANELS = [
  {
    src: "/art/cobalt-field.svg",
    alt: "Cobalt radial field — discovery phase",
    kicker: "01 · Field notes",
    label: "Discover",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/art/bone-grid.svg",
    alt: "Bone-coloured measurement grid — design phase",
    kicker: "02 · Measure",
    label: "Design",
    ratio: "aspect-[4/5]",
  },
  {
    src: "/art/ember-mesh.svg",
    alt: "Ember mesh gradient — build phase",
    kicker: "03 · Compose",
    label: "Build",
    ratio: "aspect-[3/4]",
  },
];

export function ImageStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
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
          {PANELS.map((p, i) => (
            <figure
              key={p.src}
              data-panel
              className={`group relative col-span-12 ${
                i === 0 ? "md:col-span-5 md:col-start-1 md:mt-0" : i === 1 ? "md:col-span-4 md:col-start-7 md:mt-24" : "md:col-span-3 md:col-start-2 md:-mt-12"
              } overflow-hidden`}
            >
              <div className={`relative ${p.ratio} w-full overflow-hidden bg-[var(--color-paper)]`}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-30"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
                  {p.kicker}
                </span>
                <span
                  className="font-display text-xl tracking-tight"
                >
                  <span className="display-italic">{p.label}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
