import { NextRequest, NextResponse } from 'next/server';
import { Locale, cookieName, i18nConfig } from './i18n';
import { getMatchingLocale } from './lib/i18n/getMatchingLocale';

export default function middleware(request: NextRequest) {
  // Extract necessary properties from the request object
  const { cookies, nextUrl } = request;

  // Retrieve locale from cookie, if present
  const cookieLocale = cookies.get(cookieName)?.value;

  // Check if the locale from the cookie is valid
  const validateCookieLocale =
    cookieLocale && i18nConfig.locales.includes(cookieLocale as Locale);

  // Extract locale from the URL
  const localeFromUrl = nextUrl.pathname.split('/')[1];

  // Check if the locale from the URL is valid
  const isLocaleInUrl = i18nConfig.locales.includes(localeFromUrl as Locale);

  // If the locale from the URL is not valid, redirect to a valid locale URL
  if (!isLocaleInUrl) {
    let redirectLocale: Locale;

    // Determine which locale to redirect to
    if (validateCookieLocale) {
      // If there is a valid locale in the cookie, redirect to that locale
      redirectLocale = cookieLocale as Locale;
    } else {
      // Otherwise, determine a matching locale
      redirectLocale = getMatchingLocale(request);
    }

    // Construct the redirect URL with the appropriate locale
    const redirectUrl = new URL(
      `/${redirectLocale}/${nextUrl.pathname}`,
      request.url
    );

    // Create a response object with the redirect URL
    const response = NextResponse.redirect(redirectUrl);

    // Set the new locale in the response cookie
    response.cookies.set(cookieName, redirectLocale);

    // Return the response to perform the redirect
    return response;
  }

  // If the locale from the URL is valid, proceed to the next middleware
  const response = NextResponse.next();

  // Set the locale from the URL in the response cookie
  response.cookies.set(cookieName, localeFromUrl);

  // Return the response to continue with the request handling
  return response;
}

export const config = {
  // Matcher ignoring /_next/ and /api/
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
