"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { heroSlides } from "@/app/constants/hero-sliders";
import { useTranslation } from "@/app/hooks/useTranslations";

/**
 * HeroSectionV2 — "The Embassy Window"
 * Modern editorial slider: Swiper showcase, mirror of the original heroSwiper (left untouched).
 */
const AUTOPLAY_MS = 6500;

export default function HeroSectionV2() {
  const t = useTranslation("hero");
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const activeSlide = heroSlides[activeIndex];
  const activeCopy = t.slides[activeSlide.copyKey];
  const total = heroSlides.length;

  const textTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: "easeOut" as const };

  const displayedProgress = shouldReduceMotion ? 1 : progress;

  const handleAutoplayTimeLeft = (
    swiper: SwiperType,
    timeLeft: number,
  ) => {
    if (shouldReduceMotion) return;
    const params = swiper.params.autoplay;
    const delay =
      params && typeof params === "object" && params.delay != null
        ? params.delay
        : AUTOPLAY_MS;
    setProgress(Math.min(1, Math.max(0, 1 - timeLeft / delay)));
  };

  const moveTo = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  const showPrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const showNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section
      id="home"
      aria-label={t.ariaLabel}
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-embassy text-parchment"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_80%_0%,rgba(27,51,94,0.55),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 px-sm pb-24 pt-32 sm:px-md lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-xl lg:pb-20 lg:pt-24">
        <div className="relative order-1 lg:col-span-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -start-6 select-none font-headline text-[11rem] font-bold leading-none text-champagne-gilt/10 lg:-bottom-16 lg:text-[15rem]"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              transition={textTransition}
              className="relative"
            >
              <div className="flex items-center gap-sm text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
                <span className="text-court-gold" aria-hidden="true">
                  ◆
                </span>
                <span>{activeCopy.eyebrow}</span>
                <span className="text-court-gold" aria-hidden="true">
                  ◆
                </span>
              </div>

              <h1 className="mt-md max-w-[13ch] font-headline text-display font-bold leading-[1.12] text-parchment lg:mt-lg">
                {activeCopy.headline}
              </h1>

              <p className="mt-md max-w-[46ch] text-body leading-8 text-parchment/75">
                {activeCopy.body}
              </p>

              <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:items-center">
                <Link
                  href={activeSlide.primaryHref}
                  className="group inline-flex min-h-12 flex-1 items-center justify-center gap-xs rounded-md bg-court-gold px-md text-title font-semibold text-embassy shadow-apparatus transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold sm:flex-none sm:px-lg"
                >
                  <span>{activeCopy.primaryCta}</span>
                  <FiArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href={activeSlide.secondaryHref}
                  className="group inline-flex min-h-12 flex-1 items-center justify-center gap-xs rounded-md border border-champagne-gilt/35 px-md text-title font-semibold text-parchment transition-colors duration-200 hover:border-champagne-gilt hover:bg-chancery/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt sm:flex-none"
                >
                  <span>{activeCopy.secondaryCta}</span>
                  <FiArrowRight
                    className="h-4 w-4 rtl:scale-x-[-1]"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="mt-xl flex items-center gap-sm border-t border-champagne-gilt/20 pt-md text-label text-parchment/65">
                <span
                  className="h-2 w-2 rotate-45 bg-court-gold"
                  aria-hidden="true"
                />
                <span>{activeCopy.metric}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative order-2 lg:col-span-7">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -start-2 -top-2 z-20 h-5 w-5 border-s-2 border-t-2 border-court-gold"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2 -end-2 z-20 h-5 w-5 border-e-2 border-b-2 border-court-gold"
          />

          <div className="relative w-full overflow-hidden rounded-lg bg-chancery ring-1 ring-champagne-gilt/40">
            <Swiper
              modules={[Autoplay, EffectFade, Keyboard, A11y]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              speed={shouldReduceMotion ? 0 : 850}
              loop
              autoplay={
                shouldReduceMotion
                  ? false
                  : {
                      delay: AUTOPLAY_MS,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                      waitForTransition: false,
                    }
              }
              keyboard={{ enabled: !shouldReduceMotion }}
              className="aspect-[16/11] w-full lg:aspect-[16/9]"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              onAutoplayTimeLeft={handleAutoplayTimeLeft}
            >
              {heroSlides.map((slide, index) => {
                const copy = t.slides[slide.copyKey];
                const isActive = index === activeIndex;

                return (
                  <SwiperSlide key={slide.id}>
                    <motion.div
                      className="relative h-full w-full"
                      animate={{ scale: isActive ? 1.1 : 1.02 }}
                      transition={
                        isActive
                          ? { duration: 10, ease: "linear" }
                          : { duration: 0.6, ease: "easeOut" }
                      }
                    >
                      <Image
                        src={slide.image}
                        alt={copy.imageAlt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center"
                      />
                    </motion.div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-embassy/45 to-transparent"
                    />
                    <AnimatePresence initial={false} mode="wait">
                      {isActive && (
                        <motion.span
                          key={slide.id}
                          initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 12,
                          }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={textTransition}
                          className="pointer-events-none absolute bottom-4 start-4 select-none font-headline text-6xl font-bold leading-none text-champagne-gilt/80 lg:text-7xl"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="mt-6 flex items-center justify-between gap-lg">
            <div className="flex min-w-0 items-center gap-sm">
              <button
                type="button"
                onClick={showPrevious}
                aria-label={t.previous}
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-champagne-gilt/35 text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gilt sm:inline-flex"
              >
                <FiArrowLeft
                  className="h-5 w-5 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </button>

              <div
                className="flex min-w-0 items-center gap-2 sm:gap-3"
                role="tablist"
                aria-label={t.slidesLabel}
              >
                {heroSlides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  const copy = t.slides[slide.copyKey];

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={copy.eyebrow}
                      onClick={() => moveTo(index)}
                      className={`group relative h-16 w-[4.5rem] overflow-hidden rounded-md border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gilt sm:h-20 sm:w-24 ${
                        isActive
                          ? "border-court-gold/80"
                          : "border-champagne-gilt/25 hover:border-champagne-gilt/60"
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        sizes="96px"
                        className={`object-cover transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-45 group-hover:opacity-70"
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-court-gold/[0.18]"
                      >
                        <span
                          className="block h-full origin-start bg-court-gold transition-transform duration-100"
                          style={{
                            transform: `scaleX(${isActive ? displayedProgress : 0})`,
                          }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={showNext}
                aria-label={t.next}
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-champagne-gilt/25 text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gilt sm:inline-flex"
              >
                <FiArrowRight
                  className="h-5 w-5 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-sm text-label">
              <span className="font-headline text-xl font-bold leading-none text-court-gold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-parchment/45">
                / {String(total).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-4 w-px bg-champagne-gilt/25 md:block"
              />
              <span className="hidden max-w-44 truncate uppercase tracking-[0.14em] text-parchment/55 md:block">
                {activeCopy.eyebrow}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}