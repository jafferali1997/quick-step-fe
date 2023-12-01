'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import DeliveryNotesDetail from '@/components/delivery-notes/detail/offer-detail.component';

export default function Page() {
  return <Auth component={<DeliveryNotesDetail />} type={AUTH.PRIVATE} />;
}
