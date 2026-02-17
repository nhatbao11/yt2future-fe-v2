"use client";

import React, { useState } from 'react';
import Link from '@/components/common/Link';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/common/PrimaryButton';
import PasswordField from '@/components/partials/PasswordField';
import { FileText, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

interface SignupPageClientProps {
    errorMessage?: string;
    successMessage?: string;
}

export default function SignupPageClient({ errorMessage, successMessage }: SignupPageClientProps) {
    const t = useTranslations('auth.signUp');
    const tAuth = useTranslations('auth');
    const router = useRouter();
    const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const POLICY_LINKS = {
        privacy: "https://res.cloudinary.com/da0gdcrzn/raw/upload/v1766786574/yt_reports/pdf/uk7xgkdqggyvfrv2exyw",
        terms: "https://res.cloudinary.com/da0gdcrzn/raw/upload/v1766786531/yt_reports/pdf/qjq8lts28jm0uqbufmnq",
    };

    const openPdf = (url: string, title: string) => {
        setActivePdf({ url, title });
    };

    return (
        <>
            <div className="relative z-10 bg-white p-6 md:p-10 rounded-lg shadow-2xl w-full max-w-120 border border-slate-100 transition-all text-left">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">{t('title')}</h2>
                    <div className="w-12 h-1.5 bg-yellow-500 mx-auto mt-2 rounded-full"></div>

                    {/* THÔNG BÁO LỖI (MÀU ĐỎ) */}
                    {errorMessage && (
                        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold text-left animate-in fade-in slide-in-from-top-2">
                            <span className="flex items-center gap-2">
                                <span className="text-base">⚠️</span> {decodeURIComponent(errorMessage)}
                            </span>
                        </div>
                    )}

                    {/* THÔNG BÁO THÀNH CÔNG (MÀU XANH) */}
                    {successMessage && (
                        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-[11px] font-bold text-left animate-in fade-in slide-in-from-top-2">
                            <span className="flex items-center gap-2">
                                <span className="text-base">✅</span> {decodeURIComponent(successMessage)}
                                <span className="ml-auto animate-pulse italic font-medium opacity-70">(Chuyển hướng sau 2s...)</span>
                            </span>
                        </div>
                    )}
                </div>

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    const formData = new FormData(e.currentTarget);
                    const fullName = formData.get('fullName');
                    const email = formData.get('email');
                    const password = formData.get('password');
                    const confirmPassword = formData.get('confirmPassword');

                    try {
                        const res = await fetch('/api/auth/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ fullName, email, password, confirmPassword }),
                        });

                        const result = await res.json();

                        if (!res.ok) {
                            toast.error(result.message || 'Đăng ký thất bại!');
                        } else {
                            toast.success(result.message || 'Đăng ký thành công!');
                            router.refresh();
                            router.push('/signup?success=' + encodeURIComponent('Đăng ký thành công! Sếp đăng nhập ngay đi.'));
                        }
                    } catch (err) {
                        toast.error('Lỗi kết nối server!');
                    } finally {
                        setLoading(false);
                    }
                }} className="space-y-5">
                    <div className="group">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('name')}</label>
                        <input
                            name="fullName"
                            type="text"
                            required
                            placeholder="YT2Future"
                            className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-yellow-500 focus:bg-white transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('email')}</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="ytcapital.group@gmail.com"
                            className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-yellow-500 focus:bg-white transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PasswordField name="password" label={t('password')} />
                        <PasswordField name="confirmPassword" label={t('confirmPassword')} />
                    </div>

                    <div className="flex items-start gap-2 py-1">
                        <input type="checkbox" required id="terms" className="w-4 h-4 mt-0.5 cursor-pointer accent-yellow-600" />
                        <label htmlFor="terms" className="text-[11px] text-slate-500 leading-tight cursor-pointer select-none">
                            {tAuth('agree')}{' '}
                            <button
                                type="button"
                                onClick={() => openPdf(POLICY_LINKS.terms, tAuth('terms'))}
                                className="font-bold text-slate-900 hover:text-yellow-600 transition-colors cursor-pointer outline-none align-baseline"
                            >
                                {tAuth('terms')}
                            </button>{' '}
                            {tAuth('and')}{' '}
                            <button
                                type="button"
                                onClick={() => openPdf(POLICY_LINKS.privacy, tAuth('privacy'))}
                                className="font-bold text-slate-900 hover:text-yellow-600 transition-colors cursor-pointer outline-none align-baseline"
                            >
                                {tAuth('privacy')}
                            </button>
                        </label>
                    </div>

                    <div className="pt-2">
                        <PrimaryButton
                            label={loading ? 'Creating...' : tAuth('createAccount')}
                            type="submit"
                            fullWidth={true}
                            disabled={loading}
                            className="cursor-pointer hover:shadow-xl hover:shadow-yellow-100 active:scale-[0.97] transition-all py-4 font-black uppercase tracking-wider"
                        />
                    </div>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400">
                        <span className="bg-white px-4">{tAuth('socialLogin')}</span>
                    </div>
                </div>

                <p className="text-[13px] mt-8 text-slate-500 text-center font-medium">
                    {t('hasAccount')}{' '}
                    <Link href="/signin" className="font-bold text-yellow-600 hover:text-yellow-700 underline underline-offset-4 cursor-pointer transition-colors">
                        {t('signInLink')}
                    </Link>
                </p>
            </div>

            {/* MODAL XEM PDF */}
            {activePdf && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border-2 border-yellow-500">
                        <div className="bg-[#001a41] p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FileText className="text-yellow-500" size={20} />
                                <span className="text-white text-[10px] font-black uppercase tracking-widest">{activePdf.title}</span>
                            </div>
                            <button onClick={() => setActivePdf(null)} className="bg-yellow-500 text-[#001a41] p-1 hover:rotate-90 transition-all cursor-pointer">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100">
                            <iframe
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(activePdf.url)}&embedded=true`}
                                className="w-full h-full border-0"
                                title="Policy Viewer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
