import { Category, Template, AdCampaign, ServiceRequest } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-accounting',
    name_ar: 'المحاسبة والمالية',
    name_en: 'Accounting & Finance',
    slug: 'accounting-finance',
    description: 'قوالب القوائم المالية، التدفقات النقدية، وميزان المراجعة بالجنيه المصري',
    icon: 'Calculator',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'cat-sales',
    name_ar: 'المبيعات والأرباح',
    name_en: 'Sales & Profitability',
    slug: 'sales-profit',
    description: 'نماذج متابعة المبيعات الشهرية، خطط التوزيع، وحساب هوامش الربح',
    icon: 'TrendingUp',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'cat-inventory',
    name_ar: 'إدارة المخزون',
    name_en: 'Inventory Management',
    slug: 'inventory',
    description: 'أنظمة جرد المستودعات، كروت الصنف، وحساب نقطة إعادة الطلب التلقائية',
    icon: 'Boxes',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'cat-hr',
    name_ar: 'الموارد البشرية والرواتب',
    name_en: 'HR & Payroll',
    slug: 'hr-payroll',
    description: 'مسيرات الرواتب متوافقة مع قانون العمل والتأمينات المصرية والضرائب',
    icon: 'Users',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'cat-projects',
    name_ar: 'إدارة المشاريع والمهام',
    name_en: 'Project Management',
    slug: 'projects-tasks',
    description: 'مخططات جانت التفاعلية، جداول تسليم المراحل، ومتابعة تكاليف المقاولات والمشاريع',
    icon: 'Calendar',
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'cat-bi',
    name_ar: 'تحليل البيانات ولوحات المعلومات',
    name_en: 'Data Analytics & Dashboards',
    slug: 'dashboards-analytics',
    description: 'لوحات قيادة تنفيذية ديناميكية للمديرين وأصحاب القرار',
    icon: 'BarChart3',
    sort_order: 6,
    is_active: true,
  },
  {
    id: 'cat-budget',
    name_ar: 'المصروفات والميزانيات',
    name_en: 'Budgeting & Expenses',
    slug: 'budgeting-expenses',
    description: 'مقارنة الموازنة التقديرية بالواقع الفعلي وتحليل الانحرافات المالية',
    icon: 'PieChart',
    sort_order: 7,
    is_active: true,
  },
  {
    id: 'cat-crm',
    name_ar: 'إدارة العملاء CRM',
    name_en: 'Customer Relationship CRM',
    slug: 'crm-pipeline',
    description: 'مسار الصفقات ومتابعة العملاء المحتملين وتاريخ التواصل والمبيعات',
    icon: 'Target',
    sort_order: 8,
    is_active: true,
  },
];

export const INITIAL_TEMPLATES: Template[] = [
  {
    id: 'tpl-egypt-payroll-2026',
    title_ar: 'مسير رواتب الشركات المتكامل (الضرائب والتأمينات المصرية)',
    title_en: 'Egypt Comprehensive Payroll & Tax Model',
    slug: 'egypt-comprehensive-payroll-tax',
    short_description: 'قالب إكسل احترافي لحساب رواتب الموظفين مع شرائح ضريبة الدخل ونسب التأمينات الاجتماعية وبدلات العمل.',
    description: `نظام متكامل ومجهز خصيصاً للشركات والمؤسسات العاملة في مصر.
    
مميزات القالب:
- حساب دقيق للحدين الأدنى والأقصى للأجر التأميني.
- حساب شرائح ضريبة كسب العمل وفقاً لآخر التحديثات القانونية مع الإعفاء الشخصي.
- استخراج قسائم الرواتب (Pay Slips) الفردية تلقائياً للطباعة.
- رصد الغيابات، التأخيرات، الإضافي، والسلف مع تقارير شهرية للمالية.
- معادلات ديناميكية بدون تعقيدات وبدون الحاجة لأكواد ماكرو معقدة لضمان أقصى توافقية.`,
    category_id: 'cat-hr',
    price_egp: 299,
    is_free: false,
    storage_path: 'templates/egypt-payroll-model.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 1420000,
    version: '2.4',
    compatibility: 'Microsoft Excel 2016+, Office 365, Google Sheets',
    features: [
      'حساب ضريبة كسب العمل المصرية آلياً',
      'تأمينات الموظف وحصة الشركة',
      'طباعة كشف المرتبات وقسيمة الراتب',
      'دليل استخدام توضيحي مرفق داخل الشيت'
    ],
    status: 'published',
    is_featured: true,
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-04-10T14:30:00Z',
  },
  {
    id: 'tpl-cashflow-planner-free',
    title_ar: 'نموذج التوقع المالي وحركة التدفقات النقدية 12 شهراً',
    title_en: '12-Month Cash Flow Forecast Planner',
    slug: 'cash-flow-forecast-planner-free',
    short_description: 'قالب مجاني بالكامل لإدارة السيولة النقدية المتوقعة وتفادي العجز المالي للشركات الناشئة والمتاجر.',
    description: `أداة أساسية لكل رائد أعمال وصاحب عمل لتوقع المقبوضات والمدفوعات على مدار 12 شهراً مقبلة.

أبرز المحتويات:
- جدول تدفقات نقدية تفصيلي يقارن بين الإيرادات المتوقعة والمصروفات الثابتة والمتغيرة.
- رسوم بيانية فورية توضح فجوة السيولة ونقطة الأمان النقدي.
- مؤشرات تحذيرية في حال انخفاض الرصيد عن الحد الأدنى المحدد مسبقاً.
- متاح للتحميل الفوري المجاني لجميع أعضاء شيتورا المسجلين.`,
    category_id: 'cat-accounting',
    price_egp: 0,
    is_free: true,
    storage_path: 'templates/free-cashflow-forecast.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 840000,
    version: '1.2',
    compatibility: 'Excel 2013+, Google Sheets, LibreOffice',
    features: [
      'توقع 12 شهر مقبل مع ملخص ربع سنوي',
      'رسوم بيانية تفاعلية لحركة السيولة',
      'سهل التعديل والتخصيص بحسب طبيعة النشاط',
      'مجاني 100% للأعضاء'
    ],
    status: 'published',
    is_featured: true,
    created_at: '2026-02-15T09:00:00Z',
    updated_at: '2026-03-20T11:00:00Z',
  },
  {
    id: 'tpl-warehouse-inventory-pro',
    title_ar: 'نظام إدارة المخازن الاحترافي وتنبيهات إعادة الطلب',
    title_en: 'Warehouse & Inventory Control Pro',
    slug: 'warehouse-inventory-control-pro',
    short_description: 'تحكم دقيق بحركة الوارد والمنصرف وكروت الصنف مع تنبيهات تلقائية بالأصناف الراكدة وقرب نفاد الكمية.',
    description: `صُمم هذا القالب للمستودعات، المتاجر الإلكترونية، والمحلات التجارية لضبط الجرد الفعلي ومنع الهدر.

أهم الخصائص:
- قاعدة بيانات للأصناف والموردين مع أكواد الباركود.
- تسجيل أذون الإضافة والصرف مع حساب تلقائي لمتوسط تكلفة الوحدة (Weighted Average).
- تلوين شرطي ذكي (Conditional Formatting) يبرز الأصناف التي وصلت لنقطة إعادة الطلب.
- تقرير جرد فوري بنقرة واحدة يعرض قيمة المخزون الحالي الإجمالية.`,
    category_id: 'cat-inventory',
    price_egp: 380,
    is_free: false,
    storage_path: 'templates/warehouse-inventory-pro.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 1850000,
    version: '3.0',
    compatibility: 'Microsoft Excel 2016+, Office 365',
    features: [
      'إدارة حتى 5000 صنف تجاري',
      'تنبيهات فورية عند وصول حد الأمان',
      'حساب متوسط تكلفة الشراء المرجح',
      'تقارير أرباح المبيعات حسب الصنف'
    ],
    status: 'published',
    is_featured: true,
    created_at: '2026-01-20T12:00:00Z',
    updated_at: '2026-04-05T09:15:00Z',
  },
  {
    id: 'tpl-sales-crm-pipeline',
    title_ar: 'إكسل CRM لمتابعة مسار مبيعات العملاء والصفقات',
    title_en: 'B2B & Retail Sales Pipeline CRM',
    slug: 'sales-crm-pipeline-tracker',
    short_description: 'بديل اقتصادي وفعال لبرامج الـ CRM المكلفة، لتتبع مراحل التفاوض مع العملاء ومعدلات الإغلاق.',
    description: `نظام متكامل لفرق المبيعات وأصحاب الأعمال الحرة لمتابعة العملاء المتوقعين من أول مكالمة حتى إتمام التعاقد.

المحتويات:
- شيت لتسجيل بيانات العميل، المسؤول، القيمة المتوقعة، وتاريخ المتابعة القادم.
- تصنيف المراحل: تواصل أولي، إرسال عرض سعر، تفاوض، فوز بالصفقة، خسارة.
- لوحة بيانات (Dashboard) تعرض نسبة التحويل (Conversion Rate) وحجم الصفقات المفتوحة.`,
    category_id: 'cat-crm',
    price_egp: 250,
    is_free: false,
    storage_path: 'templates/sales-crm-pipeline.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 1200000,
    version: '2.1',
    compatibility: 'Excel 2016+, Google Sheets',
    features: [
      'لوحة تحكم ديناميكية للمبيعات',
      'فلترة حسب مندوب المبيعات أو الشهر',
      'حساب معدل الفوز بالصفقات آلياً',
      'جاهز للطباعة وتصدير PDF'
    ],
    status: 'published',
    is_featured: true,
    created_at: '2026-02-05T14:00:00Z',
    updated_at: '2026-03-12T16:20:00Z',
  },
  {
    id: 'tpl-executive-kpi-dashboard',
    title_ar: 'لوحة قيادة مؤشرات الأداء التنفيذية KPI Dashboard',
    title_en: 'Executive KPI Performance Dashboard',
    slug: 'executive-kpi-dashboard-excel',
    short_description: 'شاشة إحصائية ديناميكية تفاعلية تلخص الأداء التشغيلي والمالي للمؤسسة مع فلاتر زمنية.',
    description: `حوّل بيانات شركتك الخام إلى لوحة قرارات مرئية فائقة الجمال والوضوح تعتمد على جداول محورية وشرائح تحكم (Slicers).
    
المزايا:
- مقارنة الأداء الفعلي بالمستهدف مع مؤشرات ألوان ذكية (أخضر / أصفر / أحمر).
- رسوم بيانية توضح مسار النمو والربحية وتكلفة الاستحواذ.
- تصميم أنيق واحترافي مناسب للعرض في اجتماعات مجلس الإدارة.`,
    category_id: 'cat-bi',
    price_egp: 450,
    is_free: false,
    storage_path: 'templates/executive-kpi-dashboard.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 2300000,
    version: '4.0',
    compatibility: 'Microsoft Excel 2016, 2019, 2021, Office 365',
    features: [
      'فلاتر Slicers لتغيير الشهور والأقسام بنقرة واحدة',
      'مؤشرات Speedometer ومقارنات Target vs Actual',
      'تصميم خالي من التعقيد قابل للتخصيص',
      'فيديو شرح إرشادي مبسط مرفق بالرابط'
    ],
    status: 'published',
    is_featured: true,
    created_at: '2026-03-15T08:30:00Z',
    updated_at: '2026-04-18T10:00:00Z',
  },
  {
    id: 'tpl-construction-project-gantt-free',
    title_ar: 'جدول متابعة المشاريع ومخطط جانت Gantt Chart تفاعلي',
    title_en: 'Project Schedule & Interactive Gantt Chart',
    slug: 'interactive-project-gantt-chart-free',
    short_description: 'قالب مجاني لتنظيم مهام فريق العمل، تواريخ البداية والنهاية، ونسبة الإنجاز مع شريط زمني مرئي.',
    description: `أداة بسيطة وعملية لكل من يدير مشروعاً أو مرحلة تنفيذية ويريد تتبع التقدم دون برامج ثقيلة.
    
المحتويات:
- إدخال المهام والمسؤول وتاريخ البدء وعدد الأيام.
- شريط زمني أفقي يتلون تلقائياً مع تحديث نسبة الإنجاز اليومية.
- إمكانية تمييز المهام الحرجة والمتأخرة بلون مخصص.`,
    category_id: 'cat-projects',
    price_egp: 0,
    is_free: true,
    storage_path: 'templates/free-project-gantt.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 650000,
    version: '1.5',
    compatibility: 'Excel 2013+, Google Sheets',
    features: [
      'مخطط جانت تلقائي يعتمد على التنسيق الشرطي',
      'متابعة نسب إنجاز المهام بالرقم والنسبة المئوية',
      'تحديد المسؤول وتواريخ التسليم',
      'تحميل فوري مجاني بعد التسجيل'
    ],
    status: 'published',
    is_featured: false,
    created_at: '2026-02-28T11:00:00Z',
    updated_at: '2026-03-30T15:00:00Z',
  },
  {
    id: 'tpl-restaurant-food-cost-budget',
    title_ar: 'حساب تكلفة الوجبات والأغذية للمطاعم والكافيهات Food Cost',
    title_en: 'Restaurant Recipe & Food Cost Calculator',
    slug: 'restaurant-recipe-food-cost-calculator',
    short_description: 'قالب متخصص لقطاع الضيافة لتسعير الأصناف والوجبات وضبط هدر المكونات والوصول للربحية المستهدفة.',
    description: `نظام دقيق لأصحاب المطاعم والمطابخ السحابية والكافيهات لحساب تكلفة كل طبق بالجرام والميلي وتحديد سعر البيع العادل.
    
المميزات:
- تسجيل أسعار المواد الخام والبهارات ومكونات التغليف.
- حساب نسبة Food Cost % تلقائياً مع توضيح هامش المساهمة (Contribution Margin).
- محاكاة أثر تغير أسعار الموردين على ربحية المنيو بالكامل بنقرة واحدة.`,
    category_id: 'cat-budget',
    price_egp: 320,
    is_free: false,
    storage_path: 'templates/restaurant-food-cost.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 1600000,
    version: '2.0',
    compatibility: 'Excel 2016+, Office 365, Google Sheets',
    features: [
      'حساب تكلفة الوصفات وتأثير الفاقد (Yield %)',
      'تحديد أسعار البيع المقترحة وفق نسبة التكلفة المستهدفة',
      'تقرير الأصناف الأكثر والأقل ربحية في القائمة',
      'ملف مبسط باللغة العربية مع نماذج جاهزة'
    ],
    status: 'published',
    is_featured: false,
    created_at: '2026-03-10T13:45:00Z',
    updated_at: '2026-04-02T12:00:00Z',
  },
  {
    id: 'tpl-fleet-vehicle-maintenance-free',
    title_ar: 'سجل إدارة حركة وصيانة السيارات والمعدات',
    title_en: 'Fleet Vehicle & Maintenance Log',
    slug: 'fleet-vehicle-maintenance-log-free',
    short_description: 'نموذج مجاني لتسجيل مصروفات الوقود، الصيانة الدورية، رخص المركبات، ومتابعة عداد الكيلومترات.',
    description: `صُمم هذا القالب للمؤسسات وشركات التوصيل التي تمتلك أسطول سيارات أو دراجات نارية أو معدات تشغيلية.
    
المحتويات:
- شيت لكل مركبة يسجل تغيير الزيوت والفلاتر والإطارات.
- تنبيهات بقرب انتهاء رخصة التسيير أو الفحص الفني.
- حساب معدل استهلاك الوقود لكل 100 كم واكتشاف الأعطال المفاجئة مبكراً.`,
    category_id: 'cat-projects',
    price_egp: 0,
    is_free: true,
    storage_path: 'templates/free-fleet-maintenance.xlsx',
    preview_image_path: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=900&auto=format&fit=crop&q=80',
    file_extension: 'xlsx',
    file_size_bytes: 780000,
    version: '1.1',
    compatibility: 'Excel 2013+, Google Sheets',
    features: [
      'تتبع عدادات الكيلومتر والصيانة الدورية',
      'مراقبة تكاليف الوقود الشهرية لكل سيارة',
      'تنبيهات مواعيد تجديد التراخيص والتأمين',
      'مجاني للتنزيل المباشر للأعضاء'
    ],
    status: 'published',
    is_featured: false,
    created_at: '2026-02-18T10:00:00Z',
    updated_at: '2026-03-25T14:10:00Z',
  }
];

export const INITIAL_AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'ad-banner-accounting-firm',
    advertiser_name: 'مكتب الدلتا للاستشارات الضريبية والمحاسبية',
    title: 'خدمات التأسيس ومسك الدفاتر القانونية للشركات في مصر',
    placement: 'homepage_banner',
    creative_storage_path: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
    destination_url: 'https://sheetora.com/services',
    pricing_model: 'fixed',
    price_egp: 1800,
    budget_egp: 1800,
    start_at: '2026-04-01T00:00:00Z',
    end_at: '2026-05-30T23:59:59Z',
    status: 'active',
    impressions_count: 3420,
    clicks_count: 187,
    created_at: '2026-03-28T10:00:00Z',
    updated_at: '2026-04-15T12:00:00Z',
  },
  {
    id: 'ad-sidebar-cloud-hosting',
    advertiser_name: 'سيرفرات النيل للحوسبة السحابية',
    title: 'استضافة سريعة وقواعد بيانات مخصصة للشركات الناشئة',
    placement: 'sidebar_placement',
    creative_storage_path: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    destination_url: 'https://sheetora.com/services/web-development',
    pricing_model: 'cpc',
    price_egp: 5,
    budget_egp: 2500,
    start_at: '2026-04-05T00:00:00Z',
    end_at: '2026-05-15T23:59:59Z',
    status: 'active',
    impressions_count: 1980,
    clicks_count: 94,
    created_at: '2026-04-01T09:00:00Z',
    updated_at: '2026-04-18T16:00:00Z',
  }
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-2026-001',
    request_number: 'SR-2026-1042',
    user_id: 'user-sample-01',
    customer_name: 'م. أحمد حسام',
    customer_email: 'ahmed.hossam@al-nour-logistics.eg',
    customer_phone: '+201012345678',
    service_type: 'data_analysis',
    project_title: 'تحليل بيانات حركة النقل والأسطول واستخراج تقارير كفاءة الوقود',
    company_name: 'شركة النور للنقل والتوزيع',
    description: 'لدينا بيانات حركة 60 شاحنة على مدار 18 شهراً بملفات CSV ونحتاج لتنظيف البيانات واستخراج لوحة تحكم Power BI / Excel توضح الهدر وتكاليف الكيلومتر.',
    business_objectives: 'تقليل استهلاك الوقود بنسبة 8% وكشف السائقين الأكثر كفاءة ومواعيد الصيانة المثالية.',
    deliverables: 'ملف إكسل منظف، داشبورد تفاعلي، تقرير تحليلي PDF بتوصيات الإدارة.',
    budget_min_egp: 8000,
    budget_max_egp: 15000,
    deadline: '2026-05-10',
    status: 'in_progress',
    created_at: '2026-04-02T11:20:00Z',
    updated_at: '2026-04-08T15:00:00Z',
    quotes: [
      {
        id: 'quote-2026-1042',
        request_id: 'req-2026-001',
        quote_number: 'Q-2026-089',
        amount_egp: 11500,
        scope: 'تنظيف البيانات واستبعاد الأخطاء، تصميم داشبورد تفاعلي مع 6 فلاتر و3 بطاقات أداء رئيسية، وتسليم تقرير مكتوب وجلسة شرح ساعتين عبر زووم.',
        status: 'accepted',
        accepted_at: '2026-04-05T14:00:00Z',
        created_at: '2026-04-04T10:00:00Z',
        updated_at: '2026-04-05T14:00:00Z',
      }
    ]
  },
  {
    id: 'req-2026-002',
    request_number: 'SR-2026-1088',
    customer_name: 'سارة إبراهيم',
    customer_email: 'sara.ebrahim@apex-consult.com',
    customer_phone: '+201287654321',
    service_type: 'custom_excel',
    project_title: 'تطوير نموذج مالي مخصص لدراسة جدوى مجمع عيادات طبية',
    company_name: 'أبيكس للاستشارات الصحية',
    description: 'نحتاج نموذج مالي متكامل مع سيناريوهات تشغيلية (Best Case, Base Case, Worst Case) لحساب فترة استرداد رأس المال ومعدل العائد الداخلي IRR.',
    business_objectives: 'تقديمه للمستثمرين للحصول على تمويل مصرفي واستثماري بقيمة 12 مليون جنيه.',
    deliverables: 'ملف إكسل ديناميكي مع مخرجات جاهزة للطباعة.',
    budget_min_egp: 6000,
    budget_max_egp: 10000,
    deadline: '2026-05-01',
    status: 'reviewing',
    created_at: '2026-04-14T09:30:00Z',
    updated_at: '2026-04-14T09:30:00Z',
  }
];
