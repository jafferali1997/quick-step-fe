'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewDeliveryNotes from '@/components/delivery-notes/view/view-delivery-notes-component';

export default function Page() {
  return <Auth component={<ViewDeliveryNotes />} type={AUTH.PRIVATE} />;
}
