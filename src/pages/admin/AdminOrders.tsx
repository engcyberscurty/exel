import React, { useState } from 'react';
import { ShoppingBag, CheckCircle2, Clock, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Order, OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders } = useAuth();
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);
  const [notice, setNotice] = useState<string | null>(null);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setLocalOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              paid_at: newStatus === 'paid' ? new Date().toISOString() : o.paid_at,
            }
          : o
      )
    );
    setNotice(`تم تحديث حالة الفاتورة رقم ${orderId} إلى: ${newStatus}`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">سجل الفواتير والمدفوعات</h1>
        <p className="text-xs text-[#667085] mt-1">
          مراقبة عمليات الشراء والتحقق من إيصالات التحويل البنكي وبوابات الدفع الإلكتروني
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>{notice}</span>
        </div>
      )}

      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAF7] border-b border-[#E5E7EB] text-[#667085] font-semibold">
              <tr>
                <th className="p-4">رقم الفاتورة</th>
                <th className="p-4">المبلغ (EGP)</th>
                <th className="p-4">طريقة السداد</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">إجراءات التحقق</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {localOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">
                    {ord.order_number}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900">{ord.total_egp}</span>
                    <span className="text-[11px] text-[#126B45] mr-1">ج.م</span>
                  </td>
                  <td className="p-4">
                    <span className="capitalize">{ord.payment_provider}</span>
                  </td>
                  <td className="p-4 text-[#667085]">
                    {new Date(ord.created_at).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        ord.status === 'paid'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : ord.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      {ord.status === 'paid' ? 'مدفوع ومصرح' : ord.status === 'pending' ? 'قيد التحقق' : ord.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {ord.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(ord.id, 'paid')}
                          className="px-2.5 py-1 bg-[#126B45] hover:bg-[#0B3527] text-white text-[11px] font-semibold rounded-md transition-colors"
                        >
                          تأكيد السداد وتفعيل التحميل
                        </button>
                      )}
                      {ord.status === 'paid' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(ord.id, 'cancelled')}
                          className="px-2 py-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded text-[11px]"
                        >
                          إلغاء / استرجاع
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
