import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#126B45]">الدعم وخدمة العملاء</span>
        <h1 className="text-3xl font-extrabold text-slate-900">تواصل مع فريق Sheetora</h1>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          سواء كان لديك استفسار حول قالب محدد، أو ترغب في استشارة حول مشروعك، فريقنا التقني في خدمتك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-5 bg-[#0B3527] text-white rounded-2xl p-8 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">قنوات التواصل المباشرة</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              نرد على جميع الرسائل والاستفسارات الفنية خلال ساعات العمل الرسمية (الأحد - الخميس من 9 ص حتى 5 م بتوقيت القاهرة).
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-200">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-400 text-[11px]">البريد الإلكتروني:</span>
                <span className="font-semibold text-white">support@sheetora.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-400 text-[11px]">الهاتف والواتساب:</span>
                <span className="font-semibold text-white" dir="ltr">+20 10 1234 5678</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-400 text-[11px]">المقر الرئيسي:</span>
                <span className="font-semibold text-white">التجمع الخامس، القاهرة، مصر</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-emerald-900/60 text-[11px] text-slate-400 leading-relaxed">
            لطلبات المشاريع المخصصة وعروض الأسعار الكبرى، يفضل استخدام استمارة طلب الخدمة المباشرة للحصول على تسعير فني دقيق.
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#126B45] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">تم إرسال رسالتك بنجاح</h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                شكراً لتواصلك معنا. سيقوم أحد مسؤولي الدعم بمراجعة رسالتك والتواصل معك عبر البريد الإلكتروني قريباً.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                }}
                className="px-4 py-2 bg-[#126B45] text-white text-xs font-semibold rounded-lg hover:bg-[#0B3527] transition-colors"
              >
                إرسال استفسار آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-bold text-base text-slate-900 mb-2">أرسل لنا رسالة</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    الاسم بالكامل <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="محمد علي"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    البريد الإلكتروني <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    رقم الهاتف / واتساب
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+201000000000"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    الموضوع أو نوع الاستفسار
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="استفسار عن قالب، تعديل، ترخيص..."
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  نص الرسالة <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب استفسارك بالتفصيل..."
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none focus:border-[#126B45] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
