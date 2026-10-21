import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, FileSpreadsheet, BarChart3, Code2, ArrowLeft, HelpCircle } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#126B45]">الشفافية والتسعير العادل</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          باقات الأسعار ونماذج التعاقد
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          جميع الأسعار واضحة ومحددة بالجنيه المصري (EGP) بدون رسوم خفية. اختر بين الشراء الفردي للقوالب أو باقات الخدمات المخصصة لشركتك.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Free Members */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">قوالب الأعضاء المجانية</h3>
              <span className="text-xs font-semibold text-[#126B45] bg-[#126B45]/10 px-2.5 py-1 rounded-md">
                دخول فوري
              </span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900">0</span>
              <span className="text-xs font-bold text-[#667085] mr-1">جنيه مصري</span>
              <p className="text-[11px] text-[#667085] mt-1">متاح دائماً بمجرد إنشاء حسابك</p>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>تنزيل جميع القوالب المجانية المعتمدة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>صيغ XLSX قياسية متوافقة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>أدلة إرشادية مرفقة داخل الشيت</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>سجل تنزيلات منظم في لوحة حسابك</span>
              </li>
            </ul>
          </div>
          <Link
            to="/templates"
            className="w-full py-2.5 px-4 bg-white border border-[#E5E7EB] hover:border-[#126B45] text-slate-800 text-xs font-semibold rounded-lg text-center block transition-colors"
          >
            تصفح القوالب المجانية
          </Link>
        </div>

        {/* Tier 2: Pro Templates */}
        <div className="bg-white border-2 border-[#126B45] rounded-2xl p-7 flex flex-col justify-between shadow-md relative">
          <div className="absolute -top-3.5 right-6 bg-[#126B45] text-white text-[10px] font-bold px-3 py-1 rounded-full">
            شراء مباشر للقوالب الاحترافية
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">تراخيص القوالب الاحترافية</h3>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900">199 - 499</span>
              <span className="text-xs font-bold text-[#126B45] mr-1">ج.م / للقالب</span>
              <p className="text-[11px] text-[#667085] mt-1">دفعة لمرة واحدة وترخيص تجاري دائم</p>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>نماذج الرواتب المصرية والتأمينات المتكاملة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>أنظمة كروت الصنف وجرد المستودعات الكبرى</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>لوحات قيادة تنفيذية KPI Dashboards تفاعلية</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>تحديثات مجانية مستمرة لنفس الإصدار</span>
              </li>
            </ul>
          </div>
          <Link
            to="/templates"
            className="w-full py-2.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg text-center block transition-colors"
          >
            استكشف متجر القوالب المدفوعة
          </Link>
        </div>

        {/* Tier 3: Custom Business Development */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">المشاريع المخصصة للشركات</h3>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                عرض سعر مخصص
              </span>
            </div>
            <div className="mb-6">
              <span className="text-2xl font-bold text-slate-900">بحسب نطاق العمل</span>
              <p className="text-[11px] text-[#667085] mt-1">دراسة دقيقة وعرض سعر رسمي موثق</p>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>تنظيف ومعالجة قواعد البيانات الضخمة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>برمجة نماذج مالية ودراسات جدوى استثمارية</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>تصميم وبرمجة مواقع وأنظمة ويب متكاملة</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
                <span>اتفاقية عدم إفصاح رسمية (NDA) معتمدة</span>
              </li>
            </ul>
          </div>
          <Link
            to="/request-service"
            className="w-full py-2.5 px-4 bg-[#0B3527] hover:bg-[#126B45] text-white text-xs font-semibold rounded-lg text-center block transition-colors"
          >
            طلب دراسة مشروع وعرض سعر
          </Link>
        </div>
      </div>
    </div>
  );
};
