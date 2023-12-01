import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextArea from '@/common/components/text-area/text-area.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';

export default function FormForManageTerms({
  handleSubmit,
  onSubmit,
  register,
  errors,
  selectedValue,
  handleChangeRadio,
  handleTabClick,
  setIsSubmit,
  handleReset,
  setSelectedValue,
  data = {}
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tw-mb-5 tw-mt-[22px] tw-flex tw-flex-col tw-gap-[18px]">
        <div className="payment-details-bank">
          <FormControl>
            <RadioGroup
              name="termOfPayment"
              value={selectedValue}
              register={register}
              errors={errors}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <FormControlLabel
                value="PAYMENT_TERMS_AS_DATE"
                control={<Radio />}
                label="Payment Terms as date"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'PAYMENT_TERMS_AS_DATE' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="PAYMENT_TERMS_AS_DATE_DATA"
                    placeholder="03/13/2023"
                    type="date"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
              <FormControlLabel
                value="PAYMENT_TERMS_IN_DAYS"
                control={<Radio />}
                label="Payment terms in days"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'PAYMENT_TERMS_IN_DAYS' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="PAYMENT_TERMS_IN_DAYS_DATA"
                    placeholder="Payment terms"
                    type="days"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
              <FormControlLabel
                value="CASH_DISCOUNT_TARGET_AS_A_DATE"
                control={<Radio />}
                label="Cash discount target as a date"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'CASH_DISCOUNT_TARGET_AS_A_DATE' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="CASH_DISCOUNT_TARGET_AS_A_DATE_DATA"
                    placeholder="13/03/2023"
                    type="date"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
              <FormControlLabel
                value="CASH_DISCOUNT_TARGET_IN_DAYS"
                control={<Radio />}
                label="Cash discount target in days"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'CASH_DISCOUNT_TARGET_IN_DAYS' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="CASH_DISCOUNT_TARGET_IN_DAYS_DATA"
                    placeholder="Cash discount target in days"
                    type="days"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
              <FormControlLabel
                value="DISCOUNT_AND_PERCENTAGE"
                control={<Radio />}
                label="Discount and %"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'DISCOUNT_AND_PERCENTAGE' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="DISCOUNT_AND_PERCENTAGE_DATA"
                    placeholder="Discount and %"
                    type="text"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
              <FormControlLabel
                value="DISCOUNT_AMOUNT"
                control={<Radio />}
                label="Discount amount"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'DISCOUNT_AMOUNT' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="DISCOUNT_AMOUNT_DATA"
                    placeholder="Discount amount"
                    type="text"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
              <FormControlLabel
                value="TOTAL_AMOUNT_MINUS_DISCOUNT"
                control={<Radio />}
                label="Total amount minus discount"
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-medium-gray"
              />
              {selectedValue === 'TOTAL_AMOUNT_MINUS_DISCOUNT' && (
                <div className="radio-expanded">
                  <CustomInput
                    name="TOTAL_AMOUNT_MINUS_DISCOUNT_DATA"
                    placeholder="Total amount minus discount"
                    type="text"
                    isRequired={false}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <h3 className="tw-text-lg tw-font-medium tw-not-italic tw-leading-[27px] tw-text-text-black">
        Terms of delivery
      </h3>
      <div className="form-row-two-col tw-mt-[30px]">
        <TextArea
          name="termOfDelivery"
          placeholder="Delivery Terms"
          type="textarea"
          isRequired={true}
          register={register}
          errors={errors}
        />
        {/* <CustomInput
          name="paymentTerm"
          placeholder="IBAN Number"
          type="textarea"
          isRequired={true}
        /> */}
      </div>
      <StepperFooter
        handleTabClick={handleTabClick}
        back="discount"
        setIsSubmit={setIsSubmit}
        submitText="Submit"
      />
    </form>
  );
}

FormForManageTerms.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  selectedValue: PropTypes.string.isRequired,
  handleChangeRadio: PropTypes.func.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  handleReset: PropTypes.func.isRequired,
  setSelectedValue: PropTypes.func.isRequired
};
