'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { City } from 'country-state-city';
import {
  getSingleCustomer,
  updateCustomer
} from '@/provider/features/customer/customer.slice';
import useCountryCity from '@/common/hooks/use-country-city.hook';

const validationSchema = yup.object({
  // Define your validation rules here.
  gender: yup.string().required('Gender is required'),
  firstName: yup
    .string()
    .max(50, 'first name must be at most 50 characters long')
    .required('First name is required'),
  lastName: yup
    .string()
    .max(50, 'last name must be at most 50 characters long')
    .required('Last name is required'),
  designation: yup
    .string()
    .max(100, 'designation must be at most 100 characters long')
    .required('Designation is required'),
  postalCode: yup
    .string()
    .required('Postal Code is required')
    .matches(/[0-9]/, 'Postal must be in digits')
    .max(10, 'postal code must be maximum 10 digits'),
  address: yup
    .string()
    .max(95, 'address must be at most 95 characters long')
    .required('Address is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  companyName: yup
    .string()
    .required('Company name is required')
    .max(160, 'company name must be at most 160 characters long'),
  companyEmail: yup
    .string()
    .email('The Email doesn’t seem to be correct. Please write correct email')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
    .required('Email is required'),
  companyPhone: yup.string().required('Company phone is required'),
  companyMobile: yup.string().required('Company Mobile is required'),
  companySize: yup.string().required('Company Size is required'),
  companyFax: yup.string().required('Company Fax is required'),
  companyUrl: yup.string().required('Company Url is required'),
  tin: yup
    .string()
    .required('TIN is required')
    .min(10, 'TIN must be minimum 10 digits long')
    .max(10, 'TIN must be at most 10 digits long'),
  vat: yup
    .string()
    .required('VAT is required')
    .matches(/^[a-zA-Z]{2}\d{9}$/, 'Is not in correct format'),
  termOfDelivery: yup.string(),
  termOfPayment: yup.string(),
  discountAmount: yup
    .string()
    .max(10, 'Discount must be at most 10 digits long')
    .required('Discount is required'),
  discountDays: yup.string().required('day is required')
});

const bankDetailValidationSchema = yup.object({
  accountOwnerName: yup
    .string()
    .max(100, 'Account must be at most 100 characters long')
    .required('Account is required'),
  iban: yup
    .string()
    .max(34, 'IBAN must be at most 34 digits long')
    .min(15, 'IBAN must be minimum 15 digits')
    // .matches(/^[^.]*$/, {
    //   message: 'No period'
    // })
    // .matches(/^[^.]*$/, {
    //   message: 'Invalid postal'
    // })
    // .matches(/^[^!@#$%^&*+=<>:;|~(){}[\s\]]*$/, {
    //   message: 'Invalid postal'
    // })
    .required('IBAN is required'),
  bic: yup
    .string()
    .max(11, 'BIC must be at most 11 digits long')
    .min(8, 'BIC must be minimum 8 digits')
    .required('bic is required'),
  mendateReferance: yup
    .string()
    .max(18, 'Mandate Reference must be at most 18 characters long')
    .min(6, 'Mandate Reference must be minimum 6 characters')
    .required('Mandate Reference is required'),
  mandateGenerateDate: yup.string().required('Mandate Date is required')
});

const creditCardValidationSchema = yup.object({
  nameOfCreditCard: yup
    .string()
    .max(50, 'Credit Card Name must be at most 50 characters long')
    .min(1, 'Credit Card Name must be minimum 1 characters')
    .required('Credit Card Name is required'),
  creditCardNumber: yup
    .string()
    .required('Credit Card Number is required')
    .matches(/^\d+$/, 'Credit Card Number must contain only digits')
    .length(16, 'Credit Card Number must be exactly 16 digits'),
  creditCardCVV: yup
    .string()
    .matches(/^[0-9]{3}$/, 'CVV must be at most 3 digits long')
    .required('CVV is required'),
  creditCardExpiry: yup.string().required('Credit Card Expiry is required')
});

export default function useEditCustomerOld() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef();
  const customerId = useRef(searchParams.get('id'));
  const [allPriceGroup, setAllPriceGroup] = useState([]);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState([]);
  const [selectedDiscountGroup, setSelectedDiscountGroup] = useState([]);
  const [allDiscountGroup, setAllDiscountGroup] = useState([]);
  const [isAdditional, setIsAdditional] = useState(false);
  const [isAdress, setIsAdress] = useState(true);
  const [paymentType, setPaymentType] = useState('bankDetails');
  const [paymentTermValue, setPaymentTermValue] = useState('PAYMENT_TERMS_AS_DATE');
  const [defaultData, setDefaultData] = useState({});
  const [validationSchemaState, setValidationSchemaState] = useState(validationSchema);
  const [isActive, setIsActive] = useState(false);
  const [country2, setCountry2] = useState('');
  const [cities2, setCities2] = useState([]);

  const isLoading = useSelector((state) => state.customer.getSingle.isLoading);
  const customerAttachment = useSelector((state) => state.customer.getSingle);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchemaState),
    mode: 'onBlur'
  });

  const {
    fields: companyAddressFields,
    append: appendCompanyAddress,
    remove: removeCompanyAddress
  } = useFieldArray({
    control,
    name: 'companyAddresses'
  });

  const additionalhandles = () => {
    setIsAdditional(!isAdditional);
  };

  const adressHandles = () => {
    setIsAdress(!isAdress);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const { handleCountryChange, cities, error, setError, setCountry, country } =
    useCountryCity();

  const onCountryChange = (e) => {
    setValue('country', e.target.value);
    setValue('city', '');
    handleCountryChange(e);
  };

  const onCountry2Change = (e) => {
    setValue('ac_city', '');
    handleCountry2Change(e);
  };

  const handleCountry2Change = (e) => {
    setCountry2(e.target.value);
    setValue('ac_country', e.target.value);
    const [name, code] = e.target.value.split('-');

    const _cities = City.getCitiesOfCountry(code);

    const cityOptions = _cities.map((cit) => ({
      label: cit.name,
      value: cit.name.toLowerCase()
    }));
    setCities2(cityOptions);
  };
  async function fetchAndSetData() {
    if (searchParams.get('id')) {
      let data = await dispatch(
        getSingleCustomer({ payload: Number(searchParams.get('id')) })
      );

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

      handleCountryChange({ target: { value: data.country } });
      if (data?.additionalContact?.length > 0) {
        Object.keys(data.additionalContact[0]).forEach((key) =>
          setValue(`ac_${key}`, data.additionalContact[0][key])
        );
        if (data.additionalContact[0].country) {
          handleCountry2Change({ target: { value: data.additionalContact[0].country } });
        }
      }
      if (data?.companyAddress?.length > 0) {
        const ids = companyAddressFields.map((item) => item.id);

        data.companyAddress.forEach((addressObj, index) => {
          if (!ids.includes(addressObj.id)) {
            appendCompanyAddress({
              id: addressObj.id,
              addressLabel: addressObj.addressLabel,
              address: addressObj.address
            });
          }
        });
      }

      const defaultValues = { ...data };
      setPaymentType(
        data?.paymentDetailType === 'BANK' ? 'bankDetails' : 'creditCardDetails'
      );
      setDefaultData(defaultValues);

      if (data?.priceGroup?.length > 0) {
        setSelectedPriceGroup(getGroupData(data.priceGroup, 'priceGroupName'));
      }
      if (data?.discountGroup?.length > 0) {
        setSelectedDiscountGroup(getGroupData(data.discountGroup, 'discountGroupName'));
      }
      if (data?.termOfDelivery?.length > 0) {
        setValue('termOfDelivery', data.termOfDelivery[0].termOfDelivery);
        setValue('termOfDeliveryId', data.termOfDelivery[0].id);
      }
      setPaymentTermValue(data?.termOfPayment || 'PAYMENT_TERMS_AS_DATE');
      setIsActive(data?.isActive);
      setValue(`${data?.termOfPayment}_DATA`, data?.termOfPaymentData);
    }
  }

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const getGroupData = (group, label) => {
    return group.map((item) => ({
      id: `${item.id}`,
      value: `${item.id}`,
      label: item[label]
    }));
  };

  useEffect(() => {
    let yupObject = yup.object({
      ...validationSchema.fields,
      ...creditCardValidationSchema.fields
    });
    if (paymentType === 'bankDetails') {
      yupObject = yup.object({
        ...validationSchema.fields,
        ...bankDetailValidationSchema.fields
      });
    }
    setValidationSchemaState(yupObject);
  }, [paymentType]);

  const onSubmit = async (data) => {
    if (!country) {
      setError('Country is required');
      return;
    }

    const additionalContactKeys = Object.keys(data).filter((attr) =>
      attr.startsWith('ac')
    );
    const additionalContact = additionalContactKeys.reduce((accumulator, attr) => {
      const key = attr.replace('ac_', '');
      if (key === 'gender' && !['MALE', 'FEMALE'].includes(data[attr])) {
        return { ...accumulator };
      }
      return { ...accumulator, [key]: data[attr] };
    }, {});
    const priceGroups = [
      ...selectedPriceGroup.map((item) => {
        return Number(item.value);
      })
    ];
    const discountGroups = [
      ...selectedDiscountGroup.map((item) => {
        return Number(item.value);
      })
    ];
    const payloadData = {
      gender: data.gender,
      designation: data.designation,
      firstName: data.firstName,
      lastName: data.lastName,
      postalCode: data.postalCode,
      address: data.address,
      country,
      city: data.city,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      companyFax: data.companyFax,
      companyMobile: data.companyMobile,
      companyUrl: data.companyUrl,
      companySize: data.companySize,
      tin: data.tin,
      vat: data.vat,
      vatStatus: data.vatStatus,
      isPDF: data.isPDF,
      isStatus: data.isStatus,
      isActive,
      priceGroups,
      discountGroups,
      discountAmount: Number(data.discountAmount),
      discountDays: Number(data.discountDays),
      additionalContact: [additionalContact],
      companyAddress: data.companyAddresses,
      termOfPayment: paymentTermValue,
      termOfPaymentData: data[`${paymentTermValue}_DATA`],
      termOfDeliveries: [
        {
          termOfDelivery: data.termOfDelivery
        }
      ]
    };
    let payload = {
      ...payloadData,
      paymentDetailType: 'CREDIT_CARD',
      nameOfCreditCard: data.nameOfCreditCard,
      creditCardNumber: `${data.creditCardNumber}`,
      creditCardExpiry: data.creditCardExpiry,
      creditCardCVV: data.creditCardCVV
    };
    if (paymentType === 'bankDetails') {
      payload = {
        ...payloadData,
        paymentDetailType: 'BANK',
        iban: data.iban,
        accountOwnerName: data.accountOwnerName,
        bic: data.bic,
        mendateReferance: data.mendateReferance,
        mandateGenerateDate: data.mandateGenerateDate
      };
    }

    const res = await dispatch(
      updateCustomer({ payload: { data: payload, id: customerId.current } })
    );

    if (res?.payload?.id) {
      router.push('/customer');
    }
  };

  const handleAddInput = () => {
    // const id =
    //   companyAddresses.length > 0
    //     ? companyAddresses[companyAddresses.length - 1].id + 1
    //     : 1;

    appendCompanyAddress({ addressLabel: '', address: '' });
    // setCompanyAddresses([...companyAddresses, { id }]);
  };

  const handleRemoveInput = (index) => {
    removeCompanyAddress(index);
  };

  return {
    isAdditional,
    setIsAdditional,
    additionalhandles,
    isAdress,
    setIsAdress,
    adressHandles,
    register,
    handleSubmit,
    errors,
    id: customerId.current,
    onSubmit,
    handleAddInput,
    companyAddressFields,
    allPriceGroup,
    setAllPriceGroup,
    selectedPriceGroup,
    setSelectedPriceGroup,
    allDiscountGroup,
    setAllDiscountGroup,
    selectedDiscountGroup,
    setSelectedDiscountGroup,
    paymentType,
    setPaymentType,
    paymentTermValue,
    setPaymentTermValue,
    defaultData,
    handleRemoveInput,
    isActive,
    setIsActive,
    control,
    cities,
    country,
    onCountryChange,
    error,
    country2,
    onCountry2Change,
    cities2,
    isLoading,
    customerAttachment,
    handleUploadButtonClick,
    fileInputRef,
    customerId
  };
}
