export type ServiceLocale = "ar" | "en";

export type ServiceIconName =
  | "home"
  | "truck"
  | "heart"
  | "briefcase";

export interface ServiceCopy {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
}

export interface ServiceRecord {
  slug: string;
  icon: ServiceIconName;
  featured?: boolean;
  copy: Record<ServiceLocale, ServiceCopy>;
}

// Default launch catalogue. Replace the bilingual copy with confirmed service
// descriptions as the catalogue is approved; the shape is ready for a CMS/API.
export const services = [
  {
    slug: "domestic-staffing",
    icon: "home",
    featured: true,
    copy: {
      ar: {
        eyebrow: "للأسر",
        title: "عمالة منزلية تبدأ من احتياجك",
        description:
          "نساعدك في تحديد الدور المناسب وترتيب مسار استقدام واضح للعمالة المنزلية من البداية حتى الوصول.",
        action: "استكشف الخدمة",
      },
      en: {
        eyebrow: "For households",
        title: "Domestic staffing, shaped around your needs",
        description:
          "We help define the right role and arrange a clear recruitment path for domestic staff, from the first request to arrival.",
        action: "Explore service",
      },
    },
  },
  {
    slug: "private-drivers",
    icon: "truck",
    copy: {
      ar: {
        eyebrow: "سائقون خاصون",
        title: "سائق خاص يفهم إيقاع يومك",
        description:
          "نبدأ بفهم تنقلاتك وجدولك ومتطلباتك، ثم ننسق طلباً واضحاً مع فريق الاستقدام.",
        action: "استكشف الخدمة",
      },
      en: {
        eyebrow: "Private drivers",
        title: "A private driver that fits your routine",
        description:
          "We start with your travel patterns, schedule, and requirements, then shape a clear request with our recruitment team.",
        action: "Explore service",
      },
    },
  },
  {
    slug: "nannies-and-home-care",
    icon: "heart",
    copy: {
      ar: {
        eyebrow: "رعاية منزلية",
        title: "رعاية منزلية بمتطلبات مفهومة",
        description:
          "نرتب احتياجات رعاية الأطفال أو كبار السن في تصور عملي يساعدك على بدء الطلب بثقة.",
        action: "استكشف الخدمة",
      },
      en: {
        eyebrow: "Home care",
        title: "Home care with a clear brief",
        description:
          "We turn childcare or elder-care needs into a practical brief that gives your request a confident starting point.",
        action: "Explore service",
      },
    },
  },
  {
    slug: "business-recruitment",
    icon: "briefcase",
    copy: {
      ar: {
        eyebrow: "للشركات",
        title: "استقدام يساند احتياج منشأتك",
        description:
          "نستمع إلى الدور المطلوب والجدول التشغيلي، ونبني معك مساراً خاصاً لاحتياجات شركتك.",
        action: "استكشف الخدمة",
      },
      en: {
        eyebrow: "For businesses",
        title: "Recruitment for your operating needs",
        description:
          "We listen to the role and operating timeline, then build a private recruitment path around your company’s needs.",
        action: "Explore service",
      },
    },
  },
] satisfies readonly ServiceRecord[];
