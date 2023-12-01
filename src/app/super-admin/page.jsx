'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ProfileView from '@/components/super-admin/profile-view/profile-view.component';

export default function Page() {
  return <Auth component={<ProfileView />} type={AUTH.PRIVATE} />;
}
