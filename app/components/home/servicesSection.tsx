"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiArrowUpRight,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCoffee,
  FiCreditCard,
  FiCircle,
  FiHeart,
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiTool,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

type SectorKey = "individual" | "business";
type ServiceKey =
  | "hourlyWorkers"
  | "domesticWorker"
  | "privateDriver"
  | "homeNurse"
  | "homeCook"
  | "personalCareProvider"
  | "emergingProfessions"
  | "retail"
  | "hospitality"
  | "medical"
  | "industrial"
  | "business"
  | "commercialBanking";

interface ServiceItem {
  key: ServiceKey;
  icon: IconType;
}

const SECTORS: Record<
  SectorKey,
  { icon: IconType; items: readonly ServiceItem[] }
> = {
  individual: {
    icon: FiHome,
    items: [
      { key: "hourlyWorkers", icon: FiClock },
      { key: "domesticWorker", icon: FiHome },
      { key: "privateDriver", icon: FiTruck },
      { key: "homeNurse", icon: FiHeart },
      { key: "homeCook", icon: FiCoffee },
      { key: "personalCareProvider", icon: FiUsers },
      { key: "emergingProfessions", icon: FiActivity },
    ],
  },
  business: {
    icon: FiBriefcase,
    items: [
      { key: "retail", icon: FiShoppingBag },
      { key: "hospitality", icon: FiCoffee },
      { key: "medical", icon: FiActivity },
      { key: "industrial", icon: FiTool },
      { key: "business", icon: FiPackage },
      { key: "commercialBanking", icon: FiCreditCard },
    ],
  },
};

const SECTOR_ORDER: readonly SectorKey[] = ["individual", "business"];

// Home catalog items that have a dedicated service detail page. The remaining
// items keep the direct request-form link.
const SERVICE_DETAIL_SLUG: Partial<Record<ServiceKey, string>> = {
  domesticWorker: "domestic-staffing",
  privateDriver: "private-drivers",
  homeNurse: "nannies-and-home-care",
  business: "business-recruitment",
};

export default function ServicesSection() {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("services");
  const shouldReduceMotion = useReducedMotion();
  const [activeSector, setActiveSector] = useState<SectorKey>("individual");
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Partial<Record<SectorKey, HTMLButtonElement | null>>>({});

  const activeItems = SECTORS[activeSector].items;
  const visibleItems = [0, 1].map(
    (offset) => activeItems[(activeIndex + offset) % activeItems.length],
  );

  const selectSector = (sector: SectorKey, moveFocus = false) => {
    setActiveSector(sector);
    setActiveIndex(0);

    if (moveFocus) {
      requestAnimationFrame(() => {
        tabRefs.current[sector]?.focus();
        tabRefs.current[sector]?.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "nearest",
        });
      });
    }
  };

  const moveService = (direction: 1 | -1) => {
    setActiveIndex(
      (activeIndex + direction + activeItems.length) % activeItems.length,
    );
  };

  const handleSectorKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const direction = locale === "ar" ? -1 : 1;
    const currentIndex = SECTOR_ORDER.indexOf(activeSector);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = currentIndex + direction;
    if (event.key === "ArrowLeft") nextIndex = currentIndex - direction;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = SECTOR_ORDER.length - 1;

    if (nextIndex === currentIndex) return;

    event.preventDefault();
    const wrappedIndex =
      (nextIndex + SECTOR_ORDER.length) % SECTOR_ORDER.length;
    selectSector(SECTOR_ORDER[wrappedIndex], true);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: "easeOut" as const };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      aria-label={t.ariaLabel}
      className="relative overflow-hidden bg-parchment text-ink-deep"
    >
      <div className="mx-auto grid w-full gap-xl px-sm py-xxl sm:px-md lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:items-start lg:gap-xxl lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
          className="relative border-s border-embassy/15 ps-lg lg:sticky lg:top-28"
        >
          <h2
            id="services-title"
            className="max-w-[12ch] font-headline text-display font-bold leading-[1.08] text-embassy"
          >
            {t.title}
          </h2>

          <p className="mt-md max-w-[38ch] text-body leading-8 text-ink-soft"
          >
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
          className="min-w-0"
        >
          <div
            role="tablist"
            aria-label={t.categoryLabel}
            aria-orientation="horizontal"
            className="grid gap-xs sm:grid-cols-2"
          >
            {SECTOR_ORDER.map((sectorKey) => {
              const sector = SECTORS[sectorKey];
              const Icon = sector.icon;
              const copy = t.categories[sectorKey];
              const isActive = sectorKey === activeSector;

              return (
                <button
                  key={sectorKey}
                  ref={(element) => {
                    tabRefs.current[sectorKey] = element;
                  }}
                  id={`services-tab-${sectorKey}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`services-panel-${sectorKey}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectSector(sectorKey)}
                  onKeyDown={handleSectorKeyDown}
                  className={`group flex min-h-[5.5rem] items-center gap-md rounded-md border px-md py-sm text-start transition-colors duration-200 sm:min-h-[6.5rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold ${
                    isActive
                        ? "border-embassy bg-embassy text-parchment"
                        : "border-embassy/15 bg-marble text-embassy hover:border-embassy/35 hover:bg-marble"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md border ${
                      isActive
                        ? "border-court-gold/45 bg-embassy/20"
                        : "border-embassy/15 bg-parchment"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-title font-semibold leading-tight">
                      {copy.title}
                    </span>
                    <span
                      className={`mt-xxs block text-label leading-5 ${
                        isActive ? "text-parchment/70" : "text-ink-soft"
                      }`}
                    >
                      {copy.description}
                    </span>
                  </span>
                  <span
                    className={`ms-auto shrink-0 text-title ${
                      isActive ? "text-court-gold" : "text-embassy"
                    }`}
                    aria-hidden="true"
                  >
                    <FiCircle className="h-3 w-3 fill-current" />
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`services-panel-${activeSector}`}
            role="tabpanel"
            aria-labelledby={`services-tab-${activeSector}`}
            tabIndex={0}
            className="relative mt-md overflow-hidden rounded-lg border border-embassy/15 bg-marble outline-none focus-visible:border-court-gold"
          >
            <div
              className="pointer-events-none absolute inset-y-0 end-0 hidden w-1/3 bg-parchment/70 sm:block"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeSector}-${activeIndex}`}
                initial={shouldReduceMotion ? false : { opacity: 0, x: locale === "ar" ? 18 : -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: locale === "ar" ? -12 : 12 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
                className="relative grid gap-md p-sm sm:grid-cols-2 sm:p-xl"
              >
                {visibleItems.map((item, offset) => {
                  const copy = t.items[item.key];
                  const Icon = item.icon;
                  const itemIndex = (activeIndex + offset) % activeItems.length;

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
                            {String(itemIndex + 1).padStart(2, "0")} / {String(activeItems.length).padStart(2, "0")}
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
                        href={
                          SERVICE_DETAIL_SLUG[item.key]
                            ? `/${locale}/services/${SERVICE_DETAIL_SLUG[item.key]}`
                            : `/${locale}/request?package=${activeSector === "business" ? "business" : "household"}&service=${item.key}`
                        }
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
                    {activeItems.map((item, index) => (
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
      </div>
    </section>
  );
}
