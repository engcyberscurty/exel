import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || (typeof process !== 'undefined' ? process.env : {}) || {};

// Read either VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY (Supabase interchangeable terminology)
const rawUrl = env.VITE_SUPABASE_URL || '';
const rawKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.trim().replace(/^['"]|['"]$/g, '') : '';
export const supabaseKey = typeof rawKey === 'string' ? rawKey.trim().replace(/^['"]|['"]$/g, '') : '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('your-project-ref') &&
  supabaseKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export interface SupabaseHealthCheckResult {
  isConfigured: boolean;
  isConnected: boolean;
  statusText: string;
  latencyMs?: number;
  errorMessage?: string;
  projectUrl?: string;
  tablesVerified?: boolean;
}

/**
 * Performs a live query to verify actual connectivity to Supabase
 */
export async function testSupabaseConnection(): Promise<SupabaseHealthCheckResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      isConfigured: false,
      isConnected: false,
      statusText: 'المتغيرات غير مهيأة بعد في ملف .env (يعمل التطبيق في وضع المعاينة المحلي).',
      projectUrl: supabaseUrl || undefined,
    };
  }

  const startTime = performance.now();
  try {
    // 1. Ping categories table to check database schema and read permissions
    const { data, error, count } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      // Analyze specific Supabase errors
      if (error.code === '42P01') {
        return {
          isConfigured: true,
          isConnected: true,
          tablesVerified: false,
          latencyMs,
          statusText: 'تم الاتصال بقاعدة البيانات بنجاح، ولكن جداول Sheetora لم تُنشأ بعد. يرجى تنفيذ ملفات الـ SQL Migrations.',
          errorMessage: `Table missing: ${error.message} (Code: 42P01)`,
          projectUrl: supabaseUrl,
        };
      }

      if (error.message?.includes('JWT') || error.message?.includes('apikey') || error.code === 'PGRST301') {
        return {
          isConfigured: true,
          isConnected: false,
          latencyMs,
          statusText: 'فشل الاتصال: مفتاح النشر (Publishable / Anon Key) غير صالح أو غير متطابق مع المشروع.',
          errorMessage: error.message,
          projectUrl: supabaseUrl,
        };
      }

      return {
        isConfigured: true,
        isConnected: false,
        latencyMs,
        statusText: `تعذر إتمام الاستعلام: ${error.message}`,
        errorMessage: error.message,
        projectUrl: supabaseUrl,
      };
    }

    return {
      isConfigured: true,
      isConnected: true,
      tablesVerified: true,
      latencyMs,
      statusText: `الاتصال نشط وسريع! تم التحقق من قاعدة البيانات وقراءة الجداول (${latencyMs}ms).`,
      projectUrl: supabaseUrl,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'خطأ غير معروف في الاتصال';
    return {
      isConfigured: true,
      isConnected: false,
      statusText: `فشل الاتصال بالشبكة أو الخادم: ${msg}`,
      errorMessage: msg,
      projectUrl: supabaseUrl,
    };
  }
}
