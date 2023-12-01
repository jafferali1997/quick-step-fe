import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import React from 'react';
import EuroIcon from '@/common/icons/euro.icon';
import useDocumentLineItems from '@/common/hooks/use-document-line-item-hook';
import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Select from '../select/select.component';
import TextArea from '../text-area/text-area.component';
import useCreateProduct from './use-create-product.hook';
import ConfirmationModal from '../custom-model-confirmation/custom-model-confirmation';
import FieldError from '../field-error/field-error.component';
import SelectWithModel from '../selectwithmodel/select-with-model.component';
import CreateModal from '../create-modal/create-modal';
import useTaxRate from '@/components/setting/general-setting/view/tax-rate/use-tax-rate.hook';

function CreateProduct({
  ref,
  module,
  openPopup,
  setOpenPopup,
  data,
  setData,
  defaultTaxRate,
  lineItemHeader,
  theDiscount,
  positionNumber
}) {
  const {
    taxRate,
    handleSubmitClick,
    handleChangeTaxRate,
    handleDefaulTaxRateSwitch,
    toggleSwitchValue
  } = useTaxRate();

  const {
    errors,
    register,
    onSubmit,
    handleSubmit,
    productNo,
    productName,
    grossPrice,
    netPrice,
    handleUnit,
    handleTaxRate,
    handleNetPriceChange,
    handleGrossPriceChange,
    discountGroupOptions,
    handleChangDiscountGroup,
    confirmationPopUp,
    setConfirmationPopUp,
    onClickNO,
    onClickYes,
    handleCancel,
    netPriceErrorMessage,
    grossPriceErrorMessage,
    selectedTaxRate,
    openCreateModal,
    setOpenCreateModal,
    handleClose
  } = useCreateProduct({
    openPopup,
    setOpenPopup,
    setData,
    data,
    defaultTaxRate,
    lineItemHeader,
    theDiscount,
    module,
    positionNumber
  });

  const { unitsOptions, taxRateOptions } = useDocumentLineItems({
    openPopup
  });

  return (
    <Dialog
      className="!tw-rounded-[20px]"
      ref={ref}
      open={openPopup}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '909px'
          }
        },
        zIndex: 1300
      }}
    >
      <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
        {openCreateModal && (
          <CreateModal
            modalStyling="tw-max-h-full tw-w-[479px] tw-max-w-full "
            openPopup={openCreateModal}
            setOpenPopup={false}
            addLabel="Add New Tax Rate"
            editLabel="Edit Tax Rate"
            inputLabel="Tax Rate"
            inputPlaceholderText="Enter Tax Rate"
            addButtonText="Save"
            editButtonText="Update"
            closeText="Close"
            toggleSwitch={true}
            type="number"
            inputLabelValue={taxRate}
            toggleSwitchValue={toggleSwitchValue}
            handleChangeInputLabelValue={handleChangeTaxRate}
            handleClose={handleClose}
            handleSubmitClick={handleSubmitClick}
            handleDefaulTaxRateSwitch={handleDefaulTaxRateSwitch}
          />
        )}

        <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-p-5">
          <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            Create New Product
          </div>
          <div className="hover:tw-cursor-pointer" onClick={handleCancel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.46582 8.01169L15.696 1.78141C16.1014 1.37615 16.1014 0.720878 15.696 0.315665C15.2907 -0.0895966 14.6355 -0.0895966 14.2303 0.315665L7.99993 6.5459L1.76984 0.315665C1.36438 -0.0895966 0.709353 -0.0895966 0.304092 0.315665C-0.101364 0.720926 -0.101364 1.37615 0.304092 1.78141L6.53413 8.01169L0.30414 14.2419C-0.101315 14.6472 -0.101315 15.3025 0.30414 15.7077C0.40027 15.8041 0.514502 15.8805 0.640272 15.9327C0.766042 15.9848 0.900871 16.0115 1.03701 16.0114C1.30233 16.0114 1.56774 15.9098 1.76988 15.7077L7.99993 9.47744L14.2303 15.7077C14.3264 15.8041 14.4406 15.8805 14.5664 15.9326C14.6922 15.9847 14.827 16.0115 14.9631 16.0114C15.2284 16.0114 15.4939 15.9098 15.696 15.7077C16.1014 15.3024 16.1014 14.6472 15.696 14.2419L9.46582 8.01169Z"
                fill="#7E7D7D"
              />
            </svg>
          </div>
        </div>
        <DialogContent>
          <div className="tw-w-full" id="createProduct">
            <CustomInput
              label="Product Name"
              name="productName"
              register={register}
              errors={errors}
              placeholder="Enter Product Name"
              type="tex"
              isRequired={true}
            />
            <div className="tw-mt-4">
              <TextArea
                label="Description"
                name="description"
                register={register}
                errors={errors}
                placeholder="Enter Description"
                type="text"
              />
            </div>
            <div className="model-box-grid-4col">
              <div className="tw-flex tw-flex-col">
                <CustomInput
                  label="Net price"
                  name="netPrice"
                  placeholder="Enter net price "
                  type="text"
                  endIcon={<EuroIcon />}
                  isRequired={true}
                  value={netPrice || 0}
                  onChange={(e) => handleNetPriceChange(e.target.value)}
                />
                {netPriceErrorMessage && (
                  <FieldError
                    className="tw-mt-1 tw-normal-case"
                    error={netPriceErrorMessage}
                  />
                )}
              </div>
              <div className="tw-flex tw-flex-col">
                <CustomInput
                  label="Gross price"
                  name="grossPrice"
                  placeholder="Enter Gross price "
                  type="text"
                  endIcon={<EuroIcon />}
                  isRequired={true}
                  value={grossPrice || 0}
                  onChange={(e) => handleGrossPriceChange(e.target.value)}
                />
                {grossPriceErrorMessage && (
                  <FieldError
                    className="tw-mt-1 tw-normal-case"
                    error={grossPriceErrorMessage}
                  />
                )}
              </div>
              {/* <Select
                label="Tax Rate"
                name="taxRate"
                register={register}
                errors={errors}
                placeholder="Enter tax rate"
                options={taxRateOptions}
                value={selectedTaxRate}
                onChange={(e, value) => handleTaxRate(value)}
              /> */}

              <SelectWithModel
                label="Tax Rate"
                name="taxRate"
                register={register}
                errors={errors}
                placeholder="Enter tax rate"
                popup={true}
                options={[
                  {
                    label: 'Add Tax Rate',
                    openPopup: setOpenCreateModal
                  },
                  ...(taxRateOptions?.map((item) => ({
                    label: item.label,
                    value: item.value
                  })) || [])
                ]}
                value={selectedTaxRate}
                onChange={(e, value) => handleTaxRate(value)}
              />

              <CustomInput
                label="Purchase price "
                name="purchasePrice"
                placeholder="Enter Purchase price "
                type="number"
                register={register}
                errors={errors}
                endIcon={<EuroIcon />}
              />
              <Select
                label="Units"
                name="unit"
                register={register}
                errors={errors}
                placeholder="Units "
                className="tw-normal-case"
                options={unitsOptions}
                onChange={(e, value) => handleUnit(value)}
              />
              <CustomInput
                label="Quantity"
                name="quantity"
                register={register}
                errors={errors}
                placeholder="Enter quantity"
                type="number"
              />
              <CustomInput
                label="Position Number"
                name="positionNo"
                errors={errors}
                register={register}
                placeholder="Enter position number"
                type="number"
              />
              <CustomInput
                label="SKU"
                name="sku"
                errors={errors}
                register={register}
                placeholder="Enter SKU"
                type="text"
              />
              <CustomInput
                label="Product Number"
                name="productNo"
                errors={errors}
                register={register}
                placeholder="Enter product number"
                type="text"
                isRequired={true}
              />
              <CustomInput
                label="GTIN/EAN"
                name="tginEan"
                errors={errors}
                register={register}
                placeholder="Enter GTIN/EAN"
                type="number"
              />
              <Select
                label="Discount Group"
                name="discountGroup"
                placeholder="Discount Group "
                options={discountGroupOptions}
                onChange={(e, value) => handleChangDiscountGroup(value)}
              />
              <CustomInput
                label="Discount %"
                name="discount"
                register={register}
                errors={errors}
                placeholder="Enter discount"
                type="text"
              />
            </div>

            <div className="tw-mt-4">
              <TextArea
                label="Notice"
                name="notice"
                register={register}
                errors={errors}
                placeholder="Enter Notice"
                type="text"
              />
            </div>

            <div className="tw-mt-10 tw-flex tw-justify-end tw-gap-[20px]">
              <CustomButton onClick={handleCancel} text="cancel" className="btn-cancel" />
              <CustomButton
                text="Create Product"
                type="submit"
                className="btn-primary"
                onClick={handleSubmit(onSubmit)}
                disabled={!productNo || !productName || !grossPrice || !netPrice}
              />
            </div>
          </div>
        </DialogContent>
      </div>

      <ConfirmationModal
        show={confirmationPopUp}
        onCancel={onClickNO}
        onConfirm={onClickYes}
        message="Do you want to add this product into product module"
        cancelText="No"
        onClose={() => setConfirmationPopUp(false)}
      />
    </Dialog>
  );
}

CreateProduct.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(React.Element) })
  ]),
  module: PropTypes.string.isRequired,
  openPopup: PropTypes.bool.isRequired,
  setOpenPopup: PropTypes.func.isRequired,
  data: PropTypes.string,
  setData: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultTaxRate: PropTypes.object,
  lineItemHeader: PropTypes.string,
  theDiscount: PropTypes.string,
  positionNumber: PropTypes.number
};

export default CreateProduct;
