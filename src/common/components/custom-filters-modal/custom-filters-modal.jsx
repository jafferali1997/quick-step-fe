import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/common/components/modal/modal.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomSwitch from '../custom-switch/custom-switch.component';
import CustomInput from '../custom-input/custom-input.component';

export default function FiltersModal({
  show,
  onClose,
  handleSubmit,
  register,
  onSubmitFilterForm,
  selectedNoOfItems,
  setSelectedNoOfItems,
  selectedNetPrice,
  setSelectedNetPrice,
  selectedGrossPrice,
  setSelectedGrossPrice
}) {
  return (
    <form onSubmit={handleSubmit(onSubmitFilterForm)}>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Body Text
          </p>
          <div className="tw-flex tw-items-center tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-1 tw-text-sm">
            <div className="tw-relative tw-flex tw-items-center">
              <select
                {...register('selectedOption')}
                name="selectedOption"
                className=" tw-mr-2 tw-pl-2 tw-pr-2 tw-outline-none"
              >
                <option value="start">Start with</option>
                <option value="contains">Contain</option>
                <option value="end">End with</option>
              </select>
            </div>
            <input
              {...register('bodyText')}
              name="bodyText"
              type="text"
              className="tw-appearance-none tw-border-l tw-border-gray-300 tw-bg-transparent tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none"
              placeholder="Enter text"
            />
          </div>
        </div>
        {/* <hr />
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            No of Product
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="No items"
                checked={selectedNoOfItems === 'noItems'}
                onChange={() => {
                  setSelectedNoOfItems('noItems');
                }}
              />
              <label
                htmlFor="No items"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                No items
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="1-30 items"
                checked={selectedNoOfItems === '1-30'}
                onChange={() => {
                  setSelectedNoOfItems('1-30');
                }}
              />
              <label
                htmlFor="1-30 items"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                1 - 30 items
              </label>
            </div>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="50-100 items"
                checked={selectedNoOfItems === '50-100'}
                onChange={() => {
                  setSelectedNoOfItems('50-100');
                }}
              />
              <label
                htmlFor="50-100 items"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                50 - 100 items
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="above 100 items"
                checked={selectedNoOfItems === '50 - 100'}
                onChange={() => {
                  setSelectedNoOfItems('50 - 100');
                }}
              />
              <label
                htmlFor="above 100 items"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Above 100 items
              </label>
            </div>
          </div>
        </div> */}
        <hr />
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Net Price
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
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                €100 - €999
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
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                €1000 - €2000
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
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                €2000 - above
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Gross Price
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="grossPriceRange"
                value="100-999"
                checked={selectedGrossPrice === '100-999'}
                onChange={() => {
                  setSelectedGrossPrice('100-999');
                }}
              />
              <label
                htmlFor="grossPriceRange"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                €100 - €999
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="grossPriceRange"
                value="1000-2000"
                checked={selectedGrossPrice === '1000-2000'}
                onChange={() => {
                  setSelectedGrossPrice('1000-2000');
                }}
              />
              <label
                htmlFor="grossPriceRange"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                €1000 - €2000
              </label>
            </div>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="grossPriceRange"
                value="2000-above"
                checked={selectedGrossPrice === '2000-above'}
                onChange={() => {
                  setSelectedGrossPrice('2000-above');
                }}
              />
              <label
                htmlFor="grossPriceRange"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                €2000 - above
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            VAT
          </p>
          <div className="tw-flex tw-items-center tw-gap-2">
            <label className="group-label tw-text-xs tw-font-medium tw-leading-6">
              Enable
            </label>
            <CustomSwitch
              type="switch"
              className="tw-h-4 tw-h-5 tw-w-4 tw-flex-col-reverse"
              name="isVat"
              register={register}
            />
          </div>
        </div>
        <hr />
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Delivery Date
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center tw-gap-4">
            <div className="tw-flex tw-min-w-[180px] tw-items-center">
              <CustomInput
                label="Start Date"
                placeholder="03/13/2023"
                type="date"
                name="deliveryDateStart"
                register={register}
              />
            </div>
            <div className="tw-flex tw-min-w-[180px] tw-items-center">
              <CustomInput
                label="End Date"
                placeholder="03/13/2023"
                type="date"
                name="deliveryDateEnd"
                register={register}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="tw-mb-8 tw-flex tw-flex-col tw-gap-2 ">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Creation Date
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center tw-gap-4">
            <div className="tw-flex tw-min-w-[180px] tw-items-center">
              <CustomInput
                label="Start Date"
                placeholder="03/13/2023"
                type="date"
                name="creationDateStart"
                register={register}
              />
            </div>
            <div className="tw-flex tw-min-w-[180px] tw-items-center">
              <CustomInput
                label="End Date"
                placeholder="03/13/2023"
                type="date"
                name="creationDateEnd"
                register={register}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tw-fixed tw-bottom-[40px] tw-mt-5 tw-flex tw-w-full tw-max-w-[380px] tw-justify-between tw-bg-white ">
        <CustomButton onClick={onClose} text="Clear all" className="btn-cancel" />
        <CustomButton text="Apply Filters" type="submit" className="btn-primary" />
      </div>
    </form>
  );
}

FiltersModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmitFilterForm: PropTypes.func.isRequired,
  setSelectedNoOfItems: PropTypes.func.isRequired,
  setSelectedNetPrice: PropTypes.func.isRequired,
  setSelectedGrossPrice: PropTypes.func.isRequired,
  filterModalCloseHandler: PropTypes.func.isRequired,
  selectedNoOfItems: PropTypes.string.isRequired,
  selectedNetPrice: PropTypes.string.isRequired,
  selectedGrossPrice: PropTypes.string.isRequired
};
