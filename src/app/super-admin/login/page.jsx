'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import SuperAdminLogin from '@/components/super-admin/login/super-admin-login.component';

export default function Page() {
  return <Auth component={<SuperAdminLogin />} type={AUTH.PUBLIC} />;
}
