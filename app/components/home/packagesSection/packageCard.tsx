"use client";

import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { SITE_WHATSAPP } from "@/app/constants/site";
import type { RecruitmentPackage } from "@/app/constants/packages";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

const WHATSAPP_URL = `https://wa.me/${SITE_WHATSAPP}`;

interface PackageCardProps {
  packageItem: RecruitmentPackage;
  isFeatured: boolean;
  shouldReduceMotion: boolean | null;
  transition: Transition;
}

export function PackageCard({
  packageItem,
  isFeatured,
  shouldReduceMotion,
  transition,
}: PackageCardProps) {
  const locale = useLocale();
  const t = useTranslation("packages");
  const Icon = packageItem.icon;
  const copy = t.items[packageItem.key];

  return (
    <motion.article
      id={`package-${packageItem.key}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      aria-labelledby={`package-${packageItem.key}-title`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border transition-shadow duration-200 hover:shadow-float focus-within:border-court-gold ${
        isFeatured
          ? "border-court-gold/60 shadow-apparatus"
          : "border-champagne-gilt/25 hover:border-court-gold/40"
      }`}
    >
      <div className="relative bg-diplomacy px-md pb-md pt-lg">
        <div className="flex items-start justify-between gap-sm">
          <div className="flex min-w-0 items-center gap-sm">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-court-gold/60 bg-embassy text-court-gold shadow-apparatus"
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-label font-semibold text-parchment">
                {copy.label}
              </p>
              <p className="mt-xxs text-label text-parchment/60">
                {copy.shortDescription}
              </p>
            </div>
          </div>

          {isFeatured && (
            <span className="shrink-0 rounded-full border border-court-gold/60 bg-embassy/80 px-sm py-xxs text-label font-semibold text-champagne-gilt">
              {t.popularLabel}
            </span>
          )}
        </div>

        <p className="mt-md flex flex-wrap items-baseline gap-xs border-t border-champagne-gilt/15 pt-md">
          <span className="text-label uppercase tracking-[0.1em] text-champagne-gilt/70">
            {t.priceFrom}
          </span>
          <span className="font-headline text-[2.4rem] font-bold leading-none tracking-tight text-court-gold">
            {copy.price}
          </span>
          <span className="text-label font-semibold text-champagne-gilt">
            {t.currency}
          </span>
        </p>
      </div>

      <div className="flex flex-1 flex-col bg-parchment p-md text-ink-deep sm:p-lg">
        <h3
          id={`package-${packageItem.key}-title`}
          className="text-balance font-headline text-headline font-bold leading-tight"
        >
          {copy.title}
        </h3>
        <p className="mt-xs text-pretty text-body leading-7 text-ink-soft">
          {copy.description}
        </p>

        <div
          className="mt-md h-px w-full bg-embassy/10"
          aria-hidden="true"
        />
        <p className="mt-md text-label font-label uppercase tracking-[0.1em] text-amendment">
          {t.includedLabel}
        </p>

        <ul className="mt-sm space-y-xs">
          {copy.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-sm text-body leading-6 text-ink-soft"
            >
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-court-gold/50 bg-marble"
                aria-hidden="true"
              >
                <FiCheck className="h-3 w-3 text-court-gold" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-xs border-t border-embassy/10 pt-lg">
          <Link
            href={`/${locale}/packages/${packageItem.key}`}
            className="group/cta inline-flex min-h-12 w-full items-center justify-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
          >
            <span>{t.action}</span>
            <FiArrowUpRight
              className={`h-4 w-4 rtl:scale-x-[-1] ${
                shouldReduceMotion
                  ? ""
                  : "transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              }`}
              aria-hidden="true"
            />
          </Link>

          <Link
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(
              t.whatsappMessage.replace("{package}", copy.label),
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-ink-deep/15 px-md text-label font-semibold text-ink-soft transition-colors duration-200 hover:border-court-gold hover:text-ink-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
          >
            {t.whatsappFallback}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
