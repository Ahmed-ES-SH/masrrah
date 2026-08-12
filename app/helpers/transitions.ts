import type { Transition } from "framer-motion";

/**
 * Standard scroll-reveal transition for sections.
 * Returns a zero-duration transition when reduced motion is preferred.
 */
export function revealTransition(
  shouldReduceMotion: boolean | null,
  delay = 0,
  duration = 0.55
): Transition {
  return shouldReduceMotion
    ? { duration: 0 }
    : { duration, delay, ease: "easeOut" as const };
}
