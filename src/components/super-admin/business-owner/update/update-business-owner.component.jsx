'use client';

import Link from 'next/link';
import CountryPhoneInput from '@/common/components/country-phone-input/country-phone-input.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';
import COUNTRIES from '@/common/constants/countries.constant';
import GalleryIcon from '@/common/icons/gallery.icon';
import useUpdateBusinessOwner from './use-update-business-owner.hook';
import CircularILoader from '@/common/components/circular-loader/circular-loader.component';

function UpdateBusinessOwner() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    control,
    onCountryChange,
    cities,
    onChangeInput,
    onBlurInput,
    handleFileInputChange,
    logo,
    loading,
    id
  } = useUpdateBusinessOwner();

  return (
    <div className="tw-mt-6">
      <div className="tw-flex tw-items-center tw-gap-[16px] tw-px-[24px]">
        <Link href="/super-admin/business-owner">
          <img src="/assets/images/back-icon.svg" alt="img" />
        </Link>
        <h2 className="admin-top-heading">Update Business Owner</h2>
        <p className="admin-top-p">Business owner #:</p>{' '}
        <span className="header-span">{id}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tw-mt-4 tw-px-6">
          <div className="personal-details-wrapper tw-rounded-[20px] tw-border tw-border-disabled-input tw-bg-[#FFFFFF] tw-px-6 tw-py-5">
            <div className="content-header tw-flex tw-items-center tw-justify-between ">
              <h3 className="form-inner-heading tw-text-xl">Personal Details</h3>
            </div>

            <div className="content-body tw-mt-4">
              {' '}
              <div className="form-box-grid-2col">
                <CustomInput
                  label="First Name"
                  name="firstName"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter first name"
                />
                <CustomInput
                  label="Last Name"
                  name="lastName"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter last name"
                  type="text"
                />
                <CustomInput
                  label="Username"
                  name="userName"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter username"
                  type="text"
                  isRequired={true}
                  onChange={(e) => onChangeInput(e.target.value)}
                />
                <CountryPhoneInput
                  label="Phone Number"
                  name="phoneNumber"
                  defaultValue=" "
                  register={register}
                  errors={errors}
                  control={control}
                  className="tw-h-10"
                  onChange={(value) => setValue('phoneNumber', value)}
                />

                <CustomInput
                  label="Email"
                  name="email"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter email "
                  type="text"
                  isRequired={true}
                  onBlur={onBlurInput}
                />
                <CustomInput
                  label="Password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="******"
                  type="password"
                  isRequired={true}
                />
              </div>
            </div>
          </div>

          <div className="personal-details-wrapper tw-mt-4 tw-gap-4 tw-rounded-[20px] tw-border tw-border-disabled-input tw-bg-[#FFFFFF] tw-px-6 tw-py-5">
            <div className="content-header tw-flex tw-items-center tw-justify-between ">
              <h3 className="form-inner-heading tw-text-xl">Business Details</h3>
            </div>
            <div className="content-body">
              {' '}
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-6 md:tw-flex-row">
                <CustomInput
                  label="Company name"
                  name="businessName"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter company name"
                  type="text"
                />
                <Select
                  options={[
                    { value: '10-20', label: '10-20' },
                    { value: '30-50', label: '30-50' },
                    { value: '50-100', label: '50-100' },
                    { value: '100-above', label: '100-Above' }
                  ]}
                  placeholder="Select Employees "
                  label="Employees "
                  name="population"
                  register={register}
                  errors={errors}
                  control={control}
                  className="tw-text-sm"
                />
              </div>
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-6 md:tw-flex-row">
                <CustomInput
                  label="Business Email"
                  name="businessEmail"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter Business Email"
                  type="email"
                />
                <CustomInput
                  label="Address"
                  name="address"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter Address"
                  type="text"
                />
              </div>
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-6 md:tw-flex-row">
                <CustomInput
                  label="Street No"
                  name="streetNo"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter Street No"
                  type="number"
                />
                <CustomInput
                  label="Zip Code"
                  name="zipCode"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter Zip Code"
                  type="number"
                />
              </div>
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-6 md:tw-flex-row">
                <Select
                  label="Country"
                  control={control}
                  name="country"
                  register={register}
                  defaultValue="Select Country"
                  type="select"
                  onChange={(e, value) => onCountryChange(value)}
                  errors={errors}
                  options={COUNTRIES}
                  className="tw-text-sm"
                />
                <Select
                  label="City"
                  control={control}
                  name="city"
                  defaultValue="Select City"
                  register={register}
                  type="select"
                  errors={errors}
                  options={cities}
                  className="tw-text-sm"
                />
              </div>
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-6 md:tw-flex-row">
                <CustomInput
                  label="Slogan"
                  name="slogan"
                  register={register}
                  errors={errors}
                  control={control}
                  placeholder="Enter Slogan"
                  type="text"
                />
              </div>
              <div>
                <p className="tw-mb-2 tw-mt-4 tw-text-xs tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                  Logo
                </p>
                <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-border-text-ultra-light-gray tw-px-0 tw-py-[32.5px]">
                  <input
                    type="file"
                    className="tw-absolute tw-h-full tw-w-full tw-opacity-0"
                    onChange={handleFileInputChange}
                  />
                  {loading ? (
                    <CircularILoader />
                  ) : (
                    <div className="tw-flex tw-flex-col tw-items-center tw-gap-[6px]">
                      <GalleryIcon />
                      <p className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                        Upload Logo Here
                      </p>
                    </div>
                  )}
                </div>
                <div className="tw-mt-3 tw-flex tw-h-[67px] tw-w-[76px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#e4e4e44d] tw-px-6 tw-pb-5 tw-pt-[19px]">
                  {logo ? <img src={logo} alt="logo" /> : <GalleryIcon />}
                </div>
              </div>
            </div>
          </div>
          <div className=" personal-details-wrapper tw-mt-4 tw-gap-4 tw-rounded-[20px] tw-border tw-border-disabled-input tw-bg-[#FFFFFF] tw-px-6 tw-py-5">
            <div className="content-header tw-flex tw-items-center tw-justify-between ">
              <h3 className="form-inner-heading tw-text-xl">Financial Details</h3>
            </div>
            <div className="content-body">
              {' '}
              <div className="tw-mt-4 tw-flex tw-w-full  tw-flex-col tw-gap-6 md:tw-flex-row">
                <CustomInput
                  label="IBAN number"
                  name="iban"
                  register={register}
                  errors={errors}
                  control={control}
                  type="text"
                  placeholder="Enter IBAN number"
                />
                <CustomInput
                  label="VAT number"
                  name="vat"
                  placeholder="Enter VAT number"
                  type="text"
                  register={register}
                  errors={errors}
                  control={control}
                />
              </div>
            </div>
          </div>

          <div className="tw-mb-[61px] tw-mt-[49px] tw-flex tw-justify-end">
            <CustomButton
              text="Update"
              type="submit"
              className="btn-primary"
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateBusinessOwner;
