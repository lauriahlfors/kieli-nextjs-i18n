import { Locale } from '@/i18n';
import { ObjectKeys } from '../utils/objectKeys';
import { loadTranslation, TranslationObject } from './loadTranslation';

// Defines a function type that takes a key of type ObjectKeys from TranslationObject and retruns a string.
export type TranslationKey = (key: ObjectKeys<TranslationObject>) => string;

// Defines a object type with array of string keys that can be of type string or a iteration type of itself.
type TranslationKeyValue = {
  [key: string]: string | TranslationKeyValue;
};

/**
 * Retrieves the translation value based on an array of keys from a translation object.
 *
 * @param {string[]} keys - A path for translation value.
 * @param {string | TranslationKeyValue } translation - Translation object or a string representing the translation value.
 * @returns {string} Corresponding translation value based on the given keys.
 */
const getTranslationValue = (
  keys: string[],
  translation: TranslationKeyValue | string
): string => {
  // Return current translation if its a string.
  if (typeof translation === 'string') {
    return translation;
  }

  // Get the first key string from the keys array and assing it to "key".
  const key: string = keys.shift() || '';

  // Recursively call itself with remaining keys and translations
  return getTranslationValue(keys, translation[key]);
};

/**
 * Returns translation value based on a given key from the translation object.
 *
 * @param {string} key - Translation value key.
 * @param {TranslationObject} translation - Translation object.
 * @returns {string} Translation string based on the given key, if not found returns the given key.
 */
const getTranslationValueByKey = (
  key: string,
  translation: TranslationKeyValue
): string => {
  // Split the key string into an array of keys using '.' as the divider.
  const keys: string[] = key.split('.');

  // Call getTranslationValue with the array of keys and the translation object to get translation value.
  const translationValue = getTranslationValue(keys, translation);

  if (!translationValue || typeof translationValue !== 'string') {
    return key;
  }

  return translationValue;
};

/**
 * Retrieves the translation function and retruns a translation for a specified key.
 *
 * @param {Locale} locale - A locale that specifies which translation is loaded.
 * @returns {string} Translation value based on the given key.
 */
export const getTranslation = async (
  locale: Locale
): Promise<TranslationKey> => {
  const translation = await loadTranslation(locale);
  return (key: string) => getTranslationValueByKey(key, translation);
};
