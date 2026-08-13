import { motion, useReducedMotion } from "framer-motion";
import {
  COMPANY_PHONES,
  LOCATION_ON_MAP,
  SITE_ADDRESS,
  SITE_EMAIL,
} from "@/app/constants/site";
import { LocaleType } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiExternalLink, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

interface FooterSocialSectionProps {
  locale: LocaleType;
  MAILTO_URL: string;
}

// Derive a stable, embeddable Google Maps URL from the shared company location.
// The place link from LOCATION_ON_MAP isn't directly iframe-safe, so we extract
// the coordinates to build the canonical `maps?q=<lat>,<lng>&output=embed` form.
function buildMapEmbedSrc(locale: LocaleType): string {
  const coords = LOCATION_ON_MAP.match(/@(-?[\d.]+),(-?[\d.]+)/);
  if (coords) {
    return `https://www.google.com/maps?q=${coords[1]},${coords[2]}&z=17&hl=${locale}&output=embed`;
  }
  return `${LOCATION_ON_MAP.split("?")[0]}?output=embed&hl=${locale}`;
}

export default function FooterSocialSection({
  locale,
  MAILTO_URL,
}: FooterSocialSectionProps) {
  const t = useTranslation("footer");
  const shouldReduceMotion = useReducedMotion();
  const mapEmbedSrc = buildMapEmbedSrc(locale);
  return (
    <div className="mt-xl grid gap-xl border-t border-embassy/15 pt-xl sm:grid-cols-2 lg:grid-cols-[0.8fr_0.9fr_1.3fr] lg:gap-xxl">
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
        <ul className="mt-sm divide-y divide-embassy/15">
          {COMPANY_PHONES.map(({ labelKey, national, tel, whatsapp }) => (
            <li key={tel} className="flex min-h-12 items-center gap-2 py-1">
              <a
                href={`tel:${tel}`}
                aria-label={`${t.phones[labelKey]} ${national}`}
                className="flex min-h-11 flex-1 items-center gap-2 text-body text-ink-soft transition-colors duration-200 hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
              >
                <FiPhone
                  className="h-4 w-4 shrink-0 text-ink-soft"
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
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-embassy/20 text-ink-soft transition-colors duration-200 hover:border-amendment hover:text-amendment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
              >
                <FaWhatsapp
                  className="h-4 w-4 shrink-0 text-ink-soft"
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
                className="h-4 w-4 shrink-0 text-ink-soft"
                aria-hidden="true"
              />
              <span dir="ltr">{SITE_EMAIL}</span>
            </a>
          </li>
          <li className="flex min-h-12 items-center py-1">
            <span className="flex min-h-11 w-full items-center gap-2 text-body text-ink-soft">
              <FiMapPin
                className="h-4 w-4 shrink-0 text-ink-soft"
                aria-hidden="true"
              />
              <span>{SITE_ADDRESS[locale]}</span>
            </span>
          </li>
        </ul>
      </div>
      <motion.div
        className="sm:col-span-2 lg:col-span-1"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <p className="text-label font-label uppercase tracking-[0.12em] text-amendment">
          {t.map.heading}
        </p>
        <div className="relative mt-sm overflow-hidden rounded-lg border border-embassy/15 bg-marble">
          <iframe
            title={t.map.heading}
            src={mapEmbedSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 sm:h-72 lg:h-full lg:min-h-[260px]"
          />
        </div>
        <a
          href={LOCATION_ON_MAP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-xs inline-flex min-h-11 items-center gap-xs text-label text-ink-soft underline-offset-4 transition-colors duration-200 hover:text-amendment hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amendment"
        >
          <span>{t.map.open}</span>
          <FiExternalLink
            className="h-4 w-4 rtl:scale-x-[-1]"
            aria-hidden="true"
          />
        </a>
      </motion.div>
    </div>
  );
}
