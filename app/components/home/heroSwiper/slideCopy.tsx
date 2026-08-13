"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { FiArrowUpRight, FiShield } from "react-icons/fi";
import type { HeroSlideId } from "@/app/types/hero-slide";
import { SITE_LICENSE_NUMBER } from "@/app/constants/site";
import { useTranslation } from "@/app/hooks/useTranslations";

const CTA_FOCUS_CLASSES =
  "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt";

const PRIMARY_CTA_CLASSES = `group inline-flex min-h-12 flex-1 items-center justify-center gap-xs rounded-md bg-court-gold px-md text-title font-semibold text-embassy shadow-apparatus hover:bg-gilded-light ${CTA_FOCUS_CLASSES}`;

const SECONDARY_CTA_CLASSES = `inline-flex min-h-12 whitespace-nowrap flex-1 items-center justify-center rounded-md border border-champagne-gilt/35 px-md text-title font-semibold text-parchment hover:border-champagne-gilt hover:bg-chancery/75 ${CTA_FOCUS_CLASSES}`;

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
  const t = useTranslation("navbar");
  return (
    <div
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
          className="relative w-full max-w-[640px] border-s-2 border-champagne-gilt/60 ps-md sm:ps-lg"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-lg bg-chancery/60 blur-3xl"
          />

          <div className="mb-md flex items-center gap-sm text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
            <span
              className="h-px w-8 bg-champagne-gilt/60"
              aria-hidden="true"
            />
            <span>{copy.eyebrow}</span>
          </div>

          <h1 className="max-w-3xl bg-gradient-to-r from-court-gold via-champagne-gilt to-gilded-light bg-clip-text font-headline text-hero-display font-bold leading-[1.15] text-balance text-transparent drop-shadow-hero-title sm:max-w-[30rem]">
            {copy.headline}
          </h1>

          <p className="mt-md max-w-[50ch] text-title font-medium leading-8 text-parchment/95 drop-shadow-hero-copy sm:max-w-[48ch]">
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
            <Link href="#packages" className={SECONDARY_CTA_CLASSES}>
              {copy.secondaryCta}
            </Link>
          </div>

          <div className="mt-xl border-t border-champagne-gilt/20 pt-md">
            <div className="flex flex-wrap items-center justify-between gap-sm">
              <div className="flex items-center gap-sm text-label text-parchment/80">
                <span
                  className="h-2 w-2 rounded-full bg-parchment/30"
                  aria-hidden="true"
                />
                <span>{copy.metric}</span>
              </div>

              <div
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-champagne-gilt/30 bg-gradient-to-br from-chancery/70 to-embassy/80 py-1 ps-1 pe-2.5 shadow-float backdrop-blur-sm sm:gap-2 sm:pe-3"
                title={`${t.license.label} ${SITE_LICENSE_NUMBER}`}
                aria-label={`${t.license.label} ${SITE_LICENSE_NUMBER}`}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-court-gold/15 ring-1 ring-inset ring-champagne-gilt/45 sm:h-6 sm:w-6"
                  aria-hidden="true"
                >
                  <FiShield
                    className="h-3 w-3 text-champagne-gilt sm:h-3.5 sm:w-3.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="hidden text-label font-label uppercase tracking-[0.13em] text-parchment/75 sm:inline">
                  {t.license.label}
                </span>
                <span
                  dir="ltr"
                  className="font-headline text-[0.9375rem] font-bold tabular-nums leading-none text-court-gold"
                >
                  {SITE_LICENSE_NUMBER}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
