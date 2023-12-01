/* eslint-disable react/forbid-prop-types */

'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { TagsInput } from 'react-tag-input-component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import TextArea from '@/common/components/text-area/text-area.component';
import EuroIcon from '@/common/icons/euro.icon';
import ProductGroup from '../product-group/product-group.component';
import ProductModal from '../product-modal/product-modal.component';
import useProductForm from './use-product-form.hook';
import SelectWithModel from '@/common/components/selectwithmodel/select-with-model.component';
import ArrowDownIcon from '@/common/icons/arrow-down.icon';
import WhiteArrowDown from '@/common/icons/white-arrow-down.icon';
import useClickOutside from '@/common/hooks/use-click-outside';
import Select from '@/common/components/select/select.component';

export default function ProductForm({
  priceInputValues,
  handlePriceInput = null,
  discountInputValues,
  handleDiscountInput = null,
  selectedTag,
  handleTags = null,
  onSubmit = null,
  handleSubmit = null,
  register = null,
  categories = null,
  handleClickCategory = null,
  selectedCategory = [],
  setSelectedCategory = null,
  errors = null,
  data = {},
  disabled = false,
  control,
  trigger,
  formRef,
  setValue,
  taxRate,
  setTaxRate,
  selectedUnit,
  setSelectedUnit
}) {
  const {
    parentCategory,
    handleClickParentCategory,
    handleClickSubCategory,
    categoryToMap,
    handleSelectCategory,
    handleRemoveSelectedCategory,
    handleModalData,
    modalData,
    openPopup,
    setOpenPopup,
    handleModalSubmit,
    handleDeleteGroup,
    setOpenDropdown,
    openDropdown,
    setSearch,
    search,
    ref,
    actionType,
    netPrice,
    setNetPrice,
    grossPrice,
    setGrossPrice,
    openMenuPopup,
    setOpenMenuPopup,
    openMenuPopupRef,
    openMenu2Popup,
    setOpenMenu2Popup,
    openMenu2PopupRef,
    onChangeGross,
    onChangeNet,
    onBlurGross,
    onBlurNet,
    filteredPriceGroup,
    filteredDiscountGroup,
    taxRateList,
    unitList
  } = useProductForm(
    categories,
    handleDiscountInput,
    handlePriceInput,
    setSelectedCategory,
    selectedCategory,
    handleClickCategory,
    setValue,
    taxRate,
    setTaxRate,
    data
  );

  const router = useRouter();
  useClickOutside(
    [openMenuPopupRef, openMenu2PopupRef],
    [setOpenMenuPopup, setOpenMenu2Popup]
  );

  return (
    <div className="content">
      <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[24px] ">
        <form
          ref={formRef}
          onSubmit={
            disabled
              ? () => {}
              : handleSubmit((val) => onSubmit(val, netPrice, grossPrice))
          }
        >
          <div className="tw-flex tw-items-center tw-justify-between tw-py-[24px]">
            <div className="tw-flex tw-items-center tw-gap-[16px]">
              <img
                role="presentation"
                onClick={() => {
                  router.back();
                }}
                src="/assets/images/back-icon.svg"
                alt="img"
                className="hover:tw-cursor-pointer"
              />
              <h1 className="admin-top-heading ">
                {Object.keys(data).length ? (disabled ? 'View' : 'Edit') : 'Add'} Product
              </h1>
              <p className="admin-top-p">
                {Object.keys(data).length ? `Item Number #: ${data.displayId}` : ''}
              </p>
            </div>

            {disabled && (
              <CustomButton
                onClick={() => {
                  router.push(`/product/edit/${data.id}`);
                }}
                className="btn-primary tw-text-sm tw-font-bold tw-leading-[21px]"
                text="Edit"
              />
            )}
          </div>
          <div className="2bars tw-mb-[128px] tw-flex tw-gap-[24px] xs:tw-flex-col-reverse xs:tw-flex-wrap lg:tw-flex-row lg:tw-flex-nowrap">
            <div className="main-content tw-w-full tw-pb-5">
              <div className="form-box  ">
                <h3 className="form-box-heading ">Basic Details</h3>
                <div className="tw-mt-[16px] tw-w-full">
                  <CustomInput
                    label="Product name"
                    name="productName"
                    placeholder="Product name"
                    type="text"
                    defaultValue={data.productName}
                    className="tw-h-11"
                    disabled={disabled}
                    register={register}
                    errors={errors}
                    isRequired={true}
                  />
                  <h3 className="tw-mb-2 tw-mt-[16px] tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                    Description{' '}
                  </h3>
                  <TextArea
                    name="description"
                    placeholder="Description"
                    type="textarea"
                    defaultValue={data.description}
                    disabled={disabled}
                    register={register}
                    errors={errors}
                    isRequired={true}
                  />
                </div>
              </div>
              <div className="form-box tw-mt-[16px]  ">
                <h3 className="form-box-heading ">Inventory</h3>
                <div className="form-box-grid">
                  <CustomInput
                    label="Number Of Piece "
                    name="quantity"
                    defaultValue={data.quantity}
                    register={register}
                    errors={errors}
                    disabled={disabled}
                    placeholder="Number Of Piece "
                    type="number"
                    className="tw-h-11"
                  />

                  <CustomSelect
                    label="Units"
                    name="unit"
                    control={control}
                    register={register}
                    errors={errors}
                    disabled={disabled}
                    defaultValue="Select units"
                    className="tw-normal-case"
                    options={[
                      ...(unitList?.data?.map((item) => ({
                        label: item.unit.toString(),
                        value: item.id
                      })) || [])
                    ]}
                  />
                  <CustomInput
                    label="Manufacture"
                    name="manufacturer"
                    placeholder="Enter Manufacture"
                    type="text"
                    defaultValue={data.manufacturer}
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="Storage Location"
                    name="storageLocation"
                    placeholder="Enter Storage Location"
                    type="text"
                    defaultValue={data.storageLocation}
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="SKU"
                    name="sku"
                    placeholder="Enter SKU"
                    type="text"
                    defaultValue={data.sku}
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="Product Number "
                    name="productNumber"
                    placeholder="Enter Product Number "
                    type="number"
                    defaultValue={data.productNumber}
                    disabled={disabled}
                    register={register}
                    errors={errors}
                    isRequired={true}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="Notice "
                    name="notice "
                    placeholder="Enter Notice "
                    type="text"
                    defaultValue={data.notice}
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="GTIN/EAN "
                    name="gtinEan "
                    placeholder="Enter GTIN/EAN "
                    type="text"
                    defaultValue={data.gtinEan}
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    className="tw-h-11"
                  />
                </div>
              </div>
              <div className="form-box  tw-mt-[16px]  ">
                <h3 className="form-box-heading ">Pricing</h3>
                <div className="form-box-grid">
                  <CustomInput
                    label="Net price"
                    name="netPrice"
                    defaultValue={data.netPrice}
                    // value={data?.netPrice ? Number(data?.netPrice) : Number(netPrice)}
                    value={Number(netPrice)}
                    onChange={onChangeNet}
                    onBlur={onBlurNet}
                    placeholder="Enter net price "
                    type="number"
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    endIcon={<EuroIcon />}
                    isRequired={true}
                    className="tw-h-11"
                  />

                  <CustomInput
                    label="Gross price"
                    name="grossPrice"
                    defaultValue={data.grossPrice}
                    // value={
                    //   data?.grossPrice ? Number(data?.grossPrice) : Number(grossPrice)
                    // }
                    value={Number(grossPrice)}
                    onChange={onChangeGross}
                    onBlur={onBlurGross}
                    placeholder="Enter Gross price "
                    type="number"
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    endIcon={<EuroIcon />}
                    isRequired={true}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="Purchase price "
                    name="purchasePrice"
                    defaultValue={data.purchasePrice}
                    placeholder="Enter Purchase price "
                    type="text"
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    endIcon={<EuroIcon />}
                    className="tw-h-11"
                  />
                  <CustomInput
                    label="Minimum selling price"
                    name="minSellingPrice"
                    placeholder="Enter Minimum selling price"
                    type="text"
                    defaultValue={data.minSellingPrice}
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    endIcon={<EuroIcon />}
                    className="tw-h-11"
                  />
                  <input
                    type="hidden"
                    name="taxRateId"
                    control={control}
                    register={register}
                  />
                  <SelectWithModel
                    label="Tax Rate"
                    name="taxRate"
                    register={register}
                    errors={errors}
                    placeholder="Enter tax rate"
                    options={[
                      {
                        label: 'Add Tax Rate',
                        isLink: '/product'
                      },
                      ...(taxRateList?.data?.map((item) => ({
                        label: item.taxRate.toString(),
                        value: item.id
                      })) || [])
                    ]}
                    value={taxRate}
                    onChange={(e, value) => {
                      setTaxRate({
                        value: value.value,
                        label: value.label
                      });
                    }}
                  />

                  {/* <Select
                    label="Tax Rate"
                    name="taxRate"
                    register={register}
                    errors={errors}
                    placeholder="Enter tax rate"
                    options={[
                      ...(taxRateList?.data?.map((item) => ({
                        label: item.taxRate.toString(),
                        value: item.id
                      })) || [])
                    ]}
                    value={taxRate}
                    onChange={(e, value) => {
                      setTaxRate({
                        value: value.value,
                        label: value.label
                      });
                    }}
                  /> */}
                </div>
              </div>
              {/* <div className="form-box tw-mb-[32px] tw-mt-[16px]  ">
                <div className="tw-flex tw-items-end tw-justify-between">
                  <h3 className="form-box-heading ">Attributes</h3>
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[21px] tw-text-primary tw-underline">
                    Add more attribute
                  </p>
                </div>
                <div className="form-box-grid">
                  <CustomInput
                    label="Attribute Name "
                    name="purchasePrice"
                    // defaultValue={data.purchasePrice}
                    placeholder="Enter Attribute Name "
                    type="text"
                    register={register}
                    disabled={disabled}
                    errors={errors}
                    endIcon={<EuroIcon />}
                    className="tw-h-11"
                  />
                  <CustomSelect
                    label="Attribute Value"
                    name="attributeValue"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue="Enter Attribute Value"
                    className="tw-normal-case"
                    options={[{ label: 'option', value: 'option' }]}
                  />
                </div>
              </div> */}
            </div>
            <div className="right-side tw-h-fit lg:tw-sticky lg:tw-top-4">
              <div className="form-box tw-w-[336px] tw-p-[20px]">
                <h3 className="form-box-heading ">Product Organization</h3>
                <div className="tw-mt-[16px] tw-flex tw-w-full tw-flex-col tw-gap-[16px]">
                  <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[100%] tw-text-text-black">
                    Product Category
                  </label>
                  <div className="tw-relative" ref={ref}>
                    <CustomInput
                      placeholder="Select product category"
                      name="category"
                      className="tw-h-11"
                      disabled={disabled}
                      onChange={(e) => setSearch(e.target.value)}
                      {...(!disabled && {
                        onClick: () => setOpenDropdown(true)
                      })}
                      errors={errors}
                    />
                    {!disabled && openDropdown && (
                      <div className="tw-absolute tw-z-50 tw-max-h-[200px] tw-w-[296px] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-bg-white">
                        {parentCategory.length > 0 && (
                          <div className="head tw-flex tw-h-[35px] tw-w-[296px] tw-items-center tw-border-b tw-border-solid tw-border-b-disabled-input tw-py-[7px] tw-pr-0">
                            <div
                              className="head tw-flex tw-h-[35px] tw-items-center tw-border-b tw-border-solid tw-border-b-disabled-input tw-py-[7px] tw-pl-4 tw-pr-4 hover:tw-cursor-pointer hover:tw-bg-[#E4E4E4]"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClickParentCategory(
                                  parentCategory[parentCategory.length - 1]
                                );
                              }}
                            >
                              <svg
                                width="6"
                                height="11"
                                viewBox="0 0 6 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.25283 11C5.15408 11.0006 5.05619 10.9807 4.96478 10.9414C4.87336 10.9021 4.79021 10.8443 4.7201 10.7712L0.218187 6.03674C0.0784395 5.8889 0 5.68891 0 5.48045C0 5.27199 0.0784395 5.07199 0.218187 4.92415L4.7201 0.189737C4.86364 0.0604669 5.04827 -0.00708219 5.23711 0.000588473C5.42595 0.00825914 5.60508 0.0905843 5.73871 0.231113C5.87233 0.371642 5.95062 0.560024 5.95791 0.758614C5.9652 0.957204 5.90097 1.15137 5.77805 1.30232L1.80886 5.4765L5.77805 9.65068C5.88341 9.76057 5.95542 9.90086 5.98497 10.0538C6.01452 10.2067 6.00029 10.3654 5.94407 10.5099C5.88785 10.6543 5.79218 10.7779 5.66914 10.8652C5.5461 10.9524 5.40122 10.9993 5.25283 11Z"
                                  fill="#7E7D7D"
                                />
                              </svg>
                            </div>
                            <p className=" tw-w-[296px] tw-text-xs tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                              {parentCategory[parentCategory.length - 1].categoryName}
                            </p>
                          </div>
                        )}
                        {categoryToMap
                          .filter((item) =>
                            item.categoryName.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((category) => (
                            <div className="tw-flex tw-h-[35px] tw-w-[296px] tw-items-center tw-justify-between tw-py-[7px] tw-pr-0 hover:tw-cursor-pointer">
                              <p
                                role="presentation"
                                className="tw-w-[296px] tw-p-2 tw-pl-4 tw-text-xs tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black hover:tw-bg-[#E4E4E4]"
                                onClick={() => {
                                  handleSelectCategory(category);
                                  setOpenDropdown(false);
                                }}
                              >
                                {category.categoryName}
                              </p>
                              {category.hasChildren === true && (
                                <div
                                  className="tw-p-3 hover:tw-bg-[#E4E4E4]"
                                  onClick={() => handleClickSubCategory(category)}
                                >
                                  <svg
                                    width="6"
                                    height="11"
                                    viewBox="0 0 6 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0.747173 1.33514e-05C0.84592 -0.000587463 0.943808 0.0193167 1.03522 0.0585842C1.12664 0.0978518 1.20979 0.155712 1.2799 0.228844L5.78181 4.96326C5.92156 5.1111 6 5.31109 6 5.51955C6 5.72801 5.92156 5.92801 5.78181 6.07585L1.2799 10.8103C1.13636 10.9395 0.951726 11.0071 0.762889 10.9994C0.574052 10.9917 0.394922 10.9094 0.261294 10.7689C0.127666 10.6284 0.0493832 10.44 0.0420895 10.2414C0.0347953 10.0428 0.0990276 9.84863 0.22195 9.69768L4.19114 5.5235L0.22195 1.34932C0.116589 1.23943 0.04458 1.09914 0.0150285 0.946212C-0.014523 0.79328 -0.000289917 0.634566 0.0559282 0.490141C0.112146 0.345716 0.207824 0.222065 0.330864 0.134823C0.453904 0.0475817 0.59878 0.000667572 0.747173 1.33514e-05Z"
                                      fill="#7E7D7D"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                    {selectedCategory.map((category, categoryIndex) => (
                      <div className="tw-m-2 tw-flex tw-rounded-full tw-bg-[#E4E4E44D]">
                        <div className="tw-basis-11/12 tw-px-3">
                          {category?.map((higherArchie, higherArchieIndex) => (
                            <span className=" tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                              {higherArchie.categoryName}{' '}
                              {higherArchieIndex !== category.length - 1 && '>'}{' '}
                            </span>
                          ))}
                        </div>
                        {!disabled && (
                          <div
                            className="tw-float-right tw-m-auto tw-basis-1/12 tw-cursor-pointer tw-px-3"
                            onClick={() => handleRemoveSelectedCategory(categoryIndex)}
                          >
                            x
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-box tw-mt-[16px] tw-w-[336px] tw-p-[20px]">
                <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
                  <h3 className="form-box-heading ">Add price group</h3>
                  {!disabled && filteredPriceGroup?.length > 0 && (
                    <span
                      className="inner-link"
                      onClick={() => handleModalData('createPrice')}
                    >
                      Add more group
                    </span>
                  )}
                </div>
                {priceInputValues?.map((item, index) => (
                  <ProductGroup
                    item={item}
                    handleModalData={handleModalData}
                    handleDeleteGroup={handleDeleteGroup}
                    index={index}
                    disabled={disabled}
                    updateType="updatePrice"
                  />
                ))}
                {actionType === 'createPrice' || actionType === 'updatePrice' ? (
                  <ProductModal
                    data={modalData}
                    setData={handleModalSubmit}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                  />
                ) : null}
              </div>
              <div className="form-box tw-mt-[16px] tw-w-[336px] tw-p-[20px]">
                <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
                  <h3 className="form-box-heading ">Add discount group</h3>
                  {!disabled && filteredDiscountGroup?.length > 0 && (
                    <span
                      className="inner-link"
                      onClick={() => handleModalData('createDiscount')}
                    >
                      Add more group
                    </span>
                  )}
                </div>
                {discountInputValues?.map((item, index) => (
                  <ProductGroup
                    item={item}
                    handleModalData={handleModalData}
                    handleDeleteGroup={handleDeleteGroup}
                    disabled={disabled}
                    index={index}
                    updateType="updateDiscount"
                  />
                ))}
                {actionType === 'createDiscount' || actionType === 'updateDiscount' ? (
                  <ProductModal
                    data={modalData}
                    setData={handleModalSubmit}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                  />
                ) : null}
              </div>
              {!disabled && (
                <div className="tw-relative tw-mt-[100px] tw-flex tw-flex-col tw-items-end">
                  <CustomButton
                    className="btn-primary tw-flex tw-w-[135px] tw-gap-[45px] tw-py-2 tw-text-sm  tw-font-bold tw-not-italic  tw-leading-[21px] tw-text-white"
                    text={Object.keys(data).length ? 'Update' : 'Save'}
                    endIcon={<WhiteArrowDown />}
                    onClick={() => setOpenMenu2Popup(true)}
                  />
                  {openMenu2Popup && (
                    <div
                      ref={openMenu2PopupRef}
                      className="tw-absolute tw-right-1 tw-top-8 tw-z-10  tw-mt-2 tw-inline-flex tw-h-[68px] tw-w-[137px] tw-flex-col tw-items-start tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-px-3 tw-py-2"
                    >
                      <button
                        onClick={() => trigger()}
                        type="submit"
                        className=" tw-text-sm tw-font-bold tw-not-italic tw-leading-[21px] tw-text-text-medium-gray"
                      >
                        Save
                      </button>
                      <div
                        onClick={() => trigger()}
                        className="tw-whitespace-nowrap  tw-text-sm tw-font-bold tw-not-italic tw-leading-[21px] tw-text-text-medium-gray"
                      >
                        Save and Create
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  priceInputValues: PropTypes.array.isRequired,
  handlePriceInput: PropTypes.func,
  discountInputValues: PropTypes.array.isRequired,
  handleDiscountInput: PropTypes.func,
  trigger: PropTypes.func,
  formRef: PropTypes.func,
  categories: PropTypes.array.isRequired,
  selectedTag: PropTypes.array.isRequired,
  selectedCategory: PropTypes.array,
  setSelectedCategory: PropTypes.func,
  handleTags: PropTypes.func,
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleClickCategory: PropTypes.func,
  register: PropTypes.func,
  control: PropTypes.any,
  errors: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  setValue: PropTypes.func,
  taxRate: PropTypes.object,
  setTaxRate: PropTypes.func,
  selectedUnit: PropTypes.object,
  setSelectedUnit: PropTypes.func
};
