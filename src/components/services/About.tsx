"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useSite } from "@/lib/site";
import { IDENTITY, EDUCATION, STATUS_ROW } from "@/lib/siteConfig";
import type { StatusState } from "@/lib/siteConfig";
import { Magnetic } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/TextReveal";
import { useSectionActive } from "@/components/ui/useSectionActive";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATUS_STYLE: Record<StatusState, { dot: string; text: string }> = {
  active: { dot: "bg-success", text: "text-success" },
  learning: { dot: "bg-copper", text: "text-copper" },
  future: { dot: "bg-violet", text: "text-violet" },
};

const POSITIONING = [
  { n: "01", label: "Systems / Networking" },
  { n: "02", label: "Infrastructure / Software" },
];

const DELAY = {
  kicker: 0.1,
  name: 0.22,
  positioning: 0.36,
  photo: 0.5,
  description: 0.66,
  metadata: 0.82,
  cta: 0.96,
};

export function About() {
  const { booted } = useSite();
  const reduced = useReducedMotion() === true;
  const { ref, active } = useSectionActive<HTMLElement>();
  const show = reduced || (booted && active);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const reveal = (delay: number) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 26, filter: "blur(6px)" },
          animate: show
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 26, filter: "blur(6px)" },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-24 px-5 md:px-10 lg:px-16 pt-28 pb-24 lg:pt-36 lg:pb-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs tracking-[0.25em] uppercase text-ink-dim"
        >
          <span className="flex items-center gap-3">
            <span className="text-ice">00</span>
            <span className="text-copper">{"//"}</span>
            <span>profile · identity</span>
            <span className="hidden sm:inline text-ink-dim/50">· editorial</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            <span className="text-success">available</span>
          </span>
        </motion.header>

        <div className="relative mt-10 lg:mt-16">
          <div className="relative z-10 lg:max-w-[60%]">
            <motion.div
              {...reveal(DELAY.kicker)}
              className="flex items-center gap-4 font-mono text-sm uppercase tracking-[0.3em] text-ice"
            >
              <span className="h-px w-10 bg-ice/60" aria-hidden />
              {IDENTITY.role}
            </motion.div>

            <motion.h1
              {...reveal(DELAY.name)}
              className="mt-6 font-sans text-[clamp(2rem,6vw,4.4rem)] font-semibold uppercase leading-[1.02] tracking-tight text-ink whitespace-nowrap [word-spacing:0.35em]"
            >
              <span className="text-gradient-ice">{IDENTITY.lastName}</span>
              <br />
              <span>{IDENTITY.firstName}</span>
            </motion.h1>
          </div>

          <motion.figure
            {...reveal(DELAY.photo)}
            className="relative z-10 mt-12 max-w-[280px] sm:max-w-[320px] lg:absolute lg:right-0 lg:top-[8rem] lg:mt-0 lg:max-w-none lg:w-[min(300px,30vw)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-5 -top-5 hidden aspect-[4/5] w-full rounded-2xl border border-ice/25 lg:block"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1.5 -top-1.5 z-10 h-3 w-3 border-l-2 border-t-2 border-ice"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1.5 -top-1.5 z-10 h-3 w-3 border-r-2 border-t-2 border-ice"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-1.5 -left-1.5 z-10 h-3 w-3 border-b-2 border-l-2 border-ice"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-1.5 -right-1.5 z-10 h-3 w-3 border-b-2 border-r-2 border-ice"
            />

            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line-soft bg-surface-2 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-300 group-hover:border-ice/40">
              <Image
                src="/profil.jpeg"
                alt={`Portrait de ${IDENTITY.displayName}`}
                width={942}
                height={1670}
                priority
                sizes="(max-width: 1024px) 80vw, 300px"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ice/0 via-ice/0 to-ice/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/50 to-transparent"
              />
            </div>

            <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              <span className="min-w-0 truncate">
                <span className="text-copper">fig.01</span> · {IDENTITY.displayName}
              </span>
              <span className="shrink-0 text-ice">{IDENTITY.location.split(",")[0]}</span>
            </figcaption>
          </motion.figure>

          <div className="relative z-10 lg:max-w-[60%]">
            <motion.div {...reveal(DELAY.positioning)} className="mt-8 flex flex-col gap-3 font-mono lg:mt-12">
              {POSITIONING.map((p) => (
                <span key={p.n} className="flex items-center gap-3 text-base uppercase tracking-[0.2em]">
                  <span className="text-[10px] tabular-nums text-copper">{p.n}</span>
                  <span className="h-px w-8 bg-line-soft" aria-hidden />
                  <span className="text-ink">{p.label}</span>
                </span>
              ))}
            </motion.div>

            <motion.p
              {...reveal(DELAY.description)}
              className="mt-9 max-w-[52ch] text-lg font-medium leading-relaxed text-ice lg:mt-10"
            >
              <TextReveal text={IDENTITY.presentation} speed={40} />
            </motion.p>
          </div>

          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M 190 250 C 420 210, 640 250, 880 300"
              fill="none"
              stroke="var(--ice)"
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="3 8"
              vectorEffect="non-scaling-stroke"
              className="animate-dash-flow"
            />
            <path
              d="M 880 440 C 860 515, 845 560, 835 615"
              fill="none"
              stroke="var(--ice)"
              strokeOpacity="0.2"
              strokeWidth="1"
              strokeDasharray="3 8"
              vectorEffect="non-scaling-stroke"
              className="animate-dash-flow"
            />
            <path
              d="M 120 390 L 120 510"
              fill="none"
              stroke="var(--ice)"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="3 8"
              vectorEffect="non-scaling-stroke"
              className="animate-dash-flow"
            />
            <circle cx="190" cy="250" r="3" fill="var(--ice)" fillOpacity="0.45" />
            <circle cx="880" cy="300" r="3" fill="var(--ice)" fillOpacity="0.45" />
            <circle cx="880" cy="440" r="3" fill="var(--ice)" fillOpacity="0.45" />
            <circle cx="835" cy="615" r="3" fill="var(--ice)" fillOpacity="0.45" />
            <circle cx="120" cy="510" r="3" fill="var(--ice)" fillOpacity="0.45" />
          </svg>
        </div>

        <motion.div
          {...reveal(DELAY.metadata)}
          className="mt-20 grid gap-10 border-t border-line-soft pt-8 md:grid-cols-2 lg:mt-28 lg:grid-cols-3"
        >
          <div>
            <div className="eng-note text-copper">education</div>
            <div className="mt-3 text-lg font-semibold leading-tight text-ink">
              {EDUCATION.abbreviation} · {EDUCATION.program} · {EDUCATION.level}
            </div>
            <div className="mt-1 font-mono text-xs text-ink-dim">{EDUCATION.city}</div>
          </div>
          <div>
            <div className="eng-note text-copper">location</div>
            <div className="mt-3 text-lg font-semibold leading-tight text-ink">{IDENTITY.location}</div>
            <div className="mt-1 font-mono text-xs text-ink-dim">-21.4527 / 47.0857</div>
          </div>
          <div>
            <div className="eng-note text-copper">direction</div>
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
              {STATUS_ROW.map((t, i) => (
                <span key={t.label} className="flex items-center gap-1.5 font-mono text-xs text-ink-dim">
                  {i > 0 && <span className="text-ink-dim/40">→</span>}
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLE[t.state].dot}`} />
                  <span className={STATUS_STYLE[t.state].text}>{t.label}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal(DELAY.cta)} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button onClick={() => go("projects")} className="btn btn-copper group">
              voir mes projets
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={() => go("contact")} className="btn btn-secondary">
              me contacter
            </button>
          </Magnetic>
          <span className="ml-auto hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-dim lg:flex">
            <span className="animate-float-y">scroll</span>
            <span aria-hidden>↓</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
