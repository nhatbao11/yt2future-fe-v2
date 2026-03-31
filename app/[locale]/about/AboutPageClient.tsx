"use client";
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';
import MemberCard from '@/components/partials/MemberCard';
import Image from 'next/image';
import { BookOpen, Users, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function AboutPage() {
  const t = useTranslations('about');
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const center = slider.scrollLeft + slider.clientWidth / 2;
      let currentIndex = 0;
      let minDistance = Infinity;

      // Find currently centered item
      for (let i = 0; i < slider.children.length; i++) {
        const child = slider.children[i] as HTMLElement;
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < minDistance) {
          minDistance = dist;
          currentIndex = i;
        }
      }

      // Move to next item
      const nextIndex = (currentIndex + 1) % slider.children.length;
      const nextCard = slider.children[nextIndex] as HTMLElement;

      if (nextCard) {
        // Calculate scroll position to center the next card
        const scrollTarget = nextCard.offsetLeft - (slider.clientWidth - nextCard.offsetWidth) / 2;
        slider.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const learningPillars = [
    {
      icon: <BookOpen className="text-yellow-500" size={28} />,
      title: t('values.knowledge.title'),
      desc: t('values.knowledge.desc')
    },
    {
      icon: <Lightbulb className="text-yellow-500" size={28} />,
      title: t('values.thinking.title'),
      desc: t('values.thinking.desc')
    },
    {
      icon: <Users className="text-yellow-500" size={28} />,
      title: t('values.community.title'),
      desc: t('values.community.desc')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title={t('pageTitle')} />

      <main className="grow">
        {/* SECTION 1: GIỚI THIỆU */}
        <section className="py-10 md:py-16">
          <ScrollReveal className="max-w-360 mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <article className="space-y-8 order-1 lg:order-1">
                <div className="space-y-4">
                  <p className="text-yellow-500 font-bold uppercase tracking-[0.4em] text-[10px]">{t('tagline')}</p>
                  <div className="text-2xl md:text-4xl font-black text-[#001a41] uppercase tracking-tight leading-snug">
                    <h1>"{t('headline')}"</h1>
                  </div>
                </div>

                <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed border-l-2 border-gray-100 pl-8">
                  <p>{t('description')}</p>
                </div>

                <div className="pt-4">
                  <blockquote className="text-[#001a41] text-xl md:text-2xl font-semibold italic border-l-4 border-yellow-500 pl-6 py-1 leading-snug">
                    "{t('quote')}"
                  </blockquote>
                </div>
              </article>

              <div className="relative group overflow-hidden rounded-sm shadow-xl order-2 lg:order-2 aspect-video lg:aspect-square bg-gray-50">
                <Image
                  src="/group.png"
                  alt="Tầm nhìn và Sứ mệnh YT2Future"
                  fill
                  className="object-cover grayscale-0 transition-all duration-1000 ease-in-out scale-100 lg:scale-105 lg:group-hover:scale-100"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 2: GIÁ TRỊ CỐT LÕI */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-360 mx-auto px-6 md:px-12">
            <div className="mb-12 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6 text-left">
              <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
                {t('values.title')} <span className="text-yellow-500">{t('values.subtitle')}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 border border-gray-200 shadow-sm rounded-sm overflow-hidden">
              {learningPillars.map((p, i) => (
                <div key={i} className="p-10 bg-white lg:hover:bg-[#001a41] group transition-all duration-500 cursor-default">
                  <div className="mb-8 lg:group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                  <h3 className="text-xl font-black text-[#001a41] group-hover:text-white uppercase tracking-tighter mb-4">{p.title}</h3>
                  <p className="text-gray-500 lg:group-hover:text-white/70 text-sm leading-loose tracking-wide">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ĐỘI NGŨ FOUNDERS */}
        <section className="py-12 md:py-16 bg-gray-50">
          <ScrollReveal>
            <div className="max-w-360 mx-auto px-6 md:px-12">
              <div className="mb-12 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6 text-left">
                <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
                  {t('founders.title')}
                </h2>
                <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                  {t('founders.tagline')}
                </p>
              </div>
            </div>

            {/* Mobile: Horizontal Scroll with Auto-slide | Desktop: Grid */}
            <div ref={sliderRef} className="max-w-360 mx-auto flex overflow-x-auto pb-10 px-6 gap-6 md:grid md:grid-cols-3 md:px-12 md:gap-8 no-scrollbar snap-x snap-mandatory md:snap-none">

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name={t('founders.nhat.name')}
                  role={t('founders.nhat.role')}
                  image="/Nhat.jpg"
                  field={t('founders.nhat.field')}
                />
              </div>

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name={t('founders.nga.name')}
                  role={t('founders.nga.role')}
                  image="/Nga.jpg"
                  field={t('founders.nga.field')}
                />
              </div>

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name={t('founders.bao.name')}
                  role={t('founders.bao.role')}
                  image="/Bao.jpg"
                  field={t('founders.bao.field')}
                />
              </div>

            </div>

            {/* Gợi ý lướt (chỉ hiện trên mobile) */}
            <div className="md:hidden text-center mt-2">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic animate-pulse">
                {t('founders.swipeHint')}
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Style để ẩn thanh cuộn và căn chỉnh */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div >
  );
}