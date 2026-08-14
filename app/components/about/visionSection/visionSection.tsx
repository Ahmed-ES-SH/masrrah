"use client";

import { motion, useReducedMotion } from "framer-motion";
import Section from "@/app/components/common/Section";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";

function GatewayArch({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const draw = shouldReduceMotion
    ? undefined
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.1, ease: "easeOut" as const },
        },
      };
  const keystone = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.4, delay: 1 },
        },
      };

  return (
    <svg
      viewBox="0 0 240 300"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-md -inset-y-lg text-court-gold/55"
    >
      <motion.path
        d="M30 292 V150 C30 44 210 44 210 150 V292"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      />
      <motion.path
        d="M48 292 V150 C48 64 192 64 192 150 V292"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        variants={draw}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      />
      <motion.path
        d="M120 12 L128 30 H112 Z"
        fill="currentColor"
        stroke="none"
        variants={keystone}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      />
    </svg>
  );
}

export default function VisionSection() {
  const t = useTranslation("about");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="about-vision"
      ariaLabelledBy="about-vision-title"
      className="isolate bg-parchment text-ink-deep"
      clip
    >
      <div className="grid gap-xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-xxl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={revealTransition(shouldReduceMotion)}
        >
          <p className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-amendment">
            <span aria-hidden="true">◈</span>
            <span>{t.vision.eyebrow}</span>
          </p>
          <h2
            id="about-vision-title"
            className="mt-sm max-w-[16ch] text-balance font-headline text-display font-bold leading-[1.08] text-embassy"
          >
            {t.vision.title}
          </h2>
          <p className="mt-md max-w-[46ch] text-pretty text-body leading-8 text-ink-soft">
            {t.vision.intro}
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition(shouldReduceMotion, 0.1)}
          className="relative"
        >
          <GatewayArch shouldReduceMotion={shouldReduceMotion} />
          <div className="relative rounded-md bg-embassy px-md py-lg text-parchment sm:px-lg">
            <p className="text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
              {t.vision.visionLabel}
            </p>
            <p className="mt-md max-w-[52ch] text-pretty text-body leading-8 text-parchment/90">
              {t.vision.visionBody}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={revealTransition(shouldReduceMotion, 0.12)}
        className="mt-xl border-t-2 border-court-gold lg:mt-xxl"
      >
        <div className="mt-md flex items-baseline gap-md">
          <p className="shrink-0 text-label font-semibold uppercase tracking-[0.14em] text-embassy">
            {t.vision.missionLabel}
          </p>
          <span className="h-px w-full bg-court-gold/25" aria-hidden="true" />
        </div>
        <p className="mt-md max-w-[64ch] text-pretty text-body leading-8 text-ink-soft">
          {t.vision.missionBody}
        </p>
      </motion.div>
    </Section>
  );
}