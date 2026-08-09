"use client";

import { motion } from "framer-motion";

type Pt = [number, number];

const LINKS: { a: Pt; b: Pt; color: string }[] = [
  { a: [40, 300], b: [150, 300], color: "#67e8f9" },
  { a: [150, 300], b: [360, 100], color: "#ff7043" },
  { a: [360, 100], b: [570, 300], color: "#ff7043" },
  { a: [150, 300], b: [570, 300], color: "#ff7043" },
  { a: [570, 300], b: [680, 300], color: "#60a5fa" },
];

function linkPath([ax, ay]: Pt, [bx, by]: Pt) {
  return `M${ax} ${ay} L${bx} ${by}`;
}

function Router({
  x,
  y,
  label,
  accent,
}: {
  x: number;
  y: number;
  label: string;
  accent: string;
}) {
  return (
    <g>
      <rect x={x - 44} y={y - 20} width="88" height="40" rx="5" className="fill-surface" stroke={accent} strokeOpacity="0.6" />
      <circle cx={x - 28} cy={y} r="9" fill="none" stroke={accent} strokeOpacity="0.6" />
      <text x={x - 28} y={y + 3.5} textAnchor="middle" fontSize="9" className="fill-ink/70 font-mono">
        {label}
      </text>
      <text x={x + 2} y={y - 2} fontSize="12.5" fontWeight="650" className="fill-ink font-mono">
        {label}
      </text>
      <text x={x + 2} y={y + 12} fontSize="7.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
        cisco
      </text>
    </g>
  );
}

function Host({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x - 30} y={y - 13} width="60" height="26" rx="4" className="fill-surface" stroke="currentColor" strokeOpacity="0.35" />
      <text x={x} y={y + 3} textAnchor="middle" fontSize="11" className="fill-ink/90 font-mono">
        {label}
      </text>
    </g>
  );
}

function Pulse({ d, color, dur }: { d: string; color: string; dur: number }) {
  return (
    <circle r="4" fill={color} opacity="0.9">
      <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
      <animate attributeName="opacity" values="0.2;1;0.2" dur={`${dur}s`} repeatCount="indefinite" />
    </circle>
  );
}

export function RouterTopology() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="panel lift p-4"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        <span className="text-copper">gns3 · topology</span>
        <span>rip + ospf · redistribution</span>
      </div>
      <svg viewBox="0 0 720 420" className="mt-2 h-auto w-full" role="img" aria-label="Topologie réseau GNS3">
        <rect x="20" y="180" width="310" height="180" rx="10" fill="none" stroke="#67e8f9" strokeOpacity="0.28" strokeDasharray="5 5" />
        <text x="34" y="204" fontSize="10.5" letterSpacing="1.5" className="uppercase fill-ice font-mono">
          rip · distance-vector
        </text>

        <rect x="390" y="180" width="310" height="180" rx="10" fill="none" stroke="#60a5fa" strokeOpacity="0.28" strokeDasharray="5 5" />
        <text x="404" y="204" fontSize="10.5" letterSpacing="1.5" className="uppercase fill-info font-mono">
          ospf · link-state
        </text>

        {LINKS.map((l) => (
          <line
            key={`${l.a}-${l.b}`}
            x1={l.a[0]}
            y1={l.a[1]}
            x2={l.b[0]}
            y2={l.b[1]}
            stroke={l.color}
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
        ))}

        {LINKS.map((l, i) => (
          <Pulse key={`p-${i}`} d={linkPath(l.a, l.b)} color={l.color} dur={1.8 + i * 0.35} />
        ))}

        <Router x={360} y={100} label="R1" accent="#ff7043" />
        <Router x={150} y={300} label="R2" accent="#67e8f9" />
        <Router x={570} y={300} label="R3" accent="#60a5fa" />
        <Host x={40} y={300} label="PC-A" />
        <Host x={680} y={300} label="PC-B" />

        <g transform="translate(300,40)">
          <rect x="-74" y="-14" width="148" height="26" rx="13" fill="#ff7043" fillOpacity="0.12" stroke="#ff7043" strokeOpacity="0.6" />
          <text x="0" y="2" textAnchor="middle" fontSize="10" letterSpacing="1.5" className="uppercase fill-copper font-mono">
            redistribution
          </text>
        </g>
      </svg>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        domaines de routage · convergence · connectivité de bout en bout
      </div>
    </motion.div>
  );
}
