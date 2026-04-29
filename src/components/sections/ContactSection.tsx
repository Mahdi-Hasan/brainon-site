"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ensureGsap, SplitText } from "@/lib/gsap-init";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/content/site";
import { Scope, HexNode, WaveLine, CornerBracket } from "@/components/art/MoreSvgArt";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headline = ref.current?.querySelector<HTMLElement>("[data-contact-headline]");
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
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-bone)] scroll-mt-24"
      style={{ paddingBlock: "var(--spacing-section)" }}
    >
      <span aria-hidden className="pointer-events-none absolute right-[5%] top-16 size-24 text-[var(--color-cobalt)] anim-drift-orbit">
        <Scope className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute left-[8%] top-32 size-12 text-[var(--color-ink)]/40 anim-drift-y">
        <HexNode className="h-full w-full" />
      </span>
      <span aria-hidden className="pointer-events-none absolute right-[var(--spacing-margin)] bottom-12 hidden h-10 w-48 text-[var(--color-cobalt)] opacity-40 anim-drift-x md:block">
        <WaveLine className="h-full w-full" preserveAspectRatio="none" />
      </span>
      <span aria-hidden className="pointer-events-none absolute left-[var(--spacing-margin)] bottom-12 size-7 text-[var(--color-ink)]/35">
        <CornerBracket className="h-full w-full" />
      </span>

      <div className="container-page relative">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Contact · Q3 2026 openings</p>
          <h2
            data-contact-headline
            className="md:col-span-9 font-display tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.92 }}
          >
            <span className="display-heavy">Tell us</span>{" "}
            <span className="display-italic" style={{ color: "var(--color-cobalt)" }}>
              what you&apos;re building.
            </span>
          </h2>
        </div>

        <p className="mb-16 max-w-2xl text-[var(--text-lg)] leading-[1.5] text-[var(--color-ink)]/70">
          We respond within 72 hours with a 2-page memo: scope, team, timeline, price. If we&apos;re not the right fit we&apos;ll say so — and tell you who is.
        </p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-4 md:col-start-9 space-y-10 self-stretch border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pt-8 font-mono text-sm">
            <div>
              <p className="eyebrow mb-3">Email</p>
              <a href={`mailto:${SITE.email}`} className="leading-7 hover:opacity-70">
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Hubs</p>
              <p className="leading-7">Dhaka · Berlin · NYC · Singapore · Lagos</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Hours</p>
              <p className="leading-7">Always at least one hub awake.</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Response</p>
              <p className="leading-7">A 2-page memo within 72h, written by the engineer who&apos;d lead the work.</p>
            </div>
            <div>
              <p className="eyebrow mb-3">NDA</p>
              <p className="leading-7">Mutual NDA on request — countersigned within a business day.</p>
            </div>
            <div className="pt-8 border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)]">
              <p className="eyebrow mb-3">Not the right fit?</p>
              <p className="leading-7 text-[var(--color-ink)]/70">
                We&apos;ll point you at three studios who likely are. No referral fees, no warm handoffs we can&apos;t vouch for.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
