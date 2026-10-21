import React, { useState } from 'react';
import { Megaphone, CheckCircle2, Send, AlertCircle, Layout, Sparkles, Target, BarChart2 } from 'lucide-react';
import { AdPlacement } from '../types';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export const Advertise: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget_egp: '',
    campaign_objective: '',
    preferred_placements: ['homepage_banner'] as AdPlacement[],
    destination_url: '',
    desired_start_date: '',
    desired_end_date: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlacementToggle = (placement: AdPlacement) => {
    setFormData((prev) => {
      const exists = prev.preferred_placements.includes(placement);
      if (exists) {
        if (prev.preferred_placements.length === 1) return prev; // keep at least one
        return {
          ...prev,
          preferred_placements: prev.preferred_placements.filter((p) => p !== placement),
        };
      } else {
        return {
          ...prev,
          preferred_placements: [...prev.preferred_placements, placement],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim()) {
      setErrorMsg('يرجى كتابة الاسم والشركة والبريد الإلكتروني.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('advertising_inquiries').insert({
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          budget_egp: formData.budget_egp ? Number(formData.budget_egp) : null,
          campaign_objective: formData.campaign_objective.trim(),
          preferred_placements: formData.preferred_placements,
          desired_start_date: formData.desired_start_date || null,
          desired_end_date: formData.desired_end_date || null,
          status: 'new',
        });

        if (error) throw error;
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر إرسال استفسار الإعلان';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#126B45]">الوصول إلى مجتمع الأعمال</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          أعلن معنا واستهدف أصحاب القرار في الشركات المصرية
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          تستقبل Sheetora يومياً آلاف المحاسبين، المديرين الماليين، رواد الأعمال، وأصحاب المنشآت الباحثين عن أدوات عمل حقيقية. نقدّم مساحات إعلانية نظيفة ومدروسة بدون إزعاج بصري.
        </p>
      </div>

      {/* Available Placements Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#126B45]/10 text-[#126B45] flex items-center justify-center font-bold">
            <Layout className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">بانر الصفحة الرئيسية</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            مساحة بارزة في أعلى صفحة المنصة، مناسبة لشركات البرمجيات والاستشارات المحاسبية والتأمينية.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#126B45]">
            نموذج التسعير: شهري ثابت أو بالظهور
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#126B45]/10 text-[#126B45] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">شريك معتمد مميز</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            ظهور خاص كشريك أعمال موثوق مع بطاقة مخصصة في قسم الخدمات وحلول الشركات.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#126B45]">
            نموذج التسعير: رعاية ربع سنوية
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#126B45]/10 text-[#126B45] flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">رعاية الأقسام المتخصصة</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            ظهور حصري داخل قسم محدد (مثل: قسم الرواتب للمكاتب القانونية، أو المخازن لشركات اللوجستيات).
          </p>
          <div className="pt-2 text-xs font-semibold text-[#126B45]">
            نموذج التسعير: شهري بحسب القسم
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#126B45]/10 text-[#126B45] flex items-center justify-center font-bold">
            <BarChart2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">الشريط الجانبي للمتجر</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            بانر عمودي داخل صفحات تفاصيل القوالب يظهر بجوار تفاصيل الملف والتنزيل.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#126B45]">
            نموذج التسعير: بنقرة الوصول (CPC) أو ثابت
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-xs">
        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#126B45] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">تم استلام استفسار الحملة بنجاح</h3>
            <p className="text-xs text-[#667085] max-w-md mx-auto leading-relaxed">
              شكراً لاهتمامكم بالإعلان في Sheetora. سيتواصل معكم مسؤول العلاقات التجارية خلال يوم عمل واحد لمناقشة الخطة وتزويدكم بعرض السعر والبيانات الإحصائية.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">استمارة حجز وإطلاق حملة إعلانية</h2>
              <p className="text-xs text-[#667085] mt-1">
                تُدرس جميع الطلبات يدوياً لضمان ملاءمة الإعلانات مع معايير المنصة وعدم إزعاج المستخدمين.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  اسم المسؤول <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مريم خالد"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  اسم الشركة أو العلامة التجارية <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="مثال: شركة سحابة الأعمال"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  البريد الإلكتروني للعمل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="business@company.com"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  رقم الهاتف / واتساب للتواصل
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+201000000000"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>
            </div>

            {/* Placements selection */}
            <div className="space-y-2 text-xs">
              <label className="block text-slate-700 font-medium">
                المساحات الإعلانية المرغوبة:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'homepage_banner', label: 'بانر الصفحة الرئيسية الرئيسي' },
                  { id: 'homepage_featured_sponsor', label: 'شريك معتمد في قسم الشركات' },
                  { id: 'category_sponsored', label: 'رعاية الأقسام المتخصصة' },
                  { id: 'sidebar_placement', label: 'الشريط الجانبي للمتجر' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 p-2.5 bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg cursor-pointer hover:border-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferred_placements.includes(item.id as AdPlacement)}
                      onChange={() => handlePlacementToggle(item.id as AdPlacement)}
                      className="text-[#126B45] rounded"
                    />
                    <span className="text-slate-800">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  الميزانية الشهرية المقترحة (بالجنيه EGP)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.budget_egp}
                  onChange={(e) => setFormData({ ...formData, budget_egp: e.target.value })}
                  placeholder="مثال: 5000"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  رابط الموقع المُراد توجيه الزوار إليه (URL)
                </label>
                <input
                  type="url"
                  value={formData.destination_url}
                  onChange={(e) => setFormData({ ...formData, destination_url: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-700 font-medium mb-1">
                هدف الحملة والرسالة الإعلانية
              </label>
              <textarea
                rows={3}
                value={formData.campaign_objective}
                onChange={(e) => setFormData({ ...formData, campaign_objective: e.target.value })}
                placeholder="صف الخدمة التي تقدمها لجمهور Sheetora وما ترغب في ترويجه..."
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب استشارة إعلانية'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
