import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Templates } from './pages/Templates';
import { TemplateDetail } from './pages/TemplateDetail';
import { CategoryTemplates } from './pages/CategoryTemplates';
import { Services } from './pages/Services';
import { ServiceDataAnalysis } from './pages/ServiceDataAnalysis';
import { ServiceCustomExcel } from './pages/ServiceCustomExcel';
import { ServiceWebDevelopment } from './pages/ServiceWebDevelopment';
import { RequestService } from './pages/RequestService';
import { Pricing } from './pages/Pricing';
import { Advertise } from './pages/Advertise';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Account Pages
import { AccountLayout } from './pages/account/AccountLayout';
import { AccountProfile } from './pages/account/AccountProfile';
import { AccountDownloads } from './pages/account/AccountDownloads';
import { AccountOrders } from './pages/account/AccountOrders';
import { AccountRequests } from './pages/account/AccountRequests';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminTemplates } from './pages/admin/AdminTemplates';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminRequests } from './pages/admin/AdminRequests';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminAdvertising } from './pages/admin/AdminAdvertising';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Main Public Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="templates" element={<Templates />} />
                <Route path="templates/:slug" element={<TemplateDetail />} />
                <Route path="categories/:slug" element={<CategoryTemplates />} />
                <Route path="services" element={<Services />} />
                <Route path="services/data-analysis" element={<ServiceDataAnalysis />} />
                <Route path="services/custom-excel" element={<ServiceCustomExcel />} />
                <Route path="services/web-development" element={<ServiceWebDevelopment />} />
                <Route path="request-service" element={<RequestService />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="advertise" element={<Advertise />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />

                {/* Authentication Routes */}
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/register" element={<Register />} />
                <Route path="auth/forgot-password" element={<ForgotPassword />} />

                {/* Customer Account Routes */}
                <Route path="account" element={<AccountLayout />}>
                  <Route index element={<AccountProfile />} />
                  <Route path="downloads" element={<AccountDownloads />} />
                  <Route path="orders" element={<AccountOrders />} />
                  <Route path="requests" element={<AccountRequests />} />
                </Route>
              </Route>

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="templates" element={<AdminTemplates />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="requests" element={<AdminRequests />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="advertising" element={<AdminAdvertising />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Catch-all 404 Route */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen bg-[#F8FAF7] flex flex-col items-center justify-center p-4 text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
                    <p className="text-sm text-[#667085] mb-6">الصفحة المطلوبة غير موجودة أو تم نقلها.</p>
                    <a
                      href="/"
                      className="px-5 py-2.5 bg-[#126B45] text-white text-xs font-semibold rounded-xl"
                    >
                      العودة للرئيسية
                    </a>
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
