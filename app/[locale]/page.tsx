import { Locale } from '@/i18n';
import { getTranslation } from '@/lib/i18n/loadTranslations';

export default async function Page({ params }: { params: { locale: Locale } }) {
  const t = await getTranslation(params.locale);

  return (
    <section className="flex h-96 flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-medium tracking-tight">
        {t('views.home.title')}
      </h1>
      <p className="align-middle text-xl font-light tracking-tight text-neutral-600 decoration-wavy">
        {t('views.home.body')}
      </p>
    </section>
  );
}
