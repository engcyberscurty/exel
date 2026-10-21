import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileSpreadsheet, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  q: string;
  a: string;
  category: 'templates' | 'services' | 'payment' | 'licensing';
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      category: 'templates',
      q: 'كيف يمكنني تنزيل القوالب المجانية من منصة Sheetora؟',
      a: 'التحميل المجاني متاح فورياً لجميع المسجلين. قم بإنشاء حساب مجاني أو تسجيل الدخول، ثم انقر على "تحميل مجاني" في أي قالب غير مدفوع، وسيتم إنشاء رابط التنزيل الآمن وحفظ الملف تلقائياً في حسابك.',
    },
    {
      category: 'templates',
      q: 'هل تعمل قوالب Excel على تطبيق Google Sheets وبرامج Mac؟',
      a: 'نعم، معظم قوالبنا بصيغة XLSX القياسية المتوافقة 100% مع Microsoft Excel (إصدارات 2016 وحتى 365) وأيضاً Google Sheets و Numbers على ماك. الملفات التي تحتوي على ماكرو VBA خاص يُشار إليها بوضوح في صفحة القالب.',
    },
    {
      category: 'templates',
      q: 'هل تتوفر تحديثات للقوالب في حال تعديل القوانين الضريبية أو التأمينية؟',
      a: 'نعم، عندما تصدر تعديلات تشريعية في مصر (مثل تعديل الحد الأدنى للأجور أو شرائح ضريبة الدخل)، يقوم فريقنا بتحديث القوالب، ويحصل كل من اشترى القالب على إشعار وتحديث مجاني لنفس الإصدار في لوحة حسابه.',
    },
    {
      category: 'payment',
      q: 'ما هي طرق الدفع المتاحة داخل جمهورية مصر العربية؟',
      a: 'المعاملات مسعرة بالجنيه المصري (EGP). ندعم بطاقات فيزا وماستركارد، بطاقة ميزة الوطنية، والمحافظ الإلكترونية (فودافون كاش، أورنج، اتصالات، وي كاش) عبر بوابات دفع معتمدة، بالإضافة إلى التحويل البنكي المباشر للشركات.',
    },
    {
      category: 'services',
      q: 'كيف يعمل نظام طلب خدمة مخصصة (Custom Project)؟',
      a: 'تبدأ بملء استمارة طلب الخدمة مع توضيح الهدف والميزانية التقديرية. يقوم مهندسونا بدراسة الطلب وإرسال عرض سعر رسمي (Quotation) يتضمن نطاق العمل وموعد التسليم. لا يُلزمك الطلب بأي دفع قبل موافقتك الصريحة على العرض.',
    },
    {
      category: 'services',
      q: 'كيف تضمنون سرية بيانات شركتنا وسجلات المبيعات؟',
      a: 'نحن نوقع اتفاقية عدم إفصاح رسمية (Non-Disclosure Agreement - NDA) مع الشركات قبل استلام أي بيانات حساسة. جميع الملفات المرفوعة تُخزن في مستودعات سحابية مشفرة ولا يطلع عليها سوى المهندس المسؤول عن المشروع.',
    },
    {
      category: 'licensing',
      q: 'هل يمكنني استخدام القالب لعدة فروع وشركات تابعة لي؟',
      a: 'الترخيص التجاري الفردي يسمح لك باستخدام القالب لجميع أعمالك الخاصة وفروع شركتك دون قيود. لا يُسمح بإعادة بيع القالب كمنتج رقمي أو توزيعه علناً على الإنترنت بدون ترخيص مسبق.',
    },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#126B45]">مركز المساعدة والمعلومات</span>
        <h1 className="text-3xl font-extrabold text-slate-900">الأسئلة الشائعة</h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          إجابات واضحة وشاملة على استفسارات مستخدمي شيتورا حول التراخيص والتحميل والخدمات المخصصة.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: 'جميع الأسئلة' },
          { id: 'templates', label: 'قوالب Excel والتحميل' },
          { id: 'payment', label: 'طرق الدفع والعملة' },
          { id: 'services', label: 'الخدمات المخصصة للشركات' },
          { id: 'licensing', label: 'التراخيص وحقوق الاستخدام' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id);
              setOpenIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === tab.id
                ? 'bg-[#126B45] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#E5E7EB] text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 divide-y divide-slate-100 shadow-xs">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-right flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-[#126B45] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#126B45]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help CTA */}
      <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-2xl p-6 text-center space-y-3">
        <h3 className="font-bold text-sm text-slate-900">هل لديك سؤال آخر لم تجد إجابته هنا؟</h3>
        <p className="text-xs text-[#667085]">
          فريق الدعم الفني جاهز للإجابة على استفساراتك ومساعدتك في اختيار القالب الأنسب.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <span>تواصل معنا الآن</span>
        </Link>
      </div>
    </div>
  );
};
