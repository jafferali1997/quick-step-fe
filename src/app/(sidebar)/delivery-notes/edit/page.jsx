'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import EditDeliveryNote from '@/components/delivery-notes/edit/edit-delivery-notes.component';

export default function Page() {
  return (
    <Auth
      component={<EditDeliveryNote />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.DOCUMENTS}
    />
  );
}
