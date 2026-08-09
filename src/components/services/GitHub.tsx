"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useGitHubStats } from "@/lib/data/github";
import { CONTACT } from "@/lib/siteConfig";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="panel lift p-4 text-center">
      <div className="font-mono text-2xl font-semibold tabular-nums text-ice">{value}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-ink-dim">{label}</div>
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function GitHub() {
  const { stats, live } = useGitHubStats();

  return (
    <Section
      id="github"
      index="05"
      service="source control"
      tag="source"
      title="GitHub"
      subtitle="Les données viennent directement de l'API GitHub, jamais de chiffres inventés. Si la source n'est pas configurée, la section le dit clairement."
    >
      {!live ? (
        <div className="panel lift mx-auto max-w-2xl p-8 text-center">
          <GitHubIcon className="mx-auto h-8 w-8 text-ink-dim" />
          <div className="eng-note mt-4 text-copper">{"// source non configurée"}</div>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">
            La source GitHub n&apos;est pas configurée. Ajoutez la variable{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-ice">
              NEXT_PUBLIC_GITHUB_USER
            </code>{" "}
            pour afficher les statistiques réelles du compte.
          </p>
          <a
            href={CONTACT.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-5"
          >
            <GitHubIcon className="h-4 w-4" />
            {CONTACT.github}
          </a>
        </div>
      ) : stats ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard label="followers" value={stats.followers} />
            <StatCard label="repos publics" value={stats.publicRepos} />
            <StatCard label="étoiles" value={stats.totalStars} />
            <StatCard label="forks" value={stats.totalForks} />
            <StatCard label="issues ouvertes" value={stats.totalIssues} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="panel lift p-5">
              <div className="eng-note text-copper">{"// langages dominants"}</div>
              <div className="mt-3 space-y-2.5">
                {stats.languages.length === 0 && (
                  <p className="text-sm text-ink-dim">Aucune donnée de langage disponible.</p>
                )}
                {stats.languages.map((l) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-between gap-3 font-mono text-sm"
                  >
                    <span className="text-ink">{l.name}</span>
                    <span className="text-ink-dim tabular-nums">{l.value} dépôts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel lift p-5">
              <div className="eng-note text-copper">{"// dépôts récents"}</div>
              <div className="mt-3 space-y-3">
                {stats.repos.length === 0 && (
                  <p className="text-sm text-ink-dim">Aucun dépôt public.</p>
                )}
                {stats.repos.map((r) => (
                  <a
                    key={r.name}
                    href={`https://github.com/${stats.username}/${r.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded border border-line-soft p-3 transition-colors hover:border-ice/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm text-ice">{r.name}</span>
                      <span className="shrink-0 font-mono text-[10px] text-ink-dim">
                        ★ {r.stars} · ⑂ {r.forks}
                      </span>
                    </div>
                    {r.description && (
                      <p className="mt-1 text-xs leading-relaxed text-ink-dim">{r.description}</p>
                    )}
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                      {r.language}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </Section>
  );
}
