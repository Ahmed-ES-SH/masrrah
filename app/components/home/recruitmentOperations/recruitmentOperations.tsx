"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RECRUITMENT_OPERATIONS } from "@/app/constants/recruitment-operations";
import Section from "@/app/components/common/Section";
import { revealTransition } from "@/app/helpers/transitions";

function ArchitecturalWatermark() {
  return (
    <svg
      className="pointer-events-none absolute start-0 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 text-ink-soft/10 md:block"
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M85 420H445M120 388H410M143 174H387M160 174V388M240 174V388M320 174V388M400 174V388"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M112 174L260 86L408 174M178 146L260 98L342 146"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M192 388V290C192 252.445 222.445 222 260 222C297.555 222 328 252.445 328 290V388"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M152 420C152 398 170 380 192 380H328C350 380 368 398 368 420"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="260" cy="150" r="18" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

export default function RecruitmentOperations() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="recruitment-operations"
      ariaLabelledBy="recruitment-operations-title"
      className="isolate w-full scroll-mt-24 bg-marble text-embassy"
      clip
      decor={<ArchitecturalWatermark />}
    >
      <div dir="rtl" lang="ar" className="relative w-full">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={revealTransition(shouldReduceMotion)}
          className="mb-lg flex items-end justify-between gap-md border-b border-embassy/10 pb-md"
        >
          <div>
            <p className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-embassy">
              <span aria-hidden="true">◆</span>
              <span>{RECRUITMENT_OPERATIONS.title}</span>
            </p>
            <h2
              id="recruitment-operations-title"
              className="mt-xs font-headline text-display font-bold leading-tight text-embassy"
            >
              {RECRUITMENT_OPERATIONS.title}
            </h2>
          </div>
          <span
            className="hidden h-px min-w-32 flex-1 bg-embassy/10 lg:block"
            aria-hidden="true"
          />
        </motion.div>

        <div className="grid gap-md lg:grid-cols-2">
          {RECRUITMENT_OPERATIONS.columns.map((column, columnIndex) => (
            <motion.article
              key={column.key}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={revealTransition(
                shouldReduceMotion,
                0.08 + columnIndex * 0.08,
                0.5,
              )}
              className="relative overflow-hidden rounded-lg border border-embassy/10 bg-marble p-md"
            >
              <div className="mb-md flex items-center gap-sm">
                <span
                  className="h-8 w-1 rounded-sm bg-court-gold"
                  aria-hidden="true"
                />
                <h3 className="font-title text-title font-bold leading-7 text-embassy">
                  {column.heading}
                </h3>
              </div>

              <ol className="grid gap-sm sm:grid-cols-2">
                {column.steps.map((step, stepIndex) => {
                  const Icon = step.icon;

                  return (
                    <motion.li
                      key={step.text}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 12 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={revealTransition(
                        shouldReduceMotion,
                        0.16 + columnIndex * 0.06 + stepIndex * 0.04,
                        0.42,
                      )}
                      className="group flex min-h-32 items-start gap-sm rounded-md border border-embassy/10 bg-parchment/35 p-sm transition-colors duration-200 ease-out hover:border-embassy/20 hover:bg-parchment/55"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-embassy/10 bg-marble text-diplomacy/75 transition-colors duration-200 ease-out group-hover:text-embassy">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="pt-xxs font-body text-body font-bold leading-7 text-embassy">
                        {step.text}
                      </span>
                    </motion.li>
                  );
                })}
              </ol>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
