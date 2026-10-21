import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Building2, AlertCircle, UserPlus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('يرجى ملء جميع الحقول الإلزامية.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('يجب ألا تقل كلمة المرور عن 6 أحرف.');
      return;
    }

    setIsLoading(true);
    const result = await register(email, password, fullName, phone, company);
    setIsLoading(false);

    if (result.success) {
      navigate('/account');
    } else {
      setErrorMsg(result.error || 'تعذر إتمام عملية التسجيل.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-xs">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-xl font-bold text-slate-900">إنشاء حساب جديد</h1>
          <p className="text-xs text-[#667085]">
            سجّل الآن لتحميل القوالب المجانية والحصول على التراخيص الرسمية
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              الاسم الكامل <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أحمد محمود"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg py-2.5 pr-9 pl-3 text-slate-800 outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              البريد الإلكتروني <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg py-2.5 pr-9 pl-3 text-slate-800 outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              كلمة المرور (6 أحرف فأكثر) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg py-2.5 pr-9 pl-3 text-slate-800 outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                رقم الهاتف (اختياري)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+2010..."
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg py-2.5 pr-9 pl-3 text-slate-800 outline-none"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                اسم المنشأة (اختياري)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="اسم الشركة"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] rounded-lg py-2.5 pr-9 pl-3 text-slate-800 outline-none"
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#667085] leading-relaxed pt-1">
            بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بمنصة Sheetora.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#126B45] hover:bg-[#0B3527] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب مجاناً'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#667085]">
          لديك حساب بالفعل؟{' '}
          <Link to="/auth/login" className="font-bold text-[#126B45] hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};
