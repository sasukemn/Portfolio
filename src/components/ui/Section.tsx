"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSectionActive } from "@/components/ui/useSectionActive";

export function Section({
  id,
  index,
  service,
  tag,
  title,
  subtitle,
  children,
  className,
}: {
  id: string;
  index: string;
  service: string;
  tag?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, active } = useSectionActive();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-24 px-5 md:px-10 lg:px-16 py-24 md:py-32 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-ink-dim uppercase">
            <span className="text-ice">{index}</span>
            <span className="text-copper">{"//"}</span>
            <span>{service}</span>
            {tag && (
              <>
                <span className="text-ink-dim/50">·</span>
                <span className="text-ink-dim/70">{tag}</span>
              </>
            )}
          </div>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight text-ink">
              {title}
            </h2>
            <div className="h-px flex-1 max-w-40 bg-gradient-to-r from-ice/50 to-transparent" />
          </div>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-ink-dim text-base md:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
