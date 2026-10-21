import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_CATEGORIES, INITIAL_TEMPLATES } from '../data/seedData';
import { TemplateCard } from '../components/templates/TemplateCard';
import { FileSpreadsheet, ArrowRight, ArrowLeft } from 'lucide-react';

export const CategoryTemplates: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = INITIAL_CATEGORIES.find((c) => c.slug === slug);
  const templates = INITIAL_TEMPLATES.filter((t) => category && t.category_id === category.id);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">القسم غير موجود</h2>
        <p className="text-xs text-[#667085]">يرجى اختيار قسم من الأقسام المعتمدة.</p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] text-white rounded-lg text-xs font-semibold"
        >
          <span>تصفح جميع القوالب</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#667085]">
        <Link to="/" className="hover:text-slate-900">الرئيسية</Link>
        <span>/</span>
        <Link to="/templates" className="hover:text-slate-900">ملفات Excel</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{category.name_ar}</span>
      </nav>

      {/* Category Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#126B45] mb-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>تصنيف القوالب</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {category.name_ar}
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-2 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="text-left shrink-0">
          <span className="text-2xl font-black text-slate-900">{templates.length}</span>
          <span className="text-xs text-[#667085] block font-medium">قوالب متوفرة بالقسم</span>
        </div>
      </div>

      {/* Templates Grid */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center space-y-4">
          <p className="text-sm font-semibold text-slate-700">لا توجد قوالب منشورة حالياً في هذا القسم.</p>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] text-white rounded-lg text-xs font-semibold"
          >
            <span>استعراض باقي الأقسام</span>
          </Link>
        </div>
      )}
    </div>
  );
};
