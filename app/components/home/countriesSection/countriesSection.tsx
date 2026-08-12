"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RECRUITMENT_COUNTRIES } from "@/app/constants/countries";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import CountryCard from "./countryCard";

export default function CountriesSection() {
  const t = useTranslation("countries");
  const shouldReduceMotion = useReducedMotion();

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
          transition={revealTransition(shouldReduceMotion)}
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
          {RECRUITMENT_COUNTRIES.map((country, index) => (
            <CountryCard
              key={country.code}
              country={country}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
