'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDeliveryNotes,
  getDeliveryNotesHistory,
  updateDeliveryNotes
} from '@/provider/features/delivery-notes/delivery-notes.slice';
import {
  createDeliveryNotesComment,
  getAllDeliveryNotesComment
} from '@/provider/features/delivery-notes-comments/delivery-notes-comments.slice';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import manageHistory from '@/common/utils/history/history';
import { DELIVERY_NOTES_STATUS } from '@/common/constants/document-status.constant';
import DOCUMENT from '@/common/constants/document.constants';

export default function useDelivered({ action, allData }) {
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
  const [selectedValue, setSelectedValue] = useState('');
  const [selectValue, setSelectValue] = useState('OPEN');
  const [selectValues, setSelectValues] = useState('');
  const [selectedRowId, setSelectedRowId] = useState(0);
  const [selectedValues, setSelectedValues] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [deliveryNotesComments, setDeliveryNotesComments] = useState([]);
  const [comment, setComment] = useState('');
  const [deliveryNotesHistory, setDeliveryNotesHistory] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [dataIds, setDataIds] = useState([]);
  const [bulkData, setBulkData] = useState([]);
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
    getDeliveryNotesData();
  }, [selectedValues, searchText, tablePageNum, tablePageSize]);

  useEffect(() => {
    if (selectedRow) {
      getAllComments();
      getTheDeliveryNotesHistory();
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

  const handleTabsFilter = ({ label }) => {
    const selectedFilter = data.filter((rowData) => rowData.status);
    const filteredTabData = selectedFilter.filter((data) => {
      return data.label;
    });
  };

  const getDeliveryNotesData = async (condition = {}) => {
    condition = { ...condition, status: 'DELIVERED' };
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
      const deliveryNotesData = _data.payload?.data
        .map((deliveryNotes) => ({
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

  const onViewActionClick = (rowData) => {
    router.push(`/delivery-notes/detail?id=${rowData.id || selectedRowId}`);
  };

  const actionsOption = [
    {
      label: 'View Details',
      onClick: onViewActionClick
    }
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

  const getAllComments = async () => {
    const response = await dispatch(
      getAllDeliveryNotesComment({ payload: selectedRow.id })
    );
    setDeliveryNotesComments(response?.payload);
  };

  const getTheDeliveryNotesHistory = async () => {
    const response = await dispatch(getDeliveryNotesHistory({ payload: selectedRow.id }));
    const payload = response?.payload;

    const result = manageHistory({ payload, selectedRow });
    setDeliveryNotesHistory(result);
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
          ? { $iLike: `%${value.bodyText}` }
          : value.selectedOption === 'end'
          ? { $iLike: `${value.bodyText}%` }
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
    comment,
    setComment,
    handleComment,
    handleAddComment,
    deliveryNotesComments,
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
    selectedValue,
    getOptionClassName,
    selectValue,
    selectedValues,
    deliveryNotesHistory,
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

useDelivered.propTypes = {
  action: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired
};
