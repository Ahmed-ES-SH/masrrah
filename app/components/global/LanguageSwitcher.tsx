"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslations";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale() ?? "ar";
  const t = useTranslation("navbar");

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const segments = pathname.split("/");
    const hasLocaleSegment = segments[1] === "ar" || segments[1] === "en";

    if (hasLocaleSegment) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const nextPath = segments.join("/") || `/${nextLocale}`;
    const query = searchParams.toString();

    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  return (
    <div className="relative z-50">
      <button
        type="button"
        onClick={switchLocale}
        aria-label={t.langLabel}
        aria-pressed={locale === "en"}
        className="relative flex h-9 w-18 shrink-0 cursor-pointer items-center rounded-full border-[1.5px] border-court-gold px-0.75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold"
      >
        <span
          className={`relative z-1 w-1/2 text-center text-xs font-semibold tracking-[0.03em] transition-colors duration-200 ${locale === "ar" ? "text-embassy" : "text-ink-soft"}`}
        >
          AR
        </span>
        <span
          className={`relative z-1 w-1/2 text-center text-xs font-semibold tracking-[0.03em] transition-colors duration-200 ${locale === "ar" ? "text-ink-soft" : "text-embassy"}`}
        >
          EN
        </span>
        <span
          className={`absolute inset-y-0.75 flex w-[calc(50%-3px)] items-center justify-center rounded-full bg-court-gold transition-[inset-inline-start] duration-200 ease-out ${locale === "ar" ? "inset-s-0.75" : "inset-s-1/2"}`}
          aria-hidden
        ></span>
      </button>
    </div>
  );
}
