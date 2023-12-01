'use client';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';
import MultiSelect from '@/common/components/multi-select/multi-select.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import TextArea from '@/common/components/text-area/text-area.component';
import CustomRadio from '@/common/components/custom-radio/custom-radio.component';
import useCustomerDetails from './use-customer-details.hook';
import formatDate from '@/common/utils/formate-date';
import Loadar from '@/common/components/loadar/loadar.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';
import ArrowDownBorderIcon from '@/common/icons/arrow-down-border.icon';
import useFormPaymentDetails from '../create-customer/payment-details/components/form-for-payment-details/use-form-for-payment-detail.hook';
import EuroIcon from '@/common/icons/euro.icon';

export default function CustomerDetails() {
  const {
    isAdditional,
    setIsAdditional,
    additionalhandles,
    isAdress,
    setIsAdress,
    adressHandles,
    register,
    handleSubmit,
    id,
    onSubmit,
    companyAddresses,
    allPriceGroup,
    selectedPriceGroup,
    allDiscountGroup,
    selectedDiscountGroup,
    defaultData,
    comments,
    isLoading,
    errors,
    dataset,
    control,
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
    setAdditionalCity,
    country,
    COUNTRIES,
    onCountryChange,
    cities,

    // payment methods

    setCreditCard,
    creditCard,
    setIsSubmit,
    router,
    data,
    paymentType,
    setPaymentType
  } = useCustomerDetails();
  const { bankDetail, setBankDetail, cardDetail, setCardDetail } =
    useFormPaymentDetails();

  if (isLoading) {
    return <Loadar />;
  }
  console.log(defaultData?.additionalContact);
  return (
    <div className="content">
      <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-items-center tw-justify-between tw-py-[24px]">
            <div className="tw-flex tw-items-center tw-gap-[16px]">
              <Link href="/customer">
                <img src="/assets/images/back-icon.svg" alt="img" />
              </Link>
              <h1 className="admin-top-heading ">Customer Details</h1>
              <p className="admin-top-p">Customer # {id}</p>
            </div>
            <CustomButton
              className="btn-primary"
              text="Edit"
              href={`/customer/edit?id=${id}`}
            />
          </div>
          <div className="2bars tw-flex tw-gap-[24px] xs:tw-flex-col-reverse xs:tw-flex-wrap lg:tw-flex-row lg:tw-flex-nowrap">
            <div className="main-content tw-w-full tw-pb-5">
              <div className="form-box tw-w-full">
                <h3 className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                  Details
                </h3>
                <h4 className="form-inner-heading tw-mt-4">Company</h4>
                <div className="form-box-grid">
                  <CustomInput
                    label="Company Name"
                    placeholder="Company Name"
                    type="text"
                    isRequired={true}
                    register={register}
                    name="companyName"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="TIN"
                    register={register}
                    name="tin"
                    placeholder="12345678901"
                    type="text"
                    errors={errors}
                    className="tw-normal-case"
                    disabled={true}
                  />
                  <CustomInput
                    label="VAT Number"
                    register={register}
                    name="vat"
                    placeholder="DE398517849"
                    type="text"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Company Size"
                    control={control}
                    name="companySize"
                    defaultValue="Select Company Size"
                    register={register}
                    disabled={true}
                  />
                </div>
                <h3 className="form-inner-heading tw-mt-2">Contact Person</h3>
                <div className="form-box-grid-4col">
                  <CustomInput
                    label="Gender"
                    placeholder="Select Gender"
                    name="gender"
                    isRequired={false}
                    register={register}
                    control={control}
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Designation"
                    name="designation"
                    register={register}
                    placeholder="Designation"
                    type="text"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="First Name"
                    name="firstName"
                    register={register}
                    placeholder="First Name"
                    type="text"
                    isRequired={true}
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Last Name"
                    name="lastName"
                    register={register}
                    placeholder="Last Name"
                    type="text"
                    isRequired={true}
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Phone Number"
                    register={register}
                    name="companyPhone"
                    placeholder="Phone Number"
                    type="number"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label=" FAX Number"
                    register={register}
                    name="companyFax"
                    placeholder="FAX Number"
                    type="number"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label=" Mobile Number"
                    register={register}
                    name="companyMobile"
                    placeholder="Mobile Number"
                    type="number"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Email Address"
                    register={register}
                    name="companyEmail"
                    placeholder="Email Address"
                    type="text"
                    errors={errors}
                    disabled={true}
                  />
                </div>

                {defaultData?.additionalContact?.length > 0 ? (
                  <>
                    <div className="tw-mt-6 tw-flex tw-h-[42px] tw-w-full  tw-items-center tw-justify-between tw-gap-2.5 tw-rounded-md tw-bg-[#1d4ed80d] tw-px-4 tw-py-2">
                      <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                        Additional Contact Person
                      </h3>
                      <div className="hover:tw-cursor-pointer">
                        {contactBarShow ? (
                          <div onClick={() => setContactBarShow(false)}>
                            <img src="/assets/images/arow-up.svg" alt="arrow up" />
                          </div>
                        ) : (
                          <div onClick={() => setContactBarShow(true)}>
                            <ArrowDownBorderIcon />
                          </div>
                        )}
                      </div>
                    </div>

                    {contactBarShow && defaultData?.additionalContact?.length > 0 && (
                      <div className="tw-mt-4">
                        <CustomDataTabe
                          initialColumns={initialColumns}
                          initialTableData={defaultData?.additionalContact}
                          paginationShow={false}
                          tableHeaderShow={false}
                          checkBoxShow={false}
                        />
                      </div>
                    )}
                  </>
                ) : null}
                <h3 className="form-inner-heading tw-mt-6">Addresses</h3>
                <div className="form-box-grid-4col">
                  <CustomInput
                    label="Address"
                    name="address"
                    // defaultValue={data.address}
                    register={register}
                    placeholder="Address"
                    type="text"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Street No "
                    name="streetNo"
                    // defaultValue={data.streetNo}
                    register={register}
                    placeholder="Street No "
                    type="text"
                    errors={errors}
                    disabled={true}
                  />
                  <CustomInput
                    label="Address Supplement "
                    name="addressSupplement"
                    // defaultValue={data.addressSupplement}
                    register={register}
                    placeholder="Address Supplement "
                    type="text"
                    errors={errors}
                    disabled={true}
                  />

                  <CustomInput
                    label="Country"
                    control={control}
                    name="country"
                    placeholder="Select Country"
                    register={register}
                    // errors={error}
                    disabled={true}
                  />

                  <CustomInput
                    label="City"
                    name="city"
                    placeholder="Select City"
                    control={control}
                    errors={errors}
                    register={register}
                    disabled={true}
                  />
                  <CustomInput
                    label="Postal Code"
                    name="postalCode"
                    // defaultValue={data?.postalCode}
                    register={register}
                    placeholder="Postal Code"
                    type="number"
                    errors={errors}
                    disabled={true}
                  />
                </div>

                {defaultData?.companyAddress?.length ? (
                  <>
                    <div className="tw-mt-6 tw-flex tw-h-[42px] tw-w-full  tw-items-center tw-justify-between tw-gap-2.5 tw-rounded-md tw-bg-[#1d4ed80d] tw-px-4 tw-py-2">
                      <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                        Additional Address
                      </h3>
                      <div className="hover:tw-cursor-pointer">
                        {addressBarShow ? (
                          <div onClick={() => setAddressBarShow(false)}>
                            <img src="/assets/images/arow-up.svg" alt="arrow up" />
                          </div>
                        ) : (
                          <div onClick={() => setAddressBarShow(true)}>
                            <ArrowDownBorderIcon />
                          </div>
                        )}
                      </div>
                    </div>

                    {addressBarShow && defaultData?.companyAddress?.length ? (
                      <div className="tw-mt-4">
                        <CustomDataTabe
                          initialColumns={initialColumnsAddress}
                          initialTableData={defaultData?.companyAddress}
                          paginationShow={false}
                          tableHeaderShow={false}
                          checkBoxShow={false}
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
              <div className="form-box  tw-mt-[16px]">
                <h3 className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                  Payment Details
                </h3>

                <div className="">
                  <div>
                    <div className="tw-mt-6 tw-flex tw-h-[42px] tw-w-full  tw-items-center tw-justify-between tw-gap-2.5 tw-rounded-md tw-bg-[#1d4ed80d] tw-px-4 tw-py-2">
                      <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                        Bank Details
                      </h3>
                      <div
                        className="hover:tw-cursor-pointer"
                        onClick={() => setBankDetail(!bankDetail)}
                      >
                        {bankDetail ? (
                          <img src="/assets/images/arow-up.svg" />
                        ) : (
                          <ArrowDownBorderIcon />
                        )}
                      </div>
                    </div>
                    {bankDetail && (
                      <>
                        <div className="tw-mt-[16px] tw-w-full">
                          <CustomInput
                            label="IBAN Number"
                            name="iban"
                            placeholder="IBAN Number"
                            type="text"
                            register={register}
                            errors={errors}
                            isRequired={true}
                            disabled={true}
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
                            disabled={true}
                          />

                          <CustomInput
                            label="BIC Number"
                            name="bic"
                            placeholder="BIC Number"
                            type="number"
                            register={register}
                            errors={errors}
                            isRequired={true}
                            disabled={true}
                          />
                          <CustomInput
                            label="Mandate Reference"
                            name="mendateReferance"
                            placeholder="Mandate Reference"
                            type="text"
                            register={register}
                            errors={errors}
                            // isRequired={true}
                            disabled={true}
                          />
                          <CustomInput
                            label="Mandate Date"
                            name="mandateGenerateDate"
                            placeholder="03/13/2023"
                            type="date"
                            register={register}
                            errors={errors}
                            // isRequired={true}
                            disabled={true}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="tw-mt-6 tw-flex tw-h-[42px] tw-w-full  tw-items-center tw-justify-between tw-gap-2.5 tw-rounded-md tw-bg-[#1d4ed80d] tw-px-4 tw-py-2">
                      <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                        Credit Card Details
                      </h3>
                      <div
                        className="hover:tw-cursor-pointer"
                        onClick={() => {
                          setCardDetail(!cardDetail);
                          setPaymentType('CREDIT_CARD');
                        }}
                      >
                        {cardDetail ? (
                          <img src="/assets/images/arow-up.svg" />
                        ) : (
                          <ArrowDownBorderIcon />
                        )}
                      </div>
                    </div>
                    {cardDetail && (
                      <div className="form-box-grid-4col">
                        <CustomInput
                          label="Credit Card Name"
                          name="nameOfCreditCard"
                          placeholder="Credit Card Name"
                          type="text"
                          register={register}
                          errors={errors}
                          isRequired={true}
                          disabled={true}
                        />
                        <CustomInput
                          label="Credit Card Number"
                          name="creditCardNumber"
                          placeholder="Credit Card Number"
                          type="text"
                          register={register}
                          errors={errors}
                          isRequired={true}
                          disabled={true}
                        />
                        <CustomInput
                          label="Expiry Date"
                          name="creditCardExpiry"
                          placeholder="03/13/2023"
                          type="date"
                          register={register}
                          errors={errors}
                          isRequired={true}
                          disabled={true}
                        />
                        <CustomInput
                          label="CVV"
                          name="creditCardCVV"
                          placeholder="CVV"
                          type="text"
                          register={register}
                          errors={errors}
                          isRequired={true}
                          disabled={true}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-box tw-mt-[16px]  ">
                <h3 className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                  Discount
                </h3>
                <div className="form-box-grid">
                  <CustomInput
                    label="Discount Amount"
                    name="discountAmount"
                    placeholder="Discount amount"
                    type="text"
                    isRequired={true}
                    register={register}
                    disabled={true}
                  />
                  <div>
                    <CustomInput
                      label="Cash Discount"
                      name="discountDays"
                      placeholder="Cash Discount"
                      type="text"
                      isRequired={true}
                      register={register}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-box tw-mt-[16px]  ">
                <div className=" tw-w-full">
                  <h3 className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                    Discount
                  </h3>
                  <div className="form-box-grid">
                    <CustomInput
                      label="Discount Amount "
                      errors={errors}
                      register={register}
                      name="discountAmount"
                      placeholder="Discount amount"
                      type="text"
                      startIcon={<EuroIcon />}
                      disabled={true}
                    />

                    <CustomInput
                      label="Cash Discount"
                      errors={errors}
                      register={register}
                      name="discountDays"
                      placeholder="Cash Discount"
                      type="text"
                      disabled={true}
                    />
                    <div>
                      <label className="group-label tw-text-xs tw-font-medium tw-leading-6">
                        Price Group
                      </label>
                      <div className="tw-flex tw-flex-wrap tw-gap-1 tw-rounded-[5px] tw-border-[1px] tw-border-solid tw-border-[#BBBBBB] tw-p-2">
                        {selectedPriceGroup?.length > 0 ? (
                          selectedPriceGroup.map((item) => (
                            <p key={item.id}>
                              <span className="tw-rounded-full tw-bg-[#D9D9D9] tw-bg-opacity-20 tw-px-[11px] tw-text-[14px] tw-font-normal tw-text-[#7E7D7D]">
                                {item.label}
                              </span>
                            </p>
                          ))
                        ) : (
                          <p>
                            <span className="tw-text-[14px] tw-font-normal tw-text-[#7E7D7D]">
                              No option selected
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="group-label tw-text-xs tw-font-medium tw-leading-6">
                        Discount Group
                      </label>
                      <div className="tw-flex tw-flex-wrap tw-gap-1 tw-rounded-[5px] tw-border-[1px] tw-border-solid tw-border-[#BBBBBB] tw-p-2">
                        {selectedDiscountGroup?.length > 0 ? (
                          selectedDiscountGroup.map((item) => (
                            <p key={item.id}>
                              <span className="tw-rounded-full tw-bg-[#D9D9D9] tw-bg-opacity-20 tw-px-[11px] tw-text-[14px] tw-font-normal tw-text-[#7E7D7D]">
                                {item.label}
                              </span>
                            </p>
                          ))
                        ) : (
                          <p>
                            <span className="tw-text-[14px] tw-font-normal tw-text-[#7E7D7D]">
                              No option selected
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="tw-flex tw-flex-wrap tw-gap-10">
                    <div className="tw-flex tw-items-center">
                      <CustomSwitch
                        label="Current Status"
                        register={register}
                        name="currentStatus"
                        type="switch"
                        checked={defaultData?.isActive}
                        // onChange={(e) => setStatus(e.target.checked)}
                        isRequired={false}
                        disabled={true}
                      />
                    </div>
                    <div className="tw-flex tw-items-center">
                      <CustomSwitch
                        label="VAT exempt"
                        register={register}
                        name="vatExempt"
                        type="switch"
                        checked={defaultData?.vatStatus}
                        // onChange={(e) => setVatStatus(e.target.checked)}
                        isRequired={false}
                        disabled={true}
                      />
                    </div>
                    <div className="tw-flex tw-items-center">
                      <CustomSwitch
                        label="Do not show customer on PDF"
                        register={register}
                        name="notSHowOnPDF"
                        type="switch"
                        checked={defaultData?.isPDF}
                        // onChange={(e) => setIsPDF(e.target.checked)}
                        isRequired={false}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <h3 className="tw-mt-[16px] tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                    Terms Of Payments
                  </h3>
                  <FormControl className="tw-mt-[16px]">
                    <RadioGroup
                      name="termOfPayment"
                      value={defaultData.termOfPayment}
                      register={register}
                      disabled={true}
                    >
                      {defaultData.termOfPayment === 'PAYMENT_TERMS_AS_DATE' && (
                        <>
                          <FormControlLabel
                            value="PAYMENT_TERMS_AS_DATE"
                            control={
                              <Radio
                                checked={
                                  defaultData.termOfPayment === 'PAYMENT_TERMS_AS_DATE'
                                }
                              />
                            }
                            label="Payment Terms as date"
                          />

                          <div className="radio-expanded">
                            <CustomInput
                              name="PAYMENT_TERMS_AS_DATE_DATA"
                              placeholder="03/13/2023"
                              type="date"
                              isRequired={false}
                              register={register}
                              disabled={true}
                            />
                          </div>
                        </>
                      )}

                      {defaultData.termOfPayment === 'PAYMENT_TERMS_IN_DAYS' && (
                        <>
                          <FormControlLabel
                            value="PAYMENT_TERMS_IN_DAYS"
                            control={
                              <Radio
                                checked={
                                  defaultData.termOfPayment === 'PAYMENT_TERMS_IN_DAYS'
                                }
                              />
                            }
                            label="Payment terms in days"
                          />
                          <div className="radio-expanded">
                            <CustomInput
                              name="PAYMENT_TERMS_IN_DAYS_DATA"
                              placeholder="Payment terms"
                              type="days"
                              isRequired={false}
                              register={register}
                              disabled={true}
                            />
                          </div>
                        </>
                      )}

                      {defaultData.termOfPayment === 'CASH_DISCOUNT_TARGET_AS_A_DATE' && (
                        <>
                          <FormControlLabel
                            value="CASH_DISCOUNT_TARGET_AS_A_DATE"
                            control={
                              <Radio
                                checked={
                                  defaultData.termOfPayment ===
                                  'CASH_DISCOUNT_TARGET_AS_A_DATE'
                                }
                              />
                            }
                            label="Cash discount target as a date"
                          />
                          <div className="radio-expanded">
                            <CustomInput
                              name="CASH_DISCOUNT_TARGET_AS_A_DATE_DATA"
                              placeholder="13/03/2023"
                              type="date"
                              isRequired={false}
                              register={register}
                              disabled={true}
                            />
                          </div>
                        </>
                      )}

                      {defaultData.termOfPayment === 'DISCOUNT_AND_PERCENTAGE' && (
                        <>
                          <FormControlLabel
                            value="DISCOUNT_AND_PERCENTAGE"
                            control={
                              <Radio
                                checked={
                                  defaultData.termOfPayment === 'DISCOUNT_AND_PERCENTAGE'
                                }
                              />
                            }
                            label="Discount and %"
                          />
                          <div className="radio-expanded">
                            <CustomInput
                              name="DISCOUNT_AND_PERCENTAGE_DATA"
                              placeholder="Discount and %"
                              type="text"
                              isRequired={false}
                              register={register}
                              disabled={true}
                            />
                          </div>
                        </>
                      )}

                      {defaultData.termOfPayment === 'DISCOUNT_AMOUNT' && (
                        <>
                          <FormControlLabel
                            value="DISCOUNT_AMOUNT"
                            control={
                              <Radio
                                checked={defaultData.termOfPayment === 'DISCOUNT_AMOUNT'}
                              />
                            }
                            label="Discount amount"
                          />

                          <div className="radio-expanded">
                            <CustomInput
                              name="DISCOUNT_AMOUNT_DATA"
                              placeholder="Discount amount"
                              type="text"
                              isRequired={false}
                              register={register}
                              disabled={true}
                            />
                          </div>
                        </>
                      )}

                      {defaultData.termOfPayment === 'TOTAL_AMOUNT_MINUS_DISCOUNT' && (
                        <>
                          <FormControlLabel
                            value="TOTAL_AMOUNT_MINUS_DISCOUNT"
                            control={
                              <Radio
                                checked={
                                  defaultData.termOfPayment ===
                                  'TOTAL_AMOUNT_MINUS_DISCOUNT'
                                }
                              />
                            }
                            label="Total amount minus discount"
                          />
                          <div className="radio-expanded">
                            <CustomInput
                              name="TOTAL_AMOUNT_MINUS_DISCOUNT_DATA"
                              placeholder="Total amount minus discount"
                              type="text"
                              isRequired={false}
                              register={register}
                              disabled={true}
                            />
                          </div>
                        </>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <h3 className="tw-mb-2 tw-mt-[16px]">Terms of delivery</h3>
                  <TextArea
                    name="termOfDelivery"
                    placeholder="Delivery Terms"
                    type="textarea"
                    register={register}
                    disabled={true}
                  />
                </div>
                {/* <div className="tw-mt-[16px] tw-w-full">
                  <CustomInput
                    label="Payment terms as date"
                    name="paymentDate"
                    placeholder="03/13/2023"
                    type="date"
                    register={register}
                    disabled={true}
                  />
                  <h3 className="tw-mt-[16px]">Terms of delivery</h3>
                  <TextArea
                    name="termOfDelivery"
                    placeholder="Delivery Terms"
                    type="textarea"
                    register={register}
                    disabled={true}
                  />
                </div> */}
              </div>
            </div>
            <div className="right-side tw-h-fit lg:tw-sticky lg:tw-top-4">
              <div className="form-box tw-flex tw-h-[77px] tw-w-[336px] tw-items-center tw-justify-between ">
                <h3 className="form-box-heading ">Status</h3>
                <span
                  className={`${defaultData.isActive ? 'status-active' : 'status-error'}`}
                >
                  {defaultData.isActive ? 'Active' : 'In-active'}
                </span>
              </div>
              <div className="form-box  tw-mt-[16px]  tw-w-[336px]  ">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h3 className="form-box-heading ">Uploaded files</h3>
                </div>
                <div className=" tw-mt-[16px] tw-flex tw-flex-col tw-gap-[12px] ">
                  <div className=" tw-flex tw-flex-col tw-gap-[12px] ">
                    {defaultData?.attachments?.map(({ file }) => {
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
                                    className="tw-h-7 tw-w-7"
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
                                {/* <div className="tw-text-xs tw-font-normal tw-uppercase tw-not-italic tw-leading-[15px]">
                                {file && file.name.split('.').pop()}
                              </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="form-box tw-mt-[16px] tw-flex tw-w-[336px] tw-flex-col tw-gap-[16px]  ">
                <h3 className="form-box-heading ">Comments</h3>
                {comments && comments.length > 0 ? (
                  comments.map((item) => (
                    <div
                      key={item.id}
                      className="tw-w-[296px] tw-rounded-[6px] tw-border-[1.5px] tw-border-solid tw-border-[#E2E2E2] tw-px-4 tw-py-2"
                    >
                      <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[21px] tw-text-text-light-gray">
                        {item.comment.comment}
                      </p>
                      <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[21px] tw-text-text-light-gray">
                        <span className="tw-font-medium tw-not-italic  tw-text-text-black">
                          Created By:{' '}
                        </span>{' '}
                        {item.comment.createdByName}
                      </p>
                      <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[21px] tw-text-text-light-gray">
                        <span className="tw-font-medium tw-not-italic  tw-text-text-black">
                          {' '}
                          Create At:{' '}
                        </span>{' '}
                        {formatDate(item.comment.createdAt)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="tw-w-[296px] tw-rounded-[6px] tw-border-[1.5px] tw-border-solid tw-border-[#E2E2E2] tw-px-4 tw-py-2">
                    <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[21px] tw-text-text-light-gray">
                      No Comments Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
