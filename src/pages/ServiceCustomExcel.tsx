import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, CheckCircle2, ArrowLeft, Cpu, Sliders, FileText, Check } from 'lucide-react';

export const ServiceCustomExcel: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <nav className="flex items-center gap-2 text-xs text-[#667085]">
        <Link to="/" className="hover:text-slate-900">الرئيسية</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-slate-900">الخدمات</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">برمجة وتطوير شيتات إكسل مخصصة</span>
      </nav>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="w-14 h-14 rounded-xl bg-[#126B45]/10 flex items-center justify-center text-[#126B45]">
          <FileSpreadsheet className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          تطوير وبرمجة شيتات إكسل ونماذج مالية مخصصة
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed max-w-3xl">
          هل تحتاج إلى نموذج فريد يطابق الدورة المستندية لمنشأتك تماماً؟ يقوم مهندسونا ببناء ملفات إكسل متقدمة خالية من الأخطاء، مع أتمتة العمليات اليومية وتوفير مئات الساعات المهدرة على الإدخال اليدوي.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#E5E7EB]">
          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#126B45]" />
              <span>النماذج المالية ودراسات الجدوى</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              حساب التدفقات النقدية، فترات الاسترداد، العائد الداخلي IRR، وحساسية السيناريوهات لتقديمها للمستثمرين والبنوك.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#126B45]" />
              <span>أتمتة الماكرو و VBA الموثقة</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              أزرار تنفيذية لأرشفة البيانات، استخراج الفواتير وطباعتها بنقرة واحدة، وتصدير التقارير التلقائية بصيغة PDF.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#126B45]" />
              <span>أنظمة المخازن والرواتب المعقدة</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ضبط مسيرات الرواتب الضخمة وفقاً للقوانين المصرية مع حساب الإجازات والجزاءات وكروت الصنف للمخازن المتعددة.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-[#126B45]" />
              <span>تدريب وتوثيق كامل</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تسليم دليل مستخدم مرئي وجلسة فيديو تشرح لفريقك كيفية تشغيل الملف وإجراء التعديلات المستقبلية بسهولة.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#667085]">
            نطاق الأسعار يبدأ عادةً من <strong className="text-slate-900 font-bold">2,500 ج.م</strong> بحسب المتطلبات.
          </div>
          <Link
            to="/request-service?type=custom_excel"
            className="w-full sm:w-auto px-6 py-3 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>طلب نموذج إكسل مخصص لشركتك</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
