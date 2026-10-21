import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        {/* Notice of Template */}
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
          <span>
            هذه وثيقة تنظيمية استرشادية لسياسة الخصوصية تخضع لمراجعة المستشار القانوني لمالك المنصة وفقاً لقوانين حماية البيانات المصرية.
          </span>
        </div>

        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">سياسة الخصوصية وسرية البيانات</h1>
          <p className="text-xs text-[#667085] mt-1">آخر تحديث: أبريل 2026 | منصة Sheetora (شيتورا)</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. البيانات التي نجمعها</h2>
          <p>
            تجمع منصة Sheetora البيانات الضرورية فقط لتقديم الخدمات، وتشمل:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>معلومات الحساب: الاسم، عنوان البريد الإلكتروني، رقم الهاتف، واسم المنشأة.</li>
            <li>بيانات العمليات والطلبات: سجل التنزيلات للقوالب، وفواتير المشتريات، واستمارات الخدمات المخصصة.</li>
            <li>بيانات التصفح التقنية: عنوان الـ IP المشفر، نوع المتصفح، وسجلات تفاعل الإعلانات لمنع الاحتيال والزيارات الوهمية.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. ملفات وبيانات المشاريع المخصصة</h2>
          <p>
            الملفات وجداول البيانات التي يرفعها العميل بغرض تحليل البيانات أو برمجة شيتات مخصصة تُعامل بأعلى درجات السرية، ولا يتم مشاركتها مطلقاً مع أي طرف ثالث، وتُحفظ في مساحات تخزين سحابية مشفرة.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. أمان المعاملات المالية</h2>
          <p>
            لا تقوم منصة Sheetora بتخزين أرقام البطاقات الائتمانية أو الحسابات البنكية على خوادمها. تتم معالجة جميع المعاملات عبر بوابات دفع إلكترونية معتمدة ومرخصة من البنك المركزي المصري تخضع لمعايير الأمان PCI-DSS.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. حقوق المستخدم</h2>
          <p>
            يحق لكل مستخدم مسجل طلب الاطلاع على بياناته الشخصية، أو تصحيحها، أو طلب حذف حسابه وسجلاته في أي وقت عبر التواصل مع الدعم الفني: <code className="text-[#126B45]">privacy@sheetora.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
};
