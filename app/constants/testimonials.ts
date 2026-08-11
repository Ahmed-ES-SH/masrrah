export type TestimonialLocale = "ar" | "en";

export interface TestimonialItem {
  id: string;
  initial: string;
  name: string;
  role: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
}

export interface TestimonialContent {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  rating: string;
  ratingLabel: string;
  ratingNote: string;
  items: readonly TestimonialItem[];
}

// Default placeholder testimonials for the homepage ledger. Replace with
// verified, consent-carrying statements before launch — never publish
// client words without written approval.
export const TESTIMONIAL_CONTENT: Record<TestimonialLocale, TestimonialContent> = {
  ar: {
    ariaLabel: "شهادات عملاء مسرة إتش أر",
    eyebrow: "شهادات العملاء",
    title: "صفحات من سجل الثقة",
    body: "نحتفي بكل بيت وشركة شاركتنا تجربتها من أول استشارة حتى وصول الموظف. هذه الشهادات سُجِّلت كما قالها أصحابها، وننشرها بأمانة.",
    rating: "4.9",
    ratingLabel: "متوسط تقييم العملاء",
    ratingNote: "من مرئيات موثّقة ومتحققة",
    items: [
      {
        id: "um-abdullah",
        initial: "أ",
        name: "أم عبدالله",
        role: "ربة منزل",
        location: "الرياض",
        service: "استقدام عاملات منزليات",
        quote:
          "كانت تجربتنا الأولى في الاستقدام، وكنّا لا نعرف من أين نبدأ. من أول مكالمة تعاملنا مع فريق يفهم احتياجنا ويشرح كل خطوة بهدوء. وصلت العاملة في الموعد المتفق عليه، وقد مضت سنتان ولم نندم يومًا واحدًا.",
        rating: 5,
      },
      {
        id: "khalid-al-subaie",
        initial: "خ",
        name: "خالد السبيعي",
        role: "مدير الموارد البشرية",
        location: "جدة",
        service: "استقدام عمالة للشركات",
        quote:
          "أوراق الموظفين وحدها كانت سبب تأجيلنا الاستقدام لسنوات. مع مسرة إتش أر تسلّمنا ملفًا مكتملًا يتضمن كل سند، ووصلت الدفعة الأولى في الموعد.",
        rating: 5,
      },
      {
        id: "sara-al-otaibi",
        initial: "س",
        name: "سارة العتيبي",
        role: "صاحبة مشروع صغير",
        location: "الدمام",
        service: "استقدام للشركات الصغيرة",
        quote:
          "أكثر ما هدّأني أن هناك شخصًا يتكفل بالتفاصيل بدلًا مني. كل مرحلة كانت واضحة، وكل سؤال له جواب سريع على واتساب.",
        rating: 5,
      },
      {
        id: "mohammed-al-shehri",
        initial: "م",
        name: "محمد الشهري",
        role: "أب لثلاثة أطفال",
        location: "الرياض",
        service: "مقدمو رعاية منزلية",
        quote:
          "بحثنا عن مقدم رعاية يكون امتدادًا لبيتنا لا مجرد موظف. الفريق استمع لاحتياجنا جيدًا، والمقدمة التي وصلتنا ما زالت معنا حتى اليوم.",
        rating: 5,
      },
      {
        id: "noura-al-qahtani",
        initial: "ن",
        name: "نورة القحطاني",
        role: "معلمة",
        location: "الخبر",
        service: "استقدام سائق خاص",
        quote:
          "سائق بملف موثّق ورخصة سارية واختبار قيادة من أول الشهر الأول. حتى بعد الوصول، بقي الفريق متابعًا معنا — هذا ما لم نره في أي مكتب آخر.",
        rating: 5,
      },
    ],
  },
  en: {
    ariaLabel: "Masarrah HR client testimonials",
    eyebrow: "Client testimonials",
    title: "Pages from the ledger of trust",
    body: "We hold every household and company that walked this path with us in high regard — from the first consultation to the worker's arrival. These words are recorded as their owners said them.",
    rating: "4.9",
    ratingLabel: "Average client rating",
    ratingNote: "From verified statements",
    items: [
      {
        id: "um-abdullah",
        initial: "أ",
        name: "Um Abdullah",
        role: "Homemaker",
        location: "Riyadh",
        service: "Household worker recruitment",
        quote:
          "This was our first time recruiting, and we hardly knew where to start. From the first call we dealt with a team that understood our need and explained every step calmly. The worker arrived on the agreed date, and two years have passed without a single regret.",
        rating: 5,
      },
      {
        id: "khalid-al-subaie",
        initial: "خ",
        name: "Khalid Al-Subaie",
        role: "HR Manager",
        location: "Jeddah",
        service: "Workforce recruitment for companies",
        quote:
          "Paperwork alone delayed our recruitment plans for years. With Masarrah HR we received a complete file with every document, and the first batch arrived on schedule.",
        rating: 5,
      },
      {
        id: "sara-al-otaibi",
        initial: "س",
        name: "Sara Al-Otaibi",
        role: "Small business owner",
        location: "Dammam",
        service: "Recruitment for small companies",
        quote:
          "What reassured me most was having someone handle the details on my behalf. Every stage was clear, and every question got a quick answer on WhatsApp.",
        rating: 5,
      },
      {
        id: "mohammed-al-shehri",
        initial: "م",
        name: "Mohammed Al-Shehri",
        role: "Father of three",
        location: "Riyadh",
        service: "Home care providers",
        quote:
          "We were looking for a caregiver who would be an extension of our home, not just an employee. The team listened carefully, and the provider who arrived is still with us today.",
        rating: 5,
      },
      {
        id: "noura-al-qahtani",
        initial: "ن",
        name: "Noura Al-Qahtani",
        role: "Teacher",
        location: "Khobar",
        service: "Private driver recruitment",
        quote:
          "A driver with a verified file, a valid licence, and a driving test from the very first month. Even after arrival, the team kept following up with us — something we never saw in any other office.",
        rating: 5,
      },
    ],
  },
};