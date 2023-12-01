import PropTypes from 'prop-types';
import FormForPersonalDetails from './components/form-for-personal-details/form-for-personal-details.compoments';
import usePersonalDetails from './use-personal-details';

export default function PersonalDetails({ handleTabClick, handleTabCompleted }) {
  const {
    register,
    handleSubmit,
    onSubmit,
    data,
    setIsSubmit,
    errors,
    allPriceGroup,
    setAllPriceGroup,
    selectedPriceGroup,
    setSelectedPriceGroup,
    allDiscountGroup,
    setAllDiscountGroup,
    selectedDiscountGroup,
    setSelectedDiscountGroup,
    control,
    cities,
    country,
    onCountryChange,
    error,
    // use personalDetails
    addMorePersons,
    setAddMorePersons,
    handleInputChange,
    additionalContact,
    handleContactsDataClick,
    contactsData,
    initialColumns,
    handleInputChangeAddress,
    additionalAddress,
    setAdditionalAddress,
    addMoreAddress,
    setAddMoreAddress,
    addressData,
    setAddressData,
    handleAddressDataClick,
    initialColumnsAddress,
    openPopup,
    setOpenPopup,
    deleteContactList,
    contactId,
    disableAddContact,
    openPopupAddress,
    setOpenPopupAddress,
    deleteAddressList,
    addressId,
    setAddressId,
    disableAddAddress,
    setDisableAddAddress,
    additionalContactEdit,
    setAdditionalContactEdit,
    updateContactBtn,
    setupdateContactBtn,
    handleUpdateContact,
    contactBarShow,
    setContactBarShow,
    setAdditionalContact,
    handleUpdateAddress,
    updateAddressBtn,
    setupdateAddressBtn,
    addressBarShow,
    setAddressBarShow,
    onCountryChangeAdditional,
    additionalCountry,
    cities2,
    additionalCity,
    setAdditionalCity
  } = usePersonalDetails({ handleTabClick, handleTabCompleted });

  const { gender } = errors;

  return (
    <div className="personal-details-wrapper">
      <div className="content-header ">
        <h1 className="tw-mb-6 tw-text-lg tw-font-medium tw-not-italic tw-leading-[27px] tw-text-text-dark-gray">
          Details
        </h1>
        <h3 className="form-inner-heading ">Company</h3>
      </div>
      <div className="content-body">
        <FormForPersonalDetails
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          data={data}
          setIsSubmit={setIsSubmit}
          errors={errors}
          genderError={gender}
          allPriceGroup={allPriceGroup}
          setAllPriceGroup={setAllPriceGroup}
          selectedPriceGroup={selectedPriceGroup}
          setSelectedPriceGroup={setSelectedPriceGroup}
          allDiscountGroup={allDiscountGroup}
          setAllDiscountGroup={setAllDiscountGroup}
          selectedDiscountGroup={selectedDiscountGroup}
          setSelectedDiscountGroup={setSelectedDiscountGroup}
          control={control}
          cities={cities}
          country={country}
          onCountryChange={onCountryChange}
          error={error}
          addMorePersons={addMorePersons}
          setAddMorePersons={setAddMorePersons}
          handleInputChange={handleInputChange}
          additionalContact={additionalContact}
          handleContactsDataClick={handleContactsDataClick}
          contactsData={contactsData}
          initialColumns={initialColumns}
          handleInputChangeAddress={handleInputChangeAddress}
          additionalAddress={additionalAddress}
          setAdditionalAddress={setAdditionalAddress}
          addMoreAddress={addMoreAddress}
          setAddMoreAddress={setAddMoreAddress}
          addressData={addressData}
          setAddressData={setAddressData}
          handleAddressDataClick={handleAddressDataClick}
          initialColumnsAddress={initialColumnsAddress}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          deleteContactList={deleteContactList}
          contactId={contactId}
          disableAddContact={disableAddContact}
          openPopupAddress={openPopupAddress}
          setOpenPopupAddress={setOpenPopupAddress}
          deleteAddressList={deleteAddressList}
          addressId={addressId}
          setAddressId={setAddressId}
          disableAddAddress={disableAddAddress}
          setDisableAddAddress={setDisableAddAddress}
          additionalContactEdit={additionalContactEdit}
          setAdditionalContactEdit={setAdditionalContactEdit}
          updateContactBtn={updateContactBtn}
          setupdateContactBtn={setupdateContactBtn}
          handleUpdateContact={handleUpdateContact}
          contactBarShow={contactBarShow}
          setContactBarShow={setContactBarShow}
          setAdditionalContact={setAdditionalContact}
          handleUpdateAddress={handleUpdateAddress}
          updateAddressBtn={updateAddressBtn}
          setupdateAddressBtn={setupdateAddressBtn}
          addressBarShow={addressBarShow}
          setAddressBarShow={setAddressBarShow}
          onCountryChangeAdditional={onCountryChangeAdditional}
          additionalCountry={additionalCountry}
          cities2={cities2}
          additionalCity={additionalCity}
          setAdditionalCity={setAdditionalCity}
        />
      </div>
    </div>
  );
}

PersonalDetails.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
