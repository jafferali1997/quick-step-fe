'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import CreateExpenditure from '@/components/expenditure/create/create-expenditure.component';

export default function Page() {
  return <Auth component={<CreateExpenditure />} type={AUTH.PRIVATE} title="Expenses" />;
}
