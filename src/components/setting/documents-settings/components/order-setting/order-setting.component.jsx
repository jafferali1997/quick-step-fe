/* eslint-disable react/no-unescaped-entities */
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomRadioGroup from '@/common/components/custome-radio-group/radio-group';
import { TRIGGER_ACTION_OPTIONS } from '@/common/constants/document-setting.constant';
import { ORDER_STATUS_OPTIONS } from '@/common/constants/document-status-options.constant';
import useOrderSetting from './use-order-setting.hook';

export default function OrderSetting() {
  const {
    register,
    handleSubmit,
    errors,
    handleOrderSettingSubmit,
    selectedTriggerAction,
    setSelectedTriggerAction,
    selectedTriggerPoint,
    setSelectedTriggerPoint,
    handleInputKeyDown,
    removeEmail,
    setEmail,
    taggedEmails,
    email
  } = useOrderSetting();

  const colors = ['red', 'blue', 'green'];

  return (
    <div className="tw-rounded-[10px] tw-bg-white tw-px-5 tw-py-8">
      <h3 className="tw-overflow-hidden tw-text-ellipsis tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
        Order Setting
      </h3>
      <div className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-[17px]">
        <div className="tw-flex tw-w-full tw-max-w-[347px] tw-flex-col tw-gap-2">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Order expiry
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              select date from the date picker, cannot select the past date
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                "
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="orderExpiry"
              placeholder="Enter expiry"
              type="text"
              isRequired={true}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className="tw-flex tw-w-full tw-max-w-[347px] tw-flex-col tw-gap-2">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Order number prefix
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              The "Prefix" field adds a customizable text or alphanumeric sequence to
              order numbers
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                "
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="orderNumberPrefix"
              placeholder="Enter order number prefix"
              type="text"
              isRequired={true}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className="tw-flex tw-w-full tw-max-w-[347px] tw-flex-col tw-gap-2">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Order number suffix
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              The "Suffix" field complements the order number by allowing you to append a
              customizable text
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                "
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="orderNumberSuffix"
              placeholder="Enter order number suffix"
              type="text"
              isRequired={true}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="tw-mt-6 tw-flex tw-w-full tw-flex-col tw-gap-2">
        <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Order number offset
        </span>
        <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
          <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
            "
          </span>{' '}
          <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
            By setting an offset, you can begin your order numbering sequence at a
            predetermined value, ensuring consistency, and alignment with your business
            processes or historical data.
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>
          </div>{' '}
        </div>
        <div className="tw-mt-2">
          <CustomInput
            name="orderNumberOffset"
            placeholder="Enter order number offset"
            type="text"
            isRequired={true}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-gap-2">
        <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Email sent
        </span>
        <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
          <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
            "
          </span>{' '}
          <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
            Whenever the order document is booked, the email will be send to the entered
            email addresses with PDF of order document
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>
          </div>{' '}
        </div>
        <div className="tw-mt-2">
          <div className="tw-flex tw-gap-3">
            {taggedEmails.map(({ email }, index) => (
              <div className="tag tw-flex tw-w-fit tw-items-center tw-gap-2.5 tw-rounded-[26px] tw-border tw-border-solid tw-border-disabled-input tw-px-2 tw-py-1">
                <div
                  className="tw-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-[50%] tw-bg-[#2563EB]"
                  style={{ background: `${colors[index % colors.length]}` }}
                >
                  <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[100%] tw-text-white">
                    {email?.charAt(0)}
                  </p>
                </div>
                <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-medium-gray">
                  {email}
                </p>
                <div onClick={() => removeEmail(index)}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_10275_252432)">
                      <path
                        d="M4.73291 4.0078L7.848 0.892657C8.05071 0.690027 8.05071 0.362392 7.848 0.159785C7.64537 -0.0428452 7.31774 -0.0428452 7.11513 0.159785L3.99996 3.2749L0.884918 0.159785C0.68219 -0.0428452 0.354677 -0.0428452 0.152046 0.159785C-0.050682 0.362416 -0.050682 0.690027 0.152046 0.892657L3.26707 4.0078L0.15207 7.12292C-0.0506577 7.32555 -0.0506577 7.65318 0.15207 7.85579C0.200135 7.90399 0.257251 7.94222 0.320136 7.96828C0.383021 7.99434 0.450435 8.00772 0.518506 8.00764C0.651164 8.00764 0.78387 7.95686 0.884942 7.85579L3.99996 4.74067L7.11513 7.85579C7.1632 7.90399 7.22032 7.94221 7.2832 7.96827C7.34609 7.99433 7.4135 8.00771 7.48157 8.00764C7.61422 8.00764 7.74693 7.95686 7.848 7.85579C8.05071 7.65316 8.05071 7.32555 7.848 7.12292L4.73291 4.0078Z"
                        fill="#585858"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_10275_252432">
                        <rect width="8" height="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="tw-mt-4">
            <CustomInput
              classNames={{ input: 'tw-h-[20px] !tw-p-[0px]' }}
              placeholder="Enter Email of Recipient"
              isRequired={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        </div>
      </div>
      <div className="tw-mt-4">
        <h3 className="tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Select the case what you want to trigger action on inventory
        </h3>
        <div className="tw-mt-4">
          <CustomRadioGroup
            value={selectedTriggerAction} // Set the selected value
            options={TRIGGER_ACTION_OPTIONS}
            onChange={(e) => setSelectedTriggerAction(e.target.value)}
          />
        </div>
      </div>
      <div className="tw-mt-6">
        <h3 className="tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Select Invoice status when the above action trigger(at which status?)
        </h3>
        <div className="tw-mt-4">
          <CustomRadioGroup
            value={selectedTriggerPoint} // Set the selected value
            options={ORDER_STATUS_OPTIONS}
            onChange={(e) => setSelectedTriggerPoint(e.target.value)}
          />
        </div>
      </div>

      <div className="tw-mt-6 tw-flex tw-w-full tw-justify-end">
        <CustomButton
          className="btn-primary"
          text="Save"
          onClick={handleSubmit(handleOrderSettingSubmit)}
        />
      </div>
    </div>
  );
}
