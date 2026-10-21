import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, Clock, AlertCircle, Plus, DollarSign, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ServiceRequest, ServiceRequestStatus, Quotation } from '../../types';

export const AdminRequests: React.FC = () => {
  const { userRequests, updateServiceRequest } = useAuth();
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);

  // Quote form state
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteScope, setQuoteScope] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const statuses: { id: ServiceRequestStatus; label: string }[] = [
    { id: 'new', label: 'طلب جديد (New)' },
    { id: 'reviewing', label: 'قيد المراجعة الفنية (Reviewing)' },
    { id: 'awaiting_customer', label: 'بانتظار توضيح من العميل' },
    { id: 'quoted', label: 'تم إرسال عرض السعر (Quoted)' },
    { id: 'approved', label: 'تمت الموافقة (Approved)' },
    { id: 'in_progress', label: 'قيد التنفيذ والبرمجة (In Progress)' },
    { id: 'delivered', label: 'تم تسليم المسودة (Delivered)' },
    { id: 'completed', label: 'مكتمل ومعتمد نهائياً (Completed)' },
    { id: 'cancelled', label: 'ملغي (Cancelled)' },
  ];

  const handleStatusChange = (reqId: string, newStatus: ServiceRequestStatus) => {
    updateServiceRequest(reqId, { status: newStatus });
    if (selectedReq?.id === reqId) {
      setSelectedReq({ ...selectedReq, status: newStatus });
    }
    setNotice(`تم تحديث حالة الطلب إلى: ${newStatus}`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq || !quoteAmount) return;

    const newQuote: Quotation = {
      id: `quote-${Date.now()}`,
      request_id: selectedReq.id,
      quote_number: `Q-2026-${Math.floor(100 + Math.random() * 900)}`,
      amount_egp: Number(quoteAmount),
      scope: quoteScope.trim() || 'تنفيذ متطلبات المشروع المتفق عليها مع تسليم الملفات ودليل الاستخدام.',
      status: 'sent',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    updateServiceRequest(selectedReq.id, {
      status: 'quoted',
      quotes: [newQuote, ...(selectedReq.quotes || [])],
    });

    setSelectedReq({
      ...selectedReq,
      status: 'quoted',
      quotes: [newQuote, ...(selectedReq.quotes || [])],
    });

    setQuoteAmount('');
    setQuoteScope('');
    setNotice(`تم إصدار وإرسال عرض السعر رقم ${newQuote.quote_number} للعميل بنجاح.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">طلبات المشاريع المخصصة وعروض الأسعار</h1>
        <p className="text-xs text-[#667085] mt-1">
          متابعة استشارات تحليل البيانات، شيتات الإكسل، وإصدار عروض الأسعار الرسمية بالجنيه المصري
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 font-bold text-xs text-slate-800">
            جميع الطلبات المستلمة ({userRequests.length})
          </div>

          <div className="space-y-2.5">
            {userRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-4 bg-white border rounded-xl cursor-pointer transition-all text-xs space-y-2 ${
                  selectedReq?.id === req.id
                    ? 'border-[#126B45] shadow-xs ring-1 ring-[#126B45]'
                    : 'border-[#E5E7EB] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{req.request_number}</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {req.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900">{req.project_title}</h4>
                <div className="flex items-center justify-between text-[#667085] text-[11px]">
                  <span>العميل: {req.customer_name}</span>
                  <span>{new Date(req.created_at).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Request Detail & Quote Drawer */}
        <div className="lg:col-span-6">
          {selectedReq ? (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-6 sticky top-8">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-[#126B45]">
                    {selectedReq.request_number}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-0.5">
                    {selectedReq.project_title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedReq(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Update Selector */}
              <div className="text-xs space-y-1">
                <label className="font-bold text-slate-700">تحديث الحالة الإدارية للطلب:</label>
                <select
                  value={selectedReq.status}
                  onChange={(e) => handleStatusChange(selectedReq.id, e.target.value as any)}
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2 text-slate-800 font-semibold cursor-pointer outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Details */}
              <div className="p-3 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-[#667085]">اسم العميل:</span>
                  <span className="font-semibold">{selectedReq.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">البريد الإلكتروني:</span>
                  <span className="font-mono">{selectedReq.customer_email}</span>
                </div>
                {selectedReq.customer_phone && (
                  <div className="flex justify-between">
                    <span className="text-[#667085]">الهاتف:</span>
                    <span className="font-mono" dir="ltr">{selectedReq.customer_phone}</span>
                  </div>
                )}
                {selectedReq.company_name && (
                  <div className="flex justify-between">
                    <span className="text-[#667085]">الشركة:</span>
                    <span>{selectedReq.company_name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#667085]">الميزانية التقديرية:</span>
                  <span className="font-bold text-[#126B45]">
                    {selectedReq.budget_min_egp || 0} - {selectedReq.budget_max_egp || 0} ج.م
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-700 block">وصف المشروع والمتطلبات:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selectedReq.description}
                </p>
              </div>

              {/* Issue Official Quote */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#126B45]" />
                  <span>إصدار عرض سعر رسمي (Quotation) بالجنيه المصري</span>
                </h4>

                <form onSubmit={handleCreateQuote} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      المبلغ الإجمالي المقترح (EGP) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                      placeholder="مثال: 8500"
                      className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      نطاق العمل وجدول التسليم
                    </label>
                    <textarea
                      rows={2}
                      value={quoteScope}
                      onChange={(e) => setQuoteScope(e.target.value)}
                      placeholder="تفصيل المخرجات وموعد التسليم والتعديلات المشمولة..."
                      className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال عرض السعر للعميل</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center text-xs text-[#667085] shadow-xs">
              اختر طلباً من القائمة الجانبية لمراجعته وتحديث حالته وإصدار عرض السعر.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
