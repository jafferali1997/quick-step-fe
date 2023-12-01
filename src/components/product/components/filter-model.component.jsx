import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import Select from '@/common/components/select/select.component';
import PriceGroup from '@/components/customer/create-customer/personal-details/components/price-group/price-group.component';
import DiscountGroup from '@/components/customer/create-customer/personal-details/components/discount-group/discount-group.component';

export default function FilterModel({
  allPriceGroup,
  setAllPriceGroup,
  selectedPriceGroup,
  setSelectedPriceGroup,
  allDiscountGroup,
  setAllDiscountGroup,
  selectedDiscountGroup,
  setSelectedDiscountGroup,
  handleSubmit,
  onSubmitFilterForm,
  register,
  options,
  handleSelectProduct,
  productCategories,
  parentCategoryOptions,
  parentCategoryLevel1Options,
  parentCategoryLevel2Options,
  parentCategoryLevel3Options
}) {
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit(onSubmitFilterForm)}>
        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Select
              name="productName"
              label="Select Product Name"
              options={options}
              onChange={(e, value) => handleSelectProduct(value)}
              defaultValue="Select Product Name"
              register={register}
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Select
              name="productCategory"
              label="Select Product Category"
              options={parentCategoryOptions}
              defaultValue="Select Product Category"
              register={register}
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Select
              name="subCategory1"
              label="Select Sub-Category Level 1"
              defaultValue="Select Sub-Category Level 1"
              options={parentCategoryLevel1Options}
              register={register}
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Select
              name="subCategory2"
              label="Select Sub-Category Level 2"
              options={parentCategoryLevel2Options}
              defaultValue="Select Sub-Category Level 2"
              register={register}
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Select
              name="subCategory3"
              label="Select Sub-Category Level 3"
              options={parentCategoryLevel3Options}
              defaultValue="Select Sub-Category Level 3"
              register={register}
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
        </div>
        <div className="tw-mt-5 tw-flex tw-justify-between">
          <CustomButton
            // onClick={filterModalCloseHandler}
            text="Clear all"
            className="btn-cancel"
          />
          <CustomButton text="Apply Filters" type="submit" className="btn-primary" />
        </div>
      </form>
    </div>
  );
}
FilterModel.propTypes = {
  allPriceGroup: PropTypes.arrayOf,
  setAllPriceGroup: PropTypes.func,
  selectedPriceGroup: PropTypes.arrayOf,
  setSelectedPriceGroup: PropTypes.func,
  allDiscountGroup: PropTypes.arrayOf,
  setAllDiscountGroup: PropTypes.func,
  selectedDiscountGroup: PropTypes.arrayOf,
  setSelectedDiscountGroup: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmitFilterForm: PropTypes.func,
  options: PropTypes.arrayOf,
  register: PropTypes.func,
  handleSelectProduct: PropTypes.func,
  productCategories: PropTypes.arrayOf,
  parentCategoryOptions: PropTypes.arrayOf,
  parentCategoryLevel1Options: PropTypes.arrayOf,
  parentCategoryLevel2Options: PropTypes.arrayOf,
  parentCategoryLevel3Options: PropTypes.arrayOf
};
