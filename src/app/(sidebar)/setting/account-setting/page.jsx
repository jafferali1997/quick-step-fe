'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import AccountSetting from '@/components/setting/account-setting/account-setting.component';

export default function Page() {
  return (
    <Auth
      component={<AccountSetting />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.SETTING}
    />
  );
}
