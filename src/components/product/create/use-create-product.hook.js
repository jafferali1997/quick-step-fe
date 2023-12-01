'use client';

/* eslint-disable no-restricted-globals */

import React, { useEffect, useRef, useState } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { getOrCreateTag } from '@/provider/features/tag/tag.slice';
import useCreateCategories from '@/components/categories/use-create-categories.hooks';
import { createProduct, updateProduct } from '@/provider/features/product/product.slice';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';

const isDecimalFormat = (value) => {
  if (value === '' || value === null) return true; // Allow empty values
  const parsedValue = parseFloat(value);
  return (
    !isNaN(parsedValue) &&
    /^\d{0,7}(\.\d{1,2})?$/.test(value) &&
    parsedValue !== 0 &&
    parsedValue <= 99999999.99
  );
};
const validationSchema = yup.object({
  productName: yup
    .string()
    .required('Product Name is required')
    .trim()
    .min(1, 'Product Name must be at least 1 character long')
    .max(70, 'Product Name must be at most 70 characters long')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Product Name must contain only alphanumeric characters')
    .matches(/^[^\s]/, 'Product Name cannot start with a space'),
  description: yup
    .string()
    .trim()
    .test(
      'descriptionFormat',
      'Description must contain only alphanumeric characters',
      function (value) {
        if (!value) {
          // If value is empty, skip min() and max() validations
          return true;
        }
        return value.length >= 1 && value.length <= 160 && /^[a-zA-Z0-9\s]+$/.test(value);
      }
    ),
  netPrice: yup.number().required('Net Price is required'),
  grossPrice: yup.number().required('Gross Price is required'),

  taxRate: yup.string().required('Tax Rate is required'),
  purchasePrice: yup.string(),
  minSellingPrice: yup.string(),
  quantity: yup.string(),
  storageLocation: yup.string(),
  productNumber: yup
    .string()
    .required('Product number is required')
    .min(1, 'Product number must be at least 1 character')
    .max(150, 'Product number cannot exceed 150 characters')
    .nullable(false),
  gtinEan: yup
    .string()
    .matches(/^\d{13}$/, 'GTIN/EAN must be exactly 13 digits')
    .nullable(),
  notice: yup
    .string()
    .min(1, 'Notice must be at least 1 character')
    .max(1000, 'Notice cannot exceed 1000 characters')
    .nullable(),
  sku: yup
    .string()
    .test('sku', 'SKU must be between 6 and 20 characters', (value) => {
      if (value === null || value === '') {
        return true; // Allow null or empty value if optional
      }
      return value.length >= 6 && value.length <= 20;
    })
    .nullable()
});

export default function useCreateProduct(id = null) {
  const dispatch = useDispatch();
  const getOrCreateTagData = useSelector((state) => state.tag.getOrCreate);
  const [taxRate, setTaxRate] = useState({ value: '', label: '' });
  const [selectedUnit, setSelectedUnit] = useState({ value: '', label: '' });
  const [priceInputValues, setPriceInputValues] = useState([]);
  const [discountInputValues, setDiscountInputValues] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { categories, handleClickCategory } = useCreateCategories();
  const {
    handleSubmit,
    register,
    setError,
    control,
    formState: { errors },
    clearErrors,
    trigger,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    if (getOrCreateTagData?.isError) {
      setSelectedTag([...selectedTag]);
    }
  }, [getOrCreateTagData]);

  useEffect(() => {
    if (selectedCategory.length && errors.category) {
      clearErrors('category');
    }
  }, [selectedCategory]);

  const handlePriceInput = (data, indexToChange = null, toDelete = false) => {
    if (indexToChange !== null && indexToChange !== undefined) {
      if (toDelete) {
        setPriceInputValues([
          ...priceInputValues.filter((item, index) => index !== indexToChange)
        ]);
      } else {
        setPriceInputValues([
          ...priceInputValues.map((item, index) => {
            if (index === indexToChange) {
              return data;
            }
            return item;
          })
        ]);
      }
    } else {
      setPriceInputValues([...priceInputValues, data]);
    }
  };
  const handleDiscountInput = (data, indexToChange = null, toDelete = false) => {
    if (indexToChange !== null && indexToChange !== undefined) {
      if (toDelete) {
        setDiscountInputValues([
          ...discountInputValues.filter((item, index) => index !== indexToChange)
        ]);
      } else {
        setDiscountInputValues([
          ...discountInputValues.map((item, index) => {
            if (index === indexToChange) {
              return data;
            }
            return item;
          })
        ]);
      }
    } else {
      setDiscountInputValues([...discountInputValues, data]);
    }
  };

  const handleSelectedTags = (data) => {
    setSelectedTag([...selectedTag, data]);
  };

  const handleTags = (data) => {
    if (data.length > selectedTag.length) {
      dispatch(
        getOrCreateTag({
          payload: { tagName: data[data.length - 1] },
          successCallback: handleSelectedTags
        })
      );
    }

    if (data?.target?.value?.length > 0) {
      dispatch(
        getOrCreateTag({
          payload: { tagName: data.target.value },
          successCallback: handleSelectedTags
        })
      );
      data.target.value = '';
    }

    if (data.length < selectedTag.length) {
      setSelectedTag([...selectedTag.filter((item) => data.includes(item.tagName))]);
    }
  };

  const onSubmit = (data, netPrice, grossPrice) => {
    if (netPrice === (0 || 0.0)) {
      setError('netPrice', {
        type: 'required',
        message: 'This field is required'
      });
    } else {
      clearErrors('netPrice');
    }
    console.log('data', data);
    // payload
    const payload = removeEmptyKeys({
      ...data,
      quantity: Number(data.quantity),
      taxRateId: Number(data.taxRateId),
      unitId: Number(data.unit),
      netPrice: Number(netPrice),
      grossPrice: Number(grossPrice),
      ...(data.sku && { sku: Number(data.sku) }),
      purchasePrice: Number(data.purchasePrice),
      minSellingPrice: Number(data.minSellingPrice),
      productCategorys: selectedCategory.map((item) => item[item.length - 1].id),
      priceGroups: priceInputValues.map((item) => {
        return { id: item.id, price: item.price };
      }),
      discountGroups: discountInputValues.map((item) => {
        return { id: item.id, discount: item.discount };
      }),
      tags: selectedTag.map((item) => item.id)
    });
    if (id) {
      dispatch(
        updateProduct({
          payload: { data: payload, id },
          successCallback: () => router.push('/product')
        })
      );
    } else {
      dispatch(
        createProduct({ payload, successCallback: () => router.push('/product') })
      );
    }
  };

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
    setPriceInputValues,
    setDiscountInputValues,
    handleClickCategory,
    setSelectedTag,
    control,
    trigger,
    formRef,
    setValue,
    taxRate,
    setTaxRate,
    selectedUnit,
    setSelectedUnit
  };
}
