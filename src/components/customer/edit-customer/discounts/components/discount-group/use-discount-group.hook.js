'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  createDiscountGroup,
  getAllDiscountGroup
} from '@/provider/features/discount-group/discount-group.slice';

export default function useDiscountGroup(
  discountGroup,
  setDiscountGroup,
  validationSchema = {}
) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    methods,
    formState: { errors }
  } = useForm();
  // {
  //   resolver: yupResolver(validationSchema),
  //   mode: 'onBlur'
  // }
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDiscountGroup();
  }, []);

  const modalCloseHandler = () => {
    setOpen(false);
    reset();
  };

  const discountGroupSubmit = (data) => {
    addDiscountGroup({ ...data, discount: 0 });
    modalCloseHandler();
  };

  const fetchDiscountGroup = async () => {
    const groups = await dispatch(getAllDiscountGroup());

    if (groups.payload) {
      setDiscountGroup(
        groups.payload.map((item) => {
          return { id: `${item.id}`, value: `${item.id}`, label: item.discountGroupName };
        })
      );
    }
  };

  const addDiscountGroup = async (data) => {
    const res = await dispatch(createDiscountGroup({ payload: data }));
    if (res?.payload) {
      fetchDiscountGroup();
    }
  };

  return {
    register,
    handleSubmit,
    methods,
    errors,
    open,
    setOpen,
    modalCloseHandler,
    discountGroupSubmit,
    addDiscountGroup,
    discountGroup,
    setDiscountGroup
  };
}
