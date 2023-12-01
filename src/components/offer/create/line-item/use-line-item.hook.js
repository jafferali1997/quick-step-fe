'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import useDocumentLineItems from '@/common/hooks/use-document-line-item-hook';
import {
  duplicateLineItemProducts,
  handleAddProductToLineItem,
  handleAddPurchasingPriceAndNotes,
  handleAllCheckBox,
  handleEditInputFields,
  handleHeadingStyling,
  handleRemoveLineItemProduct,
  handleSingleCheckBox,
  handleTaxRateAndUnitsSelection,
  lineItemProducts,
  reModifyData,
  singleDocumentrHandler
} from '@/common/utils/document-line-items/document-line-items';
import {
  createLineItem,
  getSingleOffer,
  updateOffer
} from '@/provider/features/offer/offer.slice';
import { getSingleProduct } from '@/provider/features/product/product.slice';

export default function useLineItem({ handleTabClick, handleTabCompleted }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [ids, setIds] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedItemRow, setSelectedItemRow] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [theDiscount, setTheDiscount] = useState('');
  const [itemToBeRemoved, setItemToBeRemoved] = useState('');
  const [offerProduct, setOfferProduct] = useState('');
  const [ppToggle, setPpToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showHeading, setShowHeading] = useState(false);
  const [lineItemHeader, setLineItemHeader] = useState('');
  const [showHeadingInput, setShowHeadingInput] = useState('');
  const [mergedData, setMergedData] = useState({});
  const [showStyle, setShowStyle] = useState(false);
  const [headingIndex, setHeadingIndex] = useState('');
  const [positionNumber, setPositionNumber] = useState(1);
  const [focusInput, setFocusInput] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [lineItemIndexing, setLineItemIndexing] = useState('');
  const [openPP, setOpenPP] = useState('');
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [currentRow, setCurrentRow] = useState('');

  const open = Boolean(anchorEl);

  const {
    filteredDiscountGroup,
    columns,
    products,
    options,
    defaultTaxRate,
    unitsOptions,
    taxRateOptions,
    selectedTaxRate
  } = useDocumentLineItems({
    openPopup
  });

  useEffect(() => {
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
      setFocusInput(false); // Reset the focus state
    }
  }, [focusInput]);

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
    }
    singleOfferHandler();
  }, [searchParams]);

  useEffect(() => {
    const orderedMergedData = reModifyData({ data });
    setMergedData(orderedMergedData);
  }, [data]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNewProduct = () => {
    setOpenPopup(true);
    setAnchorEl(null);
  };

  const handleAddNewShow = () => {
    setAnchorEl(null);
    setShowHeading(true);
  };

  const handleAddNewHeading = () => {
    setShowHeading(false);
    setShowHeadingInput(!showHeadingInput);
    setFocusInput(true);
  };

  const handleAddNewHeadingInput = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const actions = {
        headingIndex: data?.length,
        lineItemHeader: event.target.value
      };

      // // Check if the lineItemHeader already exists in data
      // const isDuplicate = data.some((item) => item.lineItemHeader === event.target.value);

      // if (isDuplicate) {
      //   // Handle the duplicate entry, such as showing an error message
      //   setErrorMessage('Duplicate heading found!');
      //   return;
      // }
      // setErrorMessage('');
      setLineItemHeader(event.target.value);
      setShowHeading(false);
      setData((data) => [...data, actions]);
      setShowHeadingInput(!showHeadingInput);
    }
  };

  const singleOfferHandler = async () => {
    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        getSingleOffer({ payload: id || Number(searchParams.get('id')) })
      );

      setOfferProduct(response.payload?.offerProducts);
      if (response.payload?.offerProducts.length) {
        const result = await singleDocumentrHandler({
          documentProducts: response.payload?.offerProducts,
          theDiscount,
          data
        });
        setData(result);
        setToggleSwitch(response.payload.isVat);
      }
    }
  };

  const handleToggleSwitch = () => {
    setToggleSwitch(!toggleSwitch);
  };

  const handleRemove = (row) => {
    setOpenDeleteConfirmation(true);
    setCurrentRow(row);
  };

  const handleRemoveProducts = (row) => {
    handleRemoveLineItemProduct({
      row: currentRow,
      data,
      ids,
      itemToBeRemoved,
      mergedData,
      setData,
      setIds,
      setLineItemHeader,
      setMergedData,
      setPositionNumber,
      setOpenDeleteConfirmation
    });
  };

  const handleActionClick = (row, uniqueIndex) => {
    setOpenPP(uniqueIndex);
    setPpToggle(!ppToggle);
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
    // Save the updated name to the selected row
    setSelectedRow((prevRow) => ({
      ...prevRow,
      name: inputValue
    }));

    setInputValue('');
    setSelectedRow(null);
  };

  const handleNoticeInput = (e, index) => {
    handleAddPurchasingPriceAndNotes({ e, index, setData });
  };

  const handlePurchasePriceInput = (e, index) => {
    handleAddPurchasingPriceAndNotes({ e, index, setData });
  };

  const handleSelectedProduct = async ({ e, value }) => {
    const response = await dispatch(getSingleProduct({ payload: value }));

    handleAddProductToLineItem({
      product: response.payload,
      theDiscount,
      lineItemHeader,
      data,
      setData,
      setPositionNumber,
      positionNumber
    });

    // if (response.meta.requestStatus === 'fulfilled') {
    //   singleOfferHandler();

    //   const payload = {
    //     offerId: Number(id),
    //     offerProducts,
    //     isVat: toggleSwitch,
    //   };
    //   data.length
    //     ? await dispatch(updateOffer({ payload, id }))
    //     : await dispatch(createLineItem({ payload }));
    // }
  };

  const handleSelectedDiscountGroup = (e, { value }) => {
    setTheDiscount(value);
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
    }
  };

  const isIdAdded = (some) => {
    return ids.includes(JSON.parse(some));
  };

  const checkBoxHandler = (e, product) => {
    handleSingleCheckBox({
      e,
      ids,
      product,
      isChecked,
      setIds,
      setData,
      setIsChecked,
      setItemToBeRemoved
    });
  };

  const allCheckboxHandler = (e) => {
    handleAllCheckBox({ e, mergedData, setIds });
  };

  const offerProducts = lineItemProducts({ data, products: offerProduct, theDiscount });

  const handleLineItemSubmit = async (e, stayOnThePage) => {
    e.preventDefault();
    const payload = {
      offerId: Number(id),
      offerProducts,
      isVat: toggleSwitch
    };

    const response =
      isSubmit && offerProduct.length
        ? await dispatch(updateOffer({ payload, id }))
        : await dispatch(createLineItem({ payload }));
    if (response?.meta?.requestStatus === 'fulfilled' && !stayOnThePage) {
      handleTabClick(DOCUMENT_TABS.PAGE_STRUCTURE);
      handleTabCompleted(DOCUMENT_TABS.LINE_ITEMS);
    }
  };

  const handleDuplicate = (row) => {
    duplicateLineItemProducts({
      row,
      data,
      mergedData,
      setData,
      setMergedData
    });
  };

  const handleShowStyling = (index) => {
    setHeadingIndex(index);
    setShowStyle(!showStyle);
  };

  const handleStyling = (tag, row) => {
    handleHeadingStyling({ row, tag, setData });
  };

  const handleEditableFeilds = (row, field, uniqueIndex) => {
    setSelectedItemRow(row);
    setSelectedField(field);
    setLineItemIndexing(uniqueIndex);
  };

  const handleEditableFeildsInput = ({ event, row, uniqueIndex }) => {
    const { name, value } = event.target;

    if (event.key === 'Enter') {
      event.preventDefault();

      handleEditInputFields({
        name,
        value,
        row,
        data,
        setData,
        uniqueIndex,
        setSelectedField,
        setSelectedItemRow,
        setLineItemIndexing
      });
    }
  };

  const handleTaxRate = ({ row, value, uniqueIndex }) => {
    handleTaxRateAndUnitsSelection({
      taxRate: value.label,
      selection: 'taxRate',
      row,
      data,
      setData,
      uniqueIndex
    });
  };

  const handleUnits = ({ row, value, uniqueIndex }) => {
    handleTaxRateAndUnitsSelection({
      selection: 'unit',
      unit: value.label,
      row,
      data,
      setData,
      uniqueIndex
    });
  };

  return {
    handleStyling,
    handleShowStyling,
    isChecked,
    isSubmit,
    setIsSubmit,
    columns,
    ids,
    inputRef,
    isIdAdded,
    allCheckboxHandler,
    checkBoxHandler,
    openPopup,
    setOpenPopup,
    handleActionClick,
    handleSaveClick,
    inputValue,
    selectedRow,
    sortDirection,
    setSortDirection,
    handleDuplicate,
    handleRemove,
    setToggleSwitch,
    toggleSwitch,
    handleToggleSwitch,
    products,
    options,
    data,
    handleSelectedProduct,
    filteredDiscountGroup,
    offerProducts,
    handleSelectedDiscountGroup,
    handleLineItemSubmit,
    itemToBeRemoved,
    ppToggle,
    open,
    handleClick,
    handleClose,
    anchorEl,
    handleAddNewProduct,
    handleAddNewHeading,
    showHeading,
    handleAddNewShow,
    offerProduct,
    mergedData,
    handleAddNewHeadingInput,
    showHeadingInput,
    showStyle,
    headingIndex,
    setData,
    lineItemHeader,
    theDiscount,
    positionNumber,
    handleEditableFeilds,
    selectedField,
    selectedItemRow,
    handleEditableFeildsInput,
    lineItemIndexing,
    defaultTaxRate,
    handleNoticeInput,
    handlePurchasePriceInput,
    openPP,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleRemoveProducts,
    unitsOptions,
    taxRateOptions,
    selectedTaxRate,
    handleTaxRate,
    handleUnits
  };
}
