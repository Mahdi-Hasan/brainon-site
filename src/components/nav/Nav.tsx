"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { scrollToTarget } from "@/lib/lenis-store";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section detection via IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = SITE.nav.map((n) => n.href).filter((h) => h.startsWith("#")).map((h) => h.slice(1));
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHash("#" + visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = () => setOpen(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }
    scrollToTarget(href);
    history.replaceState(null, "", href);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background] duration-500",
          scrolled ? "py-3" : "py-6"
        )}
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--color-bone) 82%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <div className="container-page flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="BrainOn — home"
            className="group inline-flex items-center gap-3"
          >
            {/* Mark only on mobile, full lockup on md+ */}
            <Image
              src="/brand/brainon-mark.png"
              alt=""
              aria-hidden
              width={64}
              height={64}
              priority
              className="block size-9 transition-transform duration-500 group-hover:rotate-[-8deg] md:hidden"
            />
            <Image
              src="/brand/brainon-logo.png"
              alt="BrainOn"
              width={1200}
              height={600}
              priority
              className="hidden h-9 w-auto md:block"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {SITE.nav.map((item) => {
              const active = item.href === activeHash;
              return (
                <a
                  key={item.href}
                  href={pathname === "/" ? item.href : "/" + item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]"
                  style={{ color: active ? "var(--color-ink)" : "var(--color-fog)" }}
                >
                  <span className="relative z-10 transition-colors group-hover:text-[var(--color-ink)]">
                    {item.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-0 rounded-full"
                      style={{ backgroundColor: "color-mix(in oklab, var(--color-ink) 8%, transparent)" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticLink href="#contact" className="hidden btn-pill md:inline-flex" pull={10}>
              Start a project
              <span aria-hidden>→</span>
            </MagneticLink>
            <button
              type="button"
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-bone)]">
                <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
                  <path
                    d={open ? "M2 2 L16 10 M16 2 L2 10" : "M2 2 H16 M2 10 H16"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--color-ink)] text-[var(--color-bone)] md:hidden"
          >
            <div className="container-page flex h-full flex-col justify-between pb-12 pt-28">
              <ul className="flex flex-col gap-2">
                {SITE.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                  >
                    <a
                      href={pathname === "/" ? item.href : "/" + item.href}
                      onClick={(e) => {
                        closeMenu();
                        handleNavClick(e, item.href);
                      }}
                      className="group flex items-baseline justify-between border-t border-white/10 py-6 font-display"
                      style={{ fontSize: "clamp(2.5rem, 12vw, 5rem)" }}
                    >
                      <span className="display-heavy">{item.label}</span>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-end justify-between gap-6">
                <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  <span>{SITE.email}</span>
                  <span>© BrainOn Studio · MMXXVI</span>
                </div>
                <Image
                  src="/brand/brainon-mark.png"
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="size-20 anim-drift-y"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
