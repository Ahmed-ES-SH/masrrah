"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FiCompass,
  FiGitMerge,
  FiHeart,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import Section from "@/app/components/common/Section";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";

type ValueKey = "teamwork" | "foresight" | "commitment" | "passion" | "alignment";

const VALUES: ReadonlyArray<{ key: ValueKey; icon: IconType }> = [
  { key: "teamwork", icon: FiUsers },
  { key: "foresight", icon: FiCompass },
  { key: "commitment", icon: FiTarget },
  { key: "passion", icon: FiHeart },
  { key: "alignment", icon: FiGitMerge },
];

export default function WhoUs() {
  const t = useTranslation("whoUs");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="about"
      ariaLabel={t.ariaLabel}
      ariaLabelledBy="who-us-title"
      className="isolate scroll-mt-24 bg-marble text-ink-deep"
      clip
      decor={
        <div
          className="pointer-events-none absolute inset-y-0 end-0 w-1/4 border-s border-embassy/5 bg-parchment/45"
          aria-hidden="true"
        />
      }
    >
      <div className="grid gap-xl lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-xxl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={revealTransition(shouldReduceMotion)}
        >
          <p className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-embassy">
            <span aria-hidden="true">◆</span>
            <span>{t.eyebrow}</span>
          </p>
          <h2
            id="who-us-title"
            className="mt-sm max-w-[17ch] text-balance font-headline text-display font-bold leading-[1.08] text-embassy"
          >
            {t.title}
          </h2>
          <p className="mt-md max-w-[48ch] text-pretty text-body leading-8 text-ink-soft">
            {t.introduction}
          </p>

          <div className="mt-xl border-s-2 border-court-gold ps-md">
            <p className="text-label font-label uppercase tracking-[0.12em] text-ink-soft">
              {t.commitmentLabel}
            </p>
            <p className="mt-xs max-w-[44ch] text-title font-semibold leading-8 text-ink-deep">
              {t.commitment}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition(shouldReduceMotion, 0.1)}
          className="relative overflow-hidden rounded-lg border border-champagne-gilt/30 bg-embassy p-md text-parchment sm:p-lg"
        >
          <div
            className="pointer-events-none absolute end-lg top-lg text-hero-display leading-none text-champagne-gilt/10"
            aria-hidden="true"
          >
            ◆
          </div>

          <p className="relative text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
            {t.charterLabel}
          </p>
          <p className="relative mt-md max-w-[43ch] text-title font-medium leading-8 text-parchment">
            {t.about}
          </p>

          <dl className="relative mt-xl grid gap-md border-t border-champagne-gilt/25 pt-lg sm:grid-cols-2">
            <div className="border-s border-champagne-gilt/30 ps-md">
              <dt className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
                {t.vision.label}
              </dt>
              <dd className="mt-xs text-body leading-7 text-parchment">{t.vision.body}</dd>
            </div>
            <div className="border-s border-champagne-gilt/30 ps-md">
              <dt className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
                {t.mission.label}
              </dt>
              <dd className="mt-xs text-body leading-7 text-parchment">{t.mission.body}</dd>
            </div>
          </dl>
        </motion.div>
      </div>

      <div className="mt-xxl border-t border-embassy/15 pt-lg">
        <div className="flex flex-wrap items-baseline justify-between gap-sm">
          <h3 className="font-headline text-headline font-bold text-embassy">
            {t.valuesTitle}
          </h3>
          <p className="max-w-[42ch] text-body leading-7 text-ink-soft">{t.valuesIntroduction}</p>
        </div>

        <ul className="mt-lg grid gap-sm sm:grid-cols-2 xl:grid-cols-5">
          {VALUES.map(({ key, icon: Icon }, index) => {
            const value = t.values[key];

            return (
              <motion.li
                key={key}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={revealTransition(shouldReduceMotion, index * 0.06, 0.42)}
                className="min-h-56 rounded-lg border border-embassy/15 bg-parchment/55 p-md sm:p-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-embassy/20 text-embassy">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="mt-lg font-title text-title font-semibold text-embassy">
                  {value.title}
                </h4>
                <p className="mt-xs text-body leading-7 text-ink-soft">{value.body}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
