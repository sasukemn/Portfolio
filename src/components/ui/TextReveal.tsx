"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function TextReveal({
  text,
  speed = 40,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;
  const stagger = (speed || 40) / 1000;
  const total = text.length * stagger;

  if (reduced) {
    return (
      <span className={className} aria-label={text}>
        <span aria-hidden="true">{text}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger } },
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.05, ease: "easeOut" } },
            }}
          >
            {char}
          </motion.span>
        ))}
        {inView && (
          <span
            className="type-cursor"
            style={{
              opacity: 1,
              animation: `type-blink 1.1s steps(1) infinite, type-reveal-fade 0.5s ease ${total}s forwards`,
            }}
          />
        )}
      </motion.span>
    </span>
  );
}
