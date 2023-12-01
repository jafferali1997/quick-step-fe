import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';
import FiltersModal from '@/common/components/custom-filters-modal/custom-filters-modal';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import OuterTabs from '@/common/components/custom-tab/outer-tab/outer-tab.component';
import OptionsModal from '@/common/components/options-modal/options-modal.component';
import RejectionModal from '@/common/components/rejection-modal/rejection-modal';
import Select from '@/common/components/select/select.component';
import SendEmailModal from '@/common/components/send-email-modal/send-email-modal';
import { INVOICE_STATUS_OPTIONS } from '@/common/constants/document-status-options.constant';
import EuroIcon from '@/common/icons/euro.icon';
import InvoicePdf from '@/common/utils/invoice-sepa-download/invoice-pdf.component';
import useOverview from './use-overview.hook';

export default function OverviewContent({ action, allData, rowData }) {
  const {
    ref,
    actionsOption,
    CustomIconPopup,
    openReminderPopup,
    setOpenReminderPopup,
    data,
    initialColumns,
    tabs,
    handleStatusOptionChange,
    rejectionOpenPopup,
    refRejection,
    setRejectionOpenPopup,
    reason,
    setReason,
    handleAddReason,
    sendEmailModel,
    setSendEmailModel,
    convertToOptions,
    refPay,
    openPayPopup,
    payInvoiceSubmit,
    paymentTypeOptions,
    date,
    paymentType,
    setDate,
    handlePaymentType,
    amount,
    setAmount,
    setSearchText,
    invoiceAmount,
    invoice,
    handleCancel,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterModal,
    filterModalCloseHandler,
    handleSubmit,
    register,
    onSubmitFilterForm,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice,
    openFilterPopup,
    setOpenFilterPopup,
    optionsPopUp,
    setOptionsPopUp,
    handleDownloadXMLFile,
    handleDownloadPDFFile,
    singleInvoiceRow
  } = useOverview({ action, allData, rowData });

  return (
    <div>
      {singleInvoiceRow && (
        <div
          style={{
            position: 'absolute',
            left: '-9999px'
          }}
        >
          <InvoicePdf invoice={singleInvoiceRow} products={invoice} />
        </div>
      )}

      <OptionsModal
        ref={ref}
        openPopup={optionsPopUp}
        closePopup={setOptionsPopUp}
        messageLable="Choose the option to download SEPA"
        firstOptionLabel="Download as XML"
        secondOptionLabel="Download as PDF"
        handleFirstOption={handleDownloadXMLFile}
        handleSecondOption={handleDownloadPDFFile}
      />
      {rejectionOpenPopup && (
        <RejectionModal
          refRejection={refRejection}
          rejectionOpenPopup={rejectionOpenPopup}
          setRejectionOpenPopup={setRejectionOpenPopup}
          reason={reason}
          setReason={setReason}
          handleAddReason={handleAddReason}
          module="invoice"
        />
      )}
      <div className="tw-w-full tw-pb-5">
        <CustomDataTabe
          initialColumns={initialColumns}
          initialTableData={data}
          buttonLabel="Add Data"
          CustomIconPopup={CustomIconPopup}
          actionsOption={actionsOption}
          module="Invoices"
          isTabTable={true}
          customStatusOptions={INVOICE_STATUS_OPTIONS}
          statusAction={handleStatusOptionChange}
          handleStatusChange={handleStatusOptionChange}
          setSearchText={setSearchText}
          convertToOptions={convertToOptions}
          isDateShow={true}
          isConvertShow={true}
          action={action}
          allData={allData}
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
        />
      </div>
      {/* reminder dialog */}
      <Dialog
        className="!tw-rounded-[20px]"
        // ref={ref}
        open={openReminderPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '600px'
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
          <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-p-5">
            <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
              Reminders
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setOpenReminderPopup(false)}
            >
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
          <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
            <div className="tw-p-4">
              <h2 className="tw-text-base tw-font-bold tw-not-italic tw-leading-6 tw-text-text-black">
                List of Reminders
              </h2>
              <div className="">
                <OuterTabs inPopup={true} tabs={tabs} />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {/* Paid invoice component */}

      <Dialog
        className="!tw-rounded-[20px]"
        ref={refPay}
        open={openPayPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              borderRadius: '20px',
              width: '100%',
              maxWidth: '519px' // Set your width here
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
          <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#1D4ED826] tw-p-5">
            <div className="tw-text-xl tw-font-medium tw-capitalize tw-not-italic tw-leading-[30px] tw-text-text-black">
              Pay Invoice
            </div>
            <div className="hover:tw-cursor-pointer" onClick={handleCancel}>
              <img width="16" height="16" src="/assets/icons/cancel-icon.svg" alt="" />
            </div>
          </div>
          <DialogContent className="tw-rounded-xl">
            <div>
              <div className="tw-flex tw-flex-col tw-gap-6">
                <CustomInput
                  label="Date"
                  name="date"
                  defaultValue={new Date().toISOString().substr(0, 10)}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Select
                  label="Payment Type"
                  name="paymentType"
                  placeholder="Select Payment Type"
                  onChange={(e, value) => handlePaymentType(value)}
                  options={paymentTypeOptions}
                />
                <div>
                  <CustomInput
                    label="Amount"
                    name="partialPayment"
                    placeholder="Enter Amount"
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    endIcon={<EuroIcon />}
                  />
                </div>
              </div>
              <div className="tw-mt-6 tw-flex tw-w-full tw-flex-col tw-gap-4 tw-rounded-xl tw-bg-[#FBFBFB] tw-px-4 tw-pb-[24px] tw-pt-2">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Amount
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    € {invoiceAmount || 0}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Due Date
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    {invoice.expiryDate}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Partial Payment
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    € {amount || 0}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Remaining Amout
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    € {invoiceAmount <= amount ? 0 : invoiceAmount - amount || 0}
                  </p>
                </div>

                <div className=" tw-min-h-[1px] tw-w-full tw-bg-[#CFCFCF]" />
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                    Total Balance
                  </p>
                  <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                    € {invoiceAmount <= amount ? 0 : invoiceAmount - amount || 0}
                  </p>
                </div>
              </div>
              <div className="tw-mt-6 tw-flex tw-items-center tw-justify-end tw-gap-6">
                <CustomButton
                  text="cancel"
                  className="btn-white-cancel tw-text-sm"
                  onClick={handleCancel}
                />
                <CustomButton
                  text="pay"
                  type="submit"
                  className="btn-primary tw-text-sm"
                  onClick={payInvoiceSubmit}
                  disabled={!date || !amount || !paymentType}
                />
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

OverviewContent.propTypes = {
  action: PropTypes.func.isRequired,
  allData: PropTypes.func.isRequired,
  rowData: PropTypes.string
};
