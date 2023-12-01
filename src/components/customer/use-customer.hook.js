'use client';

/* eslint-disable react/jsx-filename-extension */
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PencilIcon from '@/common/icons/pencil.icon';
import CircleIcon from '@/common/icons/circle.icon';
import EyeIcon from '@/common/icons/eye.icon';
import CommentIcon from '@/common/icons/comment.icon';
import UploadIcon from '@/common/icons/upload.icon';
import DeleteIcon from '@/common/icons/delete.icon';
import {
  deleteCustomer,
  getAllCustomer,
  updateCustomer
} from '@/provider/features/customer/customer.slice';
import useDebounce from '@/common/hooks/useDebounce';
import { createCustomerComment } from '@/provider/features/customer-comments/customer-comments.slice';
import useCountryCity from '@/common/hooks/use-country-city.hook';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';

const FEATURES_TO_BE_SHOW = {
  id: 'ID #',
  firstName: 'First Name',
  lastName: 'Last Name',
  isActive: 'Status',
  gender: 'Gender',
  address: 'Address',
  country: 'Country',
  city: 'City',
  postalCode: 'Postal Code',
  companyName: 'Company Name',
  companyAddress: 'Company Address',
  companyPhone: 'Company Phone Number',
  companyEmail: 'Company Email Address',
  companyMobile: 'Company Mobile Number',
  companyFax: 'Fax Number',
  tin: 'TIN'
};

const FEATURES_WIDTH = {
  id: 90,
  firstName: 200,
  lastName: 200,
  email: 150,
  phone: 150,
  isActive: 200,
  gender: 90,
  address: 200,
  state: 100,
  country: 150,
  city: 150,
  postalCode: 150,
  companyName: 200,
  companyAddress: 200,
  companyPhone: 200,
  companyEmail: 200,
  companyMobile: 200,
  companyFax: 150,
  tin: 100
};

const DEFAULT_COLUMNS = [
  'id',
  'firstName',
  'lastName',
  'companyName',
  'companyAddress',
  'isActive'
];

const FEATURES_TO_BE_IGNORE = ['createdBy', 'updatedBy', 'createdAt', 'updatedAt'];

export default function useCustomer() {
  const fileInputRef = useRef();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const actionsOption = [
    {
      label: 'Edit',
      icon: <PencilIcon />,
      onClick: (row) => {
        handleEditAction(row);
      }
    },
    {
      label: 'Active/In-active',
      icon: <CircleIcon />,
      onClick: () => {}
    },
    {
      label: 'View Detail',
      icon: <EyeIcon />,
      onClick: (row) => {
        handleViewAction(row);
      }
    },
    {
      label: 'Add comments',
      icon: <CommentIcon />,
      onClick: (row) => {
        handleAddCommentAction(row);
      }
    },
    {
      label: 'Upload files',
      icon: <UploadIcon />,
      onClick: (row) => {
        setRowData(row);
        fileInputRef.current.click();
      }
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: (row) => {
        handleDeleteAction(row);
      }
    }
  ];

  const getActionColumn = (statusText) => {
    return {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'table-heading ',
      cellClassName: 'table-data ',
      type: 'actions',
      width: 100,
      getActions: (cell) => [
        <GridActionsCellItem
          icon={<PencilIcon />}
          label="Edit"
          onClick={() => handleEditAction(cell.row)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<CircleIcon />}
          label="Active/In-active"
          onClick={() => handleStatusAction(cell.row)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EyeIcon />}
          label="View Detail"
          onClick={() => handleViewAction(cell.row)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<CommentIcon />}
          label="Add comments"
          onClick={() => handleAddCommentAction(cell.row)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<UploadIcon />}
          label="Upload files"
          onClick={() => handleUploadAction(cell.row)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteAction(cell.row)}
          showInMenu
        />
      ]
    };
  };

  const getColumns = (dataObject) => {
    const columns = [];
    Object.keys(dataObject).forEach((key) => {
      let columnObject = {
        field: key,
        headerName: FEATURES_TO_BE_SHOW[key],
        headerClassName: 'table-heading ',
        cellClassName: 'table-data ',
        width: FEATURES_WIDTH[key]
      };
      if (!FEATURES_TO_BE_IGNORE.includes(key)) {
        if (key === 'isActive') {
          columnObject = {
            ...columnObject,
            renderCell: (params) => (
              <span
                className={
                  params.value ? 'status-active tw-bg-[#1D4ED81A]' : 'status-error'
                }
              >
                {params.value ? 'Active' : 'In-active'}
              </span>
            )
          };
        }
        if (FEATURES_TO_BE_SHOW[key]) {
          columns.push(columnObject);
        }
      }
    });
    columns.push(getActionColumn('Active'));
    return columns;
  };

  const initialColumnState = (columns) => {
    return columns.reduce((acc, column, idx) => {
      if (DEFAULT_COLUMNS.includes(column.field) || column.field === 'actions') {
        acc[column.field] = true;
      } else acc[column.field] = false;
      return acc;
    }, {});
  };

  const { handleCountryChange, cities, error, setError, setCountry, country } =
    useCountryCity();

  const dispatch = useDispatch();
  const router = useRouter();

  const [columnState, setColumnState] = useState([]);
  const [open, setOpen] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [confirmationActionType, setConfirmationActionType] = useState('');
  const ref = useRef(null);
  const [allPriceGroup, setAllPriceGroup] = useState([]);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState([]);
  const [allDiscountGroup, setAllDiscountGroup] = useState([]);
  const [selectedDiscountGroup, setSelectedDiscountGroup] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [rowData, setRowData] = useState('');

  const debouncedSearchQuery = useDebounce(searchText, 1000);
  const isLoading = useSelector((state) => state.customer.getAll.isLoading);

  const doubleActionOption = {
    active: [
      {
        label: 'Edit',
        icon: <PencilIcon />,
        onClick: (row) => {
          handleEditAction(row);
        }
      },
      {
        label: 'In-active',
        icon: <CircleIcon />,
        onClick: async (row) => {
          await dispatch(
            updateCustomer({ payload: { data: { isActive: false }, id: row.id } })
          );
          fetchData();
        }
      },
      {
        label: 'View Detail',
        icon: <EyeIcon />,
        onClick: (row) => {
          handleViewAction(row);
        }
      },
      {
        label: 'Add comments',
        icon: <CommentIcon />,
        onClick: (row) => {
          handleAddCommentAction(row);
        }
      },
      {
        label: 'Upload files',
        icon: <UploadIcon />,
        onClick: (row) => {
          setRowData(row);
          fileInputRef.current.click();
        }
      },
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: (row) => {
          handleDeleteAction(row);
        }
      }
    ],
    inActive: [
      {
        label: 'Edit',
        icon: <PencilIcon />,
        onClick: (row) => {
          handleEditAction(row);
        }
      },
      {
        label: 'Active',
        icon: <CircleIcon />,
        onClick: async (row) => {
          await dispatch(
            updateCustomer({ payload: { data: { isActive: true }, id: row.id } })
          );
          fetchData();
        }
      },
      {
        label: 'View Detail',
        icon: <EyeIcon />,
        onClick: (row) => {
          handleViewAction(row);
        }
      },
      {
        label: 'Add comments',
        icon: <CommentIcon />,
        onClick: (row) => {
          handleAddCommentAction(row);
        }
      },
      {
        label: 'Upload files',
        icon: <UploadIcon />,
        onClick: (row) => {
          setRowData(row);
          fileInputRef.current.click();
        }
      },
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: (row) => {
          handleDeleteAction(row);
        }
      }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const validationSchema = yup.object({
    customerComment: yup
      .string()
      .required('Comment is required')
      .matches(/^[^\s].*$/, 'Comment cannot start with a space')
      .matches(
        /^[-@.\/#&+\w\s]*$/,
        'Only alphanumeric and special characters are allowed'
      )
      .min(1, 'Comment must be at least 1 character long')
      .max(50000, 'Comment must be at most 50000 characters long')
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  const {
    register: filterRegister,
    handleSubmit: filterHandleSubmit,
    setValue: filterSetValue,
    reset: filterReset,
    control: filterControl,
    formState: { errors: filterErrors }
  } = useForm();

  const onCountryChange = (e) => {
    filterSetValue('country', e.target.value);
    filterSetValue('city', '');
    handleCountryChange(e);
  };

  const onSubmitFilterForm = async (value) => {
    const priceGroupIds = selectedPriceGroup.map((item) => ({
      '$priceGroup.price_group_name$': item.label
    }));
    const discountGroupIds = selectedDiscountGroup?.map((item) => ({
      '$discountGroup.discount_group_name$': item.label
    }));

    const payloadData = {
      companyName: value.companyName,
      companyEmail: value.companyEmail,
      country: value.country,
      city: value.city === 'Select City' ? '' : value.city,
      $or: [...discountGroupIds, ...priceGroupIds]
    };
    const cleanData = removeEmptyKeys(payloadData);
    // eslint-disable-next-line no-restricted-syntax
    for (const item in value) {
      if (!DEFAULT_COLUMNS.includes(item) && value[item].trim() !== '') {
        DEFAULT_COLUMNS.push(item);
      }
    }

    fetchData(cleanData);
    setOpenFilterPopup(false);
  };

  const modalCloseHandler = () => {
    setOpenFilterPopup(false);
    setOpenModal(false);
    reset();
    fetchData();
  };

  const filterModalCloseHandler = () => {
    setOpenFilterPopup(false);
    filterReset();
    fetchData();
  };

  const fetchData = async (condition = {}) => {
    const data = await dispatch(
      getAllCustomer({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition
        }
      })
    );
    let columnData = FEATURES_TO_BE_SHOW;
    let rows = [];
    if (data?.payload?.TotalRecords > 0) {
      // eslint-disable-next-line prefer-destructuring
      columnData = data.payload.data[0];
      rows = data.payload.data.map((item) => {
        // if (searchText) {
        //   const values = Object.values(item).map((value) => {
        //     if (typeof value === 'string') {
        //       return value.toLowerCase();
        //     } else {
        //       return value ? value.toString().toLowerCase() : ''; // Convert to string if possible
        //     }
        //   });
        //   return values.some((val) => val && val.includes(searchText.toLowerCase()));
        // }
        return {
          ...item,
          status: item.isStatus === true ? 'customer_active' : 'customer_inactive'
        };
      });
    }
    const columns = getColumns(columnData);
    setColumnState(initialColumnState(columns));
    setTableColumns(columns);
    setTableRows(rows);
    setDataTotallRecords(data?.payload?.TotalRecords);
  };

  const handleColShow = () => {
    setOpen(true);
  };

  const handleToggleColumn = (columnName) => {
    setColumnState({
      ...columnState,
      [columnName]: !columnState[columnName]
    });
  };

  const handleEditAction = (row) => {
    router.push(`/customer/edit?id=${row.id}`);
  };

  const handleViewAction = (row) => {
    router.push(`/customer/details?id=${row.id}`);
  };

  const confirmationModalCloseHandler = () => {
    setOpenConfirmationModal(false);
  };

  const handleDeleteAction = (row) => {
    setConfirmationActionType('delete');
    setOpenConfirmationModal(true);
    setSelectedRow(row);
  };

  const handleStatusAction = async (row) => {
    setConfirmationActionType('status');
    setOpenConfirmationModal(true);
    setSelectedRow(row);
  };

  const confirmationModalHandler = async () => {
    if (selectedRow) {
      if (confirmationActionType === 'delete') {
        const data = await dispatch(deleteCustomer({ payload: selectedRow.id }));
        if (data?.payload) {
          fetchData();
        }
      }
      if (confirmationActionType === 'status') {
        const data = await dispatch(
          updateCustomer({
            payload: {
              data: {
                isActive: !selectedRow.isActive
              },
              id: selectedRow.id
            }
          })
        );
        if (data?.payload) {
          fetchData();
        }
      }
      setOpenConfirmationModal(false);
      setSelectedRow(null);
      setConfirmationActionType('');
    }
  };

  const handleAddCommentAction = (row) => {
    setOpenModal(true);
    setSelectedRow(row);
  };

  const handleUploadAction = (row) => {};

  const handleManageColumns = () => {
    setOpen(true);
  };

  const onCommentSubmit = (data) => {
    const payloadData = {
      customerId: selectedRow.id,
      comment: data.customerComment
    };
    try {
      dispatch(createCustomerComment({ payload: payloadData }));
      setOpenModal(false);
      reset();
    } catch (err) {
      console.error('Error on adding the comment:', err);
    }
  };

  useMemo(() => {
    if (debouncedSearchQuery && debouncedSearchQuery?.length !== 0) {
      let query;
      if (selectedColumn === 'all') {
        query = {
          $or: [
            { id: parseInt(debouncedSearchQuery, 10) },
            { firstName: { $iLike: `%${debouncedSearchQuery}%` } },
            { lastName: { $iLike: `%${debouncedSearchQuery}%` } },
            { address: { $iLike: `%${debouncedSearchQuery}%` } },
            { country: { $iLike: `%${debouncedSearchQuery}%` } },
            { postalCode: { $iLike: `%${debouncedSearchQuery}%` } },
            { companyName: { $iLike: `%${debouncedSearchQuery}%` } },
            { companyPhone: { $iLike: `%${debouncedSearchQuery}%` } },
            { companyEmail: { $iLike: `%${debouncedSearchQuery}%` } },
            { companyMobile: { $iLike: `%${debouncedSearchQuery}%` } },
            { companyFax: { $iLike: `%${debouncedSearchQuery}%` } },
            { tin: { $iLike: `%${debouncedSearchQuery}%` } }
          ]
        };
      } else {
        query = {
          [selectedColumn]:
            selectedColumn === 'id'
              ? parseInt(debouncedSearchQuery, 10)
              : { $iLike: `%${debouncedSearchQuery}%` }
        };
        if (!DEFAULT_COLUMNS.includes(selectedColumn)) {
          DEFAULT_COLUMNS.push(selectedColumn);
        }
      }

      fetchData(query);
    } else {
      fetchData();
    }
  }, [debouncedSearchQuery, selectedColumn]);

  useEffect(() => {
    fetchData();
  }, [searchText, tablePageNum, tablePageSize]);

  const handleItemsPerPage = (value) => {
    setItemsPerPage(value);
  };

  const handleUploadButtonClick = (row) => {
    setRowData(row);
    fileInputRef.current.click();
  };

  return {
    handleColShow,
    open,
    columns: tableColumns,
    columnState,
    rows: tableRows,
    handleToggleColumn,
    showToaster,
    toasterMsg,
    setShowToaster,
    register,
    handleSubmit,
    setValue,
    errors,
    openModal,
    setOpenModal,
    modalCloseHandler,
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    selectedRow,
    confirmationActionType,
    onCommentSubmit,
    ref,
    searchText,
    setSearchText,
    setColumnState,
    handleItemsPerPage,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    filterModalCloseHandler,
    openFilterModal,
    setOpenFilterModal,
    selectedDiscountGroup,
    selectedPriceGroup,
    allDiscountGroup,
    allPriceGroup,
    handleCountryChange,
    cities,
    error,
    setError,
    setCountry,
    country,
    onCountryChange,
    setAllPriceGroup,
    setSelectedPriceGroup,
    setAllDiscountGroup,
    setSelectedDiscountGroup,
    onSubmitFilterForm,
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
    setOpenFilterPopup,
    filterRegister,
    filterHandleSubmit,
    filterControl,
    fileInputRef,
    rowData,
    doubleActionOption
  };
}
