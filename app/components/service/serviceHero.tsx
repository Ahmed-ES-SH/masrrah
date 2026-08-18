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
  getServiceDetail,
  SERVICE_ICONS,
} from "@/app/constants/services";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

interface ServiceHeroProps {
  slug: string;
}

export default function ServiceHero({ slug }: ServiceHeroProps) {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("serviceDetail");
  const c = useTranslation("countries");
  const shouldReduceMotion = useReducedMotion();

  const service = getServiceDetail(slug);
  if (!service) return null;

  const copy = service.copy[locale];
  const Icon = SERVICE_ICONS[service.icon];

  const whatsappUrl = `https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent(
    t.whatsappMessage.replace("{service}", copy.title),
  )}`;

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.6, delay, ease: "easeOut" as const };

  return (
    <>
      <section
        aria-labelledby="service-detail-title"
        aria-label={`${t.ariaLabel} — ${copy.title}`}
        className="relative overflow-hidden bg-marble text-ink-deep"
      >
        {/* Field decoration */}
        <div
          className="pointer-events-none absolute end-[-10rem] top-[-12rem] h-[26rem] w-[26rem] rounded-full border border-ink-deep/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[-14rem] start-[12%] h-[24rem] w-[24rem] rounded-full border border-ink-deep/10"
          aria-hidden="true"
        />

        {/* Apron — sits under the transparent navbar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reveal()}
          className="flex flex-wrap items-center justify-between gap-x-md gap-y-xs border-b border-ink-deep/10 px-sm pb-lg pt-20 sm:px-md lg:px-xl"
        >
          <Link
            href={`/${locale}/#services`}
            aria-label={t.backAria}
            className="inline-flex items-center gap-xs rounded-md p-1 type-btn text-ink-soft transition-colors duration-200 hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
          >
            <FiChevronDown
              className="h-4 w-4 rotate-[-90deg] rtl:rotate-90"
              aria-hidden="true"
            />
            <span>{t.back}</span>
          </Link>

          <p className="flex items-center gap-xs type-label uppercase text-ink-soft">
            <span className="text-court-gold" aria-hidden="true">
              ◆
            </span>
            <span>{t.apronMeta}</span>
          </p>
        </motion.div>

        <div className="relative mx-auto grid w-full gap-xl px-sm pb-lg pt-lg sm:px-md xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-stretch xl:gap-xxl lg:px-xl xl:pt-xl">
          {/* ===== The record — parchment letter with the seal stamp ===== */}
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reveal(0.08)}
            aria-labelledby="service-detail-title"
            className="relative flex flex-col rounded-lg border border-champagne-gilt/25 bg-parchment p-md text-ink-deep sm:p-lg lg:p-xl"
          >
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }
              }
              className="absolute -end-3 -top-3 z-10"
              aria-hidden="true"
            >
              <span className="flex h-10 w-10 rotate-45 items-center justify-center rounded-sm border-2 border-embassy/30 bg-parchment shadow-float">
                <span className="-rotate-45 text-lg leading-none text-embassy">
                  ◆
                </span>
              </span>
            </motion.span>

            <p className="flex items-center gap-xs type-label uppercase text-ink-soft">
              <span aria-hidden="true">◆</span>
              <span>{copy.eyebrow}</span>
            </p>

            <h1
              id="service-detail-title"
              className="mt-md max-w-[16ch] text-balance type-display text-embassy lg:max-w-[22ch]"
            >
              {copy.title}
            </h1>

            <p className="mt-md max-w-[52ch] text-pretty type-body-lg text-ink-soft">
              {copy.description}
            </p>

            <div className="mt-lg flex flex-col gap-xs sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#request"
                className="group inline-flex min-h-12 items-center justify-center gap-xs rounded-md bg-court-gold px-md type-btn text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
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
                className="inline-flex min-h-11 items-center justify-center gap-xs rounded-md border border-ink-deep/15 px-md type-btn text-ink-soft transition-colors duration-200 hover:border-court-gold hover:text-ink-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
              >
                <FiMessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{t.whatsappFallback}</span>
              </a>
            </div>

            <div className="mt-lg flex items-start gap-sm border border-embassy/15 bg-marble px-sm py-sm text-start">
              <FiLock
                className="mt-1 h-4 w-4 shrink-0 text-amendment"
                aria-hidden="true"
              />
              <p className="type-label text-ink-soft">{t.note}</p>
            </div>
          </motion.article>

          {/* ===== The dossier — numbered clauses, suitability, corridors ===== */}
          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reveal(0.18)}
            aria-labelledby="service-ledger-title"
            className="flex flex-col rounded-lg border border-ink-deep/10 bg-parchment p-md text-ink-deep sm:p-lg"
          >
            <div className="flex items-center gap-sm">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-court-gold/30 bg-court-gold/15 text-court-gold"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="type-label">{t.ledgerLabel}</p>
                <p className="mt-xxs type-label text-ink-soft">
                  {t.eyebrow}
                </p>
              </div>
            </div>

            <div
              className="mt-md h-px w-full bg-ink-deep/10"
              aria-hidden="true"
            />

            <ul className="mt-sm">
              {copy.clauses.map((clause, index) => (
                <li
                  key={clause}
                  className="flex items-start gap-sm border-b border-ink-deep/10 py-sm last:border-b-0"
                >
                  <span
                    className="w-6 shrink-0 pt-1 text-label font-semibold tabular-nums text-embassy"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-court-gold/40 bg-parchment"
                    aria-hidden="true"
                  >
                    <FiCheck className="h-3 w-3 text-court-gold" />
                  </span>
                  <span className="type-body text-ink-deep">
                    {clause}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-md border-t border-ink-deep/10 pt-md">
              <p className="type-label uppercase text-embassy">
                {t.suitedForLabel}
              </p>
              <ul className="mt-sm space-y-xs">
                {copy.suitedFor.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-sm type-body text-ink-soft"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-court-gold"
                      aria-hidden="true"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-md border-t border-ink-deep/10 pt-md">
              <p className="type-label uppercase text-embassy">
                {t.corridorLabel}
              </p>
              <ul className="mt-sm flex flex-wrap gap-xs">
                {service.corridors.map((key) => (
                  <li
                    key={key}
                    className="rounded-sm border border-ink-deep/10 bg-marble px-sm py-xxs type-label text-ink-deep"
                  >
                    {c.items[key].name}
                  </li>
                ))}
              </ul>
              <p className="mt-sm type-label text-ink-soft">
                {t.corridorNote}
              </p>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reveal(0.3)}
          className="relative flex justify-center pb-md"
        >
          <a
            href="#request"
            aria-label={t.scrollAria}
            className="group inline-flex flex-col items-center gap-xs px-sm py-1 text-ink-soft transition-colors duration-200 hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
          >
            <span className="type-label uppercase">
              {t.scrollHint}
            </span>
            <FiChevronDown
              className="h-5 w-5 animate-[bounce_2.5s_ease-in-out_infinite] motion-reduce:animate-none"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </section>

      {/* ===== Facts band — three hairline rows of record data ===== */}
      <section
        aria-label={t.factsLabel}
        className="bg-marble text-ink-deep"
      >
        <div className="mx-auto grid w-full gap-md px-sm py-lg sm:px-md lg:grid-cols-3 lg:gap-0 lg:px-xl lg:py-xl">
          <div className="flex flex-col gap-xxs border-t border-embassy/15 pt-md lg:border-t-0 lg:pt-0 lg:first:ps-0">
            <p className="type-label uppercase text-ink-soft">
              {t.factsRecordLabel}
            </p>
            <p className="text-title font-semibold tabular-nums text-embassy">
              {String(copy.clauses.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex flex-col gap-xxs border-t border-embassy/15 pt-md lg:border-t-0 lg:pt-0 lg:border-s lg:border-embassy/10 lg:ps-xl">
            <p className="type-label uppercase text-ink-soft">
              {t.factsSuitedLabel}
            </p>
            <p className="type-body text-embassy">
              {copy.suitedFor[0]}
            </p>
          </div>

          <div className="flex flex-col gap-xxs border-t border-embassy/15 pt-md lg:border-t-0 lg:pt-0 lg:border-s lg:border-embassy/10 lg:ps-xl">
            <p className="type-label uppercase text-ink-soft">
              {t.factsOutcomeLabel}
            </p>
            <p className="type-body text-embassy">
              {copy.outcome}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
