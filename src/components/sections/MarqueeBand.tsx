import { Marquee } from "@/components/motion/Marquee";
import { HexNode, CrosshairMark, Scope, ArrowLoop } from "@/components/art/MoreSvgArt";

const ITEMS = [
  { text: "Senior pods", Mark: HexNode },
  { text: "Outcome over output", Mark: CrosshairMark },
  { text: "Design as code", Mark: Scope },
  { text: "Ship loudly", Mark: ArrowLoop },
  { text: "Operate cheaply", Mark: HexNode },
  { text: "Eval-driven AI", Mark: CrosshairMark },
  { text: "Boring infra · loud surfaces", Mark: Scope },
  { text: "Documented as we go", Mark: ArrowLoop },
];

export function MarqueeBand() {
  return (
    <section className="relative border-y border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] py-8">
      <Marquee speed={40}>
        {ITEMS.map((item, i) => {
          const { Mark } = item;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-12 font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.03em]"
            >
              <span className={i % 2 === 0 ? "display-heavy" : "display-italic"}>{item.text}</span>
              <span
                aria-hidden
                className="anim-spin-slow inline-block size-9 text-[var(--color-cobalt)]"
              >
                <Mark className="h-full w-full" />
              </span>
            </span>
          );
        })}
      </Marquee>
    </section>
  );
}
