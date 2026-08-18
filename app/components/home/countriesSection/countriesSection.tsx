"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RECRUITMENT_COUNTRIES } from "@/app/constants/countries";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import Section from "@/app/components/common/Section";
import CountryCard from "./countryCard";

export default function CountriesSection() {
  const t = useTranslation("countries");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="countries"
      aria-labelledby="countries-title"
      aria-label={t.ariaLabel}
      className="bg-parchment text-ink-deep"
      clip
      decor={
        <div
          className="pointer-events-none absolute end-0 top-0 h-full w-1/4 border-s border-embassy/5 bg-marble/45"
          aria-hidden="true"
        />
      }
    >
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
            className="max-w-[15ch] text-balance type-display text-embassy"
          >
            {t.title}
          </h2>
          <p className="mt-md max-w-[60ch] text-pretty type-body-lg text-ink-soft">
            {t.body}
          </p>
        </div>

        <div className="flex items-end gap-sm border-s border-embassy/20 ps-md lg:justify-self-end">
          <div className="pb-xxs">
            <p className="type-label uppercase text-embassy">
              {t.registryLabel}
            </p>
            <p className="mt-xxs max-w-[22ch] type-label text-ink-soft">
              {t.registryNote}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="relative mt-lg grid gap-sm sm:grid-cols-2 lg:grid-cols-3 lg:gap-md">
        {RECRUITMENT_COUNTRIES.map((country, index) => (
          <CountryCard
            key={country.code}
            country={country}
            shouldReduceMotion={shouldReduceMotion}
            t={t}
          />
        ))}
      </div>
    </Section>
  );
}
