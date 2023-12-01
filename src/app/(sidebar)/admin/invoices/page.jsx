'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import Dashboard from '@/components/dashboard/dashboard.component';

export default function Page() {
  return <Auth component={<Dashboard />} type={AUTH.PRIVATE} />;
}
