import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProfilePageClient from './ProfilePageClient';

export default async function ProfilePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'profile' });
  const cookieStore = await cookies();
  const token = cookieStore.get('yt2future_token')?.value;

  if (!token) redirect('/signin');

  // Gọi Backend để lấy profile hiện tại
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/me`, {
    headers: { 'Cookie': `yt2future_token=${token}` },
    cache: 'no-store'
  });

  if (!res.ok) redirect('/signin');
  const { user: profile } = await res.json();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-slate-100">
        <h2 className="text-2xl font-black text-[#1a365d] uppercase italic mb-8 text-center tracking-tight">
          {t('title')}
        </h2>

        <ProfilePageClient profile={profile} />
      </div>
    </div>
  );
}