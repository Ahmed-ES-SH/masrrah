"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
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
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import Section from "@/app/components/common/Section";
import CategoryCard from "./categoryCard";
import ServiceCard from "./serviceCard";

type ServiceKey =
  | "hourlyRental"
  | "dailyRental"
  | "weeklyRental"
  | "monthlyRental"
  | "globalWorkforce";

export interface ServiceItem {
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

export interface CategoryItem {
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

  const transition = revealTransition(shouldReduceMotion);

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
    <Section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 bg-parchment text-ink-deep"
      aria-label={t.ariaLabel}
    >
      <div className="flex w-full items-start gap-xl max-xl:flex-col lg:items-start lg:gap-xxl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
          className="relative flex-1 border-s border-embassy/15 ps-lg lg:sticky lg:top-28"
        >
          <h2
            id="services-title"
            className="max-w-[12ch] font-headline text-display font-bold leading-[1.08] text-balance text-embassy"
          >
            {t.title}
          </h2>

          <p className="mt-md max-w-[38ch] text-title font-medium leading-8 text-ink-soft">
            {t.body}
          </p>

          <div className="mt-xl flex items-center gap-xs text-label font-label text-ink-soft">
            <FiCircle className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
            <span>{t.catalogueNote}</span>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition(shouldReduceMotion, 0.08, 0.6)}
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
                  {CATEGORIES.map((item, index) => (
                    <CategoryCard
                      key={item.key}
                      item={item}
                      index={index}
                      copy={t.categories[item.key]}
                      locale={locale}
                      onOpenSlider={() => setView("slider")}
                    />
                  ))}
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
                          const itemIndex =
                            (activeIndex + offset) % SERVICES.length;

                          return (
                            <ServiceCard
                              key={item.key}
                              item={item}
                              t={t}
                              itemIndex={itemIndex}
                              offset={offset}
                              total={SERVICES.length}
                              locale={locale}
                              shouldReduceMotion={shouldReduceMotion}
                            />
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
    </Section>
  );
}
