/* eslint-disable react/jsx-filename-extension */
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_STATUS } from '@/common/constants/document-status.constant';
import DOCUMENT from '@/common/constants/document.constants';
import handleDownloadCsv from '@/common/utils/document-file-download/download-csv';
import manageHistory from '@/common/utils/history/history';
import handleDownloadPdf from '@/common/utils/invoice-sepa-download/download-as-pdf';
import handleDownloadXml from '@/common/utils/invoice-sepa-download/download-as-xml';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import { createComment, getAllComment } from '@/provider/features/comment/comments.slice';
import {
  documentConversion,
  documentDuplicate
} from '@/provider/features/document-conversion/document-conversion.slice';
import {
  createInvoicePayment,
  getAllInvoice,
  getInvoiceHistory,
  getSingleInvoice,
  invoiceRejection,
  updateInvoice
} from '@/provider/features/invoice/invoice.slice';
import { getAllProduct } from '@/provider/features/product/product.slice';
import {
  createInvoiceReminder,
  getInvoiceReminder,
  updateInvoiceReminder
} from '@/provider/features/reminder/reminder.slice';
import InvoiceReminder from './components/reminder-one/reminder-one.component';

export default function useOverview({ action, allData, rowData }) {
  const refRejection = useRef();
  const ref = useRef(null);
  const refPay = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openPayPopup, setPayOpenPopup] = useState(false);
  const [openDeletePopup, setDeleteOpenPopup] = useState(false);
  const [openReceiptPopup, setReceiptOpenPopup] = useState(false);
  const [openReminderPopup, setOpenReminderPopup] = useState(false);
  const [reminderData, setReminderData] = useState(null);
  const [data, setData] = useState([]);
  const [rejectionOpenPopup, setRejectionOpenPopup] = useState(false);
  const [bulkData, setBulkData] = useState([]);
  const [reason, setReason] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceComments, setInvoiceComments] = useState([]);
  const [comment, setComment] = useState('');
  const [invoiceHistory, setInvoiceHistory] = useState('');
  const [sendEmailModel, setSendEmailModel] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [date, setDate] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [searchText, setSearchText] = useState('');
  const [invoice, setInvoice] = useState([]);
  const [dataTotallRecords, setDataTotallRecords] = useState(0);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [optionsPopUp, setOptionsPopUp] = useState(false);
  const [singleInvoiceRow, setSingleInvoiceRow] = useState('');

  const isLoading = useSelector((state) => state.invoice.getAllInvoice.isLoading);
  const singleInvoiceReminder = useSelector(
    (state) => state?.invoiceReminder?.getInvoiceReminder
  );
  const isLoadingForReminder = useSelector(
    (state) => state?.invoiceReminder?.getInvoiceReminder.isLoading
  );

  useEffect(() => {
    getInvoiceData();
    invoiceId && handleGetInvoice();
    getSingleInvoiceReminder();
  }, [
    searchText,
    rowData,
    invoiceId,
    tablePageNum,
    tablePageSize,
    reminderData,
    openReminderPopup
  ]);

  useEffect(() => {
    if (rowData) {
      getAllComments();
      getTheInvoiceHistory();
    }
  }, [openPopup, rowData]);

  const { register, handleSubmit, reset } = useForm();

  const levelOneReminder =
    singleInvoiceReminder &&
    singleInvoiceReminder.data &&
    singleInvoiceReminder?.data?.filter(
      (reminder) => Number(reminder.reminderLevel) === 1
    );

  const levelTwoReminder =
    singleInvoiceReminder &&
    singleInvoiceReminder.data &&
    singleInvoiceReminder?.data?.filter(
      (reminder) => Number(reminder.reminderLevel) === 2
    );

  const levelThreeReminder =
    singleInvoiceReminder &&
    singleInvoiceReminder.data &&
    singleInvoiceReminder?.data?.filter(
      (reminder) => Number(reminder.reminderLevel) === 3
    );

  const createReminder = async ({
    payload,
    editInvoiceReminder,
    setEditInvoiceReminder,
    setOpenCreateOneReminderPopup,
    clearAllStates
  }) => {
    if (editInvoiceReminder) {
      const response = await dispatch(
        updateInvoiceReminder({ payload, id: editInvoiceReminder.id })
      );
      response.meta.requestStatus === 'fulfilled' && setEditInvoiceReminder('');
    } else {
      const response = await dispatch(createInvoiceReminder({ payload }));
      response.meta.requestStatus === 'fulfilled' && setOpenCreateOneReminderPopup(false);
    }
    getSingleInvoiceReminder();
  };

  const getSingleInvoiceReminder = async () => {
    reminderData && (await dispatch(getInvoiceReminder({ payload: reminderData.id })));
  };

  const tabs = [
    {
      id: 'tab1',
      label: 'Reminder 1',
      content: (
        <InvoiceReminder
          invoice={reminderData}
          reminderLevel={1}
          createReminder={createReminder}
          levelOfReminder={levelOneReminder}
          isLoadingForReminder={isLoadingForReminder}
        />
      )
    },
    {
      id: 'tab2',
      label: 'Reminder 2',
      content: (
        <InvoiceReminder
          invoice={reminderData}
          reminderLevel={2}
          createReminder={createReminder}
          levelOfReminder={levelTwoReminder}
          isLoadingForReminder={isLoadingForReminder}
        />
      )
    },
    {
      id: 'tab3',
      label: 'Reminder 3',
      content: (
        <InvoiceReminder
          invoice={reminderData}
          reminderLevel={3}
          createReminder={createReminder}
          levelOfReminder={levelThreeReminder}
          isLoadingForReminder={isLoadingForReminder}
        />
      )
    }
  ];

  const singleInvoice = async (invoiceId) => {
    const response = await dispatch(getSingleInvoice({ payload: invoiceId }));
    return response?.payload;
  };

  const handleViewReceipt = (rowData) => {
    window.open(
      `/invoices/view-receipt?id=${rowData.id}&d-id=${rowData.displayId}`,
      '_blank'
    );
  };

  const handleCreateSEPA = (row) => {
    setOptionsPopUp(true);
    setInvoiceId(row.id);
    setSingleInvoiceRow(row);
  };

  const actionsOption = [
    {
      label: 'Assign User',

      onClick: (row) => {
        setDeleteOpenPopup(true);
      }
    },
    {
      label: 'Send Email',
      onClick: (row) => {
        setSendEmailModel(true);
      }
    },

    {
      label: 'Create SEPA',

      onClick: (row) => handleCreateSEPA(row)
    },
    {
      label: 'Download DATEV',
      onClick: async (row) => {
        handleDownloadCsv({
          data: [await singleInvoice(row.id)],
          module: 'invoice'
        });
      }
    },

    {
      label: 'View PDF',

      onClick: (row) => {}
    },
    {
      label: 'View Blank PDF',

      onClick: (row) => {}
    },
    {
      label: 'View Receipt',

      onClick: handleViewReceipt
    }
  ];

  const handleGetInvoice = async () => {
    const response = await singleInvoice(invoiceId);
    const allproducts = await dispatch(
      getAllProduct({
        payload: {
          page: 1,
          pageSize: 100,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    const products = allproducts?.payload.data.filter((product) => {
      const { id } = product;
      const allProductIds = response?.invoiceProducts.map((product) => product.productId);

      return allProductIds.includes(id);
    });

    setInvoice({
      ...response.payload,
      products: [...products]
    });
  };

  const netAmount = invoice?.products?.reduce((sum, product) => {
    return sum + Number(product.netPrice);
  }, 0);

  const taxrate = invoice?.products?.reduce((sum, product) => {
    return sum + Number(product.taxRate);
  }, 0);

  const invoiceAmount = netAmount + netAmount * taxrate;

  const handleCancel = () => {
    setPayOpenPopup(false);
    setDate('');
    setPaymentType('');
    setAmount('');
  };

  const payInvoiceSubmit = async () => {
    const response = await dispatch(
      createInvoicePayment({
        payload: {
          partialPayment: Number(amount),
          receiptDate: date,
          paymentType,
          balance: Number(invoiceAmount) - Number(amount),
          invoiceId
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setPayOpenPopup(false);
      handleCancel();
    }
  };

  const CustomIconPopup = {
    title: 'Reminder',
    handleClick: (row) => {
      setOpenReminderPopup(true);
      setReminderData(row);
    }
  };

  const initialColumns = [
    { id: '1', name: 'displayId', title: 'Invoices #', selected: true },
    { id: '4', name: 'company', title: 'Company', selected: true },
    { id: '2', name: 'firstName', title: 'First Name', selected: true },
    { id: '3', name: 'lastName', title: 'Last Name', selected: true },
    { id: '5', name: 'address', title: 'Address', selected: true },
    { id: '6', name: 'country', title: 'Country', selected: true },
    { id: '7', name: 'createdAt', title: 'Created At', selected: true },
    { id: '8', name: 'status', title: 'Status', selected: true }
  ];

  const getInvoiceData = async (condition = {}) => {
    condition = { ...condition, status: { $notIn: ['DRAFT'] } };
    const getAllData = await dispatch(
      getAllInvoice({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition
        }
      })
    );

    if (getAllData?.payload?.data?.length > 0) {
      const invoiceData = getAllData.payload.data
        .map((invoice) => ({
          ...invoice,
          id: invoice.id,
          displayId: invoice.displayId,
          company: invoice.customer.companyName,
          firstName: invoice.customer.firstName,
          lastName: invoice.customer.lastName,
          address: invoice.customer.address,
          country: invoice.customer.country,
          created: invoice.createdAt.split('T')[0],
          createdAt: invoice.createdAt.split('T')[0],
          updatedAt: invoice.updatedAt,
          status: invoice.status,
          data: 'dataIcon',
          action: 'action',
          rejectionReason: invoice.rejectionReason,
          updatedByName: invoice.updatedByName,
          createdByName: invoice.createdByName,
          convertedFrom: invoice.convertedFrom
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
        });
      setData(invoiceData);
      setBulkData(
        getAllData?.payload?.data?.filter((notDraft) => notDraft.status !== 'DRAFT')
      );

      // Now items contains the updated data with products replaced
      const items = getAllData.payload?.data;

      allData({
        open: statistics({
          items,
          status: INVOICE_STATUS.OPEN,
          module: DOCUMENT.INVOICE
        }),
        invoiced: statistics({
          items,
          status: 'INVOICED',
          module: DOCUMENT.INVOICE
        }),
        expenditure: cost({ items, module: DOCUMENT.INVOICE }),
        profit:
          revenue({ items, module: DOCUMENT.INVOICE }) -
          cost({ items, module: DOCUMENT.INVOICE })
      });
    } else {
      setData([]);
    }
    setDataTotallRecords(getAllData?.payload?.TotalRecords);
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

  const filterModalCloseHandler = () => {
    getInvoiceData();
    reset();
    setSelectedNoOfItems(null);
    setSelectedNetPrice(null);
    setSelectedGrossPrice(null);
    setOpenFilterPopup(false);
  };

  const onSubmitFilterForm = (value) => {
    const payloadData = {
      '$invoiceBody.plain_description$':
        value.selectedOption === 'contains'
          ? { $iLike: `%${value.bodyText}%` }
          : value.selectedOption === 'start'
          ? { $iLike: `${value.bodyText}%` }
          : value.selectedOption === 'end'
          ? { $iLike: `%${value.bodyText}` }
          : null,
      ...handlePriceRange('$invoiceProducts.product.net_price$', selectedNetPrice),
      ...handlePriceRange('$invoiceProducts.product.gross_price$', selectedGrossPrice),
      isVat: value.isVat
    };

    if (value.creationDateStart && value.creationDateEnd) {
      payloadData.createdAt = {
        $gte: value.creationDateStart,
        $lte: value.creationDateEnd
      };
    }
    if (value.deliveryDateStart && value.deliveryDateEnd) {
      payloadData.deliveryDate = {
        $gte: value.deliveryDateStart,
        $lte: value.deliveryDateEnd
      };
    }

    getInvoiceData(payloadData);
    setOpenFilterPopup(false);
  };

  const handleDuplicateInvoice = async (
    selectedRowId,
    setConverMenu,
    setSelectedRows
  ) => {
    const response = await dispatch(
      documentDuplicate({
        payload: {
          id: selectedRowId[0],
          documentType: DOCUMENT.INVOICE
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getInvoiceData();
      setSelectedRows([]);
      router.push(
        `/invoices/edit?id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const handleOfferConversion = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.INVOICE,
          convertTo: DOCUMENT.OFFER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getInvoiceData();
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/offer/edit?from=invoices&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const handleOrderConversion = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.INVOICE,
          convertTo: DOCUMENT.ORDER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getInvoiceData();
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/order/edit?from=invoices&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const handleDeliveryNotesConversion = async (
    selectedRowId,
    setConverMenu,
    setSelectedRows
  ) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.INVOICE,
          convertTo: DOCUMENT.DELIVERY_NOTES
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getInvoiceData();
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/delivery-notes/edit?from=invoices&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const convertToOptions = [
    { label: 'Offer', onClick: handleOfferConversion },
    { label: 'Order', onClick: handleOrderConversion },
    { label: 'Credit', onClick: () => {} },
    { label: 'Delivery Notes', onClick: handleDeliveryNotesConversion },
    { label: 'Duplicate Invoice', onClick: handleDuplicateInvoice },
    { label: 'Save as Templates', onClick: () => {} }
  ];

  const paymentTypeOptions = [
    { label: 'Cash', value: 'CASH' },
    { label: 'Bar', value: 'BAR' },
    { label: 'EC', value: 'EC' },
    { label: 'Paypal', value: 'PAYPAL' }
  ];

  const handlePaymentType = ({ value }) => {
    setPaymentType(value);
  };

  const handleStatusOptionChange = async (id, status) => {
    setInvoiceId(id);
    if (status === INVOICE_STATUS.CANCELLED) {
      setRejectionOpenPopup(true);
    } else if (status === 'PAID') {
      setPayOpenPopup(true);
    } else {
      const result = await dispatch(updateInvoice({ payload: { status }, id }));
      if (result?.payload?.id) {
        getInvoiceData();
      }
    }
  };

  const handleEmailModal = (id) => {
    setSendEmailModel(true);
  };

  const handleAddReason = async (id) => {
    const response = await dispatch(
      invoiceRejection({
        payload: {
          invoiceId: Number(invoiceId),
          rejectionReason: reason
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setRejectionOpenPopup(false);
      setReason('');
      getInvoiceData();
    }
  };

  const getAllComments = async () => {
    const response = await dispatch(getAllComment({ payload: rowData.id }));
    setInvoiceComments(response?.payload);
  };

  const getTheInvoiceHistory = async () => {
    const response = await dispatch(getInvoiceHistory({ payload: rowData.id }));
    const payload = response?.payload;
    const result = manageHistory({ payload, rowData });
    setInvoiceHistory(result);
  };

  const handleComment = () => {
    setOpenPopup(true);
  };

  const handleAddComment = async () => {
    const payload = { invoiceId: rowData.id, comment };
    const response = await dispatch(createComment({ payload }));
    if (response.meta.requestStatus === 'fulfilled') {
      setOpenPopup(false);
      setComment('');
    }
  };

  const handleDownloadXMLFile = async () => {
    handleDownloadXml({
      data: [await singleInvoice(invoiceId)],
      module: 'invoice',
      closePopUp: setOptionsPopUp
    });
  };

  const handleDownloadPDFFile = async () => {
    handleDownloadPdf({
      canvasElement: 'invoice-sepa-pdf',
      data: [await singleInvoice(invoiceId)],
      module: 'invoice',
      closePopUp: setOptionsPopUp
    });
  };

  return {
    ref,
    openPopup,
    setOpenPopup,
    actionsOption,
    openDeletePopup,
    setDeleteOpenPopup,
    openReceiptPopup,
    setReceiptOpenPopup,
    CustomIconPopup,
    openReminderPopup,
    setOpenReminderPopup,
    reminderData,
    setReminderData,
    data,
    initialColumns,
    tabs,
    handleStatusOptionChange,
    rejectionOpenPopup,
    refRejection,
    setRejectionOpenPopup,
    reason,
    setReason,
    handleAddReason,
    sendEmailModel,
    setSendEmailModel,
    handleComment,
    invoiceHistory,
    invoiceComments,
    comment,
    setComment,
    handleAddComment,
    convertToOptions,
    refPay,
    openPayPopup,
    payInvoiceSubmit,
    paymentTypeOptions,
    date,
    setDate,
    paymentType,
    handlePaymentType,
    setPaymentType,
    amount,
    setAmount,
    setSearchText,
    invoiceAmount,
    invoice,
    handleCancel,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterModal,
    filterModalCloseHandler,
    handleSubmit,
    register,
    onSubmitFilterForm,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice,
    openFilterPopup,
    setOpenFilterPopup,
    optionsPopUp,
    setOptionsPopUp,
    handleDownloadXMLFile,
    handleDownloadPDFFile,
    singleInvoiceRow
  };
}
