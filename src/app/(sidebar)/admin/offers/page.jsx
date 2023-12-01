'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import AdminViewOffer from '@/components/admin/offers/admin-view-offers.component';

export default function Page() {
  return <Auth component={<AdminViewOffer />} type={AUTH.PRIVATE} />;
}
