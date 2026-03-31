import { getTranslations } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('pageTitle') + ' | YT2Future',
    description: t('tagline') + ". " + t('headline'),
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
