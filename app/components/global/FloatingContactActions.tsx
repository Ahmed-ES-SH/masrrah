"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { SITE_PHONE, SITE_WHATSAPP } from "@/app/constants/site";
import { useTranslation } from "@/app/hooks/useTranslations";

const PHONE_URL = `tel:+${SITE_PHONE}`;
const WHATSAPP_URL = `https://wa.me/${SITE_WHATSAPP}`;

export default function FloatingContactActions() {
  const t = useTranslation("header");
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.nav
      aria-label={t.contact.call}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="pointer-events-none fixed bottom-4 inset-e-4 z-40 sm:bottom-6 sm:inset-e-6"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-xs rounded-lg p-xs">
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.whatsapp}
          title={t.contact.whatsapp}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="flex h-11 w-11 items-center justify-center rounded-md bg-success text-parchment transition-colors duration-200 hover:bg-success/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
        >
          <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
        </motion.a>

        <motion.a
          href={PHONE_URL}
          aria-label={t.contact.call}
          title={t.contact.call}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="flex h-11 w-11 items-center justify-center rounded-md bg-court-gold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
        >
          <FiPhoneCall className="h-5 w-5 shrink-0" aria-hidden="true" />
        </motion.a>
      </div>
    </motion.nav>
  );
}
