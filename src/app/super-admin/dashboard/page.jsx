'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import SuperAdminDashboard from '@/components/super-admin/dashboard/super-admin-dashboard.component';

export default function Page() {
  return <Auth component={<SuperAdminDashboard />} type={AUTH.SUPER_ADMIN} />;
}
