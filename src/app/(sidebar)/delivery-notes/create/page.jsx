'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import CreateDeliveryNote from '@/components/delivery-notes/create/create-delivery-notes.component';

export default function Page() {
  return (
    <Auth
      component={<CreateDeliveryNote />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.DOCUMENTS}
    />
  );
}
