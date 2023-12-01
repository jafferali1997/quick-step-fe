/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/button-has-type */

import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import DownloadDropdownBtn from '@/common/components/download-dropdown-button/download-dropdown-button.component';
import Loader from '@/common/components/loader/loader.component';
import ExpenditurePdf from '@/common/components/pdf/expenditure-component.pdf';
import TextArea from '@/common/components/text-area/text-area.component';
import useClickOutside from '@/common/hooks/use-click-outside';
import EuroIcon from '@/common/icons/euro.icon';
import PlusIcon from '@/common/icons/plus.icon';
import { Dialog, DialogContent } from '@mui/material/node';
import ViewExpenditureFilterContent from './component/view-expenditure-filter-content.component';
import useViewExpenditure from './use-view-expenditure.hook';

const dropdownoptions = [
  { id: 1, name: 'Download PDF', link: '' },
  { id: 2, name: 'option2', link: '/option2' },
  { id: 3, name: 'option3', link: '/option3' }
];

const initialColumns = [
  { id: '1', name: 'firstName', title: 'First Name', selected: true },
  { id: '2', name: 'lastName', title: 'Last Name', selected: true },
  { id: '3', name: 'companyName', title: 'Company Name', selected: true },
  { id: '4', name: 'description', title: 'Description', selected: false },
  { id: '5', name: 'amount', title: 'Amount', selected: true },
  { id: '6', name: 'dueDate', title: 'Due Date', selected: true },
  { id: '7', name: 'dateOfReceipt', title: 'Date of Receipt', selected: true },
  { id: '8', name: 'status', title: 'Status', selected: true }
];

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'OPEN', label: 'Open' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'INVOICED', label: 'Invoiced' }
];

export default function ViewExpenditure() {
  const {
    ref,
    refDelete,
    openPopup,
    setOpenPopup,
    actionsOption,
    openDeletePopup,
    setDeleteOpenPopup,
    openReceiptPopup,
    setReceiptOpenPopup,
    refReceipt,
    doubleActionOption,
    allExpenditureData,
    deleteRow,
    viewReceipt,
    handleDeleteExpenditure,
    openPayPopup,
    setPayOpenPopup,
    payExpenditureSubmit,
    payRegister,
    payControl,
    payErrors,
    singleExpenditureData,
    payBalance,
    partialPayment,
    totalPartialPayment,
    CustomIconPopup,
    payExpenditurehandleSubmit,
    openSummaryPopup,
    setSummaryOpenPopup,
    refSummary,
    summaryData,
    totalSummerPartialPayment,
    totalSummaryBalance,
    register,
    register2,
    handleSubmit,
    handleSubmit2,
    reset,
    reset2,
    onSubmitFilterForm2,
    selectedInstallments,
    setSelectedInstallments,
    selectedPaymentAmount,
    setSelectedPaymentAmount,
    selectedStatus,
    setSelectedStatus,
    handleSelectAllExpenditure,
    dropdownOptions,
    data,
    cashDiscount,
    reverseDateFormat,
    summeryDiscount,
    setSearchText,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    allCompanyOption,
    setCompanyName,
    filterModalCloseHandler,
    openFilterModal,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice,
    openFilterPopup,
    setOpenFilterPopup,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    deleteLoader
  } = useViewExpenditure();
  useClickOutside([refReceipt, ref], [setReceiptOpenPopup, setSummaryOpenPopup]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '-9999px'
        }}
      >
        {data?.map((offer) => {
          return (
            <ExpenditurePdf
              viewReceipt={offer}
              setReceiptOpenPopup={setReceiptOpenPopup}
            />
          );
        })}
      </div>
      <div className="tw-w-full tw-bg-[#FBFBFB] tw-px-[24px] tw-pb-8 tw-pt-3">
        <div className="tw-mt-3 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
          <h2 className="tw-font-dm tw-text-[22px] tw-font-medium tw-capitalize tw-leading-[33px] tw-text-text-dark-gray">
            List of Expenditures
          </h2>
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4">
            <DownloadDropdownBtn
              text="Download Expenditures"
              dropdownoptions={dropdownOptions}
              data={data}
            />
            <a
              href="/expenditure/create"
              className="btn-primary-blue tw-flex tw-items-center tw-gap-1 tw-rounded-md tw-border-none tw-p-3 tw-text-sm tw-font-medium"
            >
              <PlusIcon /> Create
            </a>
          </div>
        </div>
        <CustomDataTabe
          initialColumns={initialColumns}
          initialTableData={allExpenditureData}
          doubleActionOption={doubleActionOption}
          buttonLabel="View History"
          CustomIconPopup={CustomIconPopup}
          register={register}
          handleSubmit={handleSubmit}
          reset={reset}
          setSearchText={setSearchText}
          module="Expenditure"
          // actionsOption={actionsOption}
          // statusOptions={statusOptions}
          action={handleSelectAllExpenditure}
          isLoading={isLoading}
          dataTotallRecords={dataTotallRecords}
          tablePageNum={tablePageNum}
          setTablePageNum={setTablePageNum}
          tablePageSize={tablePageSize}
          setTablePageSize={setTablePageSize}
          openFilterPopup={openFilterPopup}
          setOpenFilterPopup={setOpenFilterPopup}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
          renderFilterContent={
            <ViewExpenditureFilterContent
              show={openFilterModal}
              onClose={filterModalCloseHandler}
              handleSubmit={handleSubmit2}
              register={register2}
              onSubmitFilterForm={onSubmitFilterForm2}
              selectedNoOfItems={selectedNoOfItems}
              setSelectedNoOfItems={setSelectedNoOfItems}
              selectedNetPrice={selectedNetPrice}
              setSelectedNetPrice={setSelectedNetPrice}
              selectedGrossPrice={selectedGrossPrice}
              setSelectedGrossPrice={setSelectedGrossPrice}
              selectedInstallments={selectedInstallments}
              setSelectedInstallments={setSelectedInstallments}
              selectedPaymentAmount={selectedPaymentAmount}
              setSelectedPaymentAmount={setSelectedPaymentAmount}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              allCompanyOption={allCompanyOption}
              setCompanyName={setCompanyName}
            />
          }
        />
      </div>
      {/* view summery */}

      <Dialog
        className="!tw-rounded-[20px]"
        ref={refSummary}
        open={openSummaryPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '300px'
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
          <div className="tw-flex tw-h-10 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-px-5 tw-py-3">
            <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
              View Summary
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setSummaryOpenPopup(false)}
            >
              <svg
                width="11"
                height="11"
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
          <DialogContent
            sx={{ padding: '0px 0px 0px 0px' }}
            className="tw-rounded-[20px] tw-bg-white"
          >
            <div className="tw-mx-6 tw-my-4 tw-flex tw-flex-col  tw-gap-4">
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Company Name:
                </div>
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {summaryData?.companyName}
                </div>
              </div>
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Customer Name:
                </div>
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {`${summaryData?.customer?.firstName ?? '--'} ${
                    summaryData?.customer?.lastName ?? '--'
                  }`}
                </div>
              </div>
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Due Date:
                </div>
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {summaryData?.dueDate}
                </div>
              </div>
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Receipt Date:
                </div>
                <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {summaryData?.receiptDate}
                </div>
              </div>
            </div>
            <div className="tw-mx-5 tw-my-4 tw-flex tw-flex-col  tw-gap-2  tw-rounded-xl tw-bg-[#bbbbbb1a] tw-px-2 tw-pb-[19px] tw-pt-2.5">
              <div className="tw-flex tw-items-center tw-justify-between">
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Payment Amount
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  € {summaryData?.paymentAmount}
                </p>
              </div>
              <div className="tw-flex tw-items-center tw-justify-between">
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Discount Amount
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  € {Number(summeryDiscount)?.toFixed(2) ?? 0}
                </p>
              </div>
              <div className="tw-flex tw-items-center tw-justify-between">
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Partial Payment
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  € {totalSummerPartialPayment}
                </p>
              </div>
              <div className=" tw-my-2 tw-min-h-[1px] tw-w-full tw-bg-[#CFCFCF]" />
              <div className="tw-flex tw-items-center tw-justify-between">
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  Balance
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  € {totalSummaryBalance?.toFixed(2) ?? 0}
                </p>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
      {/* delete dialog */}
      <Dialog
        className="!tw-rounded-[20px]"
        ref={refDelete}
        open={openDeletePopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '474px' // Set your width here
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full  tw-max-w-full tw-overflow-y-auto ">
          <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
            <div className="tw-flex tw-flex-col tw-items-center tw-rounded-[20px] tw-bg-white tw-px-6 tw-py-10">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <g clipPath="url(#clip0_8079_155896)">
                    <path
                      d="M36 0C16.1028 0 0 16.101 0 36C0 55.8969 16.101 72 36 72C55.8972 72 72 55.899 72 36C72 16.1028 55.899 0 36 0ZM34.9348 52.8495C32.8971 52.8495 31.3334 51.1436 31.3334 49.2006C31.3334 47.2103 32.9445 45.552 34.9348 45.552C36.9252 45.552 38.5834 47.2105 38.5834 49.2008C38.5834 51.1435 36.9723 52.8495 34.9348 52.8495ZM40.3367 34.416C37.7305 36.4537 37.683 37.8752 37.683 40.3393C37.683 41.2398 37.2091 42.2823 34.8872 42.2823C32.9442 42.2823 32.281 41.5714 32.281 39.1074C32.281 35.0321 34.0817 33.0892 35.4559 31.9046C37.0197 30.5776 39.6734 29.1088 39.6734 26.55C39.6734 24.37 37.7779 23.3276 35.4085 23.3276C30.5751 23.3276 31.6177 26.9765 29.0586 26.9765C27.7792 26.9765 26.2155 26.1233 26.2155 24.2754C26.2155 21.7166 29.1534 17.9255 35.5507 17.9255C41.6161 17.9255 45.6441 21.2901 45.6441 25.7444C45.6441 30.1987 41.6161 33.4209 40.3367 34.416Z"
                      fill="#EF2020"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8079_155896">
                      <rect width="72" height="72" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className=" tw-mt-6 tw-text-center tw-text-base tw-font-bold tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                Are you really want to delete this Expenditure for the company{' '}
                {deleteRow?.companyName}
              </h3>
              <p className="tw-mt-2 tw-text-center tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                This Expenditure will be permanently remove from the system.
              </p>
              <div className="tw-mt-[48px] tw-flex tw-justify-center tw-gap-8">
                <CustomButton
                  onClick={() => setDeleteOpenPopup(false)}
                  text="No"
                  className="btn-white-cancel tw-h-[40px] tw-w-[75px]"
                />
                <CustomButton
                  type="submit"
                  className="btn-danger tw-h-[40px] tw-w-[75px] "
                  text={!deleteLoader && 'Yes'}
                  startIcon={<Loader loading={deleteLoader} />}
                  disabled={deleteLoader}
                  onClick={() => handleDeleteExpenditure(deleteRow?.id)}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {/* receipt dialog */}
      <Dialog
        className="!tw-rounded-[20px]"
        ref={refReceipt}
        open={openReceiptPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '1140px' // Set your width here
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full  tw-max-w-full tw-overflow-y-auto ">
          <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
            <div className=" tw-flex tw-min-h-[798px]">
              <div className="tw-flex tw-min-w-[495px] tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-bg-[#1d4ed81a]">
                <div>
                  <img
                    src="/assets/images/receipt.png"
                    className="tw-w-full"
                    alt="receipt"
                  />
                </div>
                <div className="tw-flex tw-items-center tw-gap-3">
                  <button className=" tw-flex tw-h-8 tw-items-center tw-justify-center tw-gap-2.5 tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1 disabled:tw-cursor-not-allowed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.362 17.5002C13.1 17.5002 12.839 17.3982 12.643 17.1952L8.78004 13.1953C8.40204 12.8022 8.40704 12.1793 8.79304 11.7933L12.793 7.79325C13.183 7.40225 13.816 7.40225 14.207 7.79325C14.597 8.18425 14.597 8.81625 14.207 9.20725L10.902 12.5122L14.081 15.8053C14.465 16.2032 14.454 16.8362 14.057 17.2192C13.862 17.4072 13.612 17.5002 13.362 17.5002Z"
                        fill="#2C2E3E"
                      />
                    </svg>
                  </button>
                  <button className="tw-flex tw-h-8 tw-flex-col tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-[3px] tw-bg-[#1D4ED8] tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-white ">
                    1
                  </button>
                  <button className="tw-flex tw-h-8 tw-flex-col tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-[3px] tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] ">
                    2
                  </button>

                  <button className="tw-flex tw-h-8 tw-items-center tw-justify-center tw-gap-2.5 tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1 disabled:tw-cursor-not-allowed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5002 17.5002C10.2442 17.5002 9.98825 17.4022 9.79325 17.2072C9.40225 16.8162 9.40225 16.1842 9.79325 15.7932L13.0982 12.4882L9.91825 9.19525C9.53525 8.79725 9.54625 8.16425 9.94325 7.78125C10.3413 7.39825 10.9742 7.40925 11.3572 7.80525L15.2193 11.8052C15.5983 12.1982 15.5933 12.8212 15.2073 13.2072L11.2072 17.2072C11.0122 17.4022 10.7563 17.5002 10.5002 17.5002Z"
                        fill="#2C2E3E"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="tw-w-full tw-min-w-[495px] tw-px-6">
                <div className="tw-flex tw-justify-end tw-pt-[21px] hover:tw-cursor-pointer">
                  <div onClick={() => setReceiptOpenPopup(false)}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_8362_156849)">
                        <path
                          d="M9.46582 8.01316L15.696 1.78287C16.1014 1.37761 16.1014 0.722342 15.696 0.31713C15.2907 -0.0881317 14.6355 -0.0881317 14.2303 0.31713L7.99993 6.54737L1.76984 0.31713C1.36438 -0.0881317 0.709353 -0.0881317 0.304092 0.31713C-0.101364 0.722391 -0.101364 1.37761 0.304092 1.78287L6.53413 8.01316L0.30414 14.2434C-0.101315 14.6487 -0.101315 15.3039 0.30414 15.7091C0.40027 15.8055 0.514502 15.882 0.640272 15.9341C0.766042 15.9862 0.900871 16.013 1.03701 16.0128C1.30233 16.0128 1.56774 15.9113 1.76988 15.7091L7.99993 9.4789L14.2303 15.7091C14.3264 15.8055 14.4406 15.882 14.5664 15.9341C14.6922 15.9862 14.827 16.013 14.9631 16.0128C15.2284 16.0128 15.4939 15.9113 15.696 15.7091C16.1014 15.3039 16.1014 14.6487 15.696 14.2434L9.46582 8.01316Z"
                          fill="#2C2E3E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8362_156849">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="tw-mt-[43px] tw-flex tw-items-center tw-justify-between">
                  <h2 className="tw-text-base tw-font-bold tw-not-italic tw-leading-6 tw-text-text-black">
                    Expenditure Receipt
                  </h2>
                  <div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_8362_156865)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.888889 10.5554C1.12464 10.5554 1.35073 10.6491 1.51743 10.8158C1.68413 10.9825 1.77778 11.2086 1.77778 11.4443V13.2221C1.77778 13.4578 1.87143 13.6839 2.03813 13.8506C2.20483 14.0173 2.43092 14.111 2.66667 14.111H13.3333C13.5691 14.111 13.7952 14.0173 13.9619 13.8506C14.1286 13.6839 14.2222 13.4578 14.2222 13.2221V11.4443C14.2222 11.2086 14.3159 10.9825 14.4826 10.8158C14.6493 10.6491 14.8754 10.5554 15.1111 10.5554C15.3469 10.5554 15.573 10.6491 15.7397 10.8158C15.9064 10.9825 16 11.2086 16 11.4443V13.2221C16 13.9293 15.719 14.6076 15.219 15.1077C14.7189 15.6078 14.0406 15.8888 13.3333 15.8888H2.66667C1.95942 15.8888 1.28115 15.6078 0.781049 15.1077C0.280952 14.6076 0 13.9293 0 13.2221V11.4443C0 11.2086 0.0936505 10.9825 0.260349 10.8158C0.427048 10.6491 0.653141 10.5554 0.888889 10.5554Z"
                          fill="#047857"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.93213 6.48255C3.09882 6.31591 3.32487 6.22229 3.56057 6.22229C3.79628 6.22229 4.02233 6.31591 4.18902 6.48255L8.00502 10.2985L11.821 6.48255C11.903 6.39765 12.0011 6.32993 12.1095 6.28335C12.218 6.23676 12.3346 6.21224 12.4527 6.21122C12.5707 6.21019 12.6877 6.23268 12.797 6.27737C12.9062 6.32207 13.0055 6.38807 13.0889 6.47153C13.1724 6.55499 13.2384 6.65424 13.2831 6.76348C13.3278 6.87272 13.3503 6.98977 13.3492 7.10779C13.3482 7.22582 13.3237 7.34246 13.2771 7.45091C13.2305 7.55936 13.1628 7.65744 13.0779 7.73944L8.63346 12.1839C8.46677 12.3505 8.24072 12.4441 8.00502 12.4441C7.76932 12.4441 7.54327 12.3505 7.37657 12.1839L2.93213 7.73944C2.76549 7.57275 2.67188 7.3467 2.67188 7.11099C2.67188 6.87529 2.76549 6.64924 2.93213 6.48255Z"
                          fill="#047857"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.00608 0C8.24182 0 8.46792 0.0936505 8.63462 0.260349C8.80131 0.427048 8.89497 0.653141 8.89497 0.888889V11.5556C8.89497 11.7913 8.80131 12.0174 8.63462 12.1841C8.46792 12.3508 8.24182 12.4444 8.00608 12.4444C7.77033 12.4444 7.54424 12.3508 7.37754 12.1841C7.21084 12.0174 7.11719 11.7913 7.11719 11.5556V0.888889C7.11719 0.653141 7.21084 0.427048 7.37754 0.260349C7.54424 0.0936505 7.77033 0 8.00608 0Z"
                          fill="#047857"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8362_156865">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-4">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Customer:
                    </p>
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      {`${viewReceipt?.customer?.companyName} ( ${viewReceipt?.customer?.firstName} ${viewReceipt?.customer?.lastName} )`}
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Cash Discount:
                    </p>
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      {viewReceipt?.cashDiscount ?? 0} %
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Cash Discount Validity Date:
                    </p>
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      {viewReceipt
                        ? reverseDateFormat(viewReceipt.cashDiscountValidity)
                        : viewReceipt?.cashDiscountValidity}
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Payment Amount:
                    </p>
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      € {viewReceipt?.paymentAmount}
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Due Date:
                    </p>
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      {viewReceipt
                        ? reverseDateFormat(viewReceipt.dueDate)
                        : viewReceipt?.dueDate}
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Receipt Date:
                    </p>
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      {viewReceipt
                        ? reverseDateFormat(viewReceipt.receiptDate)
                        : viewReceipt?.receiptDate}
                    </p>
                  </div>
                </div>
                <div className="tw-mt-6 tw-flex tw-w-full tw-flex-col tw-gap-2 tw-rounded-xl tw-bg-[#FBFBFB] tw-px-4 tw-pb-[17px] tw-pt-2.5">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Payment Amount
                    </p>
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      € {viewReceipt?.paymentAmount}
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Full Payment
                    </p>
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      € {viewReceipt?.paymentAmount}
                    </p>
                  </div>
                  <div className="tw-my-2 tw-min-h-[1px] tw-w-full tw-bg-[#CFCFCF]" />
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                      Balance
                    </p>
                    <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                      €
                      {viewReceipt?.paymentAmount -
                        viewReceipt?.paymentAmount * (viewReceipt?.cashDiscount / 100)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {/* pay */}
      <Dialog
        className="!tw-rounded-[20px]"
        // ref={refPay}
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
          <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-p-5">
            <div className="tw-text-xl tw-font-medium tw-capitalize tw-not-italic tw-leading-[30px] tw-text-text-black">
              Pay Expenditures
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setPayOpenPopup(false)}
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
          <DialogContent className="tw-rounded-xl">
            <form onSubmit={payExpenditurehandleSubmit(payExpenditureSubmit)}>
              <div className="tw-flex tw-flex-col tw-gap-6">
                <CustomInput
                  label="Payment"
                  name="partialPayment"
                  register={payRegister}
                  control={payControl}
                  errors={payErrors}
                  placeholder=""
                  type="text"
                  startIcon={<EuroIcon />}
                />
                <CustomInput
                  label="Date of Reciept"
                  name="receiptDate"
                  defaultValue={new Date().toISOString().substr(0, 10)}
                  // value={new Date().toISOString().substr(0, 10)}
                  register={payRegister}
                  control={payControl}
                  errors={payErrors}
                  type="date"
                  // disabled={true}
                />
                <div>
                  <TextArea
                    label="Comment"
                    name="comment"
                    register={payRegister}
                    control={payControl}
                    errors={payErrors}
                    placeholder="Comment"
                  />
                  <div className="tw-flex tw-justify-end">
                    <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-dark-gray">
                      Max: 160 words
                    </p>
                  </div>
                </div>
              </div>
              <div className="tw-mt-6 tw-flex tw-w-full tw-flex-col tw-gap-4 tw-rounded-xl tw-bg-[#FBFBFB] tw-px-4 tw-pb-[24px] tw-pt-2">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Amount
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    € {singleExpenditureData?.paymentAmount}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Discount
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    € {cashDiscount?.toFixed(2)}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Due Date
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    {singleExpenditureData?.dueDate}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    Partial Payment
                  </p>
                  <p className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                    € - {partialPayment}
                  </p>
                </div>

                <div className=" tw-min-h-[1px] tw-w-full tw-bg-[#CFCFCF]" />
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                    Total Balance
                  </p>
                  <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                    € {payBalance?.toFixed(2) ?? 0}
                  </p>
                </div>
              </div>
              <div className="tw-mt-6 tw-flex tw-items-center tw-justify-end tw-gap-6">
                <CustomButton
                  text="cancel"
                  className="btn-white-cancel tw-text-sm"
                  onClick={() => setPayOpenPopup(false)}
                />
                <CustomButton
                  text="pay"
                  type="submit"
                  className="btn-primary tw-text-sm"
                  onClick={() => setPayOpenPopup(false)}
                  disabled={Object.keys(payErrors).length > 0}
                />
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
