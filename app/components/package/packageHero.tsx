"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiLock,
  FiMessageCircle,
} from "react-icons/fi";
import { SITE_WHATSAPP } from "@/app/constants/site";
import {
  RECRUITMENT_PACKAGES,
  RecruitmentPackageKey,
} from "@/app/constants/packages";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

const FEATURED_PACKAGE = "care";

interface PackageHeroProps {
  packageKey: RecruitmentPackageKey;
}

export default function PackageHero({ packageKey }: PackageHeroProps) {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("packageDetail");
  const p = useTranslation("packages");
  const shouldReduceMotion = useReducedMotion();

  const packageIndex = RECRUITMENT_PACKAGES.findIndex(
    (packageItem) => packageItem.key === packageKey,
  );
  const packageItem = RECRUITMENT_PACKAGES[packageIndex];
  const Icon = packageItem.icon;
  const copy = p.items[packageItem.key];
  const isFeatured = packageItem.key === FEATURED_PACKAGE;
  const total = RECRUITMENT_PACKAGES.length;

  const whatsappUrl = `https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent(
    p.whatsappMessage.replace("{package}", copy.label),
  )}`;

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.6, delay, ease: "easeOut" as const };

  return (
    <section
      aria-labelledby="package-detail-title"
      aria-label={`${t.ariaLabel} — ${copy.label}`}
      className="relative overflow-hidden bg-embassy text-parchment"
    >
      {/* Navy field decoration */}
      <div
        className="pointer-events-none absolute end-[-10rem] top-[-12rem] h-[26rem] w-[26rem] rounded-full border border-champagne-gilt/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-14rem] end-[28%] h-[24rem] w-[24rem] rounded-full border border-champagne-gilt/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full min-h-svh grid-cols-1 grid-rows-[auto_auto_auto] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:grid-rows-[auto_minmax(0,1fr)]">
        {/* ===== Navy apron — sits under the transparent navbar ===== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reveal()}
          className="flex items-center justify-between gap-md border-b border-champagne-gilt/15 px-sm pb-lg pt-20 sm:px-md lg:col-span-2 lg:px-xl"
        >
          <Link
            href={`/${locale}/#packages`}
            aria-label={t.backAria}
            className="inline-flex items-center gap-xs rounded-md p-1 text-label font-semibold text-champagne-gilt/80 transition-colors duration-200 hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
          >
            <FiChevronDown
              className="h-4 w-4 rotate-[-90deg] rtl:rotate-90"
              aria-hidden="true"
            />
            <span>{t.back}</span>
          </Link>

          <p
            className="text-label font-label tabular-nums tracking-[0.14em] text-parchment/80"
            aria-hidden="true"
          >
            <span className="text-champagne-gilt">
              {String(packageIndex + 1).padStart(2, "0")}
            </span>
            <span> / </span>
            {String(total).padStart(2, "0")}
          </p>
        </motion.div>

        {/* ===== Light field — the letter, entered by a navy diagonal ===== */}
        <div
          className="relative flex flex-col border-b border-embassy/10 bg-parchment px-sm pb-xl pt-16 text-ink-deep sm:px-md lg:border-b-0 lg:px-xl lg:pb-16 lg:pt-0 lg:[clip-path:polygon(0_0,calc(100%_-_9rem)_0,100%_100%,0_100%)] lg:rtl:[clip-path:polygon(100%_0,9rem_0,0_100%,100%_100%)]"
        >
          {/* Seam seal — the diamond stamped on the diagonal */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={reveal(0.45)}
            style={
              locale === "ar"
                ? { left: "calc(4.5rem - 0.5rem)", top: "calc(50% - 0.5rem)" }
                : { right: "calc(4.5rem - 0.5rem)", top: "calc(50% - 0.5rem)" }
            }
            className="absolute z-10 hidden h-4 w-4 lg:block"
            aria-hidden="true"
          >
            <div className="h-4 w-4 rotate-45 border border-embassy/30 bg-parchment" />
          </motion.div>

          <div className="flex flex-1 flex-col justify-center lg:pe-24">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reveal(0.08)}
            >
              <p className="flex items-center gap-xs text-label font-label uppercase tracking-[0.12em] text-ink-soft">
                <span aria-hidden="true">◆</span>
                <span>{t.eyebrow}</span>
              </p>

              <h1
                id="package-detail-title"
                className="mt-md max-w-[15ch] text-balance font-headline text-display font-bold leading-[1.1] text-embassy"
              >
                {copy.title}
              </h1>

              <p className="mt-md max-w-[52ch] text-pretty text-body leading-8 text-ink-soft">
                {copy.description}
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reveal(0.16)}
              className="mt-lg"
            >
              {isFeatured && (
                <span className="inline-block rounded-full border border-embassy/15 bg-marble px-sm py-xxs text-label font-semibold text-amendment">
                  {p.popularLabel}
                </span>
              )}

              <div className="mt-md flex flex-wrap items-baseline gap-xs border-s border-embassy/25 ps-md">
                <p className="w-full text-label font-label uppercase tracking-[0.1em] text-ink-soft">
                  {p.priceFrom}
                </p>
                <span className="font-headline text-[3rem] font-bold leading-none tracking-tight text-embassy tabular-nums">
                  {copy.price}
                </span>
                <span className="text-label font-semibold text-ink-soft">
                  {p.currency}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reveal(0.24)}
              className="mt-lg flex flex-col gap-xs sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a
                href="#request"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold sm:w-auto"
              >
                <span>{t.cta}</span>
                <FiArrowUpRight
                  className="h-4 w-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-xs rounded-md border border-ink-deep/15 px-md text-label font-semibold text-ink-soft transition-colors duration-200 hover:border-court-gold hover:text-ink-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold sm:w-auto"
              >
                <FiMessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{p.whatsappFallback}</span>
              </a>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reveal(0.3)}
              className="mt-lg flex items-start gap-sm border border-embassy/15 bg-marble px-sm py-sm text-start"
            >
              <FiLock
                className="mt-1 h-4 w-4 shrink-0 text-amendment"
                aria-hidden="true"
              />
              <p className="text-label leading-6 text-ink-soft">{p.note}</p>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={reveal(0.35)}
            className="mt-lg flex justify-center lg:mt-0"
          >
            <a
              href="#request"
              aria-label={t.scrollAria}
              className="group inline-flex flex-col items-center gap-xs px-sm py-1 text-ink-soft/80 transition-colors duration-200 hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
            >
              <span className="text-label tracking-[0.14em] uppercase">
                {t.scrollHint}
              </span>
              <FiChevronDown
                className="h-5 w-5 animate-[bounce_2.5s_ease-in-out_infinite] motion-reduce:animate-none"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>

        {/* ===== Navy field — the inclusions wall sits inside the diagonal ===== */}
        <div className="flex flex-col bg-transparent px-sm pt-xl pb-xl sm:px-md lg:col-start-2 lg:row-start-2 lg:px-16 lg:pt-0 lg:pb-16">
          <div className="flex flex-1 items-center lg:justify-center">
            <motion.aside
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={reveal(0.2)}
              aria-labelledby="package-included-title"
              className="w-full rounded-lg border border-champagne-gilt/20 bg-chancery p-md shadow-apparatus sm:p-lg"
            >
              <div className="flex items-start justify-between gap-sm">
                <div className="flex min-w-0 items-center gap-sm">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne-gilt/30 bg-embassy text-champagne-gilt"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-label font-semibold text-parchment">
                      {copy.label}
                    </p>
                    <p className="mt-xxs text-label text-parchment/75">
                      {copy.shortDescription}
                    </p>
                  </div>
                </div>

                {isFeatured && (
                  <span className="shrink-0 rounded-full border border-court-gold/60 bg-embassy/80 px-sm py-xxs text-label font-semibold text-champagne-gilt">
                    {p.popularLabel}
                  </span>
                )}
              </div>

              <div
                className="mt-md h-px w-full bg-champagne-gilt/15"
                aria-hidden="true"
              />

              <p
                id="package-included-title"
                className="mt-md text-label font-label uppercase tracking-[0.1em] text-amendment"
              >
                {p.includedLabel}
              </p>

              <ul className="mt-sm space-y-xs">
                {copy.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-sm text-body leading-6 text-parchment/80"
                  >
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne-gilt/40 bg-embassy"
                      aria-hidden="true"
                    >
                      <FiCheck className="h-3 w-3 text-champagne-gilt" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
