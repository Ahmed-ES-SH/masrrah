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

export type RecruitmentOperationsColumn = {
  key: "procedures" | "documents";
  heading: string;
  steps: readonly {
    text: string;
    icon: IconType;
  }[];
};

export const RECRUITMENT_OPERATIONS = {
  title: "عمليات الاستقدام",
  columns: [
    {
      key: "documents",
      heading: "الوثائق المطلوبة لإستخدام العمالة المنزلية",
      steps: [
        {
          text: "تلخيص إجراءات الاستقدام",
          icon: PiClipboardText,
        },
        {
          text: "اختيار السيرة الذاتية",
          icon: PiFileMagnifyingGlass,
        },
        {
          text: "صورة الهوية الوطنية او الإقامة للمقيمين والرقم الموحد في أبشر",
          icon: HiOutlineIdentification,
        },
        {
          text: "تعاقد الاستقدام عبر مساند وسداد الرسوم",
          icon: PiHandshake,
        },
      ],
    },
    {
      key: "procedures",
      heading: "إجراءات الاستقدام",
      steps: [
        {
          text: "الدخول الى منصة مساند",
          icon: FiGlobe,
        },
        {
          text: "التحقق من تأهيلك",
          icon: FiCheckCircle,
        },
        {
          text: "ادخال البيانات المطلوبة وإثبات القدرة المالية",
          icon: FiFileText,
        },
        {
          text: "الإقرار بالمعلومات الصحيحة وسداد الرسوم",
          icon: FiCreditCard,
        },
      ],
    },
  ] satisfies readonly RecruitmentOperationsColumn[],
} as const;
