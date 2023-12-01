'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
  addPhoneAndGenerateOtp,
  generateOtp,
  getCurrentUser,
  verifyOtp
} from '@/provider/features/user/user.slice';
import { profileFinancialBusiness } from '@/provider/features/profile-financial-business/profile-financial-business.slice';
import { logout } from '@/provider/features/auth/auth.slice';
import useCountryCity from '@/common/hooks/use-country-city.hook';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
  userName: Yup.string()
    .required('User name is required')
    .max(30, 'Username must be at most 30 characters long'),
  // .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'),
  country: Yup.string(),
  city: Yup.string().required('City name is required'),
  businessName: Yup.string()
    .required('Company Name is required')
    .max(150, 'Company name must be 150 characters long')
    .matches(/^[a-zA-Z0-9\s]*$/, 'Company name can only contain alphanumeric characters'),
  slogan: Yup.string()
    .required('slogan is required')
    .max(150, 'slogan must be 150 characters long')
    .matches(/^[a-zA-Z0-9\s]*$/, 'slogan can only contain alphanumeric characters'),
  businessEmail: Yup.string().required('Business Email is required'),
  population: Yup.string().required('Population is required'),
  address: Yup.string()
    .required('Address is required')
    .max(255, 'Address can contain maximum 255 characters')
});

export default function useProfile() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [defaultCountryCode, setDefaultCountryCode] = useState('us');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const sendOtpButtonText = useRef('Send OTP');
  const [defaultCountry, setDefaultCountry] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    resetField,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const { handleCountryChange, cities, error, setError, setCountry, country } =
    useCountryCity();

  useEffect(() => {
    if (localStorage.getItem('userProfile')) {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      if (userProfile.isOtpVerified) {
        setOtp(userProfile.otp);
        setPhone(userProfile.phone);
        setValue('phone', userProfile.phone);
        setIsOtpVerified(userProfile.isOtpVerified);
      } else {
        // localStorage.removeItem('userProfile');
      }
    }
    localStorage.setItem('isCountryChange', false);

    setValue('email', searchParams.get('email'));
    setValue('userName', searchParams.get('userName'));

    axios
      .get('https://api.ipify.org/?format=json')
      .then((res) => {
        // console.log('IP:', res);
        axios
          .get(`https://ipapi.co/${res.data.ip}/json/`)
          .then((res) => {
            // console.log('Info:', res);
            const { data } = res;
            const _country = `${res.data.country_name.toLowerCase()}-${
              res.data.country_code
            }`;
            setCountry(_country);
            const event = {
              target: {
                value: _country
              }
            };
            handleCountryChange(event);
            setValue('city', data.city.toLowerCase());
            setDefaultCountryCode(data.country_code.toLowerCase());
          })
          .catch((err) => {
            console.log('Error while geting Info:', err);
          });
      })
      .catch((err) => {
        console.log('Error while geting IP:', err);
      });
  }, []);

  const moveRouter = (data) => {
    console.log('move router');
  };

  const onCountryChange = (e) => {
    // resetField('country');
    // setCountry('country', e.target.value);
    setValue('city', '');
    handleCountryChange(e);
  };

  const onSubmit = async (data) => {
    if (!country) {
      setError('Country is required');
      return;
    }
    const res = await dispatch(
      profileFinancialBusiness({ payload: { ...data, country, businessLogo: 'null' } })
    );
    if (res.payload === 'Profile created successfully') {
      const user = await dispatch(getCurrentUser({ successCallBack: () => {} }));

      if (user?.payload?.id) {
        router.push('/dashboard');
      }
    }
  };

  const sendOtp = () => {
    if (
      sendOtpButtonText.current === 'Send OTP' ||
      sendOtpButtonText.current === 'Resend'
    ) {
      if (phone) {
        sendOtpButtonText.current = 'Resend';
        dispatch(addPhoneAndGenerateOtp({ payload: { phone } }));
      }
    } else {
      dispatch(generateOtp());
    }
  };

  const handleOtpVerif = (data) => {
    if (data) {
      setIsOtpVerified(true);
      localStorage.setItem(
        'userProfile',
        JSON.stringify({
          userName: searchParams.get('userName'),
          email: searchParams.get('email'),
          isOtpVerified: true,
          phone,
          otp
        })
      );
    }
  };

  const logoutClickHandler = async () => {
    dispatch(logout());
    router.push('/');
  };

  const verifyOtpHandler = () => {
    if (otp > 0) {
      const otpData = {
        otp: Number(otp)
      };
      dispatch(verifyOtp({ payload: otpData, successCallBack: handleOtpVerif }));
    }
  };

  return {
    otp,
    setOtp,
    register,
    handleSubmit,
    control,
    setValue,
    errors,
    onSubmit,
    phone,
    setPhone,
    sendOtpButtonText,
    sendOtp,
    verifyOtpHandler,
    isOtpVerified,
    setIsOtpVerified,
    cities,
    logoutClickHandler,
    onCountryChange,
    country,
    error,
    defaultCountryCode
  };
}
