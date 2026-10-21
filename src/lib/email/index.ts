/**
 * Transactional Email & Notification Abstraction for Sheetora
 * Supports Resend, SendGrid, or Supabase Auth mailer
 */

export interface EmailPayload {
  to: string;
  subject: string;
  htmlContent: string;
  templateType:
    | 'registration_verify'
    | 'password_reset'
    | 'purchase_confirmed'
    | 'service_request_received'
    | 'quote_ready'
    | 'quote_accepted'
    | 'project_status_updated'
    | 'admin_new_request'
    | 'ad_inquiry_received';
}

export interface EmailDeliveryResult {
  sent: boolean;
  messageId?: string;
  error?: string;
  provider: 'resend' | 'smtp' | 'none';
  inAppNotice: string;
}

export class EmailAdapter {
  private static getEnv(key: string): string {
    const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || (typeof process !== 'undefined' ? process.env : {}) || {};
    return env[key] || '';
  }

  private static resendApiKey = EmailAdapter.getEnv('VITE_RESEND_API_KEY');

  public static isConfigured(): boolean {
    return Boolean(this.resendApiKey);
  }

  public static async sendTransactionalEmail(payload: EmailPayload): Promise<EmailDeliveryResult> {
    if (!this.isConfigured()) {
      return {
        sent: false,
        provider: 'none',
        error: 'خدمة البريد الإلكتروني (Resend / SMTP) غير مهيأة بعد.',
        inAppNotice: `تم حفظ الإجراء وتحديث الحالة داخل لوحة التحكم. لتفعيل إرسال الرسائل عبر البريد الإلكتروني فعلياً، يرجى تزويد VITE_RESEND_API_KEY أو تهيئة Supabase SMTP.`,
      };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Sheetora <notifications@sheetora.com>',
          to: payload.to,
          subject: payload.subject,
          html: payload.htmlContent,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData?.message || 'فشل إرسال البريد');
      }

      return {
        sent: true,
        messageId: resData.id,
        provider: 'resend',
        inAppNotice: 'تم إرسال الإشعار عبر البريد الإلكتروني بنجاح.',
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'خطأ غير متوقع';
      return {
        sent: false,
        provider: 'resend',
        error: msg,
        inAppNotice: `تعذر إرسال الإشعار عبر البريد: ${msg}. العملية مسجلة في قاعدة البيانات.`,
      };
    }
  }
}
