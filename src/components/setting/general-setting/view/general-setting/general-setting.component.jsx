import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';
import useGeneralSetting from './use-general-setting.hook';

function GeneralSetting() {
  const {
    noOfRecords,
    prefix,
    replyToEmail,
    setPrefix,
    setReplyToEmail,
    noOfRecordsOptions,
    enableGeneralSetting,
    setEnableGenearlSettings,
    handleSaveGeneralSetting,
    handleNoOfRecords,
    register,
    errors,
    handleSubmit
  } = useGeneralSetting();
  return (
    <form
      className="tw-bg-[#FFF] tw-px-5 tw-py-8"
      onSubmit={handleSubmit(handleSaveGeneralSetting)}
    >
      <div className="tw-mt-[0.5px] tw-flex tw-justify-between">
        <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          General Settings
        </div>
        {!enableGeneralSetting && (
          <CustomButton
            label="Edit"
            text="Edit"
            onClick={() => setEnableGenearlSettings(true)}
            className="tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-md tw-border tw-border-solid tw-border-secondary-green tw-px-6 tw-py-[11.5px] tw-text-sm tw-font-bold tw-not-italic tw-leading-[normal] tw-text-secondary-green"
          />
        )}
      </div>
      <div className="tw-mt-4 tw-flex tw-gap-[17px]">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            No. of records
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              ”
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              The default list of items in each table, such as the list of offers, list of
              goods, etc., will be displayed when a specific value as a certain number of
              records is selected.
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                ”
              </span>
            </div>{' '}
          </div>

          <div className="tw-mt-2 tw-h-[39px]">
            {' '}
            <Select
              name="noOfRecords"
              placeholder="Select no of records"
              className="tw-h-[36px]"
              options={noOfRecordsOptions}
              disabled={!enableGeneralSetting}
              value={noOfRecords}
              onChange={(e, value) => handleNoOfRecords(value)}
            />
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Sender email
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              ”
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              This sender email will be used for sending all the emails via the business
              owner account such as send offer as email, send file as email etc.
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                ”
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="email"
              placeholder="Enter sender email"
              type="text"
              isRequired={true}
              register={register}
              errors={errors}
              disabled={!enableGeneralSetting}
            />
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Prefix for attachment
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              ”
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              All the attachments/files uploaded into the business owner account will be
              shown with the specific prefix and file name. (For example, 2022-filename)
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                ”
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="prefix"
              placeholder="Enter prefix for attachment"
              type="text"
              isRequired={true}
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              disabled={!enableGeneralSetting}
            />
          </div>
        </div>
      </div>

      <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-2">
        <span className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Reply to email
        </span>
        <div className="tw-mt-1 tw-items-start tw-gap-2.5 tw-rounded-lg tw-p-2.5">
          <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              ”
            </span>{' '}
            Enter the email address on which you will receive replies from end customer
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              ”
            </span>
          </div>{' '}
        </div>
        <div>
          <CustomInput
            name="reply"
            placeholder="Enter reply to email address"
            type="text"
            isRequired={true}
            value={replyToEmail}
            onChange={(e) => setReplyToEmail(e.target.value)}
            disabled={!enableGeneralSetting}
          />
        </div>
      </div>
      {enableGeneralSetting && (
        <div className="tw-mt-10 tw-flex tw-justify-end">
          <div>
            <CustomButton
              label="Save"
              text="Save"
              type="submit"
              className="tw-text-smtw-font-semibold tw-rounded-md tw-bg-[#1D4ED8] tw-px-6 tw-py-[11.5px] tw-not-italic tw-leading-[normal] tw-text-white hover:tw-bg-[#1D4ED8]"
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default GeneralSetting;
