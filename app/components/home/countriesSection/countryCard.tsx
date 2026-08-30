"use client";

import { motion } from "framer-motion";
import { FiGlobe, FiClock } from "react-icons/fi";
import { BD, ET, KE, LK, PH, PK } from "country-flag-icons/react/3x2";
import type en from "@/app/translations/en.json";
import {
  RECRUITMENT_COUNTRIES,
} from "@/app/constants/countries";

const COUNTRY_FLAGS: Record<string, typeof LK> = {
  LK,
  ET,
  KE,
  BD,
  PH,
  PK,
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
  const copy = t.items[country.key];
  const isComingSoon = copy.price === "Soon" || copy.price === "قريباً";

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={
        shouldReduceMotion || isComingSoon
          ? undefined
          : { y: -2 }
      }
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative min-h-60 overflow-hidden rounded-lg p-md transition-shadow duration-200 sm:p-lg ${
        isComingSoon
          ? "border border-dashed border-champagne-gilt/60 bg-marble/80"
          : "border border-embassy/10 bg-marble hover:shadow-float"
      }`}
    >
      {isComingSoon && (
        <span
          className="absolute end-sm top-sm flex h-7 items-center gap-xxs rounded-md border border-champagne-gilt/50 bg-parchment/80 px-xs type-label text-ink-soft"
          aria-label={t.comingSoon}
        >
          <span className="text-[10px] text-court-gold" aria-hidden="true">
            ◆
          </span>
          {t.comingSoon}
        </span>
      )}

      <div className="relative flex items-start justify-between gap-sm">
        <span
          className={`flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-embassy/10 bg-parchment p-1 ${
            isComingSoon ? "opacity-60" : ""
          }`}
        >
          <Flag className="h-full w-full object-cover" aria-hidden="true" />
        </span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
            isComingSoon
              ? "border-champagne-gilt/40 text-ink-soft"
              : "border-embassy/20 text-embassy group-hover:border-embassy/40"
          }`}
        >
          {isComingSoon ? (
            <FiClock className="h-4 w-4" aria-hidden="true" />
          ) : (
            <FiGlobe className="h-4 w-4" aria-hidden="true" />
          )}
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

        {isComingSoon ? (
          <div className="mt-md flex items-center gap-xs border-t border-champagne-gilt/30 pt-md">
            <span
              className="text-[10px] leading-none text-court-gold"
              aria-hidden="true"
            >
              ◆
            </span>
            <span className="type-label uppercase tracking-wider text-ink-soft">
              {t.underRegistration}
            </span>
          </div>
        ) : (
          <p className="mt-md flex flex-wrap items-baseline gap-xs border-t border-embassy/10 pt-md">
            <span className="type-label uppercase text-ink-soft">
              {t.priceFrom}
            </span>
            <span className="font-headline text-[2rem] font-semibold leading-none tracking-tight text-court-gold">
              {copy.price}
            </span>
            <span className="type-label text-ink-soft">{t.currency}</span>
          </p>
        )}
      </div>
    </motion.article>
  );
}
