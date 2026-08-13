import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import type ar from "@/app/translations/ar.json";
import type { CategoryItem } from "./servicesSection";

type CategoryCopy = typeof ar["services"]["categories"][CategoryItem["key"]];

interface CategoryCardProps {
  item: CategoryItem;
  index: number;
  copy: CategoryCopy;
  locale: string;
  onOpenSlider: () => void;
}

export default function CategoryCard({
  item,
  index,
  copy,
  locale,
  onOpenSlider,
}: CategoryCardProps) {
  const isRental = item.key === "rental";

  const cardClass =
    "group flex flex-col overflow-hidden rounded-lg border border-embassy/15 bg-marble transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-court-gold/45 hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court-gold sm:flex-row";

  const inner = (
    <>
      <span className="relative aspect-[3/2] shrink-0 overflow-hidden border-b border-embassy/15 sm:aspect-auto sm:w-[38%] sm:self-stretch sm:border-b-0 sm:border-e">
        <Image
          src={item.image}
          alt={'service-image'}
          fill
          preload={index === 0}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col p-md sm:p-lg">
        <h3 className="font-headline text-title font-bold leading-tight text-embassy">
          {copy.title}
        </h3>
        <p className="mt-xs text-body leading-6 text-ink-soft">
          {copy.description}
        </p>

        <span className="mt-auto flex items-center gap-xs pt-lg">
          <span className="text-label font-label uppercase tracking-[0.1em] text-embassy transition-colors duration-200 group-hover:text-court-gold">
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
      </span>
    </>
  );

  return isRental ? (
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
    <Link href={`/${locale}/${item.href}`} className={cardClass}>
      {inner}
    </Link>
  );
}
