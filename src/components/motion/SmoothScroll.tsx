"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ensureGsap, ScrollTrigger, gsap } from "@/lib/gsap-init";
import { setLenis, scrollToTarget } from "@/lib/lenis-store";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ensureGsap();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduced ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      lerp: reduced ? 1 : 0.1,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // If page loaded with a hash, scroll to it once layout settles
    if (window.location.hash) {
      const hash = window.location.hash;
      const settle = () => {
        const el = document.querySelector(hash);
        if (el) scrollToTarget(hash);
      };
      // Wait two RAFs so SSR/Lenis are ready
      requestAnimationFrame(() => requestAnimationFrame(settle));
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
