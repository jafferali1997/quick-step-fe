import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { createProduct, getAllProduct } from '@/provider/features/product/product.slice';
import { getAllDiscountGroup } from '@/provider/features/discount-group/discount-group.slice';
import calculateProductTotalPrice from '@/common/utils/product-calculations/calculate-product-total';
import {
  calculateGrossPrice,
  calculateNetPrice
} from '@/common/utils/document-line-items/document-line-items';
import { LINE_ITEM_MAIN_HEADING } from '@/common/constants/document.constants';
import removePercentageSign from '@/common/utils/product-calculations/remove-percentage-sign';

const validationSchema = yup.object({
  productName: yup
    .string()
    .required('Product Name is required')
    .trim()
    .min(1, 'Product Name must be at least 1 character long')
    .max(70, 'Product Name must be at most 70 characters long'),
  // description: yup
  //   .string()
  //   .min(1, 'Description must be at least 1 character long')
  //   .max(160, 'Description must be at most 160 characters long'),
  // netPrice: yup
  //   .number()
  //   .required('Net Price is required')
  //   .min(1, 'Net Price must be at least 0.1')
  //   .max(9999999999.99, 'Net Price cannot exceed 10 digits including the decimal point')
  //   // .positive('Net Price must be a positive number')
  //   .typeError('Net Price must be a number'),
  // grossPrice: yup
  //   .number()
  //   .required('Gross Price is required')
  //   .min(1, 'Gross Price  must be at least 0.1')
  //   .max(
  //     9999999999.99,
  //     'Gross Price  cannot exceed 10 digits including the decimal point'
  //   )
  //   // .positive('Gross Price  must be a positive number')
  //   .typeError('Gross Price must be a number'),
  productNo: yup
    .string()
    .required('Product Number is required')
    .min(1, 'Product Number must be at least 1')
    .max(150, 'Product Number must be at most 150 characters long')
    .typeError('Product Number is required')
  // purchasePrice: yup
  //   .number()
  //   .min(0.1, 'Purchase Price must be at least 0.1')
  //   .max(
  //     9999999999.99,
  //     'Purchase Price cannot exceed 10 digits including the decimal point'
  //   )
  //   .positive('Purchase Price must be a positive number')
  //   .typeError('Purchase Price must be a number'),
  // quantity: yup
  //   .number()
  //   .notRequired()
  //   .positive('Quantity must be a positive number')
  //   .min(1, 'Quantity must be at least 1 numerals')
  //   .max(50, 'Quantity cannot exceed 50 numerals')
  //   .typeError('Quantity must be a number'),
  // positionNo: yup
  //   .string()
  //   .min(1, 'Position number must be at least 1 character long')
  //   .max(10, 'Position number cannot exceed 10 characters')
  //   .matches(/^[^\s]/, 'Position number cannot start with a space')
  //   .matches(/^[a-zA-Z0-9]*$/, 'Position number must be alphanumeric'),
  // discount: yup.number().typeError('Discount must be a number'),
  // sku: yup
  //   .string()
  //   .matches(/^[A-Za-z]+$/, 'SKU must contain only alphabetic characters')
  //   .min(6, 'SKU must be at least 6 character')
  //   .max(20, 'SKU must be at most 20 characters'),
  // notice: yup
  //   .string()
  // .matches(/^[A-Za-z]+$/, 'Notice must contain only alphabetic characters')
  // .min(1, 'Notice must be at least 1 character')
  // .max(1000, 'Notice must be at most 1000 characters'),
  // tginEan: yup
  //   .number()
  //   .positive('GTIN/EAN must be a positive number')
  //   .min(13, 'GTIN/EAN must be at least 1 numerals')
  //   .max(13, 'GTIN/EAN cannot exceed 50 numerals')
  //   .typeError('GTIN/EAN must be a number')
});

function useCreateProduct({
  openPopup,
  setOpenPopup,
  data,
  setData,
  defaultTaxRate,
  lineItemHeader,
  theDiscount,
  module,
  positionNumber
}) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [values, SetValues] = useState('');
  const [netPrice, setNetPrice] = useState(0);
  const [grossPrice, setGrossPrice] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [netPriceErrorMessage, setNetPriceErrorMessage] = useState(false);
  const [grossPriceErrorMessage, setGrossPriceErrorMessage] = useState(false);

  const discountGroup = useSelector((state) => state.discountGroup.getAll);
  const products = useSelector(
    (state) =>
      state.product.getAllProduct &&
      state.product.getAllProduct.data &&
      state.product.getAllProduct.data.data
  );

  const [selectedTaxRate, setSelectedTaxRate] = useState({
    value: defaultTaxRate && defaultTaxRate.id,
    label: `${defaultTaxRate && defaultTaxRate.taxRate} %`
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  const { productNo, positionNo, productName, taxRate } = watch();

  useEffect(() => {
    discountGroups();
  }, [positionNo, openPopup]);

  useEffect(() => {
    allproducts();
    setValue('taxRate', `${defaultTaxRate && defaultTaxRate.taxRate} %`);
    setValue('quantity', 1);
    setValue('positionNo', positionNumber);

    defaultTaxRate &&
      setSelectedTaxRate({
        value: defaultTaxRate.id,
        label: `${defaultTaxRate.taxRate} %`
      });
  }, [openPopup]);

  useEffect(() => {
    // setValue('productNo', products && Number(products?.[0]?.productNumber) + 1);
    setValue('productNo', products && Number(products?.length) + 1);
  }, [positionNo, positionNumber, openPopup, products]);

  const allproducts = async () => {
    await dispatch(
      getAllProduct({
        payload: {
          page: 1,
          pageSize: 100,
          sortColumn: 'productNumber',
          sortOrder: 'ASC',
          condition: ''
        }
      })
    );
  };

  const handleCancel = () => {
    setOpenPopup(false);
    setValue('productName', '');
    setValue('description', '');
    setValue('purchasePrice', '');
    setValue('quantity', '');
    setValue('positionNo', '');
    setValue('discount', '');
    setValue('productNo', '');
    setValue('sku', '');
    setValue('tginEan', '');
    setValue('notice', '');
    setNetPrice('');
    setGrossPrice('');
    setSelectedUnit('');
    setSelectedTaxRate('');
    setSelectedDiscount('');
  };

  const discountGroupOptions =
    discountGroup &&
    discountGroup.data &&
    discountGroup?.data?.map((item) => {
      return {
        label: item.discountGroupName,
        value: item.id
      };
    });

  const handleChangDiscountGroup = ({ value }) => {
    setSelectedDiscount(value);
  };

  const discountGroups = async () => {
    await dispatch(getAllDiscountGroup());
  };

  useEffect(() => {
    const tax =
      removePercentageSign(taxRate) ||
      removePercentageSign(defaultTaxRate && defaultTaxRate.taxRate);
    // Calculate Gross price when Net price or Tax Rate changes
    const calculatedGrossPrice = calculateGrossPrice(netPrice, tax);
    setGrossPrice(Number(calculatedGrossPrice).toFixed(2));
  }, [netPrice, taxRate, defaultTaxRate]);

  // useEffect(() => {
  //   // Calculate Net price when Gross price or Tax Rate changes
  //   const calculatedNetPrice = calculateNetPrice(grossPrice, taxRate);
  //   setNetPrice(Number(calculatedNetPrice).toFixed(2));
  // }, [grossPrice, taxRate]);

  const handleTaxRate = ({ label, value }) => {
    setSelectedTaxRate({ label, value });

    const calculatedGrossPrice = calculateGrossPrice(
      netPrice,
      removePercentageSign(label)
    );
    setGrossPrice(Number(calculatedGrossPrice).toFixed(2));
    const calculatedNetPrice = calculateNetPrice(grossPrice, removePercentageSign(label));
    setNetPrice(Number(calculatedNetPrice).toFixed(2));
  };

  const handleGrossPriceChange = (value) => {
    const tax =
      removePercentageSign(taxRate) ||
      removePercentageSign(defaultTaxRate && defaultTaxRate.taxRate);
    if (value >= 0 && value <= 9999999999.99) {
      setGrossPrice(Number(value).toFixed(2));
      const calculatedNetPrice = calculateNetPrice(value, tax);
      setNetPrice(Number(calculatedNetPrice).toFixed(2));
      setGrossPriceErrorMessage('');
    } else {
      setGrossPriceErrorMessage('Gross Price is not valid');
    }
  };

  const handleNetPriceChange = (value) => {
    if (value >= 0 && value <= 9999999999.99) {
      setNetPrice(Number(value).toFixed(2));
      const calculatedGrossPrice = calculateGrossPrice(
        value,
        removePercentageSign(taxRate)
      );
      setGrossPrice(Number(calculatedGrossPrice).toFixed(2));
      setNetPriceErrorMessage('');
    } else {
      setNetPriceErrorMessage('Net Price is not valid');
    }
  };

  const handleUnit = ({ value }) => {
    setSelectedUnit(value);
  };

  const onSubmit = async (value) => {
    if (!grossPrice && !netPrice) {
      setNetPriceErrorMessage('Net Price is not valid');
      setGrossPriceErrorMessage('Gross Price is not valid');
    } else {
      setNetPriceErrorMessage('');
      setGrossPriceErrorMessage('');
      setConfirmationPopUp(true);
      SetValues(value);
    }
  };

  const submitHandler = async (confirmation) => {
    const response = await dispatch(
      createProduct({
        payload: {
          ...values, // Spread the existing properties of the value object
          manufacturer: '',
          taxRateId: selectedTaxRate && selectedTaxRate?.value,
          unitId: selectedUnit || undefined,
          isVisibleToAll: confirmation,
          productNumber: values.productNo,
          positionNo: values.positionNo || undefined,
          purchasePrice: Number(values.purchasePrice) || undefined,
          tginEan: Number(values.tginEan) || undefined,
          sku: Number(values.sku) || undefined,
          netPrice: Number(Number(netPrice).toFixed(2)),
          grossPrice: Number(Number(grossPrice).toFixed(2)),
          quantity: Number(values.quantity),
          // lineItemDiscount: String(values.discount),
          discountGroups: [{ id: selectedDiscount, discount: values.discount }]
        }
        // module,
        // id
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      const { taxRate, discountGroups, quantity, netPrice, unit } = response.payload;
      const totalPrice = calculateProductTotalPrice({
        taxRate: taxRate && removePercentageSign(taxRate.taxRate),
        discount: theDiscount,
        discountGroups,
        quantity,
        netPrice
      });
      const actions = {
        pp: 'pp-icon',
        action: 'action',
        discount: 'discount',
        taxRateDropdown: 'taxRateDropdown',
        unitDropdown: 'unitDropdown',
        taxRate: taxRate && removePercentageSign(taxRate.taxRate),
        unit: unit && unit.unit,
        lineItemHeader: lineItemHeader || LINE_ITEM_MAIN_HEADING,
        totalPrice
      };
      const updatedData = {
        ...response.payload,
        ...actions,
        productIndex: data.length
      };
      setData((product) => [...product, updatedData]);
      handleCancel();
    }
  };

  const onClickNO = () => {
    submitHandler(false);
    setConfirmationPopUp(false);
  };

  const onClickYes = () => {
    submitHandler(true);
    setConfirmationPopUp(false);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    productNo,
    productName,
    grossPrice,
    netPrice,
    handleUnit,
    handleTaxRate,
    handleNetPriceChange,
    handleGrossPriceChange,
    discountGroupOptions,
    handleChangDiscountGroup,
    confirmationPopUp,
    setConfirmationPopUp,
    onClickNO,
    onClickYes,
    handleCancel,
    netPriceErrorMessage,
    grossPriceErrorMessage,
    selectedTaxRate
  };
}

export default useCreateProduct;
