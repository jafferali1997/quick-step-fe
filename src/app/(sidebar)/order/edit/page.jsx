'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import EditOrder from '@/components/order/edit/edit-order.component';

export default function Page() {
  return <Auth component={<EditOrder />} type={AUTH.PRIVATE} />;
}
