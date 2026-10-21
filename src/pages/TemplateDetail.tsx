import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Eye,
  FileCheck,
  Lock,
  Share2,
} from 'lucide-react';
import { INITIAL_TEMPLATES, INITIAL_CATEGORIES } from '../data/seedData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { authorizeAndDownloadTemplate } from '../lib/storage';
import { TemplateCard } from '../components/templates/TemplateCard';

export const TemplateDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, orders, recordDownload } = useAuth();
  const { addToCart, isInCart } = useCart();

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<{ message: string; error?: boolean } | null>(null);

  const template = INITIAL_TEMPLATES.find((t) => t.slug === slug);

  if (!template) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">القالب غير موجود</h2>
        <p className="text-xs text-[#667085]">قد يكون تم نقله أو تعديل الرابط الخاص به.</p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] text-white rounded-lg text-xs font-semibold"
        >
          <span>العودة لمتجر القوالب</span>
        </Link>
      </div>
    );
  }

  const isFree = template.is_free || template.price_egp === 0;
  const isPurchased = orders.some(
    (order) =>
      order.status === 'paid' &&
      order.items?.some((item) => item.template_id === template.id)
  );

  const category = INITIAL_CATEGORIES.find((c) => c.id === template.category_id);
  const relatedTemplates = INITIAL_TEMPLATES.filter(
    (t) => t.category_id === template.category_id && t.id !== template.id
  ).slice(0, 3);

  const handleDownload = async () => {
    if (!user) {
      setDownloadNotice({
        message: 'يجب تسجيل الدخول أولاً لتنزيل هذا القالب مباشرة.',
        error: true,
      });
      return;
    }

    setIsDownloading(true);
    setDownloadNotice(null);

    const result = await authorizeAndDownloadTemplate(template, user, orders);
    setIsDownloading(false);

    if (result.success && result.downloadUrl) {
      recordDownload({
        id: `dl-${Date.now()}`,
        user_id: user.id,
        template_id: template.id,
        downloaded_at: new Date().toISOString(),
        template,
      });

      const a = document.createElement('a');
      a.href = result.downloadUrl;
      a.download = result.filename || `${template.slug}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadNotice({
        message: 'تم تفويض التنزيل الآمن وبدء تحميل الملف إلى جهازك.',
        error: false,
      });
    } else {
      setDownloadNotice({
        message: result.error || 'تعذر إتمام التحميل.',
        error: true,
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(template);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#667085]">
        <Link to="/" className="hover:text-slate-900">الرئيسية</Link>
        <span>/</span>
        <Link to="/templates" className="hover:text-slate-900">ملفات Excel</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/categories/${category.slug}`} className="hover:text-slate-900">
              {category.name_ar}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-900 font-medium truncate max-w-xs">{template.title_ar}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Visual Previews & Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <div className="aspect-[16/10] bg-slate-100 relative">
              <img
                src={template.preview_image_path}
                alt={template.title_ar}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>ملف {template.file_extension.toUpperCase()}</span>
              </div>
            </div>
            <div className="p-4 bg-[#F8FAF7] border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#667085]">
              <span>معاينة حقيقية للمخطط والواجهة التنفيذية</span>
              <span className="font-medium text-slate-700">
                حجم الملف: {(template.file_size_bytes / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">وصف ومحتويات القالب</h2>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
              {template.description}
            </div>

            {template.features && template.features.length > 0 && (
              <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
                <h3 className="font-bold text-sm text-slate-900">المزايا التقنية والتنفيذية</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {template.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#126B45] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
            {/* Metadata (Zero pill discipline) */}
            <div className="flex items-center gap-2 text-xs text-[#667085] font-medium">
              <span>{category?.name_ar || 'أعمال وإدارة'}</span>
              <span>·</span>
              <span>الإصدار {template.version}</span>
              <span>·</span>
              <span>تحديث 2026</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {template.title_ar}
            </h1>

            <p className="text-xs text-[#667085] leading-relaxed">
              {template.short_description}
            </p>

            {/* Price Box */}
            <div className="p-4 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#667085] block font-medium">قيمة الترخيص</span>
                {isFree ? (
                  <span className="text-2xl font-black text-[#126B45]">تحميل مجاني</span>
                ) : (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900">{template.price_egp}</span>
                    <span className="text-sm font-bold text-[#126B45]">جنيه مصري (EGP)</span>
                  </div>
                )}
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block">ترخيص استثماري</span>
                <span className="text-xs font-semibold text-slate-700">استخدام تجاري غير محدود</span>
              </div>
            </div>

            {/* Notice Messages */}
            {downloadNotice && (
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  downloadNotice.error
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {downloadNotice.message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {isFree || isPurchased ? (
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-3.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isDownloading
                      ? 'جاري التحقق والتحضير...'
                      : isPurchased
                      ? 'تحميل نسختك المرخصة'
                      : 'تحميل القالب مجاناً'}
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>شراء الترخيص وتحميل فوري ({template.price_egp} ج.م)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(template)}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-[#E5E7EB] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isInCart(template.id) ? 'موجود في السلة' : 'إضافة إلى السلة'}</span>
                  </button>
                </>
              )}
            </div>

            {/* Specifications and Compatibility List */}
            <div className="border-t border-[#E5E7EB] pt-5 space-y-2.5 text-xs text-[#667085]">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>التوافقية البرمجية</span>
                <span className="font-medium text-slate-800">{template.compatibility || 'Excel 2016+ / Google Sheets'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>صيغة الملف</span>
                <span className="font-semibold text-[#126B45] uppercase">.{template.file_extension}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>طريقة التسليم</span>
                <span className="font-medium text-slate-800">تنزيل رقمي فوري</span>
              </div>
              <div className="flex justify-between py-1">
                <span>الحماية والأمان</span>
                <span className="font-medium text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#126B45]" />
                  خالٍ من الفيروسات والروابط الضارة
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <section className="pt-10 border-t border-[#E5E7EB] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900">قوالب مشابهة في نفس القسم</h3>
            <Link to={`/categories/${category?.slug}`} className="text-xs text-[#126B45] font-semibold hover:underline">
              استعراض المزيد &larr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTemplates.map((rel) => (
              <TemplateCard key={rel.id} template={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
