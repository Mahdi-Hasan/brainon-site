"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { Floaters, ContactCTAFloaters, OrbitBadge } from "@/components/art/Floaters";

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cta-line]", {
          yPercent: 110,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
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
      className="relative isolate overflow-hidden bg-[var(--color-cobalt)] text-[var(--color-cobalt-fg)]"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <span
        aria-hidden
        className="absolute -right-32 -top-40 h-[55vh] w-[55vh] rounded-full anim-drift-orbit"
        style={{
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--color-cobalt-fg) 25%, transparent), transparent 70%)",
        }}
      />

      <Floaters floaters={ContactCTAFloaters} />

      <span
        aria-hidden
        className="pointer-events-none absolute right-[var(--spacing-margin)] top-[var(--spacing-section)] hidden text-[var(--color-cobalt-fg)] md:block"
      >
        <OrbitBadge label="Let's·talk · " />
      </span>

      <div className="container-page relative">
        <p className="eyebrow mb-12" style={{ color: "color-mix(in oklab, var(--color-cobalt-fg) 70%, transparent)" }}>
          Currently accepting two engagements for Q3 2026
        </p>

        <h2
          className="font-display tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 12vw, 11rem)", lineHeight: 0.86 }}
        >
          <span data-cta-line className="block overflow-hidden">
            <span className="display-italic">Let&apos;s build</span>
          </span>
          <span data-cta-line className="block overflow-hidden">
            <span className="display-heavy">something</span>
          </span>
          <span data-cta-line className="block overflow-hidden">
            <span className="display-heavy">that ships.</span>
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <p className="md:col-span-6 max-w-md text-[var(--text-lg)] leading-[1.45]">
            Tell us what you&apos;re building. We&apos;ll send back a 2-page memo within 72 hours: scope, team, timeline, price.
          </p>
          <div className="md:col-span-6 flex flex-wrap gap-4 md:justify-end">
            <MagneticLink href="#contact" className="btn-pill" style={{ background: "var(--color-ink)", color: "var(--color-bone)" }}>
              Start a project
              <span aria-hidden>→</span>
            </MagneticLink>
            <MagneticLink href="mailto:hello@brainon.studio" className="btn-pill" data-variant="ghost" style={{ borderColor: "var(--color-cobalt-fg)", color: "var(--color-cobalt-fg)" }} pull={10}>
              hello@brainon.studio
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
