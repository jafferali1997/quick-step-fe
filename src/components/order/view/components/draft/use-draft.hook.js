'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DOCUMENT from '@/common/constants/document.constants';
import useDebounce from '@/common/hooks/useDebounce';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import handleViewPdf from '@/common/utils/view-pdf';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import {
  documentConversion,
  documentDuplicate
} from '@/provider/features/document-conversion/document-conversion.slice';
import {
  createOrderComment,
  getAllOrderComment
} from '@/provider/features/oder-comments/order-comments.slice';
import {
  bookAnOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder
} from '@/provider/features/order/order.slice';

export default function useDraft({ action, allData }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [ids, setIds] = useState([]);
  const [bulkData, setBulkData] = useState([]);
  const [dataIds, setDataIds] = useState([]);
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
  const [orderComments, setOrderComments] = useState([]);
  const [comment, setComment] = useState('');
  const [convertMenu, setConverMenu] = useState(false);
  const [order, setOrder] = useState('');
  const [business, setBusiness] = useState('');
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [blankPdf, setBlankPdf] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [sendEmailModel, setSendEmailModel] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const open = Boolean(anchorEl);

  const { register, handleSubmit, reset } = useForm();

  const { isLoading } = useSelector((state) => state.order.getAllOrders);
  const debouncedSearchQuery = useDebounce(searchText, 1000);

  useEffect(() => {
    getCurrentBusinessDetail();
    handleGetOffer();
  }, [selectedRowId]);

  useEffect(() => {
    getOrderData();
  }, [selectedValues, searchText, tablePageNum]);

  useEffect(() => {
    getOrderData();
  }, [selectedValues]);

  useEffect(() => {
    if (selectedRow) {
      getAllComments();
    }
  }, [openPopup, selectedRow]);

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
    const result = await dispatch(updateOrder({ payload: { status: value }, id }));
    if (result?.payload?.id) {
      getOrderData();
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

  const handleTabsFilter = ({ label }) => {
    const selectedFilter = data.filter((rowData) => rowData.status);
    const filteredTabData = selectedFilter.filter((data) => {
      return data.label;
    });
  };

  const getOrderData = async (condition = {}) => {
    condition = { ...condition, status: 'DRAFT' };
    const data = await dispatch(
      getAllOrders({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition
        }
      })
    );
    if (data.payload?.TotalRecords > 0) {
      const orderData = data.payload.data
        .map((order) => ({
          id: order.id,
          displayId: order.displayId,
          company: order.customer.companyName,
          firstName: order.customer.firstName,
          lastName: order.customer.lastName,
          address: order.customer.address,
          country: order.customer.country,
          created: order.createdAt.split('T')[0],
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          status: order.status,
          data: 'dataIcon',
          action: 'action',
          rejectionReason: order.rejectionReason,
          updatedByName: order.updatedByName,
          createdByName: order.createdByName,
          convertedFrom: order.convertedFrom
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
      setData(orderData);
      setBulkData(data?.payload?.data);

      const items = data.payload?.data;

      allData({
        open: statistics({ items, status: 'OPEN', module: 'order' }),
        invoiced: statistics({ items, status: 'INVOICED', module: 'order' }),
        profit: revenue({ items, module: 'order' }) - cost({ items, module: 'order' }),
        rejected: statistics({ items, status: 'REJECTED', module: 'order' })
      });
      setDataTotallRecords(data?.payload?.TotalRecords);
    } else {
      setData([]);
      setDataTotallRecords(0);
    }
  };

  const handleDuplicate = (index) => {
    const newRow = { ...data[index], id: data.length };
    setData([...data.slice(0, index + 1), newRow, ...data.slice(index + 1)]);
  };
  const handleEmailModal = (id) => {
    setSendEmailModel(true);
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

  const onEditOrderClick = (rowData) => {
    router.push(`/order/edit?id=${rowData.id}&d-id=${rowData.displayId}`);
  };

  const handleViewReceipt = (rowData) => {
    window.open(`/order/view-receipt?id=${rowData.id}&d-id=${rowData.displayId}`, '_blank');
  };

  const onDeleteOrder = (rowData) => {
    setSelectedRowId(rowData.id);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteDrafOrder = async () => {
    const response = await dispatch(
      deleteOrder({
        payload: selectedRowId
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      getOrderData();
      setSelectValues('');
      setOpenDeleteConfirmation(false);
    }
  };

  const actionsOption = [
    { label: 'Assign User', onClick: () => {} },
    { label: 'Edit', onClick: onEditOrderClick },
    { label: 'Delete', onClick: onDeleteOrder },
    {
      label: 'Send Email',
      onClick: (id) => {
        handleEmailModal(id);
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

  const handleDuplicateOrder = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentDuplicate({
        payload: {
          id: selectedRowId[0],
          documentType: DOCUMENT.ORDER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOrderData();
      setIds([]);
      setSelectValues('');
      setConverMenu(false);
      setSelectedRows([]);
      router.push(`/order/edit?id=${response.payload.id}&d-id=${response.payload.displayId}`);
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
          convertFrom: DOCUMENT.ORDER,
          convertTo: DOCUMENT.DELIVERY_NOTES
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOrderData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(`/delivery-notes/edit?from=order&id=${response.payload.id}&d-id=${response.payload.displayId}`);
    }
  };

  const handleOfferConversion = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.ORDER,
          convertTo: DOCUMENT.OFFER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOrderData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(`/offer/edit?from=order&id=${response.payload.id}&d-id=${response.payload.displayId}`);
    }
  };

  const handleInvoiceConversion = async (
    selectedRowId,
    setConverMenu,
    setSelectedRows
  ) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.ORDER,
          convertTo: DOCUMENT.INVOICE
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOrderData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(`/invoices/edit?from=order&id=${response.payload.id}&d-id=${response.payload.displayId}`);
    }
  };

  const convertToOptions = [
    { label: 'Invoice', onClick: handleInvoiceConversion },
    { label: 'Offer', onClick: handleOfferConversion },
    { label: 'Credit', onClick: () => {} },
    { label: 'Delivery Notes', onClick: handleDeliveryNotesConversion },
    { label: 'Duplicate Order', onClick: handleDuplicateOrder },
    { label: 'Save as Templates', onClick: () => {} }
  ];

  const columns = [
    {
      field: 'displayId',
      headerName: 'Order #'
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
        ...bulkData.filter((item) => row.id === item.id).map((offer) => offer)
      ]);
      action([
        ...dataIds,
        ...bulkData.filter((item) => row.id === item.id).map((offer) => offer)
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

  const handleBookOrder = ({ selectedRows, setSelectedRows }) => {
    selectedRows?.map(async (data) => {
      const response = await dispatch(
        bookAnOrder({
          payload: data
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        getOrderData();
        setIds([]);
        setSelectValues('');
        setDataIds([]);
        setSelectedRows([]);
      }
    });
  };

  const getAllComments = async () => {
    const response = await dispatch(getAllOrderComment({ payload: selectedRow.id }));
    setOrderComments(response?.payload);
  };

  const handleComment = (row) => {
    setOpenPopup(!openPopup);
  };

  const handleAddComment = async () => {
    const payload = { orderId: selectedRow.id, comment };
    const response = await dispatch(createOrderComment({ payload }));
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

  const handleGetOffer = async () => {
    if (selectedRowId) {
      const response = await dispatch(getSingleOrder({ payload: selectedRowId || 605 }));
      setOrder(response.payload);
    }
  };

  const netAmount = order?.orderProducts?.reduce((sum, product) => {
    return sum + Number(product.product.netPrice);
  }, 0);

  const taxrate = order?.orderProducts?.reduce((sum, product) => {
    return sum + Number(product.product.taxRate);
  }, 0);

  const filterModalCloseHandler = () => {
    getOrderData();
    reset();
    setSelectedNoOfItems(null);
    setSelectedNetPrice(null);
    setSelectedGrossPrice(null);
    setOpenFilterPopup(false);
  };

  const onSubmitFilterForm = (value) => {
    const payloadData = {
      '$orderBody.plain_description$':
        value.selectedOption === 'contains'
          ? { $iLike: `%${value.bodyText}%` }
          : value.selectedOption === 'start'
          ? { $iLike: `${value.bodyText}%` }
          : value.selectedOption === 'end'
          ? { $iLike: `%${value.bodyText}` }
          : null,
      ...handlePriceRange('$orderProducts.product.net_price$', selectedNetPrice),
      ...handlePriceRange('$orderProducts.product.gross_price$', selectedGrossPrice),
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

    getOrderData(payloadData);
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

  useMemo(() => {
    if (debouncedSearchQuery && debouncedSearchQuery?.length !== 0) {
      let query;
      if (selectedColumn === 'all') {
        query = {
          $or: [
            { id: parseInt(debouncedSearchQuery, 10) }
            // { 'customer.companyName': { $iLike: `%${debouncedSearchQuery}%` } },
            // { 'customer.firstName': { $iLike: `%${debouncedSearchQuery}%` } },
            // { 'customer.lastName': { $iLike: `%${debouncedSearchQuery}%` } },
            // { 'customer.address': { $iLike: `%${debouncedSearchQuery}%` } },
            // { 'customer.country': { $iLike: `%${debouncedSearchQuery}%` } },
            // { created: { $iLike: `%${debouncedSearchQuery}%` } },
            // { status: { $iLike: `%${debouncedSearchQuery}%` } }
          ]
        };
      } else {
        query = {
          [selectedColumn]:
            selectedColumn === 'id'
              ? parseInt(debouncedSearchQuery, 10)
              : { $iLike: `%${debouncedSearchQuery}%` }
        };
      }

      getOrderData(query);
    } else {
      getOrderData();
    }
  }, [debouncedSearchQuery, selectedColumn]);

  return {
    order,
    business,
    netAmount,
    taxrate,
    comment,
    setComment,
    handleComment,
    handleAddComment,
    orderComments,
    isChecked,
    isSubmit,
    setIsSubmit,
    columns,
    data,
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
    handleBookOrder,
    selectValues,
    convertToOptions,
    handleConvertClick,
    handleConvertClose,
    convertMenu,
    getOrderData,
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
    setSearchText,
    selectedColumn,
    setSelectedColumn,
    sendEmailModel,
    setSendEmailModel,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleDeleteDrafOrder,
    actionsOption,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup
  };
}

useDraft.propTypes = {
  action: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired
};
