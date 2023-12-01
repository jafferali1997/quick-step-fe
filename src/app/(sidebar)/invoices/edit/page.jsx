'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import EditInvoice from '@/components/invoices/edit/edit-offer.component';

export default function Page() {
  return (
    <Auth component={<EditInvoice />} type={AUTH.PRIVATE} title={NAVBARTITLE.DOCUMENTS} />
  );
}
