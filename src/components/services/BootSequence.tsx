"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSite } from "@/lib/site";
import { IDENTITY } from "@/lib/siteConfig";

const STATUS = [
  "INITIALIZING SYSTEM",
  "CONNECTING NODES",
  "LOADING INTERFACE",
  "ESTABLISHING IDENTITY",
];

const RING_R = 105;

type Palette = {
  bg: string;
  line: string;
  node: string;
  nodeCore: string;
  accent: string;
  copper: string;
  success: string;
  ink: string;
  dim: string;
};

const PALETTES: Record<"night" | "glacier", Palette> = {
  night: {
    bg: "#080D12",
    line: "#1E2E3C",
    node: "#223744",
    nodeCore: "#67E8F9",
    accent: "#67E8F9",
    copper: "#FF7043",
    success: "#34D399",
    ink: "#E7F2F7",
    dim: "#6C8292",
  },
  glacier: {
    bg: "linear-gradient(180deg, #E9F1F6 0%, #F6FAFC 100%)",
    line: "rgba(23, 38, 48, 0.2)",
    node: "rgba(23, 38, 48, 0.3)",
    nodeCore: "#087F9C",
    accent: "#087F9C",
    copper: "#C95532",
    success: "#16803A",
    ink: "#172630",
    dim: "#536873",
  },
};

export function BootSequence() {
  const { booted, markBooted, theme } = useSite();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const [n, setN] = useState(0);
  const [showName, setShowName] = useState(false);

  const pal = PALETTES[theme === "night" ? "night" : "glacier"];

  const fast = useMemo(
    () => typeof window !== "undefined" && window.sessionStorage.getItem("polar-booted") === "1",
    [],
  );
  const totalMs = fast ? 800 : 1400;

  const nodes = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    for (let k = 0; k < 12; k += 1) {
      const a = (-90 + k * 30) * (Math.PI / 180);
      list.push({
        x: Math.round((200 + RING_R * Math.cos(a)) * 1000) / 1000,
        y: Math.round((150 + RING_R * Math.sin(a)) * 1000) / 1000,
      });
    }
    return list;
  }, []);

  const spokes = useMemo(
    () => nodes.map((p) => ({ x1: 200, y1: 150, x2: p.x, y2: p.y })),
    [nodes],
  );
  const rim = useMemo(
    () =>
      nodes.map((p, i) => {
        const q = nodes[(i + 1) % nodes.length];
        return { x1: p.x, y1: p.y, x2: q.x, y2: q.y };
      }),
    [nodes],
  );

  const counts = useMemo(() => STATUS.map((s) => s.length + 1), []);
  const totalChars = counts.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (booted) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    add(() => setPhase(1), 0.14 * totalMs);
    add(() => setPhase(2), 0.28 * totalMs);
    add(() => setShowName(true), 0.86 * totalMs);
    add(() => {
      setVisible(false);
      markBooted();
      try {
        window.sessionStorage.setItem("polar-booted", "1");
      } catch {
        /* ignore */
      }
    }, totalMs);

    return () => timers.forEach(clearTimeout);
  }, [booted, markBooted, totalMs]);

  useEffect(() => {
    if (booted) return;

    const start = Date.now() + 0.46 * totalMs;
    const charTime = (0.4 * totalMs) / totalChars;
    let done = false;

    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed <= 0) {
        setTimeout(tick, 16);
        return;
      }
      const wanted = Math.floor(elapsed / charTime);
      setN(Math.min(totalChars, wanted));
      if (wanted < totalChars) {
        setTimeout(tick, charTime);
      } else {
        done = true;
        setN(totalChars);
      }
    };

    const t = setTimeout(tick, Math.max(0, 0.46 * totalMs));
    return () => {
      clearTimeout(t);
      if (!done) setN(0);
    };
  }, [booted, totalMs, totalChars]);

  useEffect(() => {
    if (!booted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  let acc = 0;
  let li = 0;
  while (li < STATUS.length - 1 && n >= acc + counts[li]) {
    acc += counts[li];
    li += 1;
  }
  const lineIndex = Math.min(li, STATUS.length - 1);
  const lineChars = Math.min(STATUS[lineIndex].length, n - acc);
  const allTyped = n >= totalChars;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: pal.bg }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-polar opacity-60" />

          <div className="pointer-events-none absolute top-1/3 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: pal.accent, opacity: theme === "night" ? 0.08 : 0.1 }}
          />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 px-6">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: pal.dim }}>
              <span style={{ color: pal.accent }}>◆</span> northstack · network bootstrap
            </div>

            <motion.svg
              viewBox="0 0 400 300"
              className="w-[min(72vw,340px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {phase >= 1 &&
                [...rim, ...spokes].map((l, i) => (
                  <motion.line
                    key={i}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    stroke={pal.line}
                    strokeWidth={1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.02 * i,
                      ease: "easeOut",
                    }}
                  />
                ))}

              {phase >= 2 && (
                <motion.circle
                  cx={200}
                  cy={150}
                  fill="none"
                  stroke={pal.accent}
                  strokeWidth={1}
                  initial={{ r: 4, opacity: 0.8 }}
                  animate={{ r: [4, RING_R + 14], opacity: [0.8, 0] }}
                  transition={{
                    duration: 0.9,
                    repeat: 2,
                    repeatDelay: 0.35,
                    ease: "easeOut",
                  }}
                />
              )}

              <motion.circle
                cx={200}
                cy={150}
                r={3.5}
                fill={pal.nodeCore}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: phase >= 1 ? 3.5 : 0, opacity: phase >= 1 ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              />

              {nodes.map((p, i) => (
                <motion.circle
                  key={`n${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={2.2}
                  fill={pal.node}
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 2.2, opacity: 1 }}
                  transition={{ delay: 0.02 * i, duration: 0.25 }}
                />
              ))}
            </motion.svg>

            <div className="flex h-16 min-h-16 flex-col items-center gap-1.5 font-mono text-[12px]">
              {STATUS.map((s, i) => {
                const done = i < lineIndex || (i === lineIndex && allTyped);
                const shown = i < lineIndex ? s.length : i === lineIndex ? lineChars : 0;
                return (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: shown > 0 ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="text-[9px]"
                      style={{ color: done ? pal.success : pal.copper }}
                    >
                      {done ? "OK" : "▸"}
                    </span>
                    <span style={{ color: done ? pal.ink : pal.dim }}>
                      {s.slice(0, shown)}
                    </span>
                    {i === lineIndex && !allTyped && (
                      <span className="animate-blink" style={{ color: pal.accent }}>
                        ▊
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full border-t pt-5 text-center"
                  style={{ borderColor: pal.line }}
                >
                  <div className="font-sans text-xl font-semibold tracking-tight" style={{ color: pal.ink }}>
                    {IDENTITY.displayName.toUpperCase()}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: pal.dim }}>
                    {IDENTITY.role} · {IDENTITY.roleSecondary}
                  </div>
                  <div
                    className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: pal.success }}
                  >
                    connection established
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
