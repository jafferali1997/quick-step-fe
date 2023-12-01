import PropTypes from 'prop-types';
import FormForDiscount from './components/form-for-discount/form-for-discount.components';
import useDiscount from './use-discount.hook';

export default function Discount({ handleTabClick, handleTabCompleted }) {
  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    setIsSubmit,
    selectedValue,
    setSelectedValue,
    data,
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
    dataCustomer
  } = useDiscount({
    handleTabClick,
    handleTabCompleted
  });

  return (
    <div className="discount-details-wrapper">
      <div className="content-header ">
        <h1 className="tw-text-lg tw-font-medium tw-not-italic tw-leading-[27px] tw-text-text-dark-gray">
          Discount
        </h1>
      </div>
      <div className="content-body">
        <FormForDiscount
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          handleTabClick={handleTabClick}
          setIsSubmit={setIsSubmit}
          data={data}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          allPriceGroup={allPriceGroup}
          setAllPriceGroup={setAllPriceGroup}
          selectedPriceGroup={selectedPriceGroup}
          setSelectedPriceGroup={setSelectedPriceGroup}
          allDiscountGroup={allDiscountGroup}
          setAllDiscountGroup={setAllDiscountGroup}
          selectedDiscountGroup={selectedDiscountGroup}
          setSelectedDiscountGroup={setSelectedDiscountGroup}
          TRIGGER_ACTION_OPTIONS={TRIGGER_ACTION_OPTIONS}
          handleOptionChange={handleOptionChange}
          setSelectedValueData={setSelectedValueData}
          dataCustomer={dataCustomer}
        />
      </div>
    </div>
  );
}

Discount.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
