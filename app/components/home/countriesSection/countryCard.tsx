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

type CountriesCopy = (typeof en)["countries"];
type RecruitmentCountry = (typeof RECRUITMENT_COUNTRIES)[number];

interface CountryCardProps {
  country: RecruitmentCountry;
  shouldReduceMotion: boolean | null;
  t: CountriesCopy;
}

export default function CountryCard({
  country,
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
      className="group relative min-h-60 overflow-hidden rounded-lg border border-embassy/10 bg-marble p-md transition-shadow duration-200 hover:shadow-float sm:p-lg"
    >
      <div className="relative flex items-start justify-between gap-sm">
        <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-embassy/10 bg-parchment p-1">
          <Flag className="h-full w-full object-cover" aria-hidden="true" />
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-embassy/20 text-embassy transition-colors duration-200 group-hover:border-embassy/40">
          <Mark className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="relative mt-xl">
        <div className="flex items-center gap-xs type-label uppercase text-ink-soft">
          <span>{country.code}</span>
          <span className="h-px w-5 bg-embassy/25" aria-hidden="true" />
          <span>{t.regions[country.region]}</span>
        </div>
        <h3 className="mt-xs text-balance type-title text-embassy">
          {copy.name}
        </h3>
        <p className="mt-sm text-pretty type-body text-ink-soft">
          {copy.description}
        </p>
        <p className="mt-md flex flex-wrap items-baseline gap-xs border-t border-embassy/10 pt-md">
          <span className="type-label uppercase text-ink-soft">
            {t.priceFrom}
          </span>
          <span className="font-headline text-[2rem] font-semibold leading-none tracking-tight text-court-gold">
            {copy.price}
          </span>
          <span className="type-label text-ink-soft">
            {t.currency}
          </span>
        </p>
      </div>
    </motion.article>
  );
}
