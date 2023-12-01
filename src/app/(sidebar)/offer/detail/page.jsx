'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import OfferDetail from '@/components/offer/detail/offer-detail.component';

export default function Page() {
  return (
    <Auth component={<OfferDetail />} type={AUTH.PRIVATE} title={NAVBARTITLE.DOCUMENTS} />
  );
}
