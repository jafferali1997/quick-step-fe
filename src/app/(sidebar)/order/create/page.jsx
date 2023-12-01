'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import CreateOrder from '@/components/order/create/create-order.component';

export default function Page() {
  return (
    <Auth component={<CreateOrder />} type={AUTH.PRIVATE} title={NAVBARTITLE.DOCUMENTS} />
  );
}
