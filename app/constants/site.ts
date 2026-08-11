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
export const SITE_EMAIL = "contact@Masarrah HR.sa";

// Address line shown in the footer contact block — bilingual (Arabic first).
export const SITE_ADDRESS = {
  ar: "طريق الصحابة - حى اليرموك - الرياض - 8022",
  en: "Al-Sahaba Road, Al Yarmouk District, Riyadh 8022",
} as const;

// Pre-filled WhatsApp inquiry message (plain text; wa.me encodes it).
export const WHATSAPP_DEFAULT_MESSAGE =
  "مرحباً، أرغب بالاستفسار عن خدمة لدى مسرة إتش أر للاستقدام.";
