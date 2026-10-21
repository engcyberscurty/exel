import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSpreadsheet,
  FolderTree,
  FileText,
  ShoppingBag,
  Megaphone,
  Settings,
  ShieldAlert,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, switchMockRole } = useAuth();

  // Strict role verification:
  if (!user || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white border border-rose-200 rounded-2xl text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">غير مصرح بالدخول (Unauthorized 403)</h1>
        <p className="text-xs text-[#667085] leading-relaxed">
          هذه المنطقة مخصصة حصرياً لمديري منصة Sheetora. حسابك الحالي يحمل دور: <strong className="text-slate-800">{user?.role || 'زائر غير مسجل'}</strong>.
        </p>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => switchMockRole('admin')}
            className="w-full sm:w-auto px-4 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>التبديل إلى حساب المدير (Admin) للمعاينة</span>
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            العودة للمتجر الرئيسي
          </Link>
        </div>
      </div>
    );
  }

  const adminNav = [
    { name: 'نظرة عامة والتقارير', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'إدارة قوالب Excel', path: '/admin/templates', icon: FileSpreadsheet, end: false },
    { name: 'التصنيفات والأقسام', path: '/admin/categories', icon: FolderTree, end: false },
    { name: 'طلبات المشاريع وعروض الأسعار', path: '/admin/requests', icon: FileText, end: false },
    { name: 'الطلبات والمدفوعات', path: '/admin/orders', icon: ShoppingBag, end: false },
    { name: 'الحملات الإعلانية والرعاية', path: '/admin/advertising', icon: Megaphone, end: false },
    { name: 'إعدادات المنصة وسجل التدقيق', path: '/admin/settings', icon: Settings, end: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col">
      {/* Admin Top Header */}
      <div className="bg-[#0B3527] text-white border-b border-emerald-900 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo isLight={true} />
          <span className="hidden sm:inline text-xs bg-emerald-800/60 text-emerald-200 px-2 py-0.5 rounded font-mono">
            ADMIN CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-300 hidden sm:inline">
            مسجل باسم: <strong className="text-white font-semibold">{user.full_name}</strong>
          </span>
          <Link
            to="/"
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            <span>زيارة المتجر العام</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs sticky top-8">
            <h3 className="text-xs font-bold text-[#667085] px-3 py-2 uppercase tracking-wider">
              القائمة الإدارية
            </h3>
            <nav className="space-y-1 text-xs">
              {adminNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                        isActive
                          ? 'bg-[#126B45] text-white font-semibold shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
