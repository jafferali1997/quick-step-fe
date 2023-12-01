'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import EditExpenditure from '@/components/expenditure/edit/edit-expenditure.component';

export default function Page() {
  return <Auth component={<EditExpenditure />} type={AUTH.PRIVATE} title="Expenses" />;
}
