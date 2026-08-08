"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import { BD, EG, ID, IN, PH, PK } from "country-flag-icons/react/3x2";
import type { IconType } from "react-icons";
import {
  RECRUITMENT_COUNTRIES,
  type RecruitmentCountryKey,
} from "@/app/constants/countries";
import { useTranslation } from "@/app/hooks/useTranslations";

const COUNTRY_FLAGS: Record<string, typeof IN> = {
  IN,
  EG,
  PK,
  BD,
  PH,
  ID,
};

const COUNTRY_MARKS: Record<RecruitmentCountryKey, IconType> = {
  india: FiGlobe,
  egypt: FiGlobe,
  pakistan: FiGlobe,
  bangladesh: FiGlobe,
  philippines: FiGlobe,
  indonesia: FiGlobe,
};

export default function CountriesSection() {
  const t = useTranslation("countries");
  const shouldReduceMotion = useReducedMotion();

  const revealTransition = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.55, delay, ease: "easeOut" as const };

  return (
    <section
      id="countries"
      aria-labelledby="countries-title"
      aria-label={t.ariaLabel}
      className="relative overflow-hidden bg-parchment text-ink-deep"
    >
      <div
        className="pointer-events-none absolute end-0 top-0 h-full w-1/4 border-s border-embassy/5 bg-marble/45"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full px-sm py-xxl sm:px-md lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition()}
          className="grid gap-lg border-b border-embassy/15 pb-lg lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] lg:items-end lg:gap-xxl"
        >
          <div>
            <h2
              id="countries-title"
              className="max-w-[15ch] text-balance font-headline text-display font-bold leading-[1.08] text-embassy"
            >
              {t.title}
            </h2>
            <p className="mt-md max-w-[60ch] text-pretty text-body leading-8 text-ink-soft">
              {t.body}
            </p>
          </div>

          <div className="flex items-end gap-sm border-s border-court-gold ps-md lg:justify-self-end">
            <span className="font-headline text-display font-bold leading-none text-court-gold">
              {String(RECRUITMENT_COUNTRIES.length).padStart(2, "0")}
            </span>
            <div className="pb-xxs">
              <p className="text-label font-label uppercase tracking-[0.1em] text-embassy">
                {t.registryLabel}
              </p>
              <p className="mt-xxs max-w-[22ch] text-label leading-5 text-ink-soft">
                {t.registryNote}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="relative mt-lg grid gap-sm sm:grid-cols-2 lg:grid-cols-3">
          {RECRUITMENT_COUNTRIES.map((country, index) => {
            const Flag = COUNTRY_FLAGS[country.code];
            const Mark = COUNTRY_MARKS[country.key];
            const copy = t.items[country.key];

            return (
              <motion.article
                key={country.code}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={revealTransition(0.08 + index * 0.05)}
                className="group relative min-h-60 overflow-hidden rounded-md border border-embassy/10 bg-marble p-md transition-shadow duration-200 hover:shadow-float"
              >
                <span
                  className="pointer-events-none absolute -end-2 -top-5 font-title text-6xl font-semibold leading-none text-embassy/[0.035] sm:text-[6rem]"
                  aria-hidden="true"
                >
                  {country.code}
                </span>

                <div className="relative flex items-start justify-between gap-sm">
                  <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-embassy/10 bg-parchment p-1">
                    <Flag
                      className="h-full w-full object-cover"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-embassy/10 text-court-gold transition-colors duration-200 group-hover:border-court-gold/60">
                    <Mark className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative mt-xl">
                  <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.1em] text-ink-soft">
                    <span>{country.code}</span>
                    <span
                      className="h-px w-5 bg-court-gold/60"
                      aria-hidden="true"
                    />
                    <span>{t.regions[country.region]}</span>
                  </div>
                  <h3 className="mt-xs text-balance font-title text-title font-semibold leading-tight text-embassy">
                    {copy.name}
                  </h3>
                  <p className="mt-sm text-pretty text-body leading-7 text-ink-soft">
                    {copy.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
