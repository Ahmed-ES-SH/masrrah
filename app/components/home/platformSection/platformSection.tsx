"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiCheck,
  FiClipboard,
  FiGlobe,
  FiHeadphones,
  FiSearch,
} from "react-icons/fi";
import { SITE_WHATSAPP } from "@/app/constants/site";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import { StepItem } from "./stepItem";

type PlatformStepKey = "request" | "screening" | "arrival" | "support";

const PLATFORM_STEPS: {
  key: PlatformStepKey;
  number: string;
  icon: IconType;
}[] = [
  { key: "request", number: "01", icon: FiClipboard },
  { key: "screening", number: "02", icon: FiSearch },
  { key: "arrival", number: "03", icon: FiGlobe },
  { key: "support", number: "04", icon: FiHeadphones },
];

const WHATSAPP_URL = `https://wa.me/${SITE_WHATSAPP}`;

export default function PlatformSection() {
  const t = useTranslation("platform");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      aria-labelledby="platform-title"
      aria-label={t.ariaLabel}
      className="relative isolate scroll-mt-24 overflow-hidden bg-embassy text-parchment"
    >
      <div
        className="pointer-events-none absolute inset-y-0 start-0 w-1/2 bg-chancery/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full  gap-xl px-sm py-xxl sm:px-md lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-xxl lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition(shouldReduceMotion)}
        >
          <div className="mb-md flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
            <span className="text-court-gold" aria-hidden="true">
              ◆
            </span>
            <span>{t.eyebrow}</span>
          </div>

          <h2
            id="platform-title"
            className="max-w-[18ch] font-headline text-display font-bold leading-[1.12] text-parchment"
          >
            {t.title}
          </h2>

          <p className="mt-md max-w-[54ch] text-body leading-8 text-parchment/75">
            {t.body}
          </p>

          <div className="mt-xl border-s-2 border-court-gold ps-md">
            <p className="text-title font-semibold leading-8 text-parchment">
              {t.promise}
            </p>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-md inline-flex min-h-12 w-full items-center justify-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt sm:w-auto"
            >
              <span>{t.action}</span>
              <FiArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition(shouldReduceMotion, 0.12)}
          className="relative rounded-lg border border-champagne-gilt/20 bg-chancery/80 p-md sm:p-lg"
        >
          <div className="flex items-start justify-between gap-md border-b border-champagne-gilt/15 pb-md">
            <div>
              <p className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
                {t.panel.label}
              </p>
              <h3 className="mt-xs font-title text-title font-semibold text-parchment">
                {t.panel.title}
              </h3>
            </div>
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-court-gold/40 text-court-gold"
              aria-hidden="true"
            >
              <FiCheck className="h-5 w-5" />
            </span>
          </div>

          <div className="relative pt-lg">
            <motion.span
              initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={revealTransition(shouldReduceMotion, 0.18)}
              className="absolute bottom-6 start-md top-14 w-px origin-top bg-court-gold/45"
              aria-hidden="true"
            />

            <div className="relative space-y-lg">
              {PLATFORM_STEPS.map((step, index) => (
                <StepItem
                  key={step.key}
                  step={step}
                  copy={t.steps[step.key]}
                  shouldReduceMotion={shouldReduceMotion}
                  transition={revealTransition(shouldReduceMotion, 0.22 + index * 0.08)}
                />
              ))}
            </div>
          </div>

          <p className="mt-lg border-t border-champagne-gilt/15 pt-md text-label leading-6 text-parchment/55">
            {t.panel.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
