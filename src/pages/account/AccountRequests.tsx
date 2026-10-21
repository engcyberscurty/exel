import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle2, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ServiceRequest } from '../../types';

export const AccountRequests: React.FC = () => {
  const { userRequests, updateServiceRequest } = useAuth();
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200">طلب جديد (قيد المراجعة)</span>;
      case 'reviewing':
        return <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-medium border border-blue-200">جاري دراسة النطاق</span>;
      case 'quoted':
        return <span className="text-purple-800 bg-purple-50 px-2 py-0.5 rounded text-[11px] font-medium border border-purple-200">عرض السعر جاهز للموافقة</span>;
      case 'in_progress':
        return <span className="text-[#126B45] bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">قيد التنفيذ الفعلي</span>;
      case 'delivered':
      case 'completed':
        return <span className="text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-bold">تم التسليم والاعتماد</span>;
      default:
        return <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">{status}</span>;
    }
  };

  const handleAcceptQuote = (reqId: string, quoteId: string) => {
    updateServiceRequest(reqId, {
      status: 'in_progress',
    });
    setActionNotice('تم قبول عرض السعر بنجاح وجاري بدء مرحلة التنفيذ مع الفريق الهندسي.');
    setTimeout(() => setActionNotice(null), 5000);
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">طلبات المشاريع والاستشارات</h1>
          <p className="text-xs text-[#667085] mt-1">
            متابعة حالة تحليل البيانات، شيتات الإكسل، وعروض الأسعار الفنية
          </p>
        </div>
        <Link
          to="/request-service"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          <span>طلب مشروع جديد</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>{actionNotice}</span>
        </div>
      )}

      {userRequests.length > 0 ? (
        <div className="space-y-4">
          {userRequests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-xl border border-[#E5E7EB] space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {req.request_number}
                    </span>
                    {getStatusBadge(req.status)}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{req.project_title}</h3>
                </div>

                <div className="text-left text-xs text-[#667085]">
                  <span>التاريخ: {new Date(req.created_at).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>

              {/* Description preview */}
              <p className="text-xs text-[#667085] leading-relaxed line-clamp-2">
                {req.description}
              </p>

              {/* Quotations if available */}
              {req.quotes && req.quotes.length > 0 && (
                <div className="p-4 bg-[#F8FAF7] border border-[#126B45]/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#126B45]">
                      عرض السعر الفني والمالي (Quotation):
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-700">
                      {req.quotes[0].quote_number}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-[11px] text-[#667085] block">نطاق العمل المعتمد:</span>
                      <p className="text-xs text-slate-800 font-medium">{req.quotes[0].scope}</p>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-xl font-black text-[#126B45]">
                        {req.quotes[0].amount_egp}
                      </span>
                      <span className="text-xs font-bold text-slate-800 mr-1">جنيه مصري</span>
                    </div>
                  </div>

                  {req.quotes[0].status === 'sent' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleAcceptQuote(req.id, req.quotes![0].id)}
                        className="px-4 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        قبول عرض السعر وبدء التنفيذ
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">لا توجد طلبات مشاريع مرسلة</h3>
          <p className="text-xs text-[#667085] max-w-sm mx-auto">
            هل تحتاج لشيت إكسل خاص بنشاطك أو تقارير تحليل بيانات؟ أرسل طلبك الآن.
          </p>
          <Link
            to="/request-service"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] text-white text-xs font-semibold rounded-lg"
          >
            <span>تقديم طلب مشروع جديد</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
