import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { Locale, i18nConfig } from './i18n';

function getBestMatchingUserLocale(request: NextRequest) {
  let userHeaders: Record<string, string> = {};

  request.headers.forEach(
    (headerValue, headerKey) => (userHeaders[headerKey] = headerValue)
  );

  const userLocales = new Negotiator({ headers: userHeaders }).languages();

  const appLocales: string[] = [];
  i18nConfig.locales.forEach((locale: Locale) => {
    appLocales.push(locale);
  });

  const bestMatchingLocale = match(
    userLocales,
    appLocales,
    i18nConfig.defaultLocale
  );

  return bestMatchingLocale;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log(pathname);

  const isLocaleFound: boolean = i18nConfig.locales.every(
    (locale: Locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  console.log(isLocaleFound);

  if (isLocaleFound) {
    console.log('Locale not found');
    const locale = getBestMatchingUserLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring /_next/ and /api/
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
