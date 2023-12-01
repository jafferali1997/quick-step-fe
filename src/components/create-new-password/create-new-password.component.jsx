import Link from 'next/link';
import useCreateNewPassword from './use-create-new-password.hook';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Loader from '@/common/components/loader/loader.component';

export default function CreateNewPassword() {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    showPassword,
    borderStyle,
    borderSuc,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
    loading,
    password,
    confirm
  } = useCreateNewPassword();

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-container-header">
          <Link href="/">
            <img alt="img" src="/assets/images/logo.png" />
          </Link>
        </div>

        <div className="form-card  ">
          <div className="form-header">
            <img src="/assets/images/lockImg.png" alt="img" />
            <h1 className="tw-pt-4 tw-text-[24px] tw-font-bold tw-capitalize tw-not-italic tw-leading-[36px] tw-text-[#131516]">
              Create new Password
            </h1>
            <p className="tw-text-5 tw-mt-1 tw-font-medium tw-not-italic tw-leading-[30px] tw-text-[#494949]">
              That’s it. Setup your new password
            </p>
          </div>
          <div className="form-body">
            <form className="tw-w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group-c tw-gap-[6px]">
                <label className="font-normal tw-text-[14px] tw-leading-[17.5px]">
                  New Password <span className="form-group-c-label-span ">*</span>
                </label>
                <div className="form-password_wrapper">
                  <CustomInput
                    name="password"
                    placeholder="Enter New password"
                    type={showPassword ? 'text' : 'password'}
                    register={register}
                    className="form-control-c tw-h-[42px]"
                    errors={errors}
                    isRequired={true}
                    style={errors.password ? borderStyle : borderSuc}
                  />

                  {errors.password ? (
                    <div className="create-new-pass-validation">
                      <div className="innerValidation">
                        {/* <img src="/assets/images/s_error.svg" alt="img" />
                        {errors.password.message} */}
                      </div>
                    </div>
                  ) : (
                    <p className="passText color_bbb">
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </p>
                  )}
                  {/* <img
                    role="presentation"
                    alt="img"
                    onClick={toggleShowPassword}
                    className="eye_iocn"
                    src={
                      showPassword
                        ? '/assets/images/pass_icon.png'
                        : '/assets/images/eye.svg'
                    }
                  /> */}
                </div>
              </div>
              <div className="form-group-c tw-mt-6 tw-gap-[6px]">
                <label className="font-normal tw-text-[14px] tw-leading-[17.5px]">
                  Confirm Password <span className="form-group-c-label-span ">*</span>
                </label>
                <div className="form-password_wrapper">
                  <CustomInput
                    placeholder="Enter confirm password"
                    name="confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    register={register}
                    errors={errors}
                    className="form-control-c tw-h-[42px]"
                    isRequired={true}
                    style={errors.confirm ? borderStyle : borderSuc}
                  />

                  {errors.confirm ? (
                    <div className="create-new-pass-validation">
                      <div className="innerValidation">
                        {/* <img src="/assets/images/s_error.svg" alt="img" />
                        {errors.password.message} */}
                      </div>
                    </div>
                  ) : (
                    <p className="passText color_bbb">
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </p>
                  )}

                  {/* <div className="create-new-pass-validation">
                    <div className="innerValidation">
                      {errors.confirm ? (
                        <>
                          <img alt="img" src="/assets/images/s_error.svg" />
                          {errors.confirm.message}
                        </>
                      ) : null}
                    </div>
                  </div> */}
                  {/* <img
                    role="presentation"
                    alt="im"
                    onClick={toggleShowConfirmPassword}
                    className="eye_iocn"
                    src={
                      showConfirmPassword
                        ? '/assets/images/pass_icon.png'
                        : '/assets/images/eye.svg'
                    }
                  /> */}
                </div>
              </div>

              <div className="form-btn-c tw-mt-8">
                <CustomButton
                  type="submit"
                  className="btn-primary rounded-[10px] tw-mt-2 tw-h-[50px] tw-w-full tw-px-[30px] tw-py-3 tw-text-base tw-font-semibold tw-leading-6"
                  disabled={!password || !confirm || loading}
                  text={!loading && 'Update Password'}
                  startIcon={<Loader loading={loading} />}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
