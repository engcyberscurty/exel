import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, FileSpreadsheet, X } from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_TEMPLATES } from '../data/seedData';
import { TemplateCard } from '../components/templates/TemplateCard';
import { AdBanner } from '../components/common/AdBanner';

export const Templates: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('cat') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'featured'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter and sort
  const filteredTemplates = useMemo(() => {
    return INITIAL_TEMPLATES.filter((tpl) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = tpl.title_ar.toLowerCase().includes(q) || (tpl.title_en && tpl.title_en.toLowerCase().includes(q));
        const matchesDesc = tpl.short_description.toLowerCase().includes(q) || tpl.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        const cat = INITIAL_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && tpl.category_id !== cat.id) return false;
      }

      // Price
      if (priceFilter === 'free' && (!tpl.is_free && tpl.price_egp > 0)) return false;
      if (priceFilter === 'paid' && (tpl.is_free || tpl.price_egp === 0)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      }
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'price_asc') {
        return a.price_egp - b.price_egp;
      }
      if (sortBy === 'price_desc') {
        return b.price_egp - a.price_egp;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, priceFilter, sortBy]);

  // Pagination calculation
  const totalItems = filteredTemplates.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    if (slug === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', slug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceFilter('all');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#126B45] mb-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>متجر القوالب الرقمية المعتمدة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ملفات ونماذج Excel الاحترافية
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-2 leading-relaxed">
            نماذج جاهزة للاستخدام الفوري، مصممة بأعلى معايير الدقة المحاسبية لخدمة الأنشطة التجارية والصناعية والخدمية في مصر.
          </p>
        </div>

        {/* Search & Controls */}
        <div className="mt-6 pt-6 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="ابحث بالاسم أو الوصف..."
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] text-xs rounded-lg py-2.5 pr-9 pl-4 text-slate-800 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] text-xs rounded-lg py-2.5 px-3 text-slate-800 outline-none cursor-pointer"
            >
              <option value="all">جميع التصنيفات ({INITIAL_CATEGORIES.length})</option>
              {INITIAL_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name_ar}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter Segment */}
          <div className="flex bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-1 text-xs">
            <button
              onClick={() => {
                setPriceFilter('all');
                setCurrentPage(1);
              }}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                priceFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => {
                setPriceFilter('free');
                setCurrentPage(1);
              }}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                priceFilter === 'free' ? 'bg-white text-[#126B45] font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مجاني
            </button>
            <button
              onClick={() => {
                setPriceFilter('paid');
                setCurrentPage(1);
              }}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                priceFilter === 'paid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مدفوع
            </button>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] text-xs rounded-lg py-2.5 px-3 text-slate-800 outline-none cursor-pointer"
            >
              <option value="featured">الأبرز والمميز أولاً</option>
              <option value="newest">الأحدث إضافة</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills interactive bar (allowed interactive segmented controls) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#126B45] text-white shadow-xs'
              : 'bg-white border border-[#E5E7EB] text-slate-700 hover:border-slate-300'
          }`}
        >
          كل الأقسام
        </button>
        {INITIAL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-[#126B45] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#E5E7EB] text-slate-700 hover:border-slate-300'
            }`}
          >
            {cat.name_ar}
          </button>
        ))}
      </div>

      {/* Templates Grid or Empty State */}
      {paginatedTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">لم يتم العثور على قوالب مطابقة</h3>
          <p className="text-xs text-[#667085] max-w-sm mx-auto">
            جرّب تغيير كلمات البحث أو إعادة ضبط خيارات الفلترة لاستعراض باقي ملفات المنصة.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#126B45] text-white rounded-lg text-xs font-semibold hover:bg-[#0B3527] transition-colors"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === pageNum
                  ? 'bg-[#126B45] text-white'
                  : 'bg-white border border-[#E5E7EB] text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}

      {/* Category Ad Banner */}
      <AdBanner placement="category_sponsored" />
    </div>
  );
};
