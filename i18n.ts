export const cookieName = 'current-cookie-locale';
export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'fi'],
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
