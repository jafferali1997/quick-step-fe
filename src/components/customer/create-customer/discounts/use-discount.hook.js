'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  createCustomerDiscount,
  getSingleCustomer
} from '@/provider/features/customer/customer.slice';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';

const validationSchema = yup.object({
  // Define your validation rules here.
  discountAmount: yup
    .string()
    .nullable()
    .max(10, 'Discount must be at most 10 characters long')
    .default(null),
  // .required('Discount is required'),
  discountDays: yup.string().nullable().default(null)
  // .required('day is required')
});

export default function useDiscount({ handleTabClick, handleTabCompleted }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });
  const [data, setData] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueData, setSelectedValueData] = useState('');
  const [allPriceGroup, setAllPriceGroup] = useState([]);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState([]);
  const [dataCustomer, setDataCustomer] = useState({});

  const [selectedDiscountGroup, setSelectedDiscountGroup] = useState([]);
  const [allDiscountGroup, setAllDiscountGroup] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const TRIGGER_ACTION_OPTIONS = [
    {
      label: 'Payment Terms as date',
      value: 'PAYMENT_TERMS_AS_DATE',
      defaultChecked: true
    }
  ];
  useEffect(() => {
    if (searchParams.get('id')) {
      const id = Number(searchParams.get('id'));

      async function fetchMyAPI() {
        let data = await dispatch(getSingleCustomer({ payload: id }));
        if (data.payload) {
          data = data.payload;
          Object.keys(data).forEach((key) => setValue(key, data[key]));
          setSelectedValue(data.termOfPayment);
          setSelectedValueData(data.termOfPaymentData);
          setDataCustomer(data);
        }
      }

      if (id) {
        fetchMyAPI();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedValueData(null);
  };

  const onSubmit = async (value, selectedValueDelivery, status, vatStatus, isPDF) => {
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
    const res = await dispatch(
      createCustomerDiscount({
        payload: removeEmptyKeys({
          discountDays: Number(value.discountDays),
          discountAmount:
            Number(value.discountAmount) !== 0 ? Number(value.discountAmount) : null,
          customerId: Number(searchParams.get('id')),
          termOfPayment: selectedValue,
          termOfPaymentData: selectedValueData,
          vatStatus,
          isPDF,
          isStatus: status,
          isActive: status,
          priceGroups,
          discountGroups,
          termOfDeliveries: [
            {
              termOfDelivery: selectedValueDelivery?.termOfDelivery
            }
          ]
        })
      })
    );
    if (res.payload?.id) {
      // handleTabClick('manage_terms');
      // handleTabCompleted('discount');

      router.push('/customer');
      // handleTabClick('customer_details');
    }
  };

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    setIsSubmit,
    router,
    data,
    selectedValue,
    setSelectedValue,
    allPriceGroup,
    setAllPriceGroup,
    selectedPriceGroup,
    setSelectedPriceGroup,
    allDiscountGroup,
    setAllDiscountGroup,
    selectedDiscountGroup,
    setSelectedDiscountGroup,
    TRIGGER_ACTION_OPTIONS,
    handleOptionChange,
    setSelectedValueData,
    dataCustomer
  };
}
