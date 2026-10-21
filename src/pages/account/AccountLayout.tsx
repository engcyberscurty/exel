import React from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { User, FolderDown, FileText, ShoppingBag, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountLayout: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const navItems = [
    { name: 'الملف الشخصي', path: '/account', icon: User, end: true },
    { name: 'قوالبي وتنزيلاتي', path: '/account/downloads', icon: FolderDown, end: false },
    { name: 'الفواتير والطلبات', path: '/account/orders', icon: ShoppingBag, end: false },
    { name: 'طلبات المشاريع المخصصة', path: '/account/requests', icon: FileText, end: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#126B45]/15 text-[#126B45] font-black text-base flex items-center justify-center">
                {user.full_name.charAt(0)}
              </div>
              <div className="truncate">
                <h3 className="font-bold text-sm text-slate-900 truncate">{user.full_name}</h3>
                <span className="text-[11px] text-[#667085] truncate block">{user.email}</span>
              </div>
            </div>

            <nav className="mt-4 space-y-1 text-xs font-medium">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
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

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold transition-colors mt-2"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0 text-[#126B45]" />
                  <span>لوحة تحكم الإدارة (Admin)</span>
                </Link>
              )}

              <button
                type="button"
                onClick={logout}
                className="w-full text-right flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-medium transition-colors mt-2"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>تسجيل الخروج</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Content Outlet */}
        <main className="lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
