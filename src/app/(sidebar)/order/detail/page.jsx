'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import OrderDetail from '@/components/order/detail/order-detail.component';

export default function Page() {
  return <Auth component={<OrderDetail />} type={AUTH.PRIVATE} />;
}
