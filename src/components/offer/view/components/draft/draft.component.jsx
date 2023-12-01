import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';
import FiltersModal from '@/common/components/custom-filters-modal/custom-filters-modal';
import DeleteConfirmationModal from '@/common/components/delete-confirmation-modal/delete-confirmation-modal';
import SendEmailModal from '@/common/components/send-email-modal/send-email-modal';
import TextArea from '@/common/components/text-area/text-area.component';
import useDraft from './use-draft.hook';

const initialColumns = [
  { id: '1', name: 'displayId', title: 'Offer #', selected: true },
  { id: '2', name: 'firstName', title: 'First Name', selected: true },
  { id: '3', name: 'lastName', title: 'Last Name', selected: true },
  { id: '4', name: 'company', title: 'Company Name', selected: true },
  { id: '5', name: 'address', title: 'Company Address', selected: true },
  { id: '6', name: 'country', title: 'Country', selected: true },
  { id: '7', name: 'created', title: 'Created At', selected: false },
  { id: '8', name: 'status', title: 'Status', selected: true }
];
export default function DraftContent({ action, allData }) {
  const {
    data,
    openPopup,
    setOpenPopup,
    ref,
    handleBookOffer,
    comment,
    setComment,
    handleAddComment,
    convertToOptions,
    openFilterModal,
    filterModalCloseHandler,
    register,
    handleSubmit,
    onSubmitFilterForm,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice,
    sendEmailModel,
    setSendEmailModel,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleDeleteDrafOffer,
    actionsOption,
    setSearchText,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup
  } = useDraft({ action, allData });

  return (
    <div className="tw-max-w-full tw-overflow-x-auto">
      {openDeleteConfirmation && (
        <DeleteConfirmationModal
          type="danger"
          closeText="Close"
          confirmText="Delete"
          confirmationRef={ref}
          openConfirmationPopup={openDeleteConfirmation}
          setOpenConfirmationPopup={setOpenDeleteConfirmation}
          mainText="Really want to delete the draft offer"
          mainStyling="tw-text-base tw-text-center tw-text-[#46474F] tw-font-medium tw-not-italic tw-leading-6"
          action={handleDeleteDrafOffer}
        />
      )}
      <ReactTooltip
        anchorId="add-pp"
        place="top"
        style={{ backgroundColor: '#F8FAFC', zIndex: 11 }}
        html={`
                  <div><img src="/assets/icons/Base.svg" width="169px" height="128px" /></div>
              `}
      />

      <div className="tw-w-full tw-pb-5">
        <CustomDataTabe
          initialColumns={initialColumns}
          initialTableData={data}
          actionsOption={actionsOption}
          buttonLabel="View Data"
          module="Offer"
          handleBookOffer={handleBookOffer}
          isConvertShow={true}
          isTabTable={true}
          action={action}
          allData={allData}
          convertToOptions={convertToOptions}
          isBookDraft={true}
          handleBook={handleBookOffer}
          setSearchText={setSearchText}
          isLoading={isLoading}
          dataTotallRecords={dataTotallRecords}
          tablePageNum={tablePageNum}
          setTablePageNum={setTablePageNum}
          tablePageSize={tablePageSize}
          setTablePageSize={setTablePageSize}
          openFilterPopup={openFilterPopup}
          setOpenFilterPopup={setOpenFilterPopup}
          renderFilterContent={
            <FiltersModal
              show={openFilterModal}
              onClose={filterModalCloseHandler}
              handleSubmit={handleSubmit}
              register={register}
              onSubmitFilterForm={onSubmitFilterForm}
              selectedNoOfItems={selectedNoOfItems}
              setSelectedNoOfItems={setSelectedNoOfItems}
              selectedNetPrice={selectedNetPrice}
              setSelectedNetPrice={setSelectedNetPrice}
              selectedGrossPrice={selectedGrossPrice}
              setSelectedGrossPrice={setSelectedGrossPrice}
              filterModalCloseHandler={filterModalCloseHandler}
            />
          }
          filterModelWidth="440px"
        />
      </div>
      <Dialog
        className="scrol-bar"
        ref={ref}
        open={openPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '479px'
            }
          },
          zIndex: 13000
        }}
      >
        <div className="tw-h-full tw-w-full">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between tw-bg-[#e3ecf4] tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
              Comments
            </div>
            <div className="hover:tw-cursor-pointer" onClick={() => setOpenPopup(false)}>
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
              <TextArea
                label="Add Comment"
                name="comment "
                placeholder="Enter Comment"
                type="tex"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <div className="tw-mt-6 tw-flex tw-justify-between tw-gap-[20px]">
                <div />

                <div className="tw-flex tw-justify-end tw-gap-5">
                  <CustomButton
                    onClick={() => setOpenPopup(false)}
                    text="Close"
                    className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-medium-gray"
                  />
                  <CustomButton
                    onClick={handleAddComment}
                    name="save"
                    text="Save"
                    className="btn-primary tw-items-center tw-justify-center tw-px-4 tw-py-[11px] tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px]"
                    disabled={!comment}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
      <SendEmailModal
        sendEmailModel={sendEmailModel}
        setSendEmailModel={setSendEmailModel}
      />
    </div>
  );
}

DraftContent.propTypes = {
  action: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired
};
