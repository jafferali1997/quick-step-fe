import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import FieldError from '@/common/components/field-error/field-error.component';
import Loader from '@/common/components/loader/loader.component';
import Select from '@/common/components/select/select.component';
import SelectWithModel from '@/common/components/selectwithmodel/select-with-model.component';
import TextArea from '@/common/components/text-area/text-area.component';
import DateIcon from '@/common/icons/date.icon';
import EuroIcon from '@/common/icons/euro.icon';
import PercentageIcon from '@/common/icons/percentage.icon';
import { Dialog, DialogContent, Link } from '@mui/material/node';
import useCreateExpenditure from './use-create-expenditure.hook';

export default function CreateExpenditure() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    onSubmit,
    allCustomerOption,
    allCategoryOption,
    getCustomerId,
    setCustomerId,
    getCategoryId,
    setCategoryId,
    balance,
    cashDiscount,
    paymentAmount,
    openCategoryPopup,
    setOpenCategoryPopup,
    categoryExpenditureSubmit,
    categoryRegister,
    categoryControl,
    categoryErrors,
    categoryExpenditurehandleSubmit,
    openEditCategoryPopup,
    setOpenEditCategoryPopup,
    openDeleteCategoryPopup,
    setOpenDeleteCategoryPopup,
    singleCategoryData,
    setsingleCategoryData,
    handleDeleteExpenditureCagtegory,
    categoryEditRegister,
    categoryEditControl,
    categoryEditErrors,
    categoryEditExpenditurehandleSubmit,
    editCategoryExpenditureSubmit,
    reset,
    handleUploadButtonClick,
    selectedCategoryOption,
    fileInputRef,
    createLoader,
    contactError,
    setTaxRate,
    taxRateList,
    taxRate,
    customerOptions,
    categoryLoader
  } = useCreateExpenditure();

  return (
    <div className="tw-mx-6 tw-mb-[43px] tw-mt-4  tw-rounded-[20px] tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-p-5">
      {/* {rowData && (
        <FileInput
          module={rowData}
          moduleName="CUSTOMER"
          fileRef={fileInputRef}
          flexible={true}
        />
      )} */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-4">
          <Link href="/expenditure">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0008 19.5C14.8692 19.5008 14.7387 19.4756 14.6169 19.4258C14.495 19.376 14.3842 19.3027 14.2908 19.21L8.29079 13.21C8.10454 13.0227 8 12.7692 8 12.505C8 12.2408 8.10454 11.9874 8.29079 11.8L14.2908 5.80003C14.4821 5.6362 14.7282 5.55059 14.9798 5.56032C15.2315 5.57004 15.4703 5.67437 15.6484 5.85246C15.8265 6.03056 15.9308 6.2693 15.9405 6.52097C15.9502 6.77265 15.8646 7.01873 15.7008 7.21003L10.4108 12.5L15.7008 17.79C15.8412 17.9293 15.9372 18.1071 15.9766 18.3009C16.016 18.4947 15.997 18.6958 15.9221 18.8789C15.8471 19.0619 15.7196 19.2186 15.5556 19.3292C15.3917 19.4397 15.1986 19.4992 15.0008 19.5Z"
                fill="#7E7D7D"
              />
              <rect
                x="0.25"
                y="0.75"
                width="23.5"
                height="23.5"
                rx="3.75"
                stroke="#7E7D7D"
                stroke-width="0.5"
              />
            </svg>
          </Link>
          <h2 className="tw-overflow-hidden tw-text-ellipsis tw-text-[22px] tw-font-medium tw-capitalize tw-not-italic tw-leading-[33px] tw-text-text-dark-gray">
            Create Expenditure
          </h2>
        </div>
        <div className="tw-flex tw-h-10 tw-w-[191px] tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-4 tw-py-2 hover:tw-cursor-pointer">
          <p className=" tw-whitespace-nowrap tw-text-sm tw-font-medium tw-not-italic tw-leading-[21px] tw-text-text-light-gray">
            Import Document
          </p>
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3100_84347)">
              <path
                d="M5.49948 0.5C2.84604 0.5 0.695312 2.65073 0.695312 5.30416C0.695312 7.11937 1.7015 8.69706 3.18579 9.51453L3.12929 11.5L5.39609 10.1029C5.4303 10.1037 5.4645 10.1083 5.49948 10.1083C8.15291 10.1083 10.3036 7.9576 10.3036 5.30416C10.3036 2.65073 8.15291 0.5 5.49948 0.5ZM6.11133 8.10365H4.88032V4.14117H6.11133V8.10365ZM5.48756 3.65576C5.09823 3.65576 4.83919 3.37981 4.84765 3.03929C4.83958 2.68301 5.09823 2.41513 5.49563 2.41513C5.89265 2.41513 6.14477 2.68301 6.15284 3.03929C6.15246 3.37981 5.89188 3.65576 5.48756 3.65576Z"
                fill="#BBBBBB"
              />
            </g>
            <defs>
              <clipPath id="clip0_3100_84347">
                <rect width="11" height="11" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-box-grid-2col tw-mt-4">
          <div>
            <Select
              label="Contact"
              name="customerId"
              register={register}
              control={control}
              errors={errors}
              isRequired={true}
              placeholder="Select Contact"
              options={customerOptions}
              onChange={(e, val) => {
                setCustomerId(val.value);
              }}
            />
            {contactError && (
              <FieldError
                className="tw-mt-1 tw-normal-case"
                error={'Please Select Contact'}
              />
            )}
          </div>
          <SelectWithModel
            label="Category"
            name="expenditureCategoryId"
            register={register}
            control={control}
            errors={errors}
            defaultValue={selectedCategoryOption}
            isRequired={true}
            placeholder="Select Category"
            options={[
              {
                label: 'Create New Category',
                isModel: true,
                handleClick: () => {
                  setOpenCategoryPopup(true);
                }
              },
              ...allCategoryOption
            ]}
            onChange={(e, val) => setCategoryId(val.value)}
          />
          <CustomInput
            label="Cash Discount"
            name="cashDiscount"
            placeholder="Enter Cash Discount"
            type="string"
            isRequired={true}
            endIcon={<PercentageIcon />}
            register={register}
            control={control}
            errors={errors}
          />
          <CustomInput
            label="Cash Discount Validity Date"
            name="cashDiscountValidity"
            placeholder="Enter Cash Discount Validity Date"
            type="date"
            register={register}
            control={control}
            errors={errors}
          />
          <CustomInput
            label="VAT Number"
            name="vatNumber"
            register={register}
            control={control}
            errors={errors}
            placeholder="Enter VAT Number"
            type="text"
          />
          <CustomInput
            label="Bank Number"
            name="bankAccount"
            register={register}
            control={control}
            errors={errors}
            placeholder="Enter Bank Number"
            type="text"
          />
          <CustomInput
            label="Payment"
            name="paymentAmount"
            placeholder="Enter Payment"
            type="number"
            endIcon={<EuroIcon />}
            register={register}
            control={control}
            errors={errors}
            isRequired={true}
          />
          <SelectWithModel
            label="Tax Rate"
            name="taxRateId"
            register={register}
            errors={errors}
            placeholder="Enter tax rate"
            options={[
              {
                label: 'Add Tax Rate',
                isLink: '/expenditure'
              },
              ...(taxRateList?.data?.map((item) => ({
                label: item.taxRate.toString(),
                value: item.id
              })) || [])
            ]}
            value={taxRate}
            onChange={(e, value) => {
              setTaxRate({
                value: value.value,
                label: value.label
              });
            }}
          />
          <CustomInput
            label="Due  Date"
            name="dueDate"
            register={register}
            control={control}
            errors={errors}
            placeholder="Enter Due  Date"
            type="date"
          />
          <CustomInput
            label="Date of Reciept"
            name="receiptDate"
            register={register}
            control={control}
            errors={errors}
            defaultValue={new Date().toISOString().substr(0, 10)}
            placeholder="Enter Date of Reciept"
            type="date"
            disabled={true}
            endIcon={<DateIcon />}
          />
        </div>
        <div className="tw-mt-4 tw-w-full">
          <TextArea
            label="Description"
            name="description"
            register={register}
            control={control}
            errors={errors}
            placeholder="Enter Description"
          />
          <div className="tw-flex tw-flex-col tw-gap-2">
            <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
              Gross Pay
            </label>
            <CustomSwitch name="isStatus" type="switch" className="tw-flex-col-reverse" />
          </div>
        </div>
        <div className="tw-mt-4 tw-w-full">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
              Documents
            </label>
            <div
              className="tw-relative tw-flex tw-min-h-[144px] tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-rounded-md tw-border-[1.5px] tw-border-dashed tw-border-text-ultra-light-gray tw-bg-[#FCFCFC] tw-px-4 tw-py-2"
              onClick={handleUploadButtonClick}
            >
              {/* <input
                className="tw-absolute tw-right-0 tw-top-0 tw-z-[1000] tw-h-full tw-w-full tw-cursor-pointer tw-text-2xl tw-opacity-0"
                type="file" */}
              {/* /> */}
              <div>
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.5 25V31.6667C35.5 32.5507 35.1488 33.3986 34.5237 34.0237C33.8986 34.6488 33.0507 35 32.1667 35H8.83333C7.94928 35 7.10143 34.6488 6.47631 34.0237C5.85119 33.3986 5.5 32.5507 5.5 31.6667V25"
                    stroke="#6B6B6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M28.8385 13.3333L20.5052 5L12.1719 13.3333"
                    stroke="#6B6B6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.5 5V25"
                    stroke="#6B6B6B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-light-gray">
                Upload Document Here
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-light-gray">
                Only PDF, JPG, JPEG, PNG Files*
              </p>
              <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-light-gray">
                Max: 1 MB
              </p>
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-flex tw-w-full tw-gap-4">
          <div className="tw-flex tw-h-[85px] tw-w-[85px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#fafafa] tw-pb-[26px] tw-pl-[26px] tw-pr-[27px] tw-pt-[27px]">
            <img className="tw-w-full" src="/assets/images/gallery-img.png" alt="img" />
          </div>
          <div className="tw-flex tw-h-[85px] tw-w-[85px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#fafafa] tw-pb-[26px] tw-pl-[26px] tw-pr-[27px] tw-pt-[27px]">
            <img className="tw-w-full" src="/assets/images/gallery-img.png" alt="img" />
          </div>
          <div className="tw-flex tw-h-[85px] tw-w-[85px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#fafafa] tw-pb-[26px] tw-pl-[26px] tw-pr-[27px] tw-pt-[27px]">
            <img className="tw-w-full" src="/assets/images/gallery-img.png" alt="img" />
          </div>
          <div className="tw-flex tw-h-[85px] tw-w-[85px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#fafafa] tw-pb-[26px] tw-pl-[26px] tw-pr-[27px] tw-pt-[27px]">
            <img className="tw-w-full" src="/assets/images/gallery-img.png" alt="img" />
          </div>
        </div>
        <div className="tw-mt-[40px] tw-w-full tw-rounded-[10px] tw-bg-[#FBFBFB] tw-px-5 tw-py-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
              Amount
            </p>
            <div className="tw-flex tw-items-center tw-gap-4 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
              <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                {paymentAmount || 0}
              </p>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7619_163457)">
                  <path
                    d="M10.8801 9.50086C10.1712 10.2465 9.26369 10.6571 8.32457 10.6571C6.78537 10.6571 5.45264 9.57625 4.82542 8.01379H9.10081C9.47154 8.01379 9.77212 7.71321 9.77212 7.34248C9.77212 6.97174 9.47154 6.67116 9.10081 6.67116H4.48427C4.45727 6.4484 4.44364 6.22422 4.44345 5.99982C4.44345 5.74266 4.46156 5.49058 4.49533 5.24457H9.10081C9.47154 5.24457 9.77212 4.94399 9.77212 4.57326C9.77212 4.20252 9.47154 3.90191 9.10081 3.90191H4.86113C5.50181 2.3852 6.81324 1.34249 8.32457 1.34249C9.26369 1.34249 10.1712 1.75321 10.8801 2.49873C11.1352 2.76728 11.5599 2.77832 11.829 2.52291C12.0978 2.26738 12.1085 1.84247 11.8533 1.57378C10.8886 0.558902 9.63545 0 8.32474 0C6.08669 0 4.1736 1.62546 3.43121 3.90211H1.63225C1.26152 3.90211 0.960938 4.20269 0.960938 4.57342C0.960938 4.94416 1.26152 5.24474 1.63225 5.24474H3.14355C3.11635 5.49247 3.1008 5.74405 3.1008 5.99999C3.1008 6.22714 3.11266 6.45072 3.13438 6.67133H1.63225C1.26152 6.67133 0.960938 6.97191 0.960938 7.34264C0.960938 7.71338 1.26152 8.01396 1.63225 8.01396H3.40457C4.12671 10.3346 6.05913 12 8.32457 12C9.63542 12 10.8883 11.4409 11.853 10.4262C12.1083 10.1574 12.0978 9.73259 11.8289 9.4771C11.5603 9.22157 11.1352 9.23225 10.8801 9.50086Z"
                    fill="#7E7D7D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7619_163457">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="tw-mt-3 tw-flex tw-items-center tw-justify-between">
            <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
              Discount
            </p>
            <div className="tw-flex tw-items-center tw-gap-4 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
              <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                {cashDiscount.toFixed(2)}
              </p>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7619_163457)">
                  <path
                    d="M10.8801 9.50086C10.1712 10.2465 9.26369 10.6571 8.32457 10.6571C6.78537 10.6571 5.45264 9.57625 4.82542 8.01379H9.10081C9.47154 8.01379 9.77212 7.71321 9.77212 7.34248C9.77212 6.97174 9.47154 6.67116 9.10081 6.67116H4.48427C4.45727 6.4484 4.44364 6.22422 4.44345 5.99982C4.44345 5.74266 4.46156 5.49058 4.49533 5.24457H9.10081C9.47154 5.24457 9.77212 4.94399 9.77212 4.57326C9.77212 4.20252 9.47154 3.90191 9.10081 3.90191H4.86113C5.50181 2.3852 6.81324 1.34249 8.32457 1.34249C9.26369 1.34249 10.1712 1.75321 10.8801 2.49873C11.1352 2.76728 11.5599 2.77832 11.829 2.52291C12.0978 2.26738 12.1085 1.84247 11.8533 1.57378C10.8886 0.558902 9.63545 0 8.32474 0C6.08669 0 4.1736 1.62546 3.43121 3.90211H1.63225C1.26152 3.90211 0.960938 4.20269 0.960938 4.57342C0.960938 4.94416 1.26152 5.24474 1.63225 5.24474H3.14355C3.11635 5.49247 3.1008 5.74405 3.1008 5.99999C3.1008 6.22714 3.11266 6.45072 3.13438 6.67133H1.63225C1.26152 6.67133 0.960938 6.97191 0.960938 7.34264C0.960938 7.71338 1.26152 8.01396 1.63225 8.01396H3.40457C4.12671 10.3346 6.05913 12 8.32457 12C9.63542 12 10.8883 11.4409 11.853 10.4262C12.1083 10.1574 12.0978 9.73259 11.8289 9.4771C11.5603 9.22157 11.1352 9.23225 10.8801 9.50086Z"
                    fill="#7E7D7D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7619_163457">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="tw-mt-3 tw-flex tw-items-center tw-justify-between">
            <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
              Total Balance
            </p>
            <div className="tw-flex tw-items-center tw-gap-4 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
              <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                {balance.toFixed(2)}
              </p>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7619_163457)">
                  <path
                    d="M10.8801 9.50086C10.1712 10.2465 9.26369 10.6571 8.32457 10.6571C6.78537 10.6571 5.45264 9.57625 4.82542 8.01379H9.10081C9.47154 8.01379 9.77212 7.71321 9.77212 7.34248C9.77212 6.97174 9.47154 6.67116 9.10081 6.67116H4.48427C4.45727 6.4484 4.44364 6.22422 4.44345 5.99982C4.44345 5.74266 4.46156 5.49058 4.49533 5.24457H9.10081C9.47154 5.24457 9.77212 4.94399 9.77212 4.57326C9.77212 4.20252 9.47154 3.90191 9.10081 3.90191H4.86113C5.50181 2.3852 6.81324 1.34249 8.32457 1.34249C9.26369 1.34249 10.1712 1.75321 10.8801 2.49873C11.1352 2.76728 11.5599 2.77832 11.829 2.52291C12.0978 2.26738 12.1085 1.84247 11.8533 1.57378C10.8886 0.558902 9.63545 0 8.32474 0C6.08669 0 4.1736 1.62546 3.43121 3.90211H1.63225C1.26152 3.90211 0.960938 4.20269 0.960938 4.57342C0.960938 4.94416 1.26152 5.24474 1.63225 5.24474H3.14355C3.11635 5.49247 3.1008 5.74405 3.1008 5.99999C3.1008 6.22714 3.11266 6.45072 3.13438 6.67133H1.63225C1.26152 6.67133 0.960938 6.97191 0.960938 7.34264C0.960938 7.71338 1.26152 8.01396 1.63225 8.01396H3.40457C4.12671 10.3346 6.05913 12 8.32457 12C9.63542 12 10.8883 11.4409 11.853 10.4262C12.1083 10.1574 12.0978 9.73259 11.8289 9.4771C11.5603 9.22157 11.1352 9.23225 10.8801 9.50086Z"
                    fill="#7E7D7D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7619_163457">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="tw-mt-6 tw-flex tw-w-full tw-items-center tw-justify-end">
          <div className="tw-flex tw-items-center tw-gap-6">
            <CustomButton text="cancel" className="btn-cancel" />
            <CustomButton
              type="submit"
              className="btn-primary"
              text={!createLoader && 'save'}
              startIcon={<Loader loading={createLoader} />}
              disabled={createLoader}
            />
          </div>
        </div>
      </form>
      {/* create category modal */}
      <Dialog
        className="!tw-rounded-[20px]"
        // ref={refSummary}
        open={openCategoryPopup}
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
        <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
          <div className="tw-flex tw-h-10 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-px-5 tw-py-3">
            <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
              Add New Category
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setOpenCategoryPopup(false)}
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
          <DialogContent className="tw-rounded-[20px] tw-bg-white">
            <form onSubmit={categoryExpenditurehandleSubmit(categoryExpenditureSubmit)}>
              <div>
                <CustomInput
                  label="Category Name"
                  name="categoryName"
                  register={categoryRegister}
                  control={categoryControl}
                  errors={categoryErrors}
                  type="text"
                  placeholder="Enter Category Name"
                />
              </div>
              <div className="tw-mt-6 tw-flex tw-justify-end tw-gap-[20px]">
                <CustomButton
                  onClick={() => {
                    setOpenCategoryPopup(false);
                    reset();
                  }}
                  text="Close"
                  className="btn-cancel"
                />
                <CustomButton
                  text="Save"
                  type="submit"
                  className="btn-primary"
                  onClick={() => {
                    setOpenCategoryPopup(false);
                  }}
                />
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      {/* edit category modal */}
      <Dialog
        className="!tw-rounded-[20px]"
        // ref={refSummary}
        open={openEditCategoryPopup}
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
        <div className="my-scroll tw-max-h-full tw-w-[909px] tw-max-w-full tw-overflow-y-auto ">
          <div className="tw-flex tw-h-10 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-px-5 tw-py-3">
            <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
              Edit Category
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setOpenEditCategoryPopup(false)}
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
          <DialogContent className="tw-rounded-[20px] tw-bg-white">
            <form
              onSubmit={categoryEditExpenditurehandleSubmit(
                editCategoryExpenditureSubmit
              )}
            >
              <div>
                <CustomInput
                  label="Category Name"
                  name="categoryName"
                  register={categoryEditRegister}
                  control={categoryEditControl}
                  errors={categoryEditErrors}
                  type="text"
                  placeholder="Enter Category Name"
                />
              </div>
              <div className="tw-mt-6 tw-flex tw-justify-end tw-gap-[20px]">
                <CustomButton
                  onClick={() => setOpenEditCategoryPopup(false)}
                  text="Close"
                  className="btn-cancel"
                />
                <CustomButton
                  text="Save"
                  type="submit"
                  className="btn-primary"
                  onClick={() => setOpenEditCategoryPopup(false)}
                />
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      {/* deleteCategory  */}
      <Dialog
        className="!tw-rounded-[20px]"
        open={openDeleteCategoryPopup}
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
                Are you sure, you want to delete the {singleCategoryData?.categoryName}{' '}
                from the categories?
              </h3>

              <div className="tw-mt-[48px] tw-flex tw-justify-center tw-gap-8">
                <CustomButton
                  onClick={() => setOpenDeleteCategoryPopup(false)}
                  text="Cancel"
                  className="btn-white-cancel tw-h-[40px] tw-w-[75px]"
                />
                <CustomButton
                  type="submit"
                  className="btn-danger tw-h-[40px] tw-w-[75px] "
                  text={!categoryLoader && 'Yes, Delete'}
                  startIcon={<Loader loading={categoryLoader} />}
                  disabled={categoryLoader}
                  onClick={() => handleDeleteExpenditureCagtegory(singleCategoryData?.id)}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
