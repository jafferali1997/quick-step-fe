import { Dialog, DialogContent } from '@mui/material/node';
import CountryPhoneInput from '@/common/components/country-phone-input/country-phone-input.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import useIPAddress from '@/common/hooks/use-ip-address.hook';
import CountDown from '@/components/two-factor-auth/components/countdown/count-down.component';
import useContactInfo from './use-contact-info.hook';
import Loader from '@/common/components/loader/loader.component';

export default function ContactInfo() {
  const {
    popUpOpen,
    setPopUpOpen,
    register,
    errors,
    email,
    setEmail,
    auth,
    setEnableFeilds,
    enableFeilds,
    handleCancel,
    setPhone,
    phone,
    otpNumberChangeHandler,
    otpNumber1,
    otpNumber2,
    otpNumber3,
    otpNumber4,
    setIsTimerStop,
    verifyOtpHandler,
    resendOtpHandler,
    isTimerStop,
    loading,
    isOtpVerified,
    handleVerifyEmail,
    handleSendOtp
  } = useContactInfo();

  const { ipResponse } = useIPAddress();

  return (
    <div className="  tw-bg-white tw-px-5 tw-pb-[24px] tw-pt-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <h3 className="tw-overflow-hidden tw-text-ellipsis tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Contact Info
        </h3>
        {!enableFeilds && (
          <CustomButton
            className="tw-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-[#047857] tw-px-6 tw-py-[11.5px] tw-text-sm tw-font-semibold tw-not-italic tw-leading-[normal] tw-text-white hover:tw-bg-[#047857]"
            text="Update"
            onClick={() => setEnableFeilds(true)}
          />
        )}
      </div>
      <form>
        <div className="tw-relative tw-mt-6 tw-w-full">
          <CustomInput
            label="Email"
            name="email"
            placeholder="Quicksteps123@gmail.com"
            className=" tw-bg-[#e4e4e440]"
            register={register}
            errors={errors}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!enableFeilds}
          />
          {auth.email === email && (
            <img
              src="/assets/icons/verified-tick.svg"
              alt="verified"
              className="tw-absolute tw-bottom-2 tw-right-4 tw-h-6 tw-w-6"
            />
          )}
        </div>
        {auth.email !== email && enableFeilds ? (
          <div className="tw-mt-6 tw-flex tw-w-full tw-justify-end tw-gap-6">
            <CustomButton
              className="tw-rounded-md tw-border tw-border-solid tw-border-[#BBB] tw-px-6 tw-py-[11.5px] tw-text-sm tw-font-semibold tw-not-italic tw-leading-[normal] tw-text-text-medium-gray"
              text="Cancel"
              onClick={handleCancel}
            />
            <CustomButton
              className="btn-primary"
              text="Verify Email"
              onClick={handleVerifyEmail}
            />
          </div>
        ) : null}
        <p className=" tw-mt-4 tw-overflow-hidden tw-text-ellipsis tw-text-xs tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
          Phone number
        </p>
        <div className="input-phone tw-relative tw-flex tw-items-center tw-gap-[32px]">
          <CountryPhoneInput
            defaultValue={
              phone
                ? null
                : ipResponse?.country_code && ipResponse?.country_code?.toLowerCase()
            }
            name="phone"
            value={phone}
            onChange={setPhone}
            isRequired={true}
            register={register}
            errors={errors}
            className="tw-relative !tw-w-full"
            disabled={!enableFeilds}
          />
          {auth.phone === phone ? (
            <img
              src="/assets/icons/verified-tick.svg"
              alt="verified"
              className="tw-absolute tw-bottom-2 tw-right-4 tw-h-6 tw-w-6"
            />
          ) : null}
        </div>
        {auth.phone !== phone && enableFeilds && (
          <div className="tw-mt-6 tw-flex tw-w-full tw-justify-end tw-gap-6">
            <CustomButton
              className="tw-rounded-md tw-border tw-border-solid tw-border-[#BBB] tw-px-6 tw-py-[11.5px] tw-text-sm tw-font-semibold tw-not-italic tw-leading-[normal] tw-text-text-medium-gray"
              text="Cancel"
              onClick={handleCancel}
            />
            <CustomButton
              className="btn-primary"
              text="Send OTP"
              onClick={handleSendOtp}
            />
          </div>
        )}
      </form>

      {/* otp dialog */}
      <Dialog
        className="!tw-rounded-[20px]"
        // ref={refPay}
        open={popUpOpen}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              borderRadius: '20px',
              width: '100%',
              maxWidth: '519px' // Set your width here
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
          <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-p-5">
            <div className="tw-text-xl tw-font-medium tw-capitalize tw-not-italic tw-leading-[30px] tw-text-text-black">
              Verify Otp
            </div>
            <div className="hover:tw-cursor-pointer" onClick={() => setPopUpOpen(false)}>
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
          <DialogContent className="tw-rounded-xl">
            <form>
              <div className="form-body tw--mt-2">
                <div className="tw-mb-8 tw-flex tw-flex-col">
                  <div className="tw-mb-4 tw-flex tw-gap-4">
                    <input
                      id="1"
                      type="text"
                      maxLength={1}
                      placeholder="-"
                      onChange={otpNumberChangeHandler}
                      ref={otpNumber1}
                      className="tw-flex tw-flex tw-h-[43px] tw-w-[50px] tw-flex-row tw-items-center tw-gap-2 tw-rounded-[1px] tw-border-b tw-border-solid tw-border-b-disabled-input tw-px-3 tw-py-[11px] tw-text-center tw-text-[1.4rem] tw-font-medium tw-not-italic tw-leading-[2.1rem] tw-text-text-dark-gray"
                    />
                    <input
                      id="2"
                      type="text"
                      maxLength={1}
                      placeholder="-"
                      onChange={otpNumberChangeHandler}
                      ref={otpNumber2}
                      className="tw-flex tw-h-[43px] tw-w-[50px] tw-flex-row tw-items-center tw-gap-2 tw-rounded-[1px] tw-border-b tw-border-solid tw-border-b-disabled-input tw-px-3 tw-py-[11px] tw-text-center tw-text-[1.4rem] tw-font-medium tw-not-italic tw-leading-[2.1rem] tw-text-text-dark-gray"
                    />
                    <input
                      id="3"
                      type="text"
                      maxLength={1}
                      placeholder="-"
                      onChange={otpNumberChangeHandler}
                      ref={otpNumber3}
                      className="tw-flex tw-h-[43px] tw-w-[50px] tw-flex-row tw-items-center tw-gap-2 tw-rounded-[1px] tw-border-b tw-border-solid tw-border-b-disabled-input tw-px-3 tw-py-[11px] tw-text-center tw-text-[1.4rem] tw-font-medium tw-not-italic tw-leading-[2.1rem] tw-text-text-dark-gray"
                    />
                    <input
                      id="4"
                      type="text"
                      maxLength={1}
                      placeholder="-"
                      onChange={otpNumberChangeHandler}
                      ref={otpNumber4}
                      className="tw-flex tw-h-[43px] tw-w-[50px] tw-flex-row tw-items-center tw-gap-2 tw-rounded-[1px] tw-border-b tw-border-solid tw-border-b-disabled-input tw-px-3 tw-py-[11px] tw-text-center tw-text-[1.4rem] tw-font-medium tw-not-italic tw-leading-[2.1rem] tw-text-text-dark-gray"
                    />
                  </div>
                  <div className="tw-text-right">
                    <CountDown
                      stopTimerHandler={setIsTimerStop}
                      isRunTimer={!isTimerStop}
                    />
                  </div>
                </div>
                <div className="verify-form-btn-c tw-w-full">
                  <CustomButton
                    type="submit"
                    className="btn-primary leading-[16.94px] tw-h-[50px] tw-w-full tw-px-[30px] tw-py-[12px] tw-text-[14px] tw-font-semibold"
                    onClick={verifyOtpHandler}
                    text={!loading && 'Verify Code'}
                    startIcon={<Loader loading={loading} />}
                    disabled={isOtpVerified}
                  />
                </div>
                <div className="otp-form-footer tw-mt-[24px]">
                  <p className="tw-text-[12px] tw-font-bold tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Don’t receive code?{' '}
                    <button
                      type="button"
                      onClick={resendOtpHandler}
                      className={`tw-text-red-500 ${
                        !isTimerStop ? '!tw-cursor-not-allowed !tw-text-gray-400' : ''
                      } `}
                      disabled={!isTimerStop}
                    >
                      Resend SMS
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
