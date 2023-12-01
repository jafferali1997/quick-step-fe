/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import ArrowDownBorder from '@/common/icons/arrow-down-border.icon';
import useFormPaymentDetails from './use-form-for-payment-detail.hook';

export default function FormForPaymentDetails({
  handleSubmit,
  onSubmit,
  register,

  creditCard,
  setIsSubmit,
  handleTabClick,
  data = {},
  errors,
  paymentType,
  setPaymentType
}) {
  const { bankDetail, setBankDetail, cardDetail, setCardDetail } =
    useFormPaymentDetails();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* bank detail */}
      <div>
        <div className="tw-mt-6 tw-flex tw-h-[42px] tw-w-full  tw-items-center tw-justify-between tw-gap-2.5 tw-rounded-md tw-bg-[#1d4ed80d] tw-px-4 tw-py-2">
          <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
            Bank Details
          </h3>
          <div
            className="hover:tw-cursor-pointer"
            onClick={() => setBankDetail(!bankDetail)}
          >
            {bankDetail ? <img src="/assets/images/arow-up.svg" /> : <ArrowDownBorder />}
          </div>
        </div>
        {bankDetail && (
          <>
            <div className="tw-mt-[16px] tw-w-full">
              <CustomInput
                label="IBAN Number"
                name="iban"
                placeholder="IBAN Number"
                type="text"
                register={register}
                errors={errors}
                isRequired={true}
              />
            </div>
            <div className="form-box-grid-4col">
              <CustomInput
                label="Account owner name"
                name="accountOwnerName"
                placeholder="Account owner name"
                type="text"
                register={register}
                errors={errors}
                isRequired={true}
              />

              <CustomInput
                label="BIC Number"
                name="bic"
                placeholder="BIC Number"
                type="number"
                register={register}
                errors={errors}
                isRequired={true}
              />
              <CustomInput
                label="Mandate Reference"
                name="mendateReferance"
                placeholder="Mandate Reference"
                type="text"
                register={register}
                errors={errors}
                // isRequired={true}
              />
              <CustomInput
                label="Mandate Date"
                name="mandateGenerateDate"
                placeholder="03/13/2023"
                type="date"
                register={register}
                errors={errors}
                // isRequired={true}
              />
            </div>
          </>
        )}
      </div>

      {/* card details */}
      <div>
        <div className="tw-mt-6 tw-flex tw-h-[42px] tw-w-full  tw-items-center tw-justify-between tw-gap-2.5 tw-rounded-md tw-bg-[#1d4ed80d] tw-px-4 tw-py-2">
          <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
            Credit Card Details
          </h3>
          <div
            className="hover:tw-cursor-pointer"
            onClick={() => {
              setCardDetail(!cardDetail);
              setPaymentType('CREDIT_CARD');
            }}
          >
            {cardDetail ? <img src="/assets/images/arow-up.svg" /> : <ArrowDownBorder />}
          </div>
        </div>
        {cardDetail && (
          <div className="form-box-grid-4col">
            <CustomInput
              label="Credit Card Name"
              name="nameOfCreditCard"
              placeholder="Credit Card Name"
              type="text"
              register={register}
              errors={errors}
              isRequired={true}
            />
            <CustomInput
              label="Credit Card Number"
              name="creditCardNumber"
              placeholder="Credit Card Number"
              type="text"
              register={register}
              errors={errors}
              isRequired={true}
            />
            <CustomInput
              label="Expiry Date"
              name="creditCardExpiry"
              placeholder="03/13/2023"
              type="date"
              register={register}
              errors={errors}
              isRequired={true}
            />
            <CustomInput
              label="CVV"
              name="creditCardCVV"
              placeholder="CVV"
              type="text"
              register={register}
              errors={errors}
              isRequired={true}
            />
          </div>
        )}
      </div>

      <StepperFooter
        handleTabClick={handleTabClick}
        back="customer_details"
        setIsSubmit={setIsSubmit}
      />
    </form>
  );
}

FormForPaymentDetails.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  creditCard: PropTypes.bool.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  paymentType: PropTypes.string,
  setPaymentType: PropTypes.func
};
