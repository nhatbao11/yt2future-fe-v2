import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`,
        },
    });

    if (error) {
        return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent(error.message)}`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
    }

    if (data.url) {
        return NextResponse.redirect(data.url);
    }

    return NextResponse.redirect(new URL('/signup?error=Unknown_Error', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
