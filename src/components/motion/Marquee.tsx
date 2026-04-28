"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsap } from "@/lib/gsap-init";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
};

export function Marquee({ children, speed = 60, reverse = false, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsap();
  }, []);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const distance = track.scrollWidth / 2;
      const duration = distance / speed;

      gsap.to(track, {
        x: reverse ? distance : -distance,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: string) => parseFloat(x) % distance),
        },
      });
    },
    { scope: wrapRef, dependencies: [speed, reverse] }
  );

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden whitespace-nowrap", className)}
      aria-hidden
    >
      <div ref={trackRef} className="inline-flex w-max gap-12 will-change-transform">
        <div className="inline-flex gap-12">{children}</div>
        <div className="inline-flex gap-12">{children}</div>
      </div>
    </div>
  );
}
