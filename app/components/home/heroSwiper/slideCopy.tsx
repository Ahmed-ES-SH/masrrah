"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import type { HeroSlideId } from "@/app/types/hero-slide";

const CTA_FOCUS_CLASSES =
  "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold";

const PRIMARY_CTA_CLASSES = `group inline-flex min-h-12 flex-1 items-center justify-center gap-xs rounded-md bg-court-gold px-md text-body font-semibold text-embassy shadow-apparatus hover:bg-gilded-light ${CTA_FOCUS_CLASSES}`;

const SECONDARY_CTA_CLASSES = `inline-flex min-h-12 whitespace-nowrap flex-1 items-center justify-center rounded-md border border-ink-deep/30 px-md text-body font-semibold text-embassy hover:border-ink-deep/60 hover:bg-embassy/5 ${CTA_FOCUS_CLASSES}`;

export type HeroTranslations =
  (typeof import("@/app/translations/ar.json"))["hero"];
type SlideCopyData = HeroTranslations["slides"][HeroSlideId];

export function SlideCopy({
  copy,
  slideKey,
  transition,
  reducedMotion,
}: {
  copy: SlideCopyData;
  slideKey: HeroSlideId;
  transition: Transition;
  reducedMotion: boolean | null;
}) {
  return (    <div
      id="hero-slide-copy"
      aria-live="polite"
      aria-atomic="true"
      className="w-full"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slideKey}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
          transition={transition}
          className="relative w-full max-w-[640px] border-s-2 border-embassy/30 ps-md sm:ps-lg"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-lg bg-parchment/60 blur-3xl"
          />

          <div className="mb-md flex items-center gap-sm type-label uppercase text-embassy">
            <span
              className="h-px w-8 bg-embassy/40"
              aria-hidden="true"
            />
            <span>{copy.eyebrow}</span>
          </div>

          <h1 className="max-w-3xl type-hero-display text-balance text-embassy sm:max-w-[30rem]">
            {copy.headline}
          </h1>

          <p className="mt-md max-w-[50ch] type-body-lg text-ink-soft sm:max-w-[48ch]">
            {copy.body}
          </p>

          <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:gap-sm">
            <Link href="#services" className={PRIMARY_CTA_CLASSES}>
              <span className="whitespace-nowrap">{copy.primaryCta}</span>
              <FiArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]"
                aria-hidden="true"
              />
            </Link>
            <Link href="#services" className={SECONDARY_CTA_CLASSES}>
              {copy.secondaryCta}
            </Link>
          </div>

          <div className="mt-xl border-t border-ink-deep/10 pt-md">
            <div className="flex flex-wrap items-center justify-between gap-sm">
              <div className="flex items-center gap-sm type-label text-ink-soft">
                <span
                  className="h-2 w-2 rounded-full bg-court-gold"
                  aria-hidden="true"
                />
                <span>{copy.metric}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
