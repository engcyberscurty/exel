import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Briefcase,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ServiceType, ServiceRequest } from '../types';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export const RequestService: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, submitServiceRequest } = useAuth();

  const defaultServiceType: ServiceType =
    (searchParams.get('type') as ServiceType) || 'custom_excel';

  const [formData, setFormData] = useState({
    customer_name: user?.full_name || '',
    company_name: user?.company_name || '',
    customer_email: user?.email || '',
    customer_phone: user?.phone || '',
    service_type: defaultServiceType,
    project_title: '',
    description: '',
    business_objectives: '',
    deliverables: '',
    budget_min_egp: '',
    budget_max_egp: '',
    deadline: '',
    consent_privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdRequest, setCreatedRequest] = useState<ServiceRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!formData.customer_name.trim() || !formData.customer_email.trim()) {
      setSubmitError('يرجى ملء الاسم والبريد الإلكتروني للتواصل.');
      return;
    }
    if (!formData.project_title.trim() || !formData.description.trim()) {
      setSubmitError('يرجى كتابة عنوان المشروع ووصف متطلباتك بالتفصيل.');
      return;
    }
    if (!formData.consent_privacy) {
      setSubmitError('يرجى الموافقة على سياسة الخصوصية وسرية البيانات.');
      return;
    }

    setIsSubmitting(true);

    const requestNumber = `SR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: ServiceRequest = {
      id: `req-${Date.now()}`,
      request_number: requestNumber,
      user_id: user?.id || null,
      customer_name: formData.customer_name.trim(),
      customer_email: formData.customer_email.trim(),
      customer_phone: formData.customer_phone.trim() || undefined,
      service_type: formData.service_type,
      project_title: formData.project_title.trim(),
      company_name: formData.company_name.trim() || null,
      description: formData.description.trim(),
      business_objectives: formData.business_objectives.trim() || undefined,
      deliverables: formData.deliverables.trim() || null,
      budget_min_egp: formData.budget_min_egp ? Number(formData.budget_min_egp) : null,
      budget_max_egp: formData.budget_max_egp ? Number(formData.budget_max_egp) : null,
      deadline: formData.deadline || null,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('service_requests').insert({
          request_number: newRequest.request_number,
          user_id: user?.id || null,
          customer_name: newRequest.customer_name,
          customer_email: newRequest.customer_email,
          customer_phone: newRequest.customer_phone,
          service_type: newRequest.service_type,
          project_title: newRequest.project_title,
          company_name: newRequest.company_name,
          description: newRequest.description,
          business_objectives: newRequest.business_objectives,
          deliverables: newRequest.deliverables,
          budget_min_egp: newRequest.budget_min_egp,
          budget_max_egp: newRequest.budget_max_egp,
          deadline: newRequest.deadline,
          status: 'new',
        });

        if (error) throw error;
      }

      // Record in auth context / storage state
      submitServiceRequest(newRequest);
      setCreatedRequest(newRequest);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر حفظ الطلب في قاعدة البيانات.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdRequest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#126B45] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-semibold text-[#126B45]">تم تسجيل طلبك بنجاح</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              شكراً لتواصلك مع Sheetora
            </h1>
            <p className="text-xs text-[#667085] mt-2 leading-relaxed">
              تم استلام تفاصيل مشروعك وسيقوم مهندس أو محلل بيانات بمراجعة المتطلبات وإعداد عرض السعر الفني والمالي.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl text-xs space-y-2 text-right">
            <div className="flex justify-between">
              <span className="text-[#667085]">رقم مرجع الطلب:</span>
              <strong className="font-mono text-slate-900 font-bold">{createdRequest.request_number}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">عنوان المشروع:</span>
              <span className="font-medium text-slate-800">{createdRequest.project_title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">نوع الخدمة:</span>
              <span className="font-medium text-slate-800">
                {createdRequest.service_type === 'data_analysis'
                  ? 'تحليل بيانات وتقارير'
                  : createdRequest.service_type === 'custom_excel'
                  ? 'شيت إكسل مخصص'
                  : 'تطوير موقع أو نظام'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">حالة الطلب الحالية:</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                قيد المراجعة الفنية (New)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/account/requests"
              className="flex-1 py-3 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl text-center transition-colors"
            >
              متابعة الطلب في حسابي
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
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#126B45]">
          <Briefcase className="w-4 h-4" />
          <span>خدمات الأعمال والشركات</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          طلب خدمة مخصصة وعرض سعر رسمي
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          املأ استمارة المشروع أدناه بتفاصيل دقيقة. تقديم هذا الطلب لا يفرض أي التزام مالي فوري، وسنرد عليك بعرض سعر مفصل يتضمن التكلفة وجدول التسليم خلال 24 ساعة.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
        {submitError && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Section 1: Contact Details */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <span>1. بيانات التواصل والمنشأة</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                الاسم بالكامل <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                placeholder="مثال: أحمد عبد الله"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                اسم الشركة أو النشاط (اختياري)
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="مثال: شركة الأمل للتجارة"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                البريد الإلكتروني الرسمي <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                placeholder="name@company.com"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                رقم الهاتف / واتساب
              </label>
              <input
                type="tel"
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                placeholder="+201012345678"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Service Selection */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            2. نوع الخدمة المطلوبة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                formData.service_type === 'custom_excel'
                  ? 'border-[#126B45] bg-[#126B45]/5 text-slate-900 font-semibold'
                  : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span>شيت إكسل مخصص ونماذج مالية</span>
                <input
                  type="radio"
                  name="service_type"
                  value="custom_excel"
                  checked={formData.service_type === 'custom_excel'}
                  onChange={() => setFormData({ ...formData, service_type: 'custom_excel' })}
                  className="text-[#126B45]"
                />
              </div>
              <p className="text-[11px] text-[#667085] font-normal leading-relaxed">
                معادلات، أتمتة ماكرو، نماذج موازنة ورواتب متوافقة مع مصر.
              </p>
            </label>

            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                formData.service_type === 'data_analysis'
                  ? 'border-[#126B45] bg-[#126B45]/5 text-slate-900 font-semibold'
                  : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span>تحليل بيانات وتقارير ولوحات KPI</span>
                <input
                  type="radio"
                  name="service_type"
                  value="data_analysis"
                  checked={formData.service_type === 'data_analysis'}
                  onChange={() => setFormData({ ...formData, service_type: 'data_analysis' })}
                  className="text-[#126B45]"
                />
              </div>
              <p className="text-[11px] text-[#667085] font-normal leading-relaxed">
                تنظيف جداول المبيعات الضخمة، داشبورد تفاعلي، وتوصيات ربحية.
              </p>
            </label>

            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                formData.service_type === 'web_development'
                  ? 'border-[#126B45] bg-[#126B45]/5 text-slate-900 font-semibold'
                  : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span>تصميم وتطوير موقع أو نظام سحابي</span>
                <input
                  type="radio"
                  name="service_type"
                  value="web_development"
                  checked={formData.service_type === 'web_development'}
                  onChange={() => setFormData({ ...formData, service_type: 'web_development' })}
                  className="text-[#126B45]"
                />
              </div>
              <p className="text-[11px] text-[#667085] font-normal leading-relaxed">
                مواقع شركات، بوابات إدارة عملاء، قواعد بيانات وربط دفع إلكتروني.
              </p>
            </label>
          </div>
        </div>

        {/* Section 3: Project Scope & Deliverables */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. تفاصيل ونطاق المشروع
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                عنوان أو مسمى المشروع <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.project_title}
                onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                placeholder="مثال: بناء نموذج مالي متكامل لدراسة جدوى مصنع مواد غذائية"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                وصف مفصل للمشروع والوضع الحالي <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="صف المشكلة التي تريد حلها، وطبيعة البيانات المتوفرة لديك، وما ترغب في تحقيقه..."
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none text-slate-800 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                المخرجات المتوقعة (Deliverables)
              </label>
              <input
                type="text"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                placeholder="مثال: ملف إكسل منظف + لوحة تحكم Power BI + تقرير PDF للمدير العام"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Budget & Timeline */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            4. الميزانية التقديرية والموعد المستهدف
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                الحد الأدنى للميزانية (بالجنيه EGP)
              </label>
              <input
                type="number"
                min="0"
                value={formData.budget_min_egp}
                onChange={(e) => setFormData({ ...formData, budget_min_egp: e.target.value })}
                placeholder="مثال: 5000"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                الحد الأقصى للميزانية (بالجنيه EGP)
              </label>
              <input
                type="number"
                min="0"
                value={formData.budget_max_egp}
                onChange={(e) => setFormData({ ...formData, budget_max_egp: e.target.value })}
                placeholder="مثال: 12000"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                الموعد المستهدف للاستلام
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Consent and Submission */}
        <div className="pt-4 border-t border-[#E5E7EB] space-y-4">
          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consent_privacy}
              onChange={(e) => setFormData({ ...formData, consent_privacy: e.target.checked })}
              className="mt-0.5 text-[#126B45] rounded"
            />
            <span>
              أوافق على سياسة الخصوصية وسرية البيانات وأفهم أن إرسال هذا الطلب يعد طلباً أولياً لدراسة نطاق العمل ولا يترتب عليه أي دفع قبل قبول عرض السعر الرسمي.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'جاري إرسال الطلب وحفظ البيانات...' : 'إرسال طلب المشروع الآن'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
