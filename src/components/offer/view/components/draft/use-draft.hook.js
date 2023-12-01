'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import handleViewPdf from '@/common/utils/view-pdf';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import {
  documentConversion,
  documentDuplicate
} from '@/provider/features/document-conversion/document-conversion.slice';
import {
  createOfferComment,
  getAllOfferComment
} from '@/provider/features/offer-comments/offer-comments.slice';
import {
  bookAnOffer,
  deleteOffer,
  getAllOffers,
  getSingleOffer,
  updateOffer
} from '@/provider/features/offer/offer.slice';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import DOCUMENT from '@/common/constants/document.constants';
import handleDownloadPdf from '@/common/utils/document-file-download/download-pdf';

export default function useDraft({ action, allData }) {
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
  const [offerComments, setOfferComments] = useState([]);
  const [comment, setComment] = useState('');
  const [convertMenu, setConverMenu] = useState(false);
  const [offer, setOffer] = useState('');
  const [business, setBusiness] = useState('');
  const [blankPdf, setBlankPdf] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [sendEmailModel, setSendEmailModel] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const open = Boolean(anchorEl);
  const [dataTotallRecords, setDataTotallRecords] = useState(0);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const isLoading = useSelector((state) => state.offer.getAllOffers.isLoading);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getOfferData();
  }, [selectedValues, searchText, tablePageNum, tablePageSize]);

  useEffect(() => {
    getCurrentBusinessDetail();
    handleGetOffer();
  }, [selectedRowId]);

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
    const result = await dispatch(updateOffer({ payload: { status: value }, id }));
    if (result?.payload?.id) {
      getOfferData();
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

  const getOfferData = async (condition = {}) => {
    condition = { ...condition, status: 'DRAFT' };
    const getAllData = await dispatch(
      getAllOffers({
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
      const offerData = getAllData.payload.data
        .map((offer) => ({
          id: offer.id,
          displayId: offer.displayId,
          company: offer.customer.companyName,
          firstName: offer.customer.firstName,
          lastName: offer.customer.lastName,
          address: offer.customer.address,
          country: offer.customer.country,
          created: offer.createdAt.split('T')[0],
          createdAt: offer.createdAt,
          updatedAt: offer.updatedAt,
          status: offer.status,
          data: 'dataIcon',
          action: 'action',
          rejectionReason: offer.rejectionReason,
          updatedByName: offer.updatedByName,
          createdByName: offer.createdByName,
          convertedFrom: offer.convertedFrom
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
      setData(offerData);

      setBulkData(getAllData?.payload?.data);

      const items = getAllData?.payload?.data;

      allData({
        open: statistics({ items, status: 'OPEN', module: 'offer' }),
        invoiced: statistics({
          items,
          status: 'INVOICED',
          module: 'offer'
        }),
        profit: revenue({ items, module: 'offer' }) - cost({ items, module: 'offer' })
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
  const handleEmailModal = (id) => {
    setSendEmailModel(true);
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

  const onEditOfferClick = (rowData) => {
    router.push(`/offer/edit?id=${rowData.id}&d-id=${rowData.displayId}`);
  };

  const handleViewReceipt = (rowData) => {
    window.open(
      `/offer/view-receipt?id=${rowData.id}&d-id=${rowData.displayId}`,
      '_blank'
    );
  };

  const onDeleteOffer = (rowData) => {
    setSelectedRowId(rowData.id);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteDrafOffer = async () => {
    const response = await dispatch(
      deleteOffer({
        payload: selectedRowId
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      getOfferData();
      setSelectValues('');
      setOpenDeleteConfirmation(false);
      setSelectedRowId('');
    }
  };

  const actionsOption = [
    { label: 'Assign User', onClick: () => {} },
    { label: 'Edit', onClick: onEditOfferClick },
    { label: 'Delete', onClick: onDeleteOffer },
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
        handleDownloadPdf({
          canvasElement: 'canvas-element',
          data,
          module: 'offer',
          setOpenPopup,
          view: true
        });
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

  const handleDuplicateOffer = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentDuplicate({
        payload: {
          id: selectedRowId[0],
          documentType: DOCUMENT.OFFER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOfferData();
      setIds([]);
      setSelectValues('');
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/offer/edit?id=${response.payload.id}&d-id=${response.payload.displayId}`
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
          convertFrom: DOCUMENT.OFFER,
          convertTo: DOCUMENT.DELIVERY_NOTES
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOfferData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/delivery-notes/edit?from=offer&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const handleOrderConversion = async (selectedRowId, setConverMenu, setSelectedRows) => {
    const response = await dispatch(
      documentConversion({
        payload: {
          id: selectedRowId[0],
          convertFrom: DOCUMENT.OFFER,
          convertTo: DOCUMENT.ORDER
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOfferData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/order/edit?from=offer&id=${response.payload.id}&d-id=${response.payload.displayId}`
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
          convertFrom: DOCUMENT.OFFER,
          convertTo: DOCUMENT.INVOICE
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setConverMenu(false);
      getOfferData();
      setIds([]);
      setConverMenu(false);
      setSelectedRows([]);
      router.push(
        `/invoices/edit?from=offer&id=${response.payload.id}&d-id=${response.payload.displayId}`
      );
    }
  };

  const convertToOptions = [
    { label: 'Invoice', onClick: handleInvoiceConversion },
    { label: 'Order', onClick: handleOrderConversion },
    { label: 'Credit', onClick: () => {} },
    { label: 'Delivery Notes', onClick: handleDeliveryNotesConversion },
    { label: 'Duplicate Offer', onClick: handleDuplicateOffer },
    { label: 'Save as Templates', onClick: () => {} }
  ];

  const columns = [
    {
      field: 'displayId',
      headerName: 'Offer #'
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

  const handleBookOffer = ({ selectedRows, setSelectedRows }) => {
    selectedRows?.map(async (data) => {
      const response = await dispatch(
        bookAnOffer({
          payload: data
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        getOfferData();
        setIds([]);
        setSelectValues('');
        setDataIds([]);
        setSelectedRows([]);
      }
    });
  };

  const getAllComments = async () => {
    const response = await dispatch(getAllOfferComment({ payload: selectedRow.id }));
    setOfferComments(response?.payload);
  };

  const handleComment = (row) => {
    setOpenPopup(!openPopup);
  };

  const handleAddComment = async () => {
    const payload = { offerId: selectedRow.id, comment };
    const response = await dispatch(createOfferComment({ payload }));
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
      const response = await dispatch(getSingleOffer({ payload: selectedRowId }));
      setOffer(response.payload);
    }
  };

  const filterModalCloseHandler = () => {
    getOfferData();
    reset();
    setSelectedNoOfItems(null);
    setSelectedNetPrice(null);
    setSelectedGrossPrice(null);
    setOpenFilterPopup(false);
  };

  const onSubmitFilterForm = (value) => {
    const payloadData = {
      '$offerBody.plain_description$':
        value.selectedOption === 'contains'
          ? { $iLike: `%${value.bodyText}%` }
          : value.selectedOption === 'start'
          ? { $iLike: `${value.bodyText}%` }
          : value.selectedOption === 'end'
          ? { $iLike: `%${value.bodyText}` }
          : null,
      ...handlePriceRange('$offerProducts.product.net_price$', selectedNetPrice),
      ...handlePriceRange('$offerProducts.product.gross_price$', selectedGrossPrice),
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

    getOfferData(payloadData);
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

  return {
    business,
    offer,
    comment,
    setComment,
    handleComment,
    handleAddComment,
    offerComments,
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
    handleBookOffer,
    selectValues,
    convertToOptions,
    handleConvertClick,
    handleConvertClose,
    convertMenu,
    getOfferData,
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
    sendEmailModel,
    setSendEmailModel,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleDeleteDrafOffer,
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
  acttion: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired
};
