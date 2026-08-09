"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { useSectionActive } from "@/components/ui/useSectionActive";
import { useSite } from "@/lib/site";
import {
  SKILLS,
  SKILL_CATEGORIES,
  CAT_ORDER,
  type Skill,
  type SkillCategory,
  type SkillStatus,
} from "@/lib/data/skills";

const CAT_COLOR: Record<SkillCategory, string> = {
  software: "#67e8f9",
  systems: "#60a5fa",
  networking: "#ff7043",
  infrastructure: "#94a3b8",
  security: "#f87171",
  devops: "#c084fc",
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  active: "pratiqué",
  learning: "en apprentissage",
  future: "direction",
};

const STATUS_COLOR: Record<SkillStatus, string> = {
  active: "#22c55e",
  learning: "#ff7043",
  future: "#c084fc",
};

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layout(ids: string[], edges: [string, string][], w: number, h: number) {
  const rand = mulberry32(20260808);
  const pos = new Map<string, { x: number; y: number }>();
  for (const id of ids) {
    pos.set(id, { x: (rand() - 0.5) * w, y: (rand() - 0.5) * h });
  }
  const nodes = ids.map((id) => pos.get(id)!);
  const springs: { a: { x: number; y: number }; b: { x: number; y: number } }[] = [];
  for (const [a, b] of edges) {
    const pa = pos.get(a);
    const pb = pos.get(b);
    if (pa && pb) springs.push({ a: pa, b: pb });
  }

  for (let iter = 0; iter < 90; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d2 = Math.max(dx * dx + dy * dy, 0.1);
        const f = Math.min(1700 / d2, 40);
        const fx = (dx / Math.sqrt(d2)) * f;
        const fy = (dy / Math.sqrt(d2)) * f;
        nodes[i].x -= fx;
        nodes[i].y -= fy;
        nodes[j].x += fx;
        nodes[j].y += fy;
      }
    }
    for (const s of springs) {
      const dx = s.b.x - s.a.x;
      const dy = s.b.y - s.a.y;
      const d = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
      const f = (d - 88) * 0.02;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      s.a.x += fx;
      s.a.y += fy;
      s.b.x -= fx;
      s.b.y -= fy;
    }
    for (const p of nodes) {
      p.x *= 0.985;
      p.y *= 0.985;
    }
  }

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of nodes) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  const scale = Math.min(w / (maxX - minX), h / (maxY - minY));
  return new Map(
    ids.map((id) => {
      const p = pos.get(id)!;
      return [
        id,
        { x: (p.x - (minX + maxX) / 2) * scale + w / 2, y: (p.y - (minY + maxY) / 2) * scale + h / 2 },
      ];
    }),
  );
}

function LevelTicks({ level }: { level: number }) {
  const ticks = 5;
  const filled = Math.round(level * ticks);
  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: ticks }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < filled ? "bg-ice" : "bg-surface-2"}`}
        />
      ))}
    </span>
  );
}

export function TechnologyGraph() {
  const [selected, setSelected] = useState<Skill | null>(null);
  const [hovered, setHovered] = useState<Skill | null>(null);
  const [filter, setFilter] = useState<SkillCategory | "all">("all");
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useSite();
  const { ref: sectionRef, active: sectionActive } = useSectionActive<HTMLDivElement>();

  const isGlacier = theme === "glacier";
  const LINE = isGlacier ? "#6f8ea0" : "#3b6277";
  const ACTIVE_LINE = isGlacier ? "#0a6b84" : "#67e8f9";
  const BASE_LINE_OPACITY = isGlacier ? 0.62 : 0.72;
  const AURORA = isGlacier
    ? ["rgba(8,127,156,0.12)", "rgba(125,160,175,0.07)", "rgba(227,240,246,0)"]
    : ["rgba(34,184,207,0.18)", "rgba(23,64,84,0.12)", "rgba(8,13,18,0)"];
  const HOVER_HALO_OPACITY = isGlacier ? 0.14 : 0.28;

  const ids = useMemo(() => SKILLS.map((s) => s.id), []);
  const edges = useMemo(() => {
    const set = new Set<string>();
    const out: [string, string][] = [];
    for (const s of SKILLS) {
      for (const c of s.connects) {
        const key = [s.id, c].sort().join("|");
        if (!set.has(key)) {
          set.add(key);
          out.push([s.id, c]);
        }
      }
    }
    return out;
  }, []);

  const W = 720;
  const H = 620;
  const pos = useMemo(() => layout(ids, edges, W - 14, H - 48), [ids, edges]);

  const visible = filter === "all" ? SKILLS : SKILLS.filter((s) => s.category === filter);
  const visibleIds = new Set(visible.map((s) => s.id));

  const applyFilter = (c: SkillCategory | "all") => {
    setFilter(c);
    setSelected(null);
  };

  return (
    <Section
      id="stack"
      index="02"
      service="technology graph"
      tag="technologies"
      title="Stack"
      subtitle="Mon environnement technique, représenté comme un réseau. Chaque nœud est lié par une vraie co-utilisation. Cliquez sur un nœud pour consulter sa fiche — avec un statut honnête : pratiqué, en apprentissage ou direction."
    >
      <div ref={sectionRef} className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="panel lift p-4">
          <div
            className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest"
            style={{ opacity: sectionActive ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <button
              onClick={() => applyFilter("all")}
              className={`rounded px-3 py-1.5 border transition-colors ${
                filter === "all"
                  ? "border-ice/60 bg-ice/10 text-ice"
                  : "border-line-soft text-ink-dim hover:text-ink"
              }`}
            >
              tous les nœuds
            </button>
            {CAT_ORDER.map((c) => (
              <button
                key={c}
                onClick={() => applyFilter(c)}
                className={`rounded px-3 py-1.5 border transition-colors ${
                  filter === c
                    ? "border-ice/60 bg-ice/10 text-ice"
                    : "border-line-soft text-ink-dim hover:text-ink"
                }`}
              >
                {SKILL_CATEGORIES[c]}
              </button>
            ))}
          </div>

          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="mt-4 h-auto w-full"
            role="img"
            aria-label="Graphe des technologies"
          >
            <defs>
              <radialGradient id="net-aurora" cx="50%" cy="42%" r="78%">
                <stop offset="0%" stopColor={AURORA[0]} />
                <stop offset="58%" stopColor={AURORA[1]} />
                <stop offset="100%" stopColor={AURORA[2]} />
              </radialGradient>
              <filter id="net-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <rect x="0" y="0" width={W} height={H} rx="14" fill="url(#net-aurora)" />

            {edges.map(([a, b], edgeIndex) => {
              const pa = pos.get(a);
              const pb = pos.get(b);
              if (!pa || !pb) return null;
              const focusId = selected?.id ?? hovered?.id;
              const active =
                focusId &&
                (a === focusId || b === focusId) &&
                visibleIds.has(a) &&
                visibleIds.has(b);
              const dim = focusId && a !== focusId && b !== focusId && !active;
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke={active ? ACTIVE_LINE : LINE}
                  strokeOpacity={focusId ? (dim ? 0.05 : active ? 0.95 : 0.18) : BASE_LINE_OPACITY}
                  strokeWidth={active ? 1.4 : 0.8}
                  style={{ transition: "stroke-opacity 0.3s, stroke 0.3s" }}
                  initial={false}
                  animate={{ pathLength: sectionActive ? 1 : 0, opacity: sectionActive ? 1 : 0 }}
                  transition={{
                    duration: 0.3,
                    delay: sectionActive ? 0.24 + edgeIndex * 0.006 : 0,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {SKILLS.map((s, i) => {
              const p = pos.get(s.id);
              if (!p) return null;
              const hidden = !visibleIds.has(s.id);
              const isSel = selected?.id === s.id;
              const isHov = !isSel && hovered?.id === s.id;
              const focusId = selected?.id ?? hovered?.id;
              const connected = focusId && (focusId === s.id || s.connects.includes(focusId));
              const r = 4 + s.level * 5.6;
              const nodeOpacity = hidden
                ? 0.05
                : isSel
                  ? 1
                  : focusId
                    ? connected
                      ? 0.95
                      : 0.28
                    : s.status === "future"
                      ? 0.45
                      : 0.85;
              return (
                <g
                  key={s.id}
                  opacity={nodeOpacity}
                  style={{ transition: "opacity 0.3s" }}
                  className="cursor-pointer"
                  onClick={() => setSelected(isSel ? null : s)}
                  onPointerEnter={() => setHovered(s)}
                  onPointerLeave={() => setHovered(null)}
                >
                  <title>{`${s.name} · ${SKILL_CATEGORIES[s.category]} · ${STATUS_LABEL[s.status]}`}</title>
                  <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
                  {(isSel || isHov) && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r + (isGlacier ? 7 : 6)}
                      fill={CAT_COLOR[s.category]}
                      opacity={HOVER_HALO_OPACITY}
                      filter="url(#net-glow)"
                    />
                  )}
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={r}
                    fill={CAT_COLOR[s.category]}
                    stroke={s.status === "future" ? "#c084fc" : "none"}
                    strokeDasharray={s.status === "learning" ? "3 3" : "none"}
                    strokeWidth={1}
                    initial={false}
                    animate={{ opacity: sectionActive ? 0.92 : 0, r: sectionActive ? r : 0 }}
                    transition={{ duration: 0.4, delay: sectionActive ? 0.04 + i * 0.008 : 0 }}
                  />
                  <line
                    x1={p.x}
                    y1={p.y + r}
                    x2={p.x}
                    y2={p.y + 21}
                    stroke="currentColor"
                    strokeOpacity={0.2}
                    strokeWidth={0.75}
                    className="pointer-events-none"
                  />
                  {(isSel || isHov) && (
                    <motion.g
                      style={{ originX: p.x, originY: p.y }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0, 0.45] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={r}
                        fill="none"
                        stroke={CAT_COLOR[s.category]}
                        strokeOpacity={isGlacier ? 0.7 : 0.5}
                      />
                    </motion.g>
                  )}
                  <motion.text
                    x={p.x}
                    y={p.y + 32}
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize={15.5}
                    fontWeight={isSel || isHov ? 650 : 560}
                    letterSpacing={0.5}
                    className="fill-ink/95 font-mono select-none pointer-events-none"
                    initial={false}
                    animate={{ opacity: sectionActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: sectionActive ? 0.46 + i * 0.01 : 0 }}
                  >
                    {s.name}
                  </motion.text>
                </g>
              );
            })}
          </svg>

          <div
            className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-dim"
            style={{ opacity: sectionActive ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
          >
            <span>
              {hovered
                ? `${hovered.name} · ${SKILL_CATEGORIES[hovered.category]} · ${STATUS_LABEL[hovered.status]} — cliquer pour la fiche`
                : `${SKILLS.length} nœuds · ${edges.length} liens · cliquez sur un nœud`}
            </span>
          </div>

          <div
            className="mt-3 flex flex-wrap items-center gap-4 border-t border-line-soft pt-3 font-mono text-[10px] uppercase tracking-widest text-ink-dim"
            style={{ opacity: sectionActive ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
              pratiqué
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-dashed" style={{ borderColor: "#ff7043", background: "#ff7043" }} />
              en apprentissage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border" style={{ borderColor: "#c084fc", background: "#c084fc" }} />
              direction
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={sectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="panel sticky top-24 p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: CAT_COLOR[selected.category] }}
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                  node:{selected.id}
                </span>
              </div>
              <h3 className="mt-3 font-sans text-2xl font-semibold text-ink">{selected.name}</h3>
              <div className="mt-1 font-mono text-xs text-ink-dim">
                {SKILL_CATEGORIES[selected.category]}
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span
                  className="rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border"
                  style={{
                    color: STATUS_COLOR[selected.status],
                    borderColor: `${STATUS_COLOR[selected.status]}55`,
                    background: `${STATUS_COLOR[selected.status]}11`,
                  }}
                >
                  {STATUS_LABEL[selected.status]}
                </span>
                <LevelTicks level={selected.level} />
                <span className="font-mono text-xs text-ink-dim tabular-nums">
                  {Math.round(selected.level * 100)}%
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink">{selected.desc}</p>

              <div className="mt-4 space-y-3.5">
                <div>
                  <div className="eng-note text-copper">utilisation</div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">{selected.usage}</p>
                </div>

                {selected.projects && (
                  <div>
                    <div className="eng-note text-copper">projets</div>
                    <ul className="mt-1 space-y-1">
                      {selected.projects.map((pr) => (
                        <li key={pr} className="flex items-start gap-2 text-sm text-ink-dim">
                          <span className="mt-0.5 text-ice">▪</span>
                          {pr}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <div className="eng-note text-copper">liens</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.connects.map((c) => {
                      const s = SKILLS.find((x) => x.id === c);
                      return (
                        <button
                          key={c}
                          onClick={() => setSelected(s ?? selected)}
                          className="rounded border border-line-soft px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-dim transition-colors hover:border-ice/50 hover:text-ice"
                        >
                          {s?.name ?? c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-5 w-full rounded border border-line-soft py-2 font-mono text-[10px] uppercase tracking-widest text-ink-dim transition-colors hover:border-ice/50 hover:text-ice"
              >
                × fermer la fiche
              </button>
            </motion.div>
          ) : (
            <div className="panel p-6 text-center">
              <div className="font-mono text-xs text-ink-dim">
                <span className="text-ice">▲</span> en attente
              </div>
              <p className="mt-2 text-sm text-ink-dim">
                Sélectionnez un nœud pour consulter sa fiche : description, utilisation, projets et
                liens avec le reste de l&apos;environnement.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
