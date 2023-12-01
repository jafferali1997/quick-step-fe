'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import ViewProfileSetting from '@/components/setting/profile-setting/view-profile-setting.component';

export default function Page() {
  return (
    <Auth
      component={<ViewProfileSetting />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.SETTING}
    />
  );
}
