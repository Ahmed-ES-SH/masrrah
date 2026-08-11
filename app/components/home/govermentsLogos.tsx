"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

const GOVERNMENT_LOGOS = [
  {
    id: "musaned",
    src: "/goverments/مساند.svg",
    width: 276,
    height: 155,
  },
  {
    id: "ministryOfForeignAffairs",
    src: "/goverments/وزارة الخارجية.svg",
    width: 1000,
    height: 1000,
  },
  {
    id: "ministryOfInterior",
    src: "/goverments/وزارة-الداخلية.svg",
    width: 1000,
    height: 1000,
  },
  {
    id: "ministryOfLabor",
    src: "/goverments/وزارة-العمل والتنمية.svg",
    width: 1000,
    height: 1000,
  },
] as const;

const REPEAT_COUNT = 4;

export default function GovermentsLogos() {
  const locale = useLocale();
  const t = useTranslation("goverments");
  const shouldReduceMotion = useReducedMotion();

  const slides = Array.from({ length: REPEAT_COUNT }, () =>
    GOVERNMENT_LOGOS,
  ).flat();

  return (
    <section
      id="goverments"
      aria-labelledby="goverments-title"
      className="relative isolate overflow-hidden bg-embassy/90 backdrop-blur-xl text-parchment"
    >
      <div className="mx-auto w-full px-sm py-xxl sm:px-md lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.55, ease: "easeOut" }
          }
          className="mx-auto flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
            <span className="h-px w-8 bg-court-gold" aria-hidden="true" />
            <span>{t.eyebrow}</span>
            <span className="h-px w-8 bg-court-gold" aria-hidden="true" />
          </div>

          <h2
            id="goverments-title"
            className="mt-md max-w-[16ch] font-headline text-display font-bold leading-[1.12] text-parchment"
          >
            {t.title}
          </h2>

          <p className="mt-sm max-w-[52ch] text-body leading-7 text-parchment/80">
            {t.body}
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.1, ease: "easeOut" }
          }
          className="mt-xl"
        >
          <Swiper
            key={locale}
            className="!overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt"
            modules={[A11y, Keyboard]}
            a11y={{ enabled: true, slideRole: "listitem" }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            speed={shouldReduceMotion ? 0 : 700}
            loop
            grabCursor
            spaceBetween={40}
            slidesPerView={2}
            keyboard={{ enabled: true }}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 48 },
              768: { slidesPerView: 4, spaceBetween: 56 },
              1024: { slidesPerView: 5, spaceBetween: 64 },
              1280: { slidesPerView: 6, spaceBetween: 64 },
            }}
          >
            {slides.map((logo, index) => (
              <SwiperSlide
                key={`${logo.id}-${index}`}
                aria-hidden={index >= GOVERNMENT_LOGOS.length}
              >
                <div className="flex h-24 w-36 items-center justify-center sm:h-28 sm:w-44 lg:h-36 lg:w-56">
                  <Image
                    src={logo.src}
                    alt={`${t.logoAlt} ${t.logos[logo.id]}`}
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    decoding="async"
                    className="max-h-full w-auto max-w-full select-none object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
