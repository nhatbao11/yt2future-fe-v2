import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import ScrollToTop from "@/components/partials/ScrollToTop";
import { getTranslations } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

/** Bật = true: không cho Google index bản tiếng Anh (/en/*), tránh trùng kết quả với /vi — vẫn cho user mở /en bình thường. */
function seoNoindexEn(): boolean {
  return process.env.SEO_NOINDEX_EN === "true" || process.env.NEXT_PUBLIC_SEO_NOINDEX_EN === "true";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yt2future.com";
  const t = await getTranslations({ locale, namespace: 'seo' });
  const defaultTitle = t('defaultTitle');
  const defaultDescription = t('defaultDescription');
  const noindexEn = seoNoindexEn();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: "%s | YT2Future",
      default: defaultTitle,
    },
    description: defaultDescription,
    openGraph: {
      type: "website",
      locale: locale,
      url: `${baseUrl}/${locale}`,
      siteName: "YT2Future",
      title: defaultTitle,
      description: defaultDescription,
      images: [
        {
          url: "/Logo.jpg",
          width: 800,
          height: 600,
          alt: "YT2Future",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: ["/Logo.jpg"],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: noindexEn
        ? {
            vi: `${baseUrl}/vi`,
            "x-default": `${baseUrl}/vi`,
          }
        : {
            vi: `${baseUrl}/vi`,
            en: `${baseUrl}/en`,
            "x-default": `${baseUrl}/vi`,
          },
    },
    ...(noindexEn && locale === "en"
      ? {
          robots: { index: false, follow: true },
        }
      : {}),
  };
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15+
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Toaster position="top-center" />
          {/* Header xuất hiện ở mọi trang */}
          <Navbar />

          {/* Main content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer xuất hiện ở mọi trang */}
          <Footer />

          {/* Nút cuộn lên đầu trang */}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}