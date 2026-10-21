import React, { useState } from 'react';
import { Megaphone, Plus, Pause, Play, Archive, Eye, MousePointerClick, CheckCircle2, X } from 'lucide-react';
import { INITIAL_AD_CAMPAIGNS } from '../../data/seedData';
import { AdCampaign, AdPlacement, AdStatus } from '../../types';

export const AdminAdvertising: React.FC = () => {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_AD_CAMPAIGNS);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [advertiserName, setAdvertiserName] = useState('');
  const [placement, setPlacement] = useState<AdPlacement>('homepage_banner');
  const [creativeUrl, setCreativeUrl] = useState('');
  const [destUrl, setDestUrl] = useState('');
  const [priceEgp, setPriceEgp] = useState('1500');

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus: AdStatus = c.status === 'active' ? 'paused' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    setNotice('تم تحديث حالة الحملة الإعلانية.');
    setTimeout(() => setNotice(null), 3000);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !advertiserName.trim() || !destUrl.trim()) return;

    const newAd: AdCampaign = {
      id: `ad-${Date.now()}`,
      title: title.trim(),
      advertiser_name: advertiserName.trim(),
      placement,
      creative_storage_path: creativeUrl.trim() || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80',
      destination_url: destUrl.trim(),
      pricing_model: 'fixed',
      price_egp: Number(priceEgp) || 1500,
      start_at: new Date().toISOString(),
      end_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      impressions_count: 0,
      clicks_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setCampaigns([newAd, ...campaigns]);
    setModalOpen(false);
    setTitle('');
    setAdvertiserName('');
    setDestUrl('');
    setNotice('تم إطلاق وتفعيل الحملة الإعلانية بنجاح.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">إدارة الحملات الإعلانية والرعاية</h1>
          <p className="text-xs text-[#667085] mt-1">
            التحكم في البانرات والمساحات الترويجية المعتمدة ومراقبة النقرات والظهور
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#126B45] hover:bg-[#0B3527] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء حملة إعلانية</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#126B45]" />
          <span>{notice}</span>
        </div>
      )}

      {/* Campaigns Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAF7] border-b border-[#E5E7EB] text-[#667085] font-semibold">
              <tr>
                <th className="p-4">الحملة والمعلن</th>
                <th className="p-4">الموضع (Placement)</th>
                <th className="p-4">الظهور (Impressions)</th>
                <th className="p-4">النقرات (Clicks)</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">التحكم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {campaigns.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{ad.title}</div>
                    <div className="text-[11px] text-[#667085] mt-0.5">{ad.advertiser_name}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-mono">
                      {ad.placement}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {ad.impressions_count || 0}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <MousePointerClick className="w-3.5 h-3.5 text-[#126B45]" />
                      {ad.clicks_count || 0}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        ad.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {ad.status === 'active' ? 'نشطة' : 'متوقفة'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(ad.id)}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 rounded-md text-[11px] font-medium"
                    >
                      {ad.status === 'active' ? 'إيقاف مؤقت' : 'تفعيل'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">إنشاء حملة إعلانية جديدة</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  عنوان الإعلان / الرسالة الترويجية <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: استشارات تأسيس الشركات والقوائم المالية"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    اسم المعلن أو الشركة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={advertiserName}
                    onChange={(e) => setAdvertiserName(e.target.value)}
                    placeholder="مكتب الدلتا للاستشارات"
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    الموضع (Placement)
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value as any)}
                    className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none cursor-pointer"
                  >
                    <option value="homepage_banner">بانر الصفحة الرئيسية</option>
                    <option value="homepage_featured_sponsor">شريك معتمد مميز</option>
                    <option value="category_sponsored">رعاية الأقسام المتخصصة</option>
                    <option value="sidebar_placement">الشريط الجانبي للمتجر</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  رابط الوجهة (Destination URL) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={destUrl}
                  onChange={(e) => setDestUrl(e.target.value)}
                  placeholder="https://partner-website.com"
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  رابط صورة البانر (Creative Image URL)
                </label>
                <input
                  type="url"
                  value={creativeUrl}
                  onChange={(e) => setCreativeUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-2.5 outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#126B45] hover:bg-[#0B3527] text-white rounded-lg font-semibold"
                >
                  إطلاق الحملة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
