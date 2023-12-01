'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { AES, enc } from 'crypto-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { isLoginVerified } from '@/common/utils/access-token.util';
import { getEmailForURL, isPhoneVerified } from '@/common/utils/users.util';
import { login, loginAndSignUpWithOAuth } from '@/provider/features/auth/auth.slice';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required')
});

export default function useSuperAdminLogin() {
  const dispatch = useDispatch();

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const { email, password } = watch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (isLoginVerified() && isPhoneVerified()) {
  //     router.push('/dashboard');
  //   }
  // }, [router]);

  // functions
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const borderStyle = {
    border: '1px solid red'
  };
  const borderSuc = {
    border: '1px solid #7E7D7D'
  };

  // const moveRouter = (data) => {
  //   const _email = getEmailForURL(data?.email);

  //   if (data.isPhoneVerified && data?.currentBusinessId) {
  //     router.push(`/two-factor-auth?userId=${data.id}&phone=${data.phone}`);
  //   } else {
  //     if (data.isEmailVerified) {
  //       router.push(
  //         `/profile?userName=${data.userName}&email=${_email}&userId=${data.id}`
  //       );
  //     } else {
  //       router.push(`/verify-email?type=email-verification&email=${_email}`);
  //     }
  //   }
  // };

  // const handleLogin = () => {
  //   if (typeof window === 'object') {
  //     // Check if the browser supports localStorage
  //     if (
  //       localStorage &&
  //       localStorage.getItem('rememberedUsername') &&
  //       localStorage.getItem('rememberedPassword')
  //     ) {
  //       const storedUsername = localStorage.getItem('rememberedUsername');
  //       const storedEncryptedPassword = localStorage.getItem('rememberedPassword');
  //       // Compare the entered password with the stored encrypted password
  //       const bytes = AES.decrypt(
  //         storedEncryptedPassword,
  //         process.env.NEXT_PUBLIC_MAIN_URL_SECRET_KEY
  //       );
  //       const decryptedPassword = bytes.toString(enc.Utf8);
  //       setValue('email', storedUsername);
  //       setValue('password', decryptedPassword);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handleLogin();
  // }, []);

  // const onSubmit = async (values) => {
  //   setLoading(true);
  //   const response = await dispatch(
  //     login({ payload: { ...values }, successCallBack: moveRouter, setLoading })
  //   );
  //   response && setLoading(false);

  //   if (typeof window === 'object' && isChecked) {
  //     // Check if the browser supports localStorage
  //     if (localStorage) {
  //       // Encrypt the password
  //       const encryptedPassword = AES.encrypt(
  //         values.password,
  //         process.env.NEXT_PUBLIC_MAIN_URL_SECRET_KEY
  //       ).toString();
  //       localStorage.setItem('rememberedUsername', values.email);
  //       localStorage.setItem('rememberedPassword', encryptedPassword);
  //     }
  //   }
  //   if (isChecked === false) {
  //     localStorage.removeItem('rememberedUsername');
  //     localStorage.removeItem('rememberedPassword');
  //   }
  // };

  // const loginWithOAuth = (loginType, email, accessToken) => {
  //   dispatch(
  //     loginAndSignUpWithOAuth({
  //       loginType,
  //       email,
  //       accessToken,
  //       successCallBack: moveRouter
  //     })
  //   );
  // };

  return {
    // onSubmit,
    borderStyle,
    borderSuc,
    showPassword,
    isChecked,
    setIsChecked,
    toggleShowPassword,
    router,
    loading,
    // loginWithOAuth,
    register,
    handleSubmit,
    errors,
    password,
    email
  };
}
