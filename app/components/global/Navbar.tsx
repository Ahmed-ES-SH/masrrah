"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE_LICENSE_NUMBER, SITE_PHONE } from "@/app/constants/site";
import { SOCIAL_LINKS } from "@/app/constants/social-links";
import { useTranslation } from "@/app/hooks/useTranslations";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "@/app/hooks/useLocale";

const PHONE_URL = `tel:+${SITE_PHONE}`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale() ?? "ar";
  const t = useTranslation("navbar");
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isSolid = scrolled || pathname.includes("/request");

  const NAV_LINKS: {
    href: string;
    key: "home" | "services" | "whyUs" | "faq";
  }[] = [
    { href: `/${locale}`, key: "home" },
    { href: `/${locale}#services`, key: "services" },
    { href: `/${locale}#why-us`, key: "whyUs" },
    { href: `/${locale}#faq`, key: "faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and close on Escape while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0  z-50 border-b pb-2 shadow-none transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          isSolid
            ? "border-champagne-gilt/20 top-0 bg-embassy/90 shadow-float backdrop-blur-md"
            : "border-transparent top-2 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 items-center justify-between gap-3 px-4 sm:gap-4 md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          {/* Start cluster — wordmark + license seal (desktop) or compact crest (mobile) */}
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div
              aria-label={t.brandLabel}
              className="flex shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
            >
              <motion.div
                className="relative"
                animate={{
                  width: isSolid ? 64 : 84,
                  height: isSolid ? 64 : 84,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.45, ease: "easeInOut" }
                }
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={isSolid ? "small" : "full"}
                    className="absolute inset-0"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Link href={`/${locale}`}>
                      <Image
                        width={360}
                        height={360}
                        src={isSolid ? "/small-logo.webp" : "/logo.webp"}
                        alt={t.brandLabel}
                        className="h-full w-full object-contain"
                      />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Center — desktop links only (hidden on mobile so the wordmark sits at the start) */}
          <nav
            className="hidden items-center justify-center gap-8 lg:flex"
            aria-label={t.menuLabel}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1.5 text-[0.9375rem] font-medium tracking-[0.01em] text-parchment transition-colors duration-150 ease-out hover:text-court-gold"
              >
                {t.nav[link.key]}
                <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-court-gold transition-transform duration-150 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* End cluster — logical end */}
          <div className="flex items-center justify-self-end gap-3.5 ">
            {/* Social icons — wide desktop only, WhatsApp always gold */}
            <div className="hidden items-center gap-3.5 border-e border-champagne-gilt/20 pe-3.5 xl:flex">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.socials[s.key]}
                  className={`flex h-8 w-8 items-center justify-center transition-colors duration-150 ease-out ${
                    s.gold
                      ? "text-court-gold"
                      : "text-parchment/85 hover:text-court-gold"
                  }`}
                >
                  <s.icon className="h-4.5 w-4.5" />
                </Link>
              ))}
            </div>

            {/* Signature widget: language seal — header (desktop) only, mobile lives in the drawer */}
            <div className="hidden lg:block">
              <Suspense>
                <LanguageSwitcher />
              </Suspense>
            </div>

            {/* Hamburger — mobile/tablet only */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.menuLabel}
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.25 lg:hidden"
            >
              <span className="h-[1.5px] w-5.5 bg-parchment" />
              <span className="h-[1.5px] w-5.5 bg-parchment" />
              <span className="h-[1.5px] w-5.5 bg-parchment" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-embassy/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />
      <div
        className={`fixed inset-y-0 inset-e-0 z-50 flex w-[min(320px,84vw)] flex-col gap-7 border-s border-champagne-gilt/20 bg-chancery p-6 transition-transform duration-250 ease-out lg:hidden ${
          menuOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/${locale}`}
            onClick={() => setMenuOpen(false)}
            className="flex min-w-0 items-center gap-3"
            aria-label={t.brandLabel}
          >
            <Image
              width={160}
              height={160}
              src="/small-logo.webp"
              alt=""
              className="h-11 w-11 shrink-0 object-contain"
            />
            <span className="min-w-0">
              <span className="block truncate font-title text-base font-semibold leading-none text-parchment">
                {t.brand}
              </span>
              <span
                dir="ltr"
                className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-champagne-gilt/30 px-2 py-0.5 text-[0.6875rem] font-bold tabular-nums leading-none text-court-gold"
              >
                {SITE_LICENSE_NUMBER}
              </span>
            </span>
          </Link>
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
        </div>

        <div className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-champagne-gilt/15 py-3.5 text-[1.0625rem] font-medium text-parchment"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>

        <a
          href={PHONE_URL}
          className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-court-gold text-sm font-semibold text-embassy"
        >
          {t.ctaMobile}
        </a>

        <div className="flex justify-center gap-4">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.socials[s.key]}
              className={`flex h-9 w-9 items-center justify-center ${s.gold ? "text-court-gold" : "text-parchment"}`}
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
