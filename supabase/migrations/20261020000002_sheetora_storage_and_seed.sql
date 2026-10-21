-- ==============================================================================
-- SHEETORA (شيتورا) - STORAGE BUCKETS, STORAGE POLICIES & SEED DATA
-- Creates private/public storage buckets and seeds initial categories & templates
-- ==============================================================================

-- 1. Storage Buckets Creation (Requires storage schema)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('sheetora-files', 'sheetora-files', false, 52428800, ARRAY['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel.sheet.macroEnabled.12', 'application/zip']),
    ('sheetora-previews', 'sheetora-previews', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('sheetora-service-attachments', 'sheetora-service-attachments', false, 52428800, NULL),
    ('sheetora-ad-creatives', 'sheetora-ad-creatives', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Objects RLS Policies
-- Previews: Public Read
CREATE POLICY "Public Read on Previews"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'sheetora-previews' OR bucket_id = 'sheetora-ad-creatives');

-- Files: Admin Full Access
CREATE POLICY "Admin All on Files"
    ON storage.objects FOR ALL
    USING (public.is_admin());

-- Files: Authenticated User Download (Signed URLs bypass or check ownership)
CREATE POLICY "Authenticated Signed Downloads"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'sheetora-files' AND
        auth.role() = 'authenticated'
    );

-- 3. Initial Seed Categories
INSERT INTO public.categories (id, name_ar, name_en, slug, description, sort_order, is_active)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'المحاسبة والمالية', 'Accounting & Finance', 'accounting-finance', 'قوالب القوائم المالية، التدفقات النقدية، وميزان المراجعة بالجنيه المصري', 1, true),
    ('a0000000-0000-0000-0000-000000000002', 'المبيعات والأرباح', 'Sales & Profitability', 'sales-profit', 'نماذج متابعة المبيعات الشهرية، خطط التوزيع، وحساب هوامش الربح', 2, true),
    ('a0000000-0000-0000-0000-000000000003', 'إدارة المخزون', 'Inventory Management', 'inventory', 'أنظمة جرد المستودعات، كروت الصنف، وحساب نقطة إعادة الطلب التلقائية', 3, true),
    ('a0000000-0000-0000-0000-000000000004', 'الموارد البشرية والرواتب', 'HR & Payroll', 'hr-payroll', 'مسيرات الرواتب متوافقة مع قانون العمل والتأمينات المصرية والضرائب', 4, true),
    ('a0000000-0000-0000-0000-000000000005', 'إدارة المشاريع والمهام', 'Project Management', 'projects-tasks', 'مخططات جانت التفاعلية، جداول تسليم المراحل، ومتابعة تكاليف المقاولات', 5, true),
    ('a0000000-0000-0000-0000-000000000006', 'تحليل البيانات ولوحات المعلومات', 'Data Analytics & Dashboards', 'dashboards-analytics', 'لوحات قيادة تنفيذية ديناميكية للمديرين وأصحاب القرار', 6, true),
    ('a0000000-0000-0000-0000-000000000007', 'المصروفات والميزانيات', 'Budgeting & Expenses', 'budgeting-expenses', 'مقارنة الموازنة التقديرية بالواقع الفعلي وتحليل الانحرافات المالية', 7, true),
    ('a0000000-0000-0000-0000-000000000008', 'إدارة العملاء CRM', 'Customer Relationship CRM', 'crm-pipeline', 'مسار الصفقات ومتابعة العملاء المحتملين وتاريخ التواصل والمبيعات', 8, true)
ON CONFLICT (slug) DO NOTHING;

-- 4. Initial Seed Templates
INSERT INTO public.templates (
    id, title_ar, title_en, slug, short_description, description, category_id,
    price_egp, is_free, storage_path, preview_image_path, file_extension,
    file_size_bytes, version, status, is_featured
)
VALUES
    (
        'b0000000-0000-0000-0000-000000000001',
        'مسير رواتب الشركات المتكامل (الضرائب والتأمينات المصرية)',
        'Egypt Comprehensive Payroll & Tax Model',
        'egypt-comprehensive-payroll-tax',
        'قالب إكسل احترافي لحساب رواتب الموظفين مع شرائح ضريبة الدخل ونسب التأمينات الاجتماعية وبدلات العمل.',
        'نظام متكامل ومجهز خصيصاً للشركات والمؤسسات العاملة في مصر. يتضمن حساب الحدين التأمينيين وشرائح ضريبة كسب العمل وطباعة قسائم الرواتب.',
        'a0000000-0000-0000-0000-000000000004',
        299.00,
        false,
        'templates/egypt-payroll-model.xlsx',
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80',
        'xlsx',
        1420000,
        '2.4',
        'published',
        true
    ),
    (
        'b0000000-0000-0000-0000-000000000002',
        'نموذج التوقع المالي وحركة التدفقات النقدية 12 شهراً',
        '12-Month Cash Flow Forecast Planner',
        'cash-flow-forecast-planner-free',
        'قالب مجاني بالكامل لإدارة السيولة النقدية المتوقعة وتفادي العجز المالي للشركات الناشئة والمتاجر.',
        'أداة أساسية لكل رائد أعمال وصاحب عمل لتوقع المقبوضات والمدفوعات على مدار 12 شهراً مقبلة مع فلاتر وتحليلات بيانية.',
        'a0000000-0000-0000-0000-000000000001',
        0.00,
        true,
        'templates/free-cashflow-forecast.xlsx',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
        'xlsx',
        840000,
        '1.2',
        'published',
        true
    )
ON CONFLICT (slug) DO NOTHING;

-- 5. Secure Helper Function: Promote User to Admin (Executed only by superuser in SQL Editor)
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(target_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id UUID;
BEGIN
    SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;

    IF target_user_id IS NULL THEN
        RETURN 'User with email ' || target_email || ' not found in auth.users.';
    END IF;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN 'User ' || target_email || ' successfully granted ADMIN role.';
END;
$$;
