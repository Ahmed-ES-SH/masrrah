import arTranslations from "@/app/translations/ar.json";
import enTranslations from "@/app/translations/en.json";

type Translations = typeof enTranslations;

export function getTranslations(locale: string): Translations;
export function getTranslations<K extends keyof Translations>(
  locale: string,
  namespace: K,
): Translations[K];
export function getTranslations(
  locale: string,
  namespace?: keyof Translations,
) {
  const translations: Translations =
    locale === "ar" ? arTranslations : enTranslations;

  if (!namespace) {
    return translations;
  }

  return translations[namespace];
}
