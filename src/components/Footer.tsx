import Link from "next/link";
import { SITE } from "@/content/site";
import { OrbitGrid } from "@/components/art/SvgArt";
import { WaveLine, HexNode, Constellation } from "@/components/art/MoreSvgArt";

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] bg-[var(--color-bone)] pt-24">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[60vh] w-[60vh] text-[var(--color-cobalt)] opacity-20 anim-spin-slower"
      >
        <OrbitGrid className="h-full w-full" />
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-12 size-12 text-[var(--color-cobalt)] opacity-60 anim-drift-y"
      >
        <HexNode className="h-full w-full" />
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute left-[40%] top-32 hidden h-20 w-48 text-[var(--color-ink)] opacity-25 anim-drift-x md:block"
      >
        <Constellation className="h-full w-full" />
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-12 text-[var(--color-cobalt)] opacity-30"
      >
        <WaveLine className="h-full w-full" preserveAspectRatio="none" />
      </span>

      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] tracking-[-0.04em]">
              <span className="display-italic">Have a hard problem?</span>{" "}
              <span className="display-heavy">We like those.</span>
            </p>
            <Link href="/#contact" className="btn-pill mt-10">
              Start a project
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-6">Studio</p>
            <ul className="flex flex-col gap-2 font-mono text-sm">
              {SITE.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href.startsWith("#") ? "/" + n.href : n.href} className="transition-opacity hover:opacity-70">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-6">Elsewhere</p>
            <ul className="flex flex-col gap-2 font-mono text-sm">
              <li>
                <a href={SITE.social.linkedin} className="transition-opacity hover:opacity-70">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={SITE.social.github} className="transition-opacity hover:opacity-70">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={SITE.social.x} className="transition-opacity hover:opacity-70">
                  X / Twitter ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-opacity hover:opacity-70">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="font-display display-heavy select-none pb-4 text-[clamp(5rem,22vw,18rem)] leading-[0.85] tracking-[-0.06em]"
          style={{
            background: "linear-gradient(180deg, var(--color-ink) 0%, color-mix(in oklab, var(--color-ink) 15%, transparent) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          BRAINON
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] py-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
          <span>© MMXXVI · BrainOn Studio</span>
          <span>Built in our studio · Shipped on Vercel</span>
        </div>
      </div>
    </footer>
  );
}
