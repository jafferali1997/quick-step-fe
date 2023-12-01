'use client';

/* eslint-disable react/jsx-filename-extension */
import { useEffect, useMemo, useState, useRef } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PencilIcon from '@/common/icons/pencil.icon';
import CircleIcon from '@/common/icons/circle.icon';
import EyeIcon from '@/common/icons/eye.icon';
import CommentIcon from '@/common/icons/comment.icon';
import UploadIcon from '@/common/icons/upload.icon';
import DeleteIcon from '@/common/icons/delete.icon';
import { deleteProduct, getAllProduct } from '@/provider/features/product/product.slice';
import useDebounce from '@/common/hooks/useDebounce';
import { getAllProductCategory } from '@/provider/features/product-category/product-category.slice';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';

const FEATURES_WIDTH = {
  id: 90,
  productName: 200,
  netPrice: 120,
  grossPrice: 120,
  purchasePrice: 130,
  unit: 70,
  manufacturer: 120,
  minSellingPrice: 100,
  quantity: 90,
  taxRate: 90,
  category: 120,
  categoryLevel1: 200,
  categoryLevel2: 200,
  categoryLevel3: 200
};

const FEATURES_TO_BE_SHOW = {
  id: 'ID #',
  productName: 'Product Name',
  netPrice: 'Net Price',
  grossPrice: 'Gross Price',
  purchasePrice: 'Purchase Price',
  unit: 'Unit',
  manufacturer: 'Manufacturer',
  minSellingPrice: 'Min Selling Price',
  quantity: 'No. of Pieces',
  taxRate: 'Tax Rate',
  category: 'Category',
  categoryLevel1: 'Category Level 1',
  categoryLevel2: 'Category Level 2',
  categoryLevel3: 'Category Level 3'
};

export default function useProduct() {
  const FILES_TO_BE_IGNORE = [
    'createdBy',
    'updatedBy',
    'createdAt',
    'updatedAt',
    'businessDetailId'
  ];
  const actionsOption = [
    {
      label: 'Edit',
      icon: <PencilIcon />,
      onClick: (row) => {
        handleEditAction(row);
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
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: (row) => {
        handleDeleteAction(row);
      }
    }
  ];

  const getActionColumn = () => {
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
          icon={<EyeIcon />}
          label="View Detail"
          onClick={() => handleViewAction(cell.row)}
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
      if (Object.keys(FEATURES_TO_BE_SHOW).includes(key)) {
        if (key === 'isDraft') {
          columnObject = {
            ...columnObject,
            renderCell: (params) => (
              <span
                className={params.value == 'active' ? 'status-active' : 'status-error'}
              >
                {params.value}
              </span>
            )
          };
        }
        columns.push(columnObject);
      }
    });
    columns.push(getActionColumn());
    return columns;
  };

  const initialColumnState = (columns) => {
    return columns.reduce((acc, column, idx) => {
      if (idx < 6 || column.field === 'actions') acc[column.field] = true;
      else acc[column.field] = false;
      return acc;
    }, {});
  };

  const [columnState, setColumnState] = useState([]);
  const [open, setOpen] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [confirmationActionType, setConfirmationActionType] = useState('');
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [allPriceGroup, setAllPriceGroup] = useState([]);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState([]);
  const [allDiscountGroup, setAllDiscountGroup] = useState([]);
  const [selectedDiscountGroup, setSelectedDiscountGroup] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productCategories, setProductCategories] = useState([]);
  const [dataTotallRecords, setDataTotallRecords] = useState(0);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState([]);
  const [parentCategoriesLevel1, setParentCategoriesLevel1] = useState([]);
  const [parentCategoriesLevel2, setParentCategoriesLevel2] = useState([]);
  const [parentCategoriesLevel3, setParentCategoriesLevel3] = useState([]);
  const isLoading = useSelector((state) => state.product.getAllProduct.isLoading);

  const { register, handleSubmit, reset } = useForm({});

  const handleColShow = () => {
    setOpen(true);
  };

  const handleToggleColumn = (columnName) => {
    setColumnState({
      ...columnState,
      [columnName]: !columnState[columnName]
    });
  };

  const handleViewAction = (row) => {
    router.push(`/product/detail/${row.id}`);
  };

  const confirmationModalCloseHandler = () => {
    setOpenConfirmationModal(false);
  };

  const handleDeleteAction = (row) => {
    setConfirmationActionType('delete');
    setOpenConfirmationModal(true);
    setSelectedRow(row);
  };

  const handleEditAction = async (row) => {
    router.push(`/product/edit/${row.id}`);
  };

  const confirmationModalHandler = () => {
    if (selectedRow) {
      if (confirmationActionType === 'delete') {
        const data = dispatch(deleteProduct({ payload: selectedRow.id }));
        if (data?.payload) {
          fetchData();
        }
      }
      if (confirmationActionType === 'edit') {
        router.push(`/product/edit/${selectedRow.id}`);
      }
      setOpenConfirmationModal(false);
      setSelectedRow(null);
      setConfirmationActionType('');
    }
  };

  const handleStatusAction = (row) => {};

  const handleAddCommentAction = (row) => {};

  const handleUploadAction = (row) => {};

  const handleManageColumns = () => {
    setOpen(true);
  };

  const fetchData = async (condition = {}) => {
    const data = await dispatch(
      getAllProduct({
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
        console.log('row', item);
        return { ...item, taxRate: item.taxRate?.taxRate, unit: item.unit?.unit };
      });

      setProductData(rows);
    }
    const columns = getColumns(columnData);
    setColumnState(initialColumnState(columns));
    setTableColumns(columns);

    setTableRows(rows);
    setDataTotallRecords(data?.payload?.TotalRecords);

    const parentCategory = await dispatch(
      getAllProductCategory({
        payload: {
          condition: {
            categoryLevel: 1
          }
        }
      })
    );

    if (parentCategory?.payload.length > 0) {
      setParentCategories(parentCategory?.payload);
    }
    const parentCategoryLevel1 = await dispatch(
      getAllProductCategory({
        payload: {
          condition: {
            categoryLevel: 1
          }
        }
      })
    );
    if (parentCategoryLevel1?.payload.length > 0) {
      setParentCategoriesLevel1(parentCategoryLevel1?.payload);
    }
    const parentCategoryLevel2 = await dispatch(
      getAllProductCategory({
        payload: {
          condition: {
            categoryLevel: 2
          }
        }
      })
    );
    if (parentCategoryLevel2?.payload.length > 0) {
      setParentCategoriesLevel2(parentCategoryLevel2?.payload);
    }
    const parentCategoryLevel3 = await dispatch(
      getAllProductCategory({
        payload: {
          condition: {
            categoryLevel: 3
          }
        }
      })
    );
    if (parentCategoryLevel3?.payload.length > 0) {
      setParentCategoriesLevel3(parentCategoryLevel3?.payload);
    }
  };

  const options = productData?.map((label) => ({
    id: label.id,
    value: label.productName,
    label: label.productName
  }));
  const parentCategoryOptions = parentCategories?.map((label) => ({
    id: label.id,
    value: label.categoryName,
    label: label.categoryName
  }));
  const parentCategoryLevel1Options = parentCategoriesLevel1?.map((label) => ({
    id: label.id,
    value: label.categoryName,
    label: label.categoryName
  }));
  const parentCategoryLevel2Options = parentCategoriesLevel2?.map((label) => ({
    id: label.id,
    value: label.categoryName,
    label: label.categoryName
  }));
  const parentCategoryLevel3Options = parentCategoriesLevel3?.map((label) => ({
    id: label.id,
    value: label.categoryName,
    label: label.categoryName
  }));

  const handleSelectProduct = ({ label, value }) => {
    setSelectedProduct({ value, label });
    setProductCategories([]);
    const selectedProductData = productData.find(
      (product) => product.productName === value
    );

    if (selectedProductData && selectedProductData.productCategorys) {
      const categories = selectedProductData.productCategorys.map((category) => ({
        id: category.id,
        value: category.categoryName,
        label: category.categoryName
      }));
      setProductCategories(categories);
    }
  };

  useEffect(() => {
    // need to send callback message for toaster
    fetchData();
  }, [searchText, tablePageNum, tablePageSize]);

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

  const debouncedSearchQuery = useDebounce(searchText, 1000);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filterModalCloseHandler = () => {
    setOpenFilterModal(false);
    reset();
    fetchData();
  };

  /**
   * Search function
   */
  useMemo(() => {
    if (debouncedSearchQuery && debouncedSearchQuery?.length !== 0) {
      let query;
      if (selectedColumn === 'all') {
        query = {
          $or: [
            { id: parseInt(debouncedSearchQuery, 10) },
            { productName: { $iLike: `%${debouncedSearchQuery}%` } },
            { netPrice: parseFloat(debouncedSearchQuery) },
            { grossPrice: parseFloat(debouncedSearchQuery) },
            { purchasePrice: parseFloat(debouncedSearchQuery) },
            { unit: { $iLike: `%${debouncedSearchQuery}%` } },
            { manufacturer: { $iLike: `%${debouncedSearchQuery}%` } },
            { minSellingPrice: parseFloat(debouncedSearchQuery) },
            { quantity: { $iLike: `%${debouncedSearchQuery}%` } },
            { taxRate: { $iLike: `%${debouncedSearchQuery}%` } }
          ]
        };
      } else {
        query = {
          [selectedColumn]:
            selectedColumn === 'id'
              ? parseInt(debouncedSearchQuery, 10)
              : ['netPrice', 'grossPrice', 'purchasePrice', 'minSellingPrice'].includes(
                  selectedColumn
                )
              ? parseFloat(debouncedSearchQuery)
              : { $iLike: `%${debouncedSearchQuery}%` }
        };
        // eslint-disable-next-line no-prototype-builtins
        if (!FEATURES_TO_BE_SHOW.hasOwnProperty(selectedColumn)) {
          FEATURES_TO_BE_SHOW[selectedColumn] = selectedColumn;
        }
      }
      fetchData(query);
    } else {
      fetchData();
    }
  }, [debouncedSearchQuery, selectedColumn]);

  const onSubmitFilterForm = (value) => {
    const priceGroupIds = selectedPriceGroup.map((item) => ({
      '$priceGroups.price_group_name$': item.label
    }));
    const discountGroupIds = selectedDiscountGroup?.map((item) => ({
      '$discountGroups.discount_group_name$': item.label
    }));
    const payloadData = {
      productName: value.productName,
      '$productCategorys.category_name$':
        value.subCategory1 || value.subCategory2 || value.subCategory3,
      $or: [...discountGroupIds, ...priceGroupIds]
    };
    const cleanData = removeEmptyKeys(payloadData);
    fetchData(cleanData);
    setOpenFilterPopup(false);
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
    handleSearch,
    ref,
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    confirmationActionType,
    selectedColumn,
    setSelectedColumn,
    setSearchText,
    register,
    handleSubmit,
    openFilterModal,
    setOpenFilterModal,
    filterModalCloseHandler,
    selectedDiscountGroup,
    selectedPriceGroup,
    allDiscountGroup,
    allPriceGroup,
    setAllPriceGroup,
    setSelectedPriceGroup,
    setAllDiscountGroup,
    setSelectedDiscountGroup,
    onSubmitFilterForm,
    options,
    selectedProduct,
    handleSelectProduct,
    productCategories,
    actionsOption,
    selectedRow,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup,
    parentCategoryOptions,
    parentCategoryLevel1Options,
    parentCategoryLevel2Options,
    parentCategoryLevel3Options
  };
}
