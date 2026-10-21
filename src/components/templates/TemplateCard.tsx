import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ShoppingBag, Check, FileSpreadsheet, Eye, Sparkles } from 'lucide-react';
import { Template } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { authorizeAndDownloadTemplate } from '../../lib/storage';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { user, orders, recordDownload } = useAuth();
  const { addToCart, isInCart } = useCart();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const isFree = template.is_free || template.price_egp === 0;
  const isPurchased = orders.some(
    (order) =>
      order.status === 'paid' &&
      order.items?.some((item) => item.template_id === template.id)
  );

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setDownloadMsg({ text: 'يرجى تسجيل الدخول أولاً للتحميل', error: true });
      setTimeout(() => setDownloadMsg(null), 3500);
      return;
    }

    setIsDownloading(true);
    setDownloadMsg(null);

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

      // Trigger browser download safely
      const a = document.createElement('a');
      a.href = result.downloadUrl;
      a.download = result.filename || `${template.slug}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadMsg({ text: 'بدأ تحميل الملف بنجاح!', error: false });
      setTimeout(() => setDownloadMsg(null), 4000);
    } else {
      setDownloadMsg({ text: result.error || 'تعذر تنزيل الملف', error: true });
      setTimeout(() => setDownloadMsg(null), 4000);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(template);
  };

  const alreadyInCart = isInCart(template.id);

  return (
    <div className="group bg-white rounded-xl border border-[#E5E7EB] hover:border-[#126B45]/50 transition-all duration-200 flex flex-col h-full overflow-hidden shadow-xs hover:shadow-md">
      {/* Visual Thumbnail */}
      <Link to={`/templates/${template.slug}`} className="relative aspect-[16/10] bg-slate-100 overflow-hidden block">
        <img
          src={template.preview_image_path}
          alt={template.title_ar}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Subtle Category & Format overlay */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>{template.file_extension.toUpperCase()}</span>
        </div>

        {template.is_featured && (
          <div className="absolute top-3 left-3 bg-[#126B45]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-200" />
            <span>مميز</span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Zero-pill discipline: unboxed text with separators) */}
          <div className="flex items-center gap-1.5 text-xs text-[#667085] mb-2 font-medium">
            <span>{template.category?.name_ar || 'أعمال وإدارة'}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>إصدار {template.version}</span>
            {template.compatibility && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="truncate max-w-[120px]">{template.compatibility.split(',')[0]}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 group-hover:text-[#126B45] transition-colors leading-snug mb-2 line-clamp-2">
            <Link to={`/templates/${template.slug}`}>
              {template.title_ar}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#667085] leading-relaxed line-clamp-2 mb-4">
            {template.short_description}
          </p>
        </div>

        {/* Pricing and Actions */}
        <div className="pt-3 border-t border-[#E5E7EB]">
          {/* Notification feedback message if triggered */}
          {downloadMsg && (
            <div
              className={`mb-2.5 text-xs p-2 rounded-md transition-all ${
                downloadMsg.error
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {downloadMsg.text}
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            {/* Price display */}
            <div>
              {isFree ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-[#126B45]">مجاني</span>
                  <span className="text-[11px] text-[#667085]">للأعضاء</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-slate-900">{template.price_egp}</span>
                  <span className="text-xs font-semibold text-[#126B45]">ج.م</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-1.5">
              <Link
                to={`/templates/${template.slug}`}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="عرض التفاصيل"
              >
                <Eye className="w-4 h-4" />
              </Link>

              {isFree || isPurchased ? (
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloading ? 'جاري التحضير...' : isPurchased ? 'تحميل نسختك' : 'تحميل مجاني'}</span>
                </button>
              ) : alreadyInCart ? (
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-200 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>في السلة</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B3527] hover:bg-[#126B45] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>شراء الآن</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
