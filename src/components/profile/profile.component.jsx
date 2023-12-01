import Link from 'next/link';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import OtpInput from '@/common/components/otp-input/otp-input.component';
import CountryPhoneInput from '@/common/components/country-phone-input/country-phone-input.component';
import useProfile from './use-profile.hook';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import COUNTRIES from '@/common/constants/countries.constant';

export default function Profile() {
  const {
    otp,
    setOtp,
    register,
    handleSubmit,
    onSubmit,
    errors,
    phone,
    setPhone,
    sendOtp,
    verifyOtpHandler,
    sendOtpButtonText,
    isOtpVerified,
    control,
    onCountryChange,
    cities,
    logoutClickHandler,
    country,
    error,
    defaultCountryCode
  } = useProfile();

  return (
    <div className=" tw-min-h-[1090px] ">
      <div className="tw-m-auto tw-max-w-[1311px] tw-px-[7.5px] tw-py-0">
        <div className="tw-mx-0 tw-mb-0 tw-mt-6">
          <Link href="/">
            <img alt="img" src="/assets/images/logo.png" />
          </Link>
        </div>
        <h1 className="tw-pt-12 tw-font-dm tw-text-[24px] tw-font-bold tw-not-italic tw-leading-[52px] tw-text-[#494949]">
          Profile Details
        </h1>
        <div className="profile-form-section tw-mb-5 ">
          <div className="profile-form-heading tw-flex tw-gap-3 tw-pt-[34px]">
            <div className="color-width tw-min-h-[28px] tw-min-w-[6px] tw-rounded tw-bg-primary" />
            <h3 className="tw-font-dm tw-text-[18px] tw-font-medium tw-not-italic tw-leading-[24px] tw-text-[#050707]">
              Personal Details
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-mt-[24px] tw-flex tw-flex-col tw-gap-[24px]"
          >
            <div className="tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-group tw-gap-5.5">
                <CustomInput
                  label={<span className="tw-text-sm tw-font-normal">First Name</span>}
                  name="firstName"
                  placeholder="John"
                  type="text"
                  register={register}
                  inlineLabel
                  errors={errors}
                  isRequired={true}
                />
              </div>
              <div className="input-group">
                <CustomInput
                  label={<span className="tw-text-sm tw-font-normal">Last Name</span>}
                  name="lastName"
                  placeholder="Deo"
                  type="text"
                  register={register}
                  isRequired={true}
                  errors={errors}
                  inlineLabel
                />
              </div>
            </div>
            <div className="tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-group">
                <CustomInput
                  label={<span className="tw-text-sm tw-font-normal">User Name</span>}
                  name="userName"
                  type="text"
                  register={register}
                  isRequired={true}
                  disabled={true}
                  inlineLabel
                />
              </div>
              <div className="input-group">
                <CustomInput
                  label={<span className="tw-text-sm tw-font-normal">Email</span>}
                  name="email"
                  type="email"
                  register={register}
                  isRequired={true}
                  disabled={true}
                  inlineLabel
                />
              </div>
            </div>
            <div className="tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-group">
                <CustomSelect
                  label={<span className="tw-text-sm tw-font-normal">Country</span>}
                  inlineLabel
                  value={country}
                  options={COUNTRIES}
                  onChange={onCountryChange}
                  control={control}
                  name="country"
                  placeholder="Select Country"
                  isRequired={true}
                  errors={error}
                />
              </div>
              <div className="input-group">
                <CustomSelect
                  label={<span className="tw-text-sm tw-font-normal">City</span>}
                  name="city"
                  type="select"
                  inlineLabel
                  placeholder="Select City"
                  options={cities}
                  control={control}
                  isRequired={true}
                  errors={errors}
                />
              </div>
            </div>
            {/* <div className="tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16"> */}
            <div className="input-phone tw-flex tw-items-center tw-gap-[32px]">
              <CountryPhoneInput
                label={<span className="tw-text-sm tw-font-normal">Phone Number</span>}
                inlineLabel={true}
                defaultValue={defaultCountryCode}
                name="phone"
                value={phone}
                onChange={setPhone}
                isRequired={true}
                register={register}
                errors={errors}
                className="tw-w-full"
                disabled={isOtpVerified}
              />
              <CustomButton
                text={sendOtpButtonText.current}
                className="btn-outline tw-mt-2 tw-h-[40px] tw-w-[181px] tw-py-2 tw-text-sm disabled:hover:tw-bg-transparent"
                onClick={sendOtp}
                disabled={isOtpVerified}
              />
            </div>
            <div className="tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-phone tw-flex tw-items-center tw-gap-[36px]">
                <label className="tw-text-sm">OTP Number</label>
                <div className="tw-flex tw-items-center tw-justify-between tw-gap-[81px]">
                  <div className="input-inner tw-ps-3">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      disabled={isOtpVerified}
                      // label="OTP"
                    />
                  </div>
                  <div>
                    <CustomButton
                      onClick={verifyOtpHandler}
                      text="Verify OTP"
                      className="btn-primary tw-h-[43px] tw-px-[64px] tw-py-2 tw-text-sm"
                      disabled={isOtpVerified || !otp || otp?.length < 4}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-form-heading">
              <div className="profile-form-heading tw-flex tw-gap-3 tw-pt-[14px]">
                <div className="color-width tw-min-h-[28px] tw-min-w-[6px] tw-rounded tw-bg-primary" />
                <h3 className="tw-font-dm tw-text-[18px] tw-font-medium tw-not-italic tw-leading-[24px] tw-text-[#050707]">
                  Financial Details
                </h3>
              </div>
            </div>
            <div className=" tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-group">
                <CustomInput
                  type="text"
                  label={<span className="tw-text-sm tw-font-normal">IBAN Number</span>}
                  name="iban"
                  placeholder="Enter IBAN number"
                  register={register}
                  inlineLabel
                />
              </div>
              <div className="input-group">
                <CustomInput
                  type="text"
                  label={<span className="tw-text-sm tw-font-normal">VAT Number</span>}
                  name="vat"
                  placeholder="Enter VAT number"
                  register={register}
                  inlineLabel
                />
              </div>
            </div>
            <div className="profile-form-heading tw-flex tw-gap-3 tw-pt-[22px]">
              <div className="color-width tw-min-h-[28px] tw-min-w-[6px] tw-rounded tw-bg-primary" />
              <h3 className="tw-font-dm tw-text-[18px] tw-font-medium tw-not-italic tw-leading-[24px] tw-text-[#050707]">
                Business Details
              </h3>
            </div>
            <div className=" tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-group">
                <CustomInput
                  type="text"
                  label={<span className="tw-text-sm tw-font-normal">Company Name</span>}
                  name="businessName"
                  placeholder="Zapta Technology"
                  register={register}
                  errors={errors}
                  inlineLabel
                  isRequired={true}
                />
              </div>
              <div className="input-group">
                <CustomSelect
                  inlineLabel
                  label={<span className="tw-text-sm tw-font-normal">Employees</span>}
                  name="population"
                  placeholder="Select Population"
                  options={[
                    { value: '10-20', label: '10 - 20' },
                    { value: '30-50', label: '30 - 50' },
                    { value: '50-100', label: '50 - 100' },
                    { value: '100-above', label: '100 - Above' }
                  ]}
                  control={control}
                  errors={errors}
                  isRequired={true}
                />
              </div>
            </div>
            <div className=" tw-grid tw-w-full tw-grid-cols-[repeat(auto-fill,minmax(616px,1fr))] tw-gap-16">
              <div className="input-group">
                <CustomInput
                  type="text"
                  label={<span className="tw-text-sm tw-font-normal">Slogan</span>}
                  name="slogan"
                  placeholder="Slogan"
                  register={register}
                  errors={errors}
                  inlineLabel
                  isRequired={true}
                />
              </div>
              <div className="input-group">
                <CustomInput
                  type="email"
                  label={
                    <span className="tw-text-sm tw-font-normal">Business Email</span>
                  }
                  name="businessEmail"
                  placeholder="Business Email"
                  register={register}
                  errors={errors}
                  inlineLabel
                  isRequired={true}
                />
              </div>
            </div>
            <div className=" tw-w-full tw-gap-16">
              <div className="input-group onebythree tw-col-[0.3333333333]">
                <CustomInput
                  type="text"
                  label={<span className="tw-text-sm tw-font-normal">Address</span>}
                  name="address"
                  placeholder="1234 Johr Town Berlin, Germany"
                  register={register}
                  errors={errors}
                  inlineLabel
                  isRequired={true}
                />
              </div>
            </div>
            <div className="tw-mt-[65.5PX] tw-flex tw-justify-between tw-gap-16">
              <div className="submit-button">
                <CustomButton
                  className="btn-cancel tw-h-[50px] tw-px-[60px] hover:!tw-bg-danger hover:!tw-text-white"
                  text="Logout"
                  onClick={logoutClickHandler}
                />
              </div>
              <div className="submit-button">
                <CustomButton
                  type="submit"
                  className="btn-primary tw-h-[50px] tw-px-[60px]"
                  text="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
