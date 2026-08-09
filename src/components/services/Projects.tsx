"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { useSectionActive } from "@/components/ui/useSectionActive";
import { PROJECTS, PROJECT_STORY_HEADINGS, type Project, type ProjectKind } from "@/lib/data/projects";
import { ProjectFlow } from "@/components/visuals/ProjectFlow";
import { RouterTopology } from "@/components/visuals/RouterTopology";
import { SecureNet } from "@/components/visuals/SecureNet";

const KIND_LABEL: Record<ProjectKind, string> = {
  web: "web",
  desktop: "desktop",
  network: "réseau",
  infrastructure: "infrastructure",
  security: "sécurité",
};

const KIND_COLOR: Record<ProjectKind, string> = {
  web: "#67e8f9",
  desktop: "#60a5fa",
  network: "#ff7043",
  infrastructure: "#94a3b8",
  security: "#f87171",
};

function Visual({ project }: { project: Project }) {
  if (project.visual === "router-topology") return <RouterTopology />;
  if (project.visual === "secure-net") return <SecureNet />;
  return <ProjectFlow flow={project.flow} />;
}

function StoryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eng-note text-copper">{`// ${title.toLowerCase()}`}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-sm leading-relaxed text-ink-dim">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function ProjectView({ project, active }: { project: Project; active: boolean }) {
  const [open, setOpen] = useState(true);
  const inProgress = project.status === "in-progress";

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      <div className="panel lift p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            <span className="text-copper">{project.codename}</span>
            <span
              className={`flex items-center gap-1.5 rounded border px-2 py-0.5 ${
                inProgress ? "border-copper/40 text-copper" : "border-success/40 text-success"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${inProgress ? "bg-copper animate-pulse-dot" : "bg-success"}`} />
              {inProgress ? "en cours" : "terminé"}
            </span>
          </div>
          <span
            className="rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border"
            style={{ color: KIND_COLOR[project.kind], borderColor: `${KIND_COLOR[project.kind]}55` }}
          >
            {KIND_LABEL[project.kind]}
          </span>
        </div>

        <h3 className="mt-3 font-sans text-2xl md:text-3xl font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-dim">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded border border-line-soft bg-surface/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-dim"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Visual project={project} />

      <div className="panel lift p-5 md:p-6">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            étude de cas — problem → résultat
          </span>
          <span className={`font-mono text-xs text-ink-dim transition-transform ${open ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-4 space-y-6">
            <StoryBlock title={PROJECT_STORY_HEADINGS.problem}>
              <p className="text-sm leading-relaxed text-ink-dim">{project.problem}</p>
            </StoryBlock>
            <StoryBlock title={PROJECT_STORY_HEADINGS.architecture}>
              <Bullets items={project.architecture} />
            </StoryBlock>
            <StoryBlock title={PROJECT_STORY_HEADINGS.implementation}>
              <Bullets items={project.implementation} />
            </StoryBlock>
            <StoryBlock title={PROJECT_STORY_HEADINGS.result}>
              <p className="text-sm leading-relaxed text-ink-dim">{project.result}</p>
            </StoryBlock>
            <StoryBlock title={PROJECT_STORY_HEADINGS.learned}>
              <Bullets items={project.learned} />
            </StoryBlock>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedId, setSelectedId] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === selectedId) ?? PROJECTS[0];
  const { ref, active } = useSectionActive<HTMLDivElement>();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <Section
      id="projects"
      index="01"
      service="case studies"
      tag="workloads"
      title="Projects"
      subtitle="Pas de simples cartes : chaque projet est une étude de cas racontée de bout en bout — problème, architecture, implémentation, résultat et ce que j'en ai retenu."
    >
      <div ref={ref} className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate={active ? "show" : "hidden"}
          className="space-y-3"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            registre des projets
          </div>
          {PROJECTS.map((p, i) => {
            const isSel = selectedId === p.id;
            return (
              <motion.button
                key={p.id}
                variants={item}
                onClick={() => setSelectedId(p.id)}
                className={`w-full rounded border p-4 text-left transition-all ${
                  isSel
                    ? "border-ice/50 bg-surface/60"
                    : "border-line-soft bg-surface/20 hover:border-ice/30"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                  <span className="text-copper">{p.codename}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className={`mt-2 font-sans text-base font-semibold ${isSel ? "text-ice" : "text-ink"}`}>
                  {p.name}
                </div>
                <div className="mt-1 font-mono text-[11px] text-ink-dim">{KIND_LABEL[p.kind]}</div>
              </motion.button>
            );
          })}
        </motion.div>

        <div>
          <ProjectView project={project} active={active} />
        </div>
      </div>
    </Section>
  );
}
