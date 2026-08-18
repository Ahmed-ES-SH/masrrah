import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type ar from "@/app/translations/ar.json";
import type { ServiceItem } from "./servicesSection";

type ServicesTranslations = typeof ar["services"];

interface ServiceCardProps {
  item: ServiceItem;
  t: ServicesTranslations;
  itemIndex: number;
  offset: number;
  total: number;
  locale: string;
  shouldReduceMotion: boolean | null;
}

export default function ServiceCard({
  item,
  t,
  itemIndex,
  offset,
  total,
  locale,
  shouldReduceMotion,
}: ServiceCardProps) {
  const Icon = item.icon;
  const copy = t.items[item.key];

  return (
    <article
      className={`flex min-h-0 flex-col rounded-lg border border-embassy/15 bg-parchment p-md sm:min-h-[28rem] sm:p-lg ${
        offset === 1 ? "hidden sm:flex" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-md border-b border-embassy/15 pb-md">
        <div>
          <p className="type-label uppercase text-ink-soft">
            {t.serviceLabel}
          </p>
          <p className="mt-xs type-label text-ink-soft/75">
            {String(itemIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </div>
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-embassy/20 bg-embassy/5 text-embassy"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-lg">
        <h3 className="type-headline text-embassy">
          {copy.title}
        </h3>
        <p className="mt-sm type-body text-ink-soft">
          {copy.description}
        </p>
      </div>

      <div className="mt-lg border-s-2 border-embassy/25 ps-sm">
        <p className="type-label uppercase text-ink-soft">
          {t.detailLabel}
        </p>
        <p className="mt-xs type-label text-embassy">
          {copy.detail}
        </p>
      </div>

      <Link
        href={`/${locale}/request?package=household&service=${item.key}`}
        className="group mt-auto inline-flex min-h-12 w-fit items-center gap-xs rounded-md bg-court-gold px-md type-btn text-embassy transition-colors duration-200 hover:bg-gilded-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-court-gold"
      >
        <span>{t.requestService}</span>
        <FiArrowUpRight
          className={`h-4 w-4 rtl:scale-x-[-1] ${
            shouldReduceMotion
              ? ""
              : "transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          }`}
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
