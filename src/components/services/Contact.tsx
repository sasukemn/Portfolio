"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useSectionActive } from "@/components/ui/useSectionActive";
import { Magnetic } from "@/components/ui/Magnetic";
import { CONTACT, IDENTITY } from "@/lib/siteConfig";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CvSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(CONTACT.cv.items[0]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="btn btn-primary group flex w-full items-center justify-between gap-2"
      >
        <span className="text-xs">télécharger le cv</span>
        <span className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-ice">{selected.label}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-ice transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      {open && (
        <div className="absolute bottom-full mb-2 w-full overflow-hidden rounded border border-line-soft bg-surface shadow-lg">
          {CONTACT.cv.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              download
              onClick={() => {
                setSelected(item);
                setOpen(false);
              }}
              className={`block px-4 py-3 font-mono text-xs ${
                selected.href === item.href
                  ? "bg-surface-2 text-ice"
                  : "text-ink transition-colors hover:bg-surface-2"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Contact() {
  const { ref, active } = useSectionActive<HTMLDivElement>();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const channels = [
    {
      icon: <MailIcon className="h-4 w-4" />,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      available: Boolean(CONTACT.email),
    },
    {
      icon: <LinkedInIcon className="h-4 w-4" />,
      label: "LinkedIn",
      value: "in/sasuke-manitra-niaina",
      href: CONTACT.linkedinUrl,
      available: Boolean(CONTACT.linkedinUrl),
    },
    {
      icon: <GitHubIcon className="h-4 w-4" />,
      label: "GitHub",
      value: "github.com/sasukemn",
      href: CONTACT.githubUrl,
      available: Boolean(CONTACT.github),
    },
    {
      icon: <PhoneIcon className="h-4 w-4" />,
      label: "Téléphone",
      value: CONTACT.phoneDisplay,
      href: CONTACT.phoneHref,
      available: Boolean(CONTACT.phone),
    },
  ];

  return (
    <Section
      id="contact"
      index="07"
      service="gateway"
      tag="contact"
      title="Contact"
      subtitle="Une question, un projet, une opportunité ? Je réponds sur les canaux ci-dessous — uniquement ceux qui existent vraiment."
    >
      <div ref={ref} className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate={active ? "show" : "hidden"}
        >
          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-ink">
            {IDENTITY.firstName} {IDENTITY.lastName}
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl leading-relaxed text-ink-dim">
            Je construis mon chemin vers le DevOps et le Cloud, une étape à la fois. Si vous voulez
            discuter d&apos;un projet, d&apos;un stage ou simplement échanger sur les systèmes et les
            réseaux — un canal ci-dessous est disponible.
          </motion.p>

          <motion.div variants={item} className="mt-6">
            <Magnetic>
              <a
                href={`mailto:${CONTACT.email}`}
                className="btn btn-primary group"
                aria-label={`Écrire à ${CONTACT.email}`}
              >
                get in touch
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={container} className="mt-8 space-y-3">
            {channels.map((c) => {
              const inner = (
                <>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded border ${
                      c.available
                        ? "border-ice/40 text-ice"
                        : "border-line-soft text-ink-dim/50"
                    }`}
                  >
                    {c.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                      {c.label}
                    </span>
                    <span className={`block text-sm ${c.available ? "text-ink" : "text-ink-dim/60"}`}>
                      {c.value}
                    </span>
                  </span>
                  {c.available && <span className="font-mono text-xs text-ice">↗</span>}
                </>
              );
              return c.available ? (
                <motion.a
                  key={c.label}
                  variants={item}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded border border-line-soft bg-surface/30 p-4 transition-colors hover:border-ice/40"
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div
                  key={c.label}
                  variants={item}
                  className="flex items-center gap-4 rounded border border-line-soft bg-surface/20 p-4 opacity-70"
                >
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="panel lift flex flex-col p-6"
        >
          <div className="eng-note text-copper">{"// transmission"}</div>
          <motion.div
            className="mt-3 h-px bg-ice"
            initial={{ scaleX: 0 }}
            animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <div className="mt-4 flex-1 space-y-3 font-mono text-[13px] leading-relaxed">
            <div>
              <span className="text-ink-dim">$ </span>
              <span className="text-ice">status</span>
              <span className="text-ink-dim"> --current</span>
            </div>
            <div className="text-ink">
              <span className="text-success">●</span> disponible pour échanger
            </div>
            <div className="text-ink-dim">
              <span className="text-copper">mode</span> étudiant · projets · lab
            </div>
            <div className="text-ink-dim">
              <span className="text-copper">réponse</span> au téléphone, rapidement
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="pt-2 font-mono text-[11px] uppercase tracking-widest text-success"
            >
              ◈ link established
            </motion.div>
            <div className="mt-2 border-t border-line-soft pt-4 text-[12px] text-ink-dim">
              {CONTACT.note}
            </div>
          </div>
          {CONTACT.cv.available && <CvSelector />}
        </motion.div>
      </div>
    </Section>
  );
}
