'use client';

import AUTH from '@/common/constants/auth.constant';
import Auth from '@/auth/auth.component';
import EditCustomer from '@/components/customer/edit-customer/edit-customer.component';

export default function Page() {
  return <Auth component={<EditCustomer />} type={AUTH.PRIVATE} />;
}
