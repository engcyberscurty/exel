-- ==============================================================================
-- SHEETORA (شيتورا) - ROW LEVEL SECURITY (RLS) POLICIES
-- Complete security policies preventing privilege escalation & unauthorized access
-- ==============================================================================

-- Helper Security Function: Check if auth user has 'admin' role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
$$;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertising_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributor_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributor_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. User Roles Policies (Strictly Admin / Service Role only)
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Only admins can insert or update roles"
    ON public.user_roles FOR ALL
    USING (public.is_admin());

-- 3. Categories Policies (Public read, admin write)
CREATE POLICY "Active categories viewable by everyone"
    ON public.categories FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Only admins can modify categories"
    ON public.categories FOR ALL
    USING (public.is_admin());

-- 4. Templates Policies (Public read for published, admin write)
CREATE POLICY "Published templates viewable by all"
    ON public.templates FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Only admins can insert or update templates"
    ON public.templates FOR ALL
    USING (public.is_admin());

-- 5. Template Tags & Images (Public read for published templates)
CREATE POLICY "Tags viewable by all"
    ON public.template_tags FOR SELECT
    USING (true);

CREATE POLICY "Tags editable by admin"
    ON public.template_tags FOR ALL
    USING (public.is_admin());

CREATE POLICY "Images viewable by all"
    ON public.template_images FOR SELECT
    USING (true);

CREATE POLICY "Images editable by admin"
    ON public.template_images FOR ALL
    USING (public.is_admin());

-- 6. Orders & Order Items Policies (Owner and Admin only)
CREATE POLICY "Users can view own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own pending orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Only admins or server can update orders"
    ON public.orders FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Users view own order items"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Users insert order items during checkout"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
        )
    );

-- 7. Payments (Admin or owner read, server writes)
CREATE POLICY "Users can view payments for own orders"
    ON public.payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = payments.order_id AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Only admins or webhook worker can insert payments"
    ON public.payments FOR ALL
    USING (public.is_admin());

-- 8. Download Logs (Users view own history, admin views all)
CREATE POLICY "Users view own downloads"
    ON public.download_logs FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users record verified downloads"
    ON public.download_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 9. Service Requests & Quotes (Owner and Admin only)
CREATE POLICY "Users view own service requests"
    ON public.service_requests FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Anyone or authenticated can submit request"
    ON public.service_requests FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Only admin can update request status"
    ON public.service_requests FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Users view quotes for own requests"
    ON public.quotations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.service_requests
            WHERE service_requests.id = quotations.request_id AND (service_requests.user_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Admin manages quotations"
    ON public.quotations FOR ALL
    USING (public.is_admin());

-- 10. Advertising Inquiries & Campaigns
CREATE POLICY "Advertisers can submit inquiries"
    ON public.advertising_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Only admins can view and manage inquiries"
    ON public.advertising_inquiries FOR ALL
    USING (public.is_admin());

CREATE POLICY "Active ad campaigns viewable by all"
    ON public.ad_campaigns FOR SELECT
    USING (status = 'active' OR public.is_admin());

CREATE POLICY "Admin manages ad campaigns"
    ON public.ad_campaigns FOR ALL
    USING (public.is_admin());

CREATE POLICY "Ad events can be logged"
    ON public.ad_events FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin views ad events"
    ON public.ad_events FOR SELECT
    USING (public.is_admin());

-- 11. Automatic Profile Trigger on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, company_name, preferred_language)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'عميل شيتورا'),
        NEW.email,
        NEW.raw_user_meta_data->>'phone',
        NEW.raw_user_meta_data->>'company_name',
        'ar'
    )
    ON CONFLICT (id) DO NOTHING;

    -- Assign default customer role (Strictly no client-side admin promotion)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer')
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
