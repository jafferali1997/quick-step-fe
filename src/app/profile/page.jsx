'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/profile/profile.component';
import { getUser, isProfileCreated, isSuperAdmin } from '@/common/utils/users.util';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      if (isProfileCreated(user) || isSuperAdmin(user)) {
        router.push('/dashboard');
      }
    } else {
      router.push('/');
    }
    // if (localStorage.getItem('user')) {
    //   const user = JSON.parse(localStorage.getItem('user'));
    //   if (user?.isPhoneVerified && user?.currentBusinessId) {
    //     router.push('/dashboard');
    //   }
    // } else {
    //   router.push('/');
    // }
  }, []);

  return <Profile />;
}
