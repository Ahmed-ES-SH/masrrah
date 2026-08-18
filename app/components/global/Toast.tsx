"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { FiClock, FiX } from "react-icons/fi";
import type { IconType } from "react-icons";
import { useTranslation } from "@/app/hooks/useTranslations";
import { useLocale } from "@/app/hooks/useLocale";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: IconType;
  duration?: number;
  closeButtonLabel?: string;
}

export default function Toast({
  open,
  onClose,
  title,
  message,
  icon: Icon = FiClock,
  duration = 4000,
  closeButtonLabel,
}: ToastProps) {
  const locale = useLocale();
  const t = useTranslation("toast");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="toast"
          role="status"
          aria-live="polite"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : { opacity: 0, y: 24, scale: 0.95 }
          }
          transition={transition}
          className="pointer-events-none fixed bottom-4 inset-e-4 z-50 flex justify-end sm:bottom-6 sm:inset-e-6"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: locale === "ar" ? 28 : -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.08 }
            }
            className="pointer-events-auto flex w-full max-w-2xl items-start gap-sm rounded-lg border border-ink-deep/10 bg-marble p-sm shadow-apparatus"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-court-gold"
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="type-title text-embassy">{title}</p>
              <p className="mt-xxs type-body text-ink-soft">{message}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={closeButtonLabel ?? t.close}
              title={closeButtonLabel ?? t.close}
              className="ms-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-soft transition-colors duration-200 hover:bg-embassy/5 hover:text-embassy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
            >
              <FiX className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
