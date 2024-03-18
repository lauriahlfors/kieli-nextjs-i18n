import { Locale, i18nConfig } from '@/i18n';
import { ObjectKeys } from '@/lib/utils/objectKeys';

// Contains functions to import translation .json files asynchrounously for specified locales.
const defaultLoader = () => import('@/translations/en.json').then((module) => module.default);
const translations = {
  en: defaultLoader,
  fi: () => import('@/translations/fi.json').then((module) => module.default),
};

// Define a generated type for translation object.
export type Translation = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;

// Define a generated type for all nested keys found in Translation type.
export type TranslationObejct = (key: ObjectKeys<Translation>) => string;

/**
 * Loads a translation .json file asynchronously based on a given locale.
 * @param locale Locale string
 * @returns Translation object with translation key-value pairs.
 */
export default async function loadTranslation(
  locale: Locale
): Promise<Translation> {
  // Invoke a call to translations corresponding to a given locale key.
  if (translations[locale]) {
    return translations[locale]();
  }
  return defaultLoader();
}
