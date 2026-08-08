export type HeroSlideId = "trust" | "contracts" | "support";

export interface HeroSlide {
  id: HeroSlideId;
  image: string;
  copyKey: HeroSlideId;
  primaryHref: string;
  secondaryHref: string;
}
