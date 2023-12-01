/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import useProductSetting from './use-product.component';

export default function ProductSetting() {
  const { register, handleSubmit, errors, handleProductSettingSubmit } =
    useProductSetting();

  return (
    <div className="  tw-rounded-[10px] tw-bg-white tw-px-5 tw-py-8">
      <h3 className="tw-overflow-hidden tw-text-ellipsis tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
        Product Setting
      </h3>
      <div className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-[17px]">
        <div className="tw-flex tw-w-full tw-flex-col tw-gap-2 sm:tw-max-w-[100%] lg:tw-max-w-[430px] xl:tw-max-w-[530px]">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Product number prefix
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              “ The "Prefix" field adds a customizable text or alphanumeric sequence to
              products numbers, enabling unique identification and categorization, making
              offer Read more management more organized and informative.
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                "
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="productNumberPrefix"
              placeholder="Enter product number prefix"
              type="text"
              isRequired={true}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className="tw-flex tw-w-full tw-flex-col tw-gap-2 sm:tw-max-w-[100%] lg:tw-max-w-[430px] xl:tw-max-w-[530px]">
          <span className="tw-text-ellipsis tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Product number suffix
          </span>
          <div className="tw-flex tw-items-start tw-rounded-lg tw-bg-[#e4e4e466] tw-p-2.5">
            <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
              "
            </span>{' '}
            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-text-medium-gray">
              “ The "Suffix" field complements the products number by allowing you to
              append a customizable text or alphanumeric sequence at its end, facilitating
              Read more additional contextual information...
              <span className="tw-text-2xl tw-font-normal tw-not-italic tw-leading-[20.5px] tw-text-black">
                "
              </span>
            </div>{' '}
          </div>
          <div className="tw-mt-2">
            <CustomInput
              name="productNumberSuffix"
              placeholder="Enter product number suffix"
              type="text"
              isRequired={true}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="tw-mt-6 tw-flex tw-w-full tw-justify-end">
        <CustomButton
          className="btn-primary"
          text="Save"
          onClick={handleSubmit(handleProductSettingSubmit)}
        />
      </div>
    </div>
  );
}
