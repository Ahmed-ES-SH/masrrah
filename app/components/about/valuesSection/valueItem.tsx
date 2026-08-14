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
      className="group flex h-full flex-col border border-champagne-gilt/20 p-md transition-[border-color,background-color] duration-200 hover:border-court-gold/55 hover:bg-chancery/60 sm:p-lg"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-court-gold/45 bg-embassy/40 text-court-gold transition-colors duration-200 group-hover:border-champagne-gilt group-hover:text-champagne-gilt">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-lg font-title text-title font-semibold text-parchment">
        {title}
      </h3>
      <p className="mt-xs text-body leading-7 text-parchment/75">{body}</p>
    </motion.li>
  );
}