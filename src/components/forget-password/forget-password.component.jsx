import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useForgetPassword from './use-forget-password.hook';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import Loader from '@/common/components/loader/loader.component';

export default function ForgetPassword() {
  const router = useRouter();
  const {
    email,
    handleSubmit,
    onSubmit,
    register,
    errors,
    borderStyle,
    borderSuc,
    loading
  } = useForgetPassword();
  return (
    <div className="form-wrapper">
      <div className="form-container ">
        <div className="form-container-header">
          <Link href="/">
            <img alt="img" src="/assets/images/logo.png" />
          </Link>
        </div>

        <div className="form-card tw-px-6">
          <div className="form-header">
            <img src="/assets/images/searchImg.png" alt="img" />
            <h1 className="tw-pt-4 tw-text-[24px] tw-font-bold tw-capitalize tw-not-italic tw-leading-9 tw-text-[#131516]">
              Find Your Account
            </h1>
            <p className="tw-pt-2 tw-text-center tw-text-[16px] tw-font-medium tw-not-italic tw-leading-[24px] tw-text-[#46474F]">
              Enter the email associated with your account to change your password.
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-items-center tw-pb-0 tw-pt-[36px]">
            <form method="post" className="tw-w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group-c">
                <label className="form-group-c-label">
                  Email <span className="form-group-c-label-span ">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  name="email"
                  className="form-group-c-input"
                  placeholder="example@example.com"
                  style={errors.email ? borderStyle : borderSuc}
                />
                {/* <div className="forgot-password-validation">
                  <div>{errors.email}</div>
                </div> */}
              </div>
              <div className="form-btn-c tw-mt-8 tw-flex  tw-justify-center">
                <CustomButton
                  type="submit"
                  className="btn-primary tw-h-[50px] tw-w-full tw-rounded-xl tw-px-[30px] tw-py-3 tw-text-sm tw-font-semibold tw-leading-[17px]"
                  text={!loading && 'Send Reset Link'}
                  startIcon={<Loader loading={loading} />}
                  disabled={!email || loading}
                />
              </div>
              <div className="form-btn-c tw-flex tw-justify-center">
                <span
                  onClick={() => {
                    router.push('/login');
                  }}
                  className="inner-link tw-mt-6 tw-text-xs tw-leading-[18px] tw-text-text-dark-gray tw-no-underline"
                >
                  Back to Login
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
