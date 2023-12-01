'use client';

/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Link from 'next/link';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton
} from '@mui/material';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import FormInput from '@/common/components/form-input-old/form-input.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';
import MultiSelect from '@/common/components/multi-select/multi-select.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import TextArea from '@/common/components/text-area/text-area.component';
import CustomRadio from '@/common/components/custom-radio/custom-radio.component';
import PriceGroup from '../create-customer/personal-details/components/price-group/price-group.component';
import DiscountGroup from '../create-customer/personal-details/components/discount-group/discount-group.component';
import useEditCustomer from './old-use-edit-customer.hook';
import DeleteIcon from '@/common/icons/delete.icon';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import COUNTRIES from '@/common/constants/countries.constant';
import Loadar from '@/common/components/loadar/loadar.component';
import CircularILoader from '@/common/components/circular-loader/circular-loader.component';
import FileInput from '@/common/components/file-input/file-input.component';

export default function OldEditCustomer() {
  const {
    isAdditional,
    additionalhandles,
    isAdress,
    adressHandles,
    register,
    handleSubmit,
    errors,
    id,
    onSubmit,
    handleAddInput,
    allPriceGroup,
    setAllPriceGroup,
    selectedPriceGroup,
    setSelectedPriceGroup,
    allDiscountGroup,
    setAllDiscountGroup,
    selectedDiscountGroup,
    setSelectedDiscountGroup,
    paymentType,
    setPaymentType,
    paymentTermValue,
    setPaymentTermValue,
    defaultData,
    handleRemoveInput,
    companyAddressFields,
    isActive,
    setIsActive,
    control,
    cities,
    country,
    onCountryChange,
    error,
    country2,
    onCountry2Change,
    cities2,
    isLoading,
    customerAttachment,
    customerId,
    fileInputRef,
    handleUploadButtonClick
  } = useEditCustomer();

  if (isLoading) {
    return <Loadar />;
  }

  return (
    <div className="content">
      <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-items-center tw-justify-between tw-py-[24px]">
            <div className="tw-flex tw-items-center tw-gap-[16px]">
              <Link href="/customer">
                <img src="/assets/images/back-icon.svg" alt="img" />
              </Link>
              <h1 className="admin-top-heading ">Customer Edit</h1>
              <p className="admin-top-p">Customer # {id}</p>
            </div>
            <CustomButton className="btn-primary" text="Update" type="Submit" />
          </div>
          <div className="2bars tw-flex tw-gap-[24px] xs:tw-flex-col-reverse xs:tw-flex-wrap lg:tw-flex-row lg:tw-flex-nowrap">
            <div className="main-content tw-w-full tw-pb-5">
              <div className="form-box tw-w-full ">
                <h3 className="form-box-heading ">Personal Details</h3>
                <div className="form-box-grid">
                  <CustomSelect
                    label="Gender"
                    defaultValue="Select Gender"
                    name="gender"
                    options={[
                      { label: 'Male', value: 'MALE' },
                      { label: 'Female', value: 'FEMALE' }
                    ]}
                    control={control}
                    errors={errors}
                  />
                  <CustomInput
                    label="Designation"
                    name="designation"
                    placeholder="Designation"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    label="Address"
                    name="address"
                    placeholder="Address"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <CustomSelect
                    label="Country"
                    name="country"
                    defaultValue="Select Country"
                    type="select"
                    value={country}
                    options={COUNTRIES}
                    onChange={onCountryChange}
                    control={control}
                    errors={error}
                  />
                  <CustomSelect
                    label="City"
                    name="city"
                    defaultValue="Select City"
                    type="select"
                    control={control}
                    options={cities}
                    errors={errors}
                  />
                  <CustomInput
                    label="Postal Code"
                    name="postalCode"
                    placeholder="Postal Code"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <div>
                    <PriceGroup
                      options={allPriceGroup}
                      setOptions={setAllPriceGroup}
                      selectedOptions={selectedPriceGroup}
                      setSelectedOptions={setSelectedPriceGroup}
                    />
                  </div>
                  <div>
                    <DiscountGroup
                      options={allDiscountGroup}
                      setOptions={setAllDiscountGroup}
                      selectedOptions={selectedDiscountGroup}
                      setSelectedOptions={setSelectedDiscountGroup}
                    />
                  </div>
                </div>
              </div>
              <div className="form-box  tw-mt-[16px] tw-w-full">
                <h3 className="form-box-heading ">Company Details</h3>

                <div className="form-box-grid">
                  <CustomInput
                    label="Company Name"
                    placeholder="Company Name"
                    type="text"
                    name="companyName"
                    register={register}
                    errors={errors}
                  />

                  <CustomInput
                    label="Company Email Address"
                    name="companyEmail"
                    placeholder="Email Address"
                    type="email"
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    label="Company Phone Number"
                    name="companyPhone"
                    placeholder="Phone Number"
                    type="number"
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    label="Company Mobile Number"
                    name="companyMobile"
                    placeholder="Mobile Number"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <CustomSelect
                    label="Company Size"
                    name="companySize"
                    defaultValue="Select Company Size"
                    type="select"
                    options={[
                      { id: '10-30', value: '10-30', label: '10-30' },
                      { id: '40-100', value: '40-100', label: '40-100' },
                      { id: 'above 100', value: 'above 100', label: 'above 100' }
                    ]}
                    control={control}
                    errors={errors}
                  />
                  <CustomInput
                    label="Company FAX Number"
                    name="companyFax"
                    placeholder="FAX Number"
                    type="text"
                    register={register}
                    errors={errors}
                  />

                  <CustomInput
                    label="TIN"
                    name="tin"
                    placeholder="TAX Number"
                    type="text"
                    register={register}
                    errors={errors}
                  />

                  <CustomInput
                    label="VAT Number"
                    name="vat"
                    placeholder="VAT Number"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div>
                  <CustomInput
                    label="Company URL"
                    name="companyUrl"
                    placeholder="URL"
                    type="text"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(175px,1fr))] tw-gap-[15px] tw-py-[16px]">
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                      Current Status
                    </label>
                    <CustomSwitch
                      label="Enable"
                      name="isStatus"
                      type="switch"
                      className="tw-flex-col-reverse"
                      register={register}
                      errors={errors}
                      defaultChecked={defaultData.isStatus}
                    />
                  </div>
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                      VAT exempt
                    </label>
                    <CustomSwitch
                      label="Enable"
                      name="isPDF"
                      type="switch"
                      register={register}
                      errors={errors}
                      defaultChecked={defaultData.isPDF}
                    />
                  </div>
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                      Do not show customer on PDF
                    </label>
                    <CustomSwitch
                      label="Enable"
                      name="vatStatus"
                      type="switch"
                      register={register}
                      errors={errors}
                      defaultChecked={defaultData.vatStatus}
                    />
                  </div>
                </div>
                <div className="tw-mt-[24px] tw-flex  tw-items-center tw-justify-between">
                  <div className="tw-flex tw-items-center tw-gap-[16px]">
                    <h3 className="form-box-heading">Company Addresses</h3>
                    {isAdress ? (
                      <img
                        src="/assets/images/close_add.svg"
                        alt="img"
                        onClick={adressHandles}
                      />
                    ) : (
                      <img
                        src="/assets/images/plus_btn.svg"
                        alt="img"
                        onClick={adressHandles}
                      />
                    )}
                  </div>
                  <span className="inner-link" onClick={handleAddInput}>
                    Add more address
                  </span>
                </div>
                {companyAddressFields.map((value, index) => (
                  <div className="">
                    <div className="form-box-grid " key={value}>
                      <input
                        name={`companyAddresses.${index}.id`}
                        type="number"
                        className="tw-hidden"
                        register={register}
                      />
                      <CustomInput
                        placeholder="Enter label name"
                        type="text"
                        errors={errors}
                        name={`companyAddresses.${index}.addressLabel`}
                        register={register}
                        // onChange={(e) => handleInputChange(index, e.target.value)}
                      />
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <div className="tw-w-[330px]">
                          <CustomInput
                            placeholder="Enter company address"
                            type="text"
                            name={`companyAddresses.${index}.address`}
                            errors={errors}
                            register={register}
                          />
                        </div>
                        <div
                          className="h-50 tw-text-red-700 hover:tw-cursor-pointer"
                          onClick={handleRemoveInput.bind(null, index)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isAdress && companyAddressFields?.length === 0 && (
                  <p className="tw-text-center">No address found.</p>
                )}
                <div className="tw-flex tw-items-center tw-gap-[16px]">
                  <h3 className="form-box-heading">Additional Contact Person</h3>
                  {isAdditional ? (
                    <img
                      src="/assets/images/close_add.svg"
                      alt="img"
                      onClick={additionalhandles}
                    />
                  ) : (
                    <img
                      src="/assets/images/plus_btn.svg"
                      alt="img"
                      onClick={additionalhandles}
                    />
                  )}
                </div>
                {isAdditional ? (
                  <div className="form-box-grid">
                    <CustomSelect
                      label="Gender"
                      defaultValue="Select Gender"
                      name="ac_gender"
                      register={register}
                      options={[
                        { label: 'Male', value: 'MALE' },
                        { label: 'Female', value: 'FEMALE' }
                      ]}
                      control={control}
                      errors={errors}
                    />
                    <CustomInput
                      label="Designation"
                      name="ac_designation"
                      placeholder="Designation"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="First Name"
                      name="ac_firstName"
                      placeholder="First Name"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Last Name"
                      name="ac_lastName"
                      placeholder="Last Name"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Address"
                      name="ac_address"
                      placeholder="Address"
                      type="text"
                      register={register}
                      errors={errors}
                    />

                    <CustomSelect
                      label="Country"
                      name="ac_country"
                      defaultValue="Select Country"
                      type="select"
                      control={control}
                      value={country2}
                      onChange={onCountry2Change}
                      options={COUNTRIES}
                    />
                    <CustomSelect
                      label="City"
                      name="ac_city"
                      placeholder="Select City"
                      type="select"
                      control={control}
                      options={cities2}
                    />
                    <CustomInput
                      label="Postal Code"
                      name="ac_postalCode"
                      placeholder="Postal Code"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Email Address"
                      name="ac_email"
                      placeholder="Email Address"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Phone Number"
                      name="ac_phone"
                      placeholder="Phone Number"
                      type="number"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Mobile Number"
                      name="ac_mobile"
                      placeholder="Mobile Number"
                      type="number"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Department"
                      name="ac_department"
                      placeholder="Department"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                  </div>
                ) : null}
              </div>
              <div className="form-box tw-mt-[16px]  tw-w-full ">
                <h3 className="form-box-heading ">Payment Details (Bank details)</h3>
                <div className="tw-mt-[16px] tw-flex tw-flex-col ">
                  <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                    Payment By
                    <span className="tw-text-[red]">*</span>
                  </label>

                  <FormControl>
                    <RadioGroup
                      name="paymentDetailType"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <FormControlLabel
                        value="bankDetails"
                        control={<Radio />}
                        label="Bank Details"
                        className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
                      />
                      <FormControlLabel
                        value="creditCardDetails"
                        control={<Radio />}
                        label="Credit Card Details"
                        className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                {paymentType === 'bankDetails' && (
                  <>
                    <div className="tw-w-full">
                      <CustomInput
                        label="IBAN Number"
                        name="iban"
                        placeholder="IBAN Number"
                        type="text"
                        register={register}
                        errors={errors}
                        isRequired={true}
                      />
                    </div>
                    <div className="form-box-grid-4col">
                      <CustomInput
                        label="Account owner name"
                        name="accountOwnerName"
                        placeholder="Account owner name"
                        type="text"
                        register={register}
                        errors={errors}
                        isRequired={true}
                      />

                      <CustomInput
                        label="BIC Number"
                        name="bic"
                        placeholder="BIC Number"
                        type="text"
                        register={register}
                        errors={errors}
                        isRequired={true}
                      />
                      <CustomInput
                        label="Mandate Reference"
                        name="mendateReferance"
                        placeholder="Mandate Reference"
                        type="text"
                        register={register}
                        errors={errors}
                        isRequired={true}
                      />
                      <CustomInput
                        label="Mandate Date"
                        name="mandateGenerateDate"
                        placeholder="03/13/2023"
                        type="date"
                        register={register}
                        errors={errors}
                        isRequired={true}
                      />
                    </div>
                  </>
                )}
                {paymentType === 'creditCardDetails' && (
                  <div className="form-box-grid-4col">
                    <CustomInput
                      label="Credit Card Name"
                      name="nameOfCreditCard"
                      placeholder="Credit Card Name"
                      type="text"
                      register={register}
                      errors={errors}
                      isRequired={true}
                    />
                    <CustomInput
                      label="Credit Card Number"
                      name="creditCardNumber"
                      placeholder="Credit Card Number"
                      type="text"
                      register={register}
                      errors={errors}
                      isRequired={true}
                    />
                    <CustomInput
                      label="Expiry Date"
                      name="creditCardExpiry"
                      placeholder="03/13/2023"
                      type="date"
                      register={register}
                      errors={errors}
                      isRequired={true}
                    />
                    <CustomInput
                      label="CVV"
                      name="creditCardCVV"
                      placeholder="CVV"
                      type="text"
                      register={register}
                      errors={errors}
                      isRequired={true}
                    />
                  </div>
                )}
              </div>
              <div className="form-box tw-mt-[16px]  tw-w-full ">
                <h3 className="form-box-heading ">Discount</h3>
                <div className="form-box-grid">
                  <CustomInput
                    label="Discount Amount "
                    name="discountAmount"
                    placeholder="Discount amount"
                    type="number"
                    isRequired={true}
                    register={register}
                    errors={errors}
                  />
                  <div>
                    <CustomInput
                      label="Cash Discount"
                      name="discountDays"
                      placeholder="Cash Discount"
                      type="number"
                      isRequired={true}
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div className="form-box tw-mt-[16px]  tw-w-full ">
                <h3 className="form-box-heading ">Terms Of Payments</h3>
                <div className="tw-mt-[16px] tw-w-full">
                  <FormControl>
                    <RadioGroup
                      name="termOfPayment"
                      value={paymentTermValue}
                      register={register}
                      errors={errors}
                      onChange={(e) => setPaymentTermValue(e.target.value)}
                    >
                      <FormControlLabel
                        value="PAYMENT_TERMS_AS_DATE"
                        control={<Radio />}
                        label="Payment Terms as date"
                      />
                      {paymentTermValue === 'PAYMENT_TERMS_AS_DATE' && (
                        <div className="radio-expanded">
                          <CustomInput
                            name="PAYMENT_TERMS_AS_DATE_DATA"
                            placeholder="03/13/2023"
                            type="date"
                            isRequired={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                      <FormControlLabel
                        value="PAYMENT_TERMS_IN_DAYS"
                        control={<Radio />}
                        label="Payment terms in days"
                      />
                      {paymentTermValue === 'PAYMENT_TERMS_IN_DAYS' && (
                        <div className="radio-expanded">
                          <CustomInput
                            name="PAYMENT_TERMS_IN_DAYS_DATA"
                            placeholder="Payment terms"
                            type="days"
                            isRequired={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                      <FormControlLabel
                        value="CASH_DISCOUNT_TARGET_AS_A_DATE"
                        control={<Radio />}
                        label="Cash discount target as a date"
                      />
                      {paymentTermValue === 'CASH_DISCOUNT_TARGET_AS_A_DATE' && (
                        <div className="radio-expanded">
                          <CustomInput
                            name="CASH_DISCOUNT_TARGET_AS_A_DATE_DATA"
                            placeholder="13/03/2023"
                            type="date"
                            isRequired={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                      <FormControlLabel
                        value="DISCOUNT_AND_PERCENTAGE"
                        control={<Radio />}
                        label="Discount and %"
                      />
                      {paymentTermValue === 'DISCOUNT_AND_PERCENTAGE' && (
                        <div className="radio-expanded">
                          <CustomInput
                            name="DISCOUNT_AND_PERCENTAGE_DATA"
                            placeholder="Discount and %"
                            type="text"
                            isRequired={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                      <FormControlLabel
                        value="DISCOUNT_AMOUNT"
                        control={<Radio />}
                        label="Discount amount"
                      />
                      {paymentTermValue === 'DISCOUNT_AMOUNT' && (
                        <div className="radio-expanded">
                          <CustomInput
                            name="DISCOUNT_AMOUNT_DATA"
                            placeholder="Discount amount"
                            type="text"
                            isRequired={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                      <FormControlLabel
                        value="TOTAL_AMOUNT_MINUS_DISCOUNT"
                        control={<Radio />}
                        label="Total amount minus discount"
                      />
                      {paymentTermValue === 'TOTAL_AMOUNT_MINUS_DISCOUNT' && (
                        <div className="radio-expanded">
                          <CustomInput
                            name="TOTAL_AMOUNT_MINUS_DISCOUNT_DATA"
                            placeholder="Total amount minus discount"
                            type="text"
                            isRequired={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <h3 className="tw-mb-2 tw-mt-[16px]">Terms of delivery</h3>
                  <TextArea
                    name="termOfDelivery"
                    placeholder="Delivery Terms"
                    type="textarea"
                    isRequired={true}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="right-side tw-h-fit lg:tw-sticky lg:tw-top-4">
              <div className="form-box tw-flex tw-h-[77px] tw-max-w-[336px] tw-items-center tw-justify-between ">
                <h3 className="form-box-heading ">Status</h3>
                <span
                  className={`${
                    isActive ? 'status-active' : 'status-error'
                  } hover:tw-cursor-pointer`}
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? 'Active' : 'In-active'}
                </span>
              </div>
              <div className="form-box  tw-mt-[16px] tw-w-[336px]  ">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h3 className="form-box-heading ">Uploaded files</h3>
                </div>
                <div className=" tw-mt-[16px] tw-flex tw-flex-col tw-gap-[12px] ">
                  {customerAttachment.isLoading ? (
                    <CircularILoader />
                  ) : (
                    customerAttachment &&
                    customerAttachment.data &&
                    customerAttachment.data.attachments &&
                    customerAttachment.data.attachments?.map(({ file }) => {
                      return (
                        <div
                          className="tw-mt-2 tw-flex tw-items-center tw-gap-4 hover:tw-cursor-pointer"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <div className="tw-inline-flex tw-flex-col tw-items-start tw-gap-3">
                            <div className="tw-flex tw-items-center tw-gap-1 tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-p-1">
                              {file && file.name && (
                                <div>
                                  <img
                                    className="tw-h-8 tw-w-8"
                                    src={
                                      file.name.split('.').pop() === 'pdf'
                                        ? '/assets/icons/pdf-formate.svg'
                                        : file.name.split('.').pop() === 'jpg'
                                        ? '/assets/icons/jpg-formate.svg'
                                        : file.name.split('.').pop() === 'jpeg'
                                        ? '/assets/icons/jpeg-formate.svg'
                                        : '/assets/icons/png-formate.svg'
                                    }
                                    alt="file"
                                  />
                                </div>
                              )}
                              <div className="tw-flex tw-flex-col tw-gap-1">
                                <div className="tw-max-w-[250px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-not-italic tw-leading-4">
                                  {file && file.name}
                                </div>
                                <div className="tw-text-xs tw-font-normal tw-uppercase tw-not-italic tw-leading-[15px]">
                                  {file && file.name.split('.').pop()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <div className="form-box tw-mt-[16px] tw-flex  tw-w-[336px] tw-flex-col tw-gap-[16px]  ">
                <h3 className="form-box-heading ">Comments</h3>
                <TextArea placeholder="Enter comment" name="comment" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
