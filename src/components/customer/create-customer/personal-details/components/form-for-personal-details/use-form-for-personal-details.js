/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';

export default function useFormForPersonalDetail(
  existAdditionalContact,
  existAdditionalAddress
) {
  const [addMorePersons, setAddMorePersons] = useState(false);
  const [addMoreAddress, setAddMoreAddress] = useState(false);
  const [additionalContact, setAdditionalContact] = useState({
    additionalGender: '',
    additionalDesignation: '',
    additionalFirstName: '',
    additionalLastName: '',
    additionalPhone: '',
    additionalFaxNo: '',
    additionalMobileNo: '',
    additionalEmail: ''
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
    AddtionalPostalCode: ''
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupAddress, setOpenPopupAddress] = useState(false);
  const [contactId, setContactId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [disableAddContact, setDisableAddContact] = useState(true);
  const [disableAddAddress, setDisableAddAddress] = useState(true);
  const initialColumns = [
    { id: '1', name: 'additionalGender', title: 'Gender ', selected: true },
    { id: '2', name: 'additionalFirstName', title: 'First Name', selected: true },
    { id: '3', name: 'additionalLastName', title: 'Last Name', selected: true },
    { id: '4', name: 'additionalDesignation', title: 'Designation', selected: true },
    { id: '5', name: 'additionalPhone', title: 'Phone number', selected: true },
    { id: '6', name: 'additionalFaxNo', title: 'Fax No.', selected: true },
    { id: '7', name: 'additionalMobileNo', title: 'MobileNo', selected: true },
    { id: '8', name: 'action', title: 'Action', selected: true },
    { id: '8', name: 'id', title: 'id', selected: false }
  ];
  const initialColumnsAddress = [
    { id: '1', name: 'additionalAddress', title: 'Address ', selected: true },
    { id: '2', name: 'additionalStreetNo', title: 'Street no', selected: true },
    {
      id: '3',
      name: 'additionalAddressSupplement',
      title: 'Address Supplement',
      selected: true
    },
    // { id: '4', name: 'AdditonalCountry', title: 'Country', selected: true },
    // { id: '5', name: 'AdditonalCity', title: 'City', selected: true },
    { id: '6', name: 'AddtionalPostalCode', title: 'Postal code', selected: true },
    { id: '7', name: 'action', title: 'Action', selected: true },
    { id: '8', name: 'id', title: 'id', selected: false }
  ];

  useEffect(() => {
    // const hasEmptyValue = Object.values(additionalContact).some(
    //   (value) => value === '' || value === null || value === undefined
    // );
    // setDisableAddContact(hasEmptyValue || Object.keys(additionalContact).length === 0);
    const { additionalFirstName, additionalLastName } = additionalContact;
    if (additionalFirstName?.trim() !== '' && additionalLastName?.trim() !== '') {
      setDisableAddContact(false);
    } else {
      setDisableAddContact(true);
    }
    const hasEmptyValueAddresses = Object.values(additionalAddress).some(
      (value) => value === '' || value === null || value === undefined
    );
    setDisableAddAddress(
      hasEmptyValueAddresses || Object.keys(additionalAddress).length === 0
    );
  }, [additionalContact, additionalAddress]);
  useEffect(() => {
    if (contactsData.length === 0 && existAdditionalContact?.length > 0) {
      const addAdditionalWords = addAdditionalPrefixToKeys(
        existAdditionalContact,
        'additional',
        ['id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'customerId', 'action']
      );
      setContactsData(addAdditionalWords);
    }
  }, [contactsData, existAdditionalContact]);

  useEffect(() => {
    if (addressData.length === 0 && existAdditionalAddress?.length > 0) {
      const addAdditionalWords = addAdditionalPrefixToKeys(
        existAdditionalAddress,
        'additional',
        ['id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'customerId', 'action']
      );
      setAddressData(addAdditionalWords);
    }
  }, [addressData, existAdditionalAddress]);
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
  };
  const deleteContactList = (id) => {
    const updatedContactList = contactsData?.filter((contact) => contact?.id !== id);
    setContactsData(updatedContactList);
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
                handleEditAdditionalCondact(newId);
                console.log(newId, 'dfd');
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
      additionalFaxNo: '',
      additionalMobileNo: '',
      additionalEmail: ''
    });
  };

  const handleEditAdditionalCondact = (id) => {
    const updatedContactList = contactsData?.filter((contact) => contact?.id === id);
    setAdditionalContactEdit(updatedContactList);
  };

  // addresses

  const handleInputChangeAddress = (e) => {
    const { name, value } = e.target;
    setAdditionalAddress({
      ...additionalAddress,
      [name]: value
    });
  };
  const deleteAddressList = (id) => {
    const updatedAddressList = addressData?.filter((address) => address?.id !== id);
    setAddressData(updatedAddressList);
  };
  const handleAddressDataClick = () => {
    setAddressData((prevFormSubmissions) => {
      const newId =
        prevFormSubmissions.length > 0
          ? prevFormSubmissions[prevFormSubmissions.length - 1].id + 1
          : 1;
      const newAddress = {
        ...additionalAddress,
        id: newId,
        action: (
          <div className="tw-flex tw-items-center tw-gap-2">
            {/* <img
              src="/assets/icons/edit-green.svg"
              alt="edit"
              className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              // onClick={() => handleEditTaxRate(item)}
            /> */}
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

      return [...prevFormSubmissions, newAddress];
    });

    setAdditionalAddress({});
  };

  return {
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
    setAdditionalContactEdit
  };
}
