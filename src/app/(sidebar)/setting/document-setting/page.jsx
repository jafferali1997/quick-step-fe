'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import DocumentsSettings from '@/components/setting/documents-settings/documents-settings.component';

export default function Page() {
  return (
    <Auth
      component={<DocumentsSettings />}
      type={AUTH.PRIVATE}
      title={NAVBARTITLE.SETTING}
    />
  );
}
