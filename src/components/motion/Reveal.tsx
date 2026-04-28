"use client";

import { motion, type Variants } from "motion/react";
import { fadeUp, inViewProps } from "@/lib/motion-variants";
import type { ComponentPropsWithoutRef } from "react";

type RevealProps = ComponentPropsWithoutRef<typeof motion.div> & {
  variants?: Variants;
  delay?: number;
};

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      variants={variants}
      transition={{ delay }}
      {...inViewProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
