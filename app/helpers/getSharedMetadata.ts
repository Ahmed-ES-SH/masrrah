const url = process.env.NEXT_PUBLIC_SITE_URL;

export const getSharedMetadata = (
  locale: string,
  title: string,
  description: string,
) => ({
  keywords: [
    "Masarrah",
    "مسرة",
    "مسرة للاستقدام",
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
    siteName: "Masarrah - مسرة للاستقدام",
    images: [
      {
        url: `${url}/logo.png`,
        width: 1200,
        height: 630,
        alt:
          locale === "ar"
            ? "مسرة للاستقدام - حلول توظيف العمالة المنزلية في المملكة"
            : "Masarrah - Saudi HR Recruitment Company for Domestic Workers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [`${url}/logo.png`],
  },
});