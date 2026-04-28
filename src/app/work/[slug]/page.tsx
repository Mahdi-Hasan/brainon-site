import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORK } from "@/content/site";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Blueprint, NodesGraph, PulseRing, StackedBars, OrbitGrid } from "@/components/art/SvgArt";

const SECTOR_ART: Record<string, typeof Blueprint> = {
  Fintech: StackedBars,
  Healthcare: PulseRing,
  Logistics: NodesGraph,
  Security: OrbitGrid,
  Education: Blueprint,
};

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.client} — ${item.title}`,
    description: item.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  const idx = WORK.findIndex((w) => w.slug === slug);
  const next = WORK[(idx + 1) % WORK.length];

  return (
    <>
      <PageHeader
        eyebrow={`Case · ${item.sector} · ${item.year}`}
        title={item.title.split(" ").slice(0, -1).join(" ")}
        italicTail={item.title.split(" ").slice(-1)[0]}
        intro={item.summary}
        meta={[
          { label: "Client", value: item.client },
          { label: "Year", value: item.year },
          { label: "Sector", value: item.sector },
          { label: item.metric.label, value: item.metric.value },
        ]}
      />

      <section className="container-page pb-32">
        <figure
          className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-paper)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, color-mix(in oklab, var(--color-ink) 5%, transparent) 0 1px, transparent 1px 28px)",
          }}
        >
          <span aria-hidden className="absolute inset-0 flex items-center justify-center text-[var(--color-cobalt)]">
            {(() => {
              const Art = SECTOR_ART[item.sector] ?? OrbitGrid;
              return <Art className="h-[80%] w-[80%] opacity-90" />;
            })()}
          </span>
          <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
            <span>Fig. 01 · {item.sector} system overview</span>
            <span>{item.client} · {item.year}</span>
          </figcaption>
        </figure>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
              <span className="display-italic">The brief.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[var(--text-lg)] leading-[1.5] text-[var(--color-ink)]/75">
              {item.summary} We embedded a 6-person pod for a 14-week engagement, working alongside the {item.client} platform team in their codebase.
            </p>
            <h2 className="mt-16 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
              <span className="display-italic">What we shipped.</span>
            </h2>
            <ul className="mt-6 space-y-3 font-mono text-sm">
              {[
                "Architecture review and risk register",
                "Design tokens + component library",
                "End-to-end test harness with 87% coverage",
                "Production rollout with feature flags and canaries",
                "Runbooks, ADRs, observability dashboards",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span aria-hidden style={{ color: "var(--color-cobalt)" }}>◇</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <aside className="md:col-span-4 md:col-start-9 self-start space-y-10 border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pt-8 font-mono text-sm">
            <div>
              <p className="eyebrow mb-3">Stack</p>
              <p className="leading-7">TypeScript · Go · Postgres · Temporal · Vercel</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Team</p>
              <p className="leading-7">2 design · 3 engineering · 1 PM</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Outcome</p>
              <p className="leading-7">{item.metric.label} {item.metric.value}</p>
            </div>
          </aside>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="eyebrow mb-3">Next case</p>
            <Link href={`/work/${next.slug}`} className="group block">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fog)]">
                {next.client} · {next.sector}
              </p>
              <h3 className="mt-2 font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.95 }}>
                <span className="display-heavy">{next.title}</span>{" "}
                <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
              </h3>
            </Link>
          </div>
          <div className="md:col-span-3 md:col-start-10 text-right">
            <Link href="/#work" className="btn-pill" data-variant="ghost">
              All work
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
