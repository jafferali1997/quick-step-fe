'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DOCUMENT from '@/common/constants/document.constants';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import {
  createDeliveryNotesComment,
  getAllDeliveryNotesComment
} from '@/provider/features/delivery-notes-comments/delivery-notes-comments.slice';
import {
  bookAnDeliveryNotes,
  deleteDeliveryNotes,
  getAllDeliveryNotes,
  getSingleDeliveryNotes,
  updateDeliveryNotes
} from '@/provider/features/delivery-notes/delivery-notes.slice';
import {
  documentConversion,
  documentDuplicate
} from '@/provider/features/document-conversion/document-conversion.slice';
import { DELIVERY_NOTES_STATUS } from '@/common/constants/document-status.constant';

export default function useDraft({ action, allData }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [ids, setIds] = useState([]);
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
  const [deliveryNotesComments, setDeliveryNotesComments] = useState([]);
  const [comment, setComment] = useState('');
  const [convertMenu, setConverMenu] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [business, setBusiness] = useState('');
  const [dataIds, setDataIds] = useState([]);
  const [bulkData, setBulkData] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [sendEmailModel, setSendEmailModel] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [searchText, setSearchText] = useState('');
  const open = Boolean(anchorEl);
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const isLoading = useSelector(
    (state) => state.deliveryNotes.getAllDeliveryNotes.isLoading
  );
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getCurrentBusinessDetail();
    handleGetOffer();
  }, [selectedRowId]);

  useEffect(() => {
    getDeliveryNotesData();
  }, [selectedValues, searchText, tablePageNum, tablePageSize]);

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
    const result = await dispatch(
      updateDeliveryNotes({ payload: { status: value }, id })
    );
    if (result?.payload?.id) {
      getDeliveryNotesData();
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

  const getDeliveryNotesData = async (condition = {}) => {
    condition = { ...condition, status: 'DRAFT' };
    const _data = await dispatch(
      getAllDeliveryNotes({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition
        }
      })
    );
    if (_data.payload?.Succeeded && _data.payload?.TotalRecords > 0) {
      setDataTotallRecords(_data.payload?.TotalRecords);
      const deliveryNotesData = _data.payload?.data.map((deliveryNotes) => ({
        displayId: deliveryNotes.displayId,
        id: deliveryNotes.id,
        deliveryNotes: deliveryNotes.id,
        company: deliveryNotes.customer.companyName,
        firstName: deliveryNotes.customer.firstName,
        lastName: deliveryNotes.customer.lastName,
        address: deliveryNotes.customer.address,
        country: deliveryNotes.customer.country,
        created: deliveryNotes.createdAt.split('T')[0],
        createdAt: deliveryNotes.createdAt,
        updatedAt: deliveryNotes.updatedAt,
        status: deliveryNotes.status,
        data: 'dataIcon',
        action: 'action',
        rejectionReason: deliveryNotes.rejectionReason,
        updatedByName: deliveryNotes.updatedByName,
        createdByName: deliveryNotes.createdByName,
        convertedFrom: deliveryNotes.convertedFrom
      }));
      setData(deliveryNotesData);
      setBulkData(_data?.payload.data);

      // Now items contains the updated data with products replaced
      const items = _data.payload?.data;

      allData({
        open: statistics({
          items,
          status: DELIVERY_NOTES_STATUS.OPEN,
          module: DOCUMENT.DELIVERY_NOTES
        }),
        invoiced: statistics({
          items,
          status: 'INVOICED',
          module: DOCUMENT.DELIVERY_NOTES
        }),
        profit:
          revenue({ items, module: DOCUMENT.DELIVERY_NOTES }) -
          cost({ items, module: DOCUMENT.DELIVERY_NOTES })
      });
    } else {
      setDataTotallRecords(0);
      setData([]);
      setBulkData([]);
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

  const onEditDeliveryNotesClick = (rowData) => {
    router.push(`/delivery-notes/edit?id=${rowData.id}`);
  };

  const onDeleteDeliveryNotes = async (rowData) => {
    setSelectedRowId(rowData.id);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteDrafDeliveryNotes = async () => {
    const response = await dispatch(
      deleteDeliveryNotes({
        payload: selectedRowId
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      getDeliveryNotesData();
      setSelectValues('');
      setOpenDeleteConfirmation(false);
    }
  };

  const handleViewReceipt = (rowData) => {
    window.open(`/delivery-notes/view-receipt?id=${rowData.id}`, '_blank');
  };

  const actionsOption = [
    { label: 'Assign User', onClick: () => {} },
    { label: 'Edit', onClick: onEditDeliveryNotesClick },
    { label: 'Delete', onClick: onDeleteDeliveryNotes },
    { label: 'Digital Sign', onClick: () => {} },
    {
      label: 'Send Email',
      onClick: (id) => {
        handleEmailModal(id);
      }
    },
    { label: 'View PDF', onClick: () => {} },
    { label: 'View Blank PDF', onClick: () => {} },
    { label: 'View Receipt', onClick: handleViewReceipt }
  ];

  const handleDuplicateDeliveryNotes = async (
    selectedRowId,
    setConverMenu,
    setSelectedRows
  ) => {
    const response = await dispatch(
      documentDuplicate({
        payload: {
          id: selectedRowId[0],
          documentType: DOCUMENT.DELIVERY_NOTES
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getDeliveryNotesData();
      setIds([]);
      setSelectValues('');
      router.push(
        `/delivery-notes/edit?id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const handleOfferConversion = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.DELIVERY_NOTES,
          convertTo: DOCUMENT.OFFER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getDeliveryNotesData();
      setIds([]);
      router.push(
        `/offer/edit?from=delivery-notes&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const handleOrderConversion = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.DELIVERY_NOTES,
          convertTo: DOCUMENT.ORDER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getDeliveryNotesData();
      setIds([]);
      router.push(
        `/order/edit?from=delivery-notes&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
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
          convertFrom: DOCUMENT.DELIVERY_NOTES,
          convertTo: DOCUMENT.INVOICE
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getDeliveryNotesData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/invoices/edit?from=delivery-notes&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const convertToOptions = [
    { label: 'Offer', onClick: handleOfferConversion },
    { label: 'Order', onClick: handleOrderConversion },
    { label: 'Credit', onClick: () => {} },
    { label: 'Invoice', onClick: handleInvoiceConversion },
    { label: 'Duplicate Delivery Notes', onClick: handleDuplicateDeliveryNotes },
    { label: 'Save as Templates', onClick: () => {} }
  ];

  const columns = [
    {
      field: 'deliveryNotes',
      headerName: 'Delivery Notes #'
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
      setDataIds(dataIds.filter((item) => row.id !== item));
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

  const handleBookDeliveryNotes = ({ selectedRows, setSelectedRows }) => {
    selectedRows?.map(async (data) => {
      const response = await dispatch(
        bookAnDeliveryNotes({
          payload: data
        })
      );
      setSelectedRows([]);
      if (response.meta.requestStatus === 'fulfilled') {
        getDeliveryNotesData();
        setIds([]);
        setSelectValues('');
        setDataIds([]);
      }
    });
  };

  const getAllComments = async () => {
    const response = await dispatch(
      getAllDeliveryNotesComment({ payload: selectedRow.id })
    );
    setDeliveryNotesComments(response?.payload);
  };

  const handleComment = (row) => {
    setOpenPopup(!openPopup);
  };

  const handleAddComment = async () => {
    const payload = { deliveryNotesId: selectedRow.id, comment };
    const response = await dispatch(createDeliveryNotesComment({ payload }));
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
      const response = await dispatch(
        getSingleDeliveryNotes({ payload: selectedRowId || 605 })
      );
      setDeliveryNotes(response.payload);
    }
  };

  const netAmount = deliveryNotes?.deliveryNotesProducts?.reduce((sum, product) => {
    return sum + Number(product.netPrice);
  }, 0);

  const taxrate = deliveryNotes?.deliveryNotesProducts?.reduce((sum, product) => {
    return sum + Number(product.taxRate);
  }, 0);

  const filterModalCloseHandler = () => {
    getDeliveryNotesData();
    reset();
    setSelectedNoOfItems(null);
    setSelectedNetPrice(null);
    setSelectedGrossPrice(null);
    setOpenFilterPopup(false);
  };

  const onSubmitFilterForm = (value) => {
    const payloadData = {
      '$deliveryNotesBody.plain_description$':
        value.selectedOption === 'contains'
          ? { $iLike: `%${value.bodyText}%` }
          : value.selectedOption === 'start'
          ? { $iLike: `${value.bodyText}%` }
          : value.selectedOption === 'end'
          ? { $iLike: `%${value.bodyText}` }
          : null,
      ...handlePriceRange('$deliveryNotesProducts.product.net_price$', selectedNetPrice),
      ...handlePriceRange(
        '$deliveryNotesProducts.product.gross_price$',
        selectedGrossPrice
      ),
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

    getDeliveryNotesData(payloadData);
    setOpenFilterPopup(false);
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

  return {
    taxrate,
    business,
    netAmount,
    deliveryNotes,
    comment,
    setComment,
    handleComment,
    handleAddComment,
    deliveryNotesComments,
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
    handleBookDeliveryNotes,
    selectValues,
    convertToOptions,
    handleConvertClick,
    handleConvertClose,
    convertMenu,
    getDeliveryNotesData,
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
    sendEmailModel,
    setSendEmailModel,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleDeleteDrafDeliveryNotes,
    actionsOption,
    setSearchText,
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
