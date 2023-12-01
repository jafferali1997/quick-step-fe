'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import VerificationExpire from '@/components/verification-expire/verification-expire.component';

export default function Page() {
  return <Auth component={<VerificationExpire />} type={AUTH.PUBLIC} />;
}
