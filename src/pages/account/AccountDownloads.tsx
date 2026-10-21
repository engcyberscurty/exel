import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileSpreadsheet, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_TEMPLATES } from '../../data/seedData';
import { authorizeAndDownloadTemplate } from '../../lib/storage';

export const AccountDownloads: React.FC = () => {
  const { user, orders, downloadLogs, recordDownload } = useAuth();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ id: string; text: string; error?: boolean } | null>(null);

  // Collect templates user is authorized for:
  // 1. Templates in paid orders
  const paidTemplateIds = new Set<string>();
  orders
    .filter((o) => o.status === 'paid')
    .forEach((o) => o.items?.forEach((item) => paidTemplateIds.add(item.template_id)));

  // 2. Templates in download logs
  downloadLogs.forEach((dl) => paidTemplateIds.add(dl.template_id));

  const authorizedTemplates = INITIAL_TEMPLATES.filter(
    (t) => t.is_free || paidTemplateIds.has(t.id)
  );

  const handleDownload = async (templateId: string) => {
    const template = INITIAL_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    setDownloadingId(templateId);
    setNotice(null);

    const res = await authorizeAndDownloadTemplate(template, user, orders);
    setDownloadingId(null);

    if (res.success && res.downloadUrl) {
      recordDownload({
        id: `dl-${Date.now()}`,
        user_id: user?.id || 'anonymous',
        template_id: template.id,
        downloaded_at: new Date().toISOString(),
        template,
      });

      const a = document.createElement('a');
      a.href = res.downloadUrl;
      a.download = res.filename || `${template.slug}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setNotice({ id: templateId, text: 'تم بدء التنزيل بنجاح!', error: false });
    } else {
      setNotice({ id: templateId, text: res.error || 'فشل التحميل', error: true });
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-slate-900">سجل التنزيلات والتراخيص المرخصة</h1>
        <p className="text-xs text-[#667085] mt-1">
          الملفات المسموح لك بتنزيلها مباشرة عبر روابط آمنة مشفرة
        </p>
      </div>

      {authorizedTemplates.length > 0 ? (
        <div className="space-y-3">
          {authorizedTemplates.map((tpl) => {
            const isPaid = !tpl.is_free && tpl.price_egp > 0;
            return (
              <div
                key={tpl.id}
                className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#126B45]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#126B45] flex items-center justify-center shrink-0 border border-emerald-100">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      <Link to={`/templates/${tpl.slug}`} className="hover:text-[#126B45]">
                        {tpl.title_ar}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#667085] mt-1 font-medium">
                      <span>الإصدار {tpl.version}</span>
                      <span>·</span>
                      <span className="uppercase text-[#126B45] font-semibold">{tpl.file_extension}</span>
                      <span>·</span>
                      <span>{isPaid ? 'ترخيص تجاري مدفوع' : 'قالب مجاني معتمد'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center">
                  {notice?.id === tpl.id && (
                    <span
                      className={`text-xs ${
                        notice.error ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      {notice.text}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDownload(tpl.id)}
                    disabled={downloadingId === tpl.id}
                    className="px-4 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingId === tpl.id ? 'جاري التحضير...' : 'تنزيل الملف'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">لا توجد تنزيلات سابقة في حسابك</h3>
          <p className="text-xs text-[#667085] max-w-sm mx-auto">
            يمكنك استكشاف قوالب Excel المجانية وتحميلها فوراً بنقرة واحدة.
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] text-white text-xs font-semibold rounded-lg"
          >
            <span>استعراض القوالب</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
