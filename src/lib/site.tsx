"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const SERVICES = [
  { id: "about", index: "00", label: "About", tag: "identity" },
  { id: "projects", index: "01", label: "Projects", tag: "workloads" },
  { id: "stack", index: "02", label: "Stack", tag: "technologies" },
  { id: "lab", index: "03", label: "Lab", tag: "infrastructure" },
  { id: "learning", index: "04", label: "Learning", tag: "roadmap" },
  { id: "github", index: "05", label: "GitHub", tag: "source" },
  { id: "terminal", index: "06", label: "Terminal", tag: "console" },
  { id: "contact", index: "07", label: "Contact", tag: "gateway" },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
export type Theme = "night" | "glacier";

type SiteState = {
  booted: boolean;
  markBooted: () => void;
  theme: Theme;
  active: ServiceId;
  setActive: (id: ServiceId) => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteState | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState<Theme>("night");
  const [active, setActive] = useState<ServiceId>("about");

  useEffect(() => {
    const t = setTimeout(() => {
      const root = document.documentElement;
      const stored = window.localStorage.getItem("polar-theme") as Theme | null;
      const initial = stored === "glacier" ? "glacier" : "night";
      setTheme(initial);
      root.dataset.theme = initial;
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "night" ? "glacier" : "night";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("polar-theme", next);
      return next;
    });
  }, []);

  const markBooted = useCallback(() => setBooted(true), []);

  const value = useMemo(
    () => ({ booted, markBooted, theme, active, setActive, toggleTheme }),
    [booted, markBooted, theme, active, toggleTheme],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
