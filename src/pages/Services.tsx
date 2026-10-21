import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  FileSpreadsheet,
  Code2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  HelpCircle,
} from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#126B45]">خدمات الشركات والمؤسسات</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          خدمات برمجية وتحليلية مخصصة لنمو أعمالك
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          نقدّم حلولاً متقدمة تتجاوز القوالب الجاهزة. ننفّذ مشاريع تحليل البيانات، أتمتة الإكسل المعقد، وتطوير الأنظمة السحابية للشركات في مصر والشرق الأوسط.
        </p>
      </div>

      {/* The 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col justify-between hover:border-[#126B45]/40 transition-all shadow-xs">
          <div>
            <div className="w-14 h-14 rounded-xl bg-[#126B45]/10 flex items-center justify-center text-[#126B45] mb-6">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              تحليل البيانات والتقارير الذكية
            </h2>
            <p className="text-xs text-[#667085] leading-relaxed mb-6">
              تنظيف البيانات الضخمة واستخراج مؤشرات الأداء الأساسية (KPIs) وبناء لوحات معلومات تفاعلية تمكّن الإدارة من رصد الأرباح ونقاط الهدر لحظة بلحظة.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>تنظيف ومعالجة ملفات المبيعات والمخزون</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>لوحات Power BI و Excel Dashboard تفاعلية</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>تقارير مالية وتنبؤات تدفقات نقدية</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <Link
              to="/services/data-analysis"
              className="w-full py-2.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg text-center block transition-colors"
            >
              استكشف خدمات تحليل البيانات
            </Link>
          </div>
        </div>

        {/* Service 2 */}
        <div className="bg-white border-2 border-[#126B45] rounded-2xl p-8 flex flex-col justify-between shadow-xs relative">
          <div className="absolute -top-3 right-6 bg-[#126B45] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
            تخصص Sheetora الأبرز
          </div>
          <div>
            <div className="w-14 h-14 rounded-xl bg-[#126B45]/10 flex items-center justify-center text-[#126B45] mb-6">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              شيتات إكسل مخصصة ونماذج أعمال
            </h2>
            <p className="text-xs text-[#667085] leading-relaxed mb-6">
              تصميم وبناء ملفات متخصصة لطبيعة نشاطك: إدارة المستودعات متعددة الفروع، مسيرات الرواتب الضخمة، ونماذج الجدوى الاقتصادية للتمويل والاستثمار.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>صياغة معادلات ديناميكية بدون أخطاء</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>أتمتة المهام اليدوية وتوفير الوقت بنسبة 70%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>حماية الخلايا وتوثيق كامل لطريقة الاستخدام</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <Link
              to="/services/custom-excel"
              className="w-full py-2.5 px-4 bg-[#0B3527] hover:bg-[#126B45] text-white text-xs font-semibold rounded-lg text-center block transition-colors"
            >
              استكشف خدمات برمجة الإكسل
            </Link>
          </div>
        </div>

        {/* Service 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col justify-between hover:border-[#126B45]/40 transition-all shadow-xs">
          <div>
            <div className="w-14 h-14 rounded-xl bg-[#126B45]/10 flex items-center justify-center text-[#126B45] mb-6">
              <Code2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              تطوير المواقع والأنظمة الرقمية
            </h2>
            <p className="text-xs text-[#667085] leading-relaxed mb-6">
              تحويل أفكارك ونماذج عملك إلى مواقع إلكترونية عصرية، لوحات تحكم للعملاء والموظفين، وأنظمة متصلة بقواعد بيانات سريعة مع ربط الدفع الإلكتروني.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>مواقع شركات متجاوبة وفائقة السرعة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>لوحات تحكم برمجية مبنية بـ React و TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>ربط بوابات الدفع المصرية (Paymob / ميزة)</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <Link
              to="/services/web-development"
              className="w-full py-2.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg text-center block transition-colors"
            >
              استكشف خدمات تطوير المواقع
            </Link>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-2xl p-8 sm:p-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
          كيف نسير معك من الفكرة وحتى الاستلام الفعلي؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-700">
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#126B45] text-sm block">1. تقديم الطلب</span>
            <p className="text-slate-600 leading-relaxed">
              توضيح أهداف المشروع والميزانية المتوقعة مع إمكانية إرفاق ملفات بيانات أولية بأمان تام.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#126B45] text-sm block">2. دراسة نطاق العمل</span>
            <p className="text-slate-600 leading-relaxed">
              يقوم خبير متخصص بمراجعة المتطلبات وإرسال عرض سعر رسمي (Quotation) بالجنيه المصري يتضمن خطة التسليم.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#126B45] text-sm block">3. التنفيذ المنهجي</span>
            <p className="text-slate-600 leading-relaxed">
              بناء الملفات أو البرمجيات مع مشاركة نماذج أولية وتطبيق تدقيق صارم لضمان دقة العمليات الحسابية.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#126B45] text-sm block">4. التسليم والتدريب</span>
            <p className="text-slate-600 leading-relaxed">
              تسليم النسخ النهائية المشفرة مع دليل إرشادي وإتاحة جلسة استفسارات وتعديلات مجانية.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/request-service"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <span>ابدأ الآن وأرسل متطلبات مشروعك</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
