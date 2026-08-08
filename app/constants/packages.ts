import { IconType } from "react-icons";
import {
  FiActivity,
  FiBriefcase,
  FiHeart,
  FiHome,
  FiTruck,
} from "react-icons/fi";

export type RecruitmentPackageKey =
  | "household"
  | "care"
  | "business"
  | "driver"
  | "nurse";

export interface RecruitmentPackage {
  key: RecruitmentPackageKey;
  icon: IconType;
}

export const RECRUITMENT_PACKAGES: readonly RecruitmentPackage[] = [
  { key: "household", icon: FiHome },
  { key: "care", icon: FiHeart },
  { key: "business", icon: FiBriefcase },
  { key: "driver", icon: FiTruck },
  { key: "nurse", icon: FiActivity },
];