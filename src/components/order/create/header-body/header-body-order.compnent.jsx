'use client';

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@mui/material/node';
import { Editor } from '@tinymce/tinymce-react';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import PlusIcon from '@/common/icons/plus.icon';
import useHeaderBodyOrder from './use-header-body-order.hook';
import DeleteConfirmationModal from '@/common/components/delete-confirmation-modal/delete-confirmation-modal';
import '@/common/styles/globals.style.css';

export default function HeaderBodyOrder({ handleTabClick, handleTabCompleted }) {
  const {
    setIsSubmit,
    onSubmit,
    business,
    openPopup,
    setOpenPopup,
    disclaimerOpen,
    setDisclaimerOpen,
    ref,
    handleAddBodyText,
    bodyTitle,
    setBodyTitle,
    bodyDescription,
    editorRef,
    allBodyOffer,
    handleEditOfferBody,
    handleEditorChange,
    offerId,
    handleDeleteOfferBody,
    handleSelectedOffer,
    selectedOffer,
    handleDuplicateDeliveryDate,
    deliveryDate,
    confirmationRef,
    openConfirmationPopup,
    setOpenConfirmationPopup,
    handleClose,
    forEdit,
    handleAddBodyTextPopUp,
    handleBodyTitle
  } = useHeaderBodyOrder({
    handleTabClick,
    handleTabCompleted
  });

  return (
    <div>
      <DeleteConfirmationModal
        id={forEdit}
        confirmText="Yes"
        type="primary"
        closeText="Cancel"
        confirmationRef={confirmationRef}
        openConfirmationPopup={openConfirmationPopup}
        setOpenConfirmationPopup={setOpenConfirmationPopup}
        mainText="Are you really want to delete this Body text?"
        subText="This Body text will be permanently remove from the system."
        mainStyling="tw-text-base tw-text-center tw-text-[#46474F] tw-font-medium tw-not-italic tw-leading-6"
        subStyling="tw-text-center tw-text-xs tw-not-italic tw-font-normal tw-leading-[18px] tw-text-[#585858]"
        action={handleDeleteOfferBody}
      />
      <div className="personal-details-wrapper">
        <div className="content-header tw-flex tw-items-center tw-justify-between ">
          <h3 className="form-inner-heading">Header</h3>
        </div>
        <div className="content-body">
          {' '}
          <form onSubmit={onSubmit}>
            <div className="form-box-grid-2col tw-mt-4">
              <CustomInput
                label="Company Name"
                name="companyName"
                value={business.businessName}
                type="text"
                disabled={true}
              />
              <CustomInput
                label="Company Slogan"
                name="companySlogan"
                value={business.slogan}
                type="text"
                disabled={true}
              />
              <CustomInput
                label="Date"
                name="Date"
                type="date"
                isRequired={true}
                value={deliveryDate}
                onChange={handleDuplicateDeliveryDate}
              />
              <CustomInput
                label="Company Email"
                name="Company Email"
                value={business.businessEmail}
                type="text"
                disabled={true}
              />
              <CustomInput
                label="Company Address"
                name="Company Address"
                value={business.address}
                type="text"
                disabled={true}
              />
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                  Company Logo
                </label>
                <div className="tw-mt-[-6px] tw-flex tw-h-[70.05px] tw-w-[216px] tw-flex-col tw-items-center tw-justify-center tw-rounded-[10px] tw-border tw-border-solid tw-border-text-ultra-light-gray tw-bg-white">
                  <img
                    className="tw-h-[52px] tw-w-[161px]"
                    src="/assets/images/logo.png"
                    alt="logo"
                  />
                </div>
              </div>
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
                    onClick={() => setDisclaimerOpen(!disclaimerOpen)}
                    className="tw-flex tw-h-9 tw-w-[257px] tw-flex-row tw-items-center tw-justify-between tw-gap-[46px] tw-bg-[#bbbbbb26]  tw-py-2  tw-pl-2  tw-pr-2 hover:tw-cursor-pointer "
                  >
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                      {(selectedOffer && selectedOffer.bodyTitle) || 'Default Text'}
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
                      {allBodyOffer?.map((offer) => {
                        return (
                          <div
                            className=" tw-flex tw-h-[33px] tw-w-[257px] tw-items-center tw-justify-between tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-px-4 tw-py-2"
                            onClick={() => {
                              handleSelectedOffer(offer);
                              setDisclaimerOpen(false);
                            }}
                          >
                            <p className="tw-text-base tw-font-normal tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                              {offer?.bodyTitle}
                            </p>

                            {offer?.bodyTitle !== 'Default Text' && (
                              <div
                                className="pencel-svg"
                                onClick={() => handleEditOfferBody(offer)}
                              >
                                <svg
                                  width="12"
                                  height="13"
                                  viewBox="0 0 12 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_8266_32643)">
                                    <path
                                      d="M7.41061 2.51552L0.808079 9.11856C0.774832 9.15189 0.751137 9.19354 0.739465 9.23915L0.00761329 12.1766C-0.0031504 12.2202 -0.00249077 12.2658 0.00952847 12.3091C0.0215477 12.3523 0.0445204 12.3917 0.0762275 12.4235C0.124929 12.4721 0.190869 12.4994 0.259629 12.4994C0.280841 12.4994 0.30197 12.4968 0.322542 12.4916L3.25996 11.7597C3.30564 11.7482 3.34733 11.7245 3.38057 11.6912L9.98371 5.08857L7.41061 2.51552ZM11.6194 1.6152L10.8845 0.880253C10.3933 0.389037 9.53711 0.389525 9.04646 0.880253L8.14617 1.78057L10.7191 4.35353L11.6194 3.45324C11.8648 3.20797 12 2.88149 12 2.53428C12 2.18707 11.8648 1.86059 11.6194 1.6152Z"
                                      fill="#585858"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_8266_32643">
                                      <rect
                                        width="12"
                                        height="12"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
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
                  onClick={handleAddBodyTextPopUp}
                  startIcon={<PlusIcon />}
                />
                <Dialog
                  className="scrol-bar"
                  sx={{
                    '& .MuiDialog-paper': {
                      borderRadius: '20px',
                      display: 'flex'
                    }
                  }}
                  ref={ref}
                  open={openPopup}
                >
                  <div className="tw-max-h-full tw-w-[909px] tw-max-w-full ">
                    <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between tw-bg-[#e3ecf4] tw-px-5">
                      <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                        {forEdit ? 'Edit Body Text' : 'Add Body Text'}
                      </div>
                      <div className="hover:tw-cursor-pointer" onClick={handleClose}>
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
                      <div className="tw-w-full">
                        <div className="tw-mb-[-20px] tw-flex tw-justify-between tw-text-[10px] tw-font-normal tw-leading-[15px]">
                          <div />
                          <div className=" tw-text-[10px] tw-font-normal tw-leading-[15px] tw-text-text-medium-gray">
                            Max: {256 - (bodyTitle.length || 0)}
                          </div>
                        </div>
                        <CustomInput
                          label="Title"
                          name="Title "
                          placeholder="Enter Title"
                          type="tex"
                          value={bodyTitle}
                          className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]"
                          onChange={(e) => handleBodyTitle(e)}
                        />
                        <div className="tw tw-mt-[19px] tw-flex tw-flex-col tw-gap-2">
                          <div className="tw-flex tw-justify-between">
                            <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                              Text
                            </div>
                            <div className="tw-flex tw-justify-between tw-text-[10px] tw-font-normal tw-leading-[15px]">
                              <div />
                              <div className="tw-text-[10px] tw-font-normal tw-leading-[15px] tw-text-text-medium-gray">
                                Max: {5000 - (bodyDescription.length || 0)}
                              </div>
                            </div>
                          </div>
                          <Editor
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            initialValue=""
                            value={bodyDescription}
                            onEditorChange={handleEditorChange}
                            init={{
                              height: 235,
                              menubar: false,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor  textcolor colorpicker',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                              ],
                              toolbar:
                                'undo redo | formatselect | ' +
                                'bold italic  backcolor removeformat | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                ' help',
                              content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                          />
                        </div>

                        <div className="tw-mt-[35px] tw-flex tw-justify-between tw-gap-[20px]">
                          <div>
                            {forEdit && (
                              <CustomButton
                                onClick={() => {
                                  setOpenConfirmationPopup(true);
                                  setOpenPopup(false);
                                }}
                                text="delete"
                                className="btn-danger tw-bg-[#EF2020] tw-px-6 tw-py-2 tw-text-white"
                              />
                            )}
                          </div>

                          <div className="tw-flex tw-justify-end tw-gap-5">
                            <CustomButton
                              onClick={handleClose}
                              text="cancel"
                              className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-medium-gray"
                            />
                            <CustomButton
                              onClick={handleAddBodyText}
                              text={forEdit ? 'Update' : 'Add'}
                              className="btn-primary tw-px-6 tw-py-2 tw-text-sm tw-font-semibold tw-leading-[16.94px]"
                              disabled={!bodyTitle || !bodyDescription}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </div>
                </Dialog>
              </div>
              <div className="tw-mt-4">
                {selectedOffer?.bodyDescription ? (
                  <div
                    className="tw-rounded-[6px] tw-border tw-border-solid tw-border-disabled-input tw-px-2.5 tw-py-[13px] tw-text-base tw-font-normal tw-leading-6"
                    dangerouslySetInnerHTML={{
                      __html: selectedOffer?.bodyDescription
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
                <div className="tw-flex tw-justify-between">
                  <div></div>
                  <div className="tw-mt-1 tw-text-[10px] tw-font-normal tw-leading-[15px] tw-text-text-medium-gray">
                    Max: 575
                  </div>
                </div>
              </div>
            </div>

            <StepperFooter
              back="customerDetails"
              handleTabClick={handleTabClick}
              setIsSubmit={setIsSubmit}
              disabled={!selectedOffer || !deliveryDate}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
HeaderBodyOrder.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
