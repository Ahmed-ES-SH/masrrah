"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { FAQ_CONTENT } from "@/app/constants/faq";
import { useLocale } from "@/app/hooks/useLocale";

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
      className="bg-parchment"
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
          {content.items.map((item, index) => {
            const isOpen = activeIndex === index;
            const answerId = `faq-answer-${item.id}`;

            return (
              <div
                key={item.id}
                className="border-b border-embassy/15 last:border-b-0"
              >
                <button
                  type="button"
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  tabIndex={
                    (activeIndex === null ? index === 0 : isOpen) ? 0 : -1
                  }
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`flex min-h-16 w-full items-center gap-md px-md py-sm text-start transition-colors duration-200 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-court-gold sm:min-h-[72px] sm:px-lg ${isOpen ? "bg-parchment/60" : "hover:bg-parchment/45 active:bg-parchment/60"}`}
                >
                  <span className="min-w-0 flex-1 font-title text-title font-semibold leading-7 text-ink-deep">
                    {item.question}
                  </span>
                  <span className="sr-only">
                    {isOpen ? content.closeLabel : content.openLabel}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={transition}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border ${isOpen ? "border-court-gold/60 text-court-gold" : "border-embassy/15 text-embassy"}`}
                    aria-hidden="true"
                  >
                    <FiChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={answerId}
                      initial={
                        shouldReduceMotion ? false : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition}
                      className="overflow-hidden"
                    >
                      <div
                        id={answerId}
                        className="border-t border-embassy/10 px-md pb-lg pt-sm sm:px-lg"
                      >
                        <p className="max-w-[65ch] text-body leading-7 text-ink-soft">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
