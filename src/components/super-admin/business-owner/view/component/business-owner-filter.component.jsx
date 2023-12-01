import React from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import EuroIcon from '@/common/icons/euro.icon';
import CustomButton from '@/common/components/custom-button/custom-button.component';

export default function BusinessOwnerFilter({
  countries,
  control,
  errors,
  register,
  show,
  onClose,
  handleSubmit,
  selectedNetPrice,
  setSelectedNetPrice,
  onSubmitFilterForm
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFilterForm)}>
        <div className="tw-pb-4">
          <CustomInput
            label="Country"
            control={control}
            name="country"
            register={register}
            placeholder="Enter country"
            type="text"
            errors={errors}
            className="tw-text-sm"
          />
        </div>
        <hr />

        <div className="tw-py-4">
          <CustomInput
            label="city"
            control={control}
            name="city"
            register={register}
            placeholder="Enter city"
            type="text"
            errors={errors}
            className="tw-text-sm"
          />
        </div>
        <hr />
        <div className="tw-flex tw-flex-col tw-gap-2 tw-py-4">
          <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
            Credits
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center tw-gap-4">
            <div className="tw-flex tw-min-w-[180px] tw-items-center">
              <CustomInput
                placeholder="To"
                startIcon={<EuroIcon />}
                type="number"
                name="to"
                register={register}
              />
            </div>
            <div className="tw-flex tw-min-w-[180px] tw-items-center">
              <CustomInput
                type="number"
                name="from"
                placeholder="From"
                startIcon={<EuroIcon />}
                register={register}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="tw-flex tw-flex-col tw-gap-2 tw-pb-[33px] tw-pt-4">
          <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
            Plan type
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="netPriceRange"
                value="100-999"
                checked={selectedNetPrice === '100-999'}
                onChange={() => {
                  setSelectedNetPrice('100-999');
                }}
              />
              <label
                htmlFor="netPriceRange"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Free trial
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="netPriceRange"
                value="1000-2000"
                checked={selectedNetPrice === '1000-2000'}
                onChange={() => {
                  setSelectedNetPrice('1000-2000');
                }}
              />
              <label
                htmlFor="netPriceRange"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Basic plan
              </label>
            </div>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="netPriceRange"
                value="2000-above"
                checked={selectedNetPrice === '2000-above'}
                onChange={() => {
                  setSelectedNetPrice('2000-above');
                }}
              />
              <label
                htmlFor="netPriceRange"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Business plan
              </label>
            </div>
            <div className="tw-flex tw-items-center">
              <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
                <input
                  type="checkbox"
                  className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                  name="netPriceRange"
                  value="2000-above"
                  checked={selectedNetPrice === '2000-above'}
                  onChange={() => {
                    setSelectedNetPrice('2000-above');
                  }}
                />
                <label
                  htmlFor="netPriceRange"
                  className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
                >
                  Enterprise plan
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className=" tw-flex tw-w-full tw-max-w-[380px] tw-justify-between tw-bg-white tw-pt-[22px] ">
          <CustomButton onClick={onClose} text="Clear all" className="btn-cancel" />
          <CustomButton text="Apply Filters" type="submit" className="btn-primary" />
        </div>
      </form>
    </div>
  );
}
BusinessOwnerFilter.propTypes = {
  countries: PropTypes.arrayOf,
  errors: PropTypes.arrayOf,
  show: PropTypes.bool,
  selectedNetPrice: PropTypes.bool,
  onClose: PropTypes.func,
  setSelectedNetPrice: PropTypes.func,
  onSubmitFilterForm: PropTypes.func,
  control: PropTypes.func,
  register: PropTypes.func,
  handleSubmit: PropTypes.func
};
