'use client';

import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import DeleteConfirmationModal from '@/common/components/delete-confirmation-modal/delete-confirmation-modal';
import PageStructureModal from '@/common/components/page-structure-modal/page-structure-modal';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import TinyMcEditor from '@/common/components/tinymc-editor/tinymc-editor';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import PlusIcon from '@/common/icons/plus.icon';
import '@/common/styles/globals.style.css';
import useFooterDetails from './use-footer-details.hook';

export default function FooterDetails({ handleTabClick, handleTabCompleted }) {
  const {
    setIsSubmit,
    onSubmit,
    ref,
    bodyTitle,
    bodyDescription,
    disclaimerDescription,
    handleBodyChange,
    handleDisclaimerChange,
    handleDeleteOfferBody,
    handleAddBody,
    disclaimerOpen,
    setDisclaimerOpen,
    allOfferDisclaimer,
    handleEditOfferBody,
    handleSelectedBodyOffer,
    handleSelectedDisclaimerOffer,
    selectedDisclaimerOffer,
    termsAndConditions,
    handleTermsAndConditionChange,
    handleCopyRightChange,
    copyRight,
    confirmationRef,
    openConfirmationPopup,
    setOpenConfirmationPopup,
    handleClose,
    handleBodyTitle,
    handleDisclaimerTitle,
    disclaimerTitle,
    openBodyPopUp,
    openDisclaimerPopup,
    handleAddBodyPopUp,
    handleAddDiscalimerPopUp,
    allBodyOffer,
    bodyOpen,
    setBodyOpen,
    selectedBodyOffer,
    bodyForEdit,
    handleDeleteBody,
    handleEditOfferDisclaimer,
    handleDeleteDisclaimer,
    handleAddDisclaimer,
    deliveryDate,
    expiryDate,
    handleDeliveryDate,
    handleExpiryDate,
    bodyOfferId,
    discalimerOfferId
  } = useFooterDetails(handleTabClick, handleTabCompleted);

  return (
    <div>
      <DeleteConfirmationModal
        id={bodyForEdit || discalimerOfferId}
        confirmText="Yes"
        type="primary"
        closeText="Cancel"
        ref={confirmationRef}
        openConfirmationPopup={openConfirmationPopup}
        setOpenConfirmationPopup={setOpenConfirmationPopup}
        mainText="Are you really want to delete?"
        subText={`Are you really want to delete this ${
          bodyForEdit ? 'body' : 'disclaimer'
        } text. This ${
          bodyForEdit ? 'body' : 'disclaimer'
        }  text will be permanently remove from the system.`}
        mainStyling="tw-text-base tw-text-center tw-text-[#46474F] tw-font-medium tw-not-italic tw-leading-6"
        subStyling="tw-text-center tw-text-xs tw-not-italic tw-font-normal tw-leading-[18px] tw-text-[#585858]"
        action={handleDeleteOfferBody}
      />

      <div className="tw-flex tw-items-center tw-rounded-md tw-bg-[#eff6ff] tw-p-2 tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
        Header & Body
      </div>

      <div className="form-box-grid-2col tw-mt-6">
        <CustomInput
          label="Delivery Date"
          name="Date"
          type="date"
          value={deliveryDate}
          onChange={handleDeliveryDate}
        />
        <CustomInput
          label="Expiry Date"
          name="Date"
          type="date"
          value={expiryDate}
          onChange={handleExpiryDate}
        />
      </div>

      <div>
        <h3 className="form-inner-heading tw-mb-4 tw-mt-6">Body</h3>
        <div className="tw-flex tw-items-start tw-justify-between">
          <div
            ref={ref}
            className="tw-relative tw-min-w-[250px]  tw-rounded tw-border-r tw-border-t tw-border-solid tw-border-r-disabled-input tw-border-t-disabled-input"
          >
            {' '}
            <div
              onClick={() => setBodyOpen(!bodyOpen)}
              className="tw-flex tw-h-9 tw-w-[257px] tw-flex-row tw-items-center tw-justify-between tw-gap-[46px] tw-bg-[#bbbbbb26]  tw-py-2  tw-pl-2  tw-pr-2 hover:tw-cursor-pointer "
            >
              <p className="tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                {(selectedBodyOffer && selectedBodyOffer.bodyTitle) || 'Default Text'}
              </p>
              {bodyOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1667 9.51174C14.4921 9.18635 14.4921 8.65879 14.1667 8.33341V8.33341C13.8413 8.00802 13.3137 8.00802 12.9884 8.33341L10.7071 10.6146C10.3166 11.0052 9.68344 11.0052 9.29292 10.6146L7.01169 8.33341C6.68631 8.00802 6.15875 8.00802 5.83336 8.33341V8.33341C5.50797 8.65879 5.50797 9.18635 5.83336 9.51174L9.29292 12.9713C9.68344 13.3618 10.3166 13.3618 10.7071 12.9713L14.1667 9.51174Z"
                    fill="#46474F"
                  />
                </svg>
              ) : (
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.51302 0.833306C1.18763 0.507919 0.660076 0.50792 0.334689 0.833307C0.00930119 1.15869 0.00930119 1.68625 0.334688 2.01164L2.61591 4.29287C3.00644 4.68339 3.00644 5.31656 2.61592 5.70708L0.33469 7.98831C0.00930166 8.31369 0.00930071 8.84125 0.334688 9.16664C0.660076 9.49203 1.18763 9.49203 1.51302 9.16664L4.97258 5.70708C5.36311 5.31656 5.36311 4.68339 4.97258 4.29287L1.51302 0.833306Z"
                    fill="#46474F"
                  />
                </svg>
              )}
            </div>
            {bodyOpen && (
              <div className="tw-absolute tw-top-[100%] tw-z-10 tw-rounded tw-border-b tw-border-l tw-border-solid tw-border-b-disabled-input tw-border-l-disabled-input hover:tw-cursor-pointer">
                {allBodyOffer?.map((offer) => {
                  return (
                    <div
                      className=" tw-flex tw-h-[33px] tw-w-[257px] tw-items-center tw-justify-between tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-px-4 tw-py-2"
                      onClick={() => {
                        handleSelectedBodyOffer(offer);
                      }}
                    >
                      <p className="tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-base tw-font-normal tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                        {offer?.bodyTitle}
                      </p>

                      {offer?.bodyTitle !== 'Default Text' && (
                        <div
                          className="pencel-svg"
                          onClick={() => handleEditOfferBody(offer)}
                        >
                          <img
                            src="/assets/icons/edit-gray.svg"
                            alt="edit"
                            className="tw-h-[13px] tw-w-4"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <CustomButton
            className="btn-secondary tw-text-sm "
            text="Add Body Text"
            onClick={handleAddBodyPopUp}
            startIcon={<PlusIcon />}
          />
        </div>
        <PageStructureModal
          ref={ref}
          openPopup={openBodyPopUp}
          edit={bodyForEdit}
          header="Body Text"
          title={bodyTitle}
          description={bodyDescription}
          handleClose={handleClose}
          handleTitle={handleBodyTitle}
          handleEditorChange={handleBodyChange}
          handleSave={handleAddBody}
          handleDelete={handleDeleteBody}
        />
        <div className="tw-mt-4">
          {selectedBodyOffer?.bodyDescription ? (
            <div
              className="tw-rounded-[6px] tw-border tw-border-solid tw-border-disabled-input tw-px-2.5 tw-py-[13px] tw-text-base tw-font-normal tw-leading-6"
              dangerouslySetInnerHTML={{
                __html: selectedBodyOffer?.bodyDescription
              }}
            />
          ) : (
            <div className="tw-h-[98px] tw-rounded-[6px] tw-border  tw-border-solid tw-border-disabled-input tw-px-2.5 tw-py-[13px] tw-text-base tw-font-normal tw-leading-6">
              <div className="tw-text-sm tw-font-medium tw-leading-[17.5px]">
                Dear Sir or Madam,
              </div>
              <div className="tw-text-sm tw-font-normal tw-leading-[17.5px]">
                As discussed, we would like to make you the following offer
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="tw-mt-[43px] tw-flex tw-items-center tw-rounded-md tw-bg-[#eff6ff] tw-p-2 tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Footer
        </div>
        <div className="tw-mt-6 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
          Disclaimer
        </div>
        <div className=" tw-mt-[18px] tw-flex tw-items-center tw-justify-between">
          <div
            ref={ref}
            className="tw-relative tw-min-w-[250px]  tw-rounded tw-border-r tw-border-t tw-border-solid tw-border-r-disabled-input tw-border-t-disabled-input"
          >
            {' '}
            <div
              onClick={() => setDisclaimerOpen(!disclaimerOpen)}
              className="tw-flex tw-h-[36px] tw-w-[257px] tw-flex-row tw-items-center tw-justify-between tw-gap-[46px] tw-bg-[#bbbbbb26]  tw-py-2  tw-pl-2  tw-pr-2 hover:tw-cursor-pointer "
            >
              <p className="tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                {(selectedDisclaimerOffer && selectedDisclaimerOffer.disclaimerTitle) ||
                  'Disclaimer Text'}
              </p>
              {disclaimerOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1667 9.51174C14.4921 9.18635 14.4921 8.65879 14.1667 8.33341V8.33341C13.8413 8.00802 13.3137 8.00802 12.9884 8.33341L10.7071 10.6146C10.3166 11.0052 9.68344 11.0052 9.29292 10.6146L7.01169 8.33341C6.68631 8.00802 6.15875 8.00802 5.83336 8.33341V8.33341C5.50797 8.65879 5.50797 9.18635 5.83336 9.51174L9.29292 12.9713C9.68344 13.3618 10.3166 13.3618 10.7071 12.9713L14.1667 9.51174Z"
                    fill="#46474F"
                  />
                </svg>
              ) : (
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.51302 0.833306C1.18763 0.507919 0.660076 0.50792 0.334689 0.833307C0.00930119 1.15869 0.00930119 1.68625 0.334688 2.01164L2.61591 4.29287C3.00644 4.68339 3.00644 5.31656 2.61592 5.70708L0.33469 7.98831C0.00930166 8.31369 0.00930071 8.84125 0.334688 9.16664C0.660076 9.49203 1.18763 9.49203 1.51302 9.16664L4.97258 5.70708C5.36311 5.31656 5.36311 4.68339 4.97258 4.29287L1.51302 0.833306Z"
                    fill="#46474F"
                  />
                </svg>
              )}
            </div>
            {disclaimerOpen && (
              <div className="tw-absolute tw-top-[100%] tw-z-10 tw-rounded tw-border-b tw-border-l tw-border-solid tw-border-b-disabled-input tw-border-l-disabled-input hover:tw-cursor-pointer">
                {allOfferDisclaimer?.map((offer) => {
                  return (
                    <div
                      className="tw-flex tw-h-[33px] tw-w-[257px] tw-items-center tw-justify-between tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-px-4 tw-py-2"
                      onClick={() => {
                        handleSelectedDisclaimerOffer(offer);
                        setDisclaimerOpen(false);
                      }}
                    >
                      <p className="tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-base tw-font-normal tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                        {offer?.disclaimerTitle}
                      </p>
                      {offer?.disclaimerTitle !== 'Disclaimer Text' && (
                        <div
                          className="pencel-svg"
                          onClick={() => handleEditOfferDisclaimer(offer)}
                        >
                          <img
                            src="/assets/icons/edit-gray.svg"
                            alt="edit"
                            className="tw-h-[13px] tw-w-4"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <CustomButton
            text="Add Disclaimer Text"
            className="btn-secondary tw-text-sm tw-font-semibold tw-leading-[16.94px]"
            onClick={handleAddDiscalimerPopUp}
            startIcon={<PlusIcon />}
          />
        </div>

        <PageStructureModal
          ref={ref}
          openPopup={openDisclaimerPopup}
          edit={discalimerOfferId}
          header="Disclaimer Text"
          title={disclaimerTitle}
          description={disclaimerDescription}
          handleClose={handleClose}
          handleTitle={handleDisclaimerTitle}
          handleEditorChange={handleDisclaimerChange}
          handleSave={handleAddDisclaimer}
          handleDelete={handleDeleteDisclaimer}
        />

        <div className="tw-my-4">
          <div
            className="tw-rounded-[6px] tw-border tw-border-solid tw-border-disabled-input tw-px-2.5 tw-py-[13px] tw-text-[14px] tw-font-normal tw-leading-6"
            dangerouslySetInnerHTML={{
              __html: selectedDisclaimerOffer?.disclaimerDescription
            }}
          />
        </div>
        <div className="tw-mt-[-4px]">
          <div className="tw-mb-3 tw-text-sm tw-font-bold tw-not-italic tw-leading-[26px] tw-text-text-dark-gray">
            Terms and conditions
          </div>
          <TinyMcEditor
            description={termsAndConditions}
            handleEditorChange={handleTermsAndConditionChange}
          />
        </div>
        <div className="tw-mt-4">
          <div className="tw-mb-3 tw-text-sm tw-font-bold tw-not-italic tw-leading-[26px] tw-text-text-dark-gray">
            Copy Right
          </div>
          <TinyMcEditor
            description={copyRight}
            handleEditorChange={handleCopyRightChange}
          />
          <p className="tw-mt-1 tw-text-right tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-medium-gray">
            Max: 575
          </p>
        </div>
        <StepperFooter
          back={DOCUMENT_TABS.LINE_ITEMS}
          handleTabClick={handleTabClick}
          setIsSubmit={setIsSubmit}
          disabled={!bodyOfferId || !discalimerOfferId || !deliveryDate || !expiryDate}
        />
      </form>
    </div>
  );
}
FooterDetails.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
