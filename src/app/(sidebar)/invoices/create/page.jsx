'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import CreateInvoice from '@/components/invoices/create/create-invoice.component';

export default function Page() {
  return (
    <Auth
      component={<CreateInvoice />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.DOCUMENTS}
    />
  );
}
