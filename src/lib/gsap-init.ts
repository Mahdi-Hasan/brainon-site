"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function ensureGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({
    ease: "expo.out",
    duration: 0.9,
  });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };
