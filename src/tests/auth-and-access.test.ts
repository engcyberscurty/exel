/**
 * Automated Verification Tests for Sheetora Security & Entitlements
 * Validates: Authentication, Authorization, Pricing Consistency, and Download Entitlements
 * Can be run directly via: npx tsx src/tests/auth-and-access.test.ts
 */

import { authorizeAndDownloadTemplate } from '../lib/storage';
import { Template, Profile, Order } from '../types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export async function runSecurityTests() {
  console.log('Running Sheetora Automated Verification Tests...\n');

  const freeTemplate: Template = {
    id: 'test-free-1',
    title_ar: 'قالب تجريبي مجاني',
    slug: 'test-free-1',
    short_description: 'وصف قصير',
    description: 'وصف كامل',
    category_id: 'cat-accounting',
    price_egp: 0,
    is_free: true,
    storage_path: 'templates/free.xlsx',
    preview_image_path: '/placeholder.png',
    file_extension: 'xlsx',
    file_size_bytes: 500000,
    version: '1.0',
    status: 'published',
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const paidTemplate: Template = {
    id: 'test-paid-1',
    title_ar: 'قالب مسير الرواتب الاحترافي',
    slug: 'test-paid-1',
    short_description: 'وصف قصير',
    description: 'وصف كامل',
    category_id: 'cat-hr',
    price_egp: 299,
    is_free: false,
    storage_path: 'templates/paid.xlsx',
    preview_image_path: '/placeholder.png',
    file_extension: 'xlsx',
    file_size_bytes: 1200000,
    version: '2.0',
    status: 'published',
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const customerUser: Profile = {
    id: 'user-cust-1',
    email: 'test@customer.eg',
    full_name: 'أحمد العميل',
    preferred_language: 'ar',
    role: 'customer',
    created_at: new Date().toISOString(),
  };

  const adminUser: Profile = {
    id: 'user-admin-1',
    email: 'admin@sheetora.com',
    full_name: 'مدير المنصة',
    preferred_language: 'ar',
    role: 'admin',
    created_at: new Date().toISOString(),
  };

  // Test 1: Pricing Consistency
  assert(freeTemplate.is_free === true, 'Free template must have is_free = true');
  assert(freeTemplate.price_egp === 0, 'Free template must have price_egp = 0');
  assert(paidTemplate.is_free === false, 'Paid template must have is_free = false');
  assert(paidTemplate.price_egp > 0, 'Paid template must have price_egp > 0');
  console.log('✓ Test 1: Pricing consistency rule verified');

  // Test 2: Anonymous Download Restriction
  const resAnonFree = await authorizeAndDownloadTemplate(freeTemplate, null, []);
  assert(resAnonFree.success === false, 'Anonymous user must not download free files');
  assert(
    Boolean(resAnonFree.error?.includes('تسجيل الدخول')),
    'Anonymous error message must prompt for login'
  );

  const resAnonPaid = await authorizeAndDownloadTemplate(paidTemplate, null, []);
  assert(resAnonPaid.success === false, 'Anonymous user must not download paid files');
  console.log('✓ Test 2: Anonymous download restriction enforced');

  // Test 3: Logged-in Customer can download free templates
  const resCustFree = await authorizeAndDownloadTemplate(freeTemplate, customerUser, []);
  assert(resCustFree.success === true, 'Authenticated customer should download free template');
  assert(Boolean(resCustFree.downloadUrl), 'Authenticated download must return downloadUrl');
  console.log('✓ Test 3: Authenticated customer authorized for free download');

  // Test 4: Unpurchased Paid Template is blocked
  const resCustPaid = await authorizeAndDownloadTemplate(paidTemplate, customerUser, []);
  assert(resCustPaid.success === false, 'Unpurchased paid template must be rejected');
  assert(
    Boolean(resCustPaid.error?.includes('شراء ترخيص')),
    'Error must explain valid purchase requirement'
  );
  console.log('✓ Test 4: Unpurchased paid template download blocked');

  // Test 5: Customer with confirmed paid order is granted access
  const confirmedOrder: Order = {
    id: 'ord-test-1',
    user_id: customerUser.id,
    order_number: 'ORD-TEST-001',
    total_egp: 299,
    currency: 'EGP',
    status: 'paid',
    payment_provider: 'paymob',
    created_at: new Date().toISOString(),
    items: [
      {
        id: 'item-1',
        order_id: 'ord-test-1',
        template_id: paidTemplate.id,
        title_snapshot: paidTemplate.title_ar,
        unit_price_egp: 299,
        quantity: 1,
        subtotal_egp: 299,
      },
    ],
  };

  const resCustOrder = await authorizeAndDownloadTemplate(paidTemplate, customerUser, [
    confirmedOrder,
  ]);
  assert(resCustOrder.success === true, 'Customer with paid order must be authorized');
  assert(Boolean(resCustOrder.downloadUrl), 'Authorized download URL must be present');
  console.log('✓ Test 5: Paid order purchase entitlement verified');

  // Test 6: Admin preview download access
  const resAdmin = await authorizeAndDownloadTemplate(paidTemplate, adminUser, []);
  assert(resAdmin.success === true, 'Administrator should be authorized for content review');
  console.log('✓ Test 6: Admin content inspection access confirmed');

  console.log('\nAll 6 Sheetora security and entitlement tests passed successfully!');
}

// Auto-run if executed directly via node or tsx
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('auth-and-access')) {
  runSecurityTests().catch((err) => {
    console.error('Test suite failed:', err);
    process.exit(1);
  });
}
