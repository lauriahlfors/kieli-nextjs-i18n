# Kieli - Internationalization in Next.js

![](public/kieli_banner.png)

This project was created as I needed a custom i18n(internationalization) system in my Next.js projects and as a way to challenge myself to build a system like [react-i18next](https://github.com/i18next/react-i18next).

![](https://img.shields.io/github/stars/lauriahlfors/nextjs14-i18n.svg)

## Features

- Translation system based on a .json files.
- Dynamic auto-completion generation for the translation keys improving DX.
- Automatic user locale detection.
- Server side rendering.

## Adding translations to the system.

> Replace `<locale>` with your translations ISO639 set 1 locale name (en, fr, se ...)
> [List of ISO 639 language codes - Wikipedia](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)

1. Add new translation file as `<locale>`.json to `@/translations/` directory.Remember to match the translation key structure to other translation files.

2. Add `<locale>` to translations in `@/lib/i18n/loadTranslation.ts`.

```tsx
const translations = {
  en: () => import('@/translations/en.json').then((module) => module.default),
  <locale>: () => import('@/translations/<locale>.json').then((module) => module.default),
  ...
};
```

3. Add the new `<locale>` to `i18nConfig.locales` array in `@/i18n.ts`.

```tsx
export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', '<locale>', ...],
}
```

The new translation files content should be available to be used now in your Next.js project.

## Usage in SSR (Server Side Rendered) files.

When you render a component on the server side, you can simply call the `getTranslation(locale: Locale)` function and get the needed translation. It's beneficial to keep the translations on the server side as the translation files are stored on the server. This also shortens the load on client as save on the runtime.

In `@/app/[locale]page.tsx`

```tsx
...

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function ServerSidePage({ params: { locale } }: Props) {
  const translation = await getTranslation(locale);

  return (
    <section>
      <h1>
        {translation('views.home.title')}
      </h1>
      <p>
        {translation('views.home.body')}
      </p>
    </section>
  );
}
```

## Usage in CSR (Client Side Rendered) files.

It is recommended to keep translations on the server side but, translation values can be passed to client components from server components. For more information, look at how the following files pass the translation value to the `locale-selector.tsx` client component from server components.

1. Server: `@/app/[locale]/page.tsx`
2. Server: `@/components/nav.tsx`
3. Client: `@/components/locale-selector.tsx`
