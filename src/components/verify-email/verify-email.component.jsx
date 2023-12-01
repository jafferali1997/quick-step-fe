import Link from 'next/link';
import useVerifyEmail from './use-verify-email.hook';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import Loader from '@/common/components/loader/loader.component';

export default function VerifyEmail() {
  const { resendLinkHandler, email, loading } = useVerifyEmail();
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-container-header">
          <Link href="/">
            <img alt="img" src="/assets/images/logo.png" />
          </Link>
        </div>

        <div className="form-card tw-px-[24px]">
          <div className=" tw-flex tw-flex-col tw-items-center tw-py-0">
            <img alt="img" src="/assets/images/mail_i.png" />
            <h1 className=" tw-pt-[15px] tw-text-2xl tw-text-[24px] tw-font-bold tw-capitalize tw-not-italic tw-leading-9 tw-text-[#131516]">
              Check your mail
            </h1>
            <p className="tw-mt-2 tw-text-center tw-font-dm tw-text-[14px] tw-font-medium tw-not-italic tw-leading-[17px] tw-text-text-medium-gray">
              We’ve sent a verification email to{' '}
              <span className="tw-text-[#2C2E3E] tw-underline">{email}</span>
            </p>
          </div>
          <div className="form-body tw-mt-[24px] tw-p-0">
            <h3 className="tw-text-[14px] tw-font-semibold tw-not-italic tw-leading-[21px] tw-text-[#161618]">
              Click the link of your email to verify your account.
            </h3>
            <p className="tw-pt-3 tw-text-center tw-text-[12px] tw-font-normal tw-not-italic tw-leading-[18px] tw-text-[#494949]">
              If you have trouble finding your email, check your spam folder for an email
              from noreply@example.com
            </p>
            <span className="tw-mt-[32px] tw-text-[12px] tw-font-medium tw-not-italic tw-leading-[18px] tw-text-[#494949]">
              Didn’t receive an email?
            </span>
            <div className="form-btn-c tw-mt-[16px] tw-w-full">
              <CustomButton
                type="submit"
                text={!loading && 'Resend Verification'}
                className="btn-primary tw-h-[50px] tw-w-full tw-text-sm tw-font-semibold tw-leading-[17px]"
                onClick={resendLinkHandler}
                startIcon={<Loader loading={loading} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
