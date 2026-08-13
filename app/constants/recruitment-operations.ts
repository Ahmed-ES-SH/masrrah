import type { IconType } from "react-icons";
import {
  FiCheckCircle,
  FiCreditCard,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import {
  PiClipboardText,
  PiFileMagnifyingGlass,
  PiHandshake,
} from "react-icons/pi";

export type RecruitmentOperationsColumnKey = "procedures" | "documents";

/**
 * Icons for each recruitment-operation column, keyed by column.
 * Ordering must match the step order in the translations files
 * (app/translations/{ar,en}.json → recruitmentOperations.columns.<key>.steps).
 */
export const RECRUITMENT_OPERATIONS_ICONS: Record<
  RecruitmentOperationsColumnKey,
  readonly IconType[]
> = {
  documents: [
    PiClipboardText,
    PiFileMagnifyingGlass,
    HiOutlineIdentification,
    PiHandshake,
  ],
  procedures: [
    FiGlobe,
    FiCheckCircle,
    FiFileText,
    FiCreditCard,
  ],
};

