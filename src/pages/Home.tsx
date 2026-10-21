import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  BarChart3,
  Code2,
  ArrowLeft,
  CheckCircle2,
  Download,
  Building2,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Calculator,
  Boxes,
  Users,
  Calendar,
  PieChart,
  Target,
} from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_TEMPLATES } from '../data/seedData';
import { TemplateCard } from '../components/templates/TemplateCard';
import { AdBanner } from '../components/common/AdBanner';

export const Home: React.FC = () => {
  // Select featured templates
  const featuredTemplates = INITIAL_TEMPLATES.filter((t) => t.is_featured).slice(0, 4);

  // Category icons map
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'accounting-finance':
        return <Calculator className="w-5 h-5 text-[#126B45]" />;
      case 'sales-profit':
        return <TrendingUp className="w-5 h-5 text-[#126B45]" />;
      case 'inventory':
        return <Boxes className="w-5 h-5 text-[#126B45]" />;
      case 'hr-payroll':
        return <Users className="w-5 h-5 text-[#126B45]" />;
      case 'projects-tasks':
        return <Calendar className="w-5 h-5 text-[#126B45]" />;
      case 'dashboards-analytics':
        return <BarChart3 className="w-5 h-5 text-[#126B45]" />;
      case 'budgeting-expenses':
        return <PieChart className="w-5 h-5 text-[#126B45]" />;
      case 'crm-pipeline':
        return <Target className="w-5 h-5 text-[#126B45]" />;
      default:
        return <FileSpreadsheet className="w-5 h-5 text-[#126B45]" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* A & B. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-[#E5E7EB] pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#0B3527 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Value announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#126B45]/10 text-[#126B45] text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#126B45]" />
              <span>منصة الأعمال الأولى في مصر لقوالب وأنظمة الإكسل المعتمدة</span>
            </div>

            {/* Arabic Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3527] tracking-tight leading-tight sm:leading-tight">
              كل أدوات شغلك في مكان واحد
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl mx-auto font-normal">
              حمّل قوالب Excel جاهزة، اطلب تقارير تحليل بيانات احترافية، أو نفّذ مشروعك التقني مع <span className="font-semibold text-slate-800">Sheetora</span>.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/templates"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#126B45] hover:bg-[#0B3527] text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>استكشف ملفات Excel</span>
              </Link>
              <Link
                to="/request-service"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F8FAF7] text-slate-800 border border-[#E5E7EB] hover:border-slate-300 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>اطلب خدمة مخصصة</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Assurance line without fake badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#667085]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
                <span>معادلات دقيقة بالجنيه المصري</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
                <span>متوافق مع Excel و Google Sheets</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
                <span>تنزيل آمن ومباشر</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* C. Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">تصفح القوالب بحسب مجالك</h2>
            <p className="text-xs text-[#667085] mt-1">حلول محاسبية وتشغيلية مصممة لاحتياجات سوق العمل العربي</p>
          </div>
          <Link
            to="/templates"
            className="text-xs font-semibold text-[#126B45] hover:text-[#0B3527] flex items-center gap-1"
          >
            <span>عرض جميع التصنيفات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {INITIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="group bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#126B45] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F8FAF7] border border-[#E5E7EB] group-hover:bg-[#126B45]/10 flex items-center justify-center mb-3 transition-colors">
                {getCategoryIcon(cat.slug)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#126B45] transition-colors">
                  {cat.name_ar}
                </h3>
                <p className="text-[11px] text-[#667085] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sponsored Partner Banner Placement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner placement="homepage_banner" />
      </section>

      {/* D. Featured Templates Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#126B45] font-semibold mb-1">
              <span>نماذج مختارة</span>
              <span>·</span>
              <span>الأكثر طلباً للشركات والمصانع</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">أحدث قوالب Excel المعتمدة</h2>
          </div>
          <Link
            to="/templates"
            className="text-xs font-semibold text-[#126B45] hover:text-[#0B3527] flex items-center gap-1"
          >
            <span>جميع القوالب ({INITIAL_TEMPLATES.length})</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* E. Services Section */}
      <section className="bg-white border-y border-[#E5E7EB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#126B45]">خدمات تنفيذية للأعمال</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              حلول مخصصة تُبنى وفق احتياجات شركتك بدقة
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-2">
              إذا لم تجد قالباً يلائم نموذج عملك، يطوّر فريقنا الهندسي حلولاً متكاملة مع توثيق وضمان تشغيلي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-2xl p-7 flex flex-col justify-between hover:border-[#126B45]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5 text-[#126B45]">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  تحليل البيانات ولوحات المعلومات
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  تنظيف وتحليل بيانات المبيعات والمخازن، بناء داشبورد تفاعلي، واستخراج مؤشرات الأداء الحقيقية لمساعدة الإدارة في اتخاذ القرارات.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>تنظيف وهيكلة ملفات CSV و Excel الضخمة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>لوحات تحكم Power BI و Excel ديناميكية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>تقارير مالية وتشغيلية للإدارة العليا</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/services/data-analysis"
                className="w-full py-2.5 px-4 bg-white border border-[#E5E7EB] hover:border-[#126B45] text-slate-800 hover:text-[#126B45] text-xs font-semibold rounded-lg text-center transition-colors"
              >
                تفاصيل الخدمة &larr;
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-[#F8FAF7] border border-[#126B45]/30 rounded-2xl p-7 flex flex-col justify-between relative shadow-xs">
              <div className="absolute -top-3 right-6 bg-[#126B45] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                الأكثر طلباً
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5 text-[#126B45]">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  شيتات إكسل مخصصة ونماذج مالية
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  برمجة نماذج مالية معقدة، أنظمة رواتب مخصصة لشركتك، وإدارة المخزون متعدد الفروع مع معادلات آلية وأكواد ماكرو موثقة.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>دراسات جدوى ونماذج تدفقات نقدية DCF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>أتمتة العمليات اليومية وتوفير ساعات الإدخال</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>شيتات محمية بكلمات مرور وتدريب للموظفين</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/services/custom-excel"
                className="w-full py-2.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg text-center transition-colors"
              >
                اطلب شيت مخصص &larr;
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-2xl p-7 flex flex-col justify-between hover:border-[#126B45]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5 text-[#126B45]">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  تطوير المواقع والأنظمة السحابية
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  تصميم وتطوير مواقع احترافية للشركات، بوابات إدارة عملاء، ولوحات تحكم متصلة بقواعد بيانات PostgreSQL سريعة وآمنة.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>مواقع شركات عصرية متوافقة مع الهواتف</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>لوحات تحكم إدارية وبوابات موظفين/عملاء</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
                    <span>ربط بوابات الدفع الإلكتروني في مصر</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/services/web-development"
                className="w-full py-2.5 px-4 bg-white border border-[#E5E7EB] hover:border-[#126B45] text-slate-800 hover:text-[#126B45] text-xs font-semibold rounded-lg text-center transition-colors"
              >
                تفاصيل الخدمة &larr;
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/request-service"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3527] hover:bg-[#126B45] text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              <span>اطلب عرض سعر لمشروعك الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* F. Business Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B3527] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-emerald-300 rounded-full text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>حلول الشركات والمؤسسات</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              عندك شركة أو مشروع؟ خلّي بياناتك تشتغل لصالحك.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              تساعد Sheetora الشركات الناشئة والمتوسطة في مصر على استبدال الفوضى الورقية بأنظمة منظمة: تنظيف السجلات القديمة، تقارير أداء لحظية، أتمتة حسابات الضرائب والتأمينات، وتطوير مواقع ومنصات رقمية تزيد مبيعاتك.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/request-service"
                className="px-6 py-3 bg-[#126B45] hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl text-center transition-colors shadow-sm"
              >
                أرسل تفاصيل مشروعك
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl text-center transition-colors"
              >
                استعراض خدماتنا بالكامل
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* G. How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#126B45]">خطوات واضحة وسريعة</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">كيف تعمل منصة Sheetora؟</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#126B45]/10 text-[#126B45] font-bold text-sm flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">تصفح أو صف مشروعك</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              اختر القالب الجاهز المناسب لنشاطك، أو املأ استمارة طلب الخدمة المخصصة مع توضيح أهدافك وميزانيتك.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#126B45]/10 text-[#126B45] font-bold text-sm flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">عرض سعر أو تحميل مباشر</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              القوالب المجانية تُحمّل فوراً للأعضاء، والخدمات المخصصة يُرسل لها عرض سعر محدد وموثق خلال 24 ساعة.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#126B45]/10 text-[#126B45] font-bold text-sm flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">استلام آمن ومتابعة دورية</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              احصل على ملفاتك عبر روابط سحابية مشفرة في حسابك مع جلسات توجيهية وإمكانية طلب تعديلات محددة.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sneak Peek */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">أسئلة شائعة قبل البدء</h2>
              <p className="text-xs text-[#667085] mt-1">إجابات مباشرة على استفسارات مستخدمي شيتورا</p>
            </div>
            <Link to="/faq" className="text-xs text-[#126B45] font-semibold hover:underline">
              كل الأسئلة &larr;
            </Link>
          </div>

          <div className="space-y-4 divide-y divide-slate-100 text-xs">
            <div className="pt-3">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                هل القوالب المجانية تتطلب بطاقة بنكية؟
              </h4>
              <p className="text-slate-600 leading-relaxed">
                لا إطلاقاً. القوالب المجانية متاحة للتحميل الفوري بمجرد إنشاء حساب وتسجيل الدخول بالبريد الإلكتروني.
              </p>
            </div>
            <div className="pt-4">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                هل قوالب الرواتب متوافقة مع قوانين الضرائب والتأمينات في مصر؟
              </h4>
              <p className="text-slate-600 leading-relaxed">
                نعم، تم تدقيق معادلات ضريبة الدخل والحدود التأمينية للأجور وفقاً للقوانين المصرية السارية، مع توضيح كيفية تعديل النسب مستقبلاً في حال صدور قوانين جديدة.
              </p>
            </div>
            <div className="pt-4">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                كيف يتم تسعير الخدمات المخصصة للشركات؟
              </h4>
              <p className="text-slate-600 leading-relaxed">
                يقوم مهندسو ومحللو البيانات لدينا بدراسة حجم ونوعية البيانات المطلوبة ثم تقديم عرض سعر رسمي بالجنيه المصري يتضمن نطاق العمل وموعد التسليم المحدد بدقة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
