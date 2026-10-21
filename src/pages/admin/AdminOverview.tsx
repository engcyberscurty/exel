import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  FileText,
  ShoppingBag,
  Megaphone,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { INITIAL_TEMPLATES, INITIAL_CATEGORIES, INITIAL_AD_CAMPAIGNS } from '../../data/seedData';
import { useAuth } from '../../context/AuthContext';

export const AdminOverview: React.FC = () => {
  const { orders, userRequests } = useAuth();

  const totalRevenue = orders
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + o.total_egp, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const newRequests = userRequests.filter((r) => r.status === 'new' || r.status === 'reviewing');
  const activeAds = INITIAL_AD_CAMPAIGNS.filter((a) => a.status === 'active');

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم الرئيسية</h1>
        <p className="text-xs text-[#667085] mt-1">
          مؤشرات النشاط الفعلي لمنصة Sheetora، التراخيص والمشاريع والمدفوعات بالجنيه المصري
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>إجمالي الإيرادات المؤكدة</span>
            <TrendingUp className="w-4 h-4 text-[#126B45]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{totalRevenue}</span>
            <span className="text-xs font-bold text-[#126B45]">ج.م</span>
          </div>
          <p className="text-[11px] text-[#667085]">من خلال الطلبات المسددة</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>قوالب Excel المنشورة</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{INITIAL_TEMPLATES.length}</span>
            <span className="text-xs text-[#667085]">قوالب</span>
          </div>
          <p className="text-[11px] text-[#667085]">ضمن {INITIAL_CATEGORIES.length} أقسام معتمدة</p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>طلبات الخدمات المخصصة</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{userRequests.length}</span>
            <span className="text-xs text-[#667085]">طلبات</span>
          </div>
          <p className="text-[11px] text-amber-700 font-medium">
            {newRequests.length} بحاجة لدراسة وعرض سعر
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>الحملات الإعلانية النشطة</span>
            <Megaphone className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{activeAds.length}</span>
            <span className="text-xs text-[#667085]">حملات</span>
          </div>
          <p className="text-[11px] text-[#667085]">رعاية مباشرة بدون إزعاج</p>
        </div>
      </div>

      {/* Action Items: Pending Orders & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests Awaiting Review */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              طلبات المشاريع الحديثة ({userRequests.length})
            </h3>
            <Link to="/admin/requests" className="text-xs text-[#126B45] font-semibold hover:underline">
              إدارة الكل &larr;
            </Link>
          </div>

          <div className="space-y-3">
            {userRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-3 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl text-xs flex items-center justify-between gap-3"
              >
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{req.request_number}</span>
                    <span className="text-[#667085]">· {req.customer_name}</span>
                  </div>
                  <p className="font-medium text-slate-800 truncate mt-0.5">{req.project_title}</p>
                </div>
                <Link
                  to="/admin/requests"
                  className="px-2.5 py-1 bg-white border border-slate-200 hover:border-[#126B45] text-slate-800 text-[11px] font-semibold rounded-md shrink-0"
                >
                  فحص
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Verification */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              فواتير الشراء الأخيرة ({orders.length})
            </h3>
            <Link to="/admin/orders" className="text-xs text-[#126B45] font-semibold hover:underline">
              سجل الفواتير &larr;
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-3 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl text-xs flex items-center justify-between gap-3"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900">{ord.order_number}</span>
                  <div className="flex items-center gap-2 text-[11px] text-[#667085] mt-0.5">
                    <span>{ord.total_egp} ج.م</span>
                    <span>·</span>
                    <span className={ord.status === 'paid' ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                      {ord.status === 'paid' ? 'تم التحقق والدفع' : 'قيد السداد'}
                    </span>
                  </div>
                </div>
                <Link
                  to="/admin/orders"
                  className="px-2.5 py-1 bg-white border border-slate-200 hover:border-[#126B45] text-slate-800 text-[11px] font-semibold rounded-md shrink-0"
                >
                  مراجعة
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Integrity & Storage Summary */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900">حالة المستودعات السحابية وأمان البيانات</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB]">
            <span className="font-bold text-slate-900 block mb-1">sheetora-files (خاص)</span>
            <p className="text-[11px] text-[#667085]">
              مستودع مشفر للملفات الأصلية. الوصول عبر Signed URLs صالحة لمدة 60 ثانية فقط بعد التحقق.
            </p>
          </div>
          <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB]">
            <span className="font-bold text-slate-900 block mb-1">sheetora-previews (عام)</span>
            <p className="text-[11px] text-[#667085]">
              صور المعاينة المصغرة للواجهات وجداول البيانات المعروضة في المتجر.
            </p>
          </div>
          <div className="p-3 bg-[#F8FAF7] rounded-xl border border-[#E5E7EB]">
            <span className="font-bold text-slate-900 block mb-1">RLS & Permissions</span>
            <p className="text-[11px] text-[#667085]">
              21 جدول بقواعد أمان صارمة تمنع تصعيد الصلاحيات وتعديل الأسعار وحسابات الإعلانات.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
