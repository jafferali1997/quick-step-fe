import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Select from '@/common/components/select/select.component';

export default function ViewExpenditureFilterContent({
  show,
  onClose,
  handleSubmit,
  register,
  onSubmitFilterForm,
  selectedInstallments,
  setSelectedInstallments,
  selectedPaymentAmount,
  setSelectedPaymentAmount,
  selectedStatus,
  setSelectedStatus,
  allCompanyOption,
  setCompanyName,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  selectedNoOfItems,
  setSelectedNoOfItems,
  selectedNetPrice,
  setSelectedNetPrice,
  selectedGrossPrice,
  setSelectedGrossPrice
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFilterForm)}>
        <Select
          label="Company"
          name="companyName"
          defaultValue="Enter Company"
          placeholder="Enter Company"
          register={register}
          options={allCompanyOption && allCompanyOption}
          {...register('companyName')}
          onChange={(e, val) => {
            setCompanyName(val.label);
          }}
        />
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className="tw-mt-4">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            No of Installment
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked  checked:tw-bg-checked"
                name="installments"
                value="noInstallments"
                checked={selectedInstallments === '0'}
                onChange={() => setSelectedInstallments('0')}
              />
              <label
                htmlFor="No Installment"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                No Installment
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked  checked:tw-bg-checked"
                name="installments"
                value="1-4"
                checked={selectedInstallments === '1-4'}
                onChange={() => setSelectedInstallments('1-4')}
              />
              <label
                htmlFor="No Installment"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                1 - 4 Installment
              </label>
            </div>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked  checked:tw-bg-checked"
                name="installments"
                value="5-10"
                checked={selectedInstallments === '5-10'}
                onChange={() => setSelectedInstallments('5-10')}
              />
              <label
                htmlFor="No Installment"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                5 - 10 Installment
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked  checked:tw-bg-checked"
                name="installments"
                value="10-above"
                checked={selectedInstallments === '10-above'}
                onChange={() => setSelectedInstallments('10-above')}
              />
              <label
                htmlFor="No Installment"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Above 10 Installment
              </label>
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className="tw-mt-4 ">
          <label className="tw-text-[#46474F)]  tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px]">
            Installment Range
          </label>
          <div className="tw-mt-2 tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-[182px]">
              <CustomInput
                type="number"
                register={register}
                placeholder="To"
                name="to"
                // value={minAmount}
                // onChange={(e) => setMinAmount(e.target.value)}
                {...register('to')}
              />
            </div>
            <p className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
              -
            </p>
            <div className="tw-w-[182px]">
              <CustomInput
                type="number"
                placeholder="from"
                name="from"
                register={register}
                {...register('from')}
              />
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className="tw-mt-4">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Payment Amount
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="paymentAmount"
                value="100-999"
                checked={selectedPaymentAmount === '100-999'}
                onChange={() => setSelectedPaymentAmount('100-999')}
              />
              <label
                htmlFor="Payment Amount"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                € 100 - € 999
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="paymentAmount"
                value="1000-2000"
                checked={selectedPaymentAmount === '1000-2000'}
                onChange={() => setSelectedPaymentAmount('1000-2000')}
              />
              <label
                htmlFor="Payment Amount"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                € 1000 - € 2000
              </label>
            </div>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="paymentAmount"
                value="2000-above"
                checked={selectedPaymentAmount === '2000-above'}
                onChange={() => setSelectedPaymentAmount('2000-above')}
              />
              <label
                htmlFor="Payment Amount"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                € 2000 - above
              </label>
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className="tw-mt-4">
          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
            Status
          </p>
          <div className="tw-mt-2 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="status"
                value="ALL"
                checked={selectedStatus === 'ALL'}
                onChange={() => setSelectedStatus('ALL')}
              />
              <label
                htmlFor="Status"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                All
              </label>
            </div>
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="status"
                value="PAID"
                checked={selectedStatus === 'PAID'}
                onChange={() => setSelectedStatus('PAID')}
              />
              <label
                htmlFor="Status"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Paid
              </label>
            </div>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-flex tw-min-w-[194px] tw-items-center tw-gap-4">
              <input
                type="checkbox"
                className="tw-h-4 tw-w-4 tw-bg-unchecked checked:tw-bg-checked"
                name="status"
                value="OPEN"
                checked={selectedStatus === 'OPEN'}
                onChange={() => setSelectedStatus('OPEN')}
              />
              <label
                htmlFor="Status"
                className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
              >
                Open
              </label>
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className="tw-mt-4">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
              Due Date
            </p>
            <div className="tw-mt-2 tw-flex tw-items-center tw-gap-2">
              <div className="tw-flex tw-min-w-[180px] tw-items-center">
                <CustomInput
                  label="Start Date"
                  placeholder="03/13/2023"
                  type="date"
                  name="dueDateStart"
                  register={register}
                />
              </div>
              <div className="tw-flex tw-min-w-[180px] tw-items-center">
                <CustomInput
                  label="End Date"
                  placeholder="03/13/2023"
                  type="date"
                  name="dueDateEnd"
                  register={register}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className="tw-mt-4">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
              Date of Receipt
            </p>
            <div className="tw-mt-2 tw-flex tw-items-center tw-gap-2">
              <div className="tw-flex tw-min-w-[180px] tw-items-center">
                <CustomInput
                  label="Start Date"
                  placeholder="03/13/2023"
                  type="date"
                  name="receiptDateStart"
                  register={register}
                />
              </div>
              <div className="tw-flex tw-min-w-[180px] tw-items-center">
                <CustomInput
                  label="End Date"
                  placeholder="03/13/2023"
                  type="date"
                  name="receiptDateEnd"
                  register={register}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tw-mt-4 tw-min-h-[1px] tw-min-w-[200px] tw-bg-[#e3e3e3]" />
        <div className=" tw-mt-4">
          <div className="tw-mt-[33px] tw-flex tw-justify-between">
            <CustomButton
              onClick={() => onClose()}
              text="Clear all"
              className="btn-cancel"
            />
            <CustomButton text="Apply Filter" type="submit" className="btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
}
ViewExpenditureFilterContent.propTypes = {
  show: PropTypes.bool.isRequired,
  selectedInstallments: PropTypes.bool,
  selectedPaymentAmount: PropTypes.bool,
  selectedStatus: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmitFilterForm: PropTypes.func.isRequired,
  setSelectedNoOfItems: PropTypes.func.isRequired,
  setSelectedNetPrice: PropTypes.func.isRequired,
  setSelectedGrossPrice: PropTypes.func.isRequired,
  setSelectedPaymentAmount: PropTypes.func.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  setCompanyName: PropTypes.func.isRequired,
  selectedNoOfItems: PropTypes.string.isRequired,
  setSelectedInstallments: PropTypes.string.isRequired,
  selectedNetPrice: PropTypes.string.isRequired,
  selectedGrossPrice: PropTypes.string.isRequired,
  allCompanyOption: PropTypes.arrayOf,
  minAmount: PropTypes.number,
  setMinAmount: PropTypes.func,
  maxAmount: PropTypes.number,
  setMaxAmount: PropTypes.func
};
