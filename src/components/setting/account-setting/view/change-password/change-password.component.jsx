import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import useChangePassword from './change-password.hook';

function ChangePassword() {
  const { register, errors, handleSubmit, handleChangePassword } = useChangePassword();
  return (
    <div className="tw-px-5 tw-py-8">
      <div className="tw-mt-[0.5px] tw-flex tw-justify-between">
        <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Change Password
        </div>
      </div>

      <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
        <div className="tw-relative">
          <CustomInput
            label="Old password"
            name="oldPassword"
            errors={errors}
            register={register}
            placeholder="Enter old password"
            type="password"
            className="tw-max-w-[327px]"
            isRequired={true}
          />
        </div>
        <div className="tw-relative">
          <CustomInput
            label="New password"
            name="newPassword"
            errors={errors}
            register={register}
            placeholder="Enter new password"
            type="password"
            className="tw-max-w-[327px]"
            isRequired={true}
          />
        </div>
        <div className="tw-relative">
          <CustomInput
            label="Confirm password"
            name="confirmPassword"
            errors={errors}
            register={register}
            placeholder="Enter confirm password"
            type="password"
            className="tw-max-w-[327px]"
            isRequired={true}
          />
        </div>
      </div>

      <div className="tw-mt-[31px] tw-flex tw-justify-between">
        <div />
        <div>
          <CustomButton
            label="Save"
            text="Save"
            onClick={handleSubmit(handleChangePassword)}
            className="tw-text-smtw-font-semibold tw-rounded-md tw-bg-[#1D4ED8] tw-px-6 tw-py-[11.5px] tw-not-italic tw-leading-[normal] tw-text-white hover:tw-bg-[#1D4ED8]"
          />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
