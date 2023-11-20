# Internationalization (i18n) in Next.js 14 App router.

## A Next.js 14 project implementing customizable i18n functionality to the app router, without i18n libraries.

- Use .json files to create different translations.
- Generative TypeScript typing for the created default translation, enhancing DX.
- Get needed translation strings in frontend with keys.
- Automatic locale detection & redirection in middleware.
- Small demo application with server & client components to demonstrate the functionality.

## How to install and run the project

1. Clone the project.

```
git clone git@github.com:lauriahlfors/nextjs14-i18n.git
```

2. Install node modules while on project root.

```
npm i
```

3. Run the local dev server.

```
npm run dev
```

## How to use and add translations to the project.

1. Create a new locale.json file inside the `@/translations` directory that follows the same nested key structure, as specified in the default locale file (`en.json` by default).

2. Add the new locale.json to be loaded in the translations const found in `@/lib/i18n/loadTranslation.ts`.

```
const translations = {
	en: () => import('@/translations/en.json').then((module) => module.default),
	...,

	locale: () => import('@/translations/locale.json').then((module) => module.default)
}
```

3. Add your new locale to the locales array as a string, in `i18nConfig` found in `@/i18n.ts`. You can also change the default locale here.

```
export const i18nConfig = {
	defaultLocale: 'en',
	locales: ['en', ..., 'locale'],
} as const;
```

4. You should be able to access your new locale content inside the server side files in your app automatically. See `@/app/[locale]/layout.tsx` and `@/app/[locale]/page.tsx` for example.

5. To access the locale content inside client side components, you need to pass the `t` const (`const t = await getTranslation(params.locale)` ) to a client component. See `@/app/[locale]/layout.tsx`, `@/components/nav.tsx` and `@/components/locale-selector.tsx` for example how to do this correctly with the right TypeScript typing.
