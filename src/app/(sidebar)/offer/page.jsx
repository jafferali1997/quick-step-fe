'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewOffer from '@/components/offer/view/view-offer.component';

export default function Page() {
  return <Auth component={<ViewOffer />} type={AUTH.PRIVATE} />;
}
