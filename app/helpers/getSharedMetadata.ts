const url =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://masrrah.vercel.app";

export const getSharedMetadata = (
  locale: string,
  title: string,
  description: string,
  ogImageAlt?: string,
  keywords?: string[],
) => ({
  keywords: keywords ?? [
    "Masarrah HR",
    "مسرة إتش أر",
    "مسرة إتش أر للاستقدام",
    "استقدام",
    "استقدام العمالة المنزلية",
    "تأجير العمالة المنزلية",
    "Saudi recruitment company",
    "HR recruitment Saudi Arabia",
    "domestic worker recruitment",
    "housekeeper recruitment",
    "nanny recruitment",
    "استقدام خادمات",
    "استقدام سائقين",
    "استقدام مربيات",
    "شركة استقدام سعودية",
    "خادمة منزلية",
    "عمالة منزلية",
  ],
  openGraph: {
    title: title,
    description: description,
    url: `${url}/${locale}`,
    siteName: "Masarrah HR - مسرة إتش أر للاستقدام",
    images: [
      {
        url: `${url}/logo.webp`,
        alt:
          ogImageAlt ??
          (locale === "ar"
            ? "مسرة إتش أر للاستقدام - حلول توظيف العمالة المنزلية في المملكة"
            : "Masarrah HR - Saudi HR Recruitment Company for Domestic Workers"),
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [`${url}/logo.webp`],
  },
});
