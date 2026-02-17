import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  // 1. Lấy cái mã "code" từ thanh địa chỉ mà sếp vừa thấy
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 1. Lấy thông tin user từ Supabase
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 2. Chuẩn bị profile gửi sang Backend
        const profile = {
          email: user.email || '',
          name: user.user_metadata.full_name || user.user_metadata.name || user.email?.split('@')[0],
          avatarUrl: user.user_metadata.avatar_url || user.user_metadata.picture || ''
        };

        try {
          // 3. Gọi Backend để đồng bộ và lấy Token
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

          const backendRes = await fetch(`${API_URL}/auth/grant-google-role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
          });

          if (backendRes.ok) {
            const { token } = await backendRes.json();

            // 4. Set Cookie thủ công và Redirect
            const response = NextResponse.redirect(`${origin}/`);

            response.cookies.set('yt2future_token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 7 * 24 * 60 * 60, // 7 ngày
              path: '/'
            });

            return response;
          } else {
            console.error('Backend sync failed:', await backendRes.text());
          }
        } catch (err) {
          console.error('Error syncing with backend:', err);
        }
      }

      // Fallback nếu lỗi sync nhưng vẫn có session
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/signup?error=Xác thực Google thất bại, vui lòng thử lại.`);
}