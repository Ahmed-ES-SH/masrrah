"use client";

import { motion, type Transition } from "framer-motion";
import type { IconType } from "react-icons";

export function ValueItem({
  icon,
  title,
  body,
  shouldReduceMotion,
  transition,
}: {
  icon: IconType;
  title: string;
  body: string;
  shouldReduceMotion: boolean | null;
  transition: Transition;
}) {
  const Icon = icon;

  return (
    <motion.li
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={transition}
      className="group flex h-full flex-col border border-ink-deep/10 bg-marble p-md transition-[border-color,background-color] duration-200 hover:border-court-gold/55 hover:bg-parchment sm:p-lg"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-court-gold/45 bg-court-gold/15 text-court-gold transition-colors duration-200 group-hover:border-court-gold/70 group-hover:bg-court-gold/25">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-lg type-title text-embassy">
        {title}
      </h3>
      <p className="mt-xs type-body text-ink-soft">{body}</p>
    </motion.li>
  );
}