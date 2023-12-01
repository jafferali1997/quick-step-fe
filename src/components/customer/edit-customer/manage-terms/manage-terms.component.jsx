import PropTypes from 'prop-types';
import FormForManageTerms from './components/form-for-manage-terms/form-for-manage-terms.component';
import useMangeTerm from './use-manage-terms.hook';

export default function ManageTerms({ handleTabClick, resetTabCompleted }) {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    selectedValue,
    handleChangeRadio,
    setIsSubmit,
    handleReset,
    setSelectedValue,
    data
  } = useMangeTerm({ handleTabClick, resetTabCompleted });
  return (
    <div className="mange-terms-details-wrapper ">
      <div className="content-header ">
        <h3 className="form-inner-heading">Terms of payments</h3>
      </div>
      <div className="content-body">
        <FormForManageTerms
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          handleChangeRadio={handleChangeRadio}
          handleTabClick={handleTabClick}
          setIsSubmit={setIsSubmit}
          handleReset={handleReset}
          data={data}
        />
      </div>
    </div>
  );
}

ManageTerms.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  resetTabCompleted: PropTypes.func.isRequired
};
