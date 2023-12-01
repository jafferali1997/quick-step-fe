'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkExpiryDateOfToken } from '@/common/utils/access-token.util';

/**
 * Does all the functionality used in landing page and return it as an object
 * @returns object
 */
export default function useLandingPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (checkExpiryDateOfToken() !== true) {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, []);

  // useEffect(() => {
  //   const isOtpVerify = JSON.parse(localStorage.getItem('isOtpVerify'));
  //   console.log({ isOtpVerify });
  //   if (!isOtpVerify || isOtpVerify !== true) {
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('isOtpVerify');
  //     localStorage.removeItem('userId');
  //     localStorage.removeItem('phone');
  //     router.push('/');
  //   }
  // }, []);

  return {
    open,
    setOpen,
    auth,
    setAuth,
    router
  };
}
