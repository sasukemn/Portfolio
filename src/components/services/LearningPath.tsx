"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { useSectionActive } from "@/components/ui/useSectionActive";
import { LEARNING_PATH, type StatusState } from "@/lib/siteConfig";
import { SKILLS, type SkillCategory } from "@/lib/data/skills";

const STATE_COLOR: Record<StatusState, { dot: string; text: string; chip: string }> = {
  active: { dot: "bg-success", text: "text-success", chip: "border-success/40 text-success" },
  learning: { dot: "bg-copper", text: "text-copper", chip: "border-copper/40 text-copper" },
  future: { dot: "bg-violet", text: "text-violet", chip: "border-violet/40 text-violet" },
};

const STAGE_LABEL: Record<StatusState, string> = {
  active: "pratiqué",
  learning: "en apprentissage",
  future: "direction",
};

const STAGE_CATEGORY: Record<string, SkillCategory> = {
  software: "software",
  networking: "networking",
  systems: "systems",
  infrastructure: "infrastructure",
  devops: "devops",
  cloud: "devops",
};

export function LearningPath() {
  const { ref, active } = useSectionActive<HTMLDivElement>();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const stepVar = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <Section
      id="learning"
      index="04"
      service="learning path"
      tag="roadmap"
      title="Learning"
      subtitle="La trajectoire que je suis, étape par étape. Chaque palier s'appuie sur le précédent — du développement vers les systèmes, les réseaux, puis l'infrastructure, le DevOps et le Cloud. Statut honnête à chaque niveau."
    >
      <p className="mb-8 max-w-3xl font-mono text-sm text-ice">
        <span className="mr-2 text-copper">❯</span>
        <TextReveal text="Currently learning how software becomes infrastructure." speed={38} />
      </p>

      <div ref={ref}>
        <p className="mb-8 max-w-3xl font-mono text-sm text-ice">
          <span className="mr-2 text-copper">❯</span>
          <TextReveal text="Currently learning how software becomes infrastructure." speed={38} />
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          animate={active ? "show" : "hidden"}
          className="relative mx-auto max-w-3xl"
        >
          <div className="absolute left-4 top-2 bottom-2 w-px bg-line-soft" />

          <div className="space-y-10">
            {LEARNING_PATH.map((step, i) => {
              const st = STATE_COLOR[step.state];
              const cat = STAGE_CATEGORY[step.key];
              const chips = SKILLS.filter((s) => s.category === cat).map((s) => s.name);
              const isFuture = step.state === "future";
              return (
                <motion.div
                  key={step.key}
                  variants={stepVar}
                  className="relative pl-14"
                >
                <div className="absolute left-4 top-1.5 -translate-x-1/2">
                  <span className={`relative flex h-4 w-4 ${isFuture ? "opacity-60" : ""}`}>
                    <span className={`absolute inline-flex h-full w-full rounded-full ${st.dot} opacity-40`} />
                    <span className={`relative inline-flex h-4 w-4 rounded-full ${st.dot}`} />
                  </span>
                </div>

                <div className="panel lift p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs tabular-nums text-ink-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-sans text-xl font-semibold tracking-tight text-ink">
                        {step.label}
                      </h3>
                    </div>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${st.chip}`}
                    >
                      {STAGE_LABEL[step.state]}
                    </span>
                  </div>

                  <p className={`mt-2 text-sm leading-relaxed ${st.text}`}>{step.note}</p>

                  {chips.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {chips.map((c) => (
                        <span
                          key={c}
                          className="rounded border border-line-soft bg-surface/30 px-2 py-0.5 font-mono text-[10px] text-ink-dim"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
