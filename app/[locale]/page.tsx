import { getTranslations } from 'next-intl/server';
import HomePageClient from './HomePageClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const ts = await getTranslations({ locale, namespace: 'seo' });
  const description = t('about.desc1').replace(/\s+/g, ' ').trim().slice(0, 160);

  return {
    title: ts('defaultTitle'),
    description,
    openGraph: {
      title: ts('defaultTitle'),
      description,
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
