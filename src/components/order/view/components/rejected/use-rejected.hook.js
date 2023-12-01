'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '@/common/hooks/useDebounce';
import capitalizeFirstLetter from '@/common/utils/capitalize-first-letter';
import manageHistory from '@/common/utils/history/history';
import statistics, { cost, revenue } from '@/common/utils/statistics/statistics';
import {
  createOrderComment,
  getAllOrderComment
} from '@/provider/features/oder-comments/order-comments.slice';
import {
  getAllOrders,
  getOrderHistory,
  updateOrder
} from '@/provider/features/order/order.slice';

export default function useRejected({ action, allData }) {
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
  const [selectedRowId, setSelectedRowId] = useState(0);
  const [selectedValues, setSelectedValues] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [orderComments, setOderComments] = useState([]);
  const [comment, setComment] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchText, setSearchText] = useState();
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [dataIds, setDataIds] = useState([]);
  const [bulkData, setBulkData] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const open = Boolean(anchorEl);

  const { isLoading } = useSelector((state) => state.order.getAllOrders);

  const { register, handleSubmit, reset } = useForm();
  const debouncedSearchQuery = useDebounce(searchText, 1000);

  useEffect(() => {
    getOrderData();
  }, [selectedValues, searchText, tablePageNum]);

  useEffect(() => {
    if (selectedRow) {
      getAllComments();
      getTheOrderHistory();
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

  const actionsOption = [
    {
      label: 'View Details',
      onClick: (row) => {
        onViewActionClick(row.id);
      }
    }
  ];

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

  const handleTabsFilter = ({ label }) => {
    const selectedFilter = data.filter((rowData) => rowData.status);
    const filteredTabData = selectedFilter.filter((data) => {
      return data.label;
    });
  };

  const getOrderData = async (condition = {}) => {
    condition = { ...condition, status: 'REJECTED' };
    const data = await dispatch(
      getAllOrders({
        payload: {
          page: 1,
          pageSize: 10,
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
          status: capitalizeFirstLetter(order.status),
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
      setBulkData(data?.payload.data);

      const items = data.payload.data;

      allData({
        open: statistics({ items, status: 'OPEN', module: 'order' }),
        invoiced: statistics({ items, status: 'INVOICED', module: 'order' }),
        profit: revenue({ items, module: 'order' }) - cost({ items, module: 'order' }),
        rejected: statistics({ items, status: 'REJECTED', module: 'order' })
      });
    } else {
      setData([]);
    }
    setDataTotallRecords(data?.payload?.TotalRecords);
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

  const onViewActionClick = (id) => {
    router.push(`/order/detail?id=${id || selectedRowId}`);
  };

  const MyOptions = [
    {
      label: 'View Details',
      onClick: (id) => onViewActionClick(id)
    }
  ];

  const columns = [
    {
      field: 'displayId',
      headerName: 'Oder #'
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
    const response = await dispatch(getAllOrderComment({ payload: selectedRow.id }));
    setOderComments(response?.payload);
  };

  const getTheOrderHistory = async () => {
    const response = await dispatch(getOrderHistory({ payload: selectedRow.id }));
    const payload = response?.payload;

    const result = manageHistory({ payload, selectedRow });
    setOrderHistory(result);
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
            // { 'customer.firstName': { $iLike: `%${debouncedSearchQuery}%` } },
            // { 'customer.lastName': { $iLike: `%${debouncedSearchQuery}%` } },
            // { 'customer.companyName': { $iLike: `%${debouncedSearchQuery}%` } },
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
    MyOptions,
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
    orderHistory,
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
    getOrderData,
    setSearchText,
    selectedColumn,
    setSelectedColumn,
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

useRejected.propTypes = {
  action: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired
};
