'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ProductDetail from '@/components/product/detail/detail-product.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<ProductDetail />} type={AUTH.PRIVATE} />;
}
