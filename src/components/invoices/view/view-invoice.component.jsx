import { Dialog } from '@mui/material/node';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import OuterTabs from '@/common/components/custom-tab/outer-tab/outer-tab.component';
import DownloadDropdownBtn from '@/common/components/download-dropdown-button/download-dropdown-button.component';
import PlusIcon from '@/common/icons/plus.icon';
import useViewInvoice from './use-view-invoice.hook';

export default function ViewInvoice() {
  const {
    tabs,
    offers,
    dropdownOptions,
    data,
    ref,
    openPopup,
    setOpenPopup,
    handleDownloadBlankPdfFile,
    handleDownloadPdfFile,
    openZIPPopup,
    handleClose
  } = useViewInvoice();
  return (
    <div className="tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] tw-pb-8 tw-pt-3">
      {openPopup && (
        <Dialog
          className="scrol-bar"
          ref={ref}
          open={openPopup}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '471px',
                padding: '40px 24px'
              }
            },
            zIndex: 13000
          }}
        >
          <div className="tw-max-h-full tw-w-[471px] tw-max-w-full tw-px-6 ">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
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
            <div>
              <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                <div>
                  <img
                    src="/assets/icons/gray-question.svg"
                    alt="question"
                    className="tw-h-[72px] tw-w-[72px]"
                  />
                </div>
                <div className="tw-mt-2">
                  {openZIPPopup
                    ? 'Choose the option to download zip'
                    : 'Choose the option to download pdf'}
                </div>
                <div className="tw-mt-[14px] tw-flex tw-gap-[32px]">
                  <CustomButton
                    className="tw-flex tw-h-[40px] tw-items-center tw-justify-center tw-rounded-md tw-border-[1.5px] tw-border-solid tw-border-primary  tw-text-sm tw-font-bold tw-not-italic tw-leading-[26px] tw-text-primary"
                    text="Download Blank Pdf"
                    onClick={handleDownloadBlankPdfFile}
                  />
                  <CustomButton
                    className="btn-primary tw-h-[40px]  tw-items-center tw-px-[30px] tw-py-[7px] tw-text-sm tw-font-bold tw-not-italic tw-leading-[normal]"
                    text="Download Pdf"
                    onClick={handleDownloadPdfFile}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
      <div className="tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
        <h2 className="tw-font-dm tw-text-[22px] tw-font-medium tw-capitalize tw-leading-8 tw-text-text-dark-gray">
          Invoices
        </h2>
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4">
          <DownloadDropdownBtn
            text="Download Invoices"
            dropdownoptions={dropdownOptions}
            data={data}
          />
          <a
            href="/invoices/create"
            className="btn-primary-blue tw-flex tw-h-[40px] tw-items-center tw-gap-1 tw-rounded-md tw-border-none tw-p-3 tw-text-sm tw-font-medium"
          >
            <PlusIcon /> Create
          </a>
        </div>
      </div>
      <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-5">
        {offers.map((item) => {
          return (
            <div
              key={item.id}
              className="tw-border-border-gray tw-box-border tw-flex tw-flex-1 tw-items-center tw-justify-between tw-gap-3 tw-rounded-[10px] tw-border-[1px] tw-border-solid tw-bg-white !tw-px-5 !tw-py-2"
            >
              <div className="tw-flex tw-items-center tw-gap-3">
                <span className="tw-font-dm tw-text-[12px] tw-font-normal tw-text-text-medium-gray">
                  {item.status}
                </span>
                <span className="tw-font-dm tw-text-[14px] tw-font-normal tw-leading-5 tw-text-text-black">
                  {item.value}
                </span>
              </div>
              <img
                className="tw-h-[42px] tw-w-[42px] tw-rounded-full"
                src={item.icon}
                alt="open icon"
              />
            </div>
          );
        })}
      </div>
      <div className="tw-border-border-gray tw-mt-4 tw-rounded-[10px] tw-border-[1px] ">
        <OuterTabs tabs={tabs} />
      </div>
    </div>
  );
}
