import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items, removeFromCart, clearCart, totalEgp, itemCount } = useCart();
  const navigate = useNavigate();

  if (itemCount === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">سلة المشتريات فارغة</h2>
        <p className="text-xs text-[#667085] max-w-sm mx-auto">
          لم تقم بإضافة أي قوالب مدفوعة إلى سلتك حتى الآن. استعرض كتالوج القوالب المعتمدة واختر ما يلائم عملك.
        </p>
        <div className="pt-2">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            <span>تصفح قوالب Excel</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">سلة المشتريات</h1>
          <p className="text-xs text-[#667085] mt-1">لديك {itemCount} قوالب في سلة التسوق</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
        >
          إفراغ السلة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={item.preview_image_path}
                    alt={item.title_ar}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    <Link to={`/templates/${item.slug}`} className="hover:text-[#126B45]">
                      {item.title_ar}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-[#667085]">
                    <span className="uppercase text-[#126B45] font-semibold">{item.file_extension}</span>
                    <span>·</span>
                    <span>ترخيص تجاري كامل</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-left">
                  <span className="text-base font-black text-slate-900">{item.price_egp}</span>
                  <span className="text-xs font-bold text-[#126B45] mr-1">ج.م</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-6 shadow-xs sticky top-24">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              ملخص الطلب
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>إجمالي القوالب ({itemCount}):</span>
                <span className="font-semibold text-slate-900">{totalEgp} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (VAT):</span>
                <span className="font-semibold text-emerald-700">شاملة</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم التنزيل الرقمي:</span>
                <span className="font-semibold text-emerald-700">مجاناً</span>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex justify-between items-baseline">
                <span className="font-bold text-sm text-slate-900">المبلغ المستحق:</span>
                <div className="text-left">
                  <span className="text-2xl font-black text-[#126B45]">{totalEgp}</span>
                  <span className="text-xs font-bold text-slate-800 mr-1">جنيه مصري</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>متابعة إتمام الدفع الآمن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-[#667085] flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#126B45]" />
              <span>دفع مشفر وتنزيل فوري فور تأكيد السداد</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
