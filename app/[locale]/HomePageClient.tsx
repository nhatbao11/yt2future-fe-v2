"use client";
import PrimaryButton from '@/components/common/PrimaryButton';
import SectorGrid from '@/components/partials/SectorGrid';
import ProcessSection from '@/components/partials/ProcessSection';
import FeedbackSection from '@/components/partials/FeedbackHome';
import { ArrowRight } from 'lucide-react';
import Link from '@/components/common/Link';
import FeedbackHome from '@/components/partials/FeedbackHome';
import ScrollReveal from '@/components/common/ScrollReveal';

import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('home');

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white">
            <main className="grow">

                {/* 1. HERO SECTION */}
                <section className="relative h-[calc(100vh-72px)] md:h-[calc(100vh-75px)] min-h-125 w-full flex items-center overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 z-0">
                        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
                            <source src="/Videohome.webm" type="video/webm" />
                            <source src="/Videohome.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" />
                    </div>
                    <div className="relative z-20 max-w-360 mx-auto w-full px-6 md:px-12 text-white text-center md:text-left">
                        <ScrollReveal direction="up" distance={30}>
                            <h2 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter leading-tight">
                                {t('hero.title')} <span className="text-yellow-500">{t('hero.titleHighlight')}</span>
                            </h2>
                            <p className="text-lg md:text-2xl font-light mb-10 tracking-wide opacity-95 leading-relaxed max-w-2xl mx-auto md:mx-0 uppercase whitespace-pre-line">
                                {t('hero.subtitle')}
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <PrimaryButton label={t('hero.cta')} href="/investment" />
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* 2. ABOUT US SECTION - MOVED UP */}
                <section className="py-10 md:py-16 bg-white overflow-hidden text-left">
                    <ScrollReveal>
                        <div className="max-w-360 mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                            {/* Header Block (Left Side) - REVERTED */}
                            <div className="col-span-1 md:col-span-4 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6">
                                <h3 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
                                    {t('about.title')} <span className="text-yellow-500">{t('about.titleHighlight')}</span>
                                </h3>
                                <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                                    {t('about.tagline')}
                                </p>
                            </div>

                            {/* Content Block (Right Side) - REVERTED */}
                            <div className="col-span-1 md:col-span-8 space-y-6">
                                <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed text-justify">
                                    {t('about.desc1')}
                                </p>
                                <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed text-justify">
                                    {t('about.desc2')}
                                </p>
                                <Link href="/about" className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all">
                                    {t('about.learnMore')} <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </section>

                {/* 3. LĨNH VỰC NGHIÊN CỨU */}
                <section className="py-10 md:py-16 bg-gray-50 w-full overflow-hidden text-left">
                    <ScrollReveal className="max-w-360 mx-auto px-6 md:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                            <div className="max-w-2xl border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6">
                                <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
                                    {t('explore.title')} <span className="text-yellow-500">{t('explore.titleHighlight')}</span>
                                </h2>
                                <h4 className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                                    {t('explore.tagline')}
                                </h4>
                            </div>
                            {/* Description - Desktop Only */}
                            <div className="md:text-right hidden md:block">
                                <p className="text-gray-400 text-sm md:text-base font-bold max-w-sm md:ml-auto border-r-4 border-yellow-500 pr-6 uppercase tracking-wider italic">
                                    {t('explore.desc')}
                                </p>
                            </div>
                        </div>

                        {/* ÉP CHIỀU CAO CỐ ĐỊNH TẠI ĐÂY */}
                        <div className="relative w-full border-t border-slate-100">
                            <ScrollReveal delay={0.2} direction="up" distance={40}>
                                <SectorGrid />
                            </ScrollReveal>
                        </div>
                    </ScrollReveal>
                </section>

                {/* 4. PROCESS SECTION */}
                <ProcessSection />

                {/* 5. FEEDBACK SECTION */}
                <FeedbackHome />

            </main>
        </div>
    );
}