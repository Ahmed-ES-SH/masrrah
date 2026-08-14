"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { TESTIMONIAL_CONTENT } from "@/app/constants/testimonials";
import { useLocale } from "@/app/hooks/useLocale";
import { revealTransition } from "@/app/helpers/transitions";
import { Stars } from "./stars";
import { TestimonialCard } from "./testimonialCard";
import Section from "@/app/components/common/Section";

export default function TestimonialsSection() {
  const locale = useLocale() ?? "ar";
  const content = TESTIMONIAL_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const [featured, ...rest] = content.items;

  return (
    <Section
      id="testimonials"
      aria-labelledby="testimonials-title"
      aria-label={content.ariaLabel}
      className="bg-parchment text-ink-deep"
      clip
    >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition(shouldReduceMotion)}
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
              id="testimonials-title"
              className="mt-md max-w-[16ch] font-headline text-display font-medium leading-[1.12] text-embassy"
            >
              {content.title}
            </h2>

            <p className="mt-md max-w-[52ch] text-body leading-8 text-ink-soft">
              {content.body}
            </p>
          </div>

          <div className="flex items-end gap-sm border-s border-embassy/25 ps-md lg:justify-self-end">
            <div className="pb-xxs">
              <p className="text-embassy">
                <span className="font-headline text-[2.75rem] font-bold leading-none tracking-tight tabular-nums">
                  {content.rating}
                </span>
                <span className="ms-xxs text-label font-semibold text-embassy">
                  / 5
                </span>
              </p>
              <p className="mt-xs text-label font-label uppercase tracking-[0.1em] text-embassy">
                {content.ratingLabel}
              </p>
              <p className="mt-xs flex items-center gap-xs text-label leading-5 text-ink-soft">
                <FiCheck
                  className="h-3.5 w-3.5 shrink-0 text-success"
                  aria-hidden="true"
                />
                <span>{content.ratingNote}</span>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-lg grid gap-sm lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-md">
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={revealTransition(shouldReduceMotion, 0.1)}
            className="relative flex flex-col overflow-hidden rounded-lg border border-embassy/10 bg-parchment p-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold sm:p-lg"
          >
            <span
              className="pointer-events-none absolute -top-5 start-2 select-none font-headline text-[9rem] font-bold leading-[0.8] text-embassy/[0.05]"
              aria-hidden="true"
            >
              {featured.initial}
            </span>

            <div className="relative flex items-center justify-between gap-sm">
              <Stars rating={featured.rating} />
              <span className="text-label font-label uppercase tracking-[0.1em] text-ink-soft">
                {featured.service}
              </span>
            </div>

            <blockquote className="relative mt-lg max-w-[34ch] font-headline text-headline font-bold leading-snug text-embassy">
              {featured.quote}
            </blockquote>

            <footer className="relative mt-auto flex items-center gap-sm border-t border-embassy/15 pt-md">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-embassy/15 bg-marble font-headline text-title font-bold text-embassy">
                {featured.initial}
              </span>
              <div className="min-w-0">
                <p className="truncate font-title text-title font-semibold leading-tight text-embassy">
                  {featured.name}
                </p>
                <p className="mt-xxs truncate text-label text-ink-soft">
                  {featured.role}
                  <span className="mx-xs inline-block h-px w-4 translate-y-[-3px] bg-embassy/20" aria-hidden="true" />
                  {featured.location}
                </p>
              </div>
            </footer>
          </motion.article>

          <div className="grid gap-sm sm:grid-cols-2">
            {rest.map((item, index) => (
              <TestimonialCard
                key={item.id}
                item={item}
                shouldReduceMotion={shouldReduceMotion}
                transition={revealTransition(shouldReduceMotion, 0.08 + index * 0.06)}
              />
            ))}
          </div>
        </div>
    </Section>
  );
}