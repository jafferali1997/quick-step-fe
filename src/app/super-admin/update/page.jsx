'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import CreateProfile from '@/components/super-admin/create-profile/create-profile.component';

export default function Page() {
  return <Auth component={<CreateProfile />} type={AUTH.PRIVATE} />;
}
