export type FaqLocale = "ar" | "en";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  openLabel: string;
  closeLabel: string;
  items: readonly FaqItem[];
}

// Default bilingual FAQ content. Replace these answers with confirmed policy
// language as the recruitment service catalogue is approved.
export const FAQ_CONTENT: Record<FaqLocale, FaqContent> = {
  ar: {
    ariaLabel: "الأسئلة الشائعة",
    eyebrow: "قبل أن تبدأ",
    title: "إجابات واضحة لخطوتك الأولى",
    body: "تبدأ كل رحلة استقدام بفهم احتياجك. إذا لم تجد إجابة سؤالك هنا، يسعد فريقنا أن يستمع إليك مباشرة.",
    openLabel: "عرض الإجابة",
    closeLabel: "إخفاء الإجابة",
    items: [
      {
        id: "how-it-starts",
        question: "كيف أبدأ طلب الاستقدام؟",
        answer:
          "أرسل طلبك عبر النموذج أو تواصل معنا عبر واتساب. سيجمع فريقنا المتطلبات الأساسية، ثم يوضح لك المسار المناسب والخطوات التالية.",
      },
      {
        id: "available-roles",
        question: "ما أنواع العمالة التي تساعدون في استقدامها؟",
        answer:
          "نساعد الأسر والشركات في طلب العمالة المنزلية، والسائقين الخاصين، ومقدمي الرعاية المنزلية، وبعض الاحتياجات المهنية. نؤكد ملاءمة الطلب بعد مراجعة تفاصيله.",
      },
      {
        id: "timeline",
        question: "كم تستغرق إجراءات الاستقدام؟",
        answer:
          "تختلف المدة بحسب المهنة والجنسية والمستندات والإجراءات المطلوبة. بعد فهم طلبك، نشاركك تقديرًا واقعيًا للخطوات والمدة المتوقعة.",
      },
      {
        id: "pricing",
        question: "هل الأسعار معلنة؟",
        answer:
          "نقدم الأسعار بشكل خاص بعد معرفة تفاصيل الطلب، لأن التكلفة تتأثر بنوع الخدمة والمتطلبات والإجراءات المرتبطة بها. لا توجد أسعار عامة مخفية في الموقع.",
      },
      {
        id: "follow-up",
        question: "هل تتابعون الطلب بعد وصول العامل؟",
        answer:
          "نعم، نوضح لك نطاق المتابعة والدعم ضمن مسار الطلب قبل البدء، ونبقى قناة تواصل واضحة خلال المراحل المتفق عليها.",
      },
    ],
  },
  en: {
    ariaLabel: "Frequently asked questions",
    eyebrow: "Before you begin",
    title: "Clear answers for your first step",
    body: "Every recruitment journey starts with understanding your needs. If your question is not here, our team is ready to hear from you directly.",
    openLabel: "Show answer",
    closeLabel: "Hide answer",
    items: [
      {
        id: "how-it-starts",
        question: "How do I start a recruitment request?",
        answer:
          "Send your request through the form or reach us on WhatsApp. Our team will gather the essential details, then explain the right path and next steps.",
      },
      {
        id: "available-roles",
        question: "What types of workers can you help recruit?",
        answer:
          "We help households and companies request domestic staff, private drivers, home-care workers, and selected professional roles. We confirm fit after reviewing the request details.",
      },
      {
        id: "timeline",
        question: "How long does recruitment usually take?",
        answer:
          "Timing depends on the role, nationality, documents, and required procedures. Once we understand your request, we share a realistic view of the steps and expected timing.",
      },
      {
        id: "pricing",
        question: "Are your prices published?",
        answer:
          "We provide pricing privately after understanding your request. The cost depends on the service, requirements, and related procedures, so the website does not display public prices.",
      },
      {
        id: "follow-up",
        question: "Do you support the request after arrival?",
        answer:
          "Yes. We explain the available follow-up and support within your request path before work begins, and remain a clear point of contact throughout the agreed stages.",
      },
    ],
  },
};
