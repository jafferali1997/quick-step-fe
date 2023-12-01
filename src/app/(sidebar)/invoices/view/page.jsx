'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import ViewInvoice from '@/components/invoices/view/view-invoice.component';

export default function Page() {
  return (
    <Auth component={<ViewInvoice />} type={AUTH.PRIVATE} title={NAVBARTITLE.DOCUMENTS} />
  );
}
