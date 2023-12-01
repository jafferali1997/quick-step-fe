'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewOrder from '@/components/order/view/view-order.component';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';

export default function Page() {
  return (
    <Auth component={<ViewOrder />} type={AUTH.PRIVATE} title={NAVBARTITLE.DOCUMENTS} />
  );
}
