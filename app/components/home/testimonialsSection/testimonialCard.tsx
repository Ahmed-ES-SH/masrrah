"use client";

import { motion, type Transition } from "framer-motion";
import type { TestimonialItem } from "@/app/constants/testimonials";
import { Stars } from "./stars";

export function TestimonialCard({
  item,
  shouldReduceMotion,
  transition,
}: {
  item: TestimonialItem;
  shouldReduceMotion: boolean | null;
  transition: Transition;
}) {
  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      className="group relative flex min-h-0 flex-col overflow-hidden rounded-lg border border-embassy/10 bg-marble p-md transition-[border-color,box-shadow] duration-150 ease-out hover:border-court-gold/45 hover:shadow-float sm:p-lg"
    >
      <span
        className="pointer-events-none absolute -top-3 start-2 select-none font-headline text-[5rem] font-bold leading-[0.8] text-embassy/[0.04]"
        aria-hidden="true"
      >
        {item.initial}
      </span>

      <div className="relative flex items-center justify-between gap-xs">
        <Stars rating={item.rating} />
        <span className="min-w-0 truncate text-label font-label uppercase tracking-[0.08em] text-ink-soft">
          {item.service}
        </span>
      </div>

      <blockquote className="relative mt-sm flex-1 text-body leading-7 text-ink-soft">
        {item.quote}
      </blockquote>

      <footer className="relative mt-md border-t border-embassy/10 pt-sm">
        <p className="truncate font-title text-title font-semibold leading-tight text-embassy">
          {item.name}
        </p>
        <p className="mt-xxs truncate text-label text-ink-soft">
          {item.role}
          <span className="mx-xs inline-block h-px w-4 translate-y-[-3px] bg-embassy/20" aria-hidden="true" />
          {item.location}
        </p>
      </footer>
    </motion.article>
  );
}
