"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Clock, GraduationCap, ChevronRight, Briefcase } from 'lucide-react';
import Link from '@/components/common/Link';
import { useTranslations } from 'next-intl';

export default function InvestmentSolutions() {
  const t = useTranslations('investment_page');

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader title={t('title')} />

      {/* Đẩy padding-top lên cao hơn (py-12 thay vì py-40) để nội dung "xịt" lên trên */}
      <main className="max-w-360 mx-auto px-6 md:px-12 py-20 md:py-20 flex flex-col items-center justify-start text-center">

        {/* ICON TRẠNG THÁI */}
        <div className="relative mb-10">
          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center animate-bounce duration-[2000ms]">
            <GraduationCap className="text-yellow-500" size={36} />
          </div>
          <div className="absolute -top-1 -right-1 bg-[#001a41] text-white p-2 rounded-full shadow-lg">
            <Clock size={14} className="animate-spin-slow" />
          </div>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500 italic">
              {t('subtitle')}
            </h2>
            <h1 className="text-4xl md:text-6xl font-black text-[#001a41] uppercase tracking-tighter leading-none">
              {t('main_title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001a41] to-yellow-500">
                {t('main_title_sub')}
              </span>
            </h1>
          </div>
        </div>

        {/* TRẠNG THÁI PHÂN HỆ - ĐÃ XỊT LÊN GẦN TIÊU ĐỀ */}
        <div className="mt-10 w-full max-w-sm">
          <div className="p-8 bg-white border-2 border-slate-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4 group hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 cursor-wait">
            <div className="flex items-center gap-2 text-[#001a41]">
              <Briefcase size={18} className="text-yellow-500" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">{t('academic_db')}</h3>
            </div>
            <div className="h-[2px] w-10 bg-yellow-500"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">
              {t('coming_soon')}
            </span>
          </div>
        </div>

        {/* ĐIỀU HƯỚNG QUAY LẠI */}
        <div className="mt-16">
          <Link href="/" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#001a41] hover:text-yellow-600 transition-all border-b-2 border-transparent hover:border-yellow-600 pb-1">
            {t('back_home')} <ChevronRight size={14} />
          </Link>
        </div>

      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}