import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';
import COUNTRIES from '@/common/constants/countries.constant';
import usePersonalDetails from './use-personal-details.hook';
import CircularILoader from '@/common/components/circular-loader/circular-loader.component';

export default function PersonDetail() {
  const {
    feildsEnable,
    setFeildsEnable,
    handleSubmit,
    register,
    errors,
    cities,
    error,
    country,
    onCountryChange,
    onSubmit,
    population,
    city,
    handleSelectCity,
    handleSelectCompanyPopulation,
    handleUploadLogo,
    fileInputRef,
    handleFileInputChange,
    logo
  } = usePersonalDetails();

  return (
    <div className="  tw-bg-white tw-px-5 tw-pb-[24px] tw-pt-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <h3 className="tw-overflow-hidden tw-text-ellipsis tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Personal Details
        </h3>
        {!feildsEnable && (
          <CustomButton
            className="btn-secondary"
            text="Update"
            onClick={() => setFeildsEnable(true)}
          />
        )}
      </div>
      <div>
        <form>
          <div className="form-box-grid-2col tw-mt-4">
            <CustomInput
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              className="tw-bg-[#e4e4e440]"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
            <CustomInput
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              type="text"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
          </div>

          <div className="tw-mt-3 tw-w-full">
            <CustomInput
              label="Username"
              name="username"
              placeholder="Enter Username"
              className="tw-bg-[#e4e4e440]"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
              isRequired={true}
            />
          </div>

          <h3 className="tw-mt-6 tw-overflow-hidden tw-text-ellipsis tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
            Business Details
          </h3>
          <div className="form-box-grid-2col tw-mt-6">
            <CustomInput
              label="Company name"
              name="businessName"
              placeholder="Enter Company name"
              className="tw-bg-[#e4e4e440]"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
            <Select
              label="Employee"
              value={population}
              name="population"
              placeholder="Select Employee"
              register={register}
              errors={error}
              disabled={!feildsEnable}
              className="tw-h-[36px]"
              options={[
                { label: '10-20', value: '10 - 20' },
                { label: '30-50', value: '30 - 50' },
                { label: '50-100', value: '50 - 100' },
                { label: '100-above', value: '100 - Above' }
              ]}
              onChange={(e, value) => handleSelectCompanyPopulation(value)}
            />
            <CustomInput
              label="Business email"
              name="businessEmail"
              placeholder="Enter Business email"
              type="text"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
            <CustomInput
              label="Company Address"
              name="address"
              placeholder="Enter Company Address"
              type="text"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />

            <CustomInput
              label="Street No"
              name="streatNo"
              placeholder="Enter Streat No"
              type="number"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />

            <CustomInput
              label="Zip Code"
              name="zipCode"
              placeholder="Enter Zip Code"
              type="number"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />

            <Select
              label="city"
              name="city"
              type="select"
              value={city}
              placeholder="Select City"
              options={cities}
              isRequired={true}
              register={register}
              errors={error}
              disabled={!feildsEnable}
              className="tw-h-[36px]"
              onChange={(e, value) => handleSelectCity(value)}
            />
            <Select
              label="Country"
              value={country}
              options={COUNTRIES}
              name="country"
              placeholder="Select Country"
              isRequired={true}
              register={register}
              errors={error}
              disabled={!feildsEnable}
              className="tw-h-[36px]"
              onChange={(e, value) => onCountryChange(value)}
            />
          </div>
          <div className="tw-full tw-mt-4">
            <CustomInput
              label="Company slogan"
              name="slogan"
              placeholder="Enter Company slogan"
              className="tw-bg-[#e4e4e440]"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
          </div>

          <input
            type="file"
            id="fileInput"
            className="tw-hidden"
            ref={fileInputRef}
            multiple
            accept=".png, .jpeg, .jpg"
            onChange={handleFileInputChange}
          />

          <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-2">
            <p className="tw-overflow-hidden tw-text-ellipsis tw-text-xs tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
              Logo
            </p>
            <div className="tw-flex tw-h-[132px] tw-w-[261px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#e4e4e440] tw-pb-[26px] tw-pl-2 tw-pr-[8.404px] tw-pt-[27px]">
              {logo ? (
                <img src={logo} alt="logo" className="tw-h-[132px] tw-w-[261px]" />
              ) : (
                <CircularILoader />
              )}
            </div>
            {feildsEnable && (
              <div className="tw-flex tw-h-[36px] tw-w-[261px] tw-items-center tw-rounded-md tw-bg-[#e4e4e440] tw-px-2 tw-py-1.5">
                <div
                  className="tw-flex tw-items-center tw-gap-3"
                  onClick={handleUploadLogo}
                >
                  <img
                    src="/assets/images/uplaod-icon.svg"
                    alt="file"
                    className="tw-h-6 tw-w-6"
                  />
                  <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
                    Upload Logo
                  </div>
                </div>
              </div>
            )}
          </div>

          <h3 className="tw-mt-6 tw-overflow-hidden tw-text-ellipsis tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
            Bank Details
          </h3>
          <div className="form-box-grid-2col tw-mt-3">
            <CustomInput
              label="IBAN"
              name="iban"
              placeholder="PK143277882424QM8327644"
              className="tw-bg-[#e4e4e440]"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
            <CustomInput
              label="VAT"
              name="vat"
              placeholder="Enter VAT"
              type="text"
              register={register}
              errors={errors}
              disabled={!feildsEnable}
            />
          </div>

          {feildsEnable && (
            <div className="tw-mt-6  tw-flex tw-w-full tw-justify-end tw-gap-6">
              <div className="tw-flex tw-gap-3">
                <CustomButton
                  className="tw-rounded-md tw-border tw-border-solid tw-border-[#BBB] tw-px-6 tw-py-[11.5px] tw-text-sm tw-font-semibold tw-not-italic tw-leading-[normal] tw-text-text-medium-gray"
                  text="Cancel"
                  onClick={() => setFeildsEnable(false)}
                />
                <CustomButton
                  className="btn-primary"
                  text="Save"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
