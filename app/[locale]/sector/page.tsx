import { getTranslations } from 'next-intl/server';
import SectorPageClient from './SectorPageClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sector_page' });

  return {
    title: t('title') + ' | YT2Future',
    description: t('metaDescription'),
    openGraph: {
      title: t('title') + ' | YT2Future',
      description: t('metaDescription'),
    },
  };
}

export default function SectorPage() {
  return <SectorPageClient />;
}
