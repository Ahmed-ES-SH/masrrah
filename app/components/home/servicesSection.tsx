"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiCircle,
  FiClock,
  FiGlobe,
  FiRepeat,
  FiSun,
} from "react-icons/fi";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

type ServiceKey =
  | "hourlyRental"
  | "dailyRental"
  | "weeklyRental"
  | "monthlyRental"
  | "globalWorkforce";

interface ServiceItem {
  key: ServiceKey;
  icon: IconType;
}

const SERVICES: readonly ServiceItem[] = [
  { key: "hourlyRental", icon: FiClock },
  { key: "dailyRental", icon: FiSun },
  { key: "weeklyRental", icon: FiRepeat },
  { key: "monthlyRental", icon: FiCalendar },
  { key: "globalWorkforce", icon: FiGlobe },
];

type CategoryKey = "recruitment" | "transfer" | "rental";

interface CategoryItem {
  key: CategoryKey;
  image: string;
  href: string;
}

const CATEGORIES: readonly CategoryItem[] = [
  {
    key: "recruitment",
    image: "/cateogries/Recruitment Request-category.png",
    href: "request?package=household",
  },
  {
    key: "transfer",
    image: "/cateogries/Request to Transfer maids.png",
    href: "request",
  },
  {
    key: "rental",
    image: "/cateogries/Rental Request.png",
    href: "request?package=household&service=hourlyRental",
  },
];

export default function ServicesSection() {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("services");
  const shouldReduceMotion = useReducedMotion();
  const [view, setView] = useState<"categories" | "slider">("categories");
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleItems = [0, 1].map(
    (offset) => SERVICES[(activeIndex + offset) % SERVICES.length],
  );

  const moveService = (direction: 1 | -1) => {
    setActiveIndex(
      (activeIndex + direction + SERVICES.length) % SERVICES.length,
    );
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: "easeOut" as const };

  const panelEnter = shouldReduceMotion
    ? false
    : { opacity: 0, y: 16 };

  const panelLeave = shouldReduceMotion
    ? undefined
    : { opacity: 0, y: -14 };

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: "easeOut" as const };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 overflow-hidden bg-parchment text-ink-deep"
      aria-label={t.ariaLabel}
    >
      <div className="mx-auto flex items-start max-xl:flex-col  w-full gap-xl px-sm py-xxl sm:px-md  lg:items-start lg:gap-xxl lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
          className="relative flex-1 border-s border-embassy/15 ps-lg lg:sticky lg:top-28"
        >
          <h2
            id="services-title"
            className="max-w-[12ch] font-headline text-display font-bold leading-[1.08] text-embassy"
          >
            {t.title}
          </h2>

          <p className="mt-md max-w-[38ch] text-body leading-8 text-ink-soft">
            {t.body}
          </p>

          <div className="mt-xl flex items-center gap-xs text-label font-label text-court-gold">
            <FiCircle className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
            <span>{t.catalogueNote}</span>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="min-w-0 w-full flex-1/2"
        >
          <div className="relative mt-md overflow-hidden rounded-lg border border-embassy/15 bg-marble outline-none sm:mt-0">
            <AnimatePresence mode="wait" initial={false}>
              {view === "categories" ? (
                <motion.div
                  key="categories"
                  initial={panelEnter}
                  animate={{ opacity: 1, y: 0 }}
                  exit={panelLeave}
                  transition={panelTransition}
                  className="grid min-h-0 gap-md p-sm sm:p-xl"
                >
                  {CATEGORIES.map((item, index) => {
                    const copy = t.categories[item.key];
                    const isRental = item.key === "rental";

                    const cardClass =
                      "group flex flex-col overflow-hidden rounded-md border border-embassy/15 bg-marble transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-court-gold/45 hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold sm:flex-row";

                    const inner = (
                      <>
                        <span className="relative aspect-[3/2] shrink-0 overflow-hidden border-b border-embassy/15 sm:aspect-auto sm:w-[38%] sm:self-stretch sm:border-b-0 sm:border-e">
                          <Image
                            src={item.image}
                            alt={'service-image'}
                            fill
                            preload={index === 0}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 100vw"
                            className="object-cover"
                          />
                        </span>

                        <span className="flex min-w-0 flex-1 flex-col p-md sm:p-lg">
                          <h3 className="font-headline text-title font-bold leading-tight text-embassy">
                            {copy.title}
                          </h3>
                          <p className="mt-xs text-body leading-6 text-ink-soft">
                            {copy.description}
                          </p>

                          <span className="mt-auto flex items-center gap-xs pt-lg">
                            <span className="text-label font-label uppercase tracking-[0.1em] text-embassy transition-colors duration-200 group-hover:text-court-gold">
                              {copy.action}
                            </span>
                            <span
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-embassy/20 text-embassy transition-colors duration-200 group-hover:border-court-gold group-hover:text-court-gold"
                              aria-hidden="true"
                            >
                              {isRental ? (
                                <FiChevronRight className="h-5 w-5 rtl:scale-x-[-1]" />
                              ) : (
                                <FiArrowUpRight className="h-4 w-4 rtl:scale-x-[-1]" />
                              )}
                            </span>
                          </span>
                        </span>
                      </>
                    );

                    return isRental ? (
                      <button
                        key={item.key}
                        type="button"
                        aria-expanded={false}
                        aria-controls="services-rental-slider"
                        onClick={() => setView("slider")}
                        className={`${cardClass} cursor-pointer text-start`}
                      >
                        {inner}
                      </button>
                    ) : (
                      <Link
                        key={item.key}
                        href={`/${locale}/${item.href}`}
                        className={cardClass}
                      >
                        {inner}
                      </Link>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="slider"
                  id="services-rental-slider"
                  initial={panelEnter}
                  animate={{ opacity: 1, y: 0 }}
                  exit={panelLeave}
                  transition={panelTransition}
                  className="relative"
                >
                  <div className="flex items-center justify-between gap-md border-b border-embassy/15 p-sm sm:px-xl sm:pt-lg">
                    <p className="text-label font-label uppercase tracking-[0.12em] text-ink-soft">
                      {t.rentalEyebrow}
                    </p>
                    <button
                      type="button"
                      aria-label={t.backToCategoriesAria}
                      onClick={() => setView("categories")}
                      className="inline-flex min-h-11 items-center gap-xs rounded-md border border-embassy/20 px-md text-label font-semibold text-embassy transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
                    >
                      <FiChevronRight
                        className="h-5 w-5 rtl:scale-x-[-1]"
                        aria-hidden="true"
                      />
                      <span>{t.backToCategories}</span>
                    </button>
                  </div>

                  <div className="relative overflow-hidden">
                    <div
                      className="pointer-events-none absolute inset-y-0 end-0 hidden w-1/3 bg-parchment/70 sm:block"
                      aria-hidden="true"
                    />

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeIndex}
                        initial={shouldReduceMotion ? false : { opacity: 0, x: locale === "ar" ? 18 : -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, x: locale === "ar" ? -12 : 12 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
                        className="relative grid gap-md p-sm sm:grid-cols-2 sm:p-xl"
                      >
                        {visibleItems.map((item, offset) => {
                          const copy = t.items[item.key];
                          const Icon = item.icon;
                          const itemIndex = (activeIndex + offset) % SERVICES.length;

                          return (
                            <article
                              key={item.key}
                              className={`flex min-h-0 flex-col rounded-md border border-embassy/15 bg-parchment p-md sm:min-h-[28rem] sm:p-lg ${
                                offset === 1 ? "hidden sm:flex" : ""
                              }`}
                            >
                              <div className="flex items-start justify-between gap-md border-b border-embassy/15 pb-md">
                                <div>
                                  <p className="text-label font-label uppercase tracking-[0.12em] text-ink-soft">
                                    {t.serviceLabel}
                                  </p>
                                  <p className="mt-xs text-label text-ink-soft/75">
                                    {String(itemIndex + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                                  </p>
                                </div>
                                <span
                                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-court-gold/45 bg-embassy text-court-gold"
                                  aria-hidden="true"
                                >
                                  <Icon className="h-5 w-5" />
                                </span>
                              </div>

                              <div className="mt-lg">
                                <h3 className="font-headline text-headline font-bold leading-tight text-embassy">
                                  {copy.title}
                                </h3>
                                <p className="mt-sm text-body leading-7 text-ink-soft">
                                  {copy.description}
                                </p>
                              </div>

                              <div className="mt-lg border-s-2 border-court-gold ps-sm">
                                <p className="text-label font-label uppercase tracking-[0.1em] text-ink-soft">
                                  {t.detailLabel}
                                </p>
                                <p className="mt-xs text-label leading-6 text-embassy">
                                  {copy.detail}
                                </p>
                              </div>

                              <Link
                                href={`/${locale}/request?package=household&service=${item.key}`}
                                className="group mt-auto inline-flex min-h-12 w-fit items-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
                              >
                                <span>{t.requestService}</span>
                                <FiArrowUpRight
                                  className={`h-4 w-4 rtl:scale-x-[-1] ${shouldReduceMotion ? "" : "transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"}`}
                                  aria-hidden="true"
                                />
                              </Link>
                            </article>
                          );
                        })}

                        <div className="flex items-center justify-between gap-sm sm:col-span-2">
                          <div className="flex items-center gap-xxs" aria-hidden="true">
                            {SERVICES.map((item, index) => (
                              <span
                                key={item.key}
                                className={`h-1.5 rounded-full transition-all duration-200 ${
                                  index === activeIndex ? "w-6 bg-court-gold" : "w-1.5 bg-embassy/25"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-xs" aria-label={t.sliderLabel}>
                            <button
                              type="button"
                              aria-label={t.previous}
                              onClick={() => moveService(-1)}
                              className="flex h-11 w-11 items-center justify-center rounded-md border border-embassy/20 text-embassy transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
                            >
                              <FiChevronLeft className="h-5 w-5 rtl:scale-x-[-1]" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              aria-label={t.next}
                              onClick={() => moveService(1)}
                              className="flex h-11 w-11 items-center justify-center rounded-md border border-embassy/20 text-embassy transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
                            >
                              <FiChevronRight className="h-5 w-5 rtl:scale-x-[-1]" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
