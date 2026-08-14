"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Section from "@/app/components/common/Section";
import { revealTransition } from "@/app/helpers/transitions";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

function GateArchMotif() {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute end-[4vw] top-1/2 h-[46vh] max-h-[420px] -translate-y-1/2 text-court-gold/55 stroke-court-gold/20"
    >
      <path d="M26 250 V120 C26 40 194 40 194 120 V250" strokeWidth="2" />
      <path d="M40 250 V122 C40 56 180 56 180 122 V250" strokeWidth="1" />
      <path d="M110 10 L116 26 H104 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function HeroSection() {
  const t = useTranslation("about");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      ariaLabel={t.ariaLabel}
      className="isolate overflow-hidden bg-embassy text-parchment"
      clip
      containerClassName="flex min-h-[72svh] flex-col justify-center pt-32 pb-24 sm:pt-36 lg:min-h-[78svh]"
      decor={
        <>
          <Image
            src="/hero/slide-2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-embassy via-embassy/70 to-embassy/20 rtl:lg:bg-gradient-to-l ltr:lg:bg-gradient-to-r" />
          <div className="absolute inset-0 bg-embassy/10" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-court-gold/40"
            aria-hidden="true"
          />
          <GateArchMotif />
        </>
      }
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={revealTransition(shouldReduceMotion)}
        className="relative max-w-3xl rounded-lg border border-champagne-gilt/25 bg-embassy/75 p-md sm:p-xl"
      >
        <p className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
          <span aria-hidden="true">◆</span>
          <span>{t.hero.eyebrow}</span>
        </p>

        <h1 className="mt-md max-w-[16ch] text-balance font-headline text-display font-bold leading-[1.08] text-parchment [text-shadow:var(--drop-shadow-hero-title)]">
          {t.hero.title}
        </h1>

        <p className="mt-md max-w-[52ch] text-pretty text-body leading-8 text-parchment/90 [text-shadow:var(--drop-shadow-hero-copy)]">
          {t.hero.body}
        </p>

        <Link
          href={`/${locale}/request`}
          className="group mt-lg inline-flex min-h-12 w-full items-center justify-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt sm:w-auto"
        >
          <span>{t.hero.action}</span>
          <FiArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </Section>
  );
}