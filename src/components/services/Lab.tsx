"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ENVIRONMENT } from "@/lib/siteConfig";

const LAB_MODULES = [
  {
    id: "net-lab",
    name: "net-lab",
    desc: "Topologies GNS3 : routage RIP/OSPF, redistribution, connectivité de bout en bout.",
    status: "actif" as const,
    color: "#67e8f9",
  },
  {
    id: "svc-lab",
    name: "services lab",
    desc: "Infrastructure de services : web (Apache2), messagerie (Postfix/Dovecot), supervision (Prometheus/Grafana).",
    status: "actif" as const,
    color: "#60a5fa",
  },
  {
    id: "sec-lab",
    name: "sec-lab · red team",
    desc: "Architecture sécurisée : OPNsense, DMZ, Suricata, simulations d'attaques depuis Kali.",
    status: "en construction" as const,
    color: "#f87171",
  },
  {
    id: "virt-lab",
    name: "virt-layer",
    desc: "Isolation et expérimentation : KVM pour les machines virtuelles, Docker pour les conteneurs.",
    status: "actif" as const,
    color: "#94a3b8",
  },
];

export function Lab() {
  return (
    <Section
      id="lab"
      index="03"
      service="laboratory"
      tag="infrastructure"
      title="Lab"
      subtitle="Mon environnement d'entraînement réel : une station de travail Kali qui pilote de la virtualisation (KVM, Docker) et une émulation réseau (GNS3). Tout ce qui est listé ici existe et tourne."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="panel lift p-5"
        >
          <div className="eng-note text-copper">{"// environnement"}</div>
          <dl className="mt-4 space-y-3">
            {ENVIRONMENT.map((e) => (
              <div
                key={e.label}
                className="flex items-center justify-between gap-4 border-b border-line-soft/60 pb-3 last:border-0 last:pb-0"
              >
                <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim">{e.label}</dt>
                <dd className="font-mono text-sm text-ice">{e.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          {LAB_MODULES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="panel lift flex items-start gap-4 p-4"
            >
              <span
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: m.color }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-sm text-ink">{m.name}</span>
                  <span
                    className="rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                    style={{
                      color: m.color,
                      borderColor: `${m.color}55`,
                      background: `${m.color}11`,
                    }}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-dim">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="panel lift mt-6 p-4"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-dim">
          <span className="text-copper">physique · topology</span>
          <span>station → virtualisation → émulation</span>
        </div>
        <svg viewBox="0 0 720 300" className="mt-3 h-auto w-full" role="img" aria-label="Topologie physique du laboratoire">
          <defs>
            <marker id="lab-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#67e8f9" />
            </marker>
          </defs>

          <rect x="30" y="40" width="170" height="70" rx="8" className="fill-surface" stroke="#f87171" strokeOpacity="0.6" />
          <text x="115" y="66" textAnchor="middle" fontSize="12.5" fontWeight="650" className="fill-danger font-mono">
            Kali Workstation
          </text>
          <text x="115" y="84" textAnchor="middle" fontSize="8.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
            host principal
          </text>
          <text x="115" y="97" textAnchor="middle" fontSize="8.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
            vs code · git
          </text>

          <rect x="270" y="40" width="180" height="70" rx="8" className="fill-surface" stroke="#60a5fa" strokeOpacity="0.6" />
          <text x="360" y="66" textAnchor="middle" fontSize="12.5" fontWeight="650" className="fill-info font-mono">
            Virtualisation
          </text>
          <text x="360" y="84" textAnchor="middle" fontSize="8.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
            kvm · machines virtuelles
          </text>
          <text x="360" y="97" textAnchor="middle" fontSize="8.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
            docker · conteneurs
          </text>

          <rect x="520" y="40" width="170" height="70" rx="8" className="fill-surface" stroke="#ff7043" strokeOpacity="0.6" />
          <text x="605" y="66" textAnchor="middle" fontSize="12.5" fontWeight="650" className="fill-copper font-mono">
            GNS3 Emulation
          </text>
          <text x="605" y="84" textAnchor="middle" fontSize="8.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
            routeurs · switches
          </text>
          <text x="605" y="97" textAnchor="middle" fontSize="8.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
            cisco ios
          </text>

          <line x1="200" y1="75" x2="270" y2="75" stroke="#67e8f9" strokeOpacity="0.6" strokeWidth="1.4" markerEnd="url(#lab-arrow)" />
          <line x1="450" y1="75" x2="520" y2="75" stroke="#67e8f9" strokeOpacity="0.6" strokeWidth="1.4" markerEnd="url(#lab-arrow)" />

          <rect x="30" y="160" width="290" height="110" rx="10" fill="none" stroke="#67e8f9" strokeOpacity="0.3" strokeDasharray="5 5" />
          <text x="46" y="182" fontSize="9.5" letterSpacing="1.5" className="uppercase fill-ice font-mono">
            conteneurs docker
          </text>
          <text x="60" y="206" fontSize="9" className="fill-ink-dim font-mono">web · apache2</text>
          <text x="60" y="226" fontSize="9" className="fill-ink-dim font-mono">mail · postfix + dovecot</text>
          <text x="60" y="246" fontSize="9" className="fill-ink-dim font-mono">monitoring · prometheus + grafana</text>

          <rect x="400" y="160" width="290" height="110" rx="10" fill="none" stroke="#60a5fa" strokeOpacity="0.3" strokeDasharray="5 5" />
          <text x="416" y="182" fontSize="9.5" letterSpacing="1.5" className="uppercase fill-blue font-mono">
            machines virtuelles
          </text>
          <text x="430" y="206" fontSize="9" className="fill-ink-dim font-mono">vm · services réseau</text>
          <text x="430" y="226" fontSize="9" className="fill-ink-dim font-mono">vm · opnsense (pare-feu)</text>
          <text x="430" y="246" fontSize="9" className="fill-ink-dim font-mono">vm · suricata (ids)</text>
        </svg>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
          tout est réel · rien n&apos;est décoratif
        </div>
      </motion.div>
    </Section>
  );
}
