'use client';

import CreateCustomer from '@/components/customer/create-customer/create-customer.component';
import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';

export default function Page() {
  return <Auth component={<CreateCustomer />} type={AUTH.PRIVATE} />;
}
