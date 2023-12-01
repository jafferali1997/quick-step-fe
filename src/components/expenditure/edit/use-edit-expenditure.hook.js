import { customersOptionsData } from '@/common/utils/customer-data/customer';
import { getAllCustomer } from '@/provider/features/customer/customer.slice';
import {
  createExpenditureCategory,
  deleteExpenditureCategory,
  getAllExpenditureCategory,
  updateExpenditureCategory
} from '@/provider/features/expenditure-category/expenditure-category.slice';
import {
  deleteExpenditure,
  getSingleExpenditure,
  payExpenditure,
  updateExpenditure
} from '@/provider/features/expenditure/expenditure.slice';
import { getAllTaxRate } from '@/provider/features/tax-rate/tax-rate.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
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
  cashDiscountValidity: yup.string(),
  dueDate: yup
    .date()
    .min(new Date(), 'Due date must be after current date', { excludeTimes: true }),
  paymentAmount: yup
    .number()
    .positive('Payment amount cannot be a negative value or zero')
    .required('This field is required'),
  description: yup
    .string()
    // .required('Description must have at least 1 character')
    .max(160, 'Description must have at most 160 characters'),
  customerId: yup.string().required('Please Select Contact'),
  expenditureCategoryId: yup.string().required('Please Select Category'),
  taxRate: yup.string()
  // .required('Please Select Tax Rate')
});

export default function useEditExpenditure() {
  const dispatch = useDispatch();
  const [openDeletePopup, setDeleteOpenPopup] = useState(false);
  const [openPaymentPopup, setPaymentOpenPopup] = useState(false);
  const refDelete = useRef(null);
  const refPayment = useRef(null);
  const [openPayPopup, setPayOpenPopup] = useState(false);
  const refPay = useRef(null);
  const [singleExpenditureData, setSingleExpenditureData] = useState(null);
  const [defaultExpenditureData, setDefaultExpenditureData] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = useRef(searchParams.get('id'));
  const [allCustomer, setAllCustomer] = useState([]);
  const [getCustomerId, setCustomerId] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [getCategoryId, setCategoryId] = useState([]);
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [openEditCategoryPopup, setOpenEditCategoryPopup] = useState(false);
  const [openDeleteCategoryPopup, setOpenDeleteCategoryPopup] = useState(false);
  const [singleCategoryData, setsingleCategoryData] = useState(null);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [paymentError, setPaymentError] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [getReceiptDate, setReceiptDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const taxRateList = useSelector((state) => state.taxRate.getAllTaxRate);
  const [taxRate, setTaxRate] = useState({ value: '', label: '' });
  const [deleteLoader, setDeleteLoader] = useState(false);
  const parmsId = searchParams.get('id');
  let balForValidation;

  const isLoading = useSelector(
    (state) => state.expenditure.getSingleExpenditure.isLoading
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });
  const paymentAmountSchema = yup.object().shape({
    partialPayment: yup
      .number()
      .test(
        'lessThanBalance',
        'Value must be equal to or less than balance',
        function (value) {
          return value <= balForValidation;
        }
      )
      .required('Partial payment is required')
  });
  const {
    register: payRegister,
    handleSubmit: payExpenditurehandleSubmit,
    watch: payWatch,
    setValue: paySetValue,
    control: payControl,
    formState: { errors: payErrors }
  } = useForm({
    resolver: yupResolver(paymentAmountSchema),
    mode: 'onBlur'
  });
  const {
    register: categoryRegister,
    handleSubmit: categoryExpenditurehandleSubmit,
    watch: categoryWatch,
    setValue: categorySetValue,
    control: categoryControl,
    formState: { errors: categoryErrors },
    rest
  } = useForm({
    // resolver: yupResolver(validationSchema),
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
  const currentDate = new Date().toLocaleDateString('en-US');
  const cashValidityDate = new Date(watch('cashDiscountValidity')).toLocaleDateString(
    'en-US'
  );
  let discount = 0;
  if (new Date(currentDate) <= new Date(cashValidityDate)) {
    discount = watch('cashDiscount');
  }
  const paymentAmount = watch('paymentAmount');

  const totalPartialPayment = singleExpenditureData?.partialPayments.reduce(
    (accumulator, currentValue) => {
      return accumulator + Number(currentValue.partialPayment);
    },
    0
  );

  const partialPayment =
    (Number(payWatch('partialPayment')) || 0) + (totalPartialPayment ?? 0);
  const cashDiscount = paymentAmount * (discount / 100);
  const editBalance = paymentAmount - cashDiscount;
  const payBalance = editBalance - (Number(partialPayment) ?? 0);
  balForValidation = editBalance - (Number(totalPartialPayment) ?? 0);

  useEffect(() => {
    getAllCustomers();
    getAllCategories();
    dispatch(getAllTaxRate({ payload: {} }));
  }, []);

  useEffect(() => {
    paySetValue('partialPayment', (payBalance || 0).toFixed(2));
    if (!singleExpenditureData) {
      getExpenditureSingle();
    } else {
      const catSelectedValue = getProductById(
        singleExpenditureData?.expenditureCategoryId
      );

      setSelectedCategoryOption(catSelectedValue);
      Object.keys(defaultExpenditureData).forEach((fieldName) => {
        setValue(fieldName, defaultExpenditureData[fieldName]);
      });
    }
  }, [singleExpenditureData, defaultExpenditureData, setValue, paySetValue]);

  const getProductById = (id) => {
    const selectedCategory = allCategory?.find((c) => c.id === id);

    return {
      value: selectedCategory?.id,
      label: selectedCategory?.categoryName
    };
  };

  const getExpenditureSingle = async () => {
    const data = await dispatch(
      getSingleExpenditure({
        payload: searchParams.get('id')
      })
    );
    setTaxRate({ value: data.payload.taxRateId, label: data.payload.taxRateId });
    setSingleExpenditureData(data.payload);
    setDefaultExpenditureData(data.payload);
    setSelectedCustomer({
      value: data?.payload.customerId,
      label: `${data?.payload.customer.firstName} ${data?.payload.customer.lastName}`
    });
    setSelectedCategory({
      value: data?.payload.expenditureCategory?.id,
      label: data?.payload.expenditureCategory?.categoryName
    });
  };

  const getAllCategories = async () => {
    const data = await dispatch(
      getAllExpenditureCategory({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC'
        }
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

  const handleSelectCustomer = ({ label, value }) => {
    setSelectedCustomer({ value, label });
  };
  const handleSelectCategory = ({ label, value }) => {
    setSelectedCategory({ value, label });
  };

  const customerOptions = customersOptionsData(allCustomer);
  const allCustomerOption = allCustomer?.map((person) => ({
    label: `${person.firstName} ${person.lastName}`,
    value: person.id
  }));

  const onSubmit = async (value) => {
    if (payBalance < 0) {
      // setPaymentOpenPopup(true);
      setPaymentError(true);
    } else {
      const response = await dispatch(
        updateExpenditure({
          payload: {
            data: {
              ...value,
              taxRateId: Number(value.taxRateId),
              paymentAmount: value.paymentAmount,
              cashDiscount: Number(value.cashDiscount),
              customerId: Number(getCustomerId) || Number(value.customerId),
              expenditureCategoryId: Number(selectedCategory?.value),
              receiptDate: getReceiptDate
            },
            id: parmsId
          }
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        router.push('/expenditure');
      }
      setPaymentError(false);
    }
  };

  const payExpenditureSubmit = async (value) => {
    const response = await dispatch(
      payExpenditure({
        payload: {
          ...value,
          balance: Number(payBalance.toFixed(0)),
          partialPayment: Number(value.partialPayment),
          expenditureId: Number(parmsId),
          receiptDate: new Date().toISOString().substr(0, 10)
        }
      })
    );

    if (response.meta.requestStatus === 'fulfilled') {
      router.push('/expenditure');
    }
  };

  const handleDeleteExpenditure = async (id) => {
    setDeleteLoader(true);
    const resp = await dispatch(deleteExpenditure({ payload: id }));
    setDeleteOpenPopup(false);
    if (resp.meta.requestStatus === 'fulfilled') {
      router.push('/expenditure');
    }
    setDeleteLoader(false);
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
      categorySetValue('categoryName', '');
      setSelectedCategory({
        value: response?.payload?.id,
        label: response?.payload?.categoryName
      });
    }
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
    openDeletePopup,
    setDeleteOpenPopup,
    refDelete,
    openPayPopup,
    setPayOpenPopup,
    refPay,
    singleExpenditureData,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    onSubmit,
    allCustomerOption,
    allCategoryOption,
    getCustomerId,
    setCustomerId,
    getCategoryId,
    setCategoryId,
    selectedCategoryOption,
    editBalance,
    cashDiscount,
    paymentAmount,
    payExpenditureSubmit,
    payRegister,
    payControl,
    payErrors,
    payExpenditurehandleSubmit,
    payBalance,
    partialPayment,
    totalPartialPayment,
    openPaymentPopup,
    setPaymentOpenPopup,
    paymentError,
    refPayment,
    deleteRow,
    setDeleteRow,
    handleDeleteExpenditure,
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
    selectedCustomer,
    handleSelectCustomer,
    selectedCategory,
    handleSelectCategory,
    paySetValue,
    isLoading,
    customerOptions,
    setTaxRate,
    taxRateList,
    taxRate,
    deleteLoader,
    categoryLoader
  };
}
