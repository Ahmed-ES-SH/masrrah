"use client";

import { type KeyboardEvent } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import type { FaqItem as FaqItemType } from "@/app/constants/faq";

interface FaqItemProps {
  item: FaqItemType;
  index: number;
  activeIndex: number | null;
  openLabel: string;
  closeLabel: string;
  shouldReduceMotion: boolean | null;
  transition: Transition;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  registerButton: (element: HTMLButtonElement | null) => void;
}

export default function FaqItem({
  item,
  index,
  activeIndex,
  openLabel,
  closeLabel,
  shouldReduceMotion,
  transition,
  onToggle,
  onKeyDown,
  registerButton,
}: FaqItemProps) {
  const isOpen = activeIndex === index;
  const answerId = `faq-answer-${item.id}`;

  return (
    <div className="border-b border-embassy/15 last:border-b-0">
      <button
        type="button"
        ref={registerButton}
        aria-expanded={isOpen}
        aria-controls={answerId}
        tabIndex={
          (activeIndex === null ? index === 0 : isOpen) ? 0 : -1
        }
        onClick={onToggle}
        onKeyDown={onKeyDown}
        className={`flex min-h-16 w-full items-center gap-md px-md py-sm text-start transition-colors duration-200 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-court-gold sm:min-h-[72px] sm:px-lg ${isOpen ? "bg-parchment/60" : "hover:bg-parchment/45 active:bg-parchment/60"}`}
      >
        <span className="min-w-0 flex-1 font-title text-title font-semibold leading-7 text-ink-deep">
          {item.question}
        </span>
        <span className="sr-only">
          {isOpen ? closeLabel : openLabel}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={transition}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${isOpen ? "border-embassy/30 text-embassy" : "border-embassy/15 text-embassy"}`}
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
}
