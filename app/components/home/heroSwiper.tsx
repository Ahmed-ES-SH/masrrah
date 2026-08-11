"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { heroSlides } from "@/app/constants/hero-sliders";
import { useTranslation } from "@/app/hooks/useTranslations";

const AUTOPLAY_MS = 6500;

const imageVariants = {
  enter: (direction: number) => ({
    clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    opacity: 0.5,
    scale: 1.08,
  }),
  center: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    opacity: 0,
    scale: 1.02,
  }),
};

export default function HeroSwiper() {
  const t = useTranslation("hero");
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [pausedByPointer, setPausedByPointer] = useState(false);

  const activeSlide = heroSlides[activeIndex];
  const activeCopy = t.slides[activeSlide.copyKey];
  const autoplayActive = !shouldReduceMotion && !pausedByPointer;
  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: "easeOut" as const };

  useEffect(() => {
    if (!autoplayActive) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setDirection(1);
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplayActive]);

  const selectSlide = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipedRight = info.offset.x > 60 || info.velocity.x > 400;
    const swipedLeft = info.offset.x < -60 || info.velocity.x < -400;
    if (swipedLeft) goNext();
    else if (swipedRight) goPrev();
  };

  return (
    <section
      id="home"
      aria-label={t.ariaLabel}
      aria-roledescription="carousel"
      onMouseEnter={() => setPausedByPointer(true)}
      onMouseLeave={() => setPausedByPointer(false)}
      onFocusCapture={() => setPausedByPointer(true)}
      onBlurCapture={() => setPausedByPointer(false)}
      className="relative isolate min-h-svh overflow-hidden bg-embassy text-parchment"
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={activeSlide.id}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.35}
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          aria-hidden="true"
        >
          <Image
            src={activeSlide.image}
            alt={activeCopy.imageAlt}
            fill
            preload={activeIndex === 0}
            sizes="100vw"
            className="object-cover  object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-embassy via-embassy/80 to-embassy/25 rtl:lg:bg-gradient-to-l ltr:lg:bg-gradient-to-r" />
          <div className="absolute inset-0 bg-embassy/5" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1440px] items-end px-sm pb-[96px] pt-32 sm:px-md lg:items-center lg:pb-xxl lg:px-xl">
        <div
          id="hero-slide-copy"
          aria-live="polite"
          aria-atomic="true"
          className="w-full"
        >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={slideTransition}
            className="w-full max-w-[640px] border-s-2 border-court-gold ps-md sm:ps-lg"
          >
            <div className="mb-md flex items-center gap-sm text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
              <span className="h-px w-8 bg-court-gold" aria-hidden="true" />
              <span>{activeCopy.eyebrow}</span>
            </div>

            <h1 className="max-w-[20rem] font-headline text-display font-bold leading-[1.15] text-balance text-parchment sm:max-w-[26rem]">
              {activeCopy.headline}
            </h1>

            <p className="mt-md max-w-[50ch] text-body leading-8 text-parchment/80 sm:max-w-[48ch]">
              {activeCopy.body}
            </p>

            <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:gap-sm">
              <Link
                href="#services"
                className="group inline-flex min-h-12 flex-1 items-center justify-center gap-xs rounded-md bg-court-gold px-md text-title font-semibold text-embassy shadow-apparatus transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt"
              >
                <span className="whitespace-nowrap">{activeCopy.primaryCta}</span>
                <FiArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#packages"
                className="inline-flex min-h-12 whitespace-nowrap flex-1 items-center justify-center rounded-md border border-champagne-gilt/35 px-md text-title font-semibold text-parchment transition-colors duration-200 hover:border-champagne-gilt hover:bg-chancery/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt"
              >
                {activeCopy.secondaryCta}
              </Link>
            </div>

            <div className="mt-xl flex items-center gap-sm border-t border-champagne-gilt/20 pt-md text-label text-parchment/65">
              <span
                className="h-2 w-2 rounded-full bg-parchment/30"
                aria-hidden="true"
              />
              <span>{activeCopy.metric}</span>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-champagne-gilt/20 bg-embassy/90">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-md px-sm py-sm sm:px-md lg:px-xl">
          <div
            className="flex min-w-0 items-center gap-xs sm:gap-sm"
            role="group"
            aria-label={t.slidesLabel}
          >
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;
              const copy = t.slides[slide.copyKey];

              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  aria-controls="hero-slide-copy"
                  aria-label={copy.eyebrow}
                  onClick={() => selectSlide(index)}
                  className="group relative flex min-h-11 items-center gap-xs px-xs text-start text-label text-parchment/60 transition-colors duration-200 hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gilt sm:min-w-[122px] sm:px-sm"
                >
                  {isActive && (
                    <motion.span
                      layoutId="hero-active-marker"
                      className="absolute inset-x-0 bottom-[-13px] h-1 bg-court-gold"
                      transition={slideTransition}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block ${isActive ? "bg-court-gold" : "bg-parchment/30"}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`font-headline text-base font-bold leading-none sm:hidden ${isActive ? "text-court-gold" : "text-parchment/60"}`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden sm:block ${isActive ? "text-parchment" : ""}`}
                  >
                    {copy.eyebrow}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
