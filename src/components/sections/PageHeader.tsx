"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap, SplitText } from "@/lib/gsap-init";
import { CornerBracket, HexNode, Scope, WaveLine } from "@/components/art/MoreSvgArt";

type Props = {
  eyebrow: string;
  title: string;
  italicTail?: string;
  intro?: string;
  meta?: { label: string; value: string }[];
};

export function PageHeader({ eyebrow, title, italicTail, intro, meta }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headline = ref.current?.querySelector<HTMLElement>("[data-page-headline]");
        if (!headline) return;
        const split = new SplitText(headline, { type: "chars,words" });
        gsap.set(split.chars, { yPercent: 110, opacity: 0 });
        gsap
          .timeline({ delay: 0.15 })
          .from("[data-page-eyebrow]", { y: 24, opacity: 0, duration: 0.9, ease: "expo.out" })
          .to(
            split.chars,
            { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.014 },
            "-=0.6"
          )
          .from("[data-page-intro]", { y: 24, opacity: 0, duration: 0.9, ease: "expo.out" }, "-=0.7")
          .from(
            "[data-page-meta]",
            { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 },
            "-=0.6"
          );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="container-page relative overflow-hidden pt-40 pb-24 md:pt-56 md:pb-32">
      <span aria-hidden className="pointer-events-none absolute right-[var(--spacing-margin)] top-32 hidden size-16 text-[var(--color-cobalt)] anim-drift-orbit md:block">
        <Scope className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute left-[var(--spacing-margin)] bottom-12 size-10 text-[var(--color-ink)]/30 anim-drift-y">
        <HexNode className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute left-[var(--spacing-margin)] top-32 size-7 text-[var(--color-ink)]/40">
        <CornerBracket className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute right-[var(--spacing-margin)] bottom-12 hidden h-10 w-48 text-[var(--color-cobalt)] opacity-50 anim-drift-x md:block">
        <WaveLine className="h-full w-full" preserveAspectRatio="none" />
      </span>

      <p data-page-eyebrow className="eyebrow mb-10 relative">
        {eyebrow}
      </p>
      <h1
        data-page-headline
        className="font-display tracking-[-0.04em]"
        style={{ fontSize: "clamp(2.75rem, 10vw, 9rem)", lineHeight: 0.9 }}
      >
        <span className="display-heavy">{title}</span>
        {italicTail && (
          <>
            {" "}
            <span className="display-italic" style={{ color: "var(--color-cobalt)" }}>
              {italicTail}
            </span>
          </>
        )}
      </h1>
      {(intro || meta) && (
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          {intro && (
            <p
              data-page-intro
              className="md:col-span-6 max-w-xl text-[var(--text-lg)] leading-[1.45] text-[var(--color-ink)]/70"
            >
              {intro}
            </p>
          )}
          {meta && (
            <dl
              className="md:col-span-5 md:col-start-8 grid grid-cols-2 gap-6 self-end"
            >
              {meta.map((m) => (
                <div key={m.label} data-page-meta>
                  <dt className="eyebrow mb-2">{m.label}</dt>
                  <dd className="font-display text-2xl tracking-tight">
                    <span className="display-heavy">{m.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </section>
  );
}
