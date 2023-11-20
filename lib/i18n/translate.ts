export type Translation = {
  [key: string]: string | Translation;
};

/**
 * Get nested translation value from the given translation object.
 * @param keys
 * @param translation
 * @returns
 */
function getTranslation(
  keys: string[],
  translation: Translation | string
): Translation | string {
  // Translation is a type of string, return the translation.
  if (typeof translation == 'string') {
    return translation;
  }

  // Translation is empty or falsy, return a empty string.
  if (keys.length === 0 || !translation) {
    return '';
  }

  // Assing the first key in keys array.
  const key = keys.shift() || '';

  // Call itself recursively until all translation keys are found.
  return getTranslation(keys, translation[key]);
}

/**
 *
 * @param key
 * @param translation
 * @returns
 */
export function getTranslationByKeys(
  key: string,
  translation: Translation
): string {
  // Key not found, return a empty string.
  if (!key) {
    return '';
  }

  // Split key by period.
  const keys = key.split('.');

  // Get translation based on keys
  const translationData = getTranslation(keys, translation);

  // Translation not found, return key.
  if (!translationData) {
    return key;
  }

  // Translation is not type of string, return key.
  if (typeof translationData !== 'string') {
    return key;
  }

  // Return translation.
  return translationData;
}
