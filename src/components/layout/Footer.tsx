import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Mail, Phone, MapPin, ShieldCheck, FileSpreadsheet, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B3527] text-white border-t border-emerald-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo isLight={true} />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              المنصة العربية المتخصصة في تزويد رواد الأعمال والشركات في مصر والوطن العربي بأقوى قوالب Excel الجاهزة، حلول تحليل البيانات المتقدمة، وبناء الأنظمة الرقمية المخصصة.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>القاهرة، جمهورية مصر العربية</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@sheetora.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تخزين سحابي آمن وتشفير كامل للملفات</span>
              </div>
            </div>
          </div>

          {/* Excel Marketplace */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>قوالب Excel</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/categories/accounting-finance" className="hover:text-emerald-300 transition-colors">
                  المحاسبة والمالية
                </Link>
              </li>
              <li>
                <Link to="/categories/hr-payroll" className="hover:text-emerald-300 transition-colors">
                  الموارد البشرية والرواتب
                </Link>
              </li>
              <li>
                <Link to="/categories/inventory" className="hover:text-emerald-300 transition-colors">
                  إدارة المخزون والمستودعات
                </Link>
              </li>
              <li>
                <Link to="/categories/sales-profit" className="hover:text-emerald-300 transition-colors">
                  المبيعات ومسارات الـ CRM
                </Link>
              </li>
              <li>
                <Link to="/categories/dashboards-analytics" className="hover:text-emerald-300 transition-colors">
                  لوحات التحكم ومؤشرات KPI
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400">
                  عرض جميع القوالب &larr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">خدمات الشركات</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/services/data-analysis" className="hover:text-emerald-300 transition-colors">
                  تحليل البيانات وإعداد التقارير
                </Link>
              </li>
              <li>
                <Link to="/services/custom-excel" className="hover:text-emerald-300 transition-colors">
                  تطوير شيتات مخصصة ونماذج مالية
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="hover:text-emerald-300 transition-colors">
                  تصميم وتطوير المواقع والأنظمة
                </Link>
              </li>
              <li>
                <Link to="/request-service" className="hover:text-emerald-300 transition-colors">
                  طلب عرض سعر مخصص
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-emerald-300 transition-colors">
                  باقات الدعم والاستشارات
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">المنصة والأمان</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">
                  عن Sheetora
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="hover:text-emerald-300 transition-colors">
                  أعلن معنا ورعاية الأقسام
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-300 transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-300 transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-300 transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة Sheetora (شيتورا). المعاملات بالجنيه المصري (EGP).
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>النسخة الإنتاجية v1.0</span>
            <span>·</span>
            <span>القاهرة - مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
