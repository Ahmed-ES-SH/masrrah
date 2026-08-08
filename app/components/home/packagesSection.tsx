"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SITE_WHATSAPP } from "@/app/constants/site";
import { RECRUITMENT_PACKAGES } from "@/app/constants/packages";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

const WHATSAPP_URL = `https://wa.me/${SITE_WHATSAPP}`;

const FEATURED_PACKAGE = "care";

export default function PackagesSection() {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("packages");
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const total = RECRUITMENT_PACKAGES.length;

  const moveTo = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  const equalizeSlides = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const slideHeights = Array.from(
      swiper.el.querySelectorAll<HTMLElement>(".swiper-slide"),
    ).map((slide) => slide.offsetHeight);
    const tallest = slideHeights.length ? Math.max(...slideHeights) : 0;
    if (tallest > 0) {
      swiper.el.style.height = `${tallest}px`;
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(equalizeSlides);
    void document.fonts.ready.then(equalizeSlides);
    window.addEventListener("resize", equalizeSlides);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", equalizeSlides);
    };
  }, [equalizeSlides, locale]);

  const revealTransition = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.6, delay, ease: "easeOut" as const };

  return (
    <section
      id="packages"
      aria-labelledby="packages-title"
      aria-label={t.ariaLabel}
      className="relative overflow-hidden bg-embassy text-parchment"
    >
      <div
        className="pointer-events-none absolute inset-y-0 start-0 w-1/3 bg-diplomacy/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute end-[-8rem] top-[-10rem] h-[24rem] w-[24rem] rounded-full border border-champagne-gilt/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full overflow-hidden px-sm py-xxl sm:px-md lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition()}
          className="grid gap-lg border-b border-champagne-gilt/15 pb-lg lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.6fr)] lg:items-end lg:gap-xxl"
        >
          <div>
            <p className="text-label font-label uppercase tracking-[0.12em] text-court-gold">
              {t.eyebrow}
            </p>
            <h2
              id="packages-title"
              className="mt-sm max-w-[16ch] text-balance font-headline text-display font-bold leading-[1.08] text-parchment"
            >
              {t.title}
            </h2>
            <p className="mt-md max-w-[56ch] text-pretty text-body leading-8 text-parchment/70">
              {t.body}
            </p>
          </div>

          <div className="flex items-end gap-sm border-s border-court-gold/50 ps-md lg:justify-self-end">
            <span className="font-headline text-display font-bold leading-none text-court-gold">
              {String(total).padStart(2, "0")}
            </span>
            <div className="pb-xxs">
              <p className="text-label font-label uppercase tracking-[0.1em] text-champagne-gilt">
                {t.catalogTitle}
              </p>
              <p className="mt-xxs max-w-[24ch] text-label leading-5 text-parchment/60">
                {t.catalogNote}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={revealTransition(0.12)}
          className="mt-lg"
        >
          <Swiper
            key={locale}
            className="!overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt"
            wrapperClass="items-stretch"
            modules={[A11y, Keyboard]}
            a11y={{
              enabled: true,
              containerRoleDescriptionMessage: t.ariaLabel,
            }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            speed={shouldReduceMotion ? 0 : 450}
            spaceBetween={16}
            slidesPerView={1.12}
            keyboard={{ enabled: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onResize={equalizeSlides}
          >
            {RECRUITMENT_PACKAGES.map((packageItem, index) => {
              const Icon = packageItem.icon;
              const copy = t.items[packageItem.key];
              const isFeatured = packageItem.key === FEATURED_PACKAGE;

              return (
                <SwiperSlide key={packageItem.key} className="h-full">
                  <motion.article
                    id={`package-${packageItem.key}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={revealTransition(0.08 + index * 0.07)}
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
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="relative z-10 mt-xl flex items-center justify-between gap-md">
            <p
              className="text-label font-label tabular-nums tracking-[0.12em] text-parchment/55"
              aria-live="polite"
            >
              <span className="text-court-gold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true"> / </span>
              {String(total).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-sm">
              <button
                type="button"
                aria-label={t.previous}
                onClick={() => moveTo(Math.max(activeIndex - 1, 0))}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-champagne-gilt/30 bg-embassy/70 text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
              >
                <FiChevronLeft
                  className="h-5 w-5 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                aria-label={t.next}
                onClick={() => moveTo(Math.min(activeIndex + 1, total - 1))}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-champagne-gilt/30 text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
              >
                <FiChevronRight
                  className="h-5 w-5 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={revealTransition(0.15)}
          className="mt-lg flex flex-col items-center gap-xs rounded-md border border-champagne-gilt/15 bg-chancery/60 px-md py-sm text-center sm:flex-row sm:justify-center sm:gap-sm"
        >
          <FiLock
            className="h-4 w-4 shrink-0 text-champagne-gilt"
            aria-hidden="true"
          />
          <p className="text-label leading-6 text-parchment/70">{t.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
