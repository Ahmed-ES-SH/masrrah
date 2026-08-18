"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiCompass, FiGitMerge, FiHeart, FiTarget, FiUsers } from "react-icons/fi";
import Section from "@/app/components/common/Section";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import { ValueItem } from "./valueItem";

type ValueKey = "teamwork" | "visionary" | "commitment" | "passion" | "alignment";

const VALUES: ReadonlyArray<{ key: ValueKey; icon: IconType }> = [
  { key: "teamwork", icon: FiUsers },
  { key: "visionary", icon: FiCompass },
  { key: "commitment", icon: FiTarget },
  { key: "passion", icon: FiHeart },
  { key: "alignment", icon: FiGitMerge },
];

function CompassRing() {
  const ticks = Array.from({ length: 36 }, (_, index) => index * 10);

  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className="pointer-events-none absolute -end-44 -top-44 w-[560px] max-w-none text-embassy/10"
    >
      <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 7"
      />
      {ticks.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 200 + 150 * Math.cos(rad);
        const y1 = 200 + 150 * Math.sin(rad);
        const x2 = 200 + 162 * Math.cos(rad);
        const y2 = 200 + 162 * Math.sin(rad);

        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.75"
          />
        );
      })}
      <line x1="200" y1="200" x2="200" y2="58" stroke="currentColor" strokeWidth="2" />
      <path d="M200 42 L209 76 L200 69 L191 76 Z" fill="currentColor" />
      <line
        x1="200"
        y1="200"
        x2="200"
        y2="344"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
    </svg>
  );
}

export default function ValuesSection() {
  const t = useTranslation("about");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="about-values"
      ariaLabel={t.values.ariaLabel}
      ariaLabelledBy="about-values-title"
      className="isolate bg-sand text-ink-deep"
      clip
      decor={
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition(shouldReduceMotion)}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <CompassRing />
        </motion.div>
      }
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={revealTransition(shouldReduceMotion)}
      >
        <p className="flex items-center gap-xs type-label uppercase text-embassy">
          <span aria-hidden="true">◆</span>
          <span>{t.values.eyebrow}</span>
        </p>
        <div className="mt-sm flex flex-wrap items-end justify-between gap-sm">
          <h2
            id="about-values-title"
            className="max-w-[18ch] type-display text-embassy"
          >
            {t.values.title}
          </h2>
          <p className="max-w-[42ch] type-body text-ink-soft">
            {t.values.introduction}
          </p>
        </div>
      </motion.div>

      <ul className="mt-lg grid gap-sm sm:grid-cols-2 xl:grid-cols-3">
        {VALUES.map(({ key, icon }, index) => {
          const value = t.values.items[key];

          return (
            <ValueItem
              key={key}
              icon={icon}
              title={value.title}
              body={value.body}
              shouldReduceMotion={shouldReduceMotion}
              transition={revealTransition(shouldReduceMotion, index * 0.06, 0.42)}
            />
          );
        })}
      </ul>
    </Section>
  );
}