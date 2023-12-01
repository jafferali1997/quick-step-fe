'use client';

import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@mui/material/node';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import MultiSelect from '@/common/components/multi-select/multi-select.component';
import Select from '@/common/components/select/select.component';
import PriceGroup from '../price-group/price-group.component';
import DiscountGroup from '../discount-group/discount-group.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import COUNTRIES from '@/common/constants/countries.constant';
import useCountryCity from '@/common/hooks/use-country-city.hook';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import useFormForPersonalDetail from './use-form-for-personal-details';
import ArrowDownBorder from '@/common/icons/arrow-down-border.icon';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';

export default function FormForPersonalDetails({
  register,
  handleSubmit,
  onSubmit,
  data = {},
  handleButtonClickedit,
  setIsSubmit,
  errors = {},
  allPriceGroup,
  setAllPriceGroup,
  selectedPriceGroup,
  setSelectedPriceGroup,
  allDiscountGroup,
  setAllDiscountGroup,
  selectedDiscountGroup,
  setSelectedDiscountGroup,
  control,
  cities,
  country,
  onCountryChange,
  error,
  // use personalDetails
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
  setUpdateContactId,
  contactBarShow,
  setContactBarShow,
  setAdditionalContact,
  handleUpdateAddress,
  updateAddressBtn,
  setupdateAddressBtn,
  addressBarShow,
  setAddressBarShow,
  onCountryChangeAdditional,
  additionalCountry,
  cities2,
  additionalCity,
  setAdditionalCity
}) {
  return (
    <form onSubmit={handleSubmit((val) => onSubmit(val))}>
      <div className="form-box-grid-4col">
        <CustomInput
          label="Company Name"
          placeholder="Company Name"
          type="text"
          isRequired={true}
          register={register}
          name="companyName"
          defaultValue={data.companyName}
          errors={errors}
        />
        <CustomInput
          label="TIN"
          register={register}
          name="tin"
          placeholder="12345678901"
          type="text"
          errors={errors}
          className="tw-normal-case"
        />
        <CustomInput
          label="VAT Number"
          register={register}
          name="vat"
          placeholder="DE398517849"
          type="text"
          errors={errors}
        />
        <CustomSelect
          label="Company Size"
          control={control}
          name="companySize"
          defaultValue="Select Company Size"
          type="select"
          options={[
            { id: '10-30', value: '10-30', label: '10-30' },
            { id: '40-100', value: '40-100', label: '40-100' },
            { id: 'above 100', value: 'above 100', label: 'above 100' }
          ]}
          errors={errors}
        />
        {/* <div className="tw-mt-5 tw-flex tw-items-center">
          <CustomSwitch
            label="Do not show customer on PDF"
            register={register}
            name="isStatus"
            type="switch"
            // checked={status}
            // onChange={(e) => setStatus(e.target.checked)}
            isRequired={false}
          />
        </div> */}
      </div>
      <h3 className="form-inner-heading tw-mt-2">Contact Person</h3>
      <div className="form-box-grid-4col">
        <CustomSelect
          label="Gender"
          placeholder="Select Gender"
          name="gender"
          isRequired={false}
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
          defaultValue={data.designation}
          register={register}
          placeholder="Designation"
          type="text"
          errors={errors}
        />
        <CustomInput
          label="First Name"
          name="firstName"
          defaultValue={data.firstName}
          register={register}
          placeholder="First Name"
          type="text"
          isRequired={true}
          errors={errors}
        />
        <CustomInput
          label="Last Name"
          name="lastName"
          defaultValue={data.lastName}
          register={register}
          placeholder="Last Name"
          type="text"
          isRequired={true}
          errors={errors}
        />
        <CustomInput
          label="Phone Number"
          register={register}
          name="companyPhone"
          placeholder="Phone Number"
          type="number"
          errors={errors}
        />
        <CustomInput
          label=" FAX Number"
          register={register}
          name="companyFax"
          placeholder="FAX Number"
          type="number"
          errors={errors}
        />
        <CustomInput
          label=" Mobile Number"
          register={register}
          name="companyMobile"
          placeholder="Mobile Number"
          type="number"
          errors={errors}
        />
        <CustomInput
          label="Email Address"
          register={register}
          name="companyEmail"
          placeholder="Email Address"
          type="text"
          errors={errors}
        />
      </div>

      <div className="tw-flex tw-items-center tw-justify-between">
        <CustomButton
          className=" bnt btn-secondary-outline tw-w-[188px]"
          text="Add more person"
          onClick={() => {
            setAddMorePersons(true);
            setContactBarShow(true);
            setAdditionalContact({});
          }}
        />
      </div>
      {contactsData?.length || addMorePersons ? (
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
                  <ArrowDownBorder />
                </div>
              )}
            </div>
          </div>
          {contactBarShow && addMorePersons && (
            <div className="form-box-grid-4col">
              <CustomSelect
                label="Gender"
                defaultValue="Select Gender"
                name="additionalGender"
                value={additionalContact.additionalGender || ''}
                onChange={handleInputChange}
                isRequired={false}
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' }
                ]}
                control={control}
                errors={errors}
              />
              <CustomInput
                label="Designation"
                name="additionalDesignation"
                value={additionalContact.additionalDesignation || ''}
                onChange={handleInputChange}
                register={register}
                placeholder="Designation"
                type="text"
                errors={errors}
              />
              <CustomInput
                label="First Name"
                name="additionalFirstName"
                value={additionalContact?.additionalFirstName}
                onChange={handleInputChange}
                register={register}
                placeholder="First Name"
                type="text"
                errors={errors}
              />
              <CustomInput
                label="Last Name"
                name="additionalLastName"
                value={additionalContact?.additionalLastName}
                onChange={handleInputChange}
                register={register}
                placeholder="Last Name"
                type="text"
                errors={errors}
              />
              <CustomInput
                label="Phone Number"
                register={register}
                name="additionalPhone"
                value={additionalContact.additionalPhone || ''}
                onChange={handleInputChange}
                placeholder="Phone Number"
                type="number"
                errors={errors}
              />
              <CustomInput
                label=" FAX Number"
                register={register}
                name="additionalFax"
                value={additionalContact.additionalFax || ''}
                onChange={handleInputChange}
                placeholder="FAX Number"
                type="number"
                errors={errors}
              />
              <CustomInput
                label=" Mobile Number"
                register={register}
                name="additionalMobile"
                value={additionalContact.additionalMobile || ''}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                type="number"
                errors={errors}
              />
              <CustomInput
                label="Email Address"
                register={register}
                name="additionalEmail"
                value={additionalContact.additionalEmail || ''}
                onChange={handleInputChange}
                placeholder="Email Address"
                type="text"
                errors={errors}
              />
              <CustomInput
                label="Department"
                register={register}
                name="additionalDepartment"
                value={additionalContact.additionalDepartment || ''}
                onChange={handleInputChange}
                placeholder="Department"
                type="text"
                errors={errors}
              />
              <div className="tw-flex tw-flex-col  tw-justify-end">
                {updateContactBtn ? (
                  <div className="tw-flex tw-gap-2">
                    <CustomButton
                      className="btn-cancel !tw-min-w-[50px]"
                      onClick={() => {
                        setAddMorePersons(false);
                        setupdateContactBtn(false);
                      }}
                      text="close"
                    />
                    <CustomButton
                      className=" bnt btn-secondary"
                      text="Update "
                      // disabled={disableAddContact}
                      onClick={() => {
                        handleUpdateContact(additionalContact.id);
                        // handleUpdateAddress(additionalContact.id);
                      }}
                    />
                  </div>
                ) : (
                  <div className="tw-flex tw-gap-2">
                    <CustomButton
                      className="btn-cancel !tw-min-w-[50px]"
                      onClick={() => setAddMorePersons(false)}
                      text="close"
                    />
                    <CustomButton
                      className=" bnt btn-secondary"
                      text="Add "
                      disabled={disableAddContact}
                      onClick={() => {
                        setAddMorePersons(false);
                        handleContactsDataClick();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {contactBarShow && contactsData?.length > 0 && (
            <div className="tw-mt-4">
              <CustomDataTabe
                initialColumns={initialColumns}
                initialTableData={contactsData}
                paginationShow={false}
                tableHeaderShow={false}
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
          defaultValue={data.address}
          register={register}
          placeholder="Address"
          type="text"
          errors={errors}
        />
        <CustomInput
          label="Street No "
          name="streetNo"
          defaultValue={data.streetNo}
          register={register}
          placeholder="Street No "
          type="text"
          errors={errors}
        />
        <CustomInput
          label="Address Supplement "
          name="addressSupplement"
          defaultValue={data.addressSupplement}
          register={register}
          placeholder="Address Supplement "
          type="text"
          errors={errors}
        />

        <CustomSelect
          label="Country"
          value={country}
          options={COUNTRIES}
          onChange={onCountryChange}
          control={control}
          name="country"
          placeholder="Select Country"
          errors={error}
        />

        <CustomSelect
          label="City"
          name="city"
          type="select"
          placeholder="Select City"
          options={cities}
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Postal Code"
          name="postalCode"
          defaultValue={data.postalCode}
          register={register}
          placeholder="Postal Code"
          type="number"
          errors={errors}
        />
      </div>

      <div className="tw-flex tw-items-center tw-justify-between">
        <CustomButton
          className=" bnt btn-secondary-outline tw-w-[188px]"
          text="Add more address"
          onClick={() => {
            setAddMoreAddress(true);
            setAddressBarShow(true);
            // setAdditionalAddress({
            //   additionalAddress: '',
            //   additionalStreetNo: '',
            //   additionalAddressSupplement: '',
            //   additionalCity: ''
            // });
            setupdateAddressBtn(false);
          }}
        />
      </div>
      {addMoreAddress || addressData?.length ? (
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
                  <ArrowDownBorder />
                </div>
              )}
            </div>
          </div>
          {addressBarShow && addMoreAddress && (
            <div className="form-box-grid-4col">
              <CustomInput
                label="Address"
                name="additionalAddress"
                onChange={handleInputChangeAddress}
                value={additionalAddress.additionalAddress || ''}
                // defaultValue={data.address}
                register={register}
                placeholder="Address"
                type="text"
                errors={errors}
              />
              <CustomInput
                label="Street No "
                name="additionalStreetNo"
                onChange={handleInputChangeAddress}
                value={additionalAddress.additionalStreetNo || ''}
                // defaultValue={data.streetNo}
                register={register}
                placeholder="Street No "
                type="text"
                errors={errors}
              />
              <CustomInput
                label="Address Supplement"
                name="additionalAddressSupplement"
                onChange={handleInputChangeAddress}
                value={additionalAddress.additionalAddressSupplement || ''}
                // defaultValue={data.streetNo}
                register={register}
                placeholder="Address Supplement"
                type="text"
                errors={errors}
              />

              <CustomSelect
                label="Country"
                value={additionalCountry || ''}
                type="select"
                options={COUNTRIES}
                onChange={onCountryChangeAdditional}
                // control={control}
                name="additionalCountry"
                errors={error}
                // register={register}
                defaultValue="Select Country"
              />
              <CustomSelect
                label="City"
                name="additionalCity"
                value={additionalCity}
                defaultValue={additionalCity ?? 'Select City'}
                onChange={(e) => setAdditionalCity(e.target.value)}
                control={control}
                type="select"
                options={cities2}
                errors={errors}
              />

              <CustomInput
                label="Postal Code"
                name="additionalPostalCode"
                onChange={handleInputChangeAddress}
                value={additionalAddress.additionalPostalCode || ''}
                // defaultValue={data.postalCode}
                register={register}
                placeholder="Postal Code"
                type="number"
                errors={errors}
              />
              {updateAddressBtn ? (
                <div className="tw-flex tw-gap-2">
                  <CustomButton
                    className="btn-cancel !tw-min-w-[50px]"
                    onClick={() => {
                      setAddMoreAddress(false);
                      setupdateAddressBtn(false);
                      setAdditionalAddress({});
                    }}
                    text="close"
                  />
                  <CustomButton
                    className=" bnt btn-secondary"
                    text="Update "
                    // disabled={disableAddContact}
                    onClick={() => {
                      handleUpdateAddress(additionalAddress.id);
                    }}
                  />
                </div>
              ) : (
                <div className="tw-flex tw-gap-2">
                  <CustomButton
                    className="btn-cancel !tw-min-w-[50px]"
                    onClick={() => setAddMoreAddress(false)}
                    text="close"
                  />
                  <CustomButton
                    className=" bnt btn-secondary"
                    text="Add "
                    disabled={disableAddAddress}
                    onClick={() => {
                      setAddMoreAddress(false);
                      handleAddressDataClick();
                      setupdateAddressBtn(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}
          {addressBarShow && addressData?.length ? (
            <div className="tw-mt-4">
              <CustomDataTabe
                initialColumns={initialColumnsAddress}
                initialTableData={addressData}
                paginationShow={false}
                tableHeaderShow={false}
              />
            </div>
          ) : null}
        </>
      ) : null}

      <StepperFooter setIsSubmit={setIsSubmit} handleTabClick={() => 'payment_details'} />
      {/* contact Dialog */}
      <Dialog className="scrol-bar" open={openPopup}>
        <div className="tw-max-h-full tw-w-[471px] tw-max-w-full ">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between  tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
            <div className="hover:tw-cursor-pointer" onClick={() => setOpenPopup(false)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.46582 8.01169L15.696 1.78141C16.1014 1.37615 16.1014 0.720878 15.696 0.315665C15.2907 -0.0895966 14.6355 -0.0895966 14.2303 0.315665L7.99993 6.5459L1.76984 0.315665C1.36438 -0.0895966 0.709353 -0.0895966 0.304092 0.315665C-0.101364 0.720926 -0.101364 1.37615 0.304092 1.78141L6.53413 8.01169L0.30414 14.2419C-0.101315 14.6472 -0.101315 15.3025 0.30414 15.7077C0.40027 15.8041 0.514502 15.8805 0.640272 15.9327C0.766042 15.9848 0.900871 16.0115 1.03701 16.0114C1.30233 16.0114 1.56774 15.9098 1.76988 15.7077L7.99993 9.47744L14.2303 15.7077C14.3264 15.8041 14.4406 15.8805 14.5664 15.9326C14.6922 15.9847 14.827 16.0115 14.9631 16.0114C15.2284 16.0114 15.4939 15.9098 15.696 15.7077C16.1014 15.3024 16.1014 14.6472 15.696 14.2419L9.46582 8.01169Z"
                  fill="#7E7D7D"
                />
              </svg>
            </div>
          </div>
          <DialogContent>
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
              <div>
                <svg
                  width="73"
                  height="72"
                  viewBox="0 0 73 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4674_101549)">
                    <path
                      d="M36.5 -0.000244141C16.6028 -0.000244141 0.5 16.1008 0.5 35.9998C0.5 55.8966 16.601 71.9998 36.5 71.9998C56.3972 71.9998 72.5 55.8988 72.5 35.9998C72.5 16.1026 56.399 -0.000244141 36.5 -0.000244141ZM35.4348 52.8493C33.3971 52.8493 31.8334 51.1434 31.8334 49.2004C31.8334 47.2101 33.4445 45.5517 35.4348 45.5517C37.4252 45.5517 39.0834 47.2102 39.0834 49.2005C39.0834 51.1432 37.4723 52.8493 35.4348 52.8493ZM40.8367 34.4158C38.2305 36.4534 38.183 37.875 38.183 40.339C38.183 41.2396 37.7091 42.282 35.3872 42.282C33.4442 42.282 32.781 41.5712 32.781 39.1071C32.781 35.0318 34.5817 33.089 35.9559 31.9043C37.5197 30.5774 40.1734 29.1086 40.1734 26.5498C40.1734 24.3698 38.2779 23.3273 35.9085 23.3273C31.0751 23.3273 32.1177 26.9763 29.5586 26.9763C28.2792 26.9763 26.7155 26.1231 26.7155 24.2751C26.7155 21.7163 29.6534 17.9252 36.0507 17.9252C42.1161 17.9252 46.1441 21.2898 46.1441 25.7441C46.1441 30.1984 42.1161 33.4207 40.8367 34.4158Z"
                      fill="#EF2020"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4674_101549">
                      <rect
                        width="72"
                        height="72"
                        fill="white"
                        transform="translate(0.5 -0.000244141)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="tw-text-center tw-text-xl tw-font-bold tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                Are you really want to delete this Contact Person?
              </div>
              <div className="tw-mt-[14px] tw-flex tw-gap-5">
                <CustomButton
                  className="btn-cancel"
                  text="Cancel"
                  onClick={() => setOpenPopup(false)}
                />
                <CustomButton
                  className="btn-primary"
                  text="Confirm"
                  onClick={() => {
                    setOpenPopup(false);
                    deleteContactList(contactId);
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {/* address Dialog */}

      <Dialog className="scrol-bar" open={openPopupAddress}>
        <div className="tw-max-h-full tw-w-[471px] tw-max-w-full ">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between  tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setOpenPopupAddress(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.46582 8.01169L15.696 1.78141C16.1014 1.37615 16.1014 0.720878 15.696 0.315665C15.2907 -0.0895966 14.6355 -0.0895966 14.2303 0.315665L7.99993 6.5459L1.76984 0.315665C1.36438 -0.0895966 0.709353 -0.0895966 0.304092 0.315665C-0.101364 0.720926 -0.101364 1.37615 0.304092 1.78141L6.53413 8.01169L0.30414 14.2419C-0.101315 14.6472 -0.101315 15.3025 0.30414 15.7077C0.40027 15.8041 0.514502 15.8805 0.640272 15.9327C0.766042 15.9848 0.900871 16.0115 1.03701 16.0114C1.30233 16.0114 1.56774 15.9098 1.76988 15.7077L7.99993 9.47744L14.2303 15.7077C14.3264 15.8041 14.4406 15.8805 14.5664 15.9326C14.6922 15.9847 14.827 16.0115 14.9631 16.0114C15.2284 16.0114 15.4939 15.9098 15.696 15.7077C16.1014 15.3024 16.1014 14.6472 15.696 14.2419L9.46582 8.01169Z"
                  fill="#7E7D7D"
                />
              </svg>
            </div>
          </div>
          <DialogContent>
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
              <div>
                <svg
                  width="73"
                  height="72"
                  viewBox="0 0 73 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4674_101549)">
                    <path
                      d="M36.5 -0.000244141C16.6028 -0.000244141 0.5 16.1008 0.5 35.9998C0.5 55.8966 16.601 71.9998 36.5 71.9998C56.3972 71.9998 72.5 55.8988 72.5 35.9998C72.5 16.1026 56.399 -0.000244141 36.5 -0.000244141ZM35.4348 52.8493C33.3971 52.8493 31.8334 51.1434 31.8334 49.2004C31.8334 47.2101 33.4445 45.5517 35.4348 45.5517C37.4252 45.5517 39.0834 47.2102 39.0834 49.2005C39.0834 51.1432 37.4723 52.8493 35.4348 52.8493ZM40.8367 34.4158C38.2305 36.4534 38.183 37.875 38.183 40.339C38.183 41.2396 37.7091 42.282 35.3872 42.282C33.4442 42.282 32.781 41.5712 32.781 39.1071C32.781 35.0318 34.5817 33.089 35.9559 31.9043C37.5197 30.5774 40.1734 29.1086 40.1734 26.5498C40.1734 24.3698 38.2779 23.3273 35.9085 23.3273C31.0751 23.3273 32.1177 26.9763 29.5586 26.9763C28.2792 26.9763 26.7155 26.1231 26.7155 24.2751C26.7155 21.7163 29.6534 17.9252 36.0507 17.9252C42.1161 17.9252 46.1441 21.2898 46.1441 25.7441C46.1441 30.1984 42.1161 33.4207 40.8367 34.4158Z"
                      fill="#EF2020"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4674_101549">
                      <rect
                        width="72"
                        height="72"
                        fill="white"
                        transform="translate(0.5 -0.000244141)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="tw-text-center tw-text-xl tw-font-bold tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                Are you really want to delete this Address?
              </div>
              <div className="tw-mt-[14px] tw-flex tw-gap-5">
                <CustomButton
                  className="btn-cancel"
                  text="Cancel"
                  onClick={() => setOpenPopupAddress(false)}
                />
                <CustomButton
                  className="btn-primary"
                  text="Confirm"
                  onClick={() => {
                    setOpenPopupAddress(false);
                    deleteAddressList(addressId);
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </form>
  );
}

const groupShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
});

FormForPersonalDetails.propTypes = {
  addMorePersons: PropTypes.bool,
  setAddMorePersons: PropTypes.func,
  handleInputChange: PropTypes.func,
  onCountryChangeAdditional: PropTypes.func,
  additionalContact: PropTypes.objectOf(PropTypes.shape()),
  handleContactsDataClick: PropTypes.func,
  contactsData: PropTypes.arrayOf(PropTypes.shape()),
  initialColumns: PropTypes.arrayOf(PropTypes.shape()),
  handleInputChangeAddress: PropTypes.func,
  additionalAddress: PropTypes.objectOf(PropTypes.shape()),
  setAdditionalAddress: PropTypes.func,
  addMoreAddress: PropTypes.bool,
  setAddMoreAddress: PropTypes.func,
  addressData: PropTypes.arrayOf(PropTypes.shape()),
  setAddressData: PropTypes.func,
  handleAddressDataClick: PropTypes.func,
  initialColumnsAddress: PropTypes.arrayOf(PropTypes.shape()),
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
  handleUpdateContact: PropTypes.func,
  setAdditionalContact: PropTypes.func,
  setUpdateContactId: PropTypes.func,
  deleteContactList: PropTypes.func,
  contactId: PropTypes.number,
  disableAddContact: PropTypes.bool,
  openPopupAddress: PropTypes.bool,
  setOpenPopupAddress: PropTypes.func,
  addressBarShow: PropTypes.bool,
  setAddressBarShow: PropTypes.func,
  deleteAddressList: PropTypes.func,
  handleUpdateAddress: PropTypes.func,
  addressId: PropTypes.number,
  setAddressId: PropTypes.func,
  disableAddAddress: PropTypes.bool,
  setDisableAddAddress: PropTypes.func,
  updateAddressBtn: PropTypes.bool,
  setupdateAddressBtn: PropTypes.func,
  additionalContactEdit: PropTypes.objectOf(PropTypes.shape()),
  setAdditionalContactEdit: PropTypes.func,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  allPriceGroup: PropTypes.arrayOf(groupShape).isRequired,
  setAllPriceGroup: PropTypes.func.isRequired,
  selectedPriceGroup: PropTypes.arrayOf(groupShape).isRequired,
  setSelectedPriceGroup: PropTypes.func.isRequired,
  allDiscountGroup: PropTypes.arrayOf(groupShape).isRequired,
  setAllDiscountGroup: PropTypes.func.isRequired,
  selectedDiscountGroup: PropTypes.arrayOf(groupShape).isRequired,
  setSelectedDiscountGroup: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  updateContactBtn: PropTypes.bool,
  setupdateContactBtn: PropTypes.func,
  contactBarShow: PropTypes.bool,
  setContactBarShow: PropTypes.func,
  additionalCity: PropTypes.string,
  setAdditionalCity: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  handleButtonClickedit: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  cities: PropTypes.any,
  country: PropTypes.string,
  cities2: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  additionalCountry: PropTypes.string,
  onCountryChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any
};
