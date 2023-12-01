'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPriceGroup,
  getAllPriceGroup
} from '@/provider/features/price-group/price-group.slice';

export default function usePriceGroup(setPriceGroup, validationSchema = {}) {
  const dispatch = useDispatch();
  const priceGroup = useSelector((state) => state.priceGroup);
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
    fetchPriceGroup();
  }, []);

  useEffect(() => {
    if (priceGroup.getAll.isSuccess) {
      setPriceGroup(
        priceGroup.getAll.data.map((item) => {
          return { id: `${item.id}`, value: item.id, label: item.priceGroupName };
        })
      );
    }
  }, [priceGroup]);

  const modalCloseHandler = () => {
    setOpen(false);
    reset();
  };

  const priceGroupSubmit = (data) => {
    addPriceGroup({ ...data, price: 0 });
    modalCloseHandler();
  };

  const fetchPriceGroup = async () => {
    dispatch(getAllPriceGroup());
  };

  const addPriceGroup = async (data) => {
    dispatch(createPriceGroup({ payload: data, successCallBack: fetchPriceGroup }));
  };

  return {
    register,
    handleSubmit,
    methods,
    errors,
    open,
    setOpen,
    modalCloseHandler,
    priceGroupSubmit,
    addPriceGroup,
    setPriceGroup
  };
}
