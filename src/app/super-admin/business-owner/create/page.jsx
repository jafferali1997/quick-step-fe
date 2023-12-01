'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import CreateBusinessOwner from '@/components/super-admin/business-owner/create/create-business-owner.component';

export default function Page() {
  return <Auth component={<CreateBusinessOwner />} type={AUTH.SUPER_ADMIN} />;
}
