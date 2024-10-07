import LocaleSelector from '@/components/locale-selector';
import { Locale } from '@/i18n';
import { getTranslation } from '@/lib/i18n/getTranslation';

export default async function Nav({ locale }: { locale: Locale }) {
  const translation = await getTranslation(locale);
  return (
    <nav className="absolute flex h-16 w-full items-center justify-end border-b border-b-neutral-200 bg-white px-8 lg:px-96">
      <LocaleSelector message={translation('nav.localeSelector.message')} />
    </nav>
  );
}
