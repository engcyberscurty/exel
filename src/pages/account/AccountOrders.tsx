import React from 'react';
import { ShoppingBag, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const AccountOrders: React.FC = () => {
  const { orders } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#126B45]" />
            <span>مدفوع ومكتمل</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>قيد التحقق من السداد</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded text-xs font-medium">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-slate-900">سجل الطلبات والفواتير</h1>
        <p className="text-xs text-[#667085] mt-1">
          متابعة المعاملات المالية وتاريخ الدفع بالجنيه المصري
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-xl border border-[#E5E7EB] space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {order.order_number}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <span className="text-[11px] text-[#667085]">
                    بتاريخ: {new Date(order.created_at).toLocaleDateString('ar-EG')}
                  </span>
                </div>

                <div className="text-left">
                  <span className="text-lg font-black text-slate-900">{order.total_egp}</span>
                  <span className="text-xs font-bold text-[#126B45] mr-1">جنيه مصري</span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[#667085] block">محتويات الفاتورة:</span>
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs bg-[#F8FAF7] p-2.5 rounded-lg border border-[#E5E7EB]"
                  >
                    <span className="font-medium text-slate-800">{item.title_snapshot}</span>
                    <span className="font-semibold text-slate-700">{item.subtotal_egp} ج.م</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">لا توجد طلبات شراء سابقة</h3>
          <p className="text-xs text-[#667085] max-w-sm mx-auto">
            عند قيامك بشراء ترخيص لقالب إكسل، ستظهر الفاتورة وبيانات السداد هنا.
          </p>
        </div>
      )}
    </div>
  );
};
