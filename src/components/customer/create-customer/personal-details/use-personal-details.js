'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */

/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */

import axios from 'axios';
import { City, Country } from 'country-state-city';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createCustomerPersonalDetail,
  getSingleCustomer,
  updateCustomer
} from '@/provider/features/customer/customer.slice';
import useCountryCity from '@/common/hooks/use-country-city.hook';
import removeEmptyKeys from '@/common/hooks/use-remove-empty-keys';
import {
  setContactId,
  setOpenPopupContact
} from '@/provider/features/contact-id/contact.slice';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .nullable()
    .test(
      'is-valid-tin',
      'first name must be at most 50 characters long',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup.string().max(50, 'first name must be at most 50 characters long');
      }
    )
    .default(null),

  lastName: yup
    .string()
    .nullable()
    .test(
      'is-valid-tin',
      'last name must be at most 50 characters long',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup.string().max(50, 'first name must be at most 50 characters long');
      }
    )
    .default(null),
  companyName: yup
    .string()
    .nullable()
    .test(
      'is-valid-tin',
      'Company Name must be at most 50 characters long',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup.string().max(50, 'Company Name must be at most 50 characters long');
      }
    )
    .default(null),

  tin: yup
    .string()
    .nullable()
    .test('is-valid-tin', 'TIN must be exactly 10 digits', function (value) {
      if (!value || value.length === 0) {
        return true;
      }

      return value.length === 10;
    })
    .default(null),
  vat: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]{0,9}$/,
      'VAT number must be alphanumeric and have a maximum of 9 digits'
    )
    .nullable(),
  designation: yup
    .string()
    .nullable()
    .test(
      'is-valid-designation',
      'Designation must contain only alphabetic characters and must not exceed 100 characters',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup
          .string()
          .matches(/^[a-zA-Z]+$/, 'Designation must contain only alphabetic characters')
          .min(1, 'Designation must be at least 1 character')
          .max(100, 'Designation must not exceed 100 characters')
          .isValidSync(value);
      }
    )
    .default(null),

  address: yup
    .string()
    .nullable()
    .nullable()
    .test(
      'is-valid-designation',
      'Address must contain only alphabetic characters and must not exceed 95 characters',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup
          .string()
          .matches(
            /^[a-zA-Z0-9\s]+$/,
            'Address must contain only alphanumeric characters'
          )
          .min(1, 'Address must be at least 1 character')
          .max(95, 'Address must not exceed 95 characters')
          .isValidSync(value);
      }
    )
    .default(null),

  streetNo: yup
    .string()
    .nullable()
    .test(
      'is-valid-designation',
      'Street No  must contain only alphabetic characters and must not exceed 95 characters',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup
          .string()
          .matches(
            /^[a-zA-Z0-9\s]+$/,
            'Street No must contain only alphanumeric characters'
          )
          .min(1, 'Street No must be at least 1 character')
          .max(95, 'Street No must not exceed 95 characters')
          .isValidSync(value);
      }
    )
    .default(null),

  companyEmail: yup.string().email('Invalid email format').nullable(),
  addressSupplement: yup
    .string()
    .nullable()
    .test(
      'is-valid-designation',
      'Address Supplement  must contain only alphabetic characters and must not exceed 95 characters',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup
          .string()
          .matches(
            /^[a-zA-Z0-9\s]+$/,
            'Address Supplement must contain only alphanumeric characters'
          )
          .min(1, 'Address Supplement must be at least 1 character')
          .max(95, 'Address Supplement must not exceed 95 characters')
          .isValidSync(value);
      }
    )
    .default(null),

  postalCode: yup
    .string()
    .nullable()
    .test(
      'is-valid-designation',
      'Postal code must not exceed 10 characters',
      function (value) {
        if (!value || value.length === 0) {
          return true;
        }

        return yup
          .string()
          .matches(
            /^[a-zA-Z0-9]+$/,
            'Postal code must contain only alphanumeric characters'
          )
          .min(1, 'Postal code must be at least 1 character')
          .max(10, 'Postal code must not exceed 10 characters')
          .isValidSync(value);
      }
    )
    .default(null)
});

export default function usePersonalDetails({ handleTabClick, handleTabCompleted }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });
  const { handleCountryChange, cities, error, setCountry, country } = useCountryCity();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState();

  const [allPriceGroup, setAllPriceGroup] = useState([]);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState([]);

  const [selectedDiscountGroup, setSelectedDiscountGroup] = useState([]);
  const [allDiscountGroup, setAllDiscountGroup] = useState([]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  // use form personal details for
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
    { id: '1', name: 'additionalGender', title: 'Gender ', selected: true },
    { id: '2', name: 'additionalFirstName', title: 'First Name', selected: true },
    { id: '3', name: 'additionalLastName', title: 'Last Name', selected: true },
    { id: '4', name: 'additionalDesignation', title: 'Designation', selected: true },
    { id: '5', name: 'additionalPhone', title: 'Phone number', selected: true },
    { id: '6', name: 'additionalFax', title: 'Fax No.', selected: true },
    { id: '7', name: 'additionalMobile', title: 'MobileNo', selected: true },
    // { id: '9', name: 'additionalDepartment', title: 'Department', selected: true },
    { id: '8', name: 'action', title: 'Action', selected: true },
    { id: '10', name: 'id', title: 'id', selected: false }
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
    { id: '4', name: 'additionalCountry', title: 'Country', selected: true },
    { id: '5', name: 'additionalCity', title: 'City', selected: true },
    { id: '6', name: 'additionalPostalCode', title: 'Postal code', selected: true },
    { id: '7', name: 'action', title: 'Action', selected: true },
    { id: '8', name: 'id', title: 'id', selected: false }
  ];
  // const contactId = useSelector((state) => state.contact?.contactId);
  // const open = useSelector((state) => state.contact?.openPopupContact);

  // console.log(contactId, open, 'state ');

  // useEffect(() => {
  //   console.log(open, 'open');
  // }, [open]);

  // useEffect(() => {
  //   // const hasEmptyValue = Object.values(additionalContact).some(
  //   //   (value) => value === '' || value === null || value === undefined
  //   // );
  //   // setDisableAddContact(hasEmptyValue || Object.keys(additionalContact).length === 0);
  //   const { additionalFirstName, additionalLastName } = additionalContact;
  //   if (additionalFirstName?.trim() !== '' && additionalLastName?.trim() !== '') {
  //     setDisableAddContact(false);
  //   } else {
  //     setDisableAddContact(true);
  //   }
  //   const hasEmptyValueAddresses = Object.values(additionalAddress).some(
  //     (value) => value === '' || value === null || value === undefined
  //   );
  //   setDisableAddAddress(
  //     hasEmptyValueAddresses || Object.keys(additionalAddress).length === 0
  //   );
  // }, [additionalContact, additionalAddress]);
  // useEffect(() => {
  //   if (contactsData.length === 0 && existAdditionalContact?.length > 0) {
  //     const addAdditionalWords = addAdditionalPrefixToKeys(
  //       existAdditionalContact,
  //       'additional',
  //       ['id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'customerId', 'action']
  //     );
  //     setContactsData(addAdditionalWords);
  //   }
  // }, [contactsData, existAdditionalContact]);

  // useEffect(() => {
  //   if (addressData.length === 0 && existAdditionalAddress?.length > 0) {
  //     const addAdditionalWords = addAdditionalPrefixToKeys(
  //       existAdditionalAddress,
  //       'additional',
  //       ['id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'customerId', 'action']
  //     );
  //     setAddressData(addAdditionalWords);
  //   }
  // }, [addressData, existAdditionalAddress]);

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

  //  end usepersonals

  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (id) => {
      let data = await dispatch(getSingleCustomer({ payload: Number(id) }));
      if (data.payload) {
        data = data.payload;
        Object.keys(data).forEach((key) => setValue(key, data[key]));

        handleCountryChange({ target: { value: data.country } });
        setCountry(data.country);
        setValue('city', data.city);
        setSelectedPriceGroup(
          data.priceGroup.map((item) => {
            return allPriceGroup.find((price) => Number(price.id) === item.id);
          })
        );
        setSelectedDiscountGroup(
          data.discountGroup.map((item) => {
            return allDiscountGroup.find((price) => Number(price.id) === item.id);
          })
        );
        const modifiedDataContact = data?.additionalContact?.map((item) => ({
          ...item,
          action: (
            <div className="tw-flex tw-items-center tw-gap-2">
              <img
                src="/assets/icons/edit-green.svg"
                alt="edit"
                className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
                onClick={() => {
                  handleEditAdditionalContact(item);
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
        }));
        const modifiedDataAddress = data?.companyAddress?.map((item) => ({
          ...item,
          action: (
            <div className="tw-flex tw-items-center tw-gap-2">
              <img
                src="/assets/icons/edit-green.svg"
                alt="edit"
                className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
                onClick={() => {
                  handleEditAdditionalAddress(item);
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
        }));
        const contactAdditionalData = addAdditionalPrefixToKeys(
          modifiedDataContact,
          'additional',
          [
            'id',
            'createdAt',
            'updatedAt',
            'createdBy',
            'updatedBy',
            'customerId',
            'action'
          ]
        );
        setContactsData(contactAdditionalData);

        const addressAdditionalData = addAdditionalPrefixToKeys(
          modifiedDataAddress,
          'additional',
          [
            'id',
            'createdAt',
            'updatedAt',
            'createdBy',
            'updatedBy',
            'customerId',
            'action'
          ]
        );
        setAddressData(addressAdditionalData);
        // setData({
        //   ...data,
        //   additionalContact: modifiedDataContact,
        //   companyAddress: modifiedDataAddress
        // });
      }
    },
    [allPriceGroup, allDiscountGroup]
  );

  const onCountryChange = (e) => {
    // setValue('country', e.target.value);
    setFirstCountry(e.target.value);
    setValue('city', '');
    handleCountryChange(e);
  };
  // const onCountryChangeAdditional = (e) => {
  //   console.log('country');
  //   // setValue('country', e.target.value);
  //   setAdditionalCountry(e.target.value);
  //   // setCountry('additionalCountry', e.target.value);
  //   setValue('additionalCity', '');
  //   handleCountryChange(e);
  // };
  const onCountryChangeAdditional = (e) => {
    setAdditionalCountry(e.target.value);
    // setValue('ac_country', e.target.value);
    const [name, code] = e.target.value.split('-');
    const _cities = City.getCitiesOfCountry(code);
    const cityOptions = _cities.map((cit) => ({
      label: cit.name,
      value: cit.name.toLowerCase()
    }));
    setCities2(cityOptions);
  };

  useEffect(() => {
    const id = Number(searchParams.get('id'));
    if (id) {
      fetchData(id);
    }
  }, [searchParams, allPriceGroup, allDiscountGroup, fetchData]);

  const modifyKeys = (arrayOfObjects) => {
    return arrayOfObjects?.map((obj) => {
      const updatedObj = {};
      for (let key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          if (key.startsWith('additional')) {
            const newKey = key.replace('additional', '');
            const camelCaseKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);

            // Check if the value is empty, null, or undefined
            if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
              updatedObj[camelCaseKey] = obj[key];
            }
          } else {
            updatedObj[key] = obj[key];
          }
        }
      }
      return updatedObj;
    });
  };
  const removeKeysFromArray = (arrayOfObjects, keysToRemove) => {
    return arrayOfObjects?.map((obj) => {
      const updatedObj = { ...obj }; // Create a copy of the object

      keysToRemove.forEach((key) => {
        if (updatedObj.hasOwnProperty(key)) {
          delete updatedObj[key]; // Remove the specified key
        }
      });

      return updatedObj;
    });
  };
  const onSubmit = async (value) => {
    const removeAdditonalWords = modifyKeys(contactsData);
    const removeActionFromAdditonalWords = removeKeysFromArray(removeAdditonalWords, [
      'action',
      'id'
    ]);
    const removeAdreaaAdditonalWords = modifyKeys(addressData);
    const removeActionFromAdditonalWordsAddress = removeKeysFromArray(
      removeAdreaaAdditonalWords,
      ['action', 'id']
    );

    if (!value.companyName && !value.firstName && !value.lastName) {
      setError('companyName', {
        type: 'required',
        message: 'Company name is required'
      });
      setError('firstName', {
        type: 'required',
        message: 'First name is required'
      });
      setError('lastName', {
        type: 'required',
        message: 'Last name is required'
      });
    } else if (value.companyName) {
      // if (!/^[A-Za-z\s]+$/.test(value.companyName)) {
      //   setError('companyName', {
      //     type: 'alphabetic',
      //     message: 'Company name must contain alphabetic characters only'
      //   });
      // }
      clearErrors('firstName');
      clearErrors('lastName');
    } else if (value.firstName && value.lastName) {
      clearErrors('companyName');
    } else if (!value.firstName) {
      clearErrors('companyName');
      setError('firstName', {
        type: 'required',
        message: 'Last name is required'
      });
    } else if (!value.lastName) {
      clearErrors('companyName');
      clearErrors('firstName');
      setError('lastName', {
        type: 'required',
        message: 'Last name is required'
      });
    }

    if (
      (!value.companyName || errors.companyName) &&
      (!value.firstName || !value.lastName)
    ) {
      return false;
    } else {
      const priceGroups = [
        ...selectedPriceGroup.map((item) => {
          return Number(item?.value);
        })
      ];
      const discountGroups = [
        ...selectedDiscountGroup.map((item) => {
          return Number(item?.value);
        })
      ];
      const payloadData = removeEmptyKeys({
        ...value,
        gender: value.gender === 'Select Gender' ? '' : value.gender,
        firstName: value.firstName,
        lastName: value.lastName,
        designation: value.designation,
        address: value.address,
        city: value.city === 'Select City' ? '' : value.city,
        country: country === 'Select Country' ? '' : country,
        companySize: value.companySize === 'Select Company Size' ? '' : value.companySize,
        additionalCountry: null,
        additionalGender: null,
        postalCode: value.postalCode,
        companyName: value.companyName,
        additionalContact: removeActionFromAdditonalWords,
        companyAddress: removeActionFromAdditonalWordsAddress
      });

      let response = null;
      if (searchParams.get('id')) {
        response = await dispatch(
          updateCustomer({
            payload: {
              data: {
                ...payloadData,
                additionalContact: removeActionFromAdditonalWords,
                companyAddress: removeActionFromAdditonalWordsAddress,
                priceGroup: priceGroups,
                discountGroup: discountGroups
              },
              id: Number(searchParams.get('id'))
            }
          })
        );
      } else {
        response = await dispatch(
          createCustomerPersonalDetail({
            payload: removeEmptyKeys({ ...payloadData, priceGroups, discountGroups })
          })
        );
      }

      if (response.payload && response.payload.id) {
        handleTabClick('payment_details');
        handleTabCompleted('customer_details');
        router.push(`/customer/create?id=${response.payload.id}`);
      }
    }
  };

  const handleButtonClickedit = () => {
    setOpenPopup(!openPopup);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    data,
    allPriceGroup,
    setAllPriceGroup,
    selectedPriceGroup,
    setSelectedPriceGroup,
    allDiscountGroup,
    setAllDiscountGroup,
    selectedDiscountGroup,
    setSelectedDiscountGroup,
    setIsSubmit,
    router,
    errors,
    handleButtonClickedit,
    control,
    cities,
    country,
    onCountryChange,
    error,
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
    onCountryChangeAdditional,
    firstCountry,
    additionalCountry,
    cities2,
    setCities2,
    additionalCity,
    setAdditionalCity
  };
}
