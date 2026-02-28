import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n/request';

const handleI18nRouting = createMiddleware({
    // Danh sách locales
    locales,

    // Locale mặc định
    defaultLocale: 'vi',

    // Tự động detect ngôn ngữ từ browser
    localeDetection: true,
});

export default function middleware(request: any) {
    return handleI18nRouting(request);
}

export const config = {
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /images, /icons, etc. (static files)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
