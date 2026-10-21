import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, Key, CheckCircle2, History, Copy } from 'lucide-react';
import { isSupabaseConfigured, testSupabaseConnection } from '../../lib/supabase';
import { PaymentAdapter } from '../../lib/payments';

export const AdminSettings: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [supportEmail, setSupportEmail] = useState('support@sheetora.com');
  const [supportPhone, setSupportPhone] = useState('+201012345678');
  const [savedNotice, setSavedNotice] = useState(false);
  const [dbNotice, setDbNotice] = useState<string | null>(null);

  const mockAuditLogs = [
    {
      id: 'log-1',
      actor: 'admin@sheetora.com',
      action: 'تعديل أسعار ترخيص القوالب',
      entity: 'Template: tpl-egypt-payroll-2026',
      time: 'قبل 2 ساعة',
    },
    {
      id: 'log-2',
      actor: 'admin@sheetora.com',
      action: 'إصدار عرض سعر رقم Q-2026-089',
      entity: 'Quotation: SR-2026-1042',
      time: 'قبل 5 ساعات',
    },
    {
      id: 'log-3',
      actor: 'system',
      action: 'تسجيل تحميل مصرح به عبر Signed URL',
      entity: 'DownloadLog: tpl-cashflow-planner-free',
      time: 'أمس',
    },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const copyEnvSnippet = () => {
    const text = `VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key\nVITE_PAYMOB_API_KEY=your-paymob-api-key\nVITE_PAYMOB_INTEGRATION_ID=12345`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">إعدادات المنصة والأمان والتدقيق</h1>
        <p className="text-xs text-[#667085] mt-1">
          إدارة بيانات التواصل الرسمية، ربط بوابات الدفع، والاطلاع على سجلات التدقيق Audit Logs
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>تم حفظ الإعدادات العامة بنجاح.</span>
        </div>
      )}

      {/* Integration Statuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Supabase Status */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#126B45]" />
              <h3 className="font-bold text-sm text-slate-900">حالة قاعدة بيانات Supabase</h3>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {isSupabaseConfigured ? 'متصل بالسحابة' : 'وضع المعاينة المحلي'}
            </span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            تتضمن المنصة 21 جدولاً في ملفات SQL المجهزة (جداول المستخدمين، الصلاحيات، القوالب، التنزيلات المشفرة، الفواتير، الحملات الإعلانية).
          </p>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={async () => {
                const res = await testSupabaseConnection();
                setDbNotice(res.statusText + (res.latencyMs ? ` (${res.latencyMs}ms)` : ''));
              }}
              className="px-3 py-1.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              فحص الاتصال الحي الفعلي
            </button>
            {dbNotice && (
              <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                {dbNotice}
              </p>
            )}
          </div>
        </div>

        {/* Payment Gateway Status */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#126B45]" />
              <h3 className="font-bold text-sm text-slate-900">بوابة الدفع (Paymob EGP)</h3>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                PaymentAdapter.isConfigured()
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {PaymentAdapter.isConfigured() ? 'مفعلة' : 'بانتظار المفاتيح في .env'}
            </span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            المدفوعات محمية ولا تتم أية عمليات وهمية. عند عدم تزويد المفاتيح، يتم توجيه العملاء لاختيار التحويل البنكي أو الفاتورة المباشرة.
          </p>
        </div>
      </div>

      {/* Official Contacts Form */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
          بيانات التواصل الرسمية لـ Sheetora
        </h3>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">البريد الإلكتروني الرسمي للدعم</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">هاتف وواتساب خدمة العملاء</label>
            <input
              type="tel"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-mono"
              dir="ltr"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              حفظ الإعدادات
            </button>
          </div>
        </form>
      </div>

      {/* Audit Logs */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#126B45]" />
          <h3 className="font-bold text-sm text-slate-900">سجل تدقيق الأمان والعمليات (Audit Log)</h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {mockAuditLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900">{log.action}</span>
                <div className="text-[11px] text-[#667085] mt-0.5">
                  بواسطة: <span className="font-mono">{log.actor}</span> · {log.entity}
                </div>
              </div>
              <span className="text-[#667085] text-[11px] shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
