"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function ProjectFlow({ flow }: { flow: string[] }) {
  const nodes = useMemo(() => {
    const n = flow.length;
    const xs: number[] = [];
    for (let i = 0; i < n; i++) {
      xs.push(40 + (i * 640) / (n - 1 || 1));
    }
    return flow.map((label, i) => ({
      label,
      x: xs[i],
      first: i === 0,
      last: i === n - 1,
    }));
  }, [flow]);

  const W = 720;
  const H = 210;
  const cy = 108;
  const path = nodes.map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${cy}`).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="panel lift p-4"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        <span className="text-copper">schematic:{flow.length} stages</span>
        <span>data flow</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-auto w-full" role="img" aria-label="Flux de données">
        <path d={path} fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        {nodes.map((n, i) =>
          i < nodes.length - 1 ? (
            <path
              key={`arrow-${i}`}
              d={`M${(n.x + nodes[i + 1].x) / 2 - 8} ${cy - 6} L${(n.x + nodes[i + 1].x) / 2 + 2} ${cy} L${(n.x + nodes[i + 1].x) / 2 - 8} ${cy + 6}`}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
          ) : null,
        )}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x - 54}
              y={cy - 22}
              width="108"
              height="44"
              rx="6"
              fill="none"
              stroke={n.last ? "#ff7043" : n.first ? "#67e8f9" : "currentColor"}
              strokeOpacity={n.first || n.last ? 0.7 : 0.3}
            />
            <text
              x={n.x}
              y={cy + 4}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight={n.first || n.last ? 650 : 550}
              className="fill-ink/90 font-mono"
            >
              {n.label}
            </text>
          </g>
        ))}
        <circle r="7" fill="#ff7043">
          <animateMotion
            dur="2.6s"
            repeatCount="indefinite"
            path={path}
            keyPoints="0;1"
            keyTimes="0;1"
          />
          <animate attributeName="opacity" values="0.25;1;0.25" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        requête → traitement → résultat
      </div>
    </motion.div>
  );
}
