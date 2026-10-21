import React, { useState } from 'react';
import {
  Database,
  ShieldCheck,
  UserCheck,
  Key,
  CheckCircle,
  ExternalLink,
  X,
  RefreshCw,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { isSupabaseConfigured, testSupabaseConnection, SupabaseHealthCheckResult } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const ConfigBanner: React.FC = () => {
  const { user, switchMockRole, isAdmin } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Live health-check state
  const [isTesting, setIsTesting] = useState(false);
  const [healthResult, setHealthResult] = useState<SupabaseHealthCheckResult | null>(null);

  const handleRunHealthCheck = async () => {
    setIsTesting(true);
    try {
      const result = await testSupabaseConnection();
      setHealthResult(result);
    } catch (err: unknown) {
      setHealthResult({
        isConfigured: isSupabaseConfigured,
        isConnected: false,
        statusText: 'حدث خطأ أثناء فحص الاتصال.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (isDismissed) return null;

  return (
    <>
      <div className="bg-[#0B3527] text-white text-xs px-4 py-2 border-b border-emerald-900/60 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                } opacity-75`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              ></span>
            </span>
            <span className="font-medium">
              {isSupabaseConfigured
                ? 'متصل بمشروع Supabase'
                : 'وضع المعاينة والتشغيل المحلي (جاهز للاختبار الفوري)'}
            </span>
            <span className="text-emerald-300 hidden sm:inline">·</span>
            <span className="text-slate-300 hidden sm:inline">
              الدور الحالي:{' '}
              <strong className="text-white font-semibold">
                {user
                  ? isAdmin
                    ? 'مدير المنصة (Admin)'
                    : user.role === 'contributor'
                    ? 'مطور محتوى (Contributor)'
                    : 'عميل (Customer)'
                  : 'زائر'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Role Switcher for seamless evaluation */}
            <div className="flex items-center bg-black/30 rounded-md p-0.5 border border-emerald-800/60">
              <span className="px-2 text-[11px] text-slate-300">تبديل الحساب:</span>
              {(['customer', 'admin', 'contributor'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchMockRole(r)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    user?.role === r
                      ? 'bg-[#126B45] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {r === 'admin' ? 'مدير' : r === 'customer' ? 'عميل' : 'مطور'}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowModal(true);
                handleRunHealthCheck();
              }}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-medium inline-flex items-center gap-1 transition-colors"
            >
              <Database className="w-3 h-3 text-emerald-400" />
              <span>فحص الاتصال وإعدادات Supabase</span>
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
              title="إخفاء الشريط"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Setup & Connection Diagnostics Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-slate-800 shadow-xl border border-slate-200 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-[#126B45]" />
                <h3 className="font-bold text-lg text-slate-900">
                  فحص اتصال قاعدة البيانات ومتغيرات البيئة
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
              {/* Live Connectivity Test Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8FAF7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#126B45]" />
                    <span>فحص الاتصال الحي الفعلي (Live Database Healthcheck):</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleRunHealthCheck}
                    disabled={isTesting}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'جاري الفحص...' : 'إعادة الفحص الآن'}</span>
                  </button>
                </div>

                {healthResult ? (
                  <div
                    className={`p-3 rounded-lg text-xs border ${
                      healthResult.isConnected
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {healthResult.isConnected ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">{healthResult.statusText}</p>
                        {healthResult.latencyMs && (
                          <span className="text-[11px] opacity-80 block mt-1 font-mono">
                            زمن الاستجابة (Latency): {healthResult.latencyMs} ms
                          </span>
                        )}
                        {healthResult.errorMessage && (
                          <span className="text-[11px] text-rose-700 block mt-1 font-mono">
                            التفاصيل: {healthResult.errorMessage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">انقر على الزر لفحص الاتصال الحي.</div>
                )}
              </div>

              {/* Exact Setup Instructions */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">أين تضع رابط المشروع ومفتاح النشر العام؟</h4>
                <p>
                  في مشروع Google AI Studio الحالي، تم إنشاء ملف <code className="font-mono text-[#126B45] font-bold">.env</code> في المجلد الرئيسي للتطبيق. ضع القيم داخله كالتالي:
                </p>

                <div className="p-3 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded-xl overflow-x-auto text-left" dir="ltr">
                  VITE_SUPABASE_URL="https://your-project-id.supabase.co"<br />
                  VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                </div>

                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs">
                  <strong>تنبيه أمان صارم:</strong> لا تضع مطلقاً مفتاح <code className="font-mono text-rose-900 font-bold">service_role</code> في ملف <code className="font-mono">.env</code> أو كود الواجهة الأمامية. استخدم فقط مفتاح النشر العام (<strong className="font-bold">anon / public key</strong>)؛ فحماية البيانات مبنية في PostgreSQL عبر الـ RLS.
                </div>
              </div>

              {/* Migrations reminder */}
              <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs space-y-1">
                <h4 className="font-semibold text-slate-900">ملفات الـ SQL الجاهزة للتنفيذ في Supabase SQL Editor:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><code className="text-[#126B45] font-mono">supabase/migrations/20261020000000_sheetora_schema.sql</code> (21 جدول)</li>
                  <li><code className="text-[#126B45] font-mono">supabase/migrations/20261020000001_sheetora_rls_policies.sql</code> (سياسات RLS)</li>
                  <li><code className="text-[#126B45] font-mono">supabase/migrations/20261020000002_sheetora_storage_and_seed.sql</code> (المستودعات والبيانات الأولية)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
