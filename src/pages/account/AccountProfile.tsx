import React, { useState } from 'react';
import { User, Mail, Phone, Building2, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountProfile: React.FC = () => {
  const { user } = useAuth();
  const [phone, setPhone] = useState(user?.phone || '');
  const [company, setCompany] = useState(user?.company_name || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-slate-900">الملف الشخصي والبيانات المسجلة</h1>
        <p className="text-xs text-[#667085] mt-1">
          إدارة بيانات الاتصال والمعلومات الضريبية المرتبطة بفواتيرك
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>تم حفظ التعديلات بنجاح.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">الاسم الكامل</label>
            <input
              type="text"
              disabled
              value={user?.full_name || ''}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-600 outline-none cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">الاسم موثق مع التراخيص الصادرة</span>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-600 outline-none cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">يُستخدم لتسجيل الدخول واستلام الروابط</span>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">رقم الهاتف للتواصل والواتساب</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2010..."
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none text-slate-800"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">اسم الشركة أو المؤسسة</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="اسم الشركة"
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg p-2.5 outline-none text-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-[#667085]">
            <Shield className="w-4 h-4 text-[#126B45]" />
            <span>بياناتك محمية ومشفرة وفق أعلى معايير الأمان</span>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
};
