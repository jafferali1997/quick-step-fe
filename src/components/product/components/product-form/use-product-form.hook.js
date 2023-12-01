/* eslint-disable no-restricted-globals */

'use client';

import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPriceGroup } from '@/provider/features/price-group/price-group.slice';
import { getAllDiscountGroup } from '@/provider/features/discount-group/discount-group.slice';
import { getAllTaxRate } from '@/provider/features/tax-rate/tax-rate.slice';
import { getCurrentUser } from '@/provider/features/user/user.slice';
import { getAllUnit } from '@/provider/features/unit/unit.slice';

export default function useProductForm(
  categories,
  handleDiscountInput,
  handlePriceInput,
  setSelectedCategory,
  selectedCategory,
  handleClickCategory,
  setValue,
  taxRate,
  setTaxRate,
  data,
  selectedUnit,
  setSelectedUnit
) {
  const [modalData, setModalData] = useState([]);
  // const [taxRate, setTaxRate] = useState({ value: '', label: '' });
  const [netPrice, setNetPrice] = useState(data.netPrice ?? 0);
  const [grossPrice, setGrossPrice] = useState(data.grossPrice ?? 0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [categoryToMap, setCategoryToMap] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [filteredPriceGroup, setFilteredPriceGroup] = useState([]);
  const [filteredDiscountGroup, setFilteredDiscountGroup] = useState([]);
  const [actionType, setActionType] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();
  const priceGroupList = useSelector((state) => state.priceGroup.getAll);
  const discountGroupList = useSelector((state) => state.discountGroup.getAll);
  const taxRateList = useSelector((state) => state.taxRate.getAllTaxRate);
  const unitList = useSelector((state) => state.unit.getAllUnit);
  const currentUser = useSelector((state) => state.user.user);
  const [openMenuPopup, setOpenMenuPopup] = useState(false);
  const [openMenu2Popup, setOpenMenu2Popup] = useState(false);

  const openMenuPopupRef = useRef();
  const openMenu2PopupRef = useRef();
  useEffect(() => {
    if (priceGroupList.isSuccess) {
      setFilteredPriceGroup([
        ...priceGroupList.data.map((item) => {
          return { label: item.priceGroupName, value: item.id };
        })
      ]);
    }
  }, [priceGroupList]);

  useEffect(() => {
    if (discountGroupList.isSuccess) {
      setFilteredDiscountGroup([
        ...discountGroupList.data.map((item) => {
          return { label: item.discountGroupName, value: item.id };
        })
      ]);
    }
  }, [discountGroupList]);

  useEffect(() => {
    dispatch(getAllPriceGroup());
    dispatch(getAllDiscountGroup());
    dispatch(getAllTaxRate({ payload: {} }));
    dispatch(getAllUnit({ payload: {} }));
    dispatch(getCurrentUser({ successCallBack: () => {} }));
  }, []);

  useEffect(() => {
    setValue('taxRate', taxRate?.label);
    setValue('taxRateId', taxRate?.value);
  }, [taxRate]);

  useEffect(() => {
    if (!taxRate.value && taxRateList.isSuccess && currentUser.isSuccess) {
      const defaultTax = taxRateList.data.find(
        (item) => item.id === currentUser?.data?.businessDetail?.defaultTaxRateId
      );
      setTaxRate({
        value: defaultTax?.id ?? 0,
        label: defaultTax?.taxRate?.toString() ?? 0
      });
      // if (taxRate?.value === undefined) {

      //   setTaxRate({
      //     value: Number(defaultTax?.taxRate) ?? 0,
      //     label: Number(defaultTax?.taxRate) ?? 0
      //   });
      // }
    }
  }, [taxRateList, currentUser]);

  // useEffect(() => {
  //   if (taxRateList.isSuccess && currentUser.isSuccess && taxRate.value === 0) {

  //     const defaultTax = taxRateList.data.find(
  //       (item) => item.id === currentUser?.data?.businessDetail?.defaultTaxRateId
  //     );
  //     setTaxRate({
  //       value: Number(defaultTax?.taxRate) ?? 0,
  //       label: Number(defaultTax?.taxRate) ?? 0
  //     });
  //   }
  // }, [taxRateList, currentUser, taxRate.value]);

  useEffect(() => {
    if (taxRate?.label > 0) {
      const tempGross = +netPrice * (1 + Number(taxRate.label) / 100);
      if (parseFloat(tempGross).toFixed(2) !== parseFloat(+grossPrice).toFixed(2)) {
        setGrossPrice(`${parseFloat(tempGross).toFixed(2)}`);
      }
    }
  }, [taxRate?.label]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (categories?.length >= 1) {
      if (
        categoryId &&
        categories.find((category) => category.categoryToRender === categoryId)
      ) {
        setCategoryToMap([
          ...categories.find((category) => category.categoryToRender === categoryId)
            .categories
        ]);
      } else {
        setCategoryToMap([...categories[0].categories]);
      }
    }
  }, [categories, categoryId]);

  const handleModalData = (type, index = null, data = null) => {
    switch (type) {
      case 'updatePrice':
        setModalData([
          {
            button: 'Update',
            id: index,
            label: 'Group Name',
            type: 'select',
            value: data.id,
            options: [
              ...filteredPriceGroup,
              { label: data.priceGroupName, value: data.id }
            ]
          },
          { id: index, label: 'price', value: data.price, type: 'number' }
        ]);
        setActionType('updatePrice');
        break;
      case 'createPrice':
        setModalData([
          {
            button: 'Add',
            label: 'Group Name',
            type: 'select',
            options: filteredPriceGroup,
            value: ''
          },
          { label: 'price', value: 0, type: 'number' }
        ]);
        setActionType('createPrice');
        break;
      case 'updateDiscount':
        setModalData([
          {
            button: 'Update',
            id: index,
            label: 'Group Name',
            type: 'select',
            options: [
              ...filteredDiscountGroup,
              { label: data.discountGroupName, value: data.id }
            ],
            value: data.id
          },
          { id: index, label: 'discount', value: data.discount }
        ]);
        setActionType('updateDiscount');
        break;
      case 'createDiscount':
        setModalData([
          {
            button: 'Add',
            label: 'Group Name',
            type: 'select',
            value: '',
            options: filteredDiscountGroup
          },
          { label: 'discount', value: '' }
        ]);
        setActionType('createDiscount');
        break;
    }
    setOpenPopup(true);
  };

  const onChangeGross = (e) => {
    if (
      !isNaN(Number(e.target.value)) &&
      parseFloat(Number(e.target.value) / (1 + Number(taxRate.label) / 100)).toFixed(2) <=
        9999999999.99
    ) {
      if (e.target.value.split('.').length > 1) {
        if (e.target.value.split('.')?.[1]?.length < 3) {
          setNetPrice(
            parseFloat(
              Number(e.target.value) / (1 + Number(taxRate.label) / 100)
            ).toFixed(2)
          );
          setGrossPrice(Number(e.target.value));
        }
      } else {
        setNetPrice(
          parseFloat(Number(e.target.value) / (1 + Number(taxRate.label) / 100)).toFixed(
            2
          )
        );
        setGrossPrice(Number(e.target.value));
      }
    }
  };

  const onBlurGross = () => {
    setGrossPrice(parseFloat(+netPrice * (1 + Number(taxRate.label) / 100)).toFixed(2));
  };

  const onChangeNet = (e) => {
    if (!isNaN(Number(e.target.value)) && Number(e.target.value) <= 9999999999.99) {
      if (e.target.value.split('.').length > 1) {
        if (e.target.value.split('.')?.[1]?.length < 3) {
          setGrossPrice(
            parseFloat(
              Number(e.target.value) * (1 + Number(taxRate.label) / 100)
            ).toFixed(2)
          );
          setNetPrice(Number(e.target.value));
        }
      } else {
        setGrossPrice(
          parseFloat(Number(e.target.value) * (1 + Number(taxRate.label) / 100)).toFixed(
            2
          )
        );
        setNetPrice(Number(e.target.value));
      }
    }
  };

  const onBlurNet = () => {
    setNetPrice(parseFloat(+grossPrice / (1 + Number(taxRate.label) / 100)).toFixed(2));
  };

  const handleFilteredPriceGroup = (type, id) => {
    if (type === 'Add') {
      setFilteredPriceGroup([...filteredPriceGroup.filter((item) => item.value !== id)]);
    }
    if (type === 'Delete') {
      setFilteredPriceGroup([
        ...filteredPriceGroup,
        ...priceGroupList.data.filter((item) => item.value === id)
      ]);
    }
  };

  const handleFilteredDiscountGroup = (type, id) => {
    if (type === 'Add') {
      setFilteredDiscountGroup([
        ...filteredDiscountGroup.filter((item) => item.value !== id)
      ]);
    }
    if (type === 'Delete') {
      setFilteredDiscountGroup([
        ...filteredDiscountGroup,
        ...discountGroupList.data.filter((item) => item.value === id)
      ]);
    }
  };

  const handleModalSubmit = (data) => {
    if (data[0].id >= 0 && data[1].label === 'discount') {
      handleDiscountInput(
        {
          id: data[0].value,
          discountGroupName: data[0].options.find((item) => item.value === data[0].value)
            .label,
          discount: data[1].value
        },
        data[0].id
      );
    }

    if (data[0].id >= 0 && data[1].label === 'price') {
      handlePriceInput(
        {
          id: data[0].value,
          priceGroupName: data[0].options.find((item) => item.value === data[0].value)
            .label,
          price: Number(data[1].value)
        },
        data[0].id
      );
    }
    if (
      (data[0].id === null || data[0].id === undefined) &&
      data[1].label === 'discount'
    ) {
      handleFilteredDiscountGroup('Add', data[0].value);
      handleDiscountInput({
        id: data[0].value,
        discountGroupName: data[0].options.find((item) => item.value === data[0].value)
          .label,
        discount: data[1].value
      });
    }

    if ((data[0].id === null || data[0].id === undefined) && data[1].label === 'price') {
      handleFilteredPriceGroup('Add', data[0].value);
      handlePriceInput({
        id: data[0].value,
        priceGroupName: data[0].options.find((item) => item.value === data[0].value)
          .label,
        price: Number(data[1].value)
      });
    }
  };

  const handleDeleteGroup = (index, data) => {
    if (data.price !== undefined) {
      handleFilteredPriceGroup('Delete', data.id);
      handlePriceInput(null, index, true);
    }
    if (data.discount !== undefined) {
      handleFilteredDiscountGroup('Delete', data.id);
      handleDiscountInput(null, index, true);
    }
  };

  const handleParentCategory = (item) => {
    setParentCategory([...parentCategory, item]);
  };

  const handleClickSubCategory = (item) => {
    setCategoryId(item.id);
    handleParentCategory(item);
    handleClickCategory(item.id, item.categoryLevel + 1);
  };

  const handleSelectCategory = (data) => {
    if (!selectedCategory.find((item) => item[item.length - 1].id === data.id)) {
      setSelectedCategory([...selectedCategory, [...parentCategory, data]]);
    } else {
      enqueueSnackbar('Category already selected', {
        variant: 'error'
      });
    }
    setCategoryId(0);
    setParentCategory([]);
  };

  const handleClickParentCategory = (item) => {
    setCategoryId(item.parentCategoryId ? item.parentCategoryId : 0);
    setParentCategory([...parentCategory.slice(0, -1)]);
  };

  const handleRemoveSelectedCategory = (categoryIndex) => {
    setSelectedCategory([
      ...selectedCategory.filter((item, index) => index !== categoryIndex)
    ]);
  };

  return {
    parentCategory,
    handleClickParentCategory,
    handleClickSubCategory,
    categoryToMap,
    handleSelectCategory,
    handleRemoveSelectedCategory,
    handleModalData,
    modalData,
    openPopup,
    setOpenPopup,
    handleModalSubmit,
    handleDeleteGroup,
    ref,
    openDropdown,
    setOpenDropdown,
    setSearch,
    search,
    actionType,
    selectedTaxRate: taxRate,
    setSelectedTaxRate: setTaxRate,
    netPrice,
    setNetPrice,
    grossPrice,
    setGrossPrice,
    taxRateList,
    openMenuPopup,
    setOpenMenuPopup,
    openMenuPopupRef,
    openMenu2Popup,
    setOpenMenu2Popup,
    openMenu2PopupRef,
    onChangeGross,
    onChangeNet,
    onBlurGross,
    onBlurNet,
    filteredPriceGroup,
    filteredDiscountGroup,
    unitList
  };
}
