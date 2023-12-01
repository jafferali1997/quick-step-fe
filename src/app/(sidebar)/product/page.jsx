'use client';

import { Suspense } from 'react';
import Product from '@/components/product/product.component';
import AUTH from '@/common/constants/auth.constant';
import Auth from '@/auth/auth.component';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';

/**
 * @returns lazy loaded component for home page
 */
export default function Home() {
  return (
    <Auth
      component={<Product />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.ADMINISTRATIONS}
    />
  );
}
