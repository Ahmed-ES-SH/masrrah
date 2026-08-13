"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  COMPANY_PHONES,
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_LICENSE_NUMBER,
} from "@/app/constants/site";
import { SOCIAL_LINKS } from "@/app/constants/social-links";
import { useTranslation } from "@/app/hooks/useTranslations";
import { useLocale } from "@/app/hooks/useLocale";
import FooterSocialSection from "./FooterSocialSection";

const MAILTO_URL = `mailto:${SITE_EMAIL}`;

const TICK_RING_STYLE: CSSProperties = {
  background:
    "repeating-conic-gradient(from 0deg, rgba(201,162,39,0.5) 0deg 2deg, transparent 2deg 8deg)",
  WebkitMask:
    "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
};

export default function Footer() {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("footer");
  const lt = useTranslation("licenseSection");
  const shouldReduceMotion = useReducedMotion();
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  const handleSubscribe = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-parchment text-ink-deep"
    >
      <section
        id="license"
        aria-labelledby="footer-license-title"
        className="relative isolate overflow-hidden border-b border-champagne-gilt/20 bg-embassy text-parchment"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-court-gold/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-3xl bg-court-gold/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto w-full px-sm py-xl sm:px-md lg:px-xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
            className="mx-auto flex max-w-[880px] flex-col items-center text-center"
          >
            <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-champagne-gilt">
              <span aria-hidden="true">◆</span>
              <span>{lt.eyebrow}</span>
              <span aria-hidden="true">◆</span>
            </div>

            <h2
              id="footer-license-title"
              className="mt-md max-w-[26ch] font-headline text-headline font-bold leading-[1.2] text-parchment"
            >
              {lt.title}
            </h2>

            <p className="mt-sm max-w-[56ch] text-body leading-8 text-parchment/75">
              {lt.body}
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mx-auto mt-xl flex max-w-[880px] flex-col items-center gap-xl lg:flex-row lg:justify-between"
          >
            <div className="flex flex-col items-center gap-xs lg:flex-1">
              <Image
                src="/goverments/(MHRSD)-logo.svg"
                alt={lt.ministryName}
                width={218}
                height={67}
                className="h-auto w-44 select-none object-contain sm:w-52"
              />
              <p className="max-w-[24ch] text-center text-label font-label leading-6 text-parchment/70">
                {lt.ministryName}
              </p>
            </div>

            <div className="relative h-44 w-44 shrink-0 sm:h-48 sm:w-48">
              <div
                className="absolute -inset-8 rounded-full bg-court-gold/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full border border-court-gold/40"
                aria-hidden="true"
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-1.5 rounded-full"
                style={TICK_RING_STYLE}
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="absolute inset-5 rounded-full border border-court-gold/25"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <FiShield
                  className="h-5 w-5 text-court-gold"
                  aria-hidden="true"
                />
                <p className="text-label font-label uppercase tracking-[0.14em] text-champagne-gilt/90">
                  {lt.licenseLabel}
                </p>
                <p
                  dir="ltr"
                  className="select-none font-headline text-[clamp(2.5rem,6vw,3.25rem)] font-bold leading-none tracking-tight text-court-gold tabular-nums drop-shadow-gold-glow"
                >
                  {SITE_LICENSE_NUMBER}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-md lg:flex-1">
              <Link
                href={lt.verifyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-xs rounded-md border border-champagne-gilt/30 px-md text-label font-semibold text-parchment transition-colors duration-200 hover:border-court-gold hover:text-court-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
              >
                <span>{lt.verifyLabel}</span>
                <FiArrowUpRight
                  className="h-4 w-4 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto w-full px-sm py-xxl pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-md lg:px-xl">
        <div className="grid gap-xl lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-xxl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={transition}
            className="flex flex-col"
          >
            <div className="flex items-start gap-md">
              <Image
                src="/small-logo.webp"
                alt={t.title}
                width={160}
                height={160}
                className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
              />
              <div className="pt-xxs">
                <p
                  id="footer-title"
                  className="font-title text-title font-semibold text-ink-deep"
                >
                  {t.title}
                </p>
                <p className="mt-xxs text-label font-label uppercase tracking-[0.1em] text-amendment">
                  {t.tagline}
                </p>
              </div>
            </div>

            <p className="mt-lg max-w-[43ch] text-body leading-8 text-ink-soft">
              {t.about}
            </p>

            <div className="mt-lg flex items-center gap-xs border-t border-embassy/15 pt-md">
              <span
                className="me-xs hidden text-ink-soft sm:inline"
                aria-hidden="true"
              >
                ◆
              </span>
              <p className="hidden text-label font-label uppercase tracking-[0.12em] text-ink-soft sm:block">
                {t.socials.heading}
              </p>
              <div className="ms-auto flex items-center gap-xs">
                {SOCIAL_LINKS.map(({ key, href, icon: Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.socials[key]}
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-embassy/20 text-ink-soft transition-colors duration-200 hover:border-amendment hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
                  >
                    <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="rounded-lg border border-embassy/15 bg-marble p-md shadow-float sm:p-lg"
          >
            <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-ink-soft">
              <span aria-hidden="true">◆</span>
              <span>{t.newsletter.eyebrow}</span>
            </div>

            <div className="mt-md grid gap-lg lg:grid-cols-[minmax(0,0.9fr)_minmax(260px,1.1fr)] lg:items-end lg:gap-xl">
              <div>
                <h2 className="max-w-[18ch] font-title text-title font-semibold leading-8 text-ink-deep">
                  {t.newsletter.title}
                </h2>
                <p className="mt-sm max-w-[42ch] text-body leading-7 text-ink-soft">
                  {t.newsletter.body}
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="min-w-0">
                <label
                  htmlFor="footer-email"
                  className="text-label font-label text-ink-soft"
                >
                  {t.newsletter.emailLabel}
                </label>
                <div className="mt-xs flex flex-col gap-xs sm:flex-row">
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t.newsletter.placeholder}
                    className="min-h-12 min-w-0 flex-1 rounded-sm border border-embassy/25 bg-parchment px-sm text-body text-ink-deep placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
                  >
                    <span>{t.newsletter.submit}</span>
                    <FiArrowUpRight
                      className="h-4 w-4 rtl:scale-x-[-1]"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  {subscribed ? (
                    <motion.p
                      key="subscribed"
                      role="status"
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion ? undefined : { opacity: 0, y: -6 }
                      }
                      transition={transition}
                      className="mt-sm text-label text-success"
                    >
                      {t.newsletter.success}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/*  FooterSocialSection */}
        <FooterSocialSection MAILTO_URL={MAILTO_URL} locale={locale} />

        <div className="mt-xl flex flex-col gap-sm border-t border-embassy/15 pt-md text-label text-ink-soft/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.title}. {t.legal.rights}.
          </p>
          <p>
            {t.legal.madeWith}{" "}
            <span className="text-ink-soft" aria-hidden="true">
              ◆
            </span>{" "}
            {t.title}
          </p>
        </div>
      </div>
    </footer>
  );
}
