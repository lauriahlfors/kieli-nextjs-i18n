import { i18nConfig, Locale } from '@/i18n';

// Import translation files manually from @/translations path as modules
const translations = {
  en: () => import('@/translations/en.json').then((module) => module.default),
  fi: () => import('@/translations/fi.json').then((module) => module.default),
  fr: () => import('@/translations/fr.json').then((module) => module.default),
};

// Create a type from imported translation file that corresponds to the default locale.
// All of the translation files should have the same key structure to avoid errors.
export type TranslationObject = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;

/**
 * Loads a translation file as a module based on a given locale.
 *
 * @param {Locale} locale -  A locale that specifies which translation is loaded.
 * @returns {TranslationObject} Translation object.
 */
export const loadTranslation = async (
  locale: Locale
): Promise<TranslationObject> => {
  return translations[locale]();
};
