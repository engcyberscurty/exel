import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  Sparkles,
  X,
  Upload,
} from 'lucide-react';
import { INITIAL_TEMPLATES, INITIAL_CATEGORIES } from '../../data/seedData';
import { Template } from '../../types';
import { Link } from 'react-router-dom';

export const AdminTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState(INITIAL_CATEGORIES[0]?.id || '');
  const [formPrice, setFormPrice] = useState('0');
  const [formIsFree, setFormIsFree] = useState(true);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formExtension, setFormExtension] = useState<'xlsx' | 'xlsm'>('xlsx');
  const [formVersion, setFormVersion] = useState('1.0');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredTemplates = templates.filter((tpl) => {
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      if (!tpl.title_ar.toLowerCase().includes(q) && !tpl.slug.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedCategory !== 'all' && tpl.category_id !== selectedCategory) {
      return false;
    }
    return true;
  });

  const openAddModal = () => {
    setEditingTemplate(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory(INITIAL_CATEGORIES[0]?.id || '');
    setFormPrice('0');
    setFormIsFree(true);
    setFormShortDesc('');
    setFormFullDesc('');
    setFormExtension('xlsx');
    setFormVersion('1.0');
    setFormIsFeatured(false);
    setFormStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (tpl: Template) => {
    setEditingTemplate(tpl);
    setFormTitle(tpl.title_ar);
    setFormSlug(tpl.slug);
    setFormCategory(tpl.category_id);
    setFormPrice(String(tpl.price_egp));
    setFormIsFree(tpl.is_free);
    setFormShortDesc(tpl.short_description);
    setFormFullDesc(tpl.description);
    setFormExtension(tpl.file_extension as any);
    setFormVersion(tpl.version);
    setFormIsFeatured(tpl.is_featured);
    setFormStatus(tpl.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = formIsFree ? 0 : Number(formPrice);
    const slugFinal = formSlug.trim() || `tpl-${Date.now()}`;

    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingTemplate.id
            ? {
                ...t,
                title_ar: formTitle,
                slug: slugFinal,
                category_id: formCategory,
                price_egp: priceNum,
                is_free: formIsFree,
                short_description: formShortDesc,
                description: formFullDesc,
                file_extension: formExtension,
                version: formVersion,
                is_featured: formIsFeatured,
                status: formStatus,
                updated_at: new Date().toISOString(),
              }
            : t
        )
      );
      setNotice('تم تحديث بيانات القالب بنجاح.');
    } else {
      const newTpl: Template = {
        id: `tpl-${Date.now()}`,
        title_ar: formTitle,
        slug: slugFinal,
        category_id: formCategory,
        price_egp: priceNum,
        is_free: formIsFree,
        short_description: formShortDesc,
        description: formFullDesc,
        storage_path: `templates/${slugFinal}.${formExtension}`,
        preview_image_path: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80',
        file_extension: formExtension,
        file_size_bytes: 1200000,
        version: formVersion,
        compatibility: 'Excel 2016+, Office 365, Google Sheets',
        status: formStatus,
        is_featured: formIsFeatured,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTemplates((prev) => [newTpl, ...prev]);
      setNotice('تمت إضافة القالب الجديد بنجاح.');
    }

    setModalOpen(false);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف القالب: "${title}"؟ هذا الإجراء لا يمكن التراجع عنه.`)) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      setNotice('تم حذف القالب بنجاح.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">إدارة كتالوج قوالب Excel</h1>
          <p className="text-xs text-[#667085] mt-1">
            إضافة ملفات جديدة، تحديد الأسعار بالجنيه المصري، وتعيين تراخيص النشر
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة قالب جديد</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث في القوالب بالاسم أو الـ Slug..."
            className="w-full bg-[#F8FAF7] border border-[#E5E7EB] text-xs rounded-lg py-2.5 pr-9 pl-3 text-slate-800 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#F8FAF7] border border-[#E5E7EB] text-xs rounded-lg py-2.5 px-3 text-slate-800 outline-none cursor-pointer"
        >
          <option value="all">كل الأقسام</option>
          {INITIAL_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_ar}
            </option>
          ))}
        </select>
      </div>

      {/* Templates Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAF7] border-b border-[#E5E7EB] text-[#667085] font-semibold">
              <tr>
                <th className="p-4">القالب</th>
                <th className="p-4">القسم</th>
                <th className="p-4">السعر</th>
                <th className="p-4">الصيغة / الإصدار</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTemplates.map((tpl) => {
                const cat = INITIAL_CATEGORIES.find((c) => c.id === tpl.category_id);
                return (
                  <tr key={tpl.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 leading-snug">{tpl.title_ar}</div>
                      <div className="text-[11px] text-[#667085] font-mono mt-0.5">{tpl.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-800">{cat?.name_ar || 'عام'}</span>
                    </td>
                    <td className="p-4">
                      {tpl.is_free || tpl.price_egp === 0 ? (
                        <span className="font-bold text-[#126B45]">مجاني</span>
                      ) : (
                        <span className="font-bold text-slate-900">{tpl.price_egp} ج.م</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="uppercase font-semibold text-[#126B45]">.{tpl.file_extension}</span>
                      <span className="text-[#667085] mr-1.5">v{tpl.version}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          tpl.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tpl.status === 'published' ? 'منشور' : tpl.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/templates/${tpl.slug}`}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                          title="معاينة في المتجر"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(tpl)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="تعديل القالب"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(tpl.id, tpl.title_ar)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="حذف القالب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-slate-800 shadow-xl border border-slate-200 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingTemplate ? 'تعديل بيانات القالب' : 'إضافة قالب Excel جديد للمتجر'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  عنوان القالب باللغة العربية <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (!editingTemplate && !formSlug) {
                      setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }
                  }}
                  placeholder="مثال: نموذج مالي متكامل للتدفقات النقدية 2026"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    المعرف الرابطي (Slug) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="cash-flow-model-2026"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    القسم / الفئة <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none cursor-pointer"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_ar}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Free vs Paid & Price in EGP */}
              <div className="p-3 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl space-y-3">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pricing_type"
                      checked={formIsFree}
                      onChange={() => {
                        setFormIsFree(true);
                        setFormPrice('0');
                      }}
                      className="text-[#126B45]"
                    />
                    <span className="font-semibold text-slate-800">قالب مجاني للأعضاء</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pricing_type"
                      checked={!formIsFree}
                      onChange={() => setFormIsFree(false)}
                      className="text-[#126B45]"
                    />
                    <span className="font-semibold text-slate-800">قالب مدفوع (ترخيص تجاري)</span>
                  </label>
                </div>

                {!formIsFree && (
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      السعر بالجنيه المصري (EGP) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="299"
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2.5 outline-none text-slate-900 font-bold"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  الوصف القصير (المعروض على بطاقة المتجر) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="سطران يوضحان الفائدة الأساسية للقالب..."
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  الوصف التفصيلي والمحتويات <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formFullDesc}
                  onChange={(e) => setFormFullDesc(e.target.value)}
                  placeholder="المعادلات المتضمنة، الجداول المحورية، وطريقة الاستخدام..."
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">صيغة الملف</label>
                  <select
                    value={formExtension}
                    onChange={(e) => setFormExtension(e.target.value as any)}
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                  >
                    <option value="xlsx">XLSX (قياسي)</option>
                    <option value="xlsm">XLSM (ماكرو VBA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">رقم الإصدار</label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">حالة النشر</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                  >
                    <option value="published">منشور للجمهور</option>
                    <option value="draft">مسودة داخلية</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="text-[#126B45] rounded"
                  />
                  <span>تمييز القالب في الصفحة الرئيسية كـ (Featured)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {editingTemplate ? 'تحديث القالب' : 'حفظ ونشر القالب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
