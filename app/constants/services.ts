import type { IconType } from "react-icons";
import { FiBriefcase, FiHeart, FiHome, FiTruck } from "react-icons/fi";
import type { RecruitmentCountryKey } from "./countries";
import type { RecruitmentPackageKey } from "./packages";

export type ServiceLocale = "ar" | "en";

export type ServiceIconName = "home" | "truck" | "heart" | "briefcase";

export const SERVICE_ICONS: Record<ServiceIconName, IconType> = {
  home: FiHome,
  truck: FiTruck,
  heart: FiHeart,
  briefcase: FiBriefcase,
};

// Full bilingual record per service. This single file drives the detail page,
// the form's pre-selected route, and the corridors shown in the hero ledger.
// The shape is admin-ready: swap the copy for confirmed content as the
// catalogue is approved, or replace this file with a content API later.
export interface ServiceDetailCopy {
  /** Short label beside the ◆ seal, e.g. "For households". */
  eyebrow: string;
  /** Serif hero title. */
  title: string;
  /** Hero body copy. */
  description: string;
  /** Ordered commitments — rendered as numbered clauses on the ledger. */
  clauses: readonly string[];
  /** Profiles the service is usually requested for. */
  suitedFor: readonly string[];
  /** The closing promise of the record. */
  outcome: string;
}

export interface ServiceDetailRecord {
  slug: string;
  icon: ServiceIconName;
  /** Route pre-selected in the request form. */
  packageKey: RecruitmentPackageKey;
  featured?: boolean;
  /** Recruitment corridors (keys from countries.ts) that fit this service. */
  corridors: readonly RecruitmentCountryKey[];
  copy: Record<ServiceLocale, ServiceDetailCopy>;
}

export const SERVICE_DETAILS: readonly ServiceDetailRecord[] = [
  {
    slug: "domestic-staffing",
    icon: "home",
    packageKey: "household",
    featured: true,
    corridors: ["sriLanka", "philippines", "bangladesh", "indonesia"],
    copy: {
      ar: {
        eyebrow: "للأسر",
        title: "عمالة منزلية تبدأ من احتياجك",
        description:
          "نساعدك في تحديد الدور المناسب وترتيب مسار استقدام واضح للعمالة المنزلية، من الطلب الأول حتى بدء العمل في منزلك.",
        clauses: [
          "تحديد الدور وواجباته قبل بدء أي خطوة",
          "التحقق من الوثائق والتصاريح المطلوبة",
          "إنهاء إجراءات التأشيرة والإقامة والتأمين",
          "استقبال العامل وترتيب بدء العمل",
          "متابعة بعد الوصول ودعم في الأشهر الأولى",
        ],
        suitedFor: [
          "أسر تحتاج مساعدة دائمة في الواجبات اليومية",
          "من يستقدم لأول مرة ويريد مساراً واضحاً",
          "من يفضّل متابعة موثقة من البداية حتى الاستقرار",
        ],
        outcome:
          "يصل طلبك جاهزاً: الدور محدد، والوثائق سليمة، وخطوتك التالية واضحة.",
      },
      en: {
        eyebrow: "For households",
        title: "Domestic staffing, shaped around your home",
        description:
          "We help you define the right role and arrange a clear recruitment path for domestic staff, from your first request to the first day on the job.",
        clauses: [
          "The role and its duties agreed before any step begins",
          "Required documents and permits verified in advance",
          "Visa, residence, and insurance handled under licensed authority",
          "Arrival arranged and the start of work prepared",
          "Follow-up after arrival and support in the first months",
        ],
        suitedFor: [
          "Households needing reliable daily support",
          "First-time recruiters who want a clear route",
          "Anyone who values a documented path from start to settle",
        ],
        outcome:
          "Your request arrives ready: the role is set, the documents are in order, and your next step is clear.",
      },
    },
  },
  {
    slug: "private-drivers",
    icon: "truck",
    packageKey: "driver",
    corridors: ["sriLanka", "ethiopia", "bangladesh"],
    copy: {
      ar: {
        eyebrow: "سائقون خاصون",
        title: "سائق خاص يفهم إيقاع يومك",
        description:
          "نبدأ بفهم تنقلاتك وجدولك ومواعيدك الثابتة، ثم ننسق مع فريق الاستقدام حتى يجلس خلف مقودك سائقٌ مؤهل.",
        clauses: [
          "حصر المواعيد والمسارات التي تهمك يومياً",
          "التحقق من رخصة القيادة وسجل السائق",
          "إنهاء إجراءات التأشيرة والإقامة والتأمين",
          "توجيه في المدينة والمسارات قبل أول يوم عمل",
          "متابعة السلامة والالتزام في الأشهر الأولى",
        ],
        suitedFor: [
          "أسر تعتمد نقلاً يومياً منتظماً",
          "من يقدّر الالتزام بالمواعيد الثابتة",
          "مسارات متعددة تحتاج تنظيماً موثوقاً",
        ],
        outcome:
          "يصل السائق جاهزاً: رخصته موثقة، ومساراته معروفة، ويومك يمضي في وقته.",
      },
      en: {
        eyebrow: "Private drivers",
        title: "A private driver that fits your routine",
        description:
          "We start with your travel patterns, schedule, and fixed appointments, then shape a clear request with our recruitment team.",
        clauses: [
          "Daily routes and standing appointments mapped",
          "Driving license and driving record verified",
          "Visa, residence, and insurance handled",
          "City and route orientation before the first day",
          "Safety and punctuality follow-up in the first months",
        ],
        suitedFor: [
          "Households with regular daily travel",
          "Owners who value fixed, on-time commitments",
          "Multiple daily routes that need reliability",
        ],
        outcome:
          "Your driver arrives ready: license verified, routes known, and your day kept on time.",
      },
    },
  },
  {
    slug: "nannies-and-home-care",
    icon: "heart",
    packageKey: "care",
    corridors: ["philippines", "indonesia", "sriLanka"],
    copy: {
      ar: {
        eyebrow: "رعاية منزلية",
        title: "رعاية منزلية بمتطلبات مفهومة",
        description:
          "نحوّل احتياجات رعاية الأطفال أو كبار السن إلى خطة يومية واضحة، تسبق أي استقدام وتجعل طلبك يبدأ بثقة.",
        clauses: [
          "تدوين مسؤوليات الرعاية ومواعيدها اليومية",
          "التحقق من المراجع وسجل الخبرة",
          "جاهزية أساسية في السلامة والإسعافات الأولية",
          "إنهاء إجراءات التأشيرة والإقامة والتأمين",
          "مكالمة توجيهية في الأيام الأولى من الوصول",
          "دعم الاستبدال خلال السنة الأولى",
        ],
        suitedFor: [
          "أسر تتطلب رعاية دائمة للأطفال داخل المنزل",
          "من يرعى شخصاً كبيراً في المنزل ويحتاج خبرة موثقة",
          "حالات تحتاج خطة يومية مكتوبة وواضحة",
        ],
        outcome:
          "تصلك رعاية جاهزة بمعايير واضحة: مراجع مدققة، وخطة يومية مكتوبة، ودعم مفتوح.",
      },
      en: {
        eyebrow: "Home care",
        title: "Home care with a clear brief",
        description:
          "We turn childcare or elder-care needs into a clear daily plan that precedes recruitment and gives your request a confident starting point.",
        clauses: [
          "Care duties and daily schedule written down",
          "References and experience record verified",
          "Core safety and first-aid readiness confirmed",
          "Visa, residence, and insurance handled",
          "Orientation call in the first days after arrival",
          "Replacement support within the first year",
        ],
        suitedFor: [
          "Families needing daily childcare at home",
          "Homes caring for an older member and needing documented experience",
          "Care needs that deserve a written, ready plan",
        ],
        outcome:
          "Care arrives ready on clear terms: verified references, a written daily plan, and open support behind it.",
      },
    },
  },
  {
    slug: "business-recruitment",
    icon: "briefcase",
    packageKey: "business",
    corridors: ["philippines", "ethiopia", "kenya"],
    copy: {
      ar: {
        eyebrow: "للشركات",
        title: "استقدام يساند احتياج منشأتك",
        description:
          "نستمع إلى الدور المطلوب والجدول التشغيلي والمستوى المطلوب، ثم نبني معك مساراً خاصاً ينتهي بموظف جاهز للعمل.",
        clauses: [
          "تحديد الدور والمؤهلات والجدول التشغيلي",
          "إعداد وصف وظيفي وهيكل توظيف خاص بالمنشأة",
          "مراجعة العقود وفق أنظمة العمل",
          "التحقق من المؤهلات وسجل الموظف",
          "ترتيب الوصول والتهيئة لبدء العمل",
          "متابعة دورية بعد بدء الموظف",
        ],
        suitedFor: [
          "منشآت تعرف الدور المطلوب وتحتاج قوة عاملة جاهزة",
          "فرق تشغيلية في طور التوسع",
          "أدوار تحتاج مؤهلات ووثائق محددة",
        ],
        outcome:
          "يستلم فريقك موظفاً جاهزاً: عقده واضح، وتهيئته مكتملة، والمتابعة مستمرة.",
      },
      en: {
        eyebrow: "For businesses",
        title: "Recruitment for your operating needs",
        description:
          "We take the role, the operating timeline, and the level you need, and build a private recruitment path that ends in a work-ready hire.",
        clauses: [
          "Role, qualifications, and operating timeline defined",
          "A job profile and private presentation structure prepared",
          "Contracts reviewed against labor regulations",
          "Qualifications and work record verified",
          "Arrival and onboarding arranged",
          "Ongoing follow-up after the hire starts",
        ],
        suitedFor: [
          "Companies with a defined role to fill",
          "Operating teams preparing to expand",
          "Roles with specific qualifications or documentation",
        ],
        outcome:
          "Your team receives a work-ready hire: contract clear, onboarding complete, follow-up ongoing.",
      },
    },
  },
] as const;

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((service) => service.slug === slug) ?? null;
}
