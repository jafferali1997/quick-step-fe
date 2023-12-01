/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import Link from 'next/link';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import Loader from '@/common/components/loader/loader.component';
import LoginWithLinkedIn from '@/common/components/login-with-linkedIn/login-with-linkedIn.component';
import {
  signInWithFacebook,
  signInWithGoogle,
  signInWithMicrosoft
} from '@/common/utils/firebase';
import useSignUp from './use-sign-up.hook';

function SignUp() {
  const {
    isEnableButton,
    handleSubmit,
    onSubmit,
    register,
    errors,
    borderStyle,
    borderSuc,
    showPassword,
    toggleShowPassword,
    isChecked,
    loading,
    signUpWithOAuth,
    router,
    setIsChecked,
    userName,
    email,
    password
  } = useSignUp();

  return (
    <div className="form-wrapper">
      <div className=" form-container">
        <div className="form-container-header">
          <Link href="/">
            <img alt="img" src="/assets/images/logo.png" />
          </Link>
        </div>

        <div className="form-card tw-pt-[42.1px]" isEnableButton={isEnableButton}>
          <div className="tw-flex tw-flex-col tw-items-center tw-px-6 tw-py-0">
            <h1 className="form-header-h1">Sign up</h1>
            <p className="form-header-p tw-mt-2">Welcome. Please enter your details </p>
          </div>
          <div className="form-body-auth ">
            <form className=" tw-w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className=" tw-flex tw-flex-col">
                <label className="form-group-c-label">
                  Username <span className="form-group-c-label-span ">*</span>
                </label>
                <input
                  {...register('userName')}
                  type="text"
                  name="userName"
                  className="form-group-c-input tw-h-[43px]"
                  placeholder="Username"
                  style={errors.userName ? borderStyle : borderSuc}
                />
                <div className="form-validation ">
                  {errors.userName ? (
                    <>
                      <img
                        alt="img"
                        height="10px"
                        width="10px"
                        src="/assets/images/s_error.svg"
                      />
                      {errors.userName.message}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="form-group-c tw-mt-[24px]">
                <label className="form-group-c-label">
                  Email <span className="form-group-c-label-span ">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  name="email"
                  className="form-group-c-input tw-h-[43px]"
                  placeholder="example@example.com"
                  style={errors.email ? borderStyle : borderSuc}
                />
                {errors.email ? (
                  <div className="form-validation ">
                    <img
                      alt="img"
                      height="10px"
                      width="10px"
                      src="/assets/images/s_error.svg"
                    />
                    {errors.email.message}
                  </div>
                ) : null}
              </div>
              <div className="form-group-c tw-mt-[24px] tw-gap-[6px]">
                <label className="font-[17px] text-sm leading-[17.5px]">
                  Password <span className="form-group-c-label-span ">*</span>
                </label>
                <div className="pass_input_div ">
                  <div className="form-password_wrapper">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="form-group-c-input tw-h-[43px]"
                      placeholder="*****"
                      required
                      style={errors.password ? borderStyle : borderSuc}
                    />
                    <img
                      role="presentation"
                      alt="img"
                      onClick={toggleShowPassword}
                      className="eye_iocn tw-h-[14.22px] tw-w-[22px]"
                      src={
                        showPassword
                          ? '/assets/images/pass_icon.png'
                          : '/assets/images/eye.svg'
                      }
                    />
                  </div>

                  {errors.password ? (
                    <div className="form-validation ">
                      <img
                        height="10px"
                        width="10px"
                        src="/assets/images/s_error.svg"
                        alt="img"
                      />
                      {errors.password.message}
                    </div>
                  ) : (
                    <p className="passText color_bbb">
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </p>
                  )}
                </div>
              </div>

              <div className="tw-mt-4 tw-flex tw-gap-[6.5px]">
                {isChecked ? (
                  <img
                    src="/assets/icons/check.svg"
                    alt=""
                    className="tw-cursor-pointer"
                    onClick={() => setIsChecked(!isChecked)}
                  />
                ) : (
                  <img
                    src="/assets/icons/uncheck.svg"
                    alt=""
                    className="tw-cursor-pointer"
                    onClick={() => setIsChecked(!isChecked)}
                  />
                )}

                <Link
                  href="/terms-and-conditions"
                  // htmlFor="terms"
                  // id="terms"
                  className="tw-text-[12px] tw-not-italic tw-leading-[18px] tw-underline hover:tw-no-underline"
                >
                  Terms & Conditions
                </Link>
              </div>

              <div className="form-btn-c tw-mt-8">
                <CustomButton
                  type="submit"
                  className="btn-primary tw-h-[50px] tw-w-full tw-rounded-xl tw-px-[30px] tw-py-3 tw-text-base tw-font-semibold tw-leading-6"
                  text={!loading && 'Sign up'}
                  startIcon={<Loader loading={loading} />}
                  disabled={!userName || !email || !password || !isChecked || loading}
                />
              </div>
              <div className="form-or-content tw-mt-[24px]">
                <div className="form-or-content-line" />
                <span className="form-or-content-span tw-eading-[18px]">Or</span>
                <div className="form-or-content-line" />
              </div>
              <div className="login-with-provider tw-m-0 tw-mt-[24px]">
                <button
                  onClick={() => signInWithGoogle(signUpWithOAuth)}
                  className="login-provider-btn"
                  type="button"
                >
                  <img
                    src="/assets/images/google-icon.svg"
                    alt="login with Google"
                    className="tw-h-6 tw-w-6"
                  />
                </button>
                <button
                  onClick={() => signInWithFacebook(signUpWithOAuth)}
                  className="login-provider-btn"
                  type="button"
                >
                  <img
                    src="/assets/images/facebook-icon.svg"
                    alt="login with Facebook"
                    className="tw-h-6 tw-w-6"
                  />
                </button>
                <button
                  onClick={() => signInWithMicrosoft(signUpWithOAuth)}
                  className="login-provider-btn"
                  type="button"
                >
                  <img
                    src="/assets/images/microsoft-icon.svg"
                    alt="login with Microsoft"
                  />
                </button>
                <LoginWithLinkedIn />
              </div>
              <div className="form_links tw-mt-[32px] tw-text-center tw-text-xs tw-font-normal tw-leading-[18px]">
                <label className="login">Already have an account?</label>
                <Link href="/login" className="span-link">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
