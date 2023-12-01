import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useAdminViewOffer() {
  const [open, setOpen] = useState('');
  const [invoiced, setInvoiced] = useState('');
  const [profit, setProfit] = useState('');
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedNoOfItems, setSelectedNoOfItems] = useState(null);
  const [selectedNetPrice, setSelectedNetPrice] = useState(null);
  const [selectedGrossPrice, setSelectedGrossPrice] = useState(null);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const offers = [
    {
      id: 1,
      status: 'Open',
      value: `€ ${open || 0}`,
      icon: '/assets/images/offers/open.svg'
    },
    {
      id: 2,
      status: 'Invoiced',
      value: `€ ${invoiced || 0}`,
      icon: '/assets/images/offers/invoiced.svg '
    },
    {
      id: 3,
      status: 'Profit',
      value: `€ ${profit || 0}`,
      icon: '/assets/images/offers/profit.svg'
    }
  ];
  const initialColumns = [
    { id: '1', name: 'offer', title: 'Offer #', selected: true },
    { id: '2', name: 'firstName', title: 'First Name', selected: true },
    { id: '3', name: 'lastName', title: 'Last Name', selected: true },
    { id: '4', name: 'company', title: 'Company Name', selected: true },
    { id: '5', name: 'address', title: 'Company Address', selected: true },
    { id: '6', name: 'country', title: 'Country', selected: true },
    { id: '7', name: 'created', title: 'Created At', selected: false },
    { id: '8', name: 'status', title: 'Status', selected: true }
  ];
  const { register, handleSubmit, reset } = useForm();
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
  const filterModalCloseHandler = () => {
    // getOfferData();
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

    // getOfferData(payloadData);
    setOpenFilterPopup(false);
  };
  return {
    offers,
    initialColumns,
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
    openFilterPopup,
    setOpenFilterPopup
  };
}
