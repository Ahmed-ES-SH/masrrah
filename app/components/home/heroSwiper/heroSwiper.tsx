"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useEffect, useState } from "react";
import { heroSlides } from "@/app/constants/hero-sliders";
import { useTranslation } from "@/app/hooks/useTranslations";
import { SlideCopy } from "./slideCopy";
import { SlideTabs } from "./slideTabs";

const AUTOPLAY_MS = 6500;
const DRAG_OFFSET_PX = 60;
const DRAG_VELOCITY_PX_PER_S = 400;

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
    const swipedRight =
      info.offset.x > DRAG_OFFSET_PX || info.velocity.x > DRAG_VELOCITY_PX_PER_S;
    const swipedLeft =
      info.offset.x < -DRAG_OFFSET_PX ||
      info.velocity.x < -DRAG_VELOCITY_PX_PER_S;
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
      className="relative isolate min-h-svh overflow-hidden bg-marble text-ink-deep"
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
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-parchment/85 via-parchment/45 to-parchment/5 rtl:lg:bg-gradient-to-l ltr:lg:bg-gradient-to-r" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1440px] items-end px-sm pb-[96px] pt-32 sm:px-md lg:items-center lg:pb-xxl lg:px-xl">
        <SlideCopy
          copy={activeCopy}
          slideKey={activeSlide.id}
          transition={slideTransition}
          reducedMotion={shouldReduceMotion}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-ink-deep/10 bg-marble/90">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-md px-sm py-sm sm:px-md lg:px-xl">
          <SlideTabs
            activeIndex={activeIndex}
            onSelect={selectSlide}
            transition={slideTransition}
            translations={t}
          />
        </div>
      </div>
    </section>
  );
}
