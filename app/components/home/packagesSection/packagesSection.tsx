"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiLock } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { RECRUITMENT_PACKAGES } from "@/app/constants/packages";
import { revealTransition } from "@/app/helpers/transitions";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";
import Section from "@/app/components/common/Section";
import { PackageCard } from "./packageCard";

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

  return (
    <Section
      id="packages"
      aria-labelledby="packages-title"
      aria-label={t.ariaLabel}
      className="bg-embassy text-parchment"
      clip
      decor={
        <>
          <div
            className="pointer-events-none absolute inset-y-0 start-0 w-1/3 bg-diplomacy/25"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute end-[-8rem] top-[-10rem] h-[24rem] w-[24rem] rounded-full border border-champagne-gilt/10"
            aria-hidden="true"
          />
        </>
      }
    >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition(shouldReduceMotion, 0, 0.6)}
          className="grid gap-lg border-b border-champagne-gilt/15 pb-lg lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.6fr)] lg:items-end lg:gap-xxl"
        >
          <div>
            <p className="text-label font-label uppercase tracking-[0.12em] text-champagne-gilt">
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

          <div className="flex items-end gap-sm border-s border-champagne-gilt/40 ps-md lg:justify-self-end">
            <div className="pb-xxs">
              <p className="text-label font-label uppercase tracking-[0.1em] text-champagne-gilt">
                {t.catalogTitle}
              </p>
              <p className="mt-xxs max-w-[24ch] text-label leading-5 text-parchment/80">
                {t.catalogNote}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={revealTransition(shouldReduceMotion, 0.12, 0.6)}
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
            {RECRUITMENT_PACKAGES.map((packageItem, index) => (
              <SwiperSlide key={packageItem.key} className="h-full">
                <PackageCard
                  packageItem={packageItem}
                  isFeatured={packageItem.key === FEATURED_PACKAGE}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="relative z-10 mt-xl flex items-center justify-between gap-md">
            <p
              className="text-label font-label tabular-nums tracking-[0.12em] text-parchment/80"
              aria-live="polite"
            >
              <span className="text-champagne-gilt">
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
    </Section>
  );
}
