"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ensureGsap } from "@/lib/gsap-init";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  start?: string;
  delay?: number;
};

export function SplitChars({ children, as = "h2", className, start = "top 80%", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const isReduce = ctx.conditions?.reduce;
          if (isReduce) {
            gsap.set(el, { opacity: 1 });
            return;
          }
          const split = new SplitText(el, { type: "chars,words", charsClass: "char-anim" });
          gsap.set(split.chars, { yPercent: 110, opacity: 0 });
          gsap.to(split.chars, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.018,
            duration: 1.1,
            ease: "expo.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
            },
          });
          return () => {
            split.revert();
          };
        }
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies: [children, start, delay] }
  );

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{ overflow: "hidden", display: "block" }}
    >
      {children}
    </Tag>
  );
}
