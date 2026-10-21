import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
          <span>
            هذه وثيقة استرشادية للشروط والأحكام الخاصة بمنصة Sheetora تتطلب مراجعة واعتماد المالك والمستشار القانوني قبل التطبيق التجاري الكامل.
          </span>
        </div>

        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">الشروط والأحكام العامة (Terms & Conditions)</h1>
          <p className="text-xs text-[#667085] mt-1">آخر تحديث: أبريل 2026 | جمهورية مصر العربية</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. شروط استخدام التراخيص الرقمية</h2>
          <p>
            تمنح منصة Sheetora للمشتري ترخيصاً تجارياً غير حصري لاستخدام القوالب المحملة لأغراض أعماله الخاصة أو لشركته. يُحظر تماماً إعادة بيع، تأجير، أو نشر ملفات القوالب الأصلية علناً على مواقع أخرى أو في مجموعات تجارية مفتوحة.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. سياسة الاسترجاع والمنتجات الرقمية</h2>
          <p>
            نظراً لطبيعة المنتجات الرقمية (ملفات Excel قابلة للتنزيل الفوري والنسخ)، فإن المبيعات المكتملة تعتبر نهائية بمجرد إصدار رابط التحميل المصرح به، ما لم يكن الملف به خلل تقني جوهري يتعذر على فريق الدعم إصلاحه.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. عروض أسعار الخدمات المخصصة (Quotations)</h2>
          <p>
            عروض الأسعار الصادرة للمشاريع المخصصة (تحليل البيانات، شيتات إكسل مخصصة، تطوير المواقع) تكون صالحة لمدة 14 يوماً من تاريخ صدورها ما لم يُنص على خلاف ذلك في نص العرض، ولا يُعتبر المشروع قيد التنفيذ الفعلي إلا بعد سداد الدفعة المتفق عليها.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. إخلاء المسؤولية القانونية والمحاسبية</h2>
          <p>
            صُممت قوالب المنصة بأعلى درجات الدقة المحاسبية لتسهيل الأعمال؛ ومع ذلك، تقع على عاتق المستخدم ومحاسب المنشأة القانوني مسؤولية مراجعة الأرقام النهائية ومطابقتها مع القوانين واللوائح التنظيمية الخاصة بنشاطه التجاري.
          </p>
        </section>
      </div>
    </div>
  );
};
