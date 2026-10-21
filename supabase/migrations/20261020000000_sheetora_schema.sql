-- ==============================================================================
-- SHEETORA (شيتورا) - DATABASE SCHEMA MIGRATION
-- 21 Production Tables with Types, Constraints, Foreign Keys & Indexes
-- ==============================================================================

-- 1. Profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    preferred_language VARCHAR(5) DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'en')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. User Roles (Restricted write - only service_role/admin)
CREATE TYPE public.app_user_role AS ENUM ('customer', 'contributor', 'admin');

CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_user_role DEFAULT 'customer' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, role)
);

-- 3. Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Templates
CREATE TYPE public.template_status_type AS ENUM ('draft', 'published', 'archived');

CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ar TEXT NOT NULL,
    title_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    price_egp NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price_egp >= 0),
    is_free BOOLEAN NOT NULL DEFAULT FALSE,
    storage_path TEXT NOT NULL, -- Private object in sheetora-files
    preview_image_path TEXT NOT NULL,
    file_extension VARCHAR(10) NOT NULL DEFAULT 'xlsx' CHECK (file_extension IN ('xlsx', 'xlsm', 'xltx', 'zip')),
    file_size_bytes BIGINT DEFAULT 0 NOT NULL,
    version VARCHAR(20) DEFAULT '1.0' NOT NULL,
    compatibility TEXT DEFAULT 'Excel 2016+, Office 365, Google Sheets',
    status public.template_status_type DEFAULT 'draft' NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT check_free_price_consistency CHECK (
        (is_free = TRUE AND price_egp = 0) OR
        (is_free = FALSE AND price_egp >= 0)
    )
);

-- 5. Template Tags
CREATE TABLE IF NOT EXISTS public.template_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    CONSTRAINT uq_template_tag UNIQUE (template_id, tag)
);

-- 6. Template Images
CREATE TABLE IF NOT EXISTS public.template_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text_ar TEXT,
    sort_order INT DEFAULT 0 NOT NULL
);

-- 7. Orders
CREATE TYPE public.order_status_type AS ENUM ('pending', 'paid', 'failed', 'cancelled', 'refunded');

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    total_egp NUMERIC(10, 2) NOT NULL CHECK (total_egp >= 0),
    currency VARCHAR(5) DEFAULT 'EGP' NOT NULL,
    status public.order_status_type DEFAULT 'pending' NOT NULL,
    payment_provider TEXT DEFAULT 'paymob' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    paid_at TIMESTAMPTZ
);

-- 8. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE RESTRICT,
    title_snapshot TEXT NOT NULL,
    unit_price_egp NUMERIC(10, 2) NOT NULL CHECK (unit_price_egp >= 0),
    quantity INT DEFAULT 1 NOT NULL CHECK (quantity > 0),
    subtotal_egp NUMERIC(10, 2) NOT NULL CHECK (subtotal_egp >= 0),
    CONSTRAINT uq_order_item UNIQUE (order_id, template_id)
);

-- 9. Payments
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    provider_reference TEXT UNIQUE,
    amount_egp NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(5) DEFAULT 'EGP' NOT NULL,
    status TEXT NOT NULL,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. Download Logs (Records authorized downloads)
CREATE TABLE IF NOT EXISTS public.download_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    downloaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. Service Requests
CREATE TYPE public.service_category_type AS ENUM ('data_analysis', 'custom_excel', 'web_development');
CREATE TYPE public.service_req_status_type AS ENUM (
    'new', 'reviewing', 'awaiting_customer', 'quoted', 'approved', 'in_progress', 'delivered', 'completed', 'cancelled'
);

CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    service_type public.service_category_type NOT NULL,
    project_title TEXT NOT NULL,
    company_name TEXT,
    description TEXT NOT NULL,
    business_objectives TEXT,
    deliverables TEXT,
    budget_min_egp NUMERIC(10, 2),
    budget_max_egp NUMERIC(10, 2),
    deadline DATE,
    status public.service_req_status_type DEFAULT 'new' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. Service Attachments
CREATE TABLE IF NOT EXISTS public.service_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. Quotations
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
    quote_number TEXT UNIQUE NOT NULL,
    amount_egp NUMERIC(10, 2) NOT NULL CHECK (amount_egp > 0),
    scope TEXT NOT NULL,
    status TEXT DEFAULT 'sent' NOT NULL CHECK (status IN ('draft', 'sent', 'accepted', 'declined', 'expired')),
    expires_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. Service Orders
CREATE TABLE IF NOT EXISTS public.service_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
    quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount_egp NUMERIC(10, 2) NOT NULL,
    payment_status TEXT DEFAULT 'pending' NOT NULL,
    work_status TEXT DEFAULT 'in_progress' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. Advertising Inquiries
CREATE TABLE IF NOT EXISTS public.advertising_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    budget_egp NUMERIC(10, 2),
    campaign_objective TEXT NOT NULL,
    preferred_placements TEXT[] NOT NULL,
    desired_start_date DATE,
    desired_end_date DATE,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'reviewed', 'contacted', 'contracted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. Ad Campaigns
CREATE TYPE public.ad_placement_type AS ENUM (
    'homepage_banner', 'homepage_featured_sponsor', 'category_sponsored', 'sidebar_placement'
);
CREATE TYPE public.ad_status_type AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');

CREATE TABLE IF NOT EXISTS public.ad_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    advertiser_name TEXT NOT NULL,
    title TEXT NOT NULL,
    placement public.ad_placement_type NOT NULL,
    creative_storage_path TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    pricing_model VARCHAR(10) DEFAULT 'fixed' NOT NULL CHECK (pricing_model IN ('fixed', 'cpc', 'cpm')),
    price_egp NUMERIC(10, 2),
    budget_egp NUMERIC(10, 2),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    status public.ad_status_type DEFAULT 'active' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 17. Ad Events
CREATE TABLE IF NOT EXISTS public.ad_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
    event_type VARCHAR(15) NOT NULL CHECK (event_type IN ('impression', 'click')),
    occurred_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 18. Contributor Profiles
CREATE TABLE IF NOT EXISTS public.contributor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    bio TEXT,
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 19. Contributor Submissions
CREATE TABLE IF NOT EXISTS public.contributor_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contributor_id UUID NOT NULL REFERENCES public.contributor_profiles(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.templates(id) ON DELETE SET NULL,
    submission_status TEXT DEFAULT 'pending' NOT NULL CHECK (submission_status IN ('pending', 'under_review', 'approved', 'rejected')),
    reviewer_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 20. Contributor Payouts
CREATE TABLE IF NOT EXISTS public.contributor_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contributor_id UUID NOT NULL REFERENCES public.contributor_profiles(id) ON DELETE CASCADE,
    amount_egp NUMERIC(10, 2) NOT NULL CHECK (amount_egp > 0),
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 21. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Database Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_templates_published ON public.templates(status, is_featured) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_templates_slug ON public.templates(slug);
CREATE INDEX IF NOT EXISTS idx_templates_category ON public.templates(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_download_logs_user_tpl ON public.download_logs(user_id, template_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_active ON public.ad_campaigns(placement, status, start_at, end_at);
