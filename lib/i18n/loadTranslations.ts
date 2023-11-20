import { Locale, i18nConfig } from '@/i18n';
import 'server-only';
import { ObjectKeys } from '../utils/objectKeys';
import { getTranslationByKeys } from './translate';

const translations = {
  fi: () => import('@/translations/fi.json').then((module) => module.default),
  en: () => import('@/translations/en.json').then((module) => module.default),
};

// Generated type for the translation object.
export type Translation = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;

// Type for all the nested keys found in the translation object type.
export type TranslationKeys = (key: ObjectKeys<Translation>) => string;

// Get translation data based on the given locale.
async function getTranslationData(locale: Locale) {
  return translations[locale]();
}

/**
 * Get all available translation for a given locale.
 * @param locale
 * @returns
 */
export async function getTranslation(locale: Locale): Promise<TranslationKeys> {
  // Get translation data based on locale.
  const translationData = await getTranslationData(locale);

  // Return the translation based on the given key.
  return (key: string) => getTranslationByKeys(key, translationData);
}
