import ConfirmationModal from '@/common/components/confirmation-modal/confirmation-modal.component';
import CreateModal from '@/common/components/create-modal/create-modal';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';
import PlusIcon from '@/common/icons/plus.icon';
import useTaxRate from './use-tax-rate.hook';

function TaxRate() {
  const {
    initialColumns,
    data,
    tablePageNum,
    tablePageSize,
    setTablePageNum,
    setTablePageSize,
    handleCreateTaxRate,
    openCreateModal,
    setOpenCreateModal,
    taxRate,
    taxRates,
    taxRateId,
    handleClose,
    handleSubmitClick,
    handleChangeTaxRate,
    openConfirmationPopUp,
    handleConfirmation,
    handleDefaulTaxRateSwitch,
    setSearchText,
    toggleSwitchValue
  } = useTaxRate();
  return (
    <div className="tw-px-5 tw-py-8">
      <div className="tw-mt-[0.5px] tw-flex tw-justify-between">
        <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Tax Rates
        </div>
        <div className="tw-flex tw-gap-4">
          <CustomButton
            label="Create"
            text="Create"
            onClick={handleCreateTaxRate}
            startIcon={<PlusIcon />}
            className="btn-primary tw-flex tw-h-[40px] tw-items-center tw-gap-1 tw-rounded-md tw-border-none tw-p-3 tw-text-sm tw-font-medium"
          />
        </div>
      </div>
      <div className="tw-w-full tw-pb-5">
        <CustomDataTabe
          initialColumns={initialColumns}
          initialTableData={data}
          dataTotallRecords={data.length}
          tablePageNum={tablePageNum}
          setTablePageNum={setTablePageNum}
          tablePageSize={tablePageSize}
          setTablePageSize={setTablePageSize}
          simpleSearch={true}
          hideColumn={true}
          isLoading={taxRates.isLoading}
          setSearchText={setSearchText}
        />
      </div>

      {openCreateModal && (
        <CreateModal
          modalStyling="tw-max-h-full tw-w-[479px] tw-max-w-full "
          openPopup={openCreateModal}
          setOpenPopup={setOpenCreateModal}
          addLabel="Add New Tax Rate"
          editLabel="Edit Tax Rate"
          inputLabel="Tax Rate"
          inputPlaceholderText="Enter Tax Rate"
          addButtonText="Save"
          editButtonText="Update"
          closeText="Close"
          toggleSwitch={true}
          type="number"
          inputLabelValue={taxRate}
          toggleSwitchValue={toggleSwitchValue}
          handleChangeInputLabelValue={handleChangeTaxRate}
          handleClose={handleClose}
          handleSubmitClick={handleSubmitClick}
          edit={taxRateId}
          handleDefaulTaxRateSwitch={handleDefaulTaxRateSwitch}
        />
      )}

      <ConfirmationModal
        show={openConfirmationPopUp}
        onConfirm={handleConfirmation}
        onCancel={handleClose}
        message="Are you sure, you want to delete the tax rate?"
        messageStyling="tw-mt-6 tw-text-text-medium-gray tw-text-center tw-text-base tw-not-italic tw-font-bold tw-leading-5"
        content=""
        img="/assets/icons/red-question.svg"
        cancelText="No"
        confirmText="Yes, Delete"
        cancelTextStyling="ttw-flex tw-h-10 tw-justify-center tw-items-center tw-px-6 tw-py-2 tw-rounded-md tw-bg-[#BBB] hover:tw-bg-[#BBB]"
        confirmTextStyling="tw-flex tw-h-10 tw-justify-center tw-items-center tw-px-6 tw-py-2 tw-rounded-md tw-bg-[#1D4ED8] hover:tw-bg-[#1D4ED8]"
      />
    </div>
  );
}

export default TaxRate;
