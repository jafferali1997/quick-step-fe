'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ViewExpenditure from '@/components/expenditure/view/view-expenditure.component';

export default function Page() {
  return <Auth component={<ViewExpenditure />} type={AUTH.PRIVATE} title="Expenses" />;
}
