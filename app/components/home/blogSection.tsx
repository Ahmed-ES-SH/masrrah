"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { BLOG_CONTENT } from "@/app/constants/blog";
import { useLocale } from "@/app/hooks/useLocale";

export default function BlogSection() {
  const locale = useLocale() ?? "ar";
  const content = BLOG_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const total = content.posts.length;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: "easeOut" as const };

  const moveTo = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <section
      id="journal"
      aria-labelledby="journal-title"
      aria-label={content.ariaLabel}
      className="bg-embassy text-parchment"
    >
      <div className="mx-auto w-full overflow-hidden px-sm py-xxl sm:px-md lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
          className="flex flex-wrap items-end justify-between gap-lg"
        >
          <div className="max-w-184">
            <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
              <span className="text-court-gold" aria-hidden="true">
                ◆
              </span>
              <span>{content.eyebrow}</span>
            </div>

            <h2
              id="journal-title"
              className="mt-md max-w-[16ch] font-headline text-display font-bold leading-[1.12] text-parchment"
            >
              {content.title}
            </h2>

            <p className="mt-md max-w-[52ch] text-body leading-8 text-parchment/75">
              {content.body}
            </p>
          </div>

          <div className="flex items-center gap-sm">
            <p
              className="me-sm text-label font-label tabular-nums tracking-[0.12em] text-parchment/55"
              aria-live="polite"
            >
              <span className="text-court-gold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true"> / </span>
              {String(total).padStart(2, "0")}
            </p>

            <button
              type="button"
              aria-label={content.previous}
              onClick={() => moveTo(Math.max(activeIndex - 1, 0))}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-champagne-gilt/30 text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
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
              className="flex h-11 w-11 items-center justify-center rounded-md border border-champagne-gilt/30 text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
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
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-lg border border-champagne-gilt/25 bg-chancery hover:border-champagne-gilt/50 motion-safe:transition-all motion-safe:duration-150 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
                >
                  <span
                    className="pointer-events-none absolute -top-5 start-2 select-none font-headline text-[9rem] font-bold leading-[0.8] text-court-gold/[0.08]"
                    aria-hidden="true"
                  >
                    {post.initial}
                  </span>

                  <div className="relative z-10 flex min-h-10 items-center gap-xs border-b border-champagne-gilt/15 px-md">
                    <span className="text-court-gold" aria-hidden="true">
                      ◆
                    </span>
                    <span className="text-label font-label uppercase tracking-[0.1em] text-champagne-gilt/75">
                      {post.category}
                    </span>
                    <span className="ms-auto text-label leading-5 text-parchment/45">
                      {post.date}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col p-md sm:p-lg">
                    <h3 className="font-headline text-headline font-bold leading-snug text-parchment">
                      {post.title}
                    </h3>

                    <p className="mb-md mt-sm text-body leading-7 text-parchment/65">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-xs border-t border-champagne-gilt/15 pt-md">
                      <span className="text-label leading-5 text-parchment/50">
                        {post.readTime}
                      </span>
                      <span
                        className="ms-auto flex h-9 w-9 items-center justify-center rounded-md border border-court-gold/45 text-court-gold motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      >
                        <FiArrowUpRight className="h-4 w-4 rtl:scale-x-[-1]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
