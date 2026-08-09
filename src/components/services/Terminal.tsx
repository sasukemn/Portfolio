"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Section } from "@/components/ui/Section";
import { IDENTITY, CONTACT } from "@/lib/siteConfig";
import { SKILLS } from "@/lib/data/skills";
import { PROJECTS } from "@/lib/data/projects";
import { useSite } from "@/lib/site";

type Line = { kind: "in" | "out"; text: string };

const HELP = `commandes disponibles
  about       résumé de l'opérateur
  skills      liste des nœuds technologiques
  projects    liste des projets livrés
  lab         modules du laboratoire
  github      ouvrir le profil github
  contact     canaux de contact réels
  cv          statut du curriculum vitae
  whoami      révéler l'identité
  theme       basculer nuit / glacier
  history     historique des commandes
  clear       vider le terminal
  help        afficher cette aide`;

const SKILL_LABEL: Record<string, string> = {
  active: "pratiqué",
  learning: "en apprentissage",
  future: "direction",
};

function about(): string {
  return `${IDENTITY.displayName}
  ${IDENTITY.role} · ${IDENTITY.roleSecondary}
  ${IDENTITY.direction}`;
}

function skills(): string {
  return SKILLS.map(
    (s) => `  ${s.name.padEnd(10)} ${SKILL_LABEL[s.status].padEnd(16)} ${s.id}`,
  ).join("\n");
}

function projects(): string {
  return PROJECTS.map((p) => {
    const st = p.status === "completed" ? "terminé" : "en cours";
    return `  ${p.codename.padEnd(9)} ${p.name.padEnd(24)} [${st}]`;
  }).join("\n");
}

export function Terminal() {
  const { toggleTheme } = useSite();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "northstack v2 — connecté. tapez 'help' pour commencer." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [focused, setFocused] = useState(true);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && focused) inputRef.current?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  const push = (kind: Line["kind"], text: string) => setLines((l) => [...l, { kind, text }]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name, ...rest] = cmd.split(/\s+/);
    push("in", `$ ${cmd}`);
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    switch (name) {
      case "":
        break;
      case "help":
        push("out", HELP);
        break;
      case "about":
        push("out", about());
        break;
      case "whoami":
        push("out", `  ${IDENTITY.monogram.toLowerCase()} — développeur, étudiant en systèmes et réseaux.`);
        break;
      case "skills":
        push("out", skills());
        break;
      case "projects":
        push("out", projects());
        break;
      case "lab":
        push("out", "  net-lab     routage rip/ospf sous gns3");
        push("out", "  svc-lab     web · mail · monitoring");
        push("out", "  sec-lab     opnsense · suricata · kali");
        push("out", "  virt-layer  kvm · docker");
        break;
      case "github":
        window.open(CONTACT.githubUrl, "_blank");
        push("out", `  ouverture de ${CONTACT.githubUrl}…`);
        break;
      case "contact":
        push("out", `  téléphone:  ${CONTACT.phoneDisplay}`);
        push("out", `  github:     ${CONTACT.githubUrl}`);
        push("out", `  note:       ${CONTACT.note}`);
        break;
      case "cv":
        CONTACT.cv.items.forEach((cv) =>
          push("out", `  ${cv.label} — ${cv.href}`),
        );
        push("out", "  disponible dans la section contact.");
        break;
      case "theme":
        toggleTheme();
        push("out", "  thème basculé.");
        break;
      case "history":
        push("out", (history.length ? history.map((h) => `  ${h}`) : ["  (vide)"]).join("\n"));
        break;
      case "clear":
        setLines([]);
        break;
      case "sudo":
        if (rest[0] === "whoami") push("out", "  mniaina (root)");
        else push("out", "  pas de droits sudo ici. incident signalé.");
        break;
      default:
        push("out", `  commande inconnue: ${name} — essayez 'help'`);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length) {
        const next = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[next]);
      } else {
        setHistIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const words = ["help", "about", "skills", "projects", "lab", "github", "contact", "cv", "whoami", "theme", "history", "clear", "sudo"];
      const match = words.find((w) => w.startsWith(input.trim().split(/\s+/).pop() ?? ""));
      if (match) setInput(match + " ");
    }
  };

  return (
    <Section
      id="terminal"
      index="06"
      service="interactive shell"
      tag="console"
      title="Terminal"
      subtitle="Fonctionnalité avancée, réservée aux visiteurs techniques. Tout le portfolio se découvre sans elle : c'est un bonus pour ceux qui veulent explorer depuis un vrai shell."
    >
      {open ? (
        <div
          className="overflow-hidden rounded-lg border border-line-soft bg-night-soft/80 shadow-2xl shadow-black/40"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between border-b border-line-soft px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-copper" />
              <span className="h-3 w-3 rounded-full bg-ink/30" />
              <span className="h-3 w-3 rounded-full bg-ice" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              mniaina@northstack — tty1
            </span>
            <span className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-ink-dim">256-color</span>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-ink-dim transition-colors hover:text-copper"
                aria-label="Fermer la console"
                title="Fermer la console"
              >
                ✕
              </button>
            </span>
          </div>

        <div
          ref={scrollRef}
          className="h-[380px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className={l.kind === "in" ? "text-ink" : "whitespace-pre-wrap text-ink-dim"}
            >
              {l.kind === "in" ? (
                <>
                  <span className="text-ice">➜</span> <span className="text-copper">~</span>{" "}
                  <span className="text-ink">{l.text.slice(2)}</span>
                </>
              ) : (
                l.text
              )}
            </motion.div>
          ))}
          <div className="flex items-center">
            <span className="text-ice">➜</span> <span className="text-copper">~</span>{" "}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Entrée du terminal"
              className="ml-1 flex-1 bg-transparent text-ink caret-ice outline-none"
            />
            <span className="animate-blink text-ice">▊</span>
          </div>
        </div>
      </div>
      ) : (
        <div className="panel lift mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-ice/40 bg-ice/10 font-mono text-xl text-ice">
            &gt;_
          </div>
          <div className="eng-note mt-5 text-copper">{"// console avancée"}</div>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-dim">
            Une vraie interface en ligne de commande, pour les visiteurs techniques. Le portfolio
            se parcourt entièrement sans elle — c&apos;est un bonus optionnel.
          </p>
          <button onClick={() => setOpen(true)} className="btn btn-secondary mt-7">
            &gt;_ ouvrir la console
          </button>
        </div>
      )}
    </Section>
  );
}
