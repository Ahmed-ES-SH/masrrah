"use client";

import { motion, type Transition } from "framer-motion";
import { heroSlides } from "@/app/constants/hero-sliders";
import type { HeroTranslations } from "./slideCopy";

export function SlideTabs({
  activeIndex,
  onSelect,
  transition,
  translations,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  transition: Transition;
  translations: HeroTranslations;
}) {
  return (
    <div
      className="flex min-w-0 items-center gap-xs sm:gap-sm"
      role="group"
      aria-label={translations.slidesLabel}
    >
      {heroSlides.map((slide, index) => {
        const isActive = index === activeIndex;
        const copy = translations.slides[slide.copyKey];

        return (
          <button
            key={slide.id}
            type="button"
            aria-current={isActive ? "true" : undefined}
            aria-controls="hero-slide-copy"
            aria-label={copy.eyebrow}
            onClick={() => onSelect(index)}
            className="group relative flex min-h-11 items-center gap-xs px-xs text-start text-label text-parchment/80 transition-colors duration-200 hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne-gilt sm:min-w-[122px] sm:px-sm"
          >
            {isActive && (
              <motion.span
                layoutId="hero-active-marker"
                className="absolute inset-x-0 bottom-[-13px] h-1 bg-court-gold"
                transition={transition}
                aria-hidden="true"
              />
            )}
            <span
              className={`hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block ${isActive ? "bg-court-gold" : "bg-parchment/30"}`}
              aria-hidden="true"
            />
            <span
              className={`font-headline text-base font-bold leading-none sm:hidden ${isActive ? "text-court-gold" : "text-parchment/80"}`}
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
  );
}
