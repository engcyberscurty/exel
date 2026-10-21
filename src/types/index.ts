export type UserRole = 'customer' | 'contributor' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  company_name?: string | null;
  preferred_language: 'ar' | 'en';
  role: UserRole;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description?: string | null;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export type TemplateStatus = 'draft' | 'published' | 'archived';

export interface Template {
  id: string;
  title_ar: string;
  title_en?: string;
  slug: string;
  short_description: string;
  description: string;
  category_id: string;
  category?: Category;
  price_egp: number;
  is_free: boolean;
  storage_path: string;
  preview_image_path: string;
  gallery_images?: string[];
  file_extension: 'xlsx' | 'xlsm' | 'xltx' | 'zip';
  file_size_bytes: number;
  version: string;
  compatibility?: string;
  features?: string[];
  status: TemplateStatus;
  is_featured: boolean;
  download_count?: number;
  created_by?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  template_id: string;
  template?: Template;
  title_snapshot: string;
  unit_price_egp: number;
  quantity: number;
  subtotal_egp: number;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  total_egp: number;
  currency: 'EGP';
  status: OrderStatus;
  payment_provider: string;
  created_at: string;
  paid_at?: string | null;
  items?: OrderItem[];
}

export interface DownloadLog {
  id: string;
  user_id: string;
  template_id: string;
  order_id?: string | null;
  downloaded_at: string;
  template?: Template;
}

export type ServiceType = 'data_analysis' | 'custom_excel' | 'web_development';

export type ServiceRequestStatus =
  | 'new'
  | 'reviewing'
  | 'awaiting_customer'
  | 'quoted'
  | 'approved'
  | 'in_progress'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export interface ServiceRequest {
  id: string;
  request_number: string;
  user_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_type: ServiceType;
  project_title: string;
  company_name?: string | null;
  description: string;
  business_objectives?: string;
  deliverables?: string | null;
  budget_min_egp?: number | null;
  budget_max_egp?: number | null;
  deadline?: string | null;
  status: ServiceRequestStatus;
  created_at: string;
  updated_at: string;
  quotes?: Quotation[];
  attachments?: ServiceAttachment[];
}

export interface ServiceAttachment {
  id: string;
  request_id: string;
  storage_path: string;
  original_filename: string;
  content_type: string;
  size_bytes: number;
  created_at: string;
}

export interface Quotation {
  id: string;
  request_id: string;
  quote_number: string;
  amount_egp: number;
  scope: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
  expires_at?: string | null;
  accepted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type AdPlacement =
  | 'homepage_banner'
  | 'homepage_featured_sponsor'
  | 'category_sponsored'
  | 'sidebar_placement';

export type AdStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

export interface AdCampaign {
  id: string;
  advertiser_name: string;
  title: string;
  placement: AdPlacement;
  creative_storage_path: string;
  destination_url: string;
  pricing_model: 'fixed' | 'cpc' | 'cpm';
  price_egp?: number | null;
  budget_egp?: number | null;
  start_at: string;
  end_at: string;
  status: AdStatus;
  impressions_count?: number;
  clicks_count?: number;
  created_at: string;
  updated_at: string;
}

export interface AdvertisingInquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  budget_egp?: number | null;
  campaign_objective: string;
  preferred_placements: AdPlacement[];
  desired_start_date?: string | null;
  desired_end_date?: string | null;
  status: 'new' | 'reviewed' | 'contacted' | 'contracted' | 'rejected';
  created_at: string;
}

export interface ContributorProfile {
  id: string;
  user_id: string;
  display_name: string;
  bio?: string | null;
  status: 'pending' | 'approved' | 'suspended';
  created_at: string;
}
