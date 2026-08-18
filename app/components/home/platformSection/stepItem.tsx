"use client";

import { motion, type Transition } from "framer-motion";
import { IconType } from "react-icons";

export function StepItem({
  step,
  copy,
  shouldReduceMotion,
  transition,
}: {
  step: { number: string; icon: IconType };
  copy: { label: string; title: string; body: string };
  shouldReduceMotion: boolean | null;
  transition: Transition;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
      className="relative flex gap-md"
    >
      <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-embassy/20 bg-marble text-embassy">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 pt-xxs">
        <div className="flex flex-wrap items-baseline gap-xs">
          <span className="type-label text-embassy">
            {step.number}
          </span>
          <p className="type-label uppercase text-ink-soft">
            {copy.label}
          </p>
        </div>
        <h4 className="mt-xs type-title text-ink-deep">
          {copy.title}
        </h4>
        <p className="mt-xs max-w-[48ch] type-body text-ink-soft">
          {copy.body}
        </p>
      </div>
    </motion.div>
  );
}
