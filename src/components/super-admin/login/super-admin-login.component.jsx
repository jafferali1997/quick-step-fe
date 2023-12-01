import Link from 'next/link';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import Loader from '@/common/components/loader/loader.component';
import LoginWithLinkedIn from '@/common/components/login-with-linkedIn/login-with-linkedIn.component';
import { getAccessToken } from '@/common/utils/access-token.util';
import {
  signInWithFacebook,
  signInWithGoogle,
  signInWithMicrosoft
} from '@/common/utils/firebase';
import useSuperAdminLogin from './use-super-admin-login.hook';

// export async function getServerSideProps(context) {
//   const accessToken = getAccessToken();

//   if (accessToken) {
//     return {
//       redirect: {
//         destination: '/customer',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: {}
//   };
// }
export default function SuperAdminLogin() {
  // hooks
  const {
    onSubmit,
    borderStyle,
    borderSuc,
    showPassword,
    isChecked,
    setIsChecked,
    toggleShowPassword,
    router,
    loading,
    loginWithOAuth,
    register,
    handleSubmit,
    errors,
    email,
    password
  } = useSuperAdminLogin();

  return (
    <div className="form-wrapper">
      <div className="form-container ">
        <div className="form-container-header">
          <Link href="/">
            <img alt="null" src="/assets/images/logo.png" />
          </Link>
        </div>

        <div className="form-card  ">
          <div className="form-header">
            <h1 className="form-header-h1">Login</h1>
            <p className="form-header-p tw-mt-2">
              Welcome back! Please enter your details
            </p>
          </div>
          <div className="form-body-auth">
            <form className="tw-w-full" onSubmit={handleSubmit(onSubmit)} method="post">
              <div className="form-group-c tw-gap-[6px]">
                <label className="tw-text-sm tw-font-normal tw-leading-[18px]">
                  Email/Username <span>*</span>
                </label>
                <input
                  {...register('email')}
                  type="text"
                  id="email"
                  className="form-group-c-input tw-h-[43px] tw-bg-transparent"
                  placeholder="Email/Username"
                  required
                  style={errors.email ? borderStyle : borderSuc}
                />
                {errors.email ? (
                  <div className="form-validation">
                    <div className="innerValidation">
                      <img alt="null" src="/assets/images/s_error.svg" />
                      {errors.email.message}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="form-group-c tw-mt-[24px] tw-gap-[6px]">
                <label className="tw-text-sm tw-font-normal tw-leading-[18px]">
                  Password <span>*</span>
                </label>
                <div className="pass_input_div">
                  <div className="form-password_wrapper">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="form-group-c-input tw-h-[43px]"
                      placeholder="*******"
                      style={errors.password ? borderStyle : borderSuc}
                    />
                    <img
                      role="presentation"
                      onClick={toggleShowPassword}
                      alt="toggle password"
                      className="eye_iocn tw-h-[14.22px] tw-w-[22px]"
                      src={
                        showPassword
                          ? '/assets/images/pass_icon.png'
                          : '/assets/images/eye_icon.svg'
                      }
                    />
                  </div>
                  {errors.password ? (
                    <div className="form-validation">
                      <div className="innerValidation">
                        <img src="/assets/images/s_error.svg" alt="error" />
                        {errors.password.message}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
                <div
                  className="tw-flex tw-gap-[6.5px]"
                  onClick={() => setIsChecked(!isChecked)}
                >
                  {isChecked ? (
                    <img src="/assets/icons/check.svg" alt="" />
                  ) : (
                    <img src="/assets/icons/uncheck.svg" alt="" />
                  )}

                  <label
                    htmlFor="terms"
                    id="terms"
                    className="tw-fon tw-cursor-pointer tw-text-[12px]
                 tw-font-normal tw-not-italic tw-leading-[18px]"
                  >
                    Remember Me
                  </label>
                </div>
                <Link
                  href="/forget-password"
                  onClick={() =>
                    router.push('/forget-password?btnText=Password%20Recovery%20Link')
                  }
                  className="forgotText tw-rounded-xl tw-text-xs tw-font-bold tw-leading-[18px] "
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="form-btn-c tw-mt-[32px]">
                <CustomButton
                  type="submit"
                  className="btn-primary tw-h-[50px] tw-w-full tw-rounded-xl tw-px-[30px] tw-py-3 tw-text-base tw-leading-6"
                  text={!loading && 'Login'}
                  startIcon={<Loader loading={loading} />}
                  disabled={!email || !password || loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
