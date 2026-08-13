"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import { BLOG_CONTENT } from "@/app/constants/blog";
import { revealTransition } from "@/app/helpers/transitions";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";
import Toast from "@/app/components/global/Toast";
import Section from "@/app/components/common/Section";
import ArticleCard from "./articleCard";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export default function BlogSection() {
  const locale = useLocale() ?? "ar";
  const content = BLOG_CONTENT[locale];
  const toastContent = useTranslation("toast");
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const total = content.posts.length;
  const transition = revealTransition(shouldReduceMotion);

  const moveTo = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <Section
      id="journal"
      aria-labelledby="journal-title"
      aria-label={content.ariaLabel}
      className="bg-parchment text-ink-deep"
      containerClassName="overflow-hidden"
    >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
          className="flex flex-wrap items-end justify-between gap-lg"
        >
          <div className="max-w-184">
            <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-ink-soft">
              <span className="text-embassy" aria-hidden="true">
                ◆
              </span>
              <span>{content.eyebrow}</span>
            </div>

            <h2
              id="journal-title"
              className="mt-md max-w-[16ch] font-headline text-display font-bold leading-[1.12] text-embassy"
            >
              {content.title}
            </h2>

            <p className="mt-md max-w-[52ch] text-body leading-8 text-ink-soft">
              {content.body}
            </p>
          </div>

          <div className="flex items-center gap-sm">
            <p
              className="me-sm text-label font-label tabular-nums tracking-[0.12em] text-ink-soft"
              aria-live="polite"
            >
              <span className="text-embassy">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true"> / </span>
              {String(total).padStart(2, "0")}
            </p>

            <button
              type="button"
              aria-label={content.previous}
              onClick={() => moveTo(Math.max(activeIndex - 1, 0))}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-embassy/25 text-embassy transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
            >
              <FiChevronLeft
                className="h-5 w-5 rtl:scale-x-[-1]"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              aria-label={content.next}
              onClick={() => moveTo(Math.min(activeIndex + 1, total - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-embassy/25 text-embassy transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
            >
              <FiChevronRight
                className="h-5 w-5 rtl:scale-x-[-1]"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={revealTransition(shouldReduceMotion, 0.1, 0.6)}
          className="mt-lg"
        >
          <Swiper
            key={locale}
            className="!overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gilt"
            wrapperClass="items-stretch"
            modules={[A11y, Keyboard]}
            a11y={{
              enabled: true,
              containerRoleDescriptionMessage: content.ariaLabel,
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
          >
            {content.posts.map((post) => (
              <SwiperSlide key={post.id} className="h-full">
                <ArticleCard post={post} onOpen={() => setToastOpen(true)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        title={toastContent.journalComingSoon.title}
        message={toastContent.journalComingSoon.message}
      />
    </Section>
  );
}
