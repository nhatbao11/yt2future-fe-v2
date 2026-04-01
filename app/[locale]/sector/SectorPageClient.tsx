"use client";
import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { reportService } from '@/services/reportService';
import { Search, PlusCircle, User, FileText, X, ChevronDown, Calendar } from 'lucide-react';
import CreateReportPage from '@/components/common/CreateReportPage';
import { useTranslations, useLocale } from 'next-intl';

export default function SectorPage() {
  const t = useTranslations('sector_page');
  const locale = useLocale();

  const [reports, setReports] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCatId, setActiveCatId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ role?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readingPdfUrl, setReadingPdfUrl] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Khởi tạo dữ liệu
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/me?v=${Date.now()}`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        }
      } catch (err) { console.error("Lỗi xác thực:", err); }
    };
    fetchUser();
    reportService.getCategories().then(res => {
      if (res.success) setCategories(res.categories);
    });
  }, []);

  // Tải báo cáo
  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await reportService.getPublicReports(page, activeCatId, searchQuery);
      if (data.success) {
        setReports(data.reports);
        setTotalPages(data.totalPages);
      }
    } finally { setLoading(false); }
  };

  useEffect(() => {
    const timer = setTimeout(loadReports, 300);
    return () => clearTimeout(timer);
  }, [page, activeCatId, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title={t('title')} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-10">

        {/* THANH ĐIỀU KHIỂN */}
        <div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-7">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="w-full rounded-xl bg-white border border-slate-300 pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#001a41] focus:ring-2 focus:ring-[#001a41]/15 transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900" size={18} />
            </div>

            <div
              className="relative w-full lg:w-auto"
              onMouseEnter={() => setIsFilterOpen(true)}
              onMouseLeave={() => setIsFilterOpen(false)}
            >
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full rounded-xl flex items-center justify-between gap-6 bg-white border border-slate-300 px-5 py-3.5 text-sm text-slate-900 hover:border-[#001a41] transition-all shadow-sm"
              >
                <span>{categories.find(c => c.id === activeCatId)?.name || t('category_select')}</span>
                <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute left-0 top-full mt-1 w-full lg:w-60 bg-white border border-slate-200 rounded-xl z-50 shadow-xl transition-all ${isFilterOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <button
                  onClick={() => { setActiveCatId(undefined); setPage(1); setIsFilterOpen(false); }}
                  className="w-full text-left px-5 py-4 text-sm hover:bg-slate-50 border-b border-slate-100 text-slate-900"
                >
                  {t('all_categories')}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCatId(cat.id); setPage(1); setIsFilterOpen(false); }}
                    className="w-full text-left px-5 py-4 text-sm hover:bg-slate-50 border-b border-slate-100 text-slate-900 last:border-0"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {userData?.role === 'CTV' && (
            <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto rounded-xl flex items-center justify-center gap-3 bg-[#001a41] text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#00275f] transition-all shadow-md">
              <PlusCircle size={18} /> {t('add_report')}
            </button>
          )}
        </div>

        {/* DANH SÁCH BÁO CÁO */}
        {loading ? (
          <div className="text-center py-20 text-sm animate-pulse text-slate-500">{t('syncing')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => setReadingPdfUrl(report.pdfUrl)}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:border-[#001a41]/30 transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img src={report.thumbnail || '/Logo.jpg'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={report.title} />
                  <div className="absolute top-3 right-3 rounded-full bg-[#001a41] text-white text-[10px] font-semibold px-2.5 py-1">{report.category?.name}</div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                      <Calendar size={14} className="text-amber-500" />
                      {new Date(report.createdAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-[#001a41] group-hover:text-[#002a66] transition-colors line-clamp-2 h-14">
                      {report.title}
                    </h3>
                    <div className="relative group/desc">
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed border-l-2 border-slate-200 pl-3 min-h-[42px]">
                        "{report.description || t('no_desc')}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 flex items-center gap-2">
                      <User size={12} className="text-[#001a41]" /> @{report.user?.fullName}
                    </span>
                    <div className="flex items-center gap-2 text-[#001a41] text-sm group-hover:text-[#002a66] transition-all font-semibold">
                      <FileText size={14} /> {t('details')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PHÂN TRANG */}
        {totalPages > 1 && (
          <div className="mt-14 flex justify-center items-center gap-4">
            <button
              disabled={page === 1}
              onClick={(e) => { e.stopPropagation(); setPage(page - 1); }}
              className="px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 hover:border-[#001a41] disabled:opacity-30 transition-all active:scale-95"
            >
              {t('prev')}
            </button>
            <span className="text-[12px] text-slate-700">{t('page')} {page} / {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={(e) => { e.stopPropagation(); setPage(page + 1); }}
              className="px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 hover:border-[#001a41] disabled:opacity-30 transition-all active:scale-95"
            >
              {t('next')}
            </button>
          </div>
        )}

        {/* MODAL XEM PDF CÓ NÚT TẢI XUỐNG */}
        {readingPdfUrl && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-10 animate-in fade-in duration-300">
            <div className="bg-white w-full h-full md:max-w-7xl md:h-[90vh] flex flex-col relative shadow-2xl">

              <div className="bg-[#001a41] p-4 flex justify-between items-center text-white border-b-2 border-slate-900 font-black">
                <span className="text-[10px] tracking-widest flex items-center gap-3">
                  <FileText size={18} className="text-yellow-500" /> {t('modal_title')}
                </span>

                <div className="flex items-center gap-3">
                  {/* NÚT TẢI XUỐNG */}


                  <button
                    onClick={() => setReadingPdfUrl(null)}
                    className="bg-rose-600 p-2 border-2 border-slate-900 hover:rotate-90 transition-all"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(readingPdfUrl)}&embedded=true`}
                className="flex-1 w-full border-0"
                title="Intelligence Viewer"
              />
            </div>
          </div>
        )}

        {/* MODAL THÊM BÁO CÁO */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white w-full max-w-5xl relative overflow-y-auto max-h-[95vh] border-4 border-slate-900">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-rose-600 text-white border-2 border-slate-900 hover:rotate-90 transition-all">
                <X size={24} />
              </button>
              <CreateReportPage onClose={() => { setIsModalOpen(false); loadReports(); }} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}