import LocaleSelector from '@/components/locale-selector';
import { TranslationObejct } from '@/lib/i18n/loadTranslation';

interface Props {
  translation: TranslationObejct;
}

export default function Nav({ translation }: Props) {
  return (
    <nav className="absolute flex h-16 w-full items-center justify-end border-b border-b-neutral-200 bg-white px-8 lg:px-96">
      <LocaleSelector message={translation('nav.locale-selector.message')} />
    </nav>
  );
}
