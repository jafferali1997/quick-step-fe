'use client';

/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-restricted-syntax */

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSingleCustomer } from '@/provider/features/customer/customer.slice';
import { getAllCustomerComment } from '@/provider/features/customer-comments/customer-comments.slice';

export default function useCustomerDetails() {
  const [openPopup, setOpenPopup] = useState(false);
  const [contactBarShow, setContactBarShow] = useState(true);
  const [addressBarShow, setAddressBarShow] = useState(true);
  const [addMorePersons, setAddMorePersons] = useState(false);
  const [addMoreAddress, setAddMoreAddress] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [editedItemAddress, setEditedItemAddress] = useState(null);
  const [additionalContact, setAdditionalContact] = useState({
    additionalGender: '',
    additionalDesignation: '',
    additionalFirstName: '',
    additionalLastName: '',
    additionalPhone: '',
    additionalFax: '',
    additionalMobile: '',
    additionalEmail: '',
    additionalDepartment: ''
  });
  const [additionalContactEdit, setAdditionalContactEdit] = useState(null);
  const [contactsData, setContactsData] = useState([]);
  const [prevExistAdditionalContact, setPrevExistAdditionalContact] = useState([]);
  const [prevExistAdditionalAddress, setExistAdditionalAddress] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [additionalAddress, setAdditionalAddress] = useState({
    additionalAddress: '',
    additionalStreetNo: '',
    additionalAddressSupplement: '',
    additionalPostalCode: '',
    additionalCountry: '',
    additionalCity: ''
  });
  // const [openPopup, setOpenPopup] = useState(false);
  const [openPopupAddress, setOpenPopupAddress] = useState(false);
  const [contactId, setContactId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [disableAddContact, setDisableAddContact] = useState(true);
  const [disableAddAddress, setDisableAddAddress] = useState(true);
  const [editableId, setEditableId] = useState();
  const [updateContactBtn, setupdateContactBtn] = useState(false);
  const [updateAddressBtn, setupdateAddressBtn] = useState(false);
  const [firstCountry, setFirstCountry] = useState('');
  const [additionalCountry, setAdditionalCountry] = useState('');
  const [cities2, setCities2] = useState([]);
  const [additionalCity, setAdditionalCity] = useState(null);

  const initialColumns = [
    { id: '1', name: 'gender', title: 'Gender ', selected: true },
    { id: '2', name: 'firstName', title: 'First Name', selected: true },
    { id: '3', name: 'lastName', title: 'Last Name', selected: true },
    { id: '4', name: 'designation', title: 'Designation', selected: true },
    { id: '5', name: 'phone', title: 'Phone number', selected: true },
    { id: '6', name: 'fax', title: 'Fax No.', selected: true },
    { id: '7', name: 'mobile', title: 'MobileNo', selected: true },
    // { id: '9', name: 'additionalDepartment', title: 'Department', selected: true },
    // { id: '8', name: 'action', title: 'Action', selected: true },
    { id: '10', name: 'id', title: 'id', selected: false }
  ];
  const initialColumnsAddress = [
    { id: '1', name: 'address', title: 'Address ', selected: true },
    { id: '2', name: 'streetNo', title: 'Street no', selected: true },
    {
      id: '3',
      name: 'addressSupplement',
      title: 'Address Supplement',
      selected: true
    },
    { id: '4', name: 'country', title: 'Country', selected: true },
    { id: '5', name: 'city', title: 'City', selected: true },
    { id: '6', name: 'postalCode', title: 'Postal code', selected: true },
    // { id: '7', name: 'action', title: 'Action', selected: true },
    { id: '8', name: 'id', title: 'id', selected: false }
  ];
  // end personal details
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const customerId = useRef(searchParams.get('id'));
  const [companyAddresses, setCompanyAddresses] = useState([]);

  const [isAdditional, setIsAdditional] = useState(true);
  const [isAdress, setIsAdress] = useState(true);
  const [dataset, setData] = useState(null);

  const [allPriceGroup, setAllPriceGroup] = useState([]);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState([]);
  const [allDiscountGroup, setAllDiscountGroup] = useState([]);
  const [selectedDiscountGroup, setSelectedDiscountGroup] = useState([]);
  const [comments, setComments] = useState([]);
  const [defaultData, setDefaultData] = useState({});
  const isLoading = useSelector((state) => state.customer.getSingle.isLoading);

  const additionalhandles = () => {
    setIsAdditional(!isAdditional);
  };
  const adressHandles = () => {
    setIsAdress(!isAdress);
  };

  const { register, handleSubmit, setValue } = useForm();

  async function fetchAndSetData() {
    if (searchParams.get('id')) {
      let data = await dispatch(
        getSingleCustomer({ payload: Number(searchParams.get('id')) })
      );
      data = data.payload;
      console.log(Object.keys(data));

      Object.keys(data).forEach((key) => {
        if (
          key !== 'updatedBy' &&
          key.toLowerCase().includes('date') &&
          data[key] !== '' &&
          data[key] !== null
        ) {
          setValue(key, data[key]?.split('T')[0]);
        } else {
          setValue(key, data[key]);
        }
      });

      if (data?.additionalContact?.length > 0) {
        Object.keys(data.additionalContact[0]).forEach((key) =>
          setValue(`ac_${key}`, data.additionalContact[0][key])
        );
      }

      if (data?.companyAddress?.length > 0) {
        const newcompanyAddresses = data.companyAddress.map((addressObj, index) => {
          setValue(`ca_addressLabel_${index + 1}`, addressObj.addressLabel);
          setValue(`ca_address_${index + 1}`, addressObj.address);
          return { id: index + 1 };
        });
        setCompanyAddresses(newcompanyAddresses);
      }
      const defaultValues = { ...data, paymentType: 'creditCard' };
      if (data?.paymentDetailType === 'BANK') {
        defaultValues.paymentType = 'bankDetail';
      }
      setDefaultData(defaultValues);
      setValue(`${data?.termOfPayment}_DATA`, data?.termOfPaymentData);

      if (data?.priceGroup?.length > 0) {
        setSelectedPriceGroup(
          data.priceGroup.map((item) => ({
            id: `${item.id}`,
            value: `${item.id}`,
            label: item.priceGroupName
          }))
        );
      }
      if (data?.discountGroup?.length > 0) {
        setSelectedDiscountGroup(
          data.discountGroup.map((item) => ({
            id: `${item.id}`,
            value: `${item.id}`,
            label: item.discountGroupName
          }))
        );
      }
      setValue('termOfDelivery', data?.termOfDelivery[0]?.termOfDelivery);
    }
  }

  const fetchCustomerComments = async () => {
    let data = await dispatch(
      getAllCustomerComment({ payload: Number(searchParams.get('id')) })
    );
    data = data.payload;
    if (data?.length > 0) {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchAndSetData();
    fetchCustomerComments();
  }, [searchParams]);

  // personal details
  useEffect(() => {
    if (editedItem) {
      setAdditionalContact({
        id: editedItem.id,
        additionalGender: editedItem.gender || editedItem.additionalGender,
        additionalDesignation: editedItem.designation || editedItem.additionalDesignation,
        additionalFirstName: editedItem.firstName || editedItem.additionalFirstName,
        additionalLastName: editedItem.lastName || editedItem.additionalLastName,
        additionalPhone: editedItem.phone || editedItem.additionalPhone,
        additionalFax: editedItem.fax || editedItem.additionalFax,
        additionalMobile: editedItem.mobile || editedItem.additionalMobile,
        additionalEmail: editedItem.email || editedItem.additionalEmail,
        additionalDepartment: editedItem.department || editedItem.additionalDepartment
      });
    }
  }, [editedItem]);
  useEffect(() => {
    if (editedItemAddress) {
      setAdditionalAddress({
        id: editedItemAddress.id,
        additionalAddress:
          editedItemAddress.address || editedItemAddress.additionalAddress,
        additionalStreetNo:
          editedItemAddress.streetNo || editedItemAddress.additionalStreetNo,
        additionalAddressSupplement:
          editedItemAddress.addressSupplement ||
          editedItemAddress.additionalAddressSupplement,
        additionalPostalCode:
          editedItemAddress.postalCode || editedItemAddress.additionalPostalCode,
        additionalCountry:
          editedItemAddress.country || editedItemAddress.additionalCountry,
        additionalCity: editedItemAddress.city || editedItemAddress.additionalCity
      });
      setAdditionalCity(editedItemAddress.additionalCity || editedItemAddress.city);
      setAdditionalCountry(
        editedItemAddress.additionalCountry || editedItemAddress.country
      );
    }
  }, [editedItemAddress]);

  const addAdditionalPrefixToKeys = (arrayOfObjects, additionalWord, keysToSkip) => {
    return arrayOfObjects?.map((obj) => {
      const updatedObj = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (keysToSkip.includes(key)) {
            updatedObj[key] = obj[key];
          } else {
            const updatedKey =
              additionalWord + key.charAt(0).toUpperCase() + key.slice(1);
            updatedObj[updatedKey] = obj[key];
          }
        }
      }

      return updatedObj;
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAdditionalContact({
      ...additionalContact,
      [name]: value
    });
    const hasValue = Object.values({
      ...additionalContact,
      [name]: value
    }).some((val) => val.trim() !== '');

    setDisableAddContact(!hasValue);
  };

  const deleteContactList = (id) => {
    const updatedContactList = contactsData?.filter((contact) => contact?.id !== id);
    setContactsData(updatedContactList);
  };

  const handleEditAdditionalContact = (item) => {
    setAddMorePersons(true);
    setEditedItem(item);

    setupdateContactBtn(true);
  };

  const handleUpdateContact = (id) => {
    const updateContactSingle = contactsData?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...additionalContact,
          action: (
            <div className="tw-flex tw-items-center tw-gap-2">
              <img
                src="/assets/icons/edit-green.svg"
                alt="edit"
                className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
                onClick={() => {
                  handleEditAdditionalContact({ ...additionalContact, id: item.id });
                }}
              />
              <img
                src="/assets/icons/delete-red.svg"
                alt="delete"
                className="tw-h-6 tw-w-6 hover:tw-cursor-pointer"
                onClick={() => {
                  // dispatch(setOpenPopupContact(true));
                  setOpenPopup(true);
                  setContactId(item.id);
                }}
              />
            </div>
          )
        };
      }
      return item;
    });

    setContactsData(updateContactSingle);
    setupdateContactBtn(false);
    setAddMorePersons(false);
    setAdditionalContact({});
  };

  const handleContactsDataClick = () => {
    setContactsData((prevFormSubmissions) => {
      const newId =
        prevFormSubmissions?.length > 0
          ? prevFormSubmissions[prevFormSubmissions.length - 1].id + 1
          : 1;
      const newContact = {
        ...additionalContact,
        id: newId,
        action: (
          <div className="tw-flex tw-items-center tw-gap-2">
            <img
              src="/assets/icons/edit-green.svg"
              alt="edit"
              className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() => {
                handleEditAdditionalContact({ ...additionalContact, id: newId });
              }}
            />
            <img
              src="/assets/icons/delete-red.svg"
              alt="delete"
              className="tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() => {
                setOpenPopup(true);
                setContactId(newId);
              }}
            />
          </div>
        )
      };

      return [...prevFormSubmissions, newContact];
    });

    setAdditionalContact({
      additionalGender: '',
      additionalDesignation: '',
      additionalFirstName: '',
      additionalLastName: '',
      additionalPhone: '',
      additionalFax: '',
      additionalMobile: '',
      additionalEmail: '',
      additionalDepartment: ''
    });
  };

  // addresses

  const handleInputChangeAddress = (e) => {
    const { name, value } = e.target;
    setAdditionalAddress({
      ...additionalAddress,
      [name]: value
    });
    const hasValue = Object.values({
      ...additionalAddress,
      [name]: value
    }).some((val) => val.trim() !== '');

    setDisableAddAddress(!hasValue);
  };
  const deleteAddressList = (id) => {
    const updatedAddressList = addressData?.filter((address) => address?.id !== id);
    setAddressData(updatedAddressList);
  };

  const handleEditAdditionalAddress = (item) => {
    setAdditionalCity(item.additionalCity ?? item.city);

    setAdditionalCountry(item.additionalCountry || item.country);
    setAddMoreAddress(true);
    setEditedItemAddress({
      ...item,
      additionalCity: additionalCity || '',
      additionalCountry: additionalCountry || ''
    });

    setupdateAddressBtn(true);
  };
  const handleAddressDataClick = () => {
    setAddressData((prevFormSubmissions) => {
      const newId =
        prevFormSubmissions?.length > 0
          ? prevFormSubmissions[prevFormSubmissions.length - 1].id + 1
          : 1;
      const newAddress = {
        ...additionalAddress,
        additionalCountry,
        additionalCity: additionalCity ?? '',
        id: newId,
        action: (
          <div className="tw-flex tw-items-center tw-gap-2">
            <img
              src="/assets/icons/edit-green.svg"
              alt="edit"
              className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() =>
                handleEditAdditionalAddress({
                  ...additionalAddress,
                  id: newId,
                  additionalCountry,
                  additionalCity: additionalCity ?? ''
                })
              }
            />
            <img
              src="/assets/icons/delete-red.svg"
              alt="delete"
              className="tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() => {
                setOpenPopupAddress(true);
                setAddressId(newId);
              }}
            />
          </div>
        )
      };

      // setAdditionalCountry(null);
      // setAdditionalCity(null);
      return [...prevFormSubmissions, newAddress];
    });
    setAdditionalAddress({});
    setAddMoreAddress(false);
  };

  const handleUpdateAddress = (id) => {
    const updateAddressSingle = addressData?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...additionalAddress,
          additionalCountry,
          additionalCity: additionalCity ?? '',
          action: (
            <div className="tw-flex tw-items-center tw-gap-2">
              <img
                src="/assets/icons/edit-green.svg"
                alt="edit"
                className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
                onClick={() => {
                  handleEditAdditionalAddress({
                    ...additionalAddress,
                    id: item.id,
                    additionalCountry,
                    additionalCity: additionalCity ?? ''
                  });
                }}
              />
              <img
                src="/assets/icons/delete-red.svg"
                alt="delete"
                className="tw-h-6 tw-w-6 hover:tw-cursor-pointer"
                onClick={() => {
                  setOpenPopupAddress(true);
                  setAddressId(item.id);
                }}
              />
            </div>
          )
        };
      }
      return item;
    });
    setupdateAddressBtn(false);

    setAddressData(updateAddressSingle);
    setAddMoreAddress(false);
    setAdditionalAddress({});
  };

  return {
    isAdditional,
    setIsAdditional,
    additionalhandles,
    isAdress,
    setIsAdress,
    adressHandles,
    register,
    handleSubmit,
    id: customerId.current,
    companyAddresses,
    selectedDiscountGroup,
    selectedPriceGroup,
    allDiscountGroup,
    allPriceGroup,
    defaultData,
    comments,
    isLoading,
    dataset,
    // start use form
    addMorePersons,
    setAddMorePersons,
    handleInputChange,
    additionalContact,
    handleContactsDataClick,
    contactsData,
    initialColumns,
    handleInputChangeAddress,
    additionalAddress,
    setAdditionalAddress,
    addMoreAddress,
    setAddMoreAddress,
    addressData,
    setAddressData,
    handleAddressDataClick,
    initialColumnsAddress,
    openPopup,
    setOpenPopup,
    deleteContactList,
    contactId,
    disableAddContact,
    openPopupAddress,
    setOpenPopupAddress,
    deleteAddressList,
    addressId,
    setAddressId,
    disableAddAddress,
    setDisableAddAddress,
    additionalContactEdit,
    setAdditionalContactEdit,
    updateContactBtn,
    setupdateContactBtn,
    handleUpdateContact,
    contactBarShow,
    setContactBarShow,
    setAdditionalContact,
    handleUpdateAddress,
    updateAddressBtn,
    setupdateAddressBtn,
    addressBarShow,
    setAddressBarShow,
    // onCountryChangeAdditional,
    firstCountry,
    additionalCountry,
    cities2,
    setCities2,
    additionalCity,
    setAdditionalCity
  };
}
