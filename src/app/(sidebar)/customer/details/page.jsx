'use client';

import AUTH from '@/common/constants/auth.constant';
import CustomerDetails from '@/components/customer/customer-detail/customer-details.component';
import Auth from '@/auth/auth.component';

export default function Page() {
  return <Auth component={<CustomerDetails />} type={AUTH.PRIVATE} />;
}
