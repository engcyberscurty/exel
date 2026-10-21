import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, CheckCircle2, ArrowLeft, Globe, Laptop, Smartphone, Database } from 'lucide-react';

export const ServiceWebDevelopment: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <nav className="flex items-center gap-2 text-xs text-[#667085]">
        <Link to="/" className="hover:text-slate-900">الرئيسية</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-slate-900">الخدمات</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">تطوير المواقع والأنظمة الرقمية</span>
      </nav>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="w-14 h-14 rounded-xl bg-[#126B45]/10 flex items-center justify-center text-[#126B45]">
          <Code2 className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          تصميم وتطوير مواقع الشركات وبوابات الأعمال
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed max-w-3xl">
          نبني منصات رقمية حديثة، سريعة، ومتجاوبة تماماً مع شاشات الهواتف وأجهزة الكمبيوتر. نربط قواعد بيانات آمنة، بوابات دفع بالجنيه المصري، ولوحات تحكم مخصصة لإدارة العمليات بدون تعقيد.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#E5E7EB]">
          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#126B45]" />
              <span>مواقع الشركات التعريفية (Corporate Websites)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تصاميم راقية تعكس هوية علامتك التجارية، مهيأة لمحركات البحث SEO وسريعة التحميل لخدمة زوارك.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#126B45]" />
              <span>لوحات تحكم إدارية (Admin Dashboards)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              شاشات لإدارة طلبات العملاء، الفواتير، الصلاحيات، وتصدير التقارير إلى Excel بنقرة زر واحدة.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#126B45]" />
              <span>قواعد بيانات وتخزين سحابي آمن</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              هندسة قواعد بيانات PostgreSQL مع سياسات أمان مشددة ونسخ احتياطي دوري يضمن استمرارية أعمالك.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#126B45]" />
              <span>ربط بوابات الدفع الإلكتروني</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              دمج بوابات الدفع المعتمدة في مصر مثل Paymob وميزة والمحافظ الرقمية لاستقبال الأموال مباشرة.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#667085]">
            نطاق الأسعار يبدأ عادةً من <strong className="text-slate-900 font-bold">12,000 ج.م</strong> للمواقع المتكاملة.
          </div>
          <Link
            to="/request-service?type=web_development"
            className="w-full sm:w-auto px-6 py-3 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>طلب تنفيذ موقع أو نظام لشركتك</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
