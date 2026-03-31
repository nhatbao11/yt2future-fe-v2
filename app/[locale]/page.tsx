import { getTranslations } from 'next-intl/server';
import HomePageClient from './HomePageClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: "YT2Future | Shaping Tomorrow",
    description: "Investment Solutions and Agile Innovation",
    // You can also use translations for dynamic SEO titles:
    // title: t('hero.title') + ' ' + t('hero.titleHighlight'),
    // description: t('hero.subtitle').substring(0, 160)
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
