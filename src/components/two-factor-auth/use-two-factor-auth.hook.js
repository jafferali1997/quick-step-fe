'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import {
  generateOtp,
  getCurrentUser,
  verifyOtp
} from '@/provider/features/user/user.slice';
import { logout } from '@/provider/features/auth/auth.slice';
import { getUser, is2FAEnabled } from '@/common/utils/users.util';

export default function useTwoFactorAuth() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isTimerStop, setIsTimerStop] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(true);
  const otpNumber1 = useRef();
  const otpNumber2 = useRef();
  const otpNumber3 = useRef();
  const otpNumber4 = useRef();
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isOtpVerify = JSON.parse(localStorage.getItem('isOtpVerify') || false);
    const user = getUser();
    if (user && is2FAEnabled(user) && !isOtpVerify) {
      const _userId = searchParams.get('userId');
      const _phone = searchParams.get('phone');
      if (_userId && _phone) {
        if (_phone == user.phone && _userId == user.id) {
          localStorage.setItem('userId', searchParams.get('userId'));
          localStorage.setItem('phone', searchParams.get('phone'));
          setUserId(searchParams.get('userId'));
          setPhone(searchParams.get('phone'));
        } else {
          dispatch(logout());
        }
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(generateOtp({ payload: null, successCallBack: () => {} }));
  }, []);

  const resendOtpHandler = () => {
    if (isTimerStop) {
      dispatch(
        generateOtp({
          successCallBack: () => {}
        })
      );
      setIsTimerStop(false);
    }
  };
  const moveRouter = (data) => {
    setIsOtpVerified(true);
    dispatch(getCurrentUser({ successCallBack: () => router.push('/dashboard') }));
  };

  const verifyOtpHandler = async () => {
    setLoading(true);
    const otp = Number(
      `${otpNumber1.current.value}${otpNumber2.current.value}${otpNumber3.current.value}${otpNumber4.current.value}`
    );
    if (otp > 0) {
      const response = await dispatch(
        verifyOtp({ payload: { otp }, successCallBack: moveRouter })
      );
      response && setLoading(false);
    }
  };

  const otpNumberChangeHandler = (e) => {
    setLoading(true);
    const currentOtpNumberId = e.target.id;
    // eslint-disable-next-line no-eval
    const currentOtpNumberRef = eval(`otpNumber${currentOtpNumberId}`);
    currentOtpNumberRef.current.value = e.target.value;

    if (currentOtpNumberId >= 4 && e.target.value.length === 1) {
      setIsOtpVerified(false);
    } else {
      setIsOtpVerified(true);
    }
    if (currentOtpNumberId < 4 && e.target.value.length === 1) {
      currentOtpNumberRef.current.nextSibling.focus();
    } else if (currentOtpNumberId > 1 && e.target.value.length === 0) {
      currentOtpNumberRef.current.previousSibling.focus();
    }
    currentOtpNumberRef.current.value = e.target.value;
    setLoading(false);
  };

  return {
    phone,
    otpNumberChangeHandler,
    otpNumber1,
    otpNumber2,
    otpNumber3,
    otpNumber4,
    setIsTimerStop,
    verifyOtpHandler,
    resendOtpHandler,
    isTimerStop,
    loading,
    isOtpVerified
  };
}
