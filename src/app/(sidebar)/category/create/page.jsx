'use client';

import Auth from '@/auth/auth.component';
import CreateCategories from '@/components/categories/create-categories.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';

export default function Page() {
  return (
    <Auth
      component={<CreateCategories />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.ADMINISTRATIONS}
    />
  );
}
