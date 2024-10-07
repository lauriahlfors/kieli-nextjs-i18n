import { i18nConfig, Locale } from '@/i18n';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

/**
 * Determines the best matching locale based on the user's preferred languages.
 * Uses the Accept-Language header from the request, matches it against
 * available app locales, and returns the best match or the default locale.
 */
export const getMatchingLocale = (request: NextRequest): Locale => {
  // Extract the Accept-Language header from the request
  const acceptLanguage = request.headers.get('Accept-Language');

  // Initialize a Negotiator instance with the Accept-Language header to
  // get the list of user's preferred locales.
  const userLocales = new Negotiator({
    headers: { 'accept-language': acceptLanguage || '' },
  }).languages();

  // Prepare the list of locales available in the app
  const appLocales: string[] = i18nConfig.locales.map(
    (locale: Locale) => locale
  );

  // Match the user's locales against the app's locales to find the best match
  // If no match is found, use the default locale
  const localeMatch: Locale = match(
    userLocales,
    appLocales,
    i18nConfig.defaultLocale
  ) as Locale;

  // Return the best matching locale
  return localeMatch;
};
