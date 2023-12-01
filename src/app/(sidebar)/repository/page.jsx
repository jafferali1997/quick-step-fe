'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewReopository from '@/components/repository/view-repository.component';

export default function Page() {
  return <Auth component={<ViewReopository />} type={AUTH.PRIVATE} title="Repository" />;
}
