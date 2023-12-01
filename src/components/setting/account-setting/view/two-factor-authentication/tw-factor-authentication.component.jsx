import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import useTwoFactorAuthentication from './use-two-factor-authentication.hook';

function TwoFactorAuthentication() {
  const { auth, handleSwitchTwoFactorAuth } = useTwoFactorAuthentication();
  return (
    <div className="tw-bg-[#FFF] tw-px-5 tw-py-8">
      <div className="tw-mt-[0.5px]">
        <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Two Factor Authentication
        </div>
      </div>
      <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-2">
        <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Mobile Number
        </div>
        <div className="tw-flex tw-max-w-[307px] tw-items-center tw-rounded-md tw-bg-[#E4E4E440] tw-py-[11px] tw-pl-2 tw-pr-[186px] tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
          + {auth && auth.phone}
        </div>
      </div>

      <div className="tw-mt-4 tw-flex tw-items-center tw-gap-4">
        <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Two Factor Authentication
        </div>
        <CustomSwitch
          type="switch"
          className="tw-h-5 tw-w-10 tw-flex-col-reverse"
          name="isVat"
          defaultChecked={auth && auth.isTwoFactorAuth}
          onChange={handleSwitchTwoFactorAuth}
        />
      </div>
      <div className="tw-mt-[26px] tw-flex tw-gap-[17px] tw-rounded-lg tw-bg-[#E4E4E440]">
        <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#FBFBFB] tw-p-2.5">
          <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
            ”
          </span>{' '}
          <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
            Two-factor authentication is a process that adds an extra layer of security to
            your account, by asking you to verify your identity using authentication codes
            sent to your mobile number. When you enable this process, every time you log
            into Quicksteps, you will be asked to enter the ONE TIME PASSWORD that is sent
            to your mobile number. You can use one OTP for one attempt.
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              ”
            </span>
          </div>{' '}
        </div>
      </div>
    </div>
  );
}

export default TwoFactorAuthentication;
