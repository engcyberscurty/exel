import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, FileSpreadsheet, CheckCircle2, ArrowLeft } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#126B45]">من نحن</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          عن منصة Sheetora (شيتورا)
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-2xl mx-auto">
          منصة عربية متخصصة تأسست لتوفير أدوات تشغيلية ومحاسبية دقيقة وسهلة الاستخدام، مبنية على أسس هندسية ومحاسبية موثوقة.
        </p>
      </div>

      {/* Editorial Content */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#126B45]" />
            <span>رسالتنا والهدف من المنصة</span>
          </h2>
          <p>
            يعتمد قطاع الأعمال والشركات الصغيرة والمتوسطة في مصر والعالم العربي بشكل رئيسي على جداول بيانات Microsoft Excel لإدارة العمليات اليومية. لكن في كثير من الأحيان، تؤدي الملفات العشوائية أو غير المحدثة إلى أخطاء فادحة في حساب الأرباح، هدر المخزون، أو مخالفة قوانين الضرائب والتأمينات.
          </p>
          <p>
            انطلقت <strong>Sheetora</strong> لتكون المرجع الموثوق: قوالب إكسل مبرمجة بأعلى معايير الحرفية، مصممة باللغة العربية، ومدققة لتناسب بيئة العمل المحلية، دون أي تعقيد غير مبرر.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#126B45]" />
            <span>قيمنا ومبادئنا</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-1.5">
              <h3 className="font-bold text-slate-900 text-xs">الدقة والشفافية التامة</h3>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                لا نستخدم أرقاماً وهمية أو إحصائيات مصطنعة؛ كل معادلة وقالب يُفحص بعناية ليعكس الواقع الفعلي للمحاسبة.
              </p>
            </div>
            <div className="p-4 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB] space-y-1.5">
              <h3 className="font-bold text-slate-900 text-xs">احترام خصوصية العملاء</h3>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                ملفات عملائنا وبياناتهم المالية خط أحمر؛ نستخدم تخزيناً سحابياً مشفراً ونلتزم باتفاقيات السرية الرسمية (NDA).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#126B45]" />
            <span>ما الذي نقدمه؟</span>
          </h2>
          <ul className="space-y-2 list-none text-xs">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
              <span>متجر قوالب إكسل احترافية جاهزة (مجانية ومدفوعة بتسعير بالجنيه المصري).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
              <span>تطوير وتخصيص شيتات ونماذج مالية ودراسات جدوى للشركات.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
              <span>تنظيف قواعد البيانات وبناء لوحات معلومات Dashboards للمديرين.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0" />
              <span>تطوير أنظمة ومواقع إلكترونية سحابية متصلة بقواعد بيانات.</span>
            </li>
          </ul>
        </section>

        <div className="pt-6 border-t border-[#E5E7EB] text-center">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#126B45] hover:bg-[#0B3527] text-white font-semibold text-xs rounded-xl transition-colors"
          >
            <span>استكشف قوالب شيتورا الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
