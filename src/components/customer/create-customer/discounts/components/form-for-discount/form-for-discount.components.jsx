/* eslint-disable react/no-array-index-key */
import {
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  RadioGroup
} from '@mui/material/node';
import PropTypes from 'prop-types';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import DiscountGroup from '../discount-group/discount-group.component';
import PriceGroup from '../price-group/price-group.component';
import CustomRadioGroup from '@/common/components/radio-group/radio-group.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import TextArea from '@/common/components/text-area/text-area.component';
import Modal from '@/common/components/modal/modal.component';
import ModalFooter from '@/common/components/modal/components/modal-footer.component';
import useFormForDiscount from './use-form-for-discount.hook';
import ThreeDotsIcon from '@/common/icons/three-dots.icon';
import PencilIcon from '@/common/icons/pencil.icon';
import DeleteIcon from '@/common/icons/delete.icon';
import useClickOutside from '@/common/hooks/use-click-outside';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import QuestionIcon from '@/common/icons/Question.icon';
import ModelCloseIcon from '@/common/icons/model-close.icon';
import EuroIcon from '@/common/icons/euro.icon';

export default function FormForDiscount({
  register,
  handleSubmit,
  onSubmit,
  handleTabClick,
  setIsSubmit,
  errors,
  selectedValue,
  setSelectedValue,
  handleChangeRadio,
  allPriceGroup,
  setAllPriceGroup,
  selectedPriceGroup,
  setSelectedPriceGroup,
  allDiscountGroup,
  setAllDiscountGroup,
  selectedDiscountGroup,
  setSelectedDiscountGroup,
  TRIGGER_ACTION_OPTIONS,
  handleOptionChange,
  setSelectedValueData,
  dataCustomer,
  data = {}
}) {
  const {
    openDeliverPopup,
    setOpenDeliverPopup,
    modalCloseHandler,
    values,
    setValues,
    selectedValueDelivery,
    setSelectedValueDelivery,
    handleSubmitDelivery,
    handleRadioChangeDelivery,
    status,
    setStatus,
    vatStatus,
    setVatStatus,
    isPDF,
    setIsPDF,
    deliveryAction,
    setDeliveryAction,
    deliveryActionId,
    setDeliveryActionId,
    deliveryActionRef,
    openDeliverPopupUpdate,
    setOpenDeliverPopupUpdate,
    openPopup,
    setOpenPopup,
    updateSelectedDeliver,
    setUpdateSelectedDeliver,
    handleUpdateDeliveryTerm,
    handleDeleteDeliveryTerm
  } = useFormForDiscount(dataCustomer);
  useClickOutside([deliveryActionRef], [setDeliveryAction]);

  return (
    <>
      <form
        onSubmit={handleSubmit((val) =>
          onSubmit(val, selectedValueDelivery, status, vatStatus, isPDF)
        )}
      >
        <div className="form-box-grid-2col tw-pt-[16px]">
          <CustomInput
            label="Discount Amount "
            errors={errors}
            register={register}
            name="discountAmount"
            placeholder="Discount amount"
            type="text"
            startIcon={<EuroIcon />}
          />
          <div>
            <CustomInput
              label="Cash Discount"
              errors={errors}
              register={register}
              name="discountDays"
              placeholder="Cash Discount"
              type="text"
            />
            <div className="tw-flex tw-items-center tw-gap-2 tw-pt-2">
              <h4 className="tw-font-dm tw-text-[14px] tw-font-normal tw-not-italic tw-leading-[21px] tw-text-text-ultra-light-gray">
                Suggestions
              </h4>
              <div className="tw-flex tw-gap-2">
                <div className="singe-day">2 days</div>
                <div className="singe-day">7 days</div>
                <div className="singe-day">10 days</div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-box-grid-2col tw-mt-4">
          <div>
            <PriceGroup
              options={allPriceGroup}
              setOptions={setAllPriceGroup}
              selectedOptions={selectedPriceGroup}
              setSelectedOptions={setSelectedPriceGroup}
            />
          </div>
          <div>
            <DiscountGroup
              options={allDiscountGroup}
              setOptions={setAllDiscountGroup}
              selectedOptions={selectedDiscountGroup}
              setSelectedOptions={setSelectedDiscountGroup}
            />
          </div>
        </div>
        <div className="tw-mt-4">
          <div className="tw-flex">
            <h3 className="form-inner-heading tw-w-1/2">Terms of payments</h3>
            <div className="tw-flex-shrink-0">
              <div className="tw-flex tw-flex-wrap tw-gap-10">
                <div className="tw-flex tw-items-center">
                  <CustomSwitch
                    label="Current Status"
                    register={register}
                    name="currentStatus"
                    type="switch"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    isRequired={false}
                  />
                </div>
                <div className="tw-flex tw-items-center">
                  <CustomSwitch
                    label="VAT exempt"
                    register={register}
                    name="vatExempt"
                    type="switch"
                    checked={vatStatus}
                    onChange={(e) => setVatStatus(e.target.checked)}
                    isRequired={false}
                  />
                </div>
                <div className="tw-flex tw-items-center">
                  <CustomSwitch
                    label="Do not show customer on PDF"
                    register={register}
                    name="notSHowOnPDF"
                    type="switch"
                    checked={isPDF}
                    onChange={(e) => setIsPDF(e.target.checked)}
                    isRequired={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tw-mt-4">
            <div className="tw-mt-4 tw-flex  tw-items-center tw-gap-4 hover:tw-cursor-pointer">
              <input
                type="radio"
                id="PAYMENT_TERMS_AS_DATE"
                name="options"
                value="PAYMENT_TERMS_AS_DATE"
                checked={selectedValue === 'PAYMENT_TERMS_AS_DATE'}
                onChange={handleOptionChange}
              />
              <label
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray hover:tw-cursor-pointer"
                htmlFor="PAYMENT_TERMS_AS_DATE"
              >
                Payment terms as date
              </label>
            </div>
            {selectedValue && selectedValue === 'PAYMENT_TERMS_AS_DATE' && (
              <div className="radio-expanded tw-mt-2">
                <CustomInput
                  name="PAYMENT_TERMS_AS_DATE"
                  placeholder="03/13/2023"
                  type="date"
                  defaultValue={dataCustomer?.termOfPaymentData}
                  isRequired={false}
                  register={register}
                  errors={errors}
                  onChange={(e) => setSelectedValueData(e.target.value)}
                />
              </div>
            )}
            <div className="tw-mt-4 tw-flex  tw-items-center tw-gap-4 hover:tw-cursor-pointer">
              <input
                type="radio"
                id="PAYMENT_TERMS_IN_DAYS"
                name="options"
                value="PAYMENT_TERMS_IN_DAYS"
                checked={selectedValue === 'PAYMENT_TERMS_IN_DAYS'}
                onChange={handleOptionChange}
              />
              <label
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray hover:tw-cursor-pointer"
                htmlFor="PAYMENT_TERMS_IN_DAYS"
              >
                Payment terms in days
              </label>
            </div>
            {selectedValue && selectedValue === 'PAYMENT_TERMS_IN_DAYS' && (
              <div className="radio-expanded tw-mt-2">
                <CustomInput
                  name="PAYMENT_TERMS_IN_DAYS"
                  placeholder="Payment terms"
                  type="days"
                  defaultValue={dataCustomer?.termOfPaymentData}
                  isRequired={false}
                  register={register}
                  errors={errors}
                  onChange={(e) => setSelectedValueData(e.target.value)}
                />
              </div>
            )}
            <div className="tw-mt-4 tw-flex  tw-items-center tw-gap-4 hover:tw-cursor-pointer">
              <input
                type="radio"
                id="CASH_DISCOUNT_TARGET_AS_A_DATE"
                name="options"
                value="CASH_DISCOUNT_TARGET_AS_A_DATE"
                checked={selectedValue === 'CASH_DISCOUNT_TARGET_AS_A_DATE'}
                onChange={handleOptionChange}
              />
              <label
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray hover:tw-cursor-pointer"
                htmlFor="CASH_DISCOUNT_TARGET_AS_A_DATE"
              >
                Cash discount target as a date
              </label>
            </div>
            {selectedValue && selectedValue === 'CASH_DISCOUNT_TARGET_AS_A_DATE' && (
              <div className="radio-expanded tw-mt-2">
                <CustomInput
                  name="CASH_DISCOUNT_TARGET_AS_A_DATE"
                  placeholder="03/13/2023"
                  type="date"
                  defaultValue={dataCustomer?.termOfPaymentData}
                  isRequired={false}
                  register={register}
                  errors={errors}
                  onChange={(e) => setSelectedValueData(e.target.value)}
                />
              </div>
            )}
            <div className="tw-mt-4 tw-flex  tw-items-center tw-gap-4 hover:tw-cursor-pointer">
              <input
                type="radio"
                id="CASH_DISCOUNT_TARGET_IN_DAYS"
                name="options"
                value="CASH_DISCOUNT_TARGET_IN_DAYS"
                checked={selectedValue === 'CASH_DISCOUNT_TARGET_IN_DAYS'}
                onChange={handleOptionChange}
              />
              <label
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray hover:tw-cursor-pointer"
                htmlFor="CASH_DISCOUNT_TARGET_IN_DAYS"
              >
                Cash discount target in days
              </label>
            </div>
            {selectedValue && selectedValue === 'CASH_DISCOUNT_TARGET_IN_DAYS' && (
              <div className="radio-expanded tw-mt-2">
                <CustomInput
                  name="CASH_DISCOUNT_TARGET_IN_DAYS"
                  placeholder="3"
                  type="number"
                  defaultValue={dataCustomer?.termOfPaymentData}
                  isRequired={false}
                  register={register}
                  errors={errors}
                  onChange={(e) => setSelectedValueData(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="tw-mt-6">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h3 className="tw-text-lg tw-font-medium tw-not-italic tw-leading-[27px] tw-text-text-black">
              Terms of delivery
            </h3>
            <div
              onClick={() => setOpenDeliverPopup(true)}
              className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-secondary-blue tw-underline hover:tw-cursor-pointer"
            >
              Create Delivery condition
            </div>
          </div>
          <div className="primary-scroll tw-max-h-[300px] tw-overflow-auto tw-pr-1">
            {values?.map((value, i) => (
              <div
                key={`${value.deliveryTerm}-${i}`}
                className="tw-mt-4 tw-grid tw-grid-cols-[auto_1fr]  tw-items-center tw-gap-4 hover:tw-cursor-pointer"
              >
                <input
                  type="radio"
                  id="textarea1"
                  name="options1"
                  value={value.deliveryTerm}
                  checked={selectedValueDelivery?.termOfDelivery === value?.deliveryTerm}
                  onChange={() => handleRadioChangeDelivery(value)}
                />
                <div className="tw-relative">
                  <TextArea disabled={true} defaultValue={value.deliveryTerm} />
                  <div
                    onClick={() => {
                      setDeliveryAction(!deliveryAction);
                      setDeliveryActionId(value?.id);
                    }}
                    className="tw-absolute tw-right-2 tw-top-1"
                  >
                    <ThreeDotsIcon />
                  </div>
                  {deliveryAction && value?.id === deliveryActionId && (
                    <div
                      ref={deliveryActionRef}
                      className="tw-absolute tw-right-5 tw-top-5 tw-inline-flex tw-h-[68px]  tw-max-w-[92px] tw-flex-col tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-p-3"
                    >
                      <div
                        onClick={() => {
                          setOpenDeliverPopupUpdate(true);
                          setUpdateSelectedDeliver(value);
                        }}
                        className="tw-flex tw-items-center tw-gap-2"
                      >
                        <PencilIcon />{' '}
                        <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Edit
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setOpenPopup(true);
                          setUpdateSelectedDeliver(value);
                        }}
                        className="tw-flex tw-items-center tw-gap-2"
                      >
                        <DeleteIcon />{' '}
                        <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Delete
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <StepperFooter
          handleTabClick={handleTabClick}
          back="payment_details"
          setIsSubmit={setIsSubmit}
          submitText="Submit"
        />
      </form>
      <Modal
        onClose={modalCloseHandler}
        show={openDeliverPopup}
        title="Create Delivery condition"
      >
        {/* <FormProvider {...methods}> */}
        <form onSubmit={handleSubmitDelivery}>
          <TextArea
            label="Delivery condition"
            name="inputValueDelivery"
            placeholder="Enter Delivery condition"
          />
          <ModalFooter
            onClose={modalCloseHandler}
            cancelButtonText="Close"
            submitButtonText="Save"
          />
        </form>
        {/* </FormProvider> */}
      </Modal>
      {/* update delivery condition */}
      <Modal
        onClose={() => setOpenDeliverPopupUpdate(false)}
        show={openDeliverPopupUpdate}
        title="Update Delivery condition"
      >
        {/* <FormProvider {...methods}> */}

        <TextArea
          label="Delivery condition"
          name="inputValueDelivery"
          value={updateSelectedDeliver?.deliveryTerm || ''}
          placeholder="Enter Delivery condition"
          onChange={(e) =>
            setUpdateSelectedDeliver({
              ...updateSelectedDeliver,
              deliveryTerm: e.target.value
            })
          }
        />
        <ModalFooter
          onClose={() => setOpenDeliverPopupUpdate(false)}
          cancelButtonText="Close"
          submitButtonText="Update"
          submitOnclick={() => {
            handleUpdateDeliveryTerm(updateSelectedDeliver?.id, {
              deliveryTerm: updateSelectedDeliver?.deliveryTerm
            });
            setOpenDeliverPopupUpdate(false);
          }}
        />

        {/* </FormProvider> */}
      </Modal>
      {/* delete delivery */}
      <Dialog className="scrol-bar" open={openPopup}>
        <div className="tw-max-h-full tw-w-[471px] tw-max-w-full ">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between  tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
            <div className="hover:tw-cursor-pointer" onClick={() => setOpenPopup(false)}>
              <ModelCloseIcon />
            </div>
          </div>
          <DialogContent>
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
              <div>
                <QuestionIcon />
              </div>
              <div className="tw-text-center tw-text-xl tw-font-bold tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                Are you really want to delete this Delivery Condition?
              </div>
              <div className="tw-mt-[14px] tw-flex tw-gap-5">
                <CustomButton
                  className="btn-cancel"
                  text="Cancel"
                  onClick={() => setOpenPopup(false)}
                />
                <CustomButton
                  className="btn-primary"
                  text="Confirm"
                  onClick={() => {
                    setOpenPopup(false);
                    handleDeleteDeliveryTerm(updateSelectedDeliver?.id);
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
const groupShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
});
FormForDiscount.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  handleOptionChange: PropTypes.func,
  handleChangeRadio: PropTypes.func,
  setSelectedValueData: PropTypes.func,
  allPriceGroup: PropTypes.arrayOf(groupShape).isRequired,
  setAllPriceGroup: PropTypes.func.isRequired,
  selectedPriceGroup: PropTypes.arrayOf(groupShape).isRequired,
  setSelectedPriceGroup: PropTypes.func.isRequired,
  allDiscountGroup: PropTypes.arrayOf(groupShape).isRequired,
  setAllDiscountGroup: PropTypes.func.isRequired,
  selectedDiscountGroup: PropTypes.arrayOf(groupShape).isRequired,
  setSelectedDiscountGroup: PropTypes.func.isRequired,
  TRIGGER_ACTION_OPTIONS: PropTypes.arrayOf,
  dataCustomer: PropTypes.objectOf
};
