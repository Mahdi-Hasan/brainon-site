"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap, SplitText } from "@/lib/gsap-init";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { OrbitGrid, AsymmetricMark } from "@/components/art/SvgArt";
import { Floaters, HeroFloaters, OrbitBadge } from "@/components/art/Floaters";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yMark = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const oMark = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useGSAP(
    () => {
      ensureGsap();
      const el = headlineRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
        },
        () => {
          const lines = el.querySelectorAll<HTMLElement>("[data-line]");
          const splits = Array.from(lines).map((line) => new SplitText(line, { type: "chars" }));
          const allChars = splits.flatMap((s) => s.chars);

          gsap.set(allChars, { yPercent: 110, opacity: 0 });
          gsap
            .timeline({ delay: 0.2 })
            .to(allChars, {
              yPercent: 0,
              opacity: 1,
              duration: 1.4,
              ease: "expo.out",
              stagger: 0.012,
            })
            .from(
              "[data-hero-eyebrow]",
              { opacity: 0, y: 20, duration: 0.9, ease: "expo.out" },
              "-=1.0"
            )
            .from(
              "[data-hero-meta]",
              { opacity: 0, y: 24, duration: 0.9, ease: "expo.out", stagger: 0.08 },
              "-=0.7"
            )
            .from(
              "[data-hero-cta]",
              { opacity: 0, y: 24, duration: 0.9, ease: "expo.out" },
              "-=0.6"
            );

          return () => {
            splits.forEach((s) => s.revert());
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32"
    >
      {/* Background accent SVG — orbits around the headline (parallax + slow spin) */}
      <motion.span
        aria-hidden
        style={{ y: reduce ? 0 : yMark }}
        className="pointer-events-none absolute -right-[10vw] top-[8vh] z-[-1] h-[80vh] w-[80vh] text-[var(--color-cobalt)] opacity-70"
      >
        <span className="anim-spin-slower block h-full w-full">
          <OrbitGrid className="h-full w-full" />
        </span>
      </motion.span>

      <span
        aria-hidden
        className="pointer-events-none absolute left-[6vw] top-[28vh] z-[-1] hidden h-32 w-32 text-[var(--color-ink)] opacity-15 md:block anim-drift-diag"
      >
        <AsymmetricMark className="h-full w-full" />
      </span>

      {/* Ambient drifting marks */}
      <Floaters floaters={HeroFloaters} className="z-[-1]" />

      {/* Orbiting "available" badge — top-right of hero, on top */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[var(--spacing-margin)] top-[14vh] hidden text-[var(--color-cobalt)] md:block"
      >
        <OrbitBadge label="Q3·2026·Open · " />
      </span>

      <div className="container-page relative">
        <div data-hero-eyebrow className="eyebrow mb-10">
          BrainOn Studio · MMXXVI · Established practice
        </div>

        <h1
          ref={headlineRef}
          className="font-display tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 12vw, 13rem)", lineHeight: 0.86 }}
        >
          <span data-line className="block overflow-hidden">
            <span className="display-italic" style={{ color: "var(--color-cobalt)" }}>
              Software
            </span>{" "}
            <span className="display-heavy">studios</span>
          </span>
          <span data-line className="block overflow-hidden">
            <span className="display-heavy">for compounding</span>
          </span>
          <span data-line className="block overflow-hidden">
            <span className="display-italic">teams.</span>
          </span>
        </h1>

        <div className="mt-16 grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <p
            data-hero-meta
            className="md:col-span-5 md:col-start-1 max-w-md text-[var(--text-lg)] leading-[1.45] text-[var(--color-ink)]/70"
          >
            We design, ship, and scale category-defining software with senior pods that take ownership of an outcome — discovery to deployment.
          </p>

          <div data-hero-meta className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-3">Practice</p>
            <ul className="font-mono text-sm leading-7">
              <li>Product engineering</li>
              <li>Design systems</li>
              <li>AI integration</li>
              <li>Platform & DX</li>
            </ul>
          </div>

          <div data-hero-cta className="flex flex-col items-start gap-3 md:col-span-3 md:col-start-10">
            <MagneticLink href="#contact" className="btn-pill">
              Start a project
              <span aria-hidden>→</span>
            </MagneticLink>
            <MagneticLink href="#work" className="btn-pill" data-variant="ghost" pull={10}>
              See selected work
              <span aria-hidden>↘</span>
            </MagneticLink>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ y: reduce ? 0 : yMark, opacity: reduce ? 1 : oMark }}
          className="pointer-events-none absolute inset-x-0 -bottom-6 z-[-1] flex justify-end"
        >
          <span
            className="font-display select-none text-[clamp(8rem,28vw,28rem)] leading-[0.8]"
            style={{
              color: "color-mix(in oklab, var(--color-ink) 6%, transparent)",
              fontVariationSettings: '"opsz" 144, "SOFT" 0, "wght" 900',
              letterSpacing: "-0.06em",
            }}
          >
            B/On.
          </span>
        </motion.div>

        <div data-hero-meta className="mt-20 flex items-center justify-between border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pb-10 pt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
          <span>Scroll to explore</span>
          <span className="hidden md:inline">↓ 01 of 06</span>
          <span>Operating since 2017</span>
        </div>
      </div>
    </section>
  );
}
