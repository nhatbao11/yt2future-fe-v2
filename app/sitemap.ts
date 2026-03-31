import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yt2future.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Common routes in the application
  const routes = [
    '',
    '/about',
    '/investment',
    '/contact',
    '/business',
    '/sector',
    '/signin',
    '/signup'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            vi: `${baseUrl}/vi${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
