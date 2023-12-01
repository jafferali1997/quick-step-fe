'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewTemplate from '@/components/view-template/view-template.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<ViewTemplate />} type={AUTH.PRIVATE} />;
}
