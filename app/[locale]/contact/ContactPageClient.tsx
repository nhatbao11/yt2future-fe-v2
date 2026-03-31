"use client";
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  const contactInfo = [
    {
      icon: <MapPin className="text-yellow-500" size={24} />,
      title: t('info.address'),
      content: t('values.address')
    },
    {
      icon: <Mail className="text-yellow-500" size={24} />,
      title: t('info.email'),
      content: t('values.email')
    },
    {
      icon: <Phone className="text-yellow-500" size={24} />,
      title: t('info.hotline'),
      content: t('values.hotline')
    },
    {
      icon: <Clock className="text-yellow-500" size={24} />,
      title: t('info.hours'),
      content: t('values.hours')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title={t('pageTitle')} />

      <main className="grow py-7 md:py-12 lg:py-16">
        <div className="max-w-360 mx-auto px-6 md:px-12">

          {/* Grid chính: Info & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* TRÁI: THÔNG TIN LIÊN HỆ */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter mb-6">
                  {t('getInTouch')} <span className="text-yellow-500">{t('getInTouchHighlight')}</span>
                </h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed max-w-md border-l-2 border-yellow-500 pl-6">
                  {t('desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div className="shrink-0 w-14 h-14 bg-[#001a41]/5 flex items-center justify-center rounded-sm group-hover:bg-[#001a41] transition-all duration-300 shadow-sm group-hover:shadow-yellow-500/20">
                      <div className="group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.2em] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#001a41] font-bold text-base md:text-lg leading-tight">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHẢI: FORM LIÊN HỆ - ĐÃ THÊM VIỀN CAM NỔI BẬT */}
            <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl border border-yellow-500 relative overflow-hidden">
              {/* Decor góc cho Form */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 -rotate-45 translate-x-8 -translate-y-8" />
              <h2 className="text-center text-black">{t('formTitle')}</h2>
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">{t('name')}</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-gray-50 border border-gray-200 p-4 text-sm outline-none focus:border-yellow-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">{t('email')}</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-gray-50 border border-gray-200 p-4 text-sm outline-none focus:border-yellow-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">{t('subject')}</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm outline-none focus:border-yellow-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">{t('message')}</label>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm outline-none focus:border-yellow-500 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <PrimaryButton label={t('submit')} type="submit" fullWidth={true} />
                </div>
              </form>
            </div>

          </div>

          {/* BẢN ĐỒ - VIỀN CAM VÀ FIX MỜ TRÊN MOBILE */}
          <div className="mt-24 w-full h-112.5 bg-gray-100 rounded-sm overflow-hidden border border-yellow-500 shadow-2xl relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8665792770263!2d106.60155617570258!3d10.744766859775364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dd6c8d7655d%3A0x677b10f845a76903!2zOTIgMTlFLCBBbiBM4bqhYywgQsOsbmggVMOibiwgSOG7kyBDaMOIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="YT2Future Location"
              /* lg:grayscale: Chỉ xám trên Laptop, Mobile & Tablet hiện màu chuẩn */
              className="grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-[1.01]"
            ></iframe>
          </div>

        </div>
      </main>
    </div>
  );
}