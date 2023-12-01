'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import EditProduct from '@/components/product/edit/edit-product.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<EditProduct />} type={AUTH.PRIVATE} />;
}
