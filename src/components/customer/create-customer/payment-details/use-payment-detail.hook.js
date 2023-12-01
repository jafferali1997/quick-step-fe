'use client';

import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  createCustomerAccountDetail,
  getSingleCustomer
} from '@/provider/features/customer/customer.slice';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';

const validationSchema = yup.object({
  accountOwnerName: yup
    .string()
    .nullable()
    .test(
      'conditional-required',
      'Account owner name Alphabetic characters and  must be at most 100 characters long',
      function (value) {
        if (!value || value.trim() === '') {
          return true; // Allow empty values
        }

        return yup
          .string()
          .matches(
            /^[A-Za-z\s]+$/,
            'Account owner name must contain alphabetic characters only'
          )
          .min(1, 'Account owner name must have at least 1 character')
          .max(100, 'Account owner name must have at most 100 characters')
          .isValidSync(value); // Use isValidSync() to perform synchronous validation
      }
    )
    .default(null),
  iban: yup
    .string()
    .nullable()
    .test(
      'conditional-required',
      'IBAN must be minimum 15 digits and at most 34 digits long ',
      function (value) {
        const isEmpty = value === undefined || value === null || value === '';
        if (isEmpty) {
          return true;
        }
        return yup
          .string()
          .max(34, 'IBAN must be at most 34 digits long')
          .min(15, 'IBAN must be minimum 15 digits')

          .isValidSync(value);
      }
    )
    .default(null),

  bic: yup
    .string()
    .nullable()
    .test(
      'conditional-required',
      'BIC must be minimum 8 digits and at most 11 digits long ',
      function (value) {
        const isEmpty = value === undefined || value === null || value === '';
        if (isEmpty) {
          return true;
        }
        return yup
          .string()
          .max(11, 'BIC must be at most 11 digits long')
          .min(8, 'BIC must be minimum 8 digits')

          .isValidSync(value);
      }
    )
    .default(null),

  mendateReferance: yup
    .string()
    .nullable()
    .test(
      'conditional-required',
      'Mandate Reference must be minimum 6 digits and at most 18 digits long ',
      function (value) {
        const isEmpty = value === undefined || value === null || value === '';
        if (isEmpty) {
          return true;
        }
        return yup
          .string()
          .max(18, 'Mandate Reference must be at most 18 characters long')
          .min(6, 'Mandate Reference must be minimum 6 characters')

          .isValidSync(value);
      }
    )
    .default(null),
  mandateGenerateDate: yup.date().nullable().default(null)
});

export default function usePaymentDetails({ handleTabClick, handleTabCompleted }) {
  const [data, setData] = useState();
  const [bankDetail, setBankDetail] = useState(true);
  const [creditCard, setCreditCard] = useState(false);
  const [paymentType, setPaymentType] = useState('bankDetails');
  const [isSubmit, setIsSubmit] = useState(false);
  const [validationSchemaState, setValidationSchemaState] = useState(validationSchema);

  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const validationCreditSchema = yup.object({
    nameOfCreditCard: yup
      .string()

      .nullable()
      .test(
        'conditional-required',
        'Account owner name Alphabetic characters and  must be at most 50 characters long',
        function (value) {
          if (!value || value.trim() === '') {
            return true; // Allow empty values
          }
          return yup
            .string()
            .max(50, 'Credit Card Name must be at most 50 characters long')
            .min(1, 'Credit Card Name must be minimum 1 characters');
        }
      )
      .default(null),
    creditCardNumber: yup
      .string()
      .matches(/^\d+$/, 'Credit Card Number must contain only digits')
      .length(16, 'Credit Card Number must be exactly 16 digits')
      .nullable()
      .default(null),
    creditCardCVV: yup
      .string()
      .matches(/^[0-9]{3}$/, 'CVV must be at most 3 digits long')
      .nullable()
      .default(null),
    creditCardExpiry: yup
      .string()
      .test(
        'expiry-date',
        'Invalid expiry date. Please select a future date.',
        (value) => {
          if (!value) return true; // Allow nullable field
          const currentDate = new Date();
          const selectedDate = new Date(value);
          return selectedDate > currentDate;
        }
      )
      .nullable()
      .default(null),
    accountOwnerName: yup
      .string()
      .nullable()
      .test(
        'conditional-required',
        'Account owner name Alphabetic characters and  must be at most 100 characters long',
        function (value) {
          if (!value || value.trim() === '') {
            return true; // Allow empty values
          }

          return yup
            .string()
            .matches(
              /^[A-Za-z\s]+$/,
              'Account owner name must contain alphabetic characters only'
            )
            .min(1, 'Account owner name must have at least 1 character')
            .max(100, 'Account owner name must have at most 100 characters')
            .isValidSync(value); // Use isValidSync() to perform synchronous validation
        }
      )
      .default(null),
    iban: yup
      .string()
      .nullable()
      .test(
        'conditional-required',
        'IBAN must be minimum 15 digits and at most 34 digits long ',
        function (value) {
          const isEmpty = value === undefined || value === null || value === '';
          if (isEmpty) {
            return true;
          }
          return yup
            .string()
            .max(34, 'IBAN must be at most 34 digits long')
            .min(15, 'IBAN must be minimum 15 digits')

            .isValidSync(value);
        }
      )
      .default(null),

    bic: yup
      .string()
      .nullable()
      .test(
        'conditional-required',
        'BIC must be minimum 8 digits and at most 11 digits long ',
        function (value) {
          const isEmpty = value === undefined || value === null || value === '';
          if (isEmpty) {
            return true;
          }
          return yup
            .string()
            .max(11, 'BIC must be at most 11 digits long')
            .min(8, 'BIC must be minimum 8 digits')

            .isValidSync(value);
        }
      )
      .default(null)

    // mendateReferance: yup
    //   .string()
    //   .nullable()
    //   .test(
    //     'conditional-required',
    //     'Mandate Reference must be minimum 6 digits and at most 18 digits long ',
    //     function (value) {
    //       const isEmpty = value === undefined || value === null || value === '';
    //       if (isEmpty) {
    //         return true;
    //       }
    //       return yup
    //         .string()
    //         .max(18, 'Mandate Reference must be at most 18 characters long')
    //         .min(6, 'Mandate Reference must be minimum 6 characters')

    //         .isValidSync(value);
    //     }
    //   )
    //   .default(null),
    // mandateGenerateDate: yup.date().nullable().default(null)
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationCreditSchema),
    mode: 'onBlur'
  });

  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('id')) {
      const id = Number(searchParams.get('id'));

      async function fetchMyAPI() {
        let data = await dispatch(getSingleCustomer({ payload: id }));
        if (data.payload) {
          data = data.payload;
          Object.keys(data).forEach((key) => {
            if (
              key !== 'updatedBy' &&
              key.toLowerCase().includes('date') &&
              data[key] !== '' &&
              data[key] !== null
            ) {
              setValue(key, data[key]?.split('T')[0]);
            } else {
              setValue(key, data[key]);
            }
          });
          setPaymentType(
            data?.paymentDetailType === 'CREDIT_CARD'
              ? 'creditCardDetails'
              : 'bankDetails'
          );
        }
      }
      if (id) {
        fetchMyAPI();
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (paymentType !== 'bankDetails') {
      const validationCreditSchema = yup.object({
        nameOfCreditCard: yup
          .string()

          .nullable()
          .test(
            'conditional-required',
            'Account owner name Alphabetic characters and  must be at most 50 characters long',
            function (value) {
              if (!value || value.trim() === '') {
                return true; // Allow empty values
              }
              return yup
                .string()
                .max(50, 'Credit Card Name must be at most 50 characters long')
                .min(1, 'Credit Card Name must be minimum 1 characters');
            }
          )
          .default(null),
        creditCardNumber: yup
          .string()
          .matches(/^\d+$/, 'Credit Card Number must contain only digits')
          .length(16, 'Credit Card Number must be exactly 16 digits')
          .nullable()
          .default(null),
        creditCardCVV: yup
          .string()
          .matches(/^[0-9]{3}$/, 'CVV must be at most 3 digits long')
          .nullable()
          .default(null),
        creditCardExpiry: yup
          .string()
          .test(
            'expiry-date',
            'Invalid expiry date. Please select a future date.',
            (value) => {
              if (!value) return true; // Allow nullable field
              const currentDate = new Date();
              const selectedDate = new Date(value);
              return selectedDate > currentDate;
            }
          )
          .nullable()
          .default(null),
        accountOwnerName: yup
          .string()
          .nullable()
          .test(
            'conditional-required',
            'Account owner name Alphabetic characters and  must be at most 100 characters long',
            function (value) {
              if (!value || value.trim() === '') {
                return true; // Allow empty values
              }

              return yup
                .string()
                .matches(
                  /^[A-Za-z\s]+$/,
                  'Account owner name must contain alphabetic characters only'
                )
                .min(1, 'Account owner name must have at least 1 character')
                .max(100, 'Account owner name must have at most 100 characters')
                .isValidSync(value); // Use isValidSync() to perform synchronous validation
            }
          )
          .default(null),
        iban: yup
          .string()
          .nullable()
          .test(
            'conditional-required',
            'IBAN must be minimum 15 digits and at most 34 digits long ',
            function (value) {
              const isEmpty = value === undefined || value === null || value === '';
              if (isEmpty) {
                return true;
              }
              return yup
                .string()
                .max(34, 'IBAN must be at most 34 digits long')
                .min(15, 'IBAN must be minimum 15 digits')

                .isValidSync(value);
            }
          )
          .default(null),

        bic: yup
          .string()
          .nullable()
          .test(
            'conditional-required',
            'BIC must be minimum 8 digits and at most 11 digits long ',
            function (value) {
              const isEmpty = value === undefined || value === null || value === '';
              if (isEmpty) {
                return true;
              }
              return yup
                .string()
                .max(11, 'BIC must be at most 11 digits long')
                .min(8, 'BIC must be minimum 8 digits')

                .isValidSync(value);
            }
          )
          .default(null)

        // mendateReferance: yup
        //   .string()
        //   .nullable()
        //   .test(
        //     'conditional-required',
        //     'Mandate Reference must be minimum 6 digits and at most 18 digits long ',
        //     function (value) {
        //       const isEmpty = value === undefined || value === null || value === '';
        //       if (isEmpty) {
        //         return true;
        //       }
        //       return yup
        //         .string()
        //         .max(18, 'Mandate Reference must be at most 18 characters long')
        //         .min(6, 'Mandate Reference must be minimum 6 characters')

        //         .isValidSync(value);
        //     }
        //   )
        //   .default(null),
        // mandateGenerateDate: yup.date().nullable().default(null)
      });
      setValidationSchemaState(validationCreditSchema);
    }
    if (paymentType === 'bankDetails') {
      setValidationSchemaState(validationSchema);
    }
  }, [paymentType]);

  const onSubmit = async (value) => {
    let hasErrors = false;
    if (value.iban || value.accountOwnerName || value.bic) {
      if (!value.iban) {
        setError('iban', {
          type: 'required',
          message: 'IBAN is required'
        });
        hasErrors = true;
      }
      if (!value.accountOwnerName) {
        setError('accountOwnerName', {
          type: 'required',
          message: 'Account Owner Name is required'
        });
        hasErrors = true;
      }
      if (!value.bic) {
        setError('bic', {
          type: 'required',
          message: 'BIC is required'
        });
        hasErrors = true;
      }
      // if (!value.mendateReferance) {
      //   setError('mendateReferance', {
      //     type: 'required',
      //     message: 'Mendate Referance is required'
      //   });
      //   hasErrors = true;
      // }
      // if (!value.mandateGenerateDate) {
      //   setError('mandateGenerateDate', {
      //     type: 'required',
      //     message: 'Mandate Generate Date is required'
      //   });
      //   hasErrors = true;
      // }
    }
    if (
      value.nameOfCreditCard ||
      value.creditCardNumber ||
      value.creditCardExpiry ||
      value.creditCardCVV
    ) {
      if (!value.nameOfCreditCard) {
        setError('nameOfCreditCard', {
          type: 'required',
          message: 'Name of Credit Card is required'
        });
        hasErrors = true;
      }
      if (!value.creditCardNumber) {
        setError('creditCardNumber', {
          type: 'required',
          message: 'Credit Card Number is required'
        });
        hasErrors = true;
      }
      if (!value.creditCardExpiry) {
        setError('creditCardExpiry', {
          type: 'required',
          message: 'Credit Card Expiry is required'
        });
        hasErrors = true;
      }
      if (!value.creditCardCVV) {
        setError('creditCardCVV', {
          type: 'required',
          message: 'CVV is required'
        });
        hasErrors = true;
      }
    }

    const payload = {
      paymentDetailType: 'BANK',
      ...(value.nameOfCreditCard && { nameOfCreditCard: value.nameOfCreditCard }),
      ...(value.creditCardNumber && { creditCardNumber: value.creditCardNumber }),
      ...(value.creditCardExpiry && { creditCardExpiry: value.creditCardExpiry }),
      ...(value.creditCardCVV && { creditCardCVV: value.creditCardCVV }),
      ...(value.iban && { iban: value.iban }),
      ...(value.accountOwnerName && { accountOwnerName: value.accountOwnerName }),
      ...(value.bic && { bic: value.bic }),
      ...(value.mendateReferance && { mendateReferance: value.mendateReferance }),
      ...(value.mandateGenerateDate && { mandateGenerateDate: value.mandateGenerateDate })
    };

    if (!hasErrors) {
      const res = await dispatch(
        createCustomerAccountDetail({
          payload: {
            ...payload,
            customerId: Number(searchParams.get('id'))
          }
        })
      );
      if (res.payload?.id) {
        handleTabClick('discount');
        handleTabCompleted('payment_details');
      }
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    bankDetail,
    setBankDetail,
    setCreditCard,
    creditCard,
    setIsSubmit,
    router,
    data,
    errors,
    paymentType,
    setPaymentType
  };
}
