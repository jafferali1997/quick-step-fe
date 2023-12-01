import PropTypes from 'prop-types';
import usePaymentDetails from './use-payment-detail.hook';
import FormForPaymentDetails from './components/form-for-payment-details/form-for-payment-detail.component';

export default function PaymentDetails({ handleTabClick, handleTabCompleted }) {
  const {
    handleSubmit,
    onSubmit,
    register,
    bankDetail,
    setBankDetail,
    setCreditCard,
    creditCard,
    setIsSubmit,
    router,
    data,
    errors,
    paymentType,
    setPaymentType
  } = usePaymentDetails({ handleTabClick, handleTabCompleted });
  return (
    <div className="payment-details-wrapper">
      <div className="content-header ">
        <h1 className="tw-mb-4 tw-text-lg tw-font-medium tw-not-italic tw-leading-[27px] tw-text-text-dark-gray">
          Payment Details
        </h1>
      </div>
      <div className="content-body">
        <FormForPaymentDetails
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          bankDetail={bankDetail}
          setBankDetail={setBankDetail}
          setCreditCard={setCreditCard}
          creditCard={creditCard}
          setIsSubmit={setIsSubmit}
          handleTabClick={handleTabClick}
          errors={errors}
          data={data}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
        />
      </div>
    </div>
  );
}

PaymentDetails.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
