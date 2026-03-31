import { getTranslations } from 'next-intl/server';
import ContactPageClient from './ContactPageClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('pageTitle') + ' | YT2Future',
    description: t('getInTouch') + " " + t('getInTouchHighlight') + ". " + t('desc'),
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
