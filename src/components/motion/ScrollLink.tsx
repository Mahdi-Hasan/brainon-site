"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { scrollToTarget } from "@/lib/lenis-store";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  offset?: number;
  duration?: number;
};

export function ScrollLink({ href, onClick, offset, duration, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const target = typeof href === "string" ? href : href.toString();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (target.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        // Need to land on home first, then scroll. Use replace so back stack stays clean.
        router.push("/" + target);
        // After navigation, the home page mount effect handles initial-hash scroll.
      } else {
        scrollToTarget(target, { offset, duration });
        // Reflect in URL without jumping
        history.replaceState(null, "", target);
      }
      onClick?.(e);
      return;
    }
    onClick?.(e);
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
