"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import { RECRUITMENT_STEPS } from "@/app/constants/steps";
import Section from "@/app/components/common/Section";
import Image from "next/image";

export default function StepsRecruitmentProcess() {
  const t = useTranslation("recruitmentProcess");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="recruitment-process"
      ariaLabelledBy="recruitment-process-title"
      ariaLabel={t.ariaLabel}
      className="isolate scroll-mt-24 bg-marble text-ink-deep"
      clip
      decor={
        <div
          className="pointer-events-none absolute inset-y-0 end-0 w-1/4 border-s border-embassy/5 bg-parchment/45"
          aria-hidden="true"
        />
      }
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={revealTransition(shouldReduceMotion)}
        className="grid gap-lg border-b border-embassy/15 pb-lg lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.55fr)] lg:items-end lg:gap-xxl"
      >
        <div>
          <p className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-embassy">
            <span aria-hidden="true">◆</span>
            <span>{t.eyebrow}</span>
          </p>
          <h2
            id="recruitment-process-title"
            className="mt-sm max-w-[17ch] text-balance font-headline text-display font-bold leading-[1.08] text-embassy"
          >
            {t.title}
          </h2>
          <p className="mt-md max-w-[58ch] text-pretty text-body leading-8 text-ink-soft">
            {t.body}
          </p>
        </div>

        <div className="flex items-start gap-sm border-s border-embassy/20 ps-md lg:justify-self-end">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-embassy/20 text-embassy"
            aria-hidden="true"
          >
            <FiCheck className="h-5 w-5" />
          </span>
          <div className="pt-xxs">
            <p className="text-label font-label uppercase tracking-[0.12em] text-embassy">
              {t.ledgerLabel}
            </p>
            <p className="mt-xxs max-w-[24ch] text-label leading-5 text-ink-soft">
              {t.ledgerNote}
            </p>
          </div>
        </div>
      </motion.div>

      <ol className="relative mt-lg grid gap-sm sm:grid-cols-2 lg:grid-cols-3 lg:gap-md">
        {RECRUITMENT_STEPS.map((step, index) => {
          const copy = t.steps[step.key];
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <motion.li
              key={step.key}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={revealTransition(
                shouldReduceMotion,
                0.08 + index * 0.06,
                0.45,
              )}
              className="relative min-h-64 overflow-hidden rounded-lg border border-embassy/15 bg-marble p-md sm:p-lg"
            >
              <span className="text-label font-label tabular-nums tracking-[0.12em] text-court-gold">
                {stepNumber}
              </span>

              <div className="mt-sm flex items-start justify-between gap-md">
                <div>
                  <p className="text-label font-label uppercase tracking-[0.12em] text-ink-soft">
                    {copy.label}
                  </p>
                  <h3 className="mt-xs max-w-[18ch] font-title text-title font-semibold leading-7 text-embassy">
                    {copy.title}
                  </h3>
                </div>
                <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-md border border-embassy/10 bg-parchment/70 p-sm sm:h-20 sm:w-20">
                  <Image
                    src={step.image}
                    alt=""
                    width={64}
                    height={64}
                    sizes="(min-width: 640px) 64px, 56px"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              <p className="mt-md max-w-[34ch] text-body leading-7 text-ink-soft">
                {copy.body}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
