"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Section from "@/app/components/common/Section";
import { SITE_LICENSE_NUMBER } from "@/app/constants/site";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";

export default function StorySection() {
  const t = useTranslation("about");
  const lt = useTranslation("licenseSection");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="about-story"
      ariaLabelledBy="about-story-title"
      className="isolate bg-parchment text-ink-deep"
      clip
      decor={
        <div
          className="pointer-events-none absolute inset-y-0 end-0 w-1/4 border-s border-embassy/5 bg-marble/50"
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
            <span>{t.story.eyebrow}</span>
          </p>
          <h2
            id="about-story-title"
            className="mt-sm max-w-[16ch] text-balance font-headline text-display font-bold leading-[1.08] text-embassy"
          >
            {t.story.title}
          </h2>

          <div className="mt-md space-y-md">
            {t.story.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="max-w-[52ch] text-pretty text-body leading-8 text-ink-soft"
              >
                {paragraph}
              </p>
            ))}
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
            {t.story.panelLabel}
          </p>

          <dl className="relative mt-lg space-y-lg border-s border-champagne-gilt/30 ps-md">
            <div>
              <dt className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
                {t.story.vision.label}
              </dt>
              <dd className="mt-xs max-w-[46ch] text-body leading-7 text-parchment">
                {t.story.vision.body}
              </dd>
            </div>

            <div>
              <dt className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
                {t.story.mission.label}
              </dt>
              <dd className="mt-xs max-w-[46ch] text-body leading-7 text-parchment">
                {t.story.mission.body}
              </dd>
            </div>

            <div>
              <dt className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
                {lt.licenseLabel}
              </dt>
              <dd className="mt-xs max-w-[46ch] text-body leading-7 text-parchment">
                <span
                  dir="ltr"
                  className="block font-headline text-title font-bold tracking-tight text-court-gold tabular-nums"
                >
                  {SITE_LICENSE_NUMBER}
                </span>
                <Link
                  href={lt.verifyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-sm inline-flex min-h-11 items-center gap-xs text-label font-semibold text-court-gold transition-colors duration-200 hover:text-champagne-gilt focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
                >
                  <span>{lt.verifyLabel}</span>
                  <FiArrowUpRight
                    className="h-4 w-4 rtl:scale-x-[-1]"
                    aria-hidden="true"
                  />
                </Link>
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}