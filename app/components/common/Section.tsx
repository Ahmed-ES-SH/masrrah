import type { ReactNode } from "react";

/**
 * Shared section shell for the Masarrah HR design system.
 *
 * Owns the single consistent composition structure for every home section so
 * the page reads as one system rather than separate templates:
 *  - one gutter scale:   px-sm (16) / sm:px-md (24) / lg:px-xl (32)
 *  - one vertical rhythm: py-xxl (64)
 *  - `relative` so caller-supplied `decor` layers anchor to the section.
 *
 * Intentionally thin: it adds NO spacing decisions beyond the container above.
 * Individual sections pass `clip`, `decor`, and their own content.
 */
interface SectionProps {
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  /** Section-level extras: background, text color, `isolate`, `scroll-mt-*`. */
  className?: string;
  /** Clip decorative overflow (`overflow-hidden`) on the <section>. */
  clip?: boolean;
  /** Absolutely-positioned decorative layer(s), anchored to the section. */
  decor?: ReactNode;
  /** Appended to the standardized container (e.g. `overflow-hidden`, `max-w-7xl`). */
  containerClassName?: string;
  children: ReactNode;
}

export default function Section({
  id,
  ariaLabel,
  ariaLabelledBy,
  className = "",
  clip = false,
  decor,
  containerClassName = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`relative ${clip ? "overflow-hidden " : ""}${className}`}
    >
      {decor}
      <div
        className={`relative mx-auto w-full px-sm py-xxl sm:px-md lg:px-xl ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}