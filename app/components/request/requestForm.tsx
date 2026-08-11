"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiArrowUpRight, FiCheck, FiMessageCircle } from "react-icons/fi";
import { SITE_EMAIL, SITE_WHATSAPP } from "@/app/constants/site";
import {
  RECRUITMENT_PACKAGES,
  RecruitmentPackageKey,
} from "@/app/constants/packages";
import { useTranslation } from "@/app/hooks/useTranslations";

interface RequestFormProps {
  initialPackage: RecruitmentPackageKey;
}

export default function RequestForm({ initialPackage }: RequestFormProps) {
  const t = useTranslation("request");
  const packages = useTranslation("packages");
  const [activePackage, setActivePackage] =
    useState<RecruitmentPackageKey>(initialPackage);

  const routeLabel = packages.items[activePackage].label;
  const whatsappUrl = `https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent(
    t.whatsappMessage.replace("{route}", routeLabel),
  )}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = t.emailSubject.replace("{route}", routeLabel);
    const body = [
      `${t.routeLabel}: ${routeLabel}`,
      `${t.nameLabel}: ${formData.get("name") ?? ""}`,
      `${t.phoneLabel}: ${formData.get("phone") ?? ""}`,
      `${t.messageLabel}: ${formData.get("message") ?? ""}`,
    ].join("\n\n");

    window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      aria-labelledby="request-title"
      aria-label={t.ariaLabel}
      className="flex pt-20 h-screen flex-col justify-center bg-parchment text-ink-deep"
    >
      <div className="mx-auto grid w-full gap-xl px-sm py-xxl sm:px-md lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-xxl lg:px-xl">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-xs text-label font-label uppercase tracking-[0.14em] text-ink-soft">
            <span className="text-court-gold" aria-hidden="true">
              ◆
            </span>
            <span>{t.eyebrow}</span>
          </div>

          <h1
            id="request-title"
            className="mt-md max-w-[16ch] font-headline text-display font-bold leading-[1.12] text-embassy"
          >
            {t.title}
          </h1>

          <p className="mt-md max-w-[43ch] text-body leading-8 text-ink-soft">
            {t.body}
          </p>

          <div className="mt-xl border-s border-court-gold ps-md">
            <p className="text-label font-label uppercase tracking-[0.1em] text-court-gold">
              {t.privateNote}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-embassy/15 bg-marble p-md sm:p-lg">
          <form onSubmit={handleSubmit}>
            <div className="border-b border-embassy/15 pb-md">
              <label
                htmlFor="request-package"
                className="text-label font-label uppercase tracking-[0.1em] text-ink-soft"
              >
                {t.routeLabel}
              </label>
              <select
                id="request-package"
                name="package"
                value={activePackage}
                onChange={(event) =>
                  setActivePackage(event.target.value as RecruitmentPackageKey)
                }
                className="mt-xs min-h-12 w-full rounded-sm border border-embassy/15 bg-marble px-sm text-body text-embassy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
              >
                {RECRUITMENT_PACKAGES.map((packageItem) => (
                  <option key={packageItem.key} value={packageItem.key}>
                    {packages.items[packageItem.key].label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-lg grid gap-md sm:grid-cols-2">
              <div>
                <label
                  htmlFor="request-name"
                  className="text-label font-label uppercase tracking-[0.1em] text-ink-soft"
                >
                  {t.nameLabel}
                </label>
                <input
                  id="request-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t.namePlaceholder}
                  required
                  className="mt-xs min-h-12 w-full rounded-sm border border-embassy/15 bg-marble px-sm text-body text-embassy placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="request-phone"
                  className="text-label font-label uppercase tracking-[0.1em] text-ink-soft"
                >
                  {t.phoneLabel}
                </label>
                <input
                  id="request-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={t.phonePlaceholder}
                  required
                  className="mt-xs min-h-12 w-full rounded-sm border border-embassy/15 bg-marble px-sm text-body text-embassy placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
                />
              </div>
            </div>

            <div className="mt-md">
              <label
                htmlFor="request-message"
                className="text-label font-label uppercase tracking-[0.1em] text-ink-soft"
              >
                {t.messageLabel}
              </label>
              <textarea
                id="request-message"
                name="message"
                rows={6}
                placeholder={t.messagePlaceholder}
                required
                className="mt-xs w-full rounded-sm border border-embassy/15 bg-marble px-sm py-sm text-body leading-7 text-embassy placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
              />
            </div>

            <div className="mt-lg flex flex-col items-start gap-sm border-t border-embassy/15 pt-md sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-xs rounded-md bg-court-gold px-md text-label font-semibold text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
              >
                <FiCheck className="h-4 w-4" aria-hidden="true" />
                <span>{t.submit}</span>
              </button>

              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-xs rounded-md border border-embassy/20 px-md text-label font-semibold text-embassy transition-colors duration-200 hover:border-embassy hover:bg-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
              >
                <FiMessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{t.whatsappFallback}</span>
                <FiArrowUpRight
                  className="h-4 w-4 rtl:scale-x-[-1]"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
