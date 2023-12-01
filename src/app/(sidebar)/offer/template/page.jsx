'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewTemplate from '@/components/offer/template/templates.component';

export default function Page() {
  return <Auth component={<ViewTemplate />} type={AUTH.PRIVATE} />;
}
