"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { CERTIFICATIONS, type CertStatus } from "@/lib/siteConfig";

const STATUS_STYLE: Record<CertStatus, { label: string; chip: string; dot: string }> = {
  completed: {
    label: "obtenu",
    chip: "border-success/40 text-success bg-success/5",
    dot: "bg-success",
  },
  "in-progress": {
    label: "en cours",
    chip: "border-copper/40 text-copper bg-copper/5",
    dot: "bg-copper animate-pulse-dot",
  },
  planned: {
    label: "planifié",
    chip: "border-violet/40 text-violet bg-violet/5",
    dot: "bg-violet",
  },
};

export function Certifications() {
  return (
    <Section
      id="certifications"
      index="04b"
      service="certifications"
      tag="validation"
      title="Certifications"
      subtitle="Je n'affiche que ce qui est réel. Chaque certification indique son état exact — obtenu, en cours ou planifié — jamais de titre prétendu sans preuve."
    >
      {CERTIFICATIONS.length === 0 ? (
        <div className="panel p-8 text-center font-mono text-sm text-ink-dim">
          Aucune certification renseignée pour le moment.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => {
            const st = STATUS_STYLE[c.status];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="panel lift flex flex-col p-5"
              >
                <div className="flex items-center justify-between">
                  <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                    {c.id}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-tight text-ink">
                  {c.name}
                </h3>
                <div className="mt-1 font-mono text-xs text-ice">{c.issuer}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">{c.note}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${st.chip}`}
                  >
                    {st.label}
                  </span>
                  {c.earned && (
                    <span className="font-mono text-[10px] tabular-nums text-ink-dim">{c.earned}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-8 border-l-2 border-copper/60 bg-copper/5 p-5">
        <div className="eng-note text-copper">note d&apos;honnêteté</div>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          En attendant les certifications finalisées, la plupart de mes acquis proviennent des
          projets et du laboratoire présentés sur cette page — les preuves de ce que je sais faire.
        </p>
      </div>
    </Section>
  );
}
