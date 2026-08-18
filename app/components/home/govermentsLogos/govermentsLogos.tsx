"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { useLocale } from "@/app/hooks/useLocale";
import { revealTransition } from "@/app/helpers/transitions";
import { useTranslation } from "@/app/hooks/useTranslations";
import Section from "@/app/components/common/Section";
import LogoItem from "./logoItem";

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
    id: "ministryOfHumanResources",
    src: "/goverments/(MHRSD)-logo.svg",
    width: 218,
    height: 67,
  },
] as const;

export default function GovermentsLogos() {
  const locale = useLocale();
  const t = useTranslation("goverments");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="goverments"
      aria-labelledby="goverments-title"
      className="isolate border-y border-embassy/10 bg-parchment text-ink-deep"
      clip
    >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={revealTransition(shouldReduceMotion)}
          className="mx-auto flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-xs type-label uppercase text-embassy">
            <span className="h-px w-8 bg-embassy/40" aria-hidden="true" />
            <span>{t.eyebrow}</span>
            <span className="h-px w-8 bg-embassy/40" aria-hidden="true" />
          </div>

          <h2
            id="goverments-title"
            className="mt-md max-w-[16ch] type-display text-embassy"
          >
            {t.title}
          </h2>

          <p className="mt-sm max-w-[52ch] type-body-lg text-ink-soft">
            {t.body}
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition(shouldReduceMotion, 0.1, 0.6)}
          className="mt-lg"
        >
          <Swiper
            key={locale}
            className="!overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
            modules={[A11y, Keyboard]}
            a11y={{ enabled: true, slideRole: "listitem" }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            speed={shouldReduceMotion ? 0 : 700}
            grabCursor
            spaceBetween={24}
            slidesPerView={1.5}
            centeredSlides={false}
            keyboard={{ enabled: true }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 32 },
              768: { slidesPerView: 3, spaceBetween: 40 },
              1024: { slidesPerView: 4, spaceBetween: 48 },
            }}
          >
            {GOVERNMENT_LOGOS.map((logo) => (
              <SwiperSlide key={logo.id}>
                <LogoItem
                  src={logo.src}
                  alt={`${t.logoAlt} ${t.logos[logo.id]}`}
                  width={logo.width}
                  height={logo.height}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
    </Section>
  );
}
