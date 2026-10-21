import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { AdCampaign, AdPlacement } from '../../types';
import { INITIAL_AD_CAMPAIGNS } from '../../data/seedData';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const impressionRecorded = useRef(false);

  // Retrieve active campaign for this placement
  const campaign: AdCampaign | undefined = INITIAL_AD_CAMPAIGNS.find(
    (c) => c.placement === placement && c.status === 'active'
  );

  useEffect(() => {
    if (campaign && !impressionRecorded.current) {
      impressionRecorded.current = true;
      // In production: calls /api/ads/impression or supabase rpc 'record_ad_impression'
      // Avoids duplicate counting on multiple re-renders
    }
  }, [campaign]);

  if (!campaign) {
    return null;
  }

  const handleClick = () => {
    // In production: server click tracker endpoint
    if (campaign.destination_url.startsWith('http') || campaign.destination_url.startsWith('/')) {
      window.open(campaign.destination_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (placement === 'homepage_banner') {
    return (
      <div className={`w-full my-6 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs hover:border-[#126B45]/40 transition-colors ${className}`}>
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#F8FAF7] border-b border-[#E5E7EB] text-xs text-[#667085]">
          <span className="font-medium text-[#126B45]">محتوى برعاية · شريك معتمد</span>
          <span className="text-[11px]">{campaign.advertiser_name}</span>
        </div>
        <div
          onClick={handleClick}
          className="cursor-pointer p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={campaign.creative_storage_path}
                alt={campaign.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 group-hover:text-[#126B45] transition-colors text-base md:text-lg">
                {campaign.title}
              </h4>
              <p className="text-xs text-[#667085] mt-1">
                خدمات مرخصة لرواد الأعمال والشركات في جمهورية مصر العربية
              </p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#126B45]/10 text-[#126B45] hover:bg-[#126B45] hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <span>زيارة الموقع</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Sidebar or Category Placement
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs ${className}`}>
      <div className="flex items-center justify-between text-[11px] text-[#667085] mb-2">
        <span className="text-[#126B45] font-medium">إعلان</span>
        <span>{campaign.advertiser_name}</span>
      </div>
      <div
        onClick={handleClick}
        className="cursor-pointer group flex flex-col gap-2.5"
      >
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={campaign.creative_storage_path}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <p className="font-medium text-sm text-slate-800 group-hover:text-[#126B45] transition-colors leading-relaxed">
          {campaign.title}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#126B45] font-semibold mt-1">
          <span>اكتشف المزيد</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
