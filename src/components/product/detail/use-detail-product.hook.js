'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'next/navigation';
import useCreateProduct from '../create/use-create-product.hook';
import { getSingleProduct } from '@/provider/features/product/product.slice';

export default function useDetailProduct() {
  const dispatch = useDispatch();
  const param = useParams();
  const getSingleProductData = useSelector((state) => state.product.getSingle);
  const [priceInputValues, setPriceInputValues] = useState([]);
  const [discountInputValues, setDiscountInputValues] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

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
    }
  }, [getSingleProductData]);

  return {
    priceInputValues,
    discountInputValues,
    selectedTag,
    selectedCategory,
    isLoading,
    data: getSingleProductData.data
  };
}
