"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_PHONES, SITE_ADDRESS, SITE_EMAIL } from "@/app/constants/site";
import { SOCIAL_LINKS } from "@/app/constants/social-links";
import { useTranslation } from "@/app/hooks/useTranslations";
import { useLocale } from "@/app/hooks/useLocale";

const MAILTO_URL = `mailto:${SITE_EMAIL}`;

export default function Footer() {
  const locale = useLocale() ?? "ar";
  const t = useTranslation("footer");
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
      aria-labelledby="footer-title"
      className="relative isolate overflow-hidden bg-parchment text-ink-deep"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-court-gold/20" />

      <div className="mx-auto w-full  px-sm py-xxl pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-md lg:px-xl">
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

            <div className="mt-lg flex items-center gap-xs border-t border-court-gold/15 pt-md">
              <span
                className="me-xs hidden text-court-gold sm:inline"
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
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-court-gold/25 text-ink-soft transition-colors duration-200 hover:border-amendment hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
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
            className="rounded-lg border border-court-gold/20 bg-marble p-md shadow-float sm:p-lg"
          >
            <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-court-gold">
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
                    className="min-h-12 min-w-0 flex-1 rounded-sm border border-court-gold/25 bg-parchment px-sm text-body text-ink-deep placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
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

        <div className="mt-xl grid gap-xl border-t border-court-gold/15 pt-xl sm:grid-cols-2 lg:grid-cols-[0.8fr_0.9fr_1.3fr] lg:gap-xxl">
          <div>
            <p className="text-label font-label uppercase tracking-[0.12em] text-amendment">
              {t.nav.heading}
            </p>
            <nav
              aria-label={t.nav.heading}
              className="mt-sm flex flex-col items-start gap-xs"
            >
              <Link
                href="#home"
                className="min-h-11 py-xs text-body text-ink-soft transition-colors duration-200 hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
              >
                {t.nav.home}
              </Link>
              <Link
                href="#services"
                className="min-h-11 py-xs text-body text-ink-soft transition-colors duration-200 hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
              >
                {t.nav.services}
              </Link>
              <Link
                href={`/${locale}/request`}
                className="min-h-11 py-xs text-body text-ink-soft transition-colors duration-200 hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
              >
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-label font-label uppercase tracking-[0.12em] text-amendment">
              {t.contact.heading}
            </p>
            <ul className="mt-sm divide-y divide-court-gold/15">
              {COMPANY_PHONES.map(({ labelKey, national, tel, whatsapp }) => (
                <li key={tel} className="flex min-h-12 items-center gap-2 py-1">
                  <a
                    href={`tel:${tel}`}
                    aria-label={`${t.phones[labelKey]} ${national}`}
                    className="flex min-h-11 flex-1 items-center gap-2 text-body text-ink-soft transition-colors duration-200 hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
                  >
                    <FiPhone
                      className="h-4 w-4 shrink-0 text-amendment"
                      aria-hidden="true"
                    />
                    <span className="text-label text-ink-soft/70">
                      {t.phones[labelKey]}
                    </span>
                    <span
                      dir="ltr"
                      className="font-semibold tabular-nums tracking-[0.02em] text-ink-deep"
                    >
                      {national}
                    </span>
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.phones[labelKey]} ${national} — ${t.contact.whatsapp}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-court-gold/25 text-ink-soft transition-colors duration-200 hover:border-amendment hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
                  >
                    <FaWhatsapp
                      className="h-4 w-4 shrink-0 text-amendment"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
              <li className="flex min-h-12 items-center py-1">
                <a
                  href={MAILTO_URL}
                  className="flex min-h-11 w-full items-center gap-2 text-body text-ink-soft transition-colors duration-200 hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
                >
                  <FiMail
                    className="h-4 w-4 shrink-0 text-amendment"
                    aria-hidden="true"
                  />
                  <span dir="ltr">{SITE_EMAIL}</span>
                </a>
              </li>
              <li className="flex min-h-12 items-center py-1">
                <span className="flex min-h-11 w-full items-center gap-2 text-body text-ink-soft">
                  <FiMapPin
                    className="h-4 w-4 shrink-0 text-amendment"
                    aria-hidden="true"
                  />
                  <span>{SITE_ADDRESS}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-lg sm:col-span-2 lg:col-span-1 lg:items-end">
            <Link
              href="#home"
              aria-label={t.backToTop}
              className="inline-flex min-h-11 items-center gap-xs self-start border-b border-court-gold/30 pb-xs text-label font-label text-ink-soft transition-colors duration-200 hover:border-amendment hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amendment lg:self-end"
            >
              <FiArrowUp className="h-4 w-4" aria-hidden="true" />
              <span>{t.backToTop}</span>
            </Link>
          </div>
        </div>

        <div className="mt-xl flex flex-col gap-sm border-t border-court-gold/15 pt-md text-label text-ink-soft/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.title}. {t.legal.rights}.
          </p>
          <p>
            {t.legal.madeWith}{" "}
            <span className="text-court-gold" aria-hidden="true">
              ◆
            </span>{" "}
            {t.title}
          </p>
        </div>
      </div>
    </footer>
  );
}
