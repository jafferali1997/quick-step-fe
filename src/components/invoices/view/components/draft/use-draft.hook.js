'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_STATUS } from '@/common/constants/document-status.constant';
import DOCUMENT from '@/common/constants/document.constants';
import handleDownloadCsv from '@/common/utils/document-file-download/download-csv';
import handleDownloadPdf from '@/common/utils/invoice-sepa-download/download-as-pdf';
import handleDownloadXml from '@/common/utils/invoice-sepa-download/download-as-xml';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import handleViewPdf from '@/common/utils/view-pdf';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { createComment, getAllComment } from '@/provider/features/comment/comments.slice';
import {
  documentConversion,
  documentDuplicate
} from '@/provider/features/document-conversion/document-conversion.slice';
import {
  bookAnInvoice,
  deleteInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice
} from '@/provider/features/invoice/invoice.slice';

export default function useDraft({ action, allData, rowData }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [ids, setIds] = useState([]);
  const [dataIds, setDataIds] = useState([]);
  const [bulkData, setBulkData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectValue, setSelectValue] = useState('OPEN');
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(0);
  const [selectValues, setSelectValues] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [invoiceComments, setInvoiceComments] = useState([]);
  const [comment, setComment] = useState('');
  const [convertMenu, setConverMenu] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [business, setBusiness] = useState('');
  const [blankPdf, setBlankPdf] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [sendEmailModel, setSendEmailModel] = useState(false);
  const [dataTotallRecords, setDataTotallRecords] = useState(0);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [optionsPopUp, setOptionsPopUp] = useState(false);

  const isLoading = useSelector((state) => state.invoice.getAllInvoice.isLoading);

  const open = Boolean(anchorEl);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getInvoiceData();
  }, [selectedValues, searchText, rowData, tablePageNum, tablePageSize]);

  useEffect(() => {
    getCurrentBusinessDetail();
    handleGetInvoice();
  }, [selectedRowId]);

  useEffect(() => {
    if (rowData) {
      getAllComments();
    }
  }, [openPopup, rowData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleChange = async (id, value) => {
    setSelectedValues({ ...selectedValues, [id]: value });
    const result = await dispatch(updateInvoice({ payload: { status: value }, id }));
    if (result?.payload?.id) {
      getInvoiceData();
    }
  };

  const getOptionClassName = (statusValue, id) => {
    let className = 'status_dropdown !tw-w-fit !tw-px-0 ';
    if (selectedValues[id]) {
      className += selectedValues[id].toLowerCase();
    } else {
      className += statusValue.toLowerCase();
    }
    return className;
  };

  const handleClick = (event, id) => {
    setSelectedRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConvertClick = (event) => {
    setConverMenu(event.currentTarget);
  };

  const handleConvertClose = () => {
    setConverMenu(false);
  };

  const handleEmailModal = (id) => {
    setSendEmailModel(true);
  };

  const handleTabsFilter = ({ label }) => {
    const selectedFilter = data.filter((rowData) => rowData.status);
    const filteredTabData = selectedFilter.filter((data) => {
      return data.label;
    });
  };

  const getInvoiceData = async (condition = {}) => {
    condition = { ...condition, status: 'DRAFT' };
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

    if (getAllData.payload?.data?.length > 0) {
      const invoiceData = getAllData.payload.data.map((invoice) => ({
        id: invoice.id,
        displayId: invoice.displayId,
        company: invoice.customer.companyName,
        firstName: invoice.customer.firstName,
        lastName: invoice.customer.lastName,
        address: invoice.customer.address,
        country: invoice.customer.country,
        created: invoice.createdAt.split('T')[0],
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
        status: invoice.status,
        data: 'dataIcon',
        action: 'action',
        rejectionReason: invoice.rejectionReason,
        updatedByName: invoice.updatedByName,
        createdByName: invoice.createdByName,
        convertedFrom: invoice.convertedFrom
      }));
      setData(invoiceData);
      setBulkData(getAllData?.payload?.data);

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

  const handleDuplicate = (index) => {
    const newRow = { ...data[index], id: data.length };
    setData([...data.slice(0, index + 1), newRow, ...data.slice(index + 1)]);
  };

  const handleRemove = (index) => {
    setData(data.filter((row, i) => i !== index));
  };

  const handleActionClick = (row) => {
    if (selectedRow && selectedRow.id === row.id) {
      setSelectedRow((prevRow) => ({
        ...prevRow,
        name: inputValue
      }));
      setInputValue('');
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
      setInputValue(row.name);
    }
  };

  const handleSaveClick = () => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      name: inputValue
    }));

    setInputValue('');
    setSelectedRow(null);
  };

  const handleInputChangee = (event) => {
    setInputValue(event.target.value);
  };

  const onEditInvoiceClick = (rowData) => {
    router.push(`/invoices/edit?id=${rowData.id}&d-id=${rowData.displayId}`);
  };

  const handleViewReceipt = (rowData) => {
    window.open(
      `/invoices/view-receipt?id=${rowData.id}&d-id-${rowData.displayId}`,
      '_blank'
    );
  };

  const onDeleteInvoice = (rowData) => {
    setSelectedRowId(rowData.id);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteDrafInvoice = async () => {
    const response = await dispatch(
      deleteInvoice({
        payload: selectedRowId
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      getInvoiceData();
      setSelectValues('');
      setOpenDeleteConfirmation(false);
    }
  };

  const handleCreateSEPA = (row) => {
    setOptionsPopUp(true);
    setSelectedRowId(row.id);
  };

  const actionsOption = [
    { label: 'Assign User', onClick: () => {} },
    { label: 'Edit', onClick: onEditInvoiceClick },
    { label: 'Delete', onClick: onDeleteInvoice },
    {
      label: 'Create SEPA',
      onClick: (row) => handleCreateSEPA(row)
    },
    {
      label: 'Download DATEV',
      onClick: async (row) => {
        handleDownloadCsv({
          data: [await singleInvoiceDocument(row.id)],
          module: 'invoice'
        });
      }
    },
    {
      label: 'Send Email',
      onClick: (row) => {
        setSendEmailModel(true);
      }
    },
    {
      label: 'View PDF',
      onClick: () => {
        setAnchorEl(null);
        handleViewPdf({ canvasElement: `canvas-element-${selectedRowId}` });
      }
    },
    {
      label: 'View Blank PDF',
      onClick: () => {
        setAnchorEl(null);
        handleViewPdf({
          canvasElement: `canvas-element-blank-${selectedRowId}`
        });
      }
    },
    { label: 'View Receipt', onClick: handleViewReceipt }
  ];

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
          convertFrom: DOCUMENT.DELIVERY_NOTES,
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
        `/delivery-notes/edit?from=invoice&id=${response.payload.id}&d-id=${response.payload.displayId}`
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

  const columns = [
    {
      field: 'displayId',
      headerName: 'Invoice #'
    },
    { field: 'company', headerName: 'Company' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'address', headerName: 'Address' },
    { field: 'country', headerName: 'Country' },
    { field: 'created', headerName: 'Created At' },
    { field: 'status', headerName: 'Status' },
    { field: 'data', headerName: 'Add Data' },
    { field: 'action', headerName: 'Action' }
  ];

  const handleSortClick = (field) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    sortData(field, sortDirection);
  };

  const sortData = (field, direction) => {
    const sortedRows = [...data].sort((a, b) => {
      if (direction === 'asc') {
        if (typeof a[field] === 'number' && typeof b[field] === 'number') {
          return a[field] - b[field]; // Compare as numbers for ascending order
        } else {
          return a[field].localeCompare(b[field]); // Compare as strings for ascending order
        }
      } else {
        if (typeof a[field] === 'number' && typeof b[field] === 'number') {
          return b[field] - a[field]; // Compare as numbers for descending order
        } else {
          return b[field].localeCompare(a[field]); // Compare as strings for descending order
        }
      }
    });

    setData(sortedRows);
  };

  const isIdAdded = (id) => {
    return ids.includes(JSON.parse(id));
  };

  const checkBoxHandler = (e, row) => {
    e.target.checked ? setSelectValues(row.id) : setSelectValues('');
    setIsChecked(e.target.value);
    const id = JSON.parse(e.target.value);
    let stateIds = ids;
    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setIds([...stateIds]);
    if (e.target.checked) {
      setDataIds([
        ...dataIds,
        ...bulkData.filter((item) => row.id === item.id).map((invoice) => invoice)
      ]);
      action([
        ...dataIds,
        ...bulkData.filter((item) => row.id === item.id).map((invoice) => invoice)
      ]);
    } else {
      setDataIds(dataIds.filter((item) => row.id !== item.id));
      action(dataIds.filter((item) => row.id !== item.id));
    }
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      const ids = data?.map((data, index) => index);
      const dataIds = bulkData?.map((data) => data);
      setIds([...ids]);
      action([...dataIds]);
      setDataIds([...dataIds]);
    } else {
      setIds([]);
      setDataIds([]);
    }
  };

  const handleBookInvoice = ({ selectedRows, setSelectedRows }) => {
    selectedRows?.map(async (data) => {
      const response = await dispatch(
        bookAnInvoice({
          payload: data
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        getInvoiceData();
        setIds([]);
        setSelectValues('');
        setDataIds([]);
        setSelectedRows([]);
      }
    });
  };

  const getAllComments = async () => {
    const response = await dispatch(
      getAllComment({
        payload: {
          condition: { documentType: 'INVOICE', id: selectedRow.id }
        }
      })
    );
    setInvoiceComments(response?.payload);
  };

  const handleComment = (row) => {
    setOpenPopup(!openPopup);
  };

  const handleAddComment = async () => {
    const payload = { invoiceId: rowData.id, comment };
    const response = await dispatch(createComment({ payload }));
    if (response.meta.requestStatus === 'fulfilled') {
      setOpenPopup(false);
      setComment('');
    }
  };

  const getCurrentBusinessDetail = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const currentBusiness = await dispatch(
        getSingleBusinessDetail({
          payload: JSON.parse(storedUser).currentBusinessId
        })
      );
      setBusiness(currentBusiness.payload);
    }
  };

  const singleInvoiceDocument = async (id) => {
    const response = await dispatch(getSingleInvoice({ payload: id }));
    return response.payload;
  };

  const handleGetInvoice = async () => {
    if (selectedRowId) {
      const response = await singleInvoiceDocument(selectedRowId);
      setInvoice(response);
    }
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

  const handlePriceRange = (fieldName, selectedRange) => {
    if (selectedRange?.includes('above')) {
      const minValue = parseInt(selectedRange?.split('-')[0], 10);
      return {
        [fieldName]: {
          $gte: minValue.toString()
        }
      };
    } else {
      const rangeValues = selectedRange
        ?.split('-')
        ?.map((value) => parseInt(value.trim(), 10));

      if (rangeValues?.length === 2) {
        return {
          [fieldName]: {
            $gte: rangeValues[0].toString(),
            $lte: rangeValues[1].toString()
          }
        };
      } else if (rangeValues?.length === 1) {
        return {
          [fieldName]: rangeValues[0].toString()
        };
      }
    }

    return {};
  };

  const handleDownloadXMLFile = async () => {
    handleDownloadXml({
      data: [await singleInvoiceDocument(selectedRowId)],
      module: 'invoice',
      closePopUp: setOptionsPopUp
    });
  };

  const handleDownloadPDFFile = async () => {
    handleDownloadPdf({
      data: [await singleInvoiceDocument(selectedRowId)],
      module: 'invoice',
      closePopUp: setOptionsPopUp
    });
  };

  return {
    business,
    invoice,
    comment,
    setComment,
    handleComment,
    handleAddComment,
    invoiceComments,
    isChecked,
    isSubmit,
    setIsSubmit,
    columns,
    data: data || [],
    ids,
    isIdAdded,
    allCheckboxHandler,
    checkBoxHandler,
    openPopup,
    setOpenPopup,
    ref,
    handleActionClick,
    handleSaveClick,
    handleInputChangee,
    inputValue,
    selectedRow,
    sortDirection,
    setSortDirection,
    handleSortClick,
    handleDuplicate,
    handleRemove,
    anchorEl,
    handleClick,
    open,
    handleChange,
    handleClose,
    selectedId,
    handleTabsFilter,
    selectValue,
    getOptionClassName,
    selectedValues,
    handleBookInvoice,
    selectValues,
    convertToOptions,
    handleConvertClick,
    handleConvertClose,
    convertMenu,
    getInvoiceData,
    blankPdf,
    openFilterModal,
    setOpenFilterModal,
    filterModalCloseHandler,
    register,
    handleSubmit,
    onSubmitFilterForm,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleDeleteDrafInvoice,
    sendEmailModel,
    setSendEmailModel,
    actionsOption,
    setSearchText,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup,
    optionsPopUp,
    setOptionsPopUp,
    handleDownloadXMLFile,
    handleDownloadPDFFile
  };
}

useDraft.propTypes = {
  acttion: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired
};
