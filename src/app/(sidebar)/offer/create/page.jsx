'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import CreateOffer from '@/components/offer/create/create-offer.component';

export default function Page() {
  return (
    <Auth component={<CreateOffer />} type={AUTH.PRIVATE} title={NAVBARTITLE.DOCUMENTS} />
  );
}
