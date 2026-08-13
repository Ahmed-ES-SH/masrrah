import { IconType } from "react-icons";
import { FiHeart, FiHome, FiTruck } from "react-icons/fi";

export type RecruitmentPackageKey = "household" | "care" | "driver";

export interface RecruitmentPackage {
  key: RecruitmentPackageKey;
  icon: IconType;
}

export const RECRUITMENT_PACKAGES: readonly RecruitmentPackage[] = [
  { key: "household", icon: FiHome },
  { key: "care", icon: FiHeart },
  { key: "driver", icon: FiTruck },
];
