import React, { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/seedData';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim() || !slug.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || nameAr.trim(),
      slug: slug.trim(),
      description: desc.trim() || null,
      sort_order: categories.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    setCategories([...categories, newCat]);
    setNameAr('');
    setNameEn('');
    setSlug('');
    setDesc('');
    setNotice('تمت إضافة القسم الجديد بنجاح.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">إدارة تصنيفات وأقسام القوالب</h1>
        <p className="text-xs text-[#667085] mt-1">
          تنظيم أقسام قوالب Excel الرئيسية وروابط التصفح
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Categories List */}
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 bg-[#F8FAF7] border-b border-[#E5E7EB] font-bold text-xs text-slate-800">
            الأقسام المعتمدة ({categories.length})
          </div>
          <div className="divide-y divide-slate-100">
            {categories.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{c.name_ar}</h4>
                  <div className="text-[11px] text-[#667085] mt-0.5 font-mono">
                    {c.slug} · {c.name_en}
                  </div>
                  {c.description && (
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{c.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                    نشط
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Category Form */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            إضافة قسم جديد
          </h3>

          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                اسم القسم بالعربية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nameAr}
                onChange={(e) => {
                  setNameAr(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                placeholder="مثال: إدارة العقارات والمقاولات"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                المعرف الفريد (Slug) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="real-estate-contracting"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                الاسم بالإنجليزية (اختياري)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Real Estate & Contracting"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                وصف القسم ومحتوياته
              </label>
              <textarea
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="وصف للنماذج التي يشملها هذا القسم..."
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              إضافة القسم
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
