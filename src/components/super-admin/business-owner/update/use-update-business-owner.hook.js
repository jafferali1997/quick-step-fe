import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  checkEmailExists,
  checkUsernameExists,
  getSingleBusinessOwner,
  updateBusinessOwner
} from '@/provider/features/user/user.slice';
import { uploadSingleFile } from '@/provider/features/upload-file/upload-file.slice';
import useCountryCity from '@/common/hooks/use-country-city.hook';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .nullable()
    .test('is-valid-value', 'First Name must be at least 1 character', function (value) {
      if (!value || value.length === 0) {
        // Field is empty or not started entering data
        return true; // No validation error
      }

      return value.length >= 1;
    })
    .max(50, 'First Name must be at most 50 characters'),

  lastName: yup
    .string()
    .nullable()
    .test('is-valid-value', 'Last Name must be at least 1 character', function (value) {
      if (!value || value.length === 0) {
        // Field is empty or not started entering data
        return true; // No validation error
      }

      return value.length >= 1;
    })
    .max(50, 'Last Name must be at most 50 characters'),

  userName: yup
    .string()
    .required('Username is required')
    .test('is-valid-value', 'Username must be at least 5 characters', function (value) {
      if (!value || value.length === 0) {
        // Field is empty or not started entering data
        return true; // No validation error
      }

      return value.length >= 5;
    })
    .max(30, 'Username must be at most 30 characters'),

  // Add more fields with similar validation rules

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required')
    .min(3, 'Email must be at least 3 characters')
    .max(254, 'Email must be at most 254 characters'),

  // countryCode: yup.string().required('Country Code is required'),

  // Add more validation rules for IBAN and VAT fields
  iban: yup.string(),
  vat: yup.string(),
  // Add validation rules for business details
  businessName: yup
    .string()
    .test(
      'is-valid-value',
      'Company name must be at least 1 characters',
      function (value) {
        if (!value || value.length === 0) {
          // Field is empty or not started entering data
          return true; // No validation error
        }

        return value.length >= 1;
      }
    )
    // .required('Company Name is required')
    .max(150, 'Company Name must beat most 150 characters'),
  phoneNumber: yup.number().notRequired().min(8, 'Please enter a valid phone number'),

  address: yup
    .string()
    .notRequired()
    .test(
      'is-valid-address',
      'Company Address must be between 1 and 255 characters',
      function (value) {
        if (!value || value.length === 0) {
          // Field is empty or not started entering data
          return true; // No validation error
        }

        return value.length >= 1 && value.length <= 255;
      }
    ),
  population: yup.string(),
  slogan: yup.string()
  // country: yup.string().required('Select Country is required'),
  // city: yup.string().required('Select City is required')
});

function useUpdateBusinessOwner() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const id = searchParams.get('id');

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });
  const { handleCountryChange, cities } = useCountryCity();

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const response = await dispatch(getSingleBusinessOwner({ payload: id }));
    if (response.payload) {
      setValue('firstName', response.payload.profile?.firstName);
      setValue('lastName', response.payload.profile?.firstName);
      setValue('userName', response.payload?.userName);
      setValue('phoneNumber', response.payload?.phone);
      setValue('email', response.payload.email);
      setValue('country', response.payload.profile?.country);
      setValue('city', response.payload.profile?.city);

      // Business Details
      setValue('businessName', response.payload.businessDetail?.businessName);
      setValue('businessEmail', response.payload.businessDetail?.businessEmail);
      setValue('businessLogo', response.payload.businessDetail?.businessLogo);
      setValue('slogan', response.payload.businessDetail?.slogan);
      setValue('address', response.payload.businessDetail?.address);
      setValue('population', response.payload.businessDetail?.population);
      setLogo(response.payload.businessDetail?.logo);

      // Financial Detail
      setValue('iban', response.payload.financialDetail?.iban);
      setValue('vat', response.payload.financialDetail?.vat);
    }
  };

  const onChangeInput = async (inputValue) => {
    if (inputValue.length >= 4) {
      const res = await dispatch(
        checkUsernameExists({
          payload: inputValue
        })
      );

      if (res?.payload?.data?.result) {
        setError('userName', { message: 'Username already used.' });
      } else {
        clearErrors('userName');
        setValue('userName', inputValue);
      }
    }
  };
  const onBlurInput = async (e) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 4) {
      const res = await dispatch(
        checkEmailExists({
          payload: inputValue
        })
      );

      if (res?.payload?.data?.result) {
        setError('email', { message: 'email already used.' });
      } else {
        clearErrors('email');
      }
    }
  };

  const onCountryChange = ({ label, value }) => {
    setValue('country', { value, label });
    setValue('city', {
      label: 'Select City',
      value: ''
    });

    const event = {
      target: {
        value: value && value.match(/[A-Za-z]+-[A-Z]{2}/)[0]
      }
    };
    handleCountryChange(event);
  };

  const onSubmit = async (data) => {
    const response = await dispatch(
      updateBusinessOwner({
        payload: {
          ...data,
          role: 'BUSINESS_OWNER',
          businessLogo: logo,
          country: data.country.value
        },
        id
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      router.push('/super-admin/business-owner');
    }
  };

  const handleFileInputChange = async (event) => {
    setLoading(true);
    const { files } = event.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('module', 'ANY');

    const response = await dispatch(uploadSingleFile({ payload: formData }));
    if (response.meta.requestStatus === 'fulfilled') {
      setLoading(false);
      setLogo(response.payload.url);
    }
    // Reset the input element value
    event.target.value = '';
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    control,
    onCountryChange,
    cities,
    onChangeInput,
    onBlurInput,
    logo,
    handleFileInputChange,
    loading,
    id
  };
}

export default useUpdateBusinessOwner;
