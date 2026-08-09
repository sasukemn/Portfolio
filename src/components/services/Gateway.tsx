"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { SERVICES, useSite } from "@/lib/site";
import { IDENTITY, CONTACT } from "@/lib/siteConfig";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "lab", label: "Lab" },
  { id: "learning", label: "Learning" },
  { id: "contact", label: "Contact" },
];

export function Gateway() {
  const { active, setActive, theme, toggleTheme, booted } = useSite();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id as (typeof SERVICES)[number]["id"];
            if (SERVICES.some((s) => s.id === id)) setActive(id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const s of SERVICES) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [setActive]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={booted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-night/85 backdrop-blur-md border-b border-line-soft shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => go("about")}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-ink"
            aria-label="Back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded border border-ice/40 bg-ice/5 font-mono text-[10px] font-semibold text-ice transition-colors group-hover:bg-ice/15">
              {IDENTITY.monogram}
            </span>
            <span className="transition-colors group-hover:text-ice">northstack</span>
            <span className="hidden sm:inline text-ink-dim">/</span>
            <span className="hidden sm:inline text-ink-dim">{IDENTITY.lastName.toLowerCase()}</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className={`relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-ice" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-ice"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
              available
            </span>
            <a
              href={CONTACT.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded border border-line-soft text-ink-dim transition-colors hover:border-ice/50 hover:text-ice"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded border border-line-soft font-mono text-xs text-ink-dim transition-colors hover:border-ice/50 hover:text-ice"
              aria-label="Toggle theme"
              title="Toggle Polar Night / Glacier"
            >
              {theme === "night" ? "◐" : "◑"}
            </button>
            <button
              onClick={() => go("terminal")}
              className="hidden md:flex h-8 items-center px-3 rounded border border-ice/30 font-mono text-[11px] uppercase tracking-widest text-ice transition-all hover:bg-ice/10 hover:border-ice"
              title="Console — fonctionnalité avancée"
              aria-label="Ouvrir la console (terminal)"
            >
              {" >_"} console
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="h-px bg-ice/70 origin-left"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </motion.header>
  );
}
