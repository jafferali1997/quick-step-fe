import { customersOptionsData } from '@/common/utils/customer-data/customer';
import { getAllCustomer } from '@/provider/features/customer/customer.slice';
import {
  createExpenditureCategory,
  deleteExpenditureCategory,
  getAllExpenditureCategory,
  updateExpenditureCategory
} from '@/provider/features/expenditure-category/expenditure-category.slice';
import { createExpenditure } from '@/provider/features/expenditure/expenditure.slice';
import { getAllTaxRate } from '@/provider/features/tax-rate/tax-rate.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  cashDiscount: yup
    .number()
    .typeError('Cash Discount must be a number')
    .nullable()
    .max(99.99, 'Cash Discount must be less than 100'),
  cashDiscountValidity: yup
    .date()
    .min(new Date(), 'Due date must be after current date')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  // .required('Cash discount validity date is required'),
  dueDate: yup
    .date()
    .min(new Date(), 'Due date must be after current date')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  // .required('Due date is required'),
  paymentAmount: yup
    .number()
    .positive('Payment amount cannot be a negative value or zero')
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Payment amount is required'),
  description: yup
    .string()
    // .required('Description is required')
    .max(160, 'Description must have at most 160 characters'),
  customerId: yup.string().required('Please Select Contact'),
  expenditureCategoryId: yup.string().required('Please Select Category'),
  taxRateId: yup.string()
  // .required('Please Select Tax Rate')
});

const categoryValidationSchema = yup.object().shape({
  categoryName: yup
    .string()
    .required('Category name is required')
    .min(2, 'Category name must be at least 2 characters')
    .max(150, 'Category name must be at most 150 characters')
});

export default function useCreateExpenditure() {
  const router = useRouter();
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const [allCustomer, setAllCustomer] = useState([]);
  const [getCustomerId, setCustomerId] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [getCategoryId, setCategoryId] = useState();
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [openEditCategoryPopup, setOpenEditCategoryPopup] = useState(false);
  const [openDeleteCategoryPopup, setOpenDeleteCategoryPopup] = useState(false);
  const [singleCategoryData, setsingleCategoryData] = useState(null);
  const [selectedCategoryOption, setSelectedCategory] = useState(null);
  const [createLoader, setCreateLoader] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [taxRate, setTaxRate] = useState({ value: '', label: '' });
  const taxRateList = useSelector((state) => state.taxRate.getAllTaxRate);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [getReceiptDate, setReceiptDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const {
    register: categoryRegister,
    handleSubmit: categoryExpenditurehandleSubmit,
    watch: categoryWatch,
    setValue: categorySetValue,
    reset,
    control: categoryControl,
    formState: { errors: categoryErrors }
  } = useForm({
    resolver: yupResolver(categoryValidationSchema),
    mode: 'onBlur'
  });

  const {
    register: categoryEditRegister,
    handleSubmit: categoryEditExpenditurehandleSubmit,
    watch: categoryEditWatch,
    setValue: categoryEditSetValue,
    control: categoryEditControl,
    formState: { errors: categoryEditErrors }
  } = useForm({
    // resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const paymentAmount = watch('paymentAmount');
  const discount = watch('cashDiscount');
  const cashDiscount = paymentAmount * (discount / 100);
  const balance = paymentAmount - cashDiscount;

  useEffect(() => {
    getAllCustomers();
    getAllCategories();
    dispatch(getAllTaxRate({ payload: {} }));
  }, []);

  const handleUploadButtonClick = (row) => {
    fileInputRef.current.click();
  };

  const getAllCategories = async () => {
    const data = await dispatch(
      getAllExpenditureCategory({
        payload: {}
      })
    );

    if (data.payload?.length) {
      setAllCategory(data.payload);
    } else {
      setAllCategory([]);
    }
  };

  const allCategoryOption = allCategory?.map((category) => ({
    label: category.categoryName,
    value: category.id,
    editClick: () => handleEditCategory(category),
    deleteClick: () => handleDeleteCategory(category)
  }));

  const handleEditCategory = (category) => {
    setsingleCategoryData(category);
    categoryEditSetValue('categoryName', category.categoryName);
    setOpenEditCategoryPopup(true);
  };

  const handleDeleteCategory = (category) => {
    setsingleCategoryData(category);

    setOpenDeleteCategoryPopup(true);
  };

  const getAllCustomers = async () => {
    const data = await dispatch(
      getAllCustomer({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC'
        }
      })
    );

    if (data.payload?.data?.length) {
      setAllCustomer(data.payload.data);
    } else {
      setAllCustomer([]);
    }
  };

  const customerOptions = customersOptionsData(allCustomer);
  const allCustomerOption = allCustomer?.map((person) => ({
    label: `${person.firstName} ${person.lastName}`,
    value: person.id
  }));

  const onSubmit = async (values) => {
    setCreateLoader(true);
    if (getCustomerId.length === 0) {
      setContactError(true);
      setCreateLoader(false);
      return;
    }
    const filteredValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const payload = {
      ...filteredValues,
      taxRateId: Number(filteredValues.taxRateId),
      paymentAmount: filteredValues.paymentAmount,
      cashDiscount: Number(filteredValues.cashDiscount),
      customerId: getCustomerId,
      expenditureCategoryId: getCategoryId,
      receiptDate: getReceiptDate,
      cashDiscountValidity: filteredValues.cashDiscountValidity
    };
    const response = await dispatch(
      createExpenditure({
        payload
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      router.push('/expenditure');
      setCreateLoader(false);
    } else {
      setCreateLoader(false);
    }
  };

  const categoryExpenditureSubmit = async (value) => {
    const response = await dispatch(
      createExpenditureCategory({
        payload: {
          ...value
        }
      })
    );

    if (response.meta.requestStatus === 'fulfilled') {
      getAllCategories();
      categorySetValue('categoryName', ' ');
      setSelectedCategory({
        value: response?.payload?.id,
        label: response?.payload?.categoryName
      });
    }
    reset();
  };

  const handleDeleteExpenditureCagtegory = async (id) => {
    setCategoryLoader(true);
    await dispatch(deleteExpenditureCategory({ payload: id }));
    setOpenDeleteCategoryPopup(false);
    getAllCategories();
    setCategoryLoader(false);
  };

  const editCategoryExpenditureSubmit = async (value) => {
    await dispatch(
      updateExpenditureCategory({
        payload: {
          data: {
            ...value
          },
          id: singleCategoryData?.id
        }
      })
    );
    getAllCategories();
  };

  return {
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    onSubmit,
    allCustomerOption,
    allCategoryOption,
    getCustomerId,
    contactError,
    setCustomerId,
    getCategoryId,
    setCategoryId,
    balance,
    cashDiscount,
    paymentAmount,
    openCategoryPopup,
    setOpenCategoryPopup,
    categoryExpenditureSubmit,
    categoryRegister,
    categoryControl,
    categoryErrors,
    categoryExpenditurehandleSubmit,
    categoryEditRegister,
    categoryEditControl,
    categoryEditErrors,
    categoryEditExpenditurehandleSubmit,
    openEditCategoryPopup,
    setOpenEditCategoryPopup,
    openDeleteCategoryPopup,
    setOpenDeleteCategoryPopup,
    singleCategoryData,
    setsingleCategoryData,
    handleDeleteExpenditureCagtegory,
    editCategoryExpenditureSubmit,
    reset,
    selectedCategoryOption,
    fileInputRef,
    handleUploadButtonClick,
    createLoader,
    setTaxRate,
    taxRateList,
    taxRate,
    customerOptions,
    categoryLoader
  };
}
