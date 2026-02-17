"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import PrimaryButton from '@/components/common/PrimaryButton';
import PasswordField from '@/components/partials/PasswordField';
import Link from '@/components/common/Link';
import { FcGoogle } from 'react-icons/fc';

interface SigninPageClientProps {
    errorMessage?: string;
}

export default function SigninPageClient({ errorMessage }: SigninPageClientProps) {
    const t = useTranslations('auth.signIn');
    const tAuth = useTranslations('auth');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Hiển thị toast lỗi nếu có error message từ server (redirect cũ)
    if (errorMessage) {
        toast.error(decodeURIComponent(errorMessage), { id: 'signin-error' });
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message || 'Đăng nhập thất bại sếp ơi!');
            } else {
                toast.success('Đăng nhập thành công!');
                router.refresh();
                router.push('/');
            }
        } catch (error) {
            console.error("Login Client Error:", error);
            toast.error('Lỗi kết nối server!');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = '/api/auth/google';
    };

    return (
        <>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">{t('title')}</h2>
                <div className="w-12 h-1.5 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5" autoComplete="off">
                <div className="group text-left">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('email')}</label>
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="new-password"
                        placeholder="ytcapital.group@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-yellow-500 focus:bg-white transition-all"
                    />
                </div>

                <PasswordField name="password" label={t('password')} />

                <div className="pt-2">
                    <PrimaryButton
                        label={loading ? 'Checking...' : t('submit')}
                        type="submit"
                        fullWidth={true}
                        className="cursor-pointer font-black uppercase tracking-wider py-4"
                        disabled={loading}
                    />
                </div>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400"><span className="bg-white px-4">{tAuth('socialLogin')}</span></div>
            </div>

            <button
                onClick={handleGoogleLogin}
                className="w-full border border-slate-200 py-3.5 rounded-md flex items-center justify-center gap-3 hover:bg-slate-50 text-sm font-bold text-slate-700 cursor-pointer transition-all"
            >
                <FcGoogle size={22} /> {tAuth('googleLogin')}
            </button>

            <p className="text-[13px] mt-8 text-slate-500 text-center font-medium">
                {t('noAccount')} <Link href="/signup" className="font-bold text-yellow-600 underline underline-offset-4">{t('signUpLink')}</Link>
            </p>
        </>
    );
}
