"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FAQ_CONTENT } from "@/app/constants/faq";
import { useLocale } from "@/app/hooks/useLocale";
import FaqItem from "./faqItem";

export default function FaqSection() {
  const locale = useLocale() ?? "ar";
  const content = FAQ_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  const focusItem = (index: number) => {
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const isRtl = locale === "ar";
    let nextIndex: number | undefined;

    if (event.key === "ArrowDown")
      nextIndex = (index + 1) % content.items.length;
    if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + content.items.length) % content.items.length;
    }
    if (event.key === "ArrowRight") {
      nextIndex = isRtl
        ? (index - 1 + content.items.length) % content.items.length
        : (index + 1) % content.items.length;
    }
    if (event.key === "ArrowLeft") {
      nextIndex = isRtl
        ? (index + 1) % content.items.length
        : (index - 1 + content.items.length) % content.items.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = content.items.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      focusItem(nextIndex);
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      aria-label={content.ariaLabel}
      className="scroll-mt-24 bg-parchment"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-xl px-sm py-xxl sm:px-md lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-xxl lg:px-xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={transition}
          className="lg:sticky lg:top-28"
        >
          <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-ink-soft">
            <span className="text-court-gold" aria-hidden="true">
              ◆
            </span>
            <span>{content.eyebrow}</span>
          </div>

          <h2
            id="faq-title"
            className="mt-md max-w-[16ch] font-headline text-display font-bold leading-[1.12] text-embassy"
          >
            {content.title}
          </h2>

          <p className="mt-md max-w-[44ch] text-body leading-8 text-ink-soft">
            {content.body}
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
          className="overflow-hidden rounded-lg border border-embassy/15 bg-marble"
        >
          {content.items.map((item, index) => (
            <FaqItem
              key={item.id}
              item={item}
              index={index}
              activeIndex={activeIndex}
              openLabel={content.openLabel}
              closeLabel={content.closeLabel}
              shouldReduceMotion={shouldReduceMotion}
              transition={transition}
              onToggle={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              onKeyDown={(event) => handleKeyDown(event, index)}
              registerButton={(element) => {
                buttonRefs.current[index] = element;
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
