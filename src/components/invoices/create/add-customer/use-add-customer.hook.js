import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import useCustomer from '@/common/hooks/use-customer.hook';
import { getSingleCustomer } from '@/provider/features/customer/customer.slice';
import {
  addCustomer,
  getSingleInvoice,
  updateInvoice
} from '@/provider/features/invoice/invoice.slice';

export default function useAddCustomer(handleTabClick, handleTabCompleted) {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [id, setId] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [companyAddress, setCompanyAddress] = useState(
    Number(searchParams.get('id')) ? {} : 'Select Address'
  );
  const [contactPerson, setContactPerson] = useState(
    Number(searchParams.get('id')) ? {} : 'Select Contact Person'
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    Number(searchParams.get('id')) ? {} : ''
  );

  const convertedFrom = searchParams.get('from');

  const { customer, customerOptions, companyAddressOptions, contactPersonOptions } =
    useCustomer();

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleInvoiceHandler(Number(searchParams.get('id')));
    }
  }, [searchParams]);

  const singleInvoiceHandler = async (id) => {
    if (id) {
      const response = await dispatch(
        getSingleInvoice({ payload: id || Number(searchParams.get('id')) })
      );

      if (response?.payload?.id) {
        getCustomer(response?.payload?.customer.id);
      }

      // For Customer
      const customerId = response?.payload.customerId;
      if (customerId) {
        const customer = response?.payload.customer;

        let label = '';

        if (customer.companyName) {
          label += customer.companyName;
        }

        if (customer.firstName || customer.lastName) {
          if (label) {
            label += ' ';
          }

          label += `(${customer.firstName || ''} ${customer.lastName || ''})`;
        }

        setSelectedCustomer({
          value: response?.payload.customerId,
          label
        });
      } else {
        setCompanyAddress('Select Customer');
      }

      const customerContactPersonId = response?.payload.customerContactPersonId;
      if (customerContactPersonId) {
        const customerContactPerson = response?.payload.customerContactPerson;
        const firstName = customerContactPerson?.firstName || '';
        const lastName = customerContactPerson?.lastName || '';
        const address = customerContactPerson?.address || '';

        setContactPerson({
          value: customerContactPersonId,
          label: `${firstName} ${lastName} ${address}`
        });
      } else {
        setContactPerson('Select Contact Person');
      }

      // For address
      const customerCompanyAddressId = response?.payload.customerCompanyAddressId;
      if (customerCompanyAddressId) {
        const customerCompanyAddress = response?.payload.customerCompanyAddress;
        const address = customerCompanyAddress?.address || '';
        const addressSupplement = customerCompanyAddress?.addressSupplement || '';
        const postalCode = customerCompanyAddress?.postalCode || '';

        setCompanyAddress({
          value: customerCompanyAddressId,
          label: `${address} ${addressSupplement} ${postalCode}`
        });
      } else {
        setCompanyAddress('Select Address');
      }
    }
  };

  const getCustomer = async (value) => {
    await dispatch(getSingleCustomer({ payload: value }));
  };

  const handleSelectCustomer = ({ label, value }) => {
    setSelectedCustomer({ value, label });
    getCustomer(value);

    setCompanyAddress({
      value: '',
      label: 'Select Address'
    });
    setContactPerson({
      value: '',
      label: 'Select Contact Person'
    });
  };

  const handleContactPerson = ({ label, value }) => {
    setContactPerson({ value, label });
  };

  const handleCompanyAddress = ({ label, value }) => {
    setCompanyAddress({ value, label });
  };

  const handleAddCustomer = async () => {
    const payload = {
      customerId: customer.id,
      customerContactPersonId: contactPerson.value || undefined,
      customerCompanyAddressId: companyAddress.value || undefined
    };

    const response = id
      ? await dispatch(updateInvoice({ payload, id }))
      : await dispatch(
          addCustomer({
            payload,
            id
          })
        );
    if (response?.meta?.requestStatus === 'fulfilled') {
      handleTabClick(DOCUMENT_TABS.LINE_ITEMS);
      handleTabCompleted(DOCUMENT_TABS.CUSTOMER_DETAILS);
      if (convertedFrom) {
        router.push(
          `${window.location.pathname}?from=${convertedFrom}&id=${response.payload.id}&d-id=${response.payload.displayId}&currentTab=${DOCUMENT_TABS.LINE_ITEMS}&completedTabs=${DOCUMENT_TABS.CUSTOMER_DETAILS}`
        );
      } else {
        router.push(
          `${window.location.pathname}?id=${response.payload.id}&d-id=${response.payload.displayId}&currentTab=${DOCUMENT_TABS.LINE_ITEMS}&completedTabs=${DOCUMENT_TABS.CUSTOMER_DETAILS}`
        );
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddCustomer();
  };

  return {
    isSubmit,
    setIsSubmit,
    onSubmit,
    customerOptions,
    companyAddressOptions,
    handleSelectCustomer,
    customer,
    companyAddress,
    handleCompanyAddress,
    handleContactPerson,
    contactPerson,
    selectedCustomer,
    contactPersonOptions
  };
}
