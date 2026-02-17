"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import PrimaryButton from '@/components/common/PrimaryButton';
import AvatarUpload from '@/components/partials/AvatarUpload';

interface ProfilePageClientProps {
    profile: any;
}

export default function ProfilePageClient({ profile }: ProfilePageClientProps) {
    const t = useTranslations('profile');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || 'Cập nhật thất bại sếp ơi!');
            } else {
                toast.success('Đã lưu vào DB thành công!');
                router.refresh();
            }
        } catch (error) {
            console.error("Profile Update Error:", error);
            toast.error('Lỗi kết nối server!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <AvatarUpload initialAvatar={profile?.avatarUrl || '/Logo.jpg'} />

            <div className="space-y-4">
                <div className="group text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('fullName')}</label>
                    <input
                        name="fullName"
                        defaultValue={profile?.fullName || ''}
                        placeholder={t('fullNamePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 p-4 mt-1 text-sm font-bold text-[#1a365d] rounded-xl outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                    />
                </div>

                <div className="group text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('email')}</label>
                    <input
                        value={profile?.email || ''}
                        disabled
                        className="w-full bg-slate-100 border border-slate-200 p-4 mt-1 text-sm font-medium text-slate-400 rounded-xl cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="pt-4">
                <PrimaryButton
                    label={loading ? 'Đang lưu...' : t('submit')}
                    type="submit"
                    fullWidth={true}
                    className="py-4 shadow-lg shadow-yellow-200"
                    disabled={loading}
                />
            </div>
        </form>
    );
}
