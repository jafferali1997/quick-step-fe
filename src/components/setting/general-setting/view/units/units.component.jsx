import PlusIcon from '@/common/icons/plus.icon';
import CustomDataTabe from '@/common/components/custom-data-table/custom-data-table.component';
import useUnits from './use-units.hook';
import CreateModal from '@/common/components/create-modal/create-modal';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import ConfirmationModal from '@/common/components/confirmation-modal/confirmation-modal.component';

function Units() {
  const {
    initialColumns,
    data,
    tablePageNum,
    tablePageSize,
    setTablePageNum,
    setTablePageSize,
    handleCreateTaxRate,
    openCreateModal,
    unit,
    units,
    handleChangeUnit,
    handleClose,
    handleSubmitClick,
    unitId,
    openConfirmationPopUp,
    handleConfirmation,
    setSearchText
  } = useUnits();
  return (
    <div className="tw-px-5 tw-py-8">
      <div className="tw-mt-[0.5px] tw-flex tw-justify-between">
        <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
          Units
        </div>
        <div className="tw-flex">
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
          isLoading={units.isLoading}
          setSearchText={setSearchText}
        />
      </div>

      {openCreateModal && (
        <CreateModal
          modalStyling="tw-max-h-full tw-w-[479px] tw-max-w-full "
          openPopup={openCreateModal}
          addLabel="Add New Unit"
          editLabel="Edit Unit"
          inputLabel="Unit"
          inputPlaceholderText="Enter Unit"
          addButtonText="Save"
          editButtonText="Update"
          closeText="Close"
          inputLabelValue={unit}
          handleChangeInputLabelValue={handleChangeUnit}
          handleClose={handleClose}
          handleSubmitClick={handleSubmitClick}
          edit={unitId}
          type="text"
        />
      )}

      <ConfirmationModal
        show={openConfirmationPopUp}
        onConfirm={handleConfirmation}
        onCancel={handleClose}
        message="Are you sure, you want to delete the unit?"
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

export default Units;
