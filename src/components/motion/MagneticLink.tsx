"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useRef, type ComponentPropsWithoutRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { scrollToTarget } from "@/lib/lenis-store";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  pull?: number;
  className?: string;
};

export function MagneticLink({ children, pull = 18, className, onClick, href, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    x.set(dx * pull);
    y.set(dy * pull);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = typeof href === "string" ? href : href?.toString() ?? "";
    if (target.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/" + target);
      } else {
        scrollToTarget(target);
        history.replaceState(null, "", target);
      }
    }
    onClick?.(e);
  }

  return (
    <motion.span
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link ref={ref} href={href} onClick={handleClick} className={className} {...rest}>
        {children}
      </Link>
    </motion.span>
  );
}
