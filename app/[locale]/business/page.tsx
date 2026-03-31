import PageHeader from '@/components/layout/PageHeader';
import BusinessFilter from '@/components/partials/BusinessFilter';
import { Download, Eye, Calendar, User, Briefcase } from 'lucide-react';
import Link from '@/components/common/Link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'business_page' });
  return {
    title: t('title') + " | YT2Future",
    description: "Discover our business reports and enterprise analysis inside YT2Future.",
  };
}

export default function BusinessPage() {
  const t = useTranslations('business_page');

  const businessReports = [
    {
      id: 1,
      ticker: "VIC",
      title: "Vingroup: Bước ngoặt từ xe điện VinFast",
      description: "Phân tích cấu trúc tài chính và tiềm năng bứt phá của hệ sinh thái Vingroup trong kỷ nguyên xanh.",
      category: t('filters.real_estate') + " & EV",
      date: "20/12/2025",
      author: "Minh Nhật",
      thumbnail: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600",
    },
    // ... other items kept static for now as mock data
    {
      id: 2,
      ticker: "HAG",
      title: "HAGL: Tái cấu trúc và câu chuyện Nông nghiệp",
      description: "Đánh giá mô hình heo ăn chuối và khả năng xử lý nợ vay của bầu Đức trong chu kỳ mới.",
      category: t('filters.agriculture'),
      date: "18/12/2025",
      author: "Nhất Bảo",
      thumbnail: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=600",
    },
    {
      id: 3,
      ticker: "BIDV",
      title: "BIDV: Định giá lại vị thế Ngân hàng quốc doanh",
      description: "Phân tích chất lượng tài sản và triển vọng tăng trưởng lợi nhuận sau trích lập dự phòng.",
      category: t('filters.banking'),
      date: "15/12/2025",
      author: "Phương Nga",
      thumbnail: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=600",
    }
  ];

  const sectors = [
    t('filters.all'),
    t('filters.banking'),
    t('filters.real_estate'),
    t('filters.agriculture'),
    t('filters.tech')
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader title={t('title')} />

      <main className="max-w-360 mx-auto px-6 md:px-12 py-20">

        {/* Filter - Client Component */}
        <BusinessFilter sectors={sectors} />

        {/* List - Server Component (SEO) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {businessReports.map((report) => (
            <div key={report.id} className="group bg-white border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-all duration-500">

              {/* Ticker & Image */}
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={report.thumbnail}
                  alt={report.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-0 left-0 bg-[#001a41] text-white px-5 py-2 font-black italic text-sm tracking-tighter">
                  {report.ticker}
                </div>
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                    <span className="flex items-center gap-1 text-yellow-500"><Briefcase size={12} /> {report.category}</span>
                  </div>

                  <h3 className="text-xl font-black text-[#001a41] uppercase tracking-tighter leading-tight group-hover:text-yellow-500 transition-colors">
                    {report.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {report.description}
                  </p>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#001a41] uppercase">{t('by')} {report.author}</p>
                      <p className="text-[9px] text-gray-400 font-medium">{t('analyst')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Link href="#" className="flex-1 bg-[#001a41] text-white text-[10px] font-black uppercase tracking-widest py-3 text-center hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
                    <Eye size={14} /> {t('view_pdf')}
                  </Link>
                  <button className="px-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <Download size={16} className="text-[#001a41]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}