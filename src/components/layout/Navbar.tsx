import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  FileSpreadsheet,
  Briefcase,
  Megaphone,
  LayoutDashboard,
  LogOut,
  FolderDown,
  FileText,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/templates?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'ملفات Excel', path: '/templates' },
    { name: 'الخدمات', path: '/services' },
    { name: 'للشركات', path: '/request-service' },
    { name: 'الأسعار', path: '/pricing' },
    { name: 'أعلن معنا', path: '/advertise' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-[#126B45] relative py-1 ${
                    isActive
                      ? 'text-[#126B45] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#126B45]'
                      : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search bar (desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative max-w-xs w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن قالب، ميزانية، رواتب..."
              className="w-full bg-[#F8FAF7] border border-[#E5E7EB] focus:border-[#126B45] focus:bg-white text-xs rounded-lg py-2 pr-9 pl-4 text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </form>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline uppercase">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-[#126B45] hover:bg-slate-100 rounded-lg transition-colors"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#126B45] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth section */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#E5E7EB] hover:border-slate-300 text-xs font-semibold text-slate-800 bg-white transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#126B45]/15 text-[#126B45] flex items-center justify-center font-bold text-xs">
                    {user.full_name.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[110px] truncate">{user.full_name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-2 z-50 text-xs text-slate-700"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-900 truncate">{user.full_name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-50 text-[#126B45] font-semibold transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>لوحة التحكم الإدارية</span>
                      </Link>
                    )}

                    <Link
                      to="/account"
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>الملف الشخصي</span>
                    </Link>

                    <Link
                      to="/account/downloads"
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <FolderDown className="w-4 h-4 text-slate-400" />
                      <span>تنزيلاتي وتراخيصي</span>
                    </Link>

                    <Link
                      to="/account/requests"
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>طلبات المشاريع</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-right flex items-center gap-2.5 px-4 py-2 hover:bg-rose-50 text-rose-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#126B45] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/auth/register"
                  className="px-3 py-1.5 text-xs font-semibold bg-[#126B45] hover:bg-[#0B3527] text-white rounded-lg transition-colors shadow-xs"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E5E7EB] space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن قوالب إكسل..."
                className="w-full bg-[#F8FAF7] border border-[#E5E7EB] text-xs rounded-lg py-2 pr-9 pl-4 text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </form>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-[#126B45]"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-[#126B45] bg-emerald-50"
                >
                  لوحة الإدارة (Admin)
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
