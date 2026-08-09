"use client";

import { motion } from "framer-motion";

export function SecureNet() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="panel lift p-4"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        <span className="text-copper">lab · red team</span>
        <span>opnsense · dmz · suricata</span>
      </div>
      <svg viewBox="0 0 720 430" className="mt-2 h-auto w-full" role="img" aria-label="Architecture réseau sécurisée">
        <defs>
          <marker id="g-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#22c55e" />
          </marker>
          <marker id="r-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#f87171" />
          </marker>
        </defs>

        <rect x="20" y="20" width="680" height="70" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.25" />
        <text x="34" y="42" fontSize="10.5" letterSpacing="1.5" className="uppercase fill-ink-dim font-mono">
          internet
        </text>

        <rect x="70" y="55" width="64" height="26" rx="4" className="fill-surface" stroke="#f87171" strokeOpacity="0.7" />
        <text x="102" y="71" textAnchor="middle" fontSize="10.5" className="fill-danger font-mono" fontWeight="600">
          Kali
        </text>

        <rect x="210" y="55" width="64" height="26" rx="4" className="fill-surface" stroke="currentColor" strokeOpacity="0.4" />
        <text x="242" y="71" textAnchor="middle" fontSize="10.5" className="fill-ink/90 font-mono">
          client
        </text>

        <line x1="134" y1="80" x2="330" y2="120" stroke="#f87171" strokeOpacity="0.75" strokeWidth="1.3" strokeDasharray="6 4" markerEnd="url(#r-arrow)" />
        <text x="176" y="92" fontSize="9" className="uppercase fill-red font-mono" letterSpacing="1">
          attaque simulée
        </text>

        <line x1="242" y1="80" x2="336" y2="118" stroke="#22c55e" strokeOpacity="0.75" strokeWidth="1.3" markerEnd="url(#g-arrow)" />
        <text x="252" y="72" fontSize="9" className="uppercase fill-success font-mono" letterSpacing="1">
          accès légitime
        </text>

        <rect x="255" y="120" width="210" height="70" rx="8" className="fill-surface" stroke="#ff7043" strokeOpacity="0.7" />
        <text x="360" y="144" textAnchor="middle" fontSize="13" fontWeight="650" className="fill-copper font-mono">
          OPNsense
        </text>
        <text x="360" y="160" textAnchor="middle" fontSize="8.5" letterSpacing="1.5" className="uppercase fill-ink-dim font-mono">
          pare-feu · zones · politiques
        </text>
        <text x="360" y="176" textAnchor="middle" fontSize="8.5" letterSpacing="1.5" className="uppercase fill-ice font-mono">
          wan / dmz / lan
        </text>

        <rect x="40" y="250" width="280" height="150" rx="10" fill="none" stroke="#67e8f9" strokeOpacity="0.3" strokeDasharray="5 5" />
        <text x="54" y="274" fontSize="10.5" letterSpacing="1.5" className="uppercase fill-ice font-mono">
          dmz · services exposés
        </text>
        <rect x="90" y="300" width="70" height="30" rx="4" className="fill-surface" stroke="#67e8f9" strokeOpacity="0.5" />
        <text x="125" y="319" textAnchor="middle" fontSize="10" className="fill-ink/90 font-mono">
          web
        </text>
        <rect x="190" y="300" width="70" height="30" rx="4" className="fill-surface" stroke="#67e8f9" strokeOpacity="0.5" />
        <text x="225" y="319" textAnchor="middle" fontSize="10" className="fill-ink/90 font-mono">
          mail
        </text>

        <rect x="400" y="250" width="280" height="150" rx="10" fill="none" stroke="#60a5fa" strokeOpacity="0.3" strokeDasharray="5 5" />
        <text x="414" y="274" fontSize="10.5" letterSpacing="1.5" className="uppercase fill-info font-mono">
          lan interne · protégé
        </text>
        <rect x="440" y="300" width="70" height="30" rx="4" className="fill-surface" stroke="#60a5fa" strokeOpacity="0.5" />
        <text x="475" y="319" textAnchor="middle" fontSize="10" className="fill-ink/90 font-mono">
          client
        </text>
        <rect x="540" y="300" width="80" height="30" rx="4" className="fill-surface" stroke="#60a5fa" strokeOpacity="0.5" />
        <text x="580" y="319" textAnchor="middle" fontSize="10" className="fill-ink/90 font-mono">
          serveur
        </text>

        <rect x="310" y="225" width="100" height="34" rx="6" className="fill-surface" stroke="#f87171" strokeOpacity="0.7" />
        <text x="360" y="239" textAnchor="middle" fontSize="9.5" fontWeight="600" className="fill-red font-mono" letterSpacing="0.5">
          Suricata
        </text>
        <text x="360" y="251" textAnchor="middle" fontSize="7.5" letterSpacing="1" className="uppercase fill-ink-dim font-mono">
          ids · analyse
        </text>

        <line x1="330" y1="190" x2="350" y2="225" stroke="#22c55e" strokeOpacity="0.8" strokeWidth="1.3" markerEnd="url(#g-arrow)" />
        <line x1="370" y1="259" x2="200" y2="294" stroke="#22c55e" strokeOpacity="0.8" strokeWidth="1.3" markerEnd="url(#g-arrow)" />
        <text x="210" y="352" fontSize="9" className="uppercase fill-success font-mono" letterSpacing="1">
          trafic analysé
        </text>

        <line x1="420" y1="190" x2="500" y2="250" stroke="#22c55e" strokeOpacity="0.8" strokeWidth="1.3" markerEnd="url(#g-arrow)" />
        <text x="468" y="230" fontSize="9" className="uppercase fill-success font-mono" letterSpacing="1">
          accès contrôlé
        </text>

        <g transform="translate(432,168)">
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="#f87171" strokeWidth="2.4" />
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="#f87171" strokeWidth="2.4" />
          <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
        </g>
        <text x="452" y="172" fontSize="9" className="uppercase fill-red font-mono" letterSpacing="1">
          bloqué
        </text>
      </svg>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        segmentation · détection · journalisation
      </div>
    </motion.div>
  );
}
