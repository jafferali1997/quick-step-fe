'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import CreateTemplate from '@/components/create-template/create-template.component';
import CreateProduct from '@/components/product/create/create-product.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<CreateTemplate />} type={AUTH.PRIVATE} />;
}
