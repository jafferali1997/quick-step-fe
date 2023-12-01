'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { loginAndSignUpWithOAuth, signUp } from '@/provider/features/auth/auth.slice';
import { getEmailForURL } from '@/common/utils/users.util';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .max(30, 'Username must be at most 30 characters long')
    .min(5, 'Username must be minimum 5 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Username must not contain spaces')
    .required('Username is required'),
  email: Yup.string()
    .email('Email is not Valid')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
    .required('Email is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Use Special Character like @ # etc')
});

export default function useSignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const { userName, email, password } = watch();

  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnableButton, setEnableButton] = useState(false);
  const [error, setError] = useState({});

  const router = useRouter(null);

  // functions
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setEnableButton(false);
    setError({});
    setIsChecked(false);
    setShowPassword(false);
  }, [router]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isChecked === true) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [isChecked, error]);

  const borderStyle = {
    border: '1px solid red'
  };
  const borderSuc = {
    border: '1px solid #7E7D7D'
  };

  const moveRouter = (data) => {
    router.push(
      `/verify-email?type=email-verification&email=${getEmailForURL(data.email)}`
    );
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const response = await dispatch(
      signUp({
        payload: { ...values, role: 'BUSINESS_OWNER' },
        successCallBack: moveRouter
      })
    );
    response && setLoading(false);
  };

  const moveRouterSignup = (data) => {
    const _email = getEmailForURL(data.email);
    if (data.isPhoneVerified && data.isProfileCompleted) {
      router.push(`/two-factor-auth?userId=${data.id}&phone=${data.phone}`);
    } else {
      router.push(`/profile?userName=${data.userName}&email=${_email}&userId=${data.id}`);
    }
  };

  const signUpWithOAuth = (loginType, email, accessToken) => {
    dispatch(
      loginAndSignUpWithOAuth({
        loginType,
        email,
        accessToken,
        successCallBack: moveRouterSignup
      })
    );
  };

  return {
    isEnableButton,
    handleSubmit,
    onSubmit,
    register,
    errors,
    borderStyle,
    borderSuc,
    showPassword,
    toggleShowPassword,
    isChecked,
    loading,
    signUpWithOAuth,
    router,
    setIsChecked,
    userName,
    email,
    password
  };
}
