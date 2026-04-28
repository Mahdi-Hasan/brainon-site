"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(target: string | HTMLElement, opts: { offset?: number; duration?: number } = {}) {
  const lenis = getLenis();
  const offset = opts.offset ?? -80;
  const duration = opts.duration ?? 1.2;

  if (!lenis) {
    if (typeof target === "string") {
      const el = document.querySelector(target) as HTMLElement | null;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    return;
  }

  lenis.scrollTo(target, { offset, duration });
}
