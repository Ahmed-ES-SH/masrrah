export type BlogLocale = "ar" | "en";

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  initial: string;
  title: string;
  excerpt: string;
}

export interface BlogContent {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  previous: string;
  next: string;
  posts: readonly BlogPost[];
}

// Placeholder journal content for the homepage slider. Replace with confirmed
// editorial copy before launch — topics must stay advisory, never cite
// licensing numbers, client counts, or testimonials.
export const BLOG_CONTENT: Record<BlogLocale, BlogContent> = {
  ar: {
    ariaLabel: "مجلة مسرة إتش أر",
    eyebrow: "مجلة مسرة إتش أر",
    title: "ملاحظات من مكتب الاستقدام",
    body: "مقالات تكتبها مسرة إتش أر لتوفر عليك قراءة عشرات المصادر: ماذا تجهز قبل الطلب، وما المستندات المطلوبة، وكيف تسير الأيام الأولى بعد الوصول.",
    previous: "المقالة السابقة",
    next: "المقالة التالية",
    posts: [
      {
        id: "prepare-checklist",
        slug: "prepare-checklist",
        category: "للأسر",
        date: "12 أغسطس 2026",
        readTime: "4 دقائق قراءة",
        initial: "ق",
        title: "قبل أن تقدّم طلبك: أربع أوراق تجهّزها اليوم",
        excerpt:
          "الطلب الواضح يعني خطوات أسرع. قائمة قصيرة بما يسرّع ملفك: بيانات الإقامة، وصورة الفكرة عن العقد، وسؤال واحد عن بيئة المنزل.",
      },
      {
        id: "documents-stages",
        slug: "documents-stages",
        category: "الخطوات",
        date: "2 أغسطس 2026",
        readTime: "6 دقائق قراءة",
        initial: "ا",
        title: "المستندات في كل مرحلة: ماذا يُطلب ومتى",
        excerpt:
          "لكل مرحلة من مراحل الاستقدام أوراقها. اعرف المستند الذي تتوقعه في موعده حتى لا تتعطل خطتك على سند صغير.",
      },
      {
        id: "first-days",
        slug: "first-days",
        category: "بعد الوصول",
        date: "29 يوليو 2026",
        readTime: "5 دقائق قراءة",
        initial: "و",
        title: "الأيام الأولى: كيف تبدأ علاقة عمل سليمة",
        excerpt:
          "من التعريف بالمنزل إلى جدول العمل اليومي — خطوات صغيرة تجعل الموظف الجديد يبدأ بداية ثابتة بدل الحيرة.",
      },
      {
        id: "company-first-hire",
        slug: "company-first-hire",
        category: "للشركات",
        date: "22 يوليو 2026",
        readTime: "7 دقائق قراءة",
        initial: "أ",
        title: "أول موظف لشركتك: من احتياج العقد إلى وصوله",
        excerpt:
          "مهما كانت الشركة صغيرة، الموظف القادم يبقى سنوات. اعرف ماذا تراجع قبل التوقيع، وكيف تخطط لإقامته من اليوم الأول.",
      },
      {
        id: "questions-households",
        slug: "questions-households",
        category: "للأسر",
        date: "15 يوليو 2026",
        readTime: "5 دقائق قراءة",
        initial: "س",
        title: "أسئلة تطرحها كل أسرة قبل الاستقدام",
        excerpt:
          "نطاق العمل، والمدة المتوقعة، وماذا لو تغيّر الاحتياج — أسئلة نناقشها معك قبل أن تبدأ رحلتك.",
      },
      {
        id: "contract-reading",
        slug: "contract-reading",
        category: "الخطوات",
        date: "8 يوليو 2026",
        readTime: "6 دقائق قراءة",
        initial: "ع",
        title: "قراءة العقد قبل التوقيع: بنود تحسم العلاقة لاحقًا",
        excerpt:
          "بنود صغيرة نادرًا ما تُقرأ لكنها تحكم علاقة العمل — اعرف ماذا تعني قبل أن تضع توقيعك.",
      },
    ],
  },
  en: {
    ariaLabel: "Masarrah HR journal",
    eyebrow: "Masarrah HR Journal",
    title: "Notes from the recruitment desk",
    body: "Short articles Masarrah HR writes so you don't have to read a dozen sources: what to prepare before a request, which documents matter, and how the first days after arrival should go.",
    previous: "Previous article",
    next: "Next article",
    posts: [
      {
        id: "prepare-checklist",
        slug: "prepare-checklist",
        category: "Households",
        date: "Aug 12, 2026",
        readTime: "4 min read",
        initial: "ق",
        title: "Before You File: Four Papers to Prepare Today",
        excerpt:
          "A clearer request means shorter steps. A short list of what speeds it up: your identity details, a sense of the contract, and one question about your household.",
      },
      {
        id: "documents-stages",
        slug: "documents-stages",
        category: "The Steps",
        date: "Aug 2, 2026",
        readTime: "6 min read",
        initial: "ا",
        title: "Documents at Every Stage: What Is Asked, and When",
        excerpt:
          "Each stage of recruitment carries its own papers. Know which document arrives when, so a small form never stalls your plan.",
      },
      {
        id: "first-days",
        slug: "first-days",
        category: "After Arrival",
        date: "Jul 29, 2026",
        readTime: "5 min read",
        initial: "و",
        title: "The First Days: Starting a Sound Working Relationship",
        excerpt:
          "From introducing your home to the shape of a normal day — small steps that let a new worker begin from a steady place instead of guesswork.",
      },
      {
        id: "company-first-hire",
        slug: "company-first-hire",
        category: "Companies",
        date: "Jul 22, 2026",
        readTime: "7 min read",
        initial: "أ",
        title: "Your Company's First Hire: From Contract Need to Arrival",
        excerpt:
          "However small the company, the coming worker stays for years. Know what to review before signing, and how to plan for them from day one.",
      },
      {
        id: "questions-households",
        slug: "questions-households",
        category: "Households",
        date: "Jul 15, 2026",
        readTime: "5 min read",
        initial: "س",
        title: "Questions Every Household Asks Before Hiring",
        excerpt:
          "The scope of work, the expected timing, and what happens if the need changes — the questions we walk through with you before you begin.",
      },
      {
        id: "contract-reading",
        slug: "contract-reading",
        category: "The Steps",
        date: "Jul 8, 2026",
        readTime: "6 min read",
        initial: "ع",
        title: "Reading the Contract Before Signing: The Clauses That Decide",
        excerpt:
          "Small clauses rarely read aloud but decisive for a working relationship. Know what they mean before you put your signature down.",
      },
    ],
  },
};
