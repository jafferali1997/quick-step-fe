'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import GeneralSetting from '@/components/setting/general-setting/general-setting.component';

export default function Page() {
  return (
    <Auth
      component={<GeneralSetting />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.SETTING}
    />
  );
}
