'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import ViewBusinessOwner from '@/components/super-admin/business-owner/view/view-business-owner.component';

export default function Page() {
  return (
    <Auth
      component={<ViewBusinessOwner />}
      type={AUTH.SUPER_ADMIN}
      title={NAVBARTITLE.ACCOUNT}
    />
  );
}
