"use client";

import { IDENTITY, CONTACT } from "@/lib/siteConfig";
import { useSite } from "@/lib/site";

export function Footer() {
  const { theme, toggleTheme } = useSite();

  return (
    <footer className="relative z-10 border-t border-line-soft px-5 md:px-10 lg:px-16 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-ink">
            <span className="text-ice">❯</span> northstack
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-dim">
            {IDENTITY.displayName} — {IDENTITY.role} · {IDENTITY.roleSecondary}.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-dim">{IDENTITY.tagline}</p>
        </div>

        <div className="flex gap-10 font-mono text-[11px] uppercase tracking-widest">
          <div>
            <div className="eng-note text-copper">navigation</div>
            <ul className="mt-3 space-y-2">
              {[
                ["About", "about"],
                ["Projects", "projects"],
                ["Stack", "stack"],
                ["Lab", "lab"],
                ["Learning", "learning"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-ink-dim transition-colors hover:text-ice"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eng-note text-copper">liens</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-ink-dim transition-colors hover:text-ice"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-dim transition-colors hover:text-ice"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-dim transition-colors hover:text-ice"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="text-ink-dim transition-colors hover:text-ice">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-6 font-mono text-[10px] uppercase tracking-widest text-ink-dim">
        <span>
          © {new Date().getFullYear()} {IDENTITY.monogram.toLowerCase()} · northstack v2
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          tous les contenus sont réels
        </span>
        <button
          onClick={toggleTheme}
          className="transition-colors hover:text-ice"
          aria-label="Basculer le thème"
        >
          {theme === "night" ? "thème: nuit ◐" : "thème: glacier ◑"}
        </button>
      </div>
    </footer>
  );
}
