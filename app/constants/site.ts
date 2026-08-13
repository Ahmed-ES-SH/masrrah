// Official recruitment license number issued by the Ministry of Human
// Resources and Social Development — shown in the header, footer, and the
// licensing seal at the top of the footer.
export const SITE_LICENSE_NUMBER = "304";

// Contact details — replace with the client's confirmed numbers before launch.
// SITE_PHONE is the raw international digits used for `tel:`. Must start with the
// country code (966 for Saudi Arabia) and contain only digits.
export const SITE_PHONE = "966505882011";

// WhatsApp number in international digits (no +, no spaces); used to build
// https://wa.me/<number> deep links.
export const SITE_WHATSAPP = "966505882011";

// All company phone numbers (Saudi Arabia). `national` is the dialing format
// shown to visitors; `tel` is the international dialing format for `tel:` and
// `whatsapp` (no +, no spaces) builds https://wa.me/<number> deep links.
export const COMPANY_PHONES = [
  {
    labelKey: "unified",
    national: "920017908",
    tel: "+966920017908",
    whatsapp: "966920017908",
  },
  {
    labelKey: "mobile",
    national: "053 700 1002",
    tel: "+966537001002",
    whatsapp: "966537001002",
  },
  {
    labelKey: "mobile",
    national: "050 588 2011",
    tel: "+966505882011",
    whatsapp: "966505882011",
  },
] as const;

// Brand-level email shown in the footer contact block.
export const SITE_EMAIL = "info@masarah-hr.com";

// Address line shown in the footer contact block — bilingual (Arabic first).
export const SITE_ADDRESS = {
  ar: "طريق الصحابة - حى اليرموك - الرياض - 8022",
  en: "Al-Sahaba Road, Al Yarmouk District, Riyadh 8022",
} as const;

// Pre-filled WhatsApp inquiry message (plain text; wa.me encodes it).
export const WHATSAPP_DEFAULT_MESSAGE =
  "مرحباً، أرغب بالاستفسار عن خدمة لدى مسرة إتش أر للاستقدام.";

export const LOCATION_ON_MAP =
  "https://www.google.com/maps/place/24%C2%B048'34.2%22N+46%C2%B046'43.3%22E/@24.8095055,46.7761193,17z/data=!4m4!3m3!8m2!3d24.8095!4d46.7786944?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D";
