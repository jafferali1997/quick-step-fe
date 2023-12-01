'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import CreateProduct from '@/components/product/create/create-product.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<CreateProduct />} type={AUTH.PRIVATE} />;
}
