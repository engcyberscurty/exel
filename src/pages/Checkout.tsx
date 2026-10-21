import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Info,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PaymentAdapter } from '../lib/payments';
import { Order, OrderItem } from '../types';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export const Checkout: React.FC = () => {
  const { user, recordOrder } = useAuth();
  const { items, totalEgp, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'paymob' | 'bank_transfer'>('paymob');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerCompany, setCustomerCompany] = useState(user?.company_name || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // If cart is empty and not yet placed
  if (items.length === 0 && !placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">لا توجد عناصر لإتمام الدفع</h2>
        <p className="text-xs text-[#667085]">سلة المشتريات فارغة، يرجى اختيار قالب لإتمام شرائه.</p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#126B45] text-white rounded-lg text-xs font-semibold"
        >
          <span>تصفح المتجر</span>
        </Link>
      </div>
    );
  }

  // Handle Order Placement
  const handleProceedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);

    if (!user) {
      setErrorNotice('يجب تسجيل الدخول أو إنشاء حساب لربط التراخيص المشتراة بحسابك.');
      return;
    }

    setIsProcessing(true);

    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderItems: OrderItem[] = items.map((it) => ({
      id: `item-${Date.now()}-${it.id}`,
      order_id: '',
      template_id: it.id,
      template: it,
      title_snapshot: it.title_ar,
      unit_price_egp: it.price_egp,
      quantity: 1,
      subtotal_egp: it.price_egp,
    }));

    // Check payment gateway configuration
    const isGatewayActive = PaymentAdapter.isConfigured();

    if (paymentMethod === 'paymob') {
      if (!isGatewayActive) {
        setIsProcessing(false);
        setErrorNotice(
          'بوابة الدفع الإلكتروني المباشر (Paymob) قيد التهيئة. يرجى تزويد مفاتيح الربط في المتغيرات VITE_PAYMOB_API_KEY أو اختيار خيار "التحويل البنكي / الفاتورة المباشرة" أدناه لطلب الترخيص.'
        );
        return;
      }

      // If gateway is configured, create live intent
      const intent = await PaymentAdapter.createPaymentIntent({
        orderId: `ord-${Date.now()}`,
        orderNumber,
        amountEgp: totalEgp,
        customer: {
          fullName: user.full_name,
          email: user.email,
          phone: customerPhone,
        },
        items: items.map((i) => ({
          title: i.title_ar,
          amountEgp: i.price_egp,
          quantity: 1,
        })),
      });

      setIsProcessing(false);

      if (intent.paymentUrl) {
        window.location.href = intent.paymentUrl;
        return;
      } else {
        setErrorNotice(intent.errorMessage || 'فشل الاتصال ببوابة الدفع.');
        return;
      }
    }

    // Manual Bank Transfer / Invoice Request (Egyptian corporate workflow)
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      user_id: user.id,
      order_number: orderNumber,
      total_egp: totalEgp,
      currency: 'EGP',
      status: 'pending', // Strictly marked pending until verified by admin
      payment_provider: 'bank_transfer',
      created_at: new Date().toISOString(),
      items: orderItems,
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: orderError } = await supabase.from('orders').insert({
          user_id: user.id,
          order_number: newOrder.order_number,
          total_egp: newOrder.total_egp,
          currency: 'EGP',
          status: 'pending',
          payment_provider: 'bank_transfer',
        });

        if (orderError) throw orderError;
      }

      recordOrder(newOrder);
      setPlacedOrder(newOrder);
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر تسجيل الطلب';
      setErrorNotice(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // If order was successfully recorded as pending
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-semibold text-amber-700">تم تسجيل طلب الشراء بنجاح</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              طلبك مسجل برقم {placedOrder.order_number}
            </h1>
            <p className="text-xs text-[#667085] mt-2 leading-relaxed">
              الحالة الحالية: <strong className="text-slate-900">قيد التحقق من السداد (Pending)</strong>. التزاماً بمعايير الأمان، تُفعّل روابط التنزيل فور تأكيد التحويل المالي من الإدارة.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl text-xs space-y-3 text-right">
            <h4 className="font-bold text-slate-900">بيانات السداد والتحويل الفوري (مصر):</h4>
            <div className="space-y-2 text-slate-700">
              <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-lg">
                <span className="font-bold text-purple-800 block mb-1">1. تحويل إنستاباي الفوري (InstaPay):</span>
                <div className="flex justify-between text-[11px]">
                  <span>عنوان الدفع (IPA):</span>
                  <span className="font-mono font-bold text-slate-900" dir="ltr">sheetora@instapay</span>
                </div>
              </div>

              <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-lg">
                <span className="font-bold text-rose-700 block mb-1">2. محفظة فودافون كاش / المحافظ الإلكترونية:</span>
                <div className="flex justify-between text-[11px]">
                  <span>رقم تحويل المحفظة:</span>
                  <span className="font-mono font-bold text-slate-900" dir="ltr">010 1234 5678</span>
                </div>
              </div>

              <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-lg">
                <span className="font-bold text-slate-900 block mb-1">3. التحويل البنكي المباشر (CIB Bank):</span>
                <div className="flex justify-between text-[11px]">
                  <span>رقم الحساب:</span>
                  <span className="font-mono font-bold text-slate-900">100045892301</span>
                </div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-[#667085]">المبلغ المطلوب بدقة:</span>
                <span className="font-bold text-[#126B45] text-sm">{placedOrder.total_egp} جنيه مصري</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">رقم مرجع الفاتورة:</span>
                <span className="font-mono font-bold text-slate-900">{placedOrder.order_number}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#667085] pt-2 border-t border-slate-200">
              يرجى إرسال لقطة شاشة لإشعار التحويل عبر واتساب: <strong className="text-slate-900" dir="ltr">+20 10 1234 5678</strong> لتفعيل التحميل الفوري وتوثيق الفاتورة.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/account/orders"
              className="flex-1 py-3 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl text-center transition-colors"
            >
              متابعة فواتيري وطلباتي
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-[#E5E7EB] text-xs font-semibold rounded-xl text-center transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">إتمام الشراء والترخيص</h1>
        <p className="text-xs text-[#667085] mt-1">
          تسليم فوري للملفات المصرح بها وتوثيق الفواتير بالجنيه المصري (EGP).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleProceedPayment} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            {errorNotice && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* User Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                1. بيانات المشتري والفاتورة
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">الاسم بالكامل</label>
                  <input
                    type="text"
                    disabled
                    value={user?.full_name || 'زائر'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+201012345678"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">اسم الشركة (اختياري)</label>
                  <input
                    type="text"
                    value={customerCompany}
                    onChange={(e) => setCustomerCompany(e.target.value)}
                    placeholder="اسم المنشأة لإصدار الفاتورة"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                2. اختيار طريقة السداد
              </h3>

              <div className="space-y-2.5 text-xs">
                {/* Method 1: Electronic Card / Paymob */}
                <label
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'paymob'
                      ? 'border-[#126B45] bg-[#126B45]/5'
                      : 'border-[#E5E7EB] bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="paymob"
                    checked={paymentMethod === 'paymob'}
                    onChange={() => setPaymentMethod('paymob')}
                    className="mt-1 text-[#126B45]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        الدفع الإلكتروني (فيزا / ماستركارد / ميزة / محافظ كاش)
                      </span>
                      <CreditCard className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-[#667085] mt-1">
                      معالجة آمنة مشفرة عبر بوابة الدفع الإلكتروني (Paymob Accept) بالجنيه المصري.
                    </p>
                    {!PaymentAdapter.isConfigured() && (
                      <div className="mt-2 text-[10px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                        <strong>حالة البوابة:</strong> مفاتيح API غير مهيأة بعد على هذا الخادم. لتجنب المعاملات الوهمية، يرجى اختيار التحويل البنكي أدناه أو تزويد المفاتيح في .env.
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 2: Bank Transfer / Corporate Invoice */}
                <label
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#126B45] bg-[#126B45]/5'
                      : 'border-[#E5E7EB] bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 text-[#126B45]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        تحويل بنكي مباشر / فاتورة ضريبية للشركات
                      </span>
                      <Building2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-[#667085] mt-1">
                      مناسب للمؤسسات والشركات، يتم إصدار رقم طلب وتفعيل التحميل فور استلام الإيصال.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'جاري التحقق والاتصال الآمن...'
                  : `تأكيد الطلب بمبلغ ${totalEgp} ج.م`}
              </span>
            </button>
          </form>
        </div>

        {/* Right: Items Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              العناصر المشمولة بالترخيص
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="truncate flex-1">
                    <p className="font-semibold text-slate-900 truncate">{it.title_ar}</p>
                    <span className="text-[10px] text-[#667085]">صيغة {it.file_extension.toUpperCase()}</span>
                  </div>
                  <div className="shrink-0 font-bold text-slate-800">
                    {it.price_egp} ج.م
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E7EB] pt-3 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-semibold text-slate-900">{totalEgp} ج.م</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
                <span>المبلغ النهائي:</span>
                <span className="text-[#126B45] text-lg">{totalEgp} جنيه مصري</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
