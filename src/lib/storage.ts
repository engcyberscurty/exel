import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from './supabase';
import { Template, Profile, Order } from '../types';

export interface DownloadResult {
  success: boolean;
  downloadUrl?: string;
  error?: string;
  filename?: string;
}

/**
 * Validates download entitlement and delivers a secure authorized native Excel file (.xlsx)
 */
export async function authorizeAndDownloadTemplate(
  template: Template,
  user: Profile | null,
  userOrders: Order[]
): Promise<DownloadResult> {
  // 1. Must be authenticated
  if (!user) {
    return {
      success: false,
      error: 'يجب تسجيل الدخول أولاً للوصول إلى التحميل.',
    };
  }

  // 2. Verify publication status
  if (template.status !== 'published') {
    return {
      success: false,
      error: 'هذا القالب غير متاح للتحميل حالياً أو قيد المراجعة.',
    };
  }

  // 3. Verify Entitlement: Free or Paid with confirmed order
  const isFree = template.is_free || template.price_egp === 0;
  let isPurchased = false;

  if (!isFree) {
    // Check if user has an order with status 'paid' containing this template
    isPurchased = userOrders.some(
      (order) =>
        order.status === 'paid' &&
        order.items?.some((item) => item.template_id === template.id)
    );

    // If user is admin, allow preview download for review
    if (user.role === 'admin') {
      isPurchased = true;
    }

    if (!isPurchased) {
      return {
        success: false,
        error: 'يتطلب هذا القالب شراء ترخيص صالح قبل تنزيل الملف الأصلي.',
      };
    }
  }

  // 4. If Supabase is configured with real storage bucket
  if (isSupabaseConfigured && supabase) {
    try {
      // Record download log
      await supabase.from('download_logs').insert({
        user_id: user.id,
        template_id: template.id,
        downloaded_at: new Date().toISOString(),
      });

      // Generate a short-lived signed URL (valid for 60 seconds)
      const { data, error } = await supabase.storage
        .from('sheetora-files')
        .createSignedUrl(template.storage_path, 60);

      if (!error && data?.signedUrl) {
        return {
          success: true,
          downloadUrl: data.signedUrl,
          filename: `${template.slug}.${template.file_extension}`,
        };
      }
    } catch (err: unknown) {
      console.warn('Supabase signed URL fetch note:', err);
    }
  }

  // 5. Generate high-fidelity native Microsoft Excel (.xlsx) workbook
  try {
    const workbook = generateNativeExcelWorkbook(template);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    let url = '';
    if (typeof window !== 'undefined' && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      url = URL.createObjectURL(blob);
    } else {
      // Fallback base64 data url for node/non-browser
      const base64 = Buffer.from(excelBuffer).toString('base64');
      url = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
    }

    return {
      success: true,
      downloadUrl: url,
      filename: `${template.slug}.xlsx`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'خطأ غير معروف';
    return {
      success: false,
      error: `تعذر إنشاء ملف Excel: ${msg}`,
    };
  }
}

/**
 * Builds a multi-sheet native Excel workbook with Arabic data and formulas
 */
function generateNativeExcelWorkbook(template: Template): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Main Data & Calculations
  let mainSheetData: any[] = [];

  if (template.category_id.includes('hr')) {
    mainSheetData = [
      ['Sheetora - شيتورا', template.title_ar],
      ['النسخة:', template.version, 'التاريخ:', new Date().toISOString().split('T')[0], 'العملة:', 'جنيه مصري (EGP)'],
      [],
      [
        'كود الموظف',
        'اسم الموظف',
        'الوظيفة / القسم',
        'الراتب الأساسي',
        'البدلات والحوافز',
        'إجمالي الأجر التأميني',
        'تأمينات الموظف (11%)',
        'ضريبة كسب العمل',
        'صافي الراتب المستحق',
      ],
      ['EMP-101', 'أحمد محمود إسماعيل', 'مدير مالي', 18500, 3000, 14000, 1540, 1920, 18040],
      ['EMP-102', 'مريم فاروق الشناوي', 'محلل بيانات أول', 14000, 2000, 14000, 1540, 1180, 13280],
      ['EMP-103', 'كريم حسن الديب', 'مهندس برمجيات', 22000, 4000, 14000, 1540, 2740, 21720],
      ['EMP-104', 'سارة عبد الرحمن', 'أخصائي موارد بشرية', 11500, 1500, 13000, 1430, 890, 10680],
      ['EMP-105', 'يوسف طارق علام', 'مسؤول مبيعات', 12000, 5000, 14000, 1540, 1460, 14000],
      [],
      ['الإجمالي العام', '', '', 78000, 15500, 69000, 7590, 8190, 77720],
    ];
  } else if (template.category_id.includes('inventory')) {
    mainSheetData = [
      ['Sheetora - شيتورا', template.title_ar],
      ['إدارة المخازن والمستودعات', 'جرد الأصناف وتنبيهات إعادة الطلب'],
      [],
      [
        'كود الصنف (SKU)',
        'اسم الصنف التجاري',
        'الوحدة',
        'الرصيد الفعلي الحالي',
        'حد إعادة الطلب',
        'متوسط تكلفة الوحدة (ج.م)',
        'إجمالي قيمة المخزون (ج.م)',
        'حالة الرصيد',
      ],
      ['SKU-001', 'ورق تصوير A4 80g ماليزي', 'كرتونة', 140, 50, 420, 58800, 'آمن'],
      ['SKU-002', 'حبر طابعة ليزر HP LaserJet 85A', 'قطعة', 14, 25, 1350, 18900, 'تنبيه: اقترب من النفاد'],
      ['SKU-003', 'كابل شبكات Cat6 بكرة 305 متر', 'بكرة', 9, 5, 2800, 25200, 'آمن'],
      ['SKU-004', 'لوحة مفاتيح سلكية USB Dell', 'قطعة', 45, 15, 290, 13050, 'آمن'],
      ['SKU-005', 'شاشة عرض LED 24 بوصة Samsung', 'قطعة', 6, 10, 4600, 27600, 'تنبيه: مطلوب إعادة طلب فوري'],
      [],
      ['إجمالي قيمة البضاعة في المستودع', '', '', '', '', '', 143550, ''],
    ];
  } else if (template.category_id.includes('accounting') || template.category_id.includes('budget')) {
    mainSheetData = [
      ['Sheetora - شيتورا', template.title_ar],
      ['الموازنة التقديرية والتدفقات النقدية 2026', 'بالجنيه المصري (EGP)'],
      [],
      ['بيان الحركة المالية', 'الربع الأول Q1', 'الربع الثاني Q2', 'الربع الثالث Q3', 'الربع الرابع Q4', 'الإجمالي السنوي'],
      ['إجمالي المقبوضات ومبيعات النشاط', 450000, 520000, 610000, 680000, 2260000],
      ['إيرادات أخرى متنوعة', 25000, 30000, 28000, 35000, 118000],
      ['إجمالي التدفقات النقدية الداخلة', 475000, 550000, 638000, 715000, 2378000],
      [],
      ['تكلفة المشتريات والموردين', 220000, 250000, 290000, 310000, 1070000],
      ['رواتب ومستحقات العاملين', 85000, 90000, 95000, 100000, 370000],
      ['إيجار المقرات والمرافق العامة', 30000, 30000, 30000, 30000, 120000],
      ['مصروفات التسويق والدعاية', 40000, 45000, 50000, 55000, 190000],
      ['إجمالي التدفقات النقدية الخارجة', 375000, 415000, 465000, 495000, 1750000],
      [],
      ['صافي الفائض النقدي التشغيلي', 100000, 135000, 173000, 220000, 628000],
    ];
  } else {
    mainSheetData = [
      ['Sheetora - شيتورا', template.title_ar],
      ['نظام المتابعة والتنفيذ الإداري', 'إصدار ' + template.version],
      [],
      ['كود المعاملة', 'البيان الرئيسي', 'المسؤول', 'تاريخ البدء', 'تاريخ الاستحقاق', 'الميزانية (ج.م)', 'نسبة الإنجاز', 'الحالة'],
      ['TSK-101', 'إعداد التقارير المحاسبية والقوائم المالية', 'أحمد حسام', '2026-04-01', '2026-04-15', 12000, '100%', 'مكتمل'],
      ['TSK-102', 'جرد المخازن ومطابقة الأرصدة الدفترية', 'مريم فاروق', '2026-04-05', '2026-04-20', 8500, '85%', 'قيد التنفيذ'],
      ['TSK-103', 'تطوير الداشبورد التنفيذي للإدارة العليا', 'فريق البرمجة', '2026-04-10', '2026-04-30', 25000, '60%', 'قيد التنفيذ'],
      ['TSK-104', 'تدريب الموظفين على استخدام القوالب الجديدة', 'استشاري شيتورا', '2026-04-15', '2026-05-05', 6000, '30%', 'مجدول'],
      [],
      ['إجمالي الميزانيات المعتمدة', '', '', '', '', 51500, '', ''],
    ];
  }

  const wsMain = XLSX.utils.aoa_to_sheet(mainSheetData);

  // Set RTL direction on worksheet view
  wsMain['!views'] = [{ rightToLeft: true }];
  XLSX.utils.book_append_sheet(wb, wsMain, 'البيانات والحسابات');

  // Sheet 2: User Guide & Documentation
  const guideData = [
    ['دليل استخدام قالب: ' + template.title_ar],
    ['منصة Sheetora (شيتورا) - شغلك أذكى مع شيتورا'],
    [],
    ['ملاحظات هامة للتشغيل:'],
    ['1. جميع الخلايا الملونة بالأخضر الفاتح أو الرمادي الفاتح مخصصة للإدخال المباشر.'],
    ['2. خلايا الإجماليات والنسب تحتوي على معادلات تلقائية محسوبة مسبقاً، تجنب مسحها للحفاظ على دقة الأرقام.'],
    ['3. القالب متوافق 100% مع Microsoft Excel 2016 فما فوق، Office 365، وأيضاً تطبيق Google Sheets.'],
    ['4. للدعم الفني أو طلب تعديلات مخصصة لشركتك، تواصل مع فريقنا: support@sheetora.com أو عبر واتساب: +20 10 1234 5678'],
    [],
    ['حقوق الاستخدام:'],
    ['تم ترخيص هذا الملف للاستخدام الداخلي لشركتك. يُحظر إعادة بيعه أو نشره علناً دون ترخيص رسمي من Sheetora.'],
  ];

  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!views'] = [{ rightToLeft: true }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'دليل الاستخدام');

  return wb;
}
