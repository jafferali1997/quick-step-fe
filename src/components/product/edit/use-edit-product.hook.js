'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import useCreateProduct from '../create/use-create-product.hook';
import { getSingleProduct } from '@/provider/features/product/product.slice';

export default function useEditProduct() {
  const param = useParams();
  const {
    priceInputValues,
    handlePriceInput,
    setPriceInputValues,
    setDiscountInputValues,
    discountInputValues,
    handleDiscountInput,
    selectedTag,
    handleTags,
    onSubmit,
    handleSubmit,
    register,
    categories,
    errors,
    selectedCategory,
    setSelectedCategory,
    handleClickCategory,
    setSelectedTag,
    control,
    setValue,
    taxRate,
    setTaxRate
  } = useCreateProduct(param.id);

  const dispatch = useDispatch();
  const getSingleProductData = useSelector((state) => state.product.getSingle);
  const isLoading = useSelector((state) => state.product.getSingle.isLoading);

  useEffect(() => {
    if (param) {
      dispatch(getSingleProduct({ payload: param.id }));
    }
  }, []);

  useEffect(() => {
    if (getSingleProductData.isSuccess) {
      const tempArray = [
        ...getSingleProductData.data.productCategorys.map((item) => [...item])
      ];
      setSelectedCategory([...tempArray.map((item) => item.reverse())]);
      setDiscountInputValues([
        ...getSingleProductData.data.discountGroups.map((item) => ({
          ...item,
          discount: item.ProductDiscountGroup.discount
        }))
      ]);
      setPriceInputValues([
        ...getSingleProductData.data.priceGroups.map((item) => ({
          ...item,
          price: item.ProductPriceGroup.price
        }))
      ]);
      setSelectedTag([...getSingleProductData.data.tags]);
      setTaxRate({
        value: getSingleProductData.data.taxRateId,
        label: getSingleProductData.data.taxRate.taxRate
      });
      setValue('unit', getSingleProductData.data.unitId);
    }
  }, [getSingleProductData]);

  return {
    priceInputValues,
    handlePriceInput,
    discountInputValues,
    handleDiscountInput,
    selectedTag,
    handleTags,
    onSubmit,
    handleSubmit,
    register,
    categories,
    errors,
    selectedCategory,
    setSelectedCategory,
    handleClickCategory,
    control,
    data: getSingleProductData.data,
    isLoading,
    setValue,
    taxRate,
    setTaxRate
  };
}
