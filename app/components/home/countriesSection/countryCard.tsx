"use client";

import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import { BD, ET, KE, LK, PH, PK } from "country-flag-icons/react/3x2";
import type { IconType } from "react-icons";
import type en from "@/app/translations/en.json";
import {
  RECRUITMENT_COUNTRIES,
  type RecruitmentCountryKey,
} from "@/app/constants/countries";
import { revealTransition } from "@/app/helpers/transitions";

const COUNTRY_FLAGS: Record<string, typeof LK> = {
  LK,
  ET,
  KE,
  BD,
  PH,
  PK,
};

const COUNTRY_MARKS: Record<RecruitmentCountryKey, IconType> = {
  sriLanka: FiGlobe,
  ethiopia: FiGlobe,
  kenya: FiGlobe,
  bangladesh: FiGlobe,
  philippines: FiGlobe,
  pakistan: FiGlobe,
};

type CountriesCopy = typeof en["countries"];
type RecruitmentCountry = (typeof RECRUITMENT_COUNTRIES)[number];

interface CountryCardProps {
  country: RecruitmentCountry;
  index: number;
  shouldReduceMotion: boolean | null;
  t: CountriesCopy;
}

export default function CountryCard({
  country,
  index,
  shouldReduceMotion,
  t,
}: CountryCardProps) {
  const Flag = COUNTRY_FLAGS[country.code];
  const Mark = COUNTRY_MARKS[country.key];
  const copy = t.items[country.key];

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={revealTransition(shouldReduceMotion, 0.08 + index * 0.05)}
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
          <Flag className="h-full w-full object-cover" aria-hidden="true" />
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-embassy/10 text-court-gold transition-colors duration-200 group-hover:border-court-gold/60">
          <Mark className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="relative mt-xl">
        <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.1em] text-ink-soft">
          <span>{country.code}</span>
          <span className="h-px w-5 bg-court-gold/60" aria-hidden="true" />
          <span>{t.regions[country.region]}</span>
        </div>
        <h3 className="mt-xs text-balance font-title text-title font-semibold leading-tight text-embassy">
          {copy.name}
        </h3>
        <p className="mt-sm text-pretty text-body leading-7 text-ink-soft">
          {copy.description}
        </p>
        <p className="mt-md flex flex-wrap items-baseline gap-xs border-t border-embassy/10 pt-md">
          <span className="text-label font-label uppercase tracking-[0.1em] text-ink-soft">
            {t.priceFrom}
          </span>
          <span className="font-headline text-[2rem] font-bold leading-none tracking-tight text-court-gold">
            {copy.price}
          </span>
          <span className="text-label font-semibold text-ink-soft">
            {t.currency}
          </span>
        </p>
      </div>
    </motion.article>
  );
}
