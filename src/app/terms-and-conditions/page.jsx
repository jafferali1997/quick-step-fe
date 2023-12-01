'use client';

import TermsAndConditions from '@/components/terms-and-conditions/terms-and-conditions.component';
import AUTH from '../../common/constants/auth.constant';
import Auth from '../../auth/auth.component';

export default function TermsConditions() {
  return <Auth component={<TermsAndConditions />} type={AUTH.PUBLIC} />;
}
