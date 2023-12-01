import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CommentIcon from '@/common/icons/comment.icon';
import DeleteIcon from '@/common/icons/delete.icon';
import EyeIcon from '@/common/icons/eye.icon';
import PencilIcon from '@/common/icons/pencil.icon';
import UploadIcon from '@/common/icons/upload.icon';
import {
  blockOrUnBlockBusinessOwner,
  deleteBusinessOwner,
  getAllBusinessOwner,
  updateBusinessOwner
} from '@/provider/features/user/user.slice';

function useViewBusinessOwner() {
  const ref = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [sortDirection, setSortDirection] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();
  const [confirmationActionType, setConfirmationActionType] = useState('');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTotallRecords, setDataTotallRecords] = useState(0);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const [data, setData] = useState([]);
  const isLoading = useSelector((state) => state.user.getAllBusinessOwner.isLoading);

  const doubleActionOption = {
    block: [
      {
        label: 'Edit',
        // eslint-disable-next-line react/jsx-filename-extension
        icon: <PencilIcon />,
        onClick: (row) => {
          router.push(`/super-admin/business-owner/update?id=${row.id}`);
        }
      },
      {
        label: 'Unblock',
        icon: <EyeIcon />,
        onClick: async (row) => {
          await dispatch(
            blockOrUnBlockBusinessOwner({
              payload: {
                id: row.id,
                data: {
                  isBlocked: false
                }
              }
            })
          );
          getBusinessOwnerData();
        }
      },
      {
        label: 'Add credits',
        icon: <CommentIcon />,
        onClick: (row) => {}
      },
      {
        label: 'Change subscription plan',
        icon: <UploadIcon />,
        onClick: (row) => {}
      },
      {
        label: 'change password',
        icon: <EyeIcon />,
        onClick: (row) => {}
      },
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: (row) => {
          setOpenPopup(true);
          setRowId(row.id);
        }
      }
    ],
    unBlock: [
      {
        label: 'Edit',
        // eslint-disable-next-line react/jsx-filename-extension
        icon: <PencilIcon />,
        onClick: (row) => {
          router.push(`/super-admin/business-owner/update?id=${row.id}`);
        }
      },
      {
        label: 'Block',
        icon: <EyeIcon />,
        onClick: async (row) => {
          await dispatch(
            blockOrUnBlockBusinessOwner({
              payload: {
                id: row.id,
                data: {
                  isBlocked: true
                }
              }
            })
          );
          getBusinessOwnerData();
        }
      },
      {
        label: 'Add credits',
        icon: <CommentIcon />,
        onClick: (row) => {}
      },
      {
        label: 'Change subscription plan',
        icon: <UploadIcon />,
        onClick: (row) => {}
      },
      {
        label: 'change password',
        icon: <EyeIcon />,
        onClick: (row) => {}
      },
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        onClick: (row) => {
          setOpenPopup(true);
          setRowId(row.id);
        }
      }
    ]
  };

  const columns = [
    {
      field: 'fName',
      headerName: 'First Name'
    },
    { field: 'lName', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'username', headerName: 'Username' },
    { field: 'phoneNo', headerName: 'Phone no' },
    { field: 'city', headerName: 'City' },
    // { field: 'iban', headerName: 'IBAN' },
    { field: 'vat', headerName: 'VAT' },
    { field: 'status', headerName: 'Status' },
    { field: 'action', headerName: 'Action' }
  ];

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  useEffect(() => {
    getBusinessOwnerData();
  }, [tablePageNum, tablePageSize]);

  const getBusinessOwnerData = async () => {
    // condition = { ...condition, status: { $notIn: ['DRAFT'] } };
    const getAllData = await dispatch(
      getAllBusinessOwner({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: {}
        }
      })
    );

    if (getAllData.payload?.data?.length > 0) {
      const reMapData = getAllData.payload.data.map((businessOwner) => ({
        ...businessOwner,
        id: businessOwner?.id,
        fName: businessOwner?.profile?.firstName,
        lName: businessOwner?.profile?.lastName,
        email: businessOwner?.email,
        username: businessOwner?.userName,
        phoneNo: businessOwner?.phone,
        city: businessOwner?.profile?.city,
        vat: businessOwner?.financialDetail?.vat,
        status: businessOwner?.isBlocked ? 'Block' : 'Unblock'
      }));

      setData(reMapData);
    }
    setDataTotallRecords(getAllData?.payload?.TotalRecords);
  };
  const onSubmitFilterForm = async (val) => {};
  const filterModalCloseHandler = () => {
    // getOfferData();
    // reset();
    setOpenFilterPopup(false);
  };
  const handleDeleteBusinessOwner = async (val) => {
    await dispatch(deleteBusinessOwner({ payload: val }));
    setOpenPopup(false);
    getBusinessOwnerData();
  };

  const handleColShow = () => {
    setOpenModal(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortClick = (field) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    sortData(field, sortDirection);
  };

  const sortData = (field, direction) => {
    const sortedRows = [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
  };

  return {
    data,
    columns,
    open,
    handleClick,
    handleClose,
    anchorEl,
    handleColShow,
    openModal,
    handleSortClick,
    openPopup,
    setOpenPopup,
    ref,
    doubleActionOption,
    openConfirmationModal,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup,
    register,
    handleSubmit,
    filterModalCloseHandler,
    control,
    errors,
    onSubmitFilterForm,
    handleDeleteBusinessOwner,
    rowId,
    isLoading
  };
}

export default useViewBusinessOwner;
