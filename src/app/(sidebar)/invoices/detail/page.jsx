'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import InvoiceDetail from '@/components/invoices/detail/invoice-detail.component';
import OfferDetail from '@/components/offer/detail/offer-detail.component';

/**
 * @returns lazy loaded component for home page
 */
export default function Page() {
  return <Auth component={<InvoiceDetail />} type={AUTH.PRIVATE} />;
}
