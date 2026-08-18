import Link from "next/link";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import type ar from "@/app/translations/ar.json";
import type { CategoryItem } from "./servicesSection";

type CategoryCopy = typeof ar["services"]["categories"][CategoryItem["key"]];

const CATEGORY_LINKS: Record<"recruitment" | "transfer", string> = {
  recruitment: "request?package=household",
  transfer: "request",
};

interface CategoryCardProps {
  item: CategoryItem;
  copy: CategoryCopy;
  locale: string;
  onOpenSlider: () => void;
}

export default function CategoryCard({
  item,
  copy,
  locale,
  onOpenSlider,
}: CategoryCardProps) {
  const isRental = item.key === "rental";
  const Icon = item.icon;

  const cardClass =
    "group flex min-h-0 flex-col rounded-lg border border-embassy/15 bg-marble p-md transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-court-gold/45 hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold sm:p-lg";

  const inner = (
    <>
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-embassy/20 bg-embassy/5 text-embassy"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-lg type-title text-embassy">{copy.title}</h3>
      <p className="mt-xs type-body text-ink-soft">{copy.description}</p>

      <span className="mt-auto flex items-center justify-between gap-xs pt-lg">
        <span className="type-label uppercase text-embassy transition-colors duration-200 group-hover:text-court-gold">
          {copy.action}
        </span>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-embassy/20 text-embassy transition-colors duration-200 group-hover:border-court-gold group-hover:text-court-gold"
          aria-hidden="true"
        >
          {isRental ? (
            <FiChevronRight className="h-5 w-5 rtl:scale-x-[-1]" />
          ) : (
            <FiArrowUpRight className="h-4 w-4 rtl:scale-x-[-1]" />
          )}
        </span>
      </span>
    </>
  );

  return item.key === "rental" ? (
    <button
      type="button"
      aria-expanded={false}
      aria-controls="services-rental-slider"
      onClick={onOpenSlider}
      className={`${cardClass} cursor-pointer text-start`}
    >
      {inner}
    </button>
  ) : (
    <Link href={`/${locale}/${CATEGORY_LINKS[item.key]}`} className={cardClass}>
      {inner}
    </Link>
  );
}