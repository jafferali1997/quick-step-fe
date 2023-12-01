'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import UpdateBusinessOwner from '@/components/super-admin/business-owner/update/update-business-owner.component';

export default function Page() {
  return <Auth component={<UpdateBusinessOwner />} type={AUTH.SUPER_ADMIN} />;
}
