import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, ArrowLeft, Database, PieChart, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export const ServiceDataAnalysis: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <nav className="flex items-center gap-2 text-xs text-[#667085]">
        <Link to="/" className="hover:text-slate-900">الرئيسية</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-slate-900">الخدمات</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">تحليل البيانات والتقارير</span>
      </nav>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="w-14 h-14 rounded-xl bg-[#126B45]/10 flex items-center justify-center text-[#126B45]">
          <BarChart3 className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          خدمات تحليل بيانات الأعمال والتقارير التنفيذية
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed max-w-3xl">
          نساعد المؤسسات والشركات على استثمار بياناتها المتراكمة وتحويل جداول الإكسل والـ CSV المعقدة إلى لوحات معلومات تفاعلية ومرئيات تسلط الضوء على الفرص وتقلل الهدر المالي.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#E5E7EB]">
          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#126B45]" />
              <span>تنظيف وهيكلة البيانات (Data Cleaning)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              معالجة الأخطاء والتكرار وتوحيد التنسيقات في ملفات الفواتير والمخازن والعملاء الممتدة لعدة سنوات.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#126B45]" />
              <span>لوحات تحكم تفاعلية (KPI Dashboards)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تصميم شاشات قيادة ومؤشرات حية تدعم الفلاتر الزمنية ومقارنة الأداء الفعلي بالمستهدف التشغيلي.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#126B45]" />
              <span>تقارير كفاءة المبيعات والربحية</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تحليل هوامش الربح لكل خط إنتاج ومندوب مبيعات، وتحديد الأصناف الأكثر إسهاماً في التدفق النقدي.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#126B45]" />
              <span>أمان وسرية البيانات (NDA)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              نلتزم باتفاقيات سرية المعلومات الرسمية لحماية أسرار وقوائم عملاء شركتك دون أي تسريب.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#667085]">
            نطاق الأسعار يبدأ عادةً من <strong className="text-slate-900 font-bold">4,000 ج.م</strong> بحسب حجم البيانات.
          </div>
          <Link
            to="/request-service?type=data_analysis"
            className="w-full sm:w-auto px-6 py-3 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>طلب عرض سعر لمشروع تحليل بيانات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
