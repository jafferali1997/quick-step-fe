'use client';

import PropTypes from 'prop-types';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import useAddCustomer from './use-add-customer-order.hook';

export default function AddCustomer({ handleTabClick, handleTabCompleted }) {
  const {
    setIsSubmit,
    onSubmit,
    customerOptions,
    handleSelectCustomer,
    customer,
    contactPerson,
    companyAddressOptions,
    companyAddress,
    handleCompanyAddress,
    handleContactPerson,
    contactPersonOptions,
    selectedCustomer
  } = useAddCustomer(handleTabClick, handleTabCompleted);

  return (
    <div className="personal-details-wrapper">
      <div className="content-header tw-flex tw-items-center tw-justify-between ">
        <h3 className="form-inner-heading">Customer Details</h3>
        <div className="tw-h-[37px] tw-w-full tw-max-w-[523px] tw-bg-[#BBBBBB26]">
          <Select
            value={selectedCustomer}
            name="customer"
            options={customerOptions}
            defaultValue="Select Customer"
            placeholder="Select Customer"
            onChange={(e, value) => handleSelectCustomer(value)}
          />
        </div>
      </div>
      <div className="content-body">
        {' '}
        <form onSubmit={onSubmit}>
          <div className="form-box-grid-4col tw-mt-2">
            <CustomInput
              label="Gender"
              disabled={true}
              value={customer && customer?.gender}
            />
            <CustomInput
              label="Designation"
              name="designation"
              value={customer && customer?.designation}
              type="text"
              disabled={true}
            />
            <CustomInput
              label="First Name"
              name="firstName"
              value={customer && customer?.firstName}
              type="text"
              disabled={true}
            />
            <CustomInput
              label="Last Name"
              name="lastName"
              value={customer && customer?.lastName}
              type="text"
              disabled={true}
            />
            <CustomInput
              label="Company Name"
              name="Company_Name"
              value={customer && customer?.companyName}
              type="text"
              disabled={true}
            />
            <CustomInput
              label="Address Supplement"
              name="Address_Supplement"
              value={customer && customer?.address}
              type="text"
              disabled={true}
            />

            <CustomInput
              label="Country"
              name="country"
              disabled={true}
              value={customer && customer?.country}
            />
            <CustomInput
              label="City"
              name="city"
              disabled={true}
              value={customer && customer?.city}
            />
          </div>
          <div className="form-box-grid-4col">
            <CustomInput
              label="Postal Code"
              name="postal"
              value={customer && customer?.postalCode}
              type="text"
              disabled={true}
            />
            <Select
              name="address"
              label="Address"
              value={companyAddress}
              options={companyAddressOptions}
              defaultValue="Select Address"
              placeholder="Select Address"
              onChange={(e, value) => handleCompanyAddress(value)}
            />
            <Select
              name="contactPerson"
              label="Contact Person"
              value={contactPerson}
              options={contactPersonOptions}
              defaultValue="Select Contact Person"
              placeholder="Select Contact Person"
              onChange={(e, value) => handleContactPerson(value)}
            />
          </div>
          <StepperFooter setIsSubmit={setIsSubmit} disabled={!selectedCustomer} />
        </form>
      </div>
    </div>
  );
}
AddCustomer.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
