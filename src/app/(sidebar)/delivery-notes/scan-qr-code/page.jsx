'use client';

import Auth from '@/auth/auth.component';
import AUTH from '@/common/constants/auth.constant';
import ScanQRCode from '@/components/delivery-notes/scan-qr-code/scan-qr-code.component';

export default function Page() {
  return <Auth component={<ScanQRCode />} type={AUTH.PUBLIC} />;
}
