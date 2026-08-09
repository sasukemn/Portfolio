// ============================================================
// GITHUB — données RÉELLES uniquement.
// Aucune statistique fictive : si l'API n'est pas configurée
// (NEXT_PUBLIC_GITHUB_USER), la section affiche un état
// « source non configurée » au lieu de chiffres inventés.
// ============================================================

"use client";

import { useEffect, useState } from "react";

export type GitHubStats = {
  username: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  totalIssues: number;
  languages: { name: string; value: number }[];
  repos: { name: string; stars: number; forks: number; language: string; description: string }[];
};

export function useGitHubStats(): { stats: GitHubStats | null; live: boolean } {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const user = process.env.NEXT_PUBLIC_GITHUB_USER;
    if (!user) return;
    const cacheKey = `polar-github-${user}`;
    let cancelled = false;
    const restore = setTimeout(() => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setStats(JSON.parse(cached));
          setLive(true);
        }
      } catch {
        /* ignore */
      }
    }, 0);

    fetch(`https://api.github.com/users/${user}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(async (u) => {
        const reposRes = await fetch(
          `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
        );
        if (!reposRes.ok) throw new Error("repos");
        const repos: {
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          name: string;
          description: string | null;
          open_issues_count: number;
        }[] = await reposRes.json();
        const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
        const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);
        const langMap = new Map<string, number>();
        for (const r of repos) {
          if (r.language) langMap.set(r.language, (langMap.get(r.language) ?? 0) + 1);
        }
        const languages = [...langMap.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, value: count }));
        const next: GitHubStats = {
          username: user,
          followers: u.followers ?? 0,
          publicRepos: u.public_repos ?? repos.length,
          totalStars,
          totalForks,
          totalIssues: repos.reduce((a, r) => a + r.open_issues_count, 0),
          languages,
          repos: repos
            .slice(0, 5)
            .map((r) => ({
              name: r.name,
              stars: r.stargazers_count,
              forks: r.forks_count,
              language: r.language ?? "—",
              description: r.description ?? "",
            })),
        };
        if (!cancelled) {
          setStats(next);
          setLive(true);
          localStorage.setItem(cacheKey, JSON.stringify(next));
        }
      })
      .catch(() => {
        /* keep "not configured" state — no fake data */
      });
    return () => {
      cancelled = true;
      clearTimeout(restore);
    };
  }, []);

  return { stats, live };
}
