/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-filename-extension */
import useClickOutside from '@/common/hooks/use-click-outside';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';
import DeleteIcon from '@/common/icons/delete.icon';
import DownloadIcon from '@/common/icons/download.icon';
import PencilIcon from '@/common/icons/pencil.icon';
import ReceiptIcon from '@/common/icons/receipt.icon';
import WalletIcon from '@/common/icons/wallet.icon';
import handleDownloadCsv from '@/common/utils/expenditure/download-csv';
import handleDownloadPdf from '@/common/utils/expenditure/download-pdf';
import handleDownloadTxt from '@/common/utils/expenditure/download-txt';
import handleDownloadXls from '@/common/utils/expenditure/download-xls';
import handleDownloadXml from '@/common/utils/expenditure/download-xml';
import handleDownloadPdfAsZip from '@/common/utils/expenditure/download-zip';
import {
  deleteExpenditure,
  getAllExpenditure,
  payExpenditure
} from '@/provider/features/expenditure/expenditure.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm, useForm as useForm2 } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

export default function useViewExpenditure() {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const router = useRouter();
  const refDelete = useRef(null);
  const refReceipt = useRef(null);
  const refSummary = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPdfPopup, setOpenPdfPopup] = useState(false);
  const [openDeletePopup, setDeleteOpenPopup] = useState(false);
  const [openReceiptPopup, setReceiptOpenPopup] = useState(false);
  const [allExpenditureData, setAllExpenditureData] = useState([]);
  const [completeExpenditureData, setCompleteExpenditureData] = useState([]);
  const [data, setData] = useState([]);
  const [deleteRow, setDeleteRow] = useState(null);
  const [viewReceipt, setViewReceipt] = useState(null);
  const [openPayPopup, setPayOpenPopup] = useState(false);
  const [openSummaryPopup, setSummaryOpenPopup] = useState(false);
  const [singleExpenditureData, setSingleExpenditureData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(null);
  const [selectedInstallments, setSelectedInstallments] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [allCompanyOption, setAllCompanyOption] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [deleteLoader, setDeleteLoader] = useState(false);
  const isLoading = useSelector((state) => state.expenditure.getAllExpenditure.isLoading);

  useClickOutside([refDelete], [setDeleteOpenPopup]);

  let balForValidation;
  const { register: register2, handleSubmit: handleSubmit2, reset: reset2 } = useForm2();

  useEffect(() => {
    getExpenditure();
  }, [searchText]);

  const handleSelectAllExpenditure = async (expenditure) => {
    const data = await dispatch(
      getAllExpenditure({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: { id: { $in: expenditure } }
        }
      })
    );
    setData(data.payload.data);
  };

  const dropdownOptions = [
    {
      id: 1,
      name: 'Download PDF',
      onClick: () => {
        handleDownloadPdf({
          canvasElement: 'expenditure',
          data,
          module: 'expenditure'
        });
      }
    },
    {
      id: 2,
      name: 'Download ZIP File',
      onClick: () => {
        handleDownloadPdfAsZip({
          canvasElement: 'expenditure',
          data,
          module: 'expenditure'
        });
      }
    },
    {
      id: 3,
      name: 'Download XML File',
      onClick: () => {
        handleDownloadXml({
          data,
          module: 'expenditure'
        });
      }
    },
    {
      id: 4,
      name: 'Download CSV File',
      onClick: () => {
        handleDownloadCsv({
          data,
          module: 'expenditure'
        });
      }
    },
    {
      id: 5,
      name: 'Download TXT File',
      onClick: () => {
        handleDownloadTxt({
          data,
          module: 'expenditure'
        });
      }
    },
    {
      id: 6,
      name: 'Download .xls File',
      onClick: () => {
        handleDownloadXls({
          data,
          module: 'expenditure'
        });
      }
    }
  ];

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
  const { register, handleSubmit, reset } = useForm();

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

  const actionsOption = [
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: (row) => {
        setDeleteOpenPopup(true);
      }
    },
    {
      label: 'View Receipt',
      icon: <ReceiptIcon />,
      onClick: (row) => {
        setReceiptOpenPopup(true);
      }
    },
    {
      label: 'Download PDF',
      icon: <DownloadIcon />,
      onClick: (row) => {}
    }
  ];

  const getExpenditure = async (condition = {}) => {
    const data = await dispatch(
      getAllExpenditure({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition
        }
      })
    );
    const getCompanies = await dispatch(
      getAllExpenditure({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC'
        }
      })
    );

    if (data.payload?.data?.length) {
      setAllExpenditureData(
        data.payload.data
          .map((expenditure) => ({
            ...expenditure,
            id: expenditure.id,
            firstName: expenditure.customer.firstName,
            lastName: expenditure.customer.lastName,
            companyName: expenditure.customer.companyName ?? 'abc',
            description: expenditure.description,
            amount: expenditure.paymentAmount,
            dueDate: expenditure.dueDate,
            dateOfReceipt: expenditure.receiptDate,
            status: expenditure.status ?? 'open'
          }))
          .filter((item) => {
            if (searchText) {
              const values = Object.values(item).map((value) => {
                if (typeof value === 'string') {
                  return value.toLowerCase();
                } else {
                  return value ? value.toString().toLowerCase() : ''; // Convert to string if possible
                }
              });
              return values.some((val) => val && val.includes(searchText.toLowerCase()));
            }
            return item;
          })
      );

      setCompleteExpenditureData(data.payload.data);
    } else {
      setAllExpenditureData([]);
    }
    const getAllCompanyOptions = getCompanies?.payload?.data?.map((expenditure) => ({
      label: expenditure.customer.companyName,
      value: expenditure.customer.id
    }));

    setAllCompanyOption(getAllCompanyOptions);

    setDataTotallRecords(data.payload?.TotalRecords);
  };
  const doubleActionOption = {
    paid: [
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: (row) => {
          setDeleteRow(row);
          setDeleteOpenPopup(true);
        }
      },
      {
        label: 'View Receipt',
        icon: <ReceiptIcon />,
        onClick: (row) => {
          const receiptSingle = completeExpenditureData?.find((obj) => obj.id === row.id);

          setViewReceipt(receiptSingle);
          setReceiptOpenPopup(true);
        }
      },
      {
        label: 'Download PDF',
        icon: <DownloadIcon />,
        onClick: (row) => {}
      }
      // {
      //   label: 'Download PDF',
      //   icon: <DownloadIcon />,
      //   onClick: (row) => {
      //     console.log(`Editing row ${row.id}`);
      //   }
      // },
    ],
    open: [
      {
        label: 'Pay',
        icon: <WalletIcon />,
        onClick: (row) => {
          paySetValue('partialPayment', 0);
          setSingleExpenditureData(row);

          setPayOpenPopup(true);
        }
      },
      {
        label: 'Edit',
        icon: <PencilIcon />,
        onClick: (row) => {
          router.push(`/expenditure/edit?id=${row.id}`);
        }
      },
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: (row) => {
          setDeleteRow(row);
          setDeleteOpenPopup(true);
        }
      }
    ]
  };
  const CustomIconPopup = {
    title: 'View Summary',
    handleClick: (row) => {
      setSummaryOpenPopup(true);
      setSummaryData(row);
      setSingleExpenditureData(row);
      setAllExpenditureData([]);
    }
  };

  useEffect(() => {
    getExpenditure();
    if (singleExpenditureData) {
      paySetValue('partialPayment', payBalance);
    }
  }, [singleExpenditureData, searchText, tablePageNum, tablePageSize]);

  const handleDeleteExpenditure = async (id) => {
    setDeleteLoader(true);
    await dispatch(deleteExpenditure({ payload: id }));
    setAllExpenditureData([]);
    setDeleteOpenPopup(false);
    setDeleteLoader(false);
    getExpenditure();
  };
  const currentDate = new Date().toLocaleDateString('en-US');
  const cashValidityDate = new Date(
    singleExpenditureData?.cashDiscountValidity
  ).toLocaleDateString('en-US');
  let discount = 0;
  if (new Date(currentDate) <= new Date(cashValidityDate)) {
    discount = singleExpenditureData?.cashDiscount;
  }

  const totalPartialPayment = singleExpenditureData?.partialPayments.reduce(
    (accumulator, currentValue) => {
      return accumulator + Number(currentValue.partialPayment);
    },
    0
  );
  const totalSummerPartialPayment = summaryData?.partialPayments.reduce(
    (accumulator, currentValue) => {
      return accumulator + Number(currentValue.partialPayment);
    },
    0
  );
  const summeryDiscount = (summaryData?.paymentAmount * (discount / 100)).toFixed(2);
  const totalSummaryBalance =
    summaryData?.paymentAmount - summeryDiscount - totalSummerPartialPayment;

  const partialPayment =
    Number(payWatch('partialPayment')) + (Number(totalPartialPayment) ?? 0);

  const cashDiscount =
    Number(singleExpenditureData?.paymentAmount) * (Number(discount) / 100);
  const editBalance = Number(singleExpenditureData?.paymentAmount) - Number(cashDiscount);
  const payBalance = editBalance - (Number(partialPayment) ?? 0);
  balForValidation = editBalance - (Number(totalPartialPayment) ?? 0);

  const payExpenditureSubmit = async (value) => {
    const response = await dispatch(
      payExpenditure({
        payload: {
          ...value,
          balance: Number(payBalance.toFixed(0)),
          partialPayment: Number(value.partialPayment),
          expenditureId: Number(singleExpenditureData.id),
          receiptDate: new Date().toISOString().substr(0, 10)
        }
      })
    );

    if (response.meta.requestStatus === 'fulfilled') {
      getExpenditure();
    }
  };

  useClickOutside([refDelete], [setDeleteOpenPopup]);
  const filterModalCloseHandler = () => {
    getExpenditure();
    reset2();

    setOpenFilterPopup(false);
    setSelectedPaymentAmount(null);
    setSelectedInstallments(null);
    setSelectedStatus(null);
  };
  const handlePriceRange = (fieldName, selectedRange) => {
    if (selectedRange?.includes('above')) {
      const minValue = parseInt(selectedRange?.split('-')[0], 10);
      return {
        [fieldName]: {
          $gte: minValue
        }
      };
    } else {
      const rangeValues = selectedRange
        ?.split('-')
        ?.map((value) => parseInt(value.trim(), 10));

      if (rangeValues?.length === 2) {
        return {
          [fieldName]: {
            $gte: rangeValues[0],
            $lte: rangeValues[1]
          }
        };
      } else if (rangeValues?.length === 1) {
        return {
          [fieldName]: rangeValues[0]
        };
      }
    }

    return {};
  };

  const reverseDateFormat = (dateString) => {
    return dateString.split('-').reverse().join('-');
  };

  const onSubmitFilterForm2 = (value) => {
    const payloadData = {
      '$customer.company_name$': value.companyName,
      ...handlePriceRange('noOfInstallments', selectedInstallments),
      ...handlePriceRange('paymentAmount', selectedPaymentAmount),
      '$partialPayments.partial_payment$': {
        $gte: value.to,
        $lte: value.from
      },
      status: selectedStatus === 'ALL' ? null : selectedStatus
    };
    if (value.dueDateStart && value.dueDateEnd) {
      payloadData.dueDate = {
        $gte: value.dueDateStart,
        $lte: value.dueDateEnd
      };
    }
    if (value.receiptDateStart && value.receiptDateEnd) {
      payloadData.receiptDate = {
        $gte: value.receiptDateStart,
        $lte: value.receiptDateEnd
      };
    }

    const pureConditions = removeEmptyKeys(payloadData);

    getExpenditure(pureConditions);
    setOpenFilterPopup(false);
  };

  return {
    ref,
    data: data || [],
    refDelete,
    openPopup,
    setOpenPopup,
    actionsOption,
    openDeletePopup,
    setDeleteOpenPopup,
    openReceiptPopup,
    setReceiptOpenPopup,
    refReceipt,
    doubleActionOption,
    allExpenditureData,
    deleteRow,
    viewReceipt,
    handleDeleteExpenditure,
    openPayPopup,
    setPayOpenPopup,
    payExpenditureSubmit,
    payRegister,
    payControl,
    payErrors,
    payExpenditurehandleSubmit,
    singleExpenditureData,
    payBalance,
    partialPayment,
    totalPartialPayment,
    selectedRow,
    setSelectedRow,
    CustomIconPopup,
    openSummaryPopup,
    setSummaryOpenPopup,
    summaryData,
    totalSummerPartialPayment,
    totalSummaryBalance,
    refSummary,
    register,
    handleSubmit,
    reset,
    selectedInstallments,
    setSelectedInstallments,
    selectedPaymentAmount,
    setSelectedPaymentAmount,
    selectedStatus,
    setSelectedStatus,
    handleSelectAllExpenditure,
    dropdownOptions,
    reverseDateFormat,
    summeryDiscount,
    cashDiscount,
    setSearchText,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup,
    filterModalCloseHandler,
    handleSubmit2,
    register2,
    onSubmitFilterForm2,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice,
    allCompanyOption,
    setCompanyName,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    deleteLoader
  };
}
