'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import EditTemplate from '@/components/edit-template/edit-template.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<EditTemplate />} type={AUTH.PRIVATE} />;
}
