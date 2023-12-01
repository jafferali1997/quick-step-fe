'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  generateForgetPasswordLink,
  regenerateEmailLink
} from '@/provider/features/user/user.slice';
import { getUser } from '@/common/utils/users.util';

export default function useVerifyEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const { email, signUp, forgetPassword, token } = router.query;
  useEffect(() => {
    // const urlSearchParams = new URLSearchParams(window.location.search);
    const _email = searchParams.get('email');
    const _type = searchParams.get('type');
    const user = getUser();
    if (user && user.isEmailVerified) router.push('/dashboard');

    if (_email && _type) {
      setEmail(searchParams.get('email'));
      setType(searchParams.get('type'));
    } else {
      router.push('/dashboard');
    }
  }, [searchParams]);

  const resendLinkHandler = async () => {
    setLoading(true);
    let newEmail = email;
    if (newEmail.includes('%2B')) newEmail = newEmail.replace('%2B', '+');
    if (type === 'email-verification') {
      const response = await dispatch(
        regenerateEmailLink({ payload: { email: newEmail } })
      );
      response && setLoading(false);
    } else {
      const response = dispatch(
        generateForgetPasswordLink({ payload: { email: newEmail } })
      );
      response && setLoading(false);
    }
  };

  return { resendLinkHandler, email, loading };
}
