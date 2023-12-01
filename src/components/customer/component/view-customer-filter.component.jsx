import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import DiscountGroup from '../create-customer/personal-details/components/discount-group/discount-group.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import PriceGroup from '../create-customer/personal-details/components/price-group/price-group.component';

export default function ViewCustomerFilter({
  filterRegister,
  allPriceGroup,
  setAllPriceGroup,
  selectedPriceGroup,
  setSelectedPriceGroup,
  allDiscountGroup,
  setAllDiscountGroup,
  selectedDiscountGroup,
  setSelectedDiscountGroup,
  country,
  COUNTRIES,
  onCountryChange,
  cities,
  filterHandleSubmit,
  filterControl,
  onFilterHandleSubmit,
  filterModalCloseHandler
}) {
  return (
    <div className="tw-relative">
      <form onSubmit={filterHandleSubmit(onFilterHandleSubmit)}>
        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <label className="group-label tw-text-xs tw-font-medium tw-leading-6">
              Company Name
            </label>
            <CustomInput
              type="text"
              name="companyName"
              className="form-control"
              placeholder="Enter Company Name"
              register={filterRegister}
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <label className="group-label tw-text-xs tw-font-medium tw-leading-6">
              Company Email
            </label>
            <CustomInput
              type="email"
              name="companyEmail"
              className="form-control"
              placeholder="Enter Company Email"
              register={filterRegister}
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <PriceGroup
              options={allPriceGroup}
              setOptions={setAllPriceGroup}
              selectedOptions={selectedPriceGroup}
              setSelectedOptions={setSelectedPriceGroup}
              className="tw-text-xs"
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <DiscountGroup
              options={allDiscountGroup}
              setOptions={setAllDiscountGroup}
              selectedOptions={selectedDiscountGroup}
              setSelectedOptions={setSelectedDiscountGroup}
              className="tw-text-xs"
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <CustomInput
              type="text"
              label="Country"
              name="country"
              className="form-control"
              placeholder="Enter country"
              register={filterRegister}
            />
            {/* <CustomSelect
              label="Country"
              value={country}
              type="select"
              options={COUNTRIES}
              onChange={onCountryChange}
              name="country"
              className="tw-bg-[#FCFCFC] tw-text-xs"
            /> */}
          </div>
          <hr />
          <div className="tw-mb-4 tw-flex tw-flex-col tw-gap-2">
            <CustomInput
              type="text"
              label="City"
              name="city"
              className="form-control"
              placeholder="Enter city"
              register={filterRegister}
            />
            {/* <CustomSelect
              label="City"
              name="city"
              control={filterControl}
              type="select"
              options={cities}
              className="tw-bg-[#FCFCFC] tw-text-xs"
            /> */}
          </div>
          <hr />
        </div>
        <div className="tw-fixed tw-bottom-[40px] tw-mt-5 tw-flex tw-w-full tw-max-w-[380px] tw-justify-between tw-bg-white">
          <CustomButton
            onClick={() => filterModalCloseHandler()}
            text="Clear all"
            className="btn-cancel"
          />
          <CustomButton text="Apply Filters" type="submit" className="btn-primary" />
        </div>
      </form>
    </div>
  );
}

ViewCustomerFilter.propTypes = {
  allPriceGroup: PropTypes.arrayOf,
  setAllPriceGroup: PropTypes.func,
  selectedPriceGroup: PropTypes.arrayOf,
  setSelectedPriceGroup: PropTypes.func,
  allDiscountGroup: PropTypes.arrayOf,
  setAllDiscountGroup: PropTypes.func,
  selectedDiscountGroup: PropTypes.arrayOf,
  setSelectedDiscountGroup: PropTypes.func,
  filterRegister: PropTypes.func,
  onCountryChange: PropTypes.func,
  onFilterHandleSubmit: PropTypes.func,
  filterHandleSubmit: PropTypes.func,
  filterControl: PropTypes.func,
  filterModalCloseHandler: PropTypes.func,
  COUNTRIES: PropTypes.arrayOf,
  cities: PropTypes.arrayOf,
  country: PropTypes.string
};
