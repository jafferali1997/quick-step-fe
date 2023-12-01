import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomDataTable from '@/common/components/custom-data-table/custom-data-table.component';
import ConfirmationDialog from '@/common/components/custom-dialog-confirmation/ConfirmationDialog';
import FileInput from '@/common/components/file-input/file-input.component';
import ModalFooter from '@/common/components/modal/components/modal-footer.component';
import Modal from '@/common/components/modal/modal.component';
import TextArea from '@/common/components/text-area/text-area.component';
import PlusIcon from '@/common/icons/plus.icon';
import ViewCustomerFilter from './component/view-customer-filter.component';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import useCustomer from './use-customer.hook';
import COUNTRIES from '@/common/constants/countries.constant';

const initialColumns = [
  { id: '1', name: 'id', title: 'Customer ID #', selected: true },
  { id: '2', name: 'firstName', title: 'First Name', selected: true },
  { id: '3', name: 'lastName', title: 'Last Name', selected: true },
  { id: '4', name: 'companyName', title: 'Company Name', selected: true },
  { id: '5', name: 'address', title: 'Company Address', selected: true },
  { id: '6', name: 'country', title: 'Country', selected: false },
  { id: '7', name: 'gender', title: 'Gender', selected: false },
  { id: '8', name: 'status', title: 'Status', selected: true },
  { id: '9', name: 'companyEmail', title: 'Company Email', selected: false },
  { id: '10', name: 'companyPhone', title: 'Company Phone', selected: false },
  { id: '11', name: 'tin', title: 'TIN', selected: false },
  { id: '12', name: 'address', title: 'Address', selected: false },
  { id: '13', name: 'city', title: 'City', selected: false },
  { id: '14', name: 'postalCode', title: 'Postal Code', selected: false },
  { id: '15', name: 'companyMobile', title: 'Company Mobile Number', selected: false }
];

export default function Customer() {
  const {
    handleColShow,
    open,
    columns,
    columnState,
    rows,
    rowData,
    handleToggleColumn,
    showToaster,
    toasterMsg,
    setShowToaster,
    register,
    handleSubmit,
    setValue,
    errors,
    openModal,
    modalCloseHandler,
    openConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    selectedRow,
    confirmationActionType,
    onCommentSubmit,
    ref,
    filterModalCloseHandler,
    openFilterModal,
    setOpenFilterModal,
    allPriceGroup,
    selectedPriceGroup,
    allDiscountGroup,
    selectedDiscountGroup,
    handleCountryChange,
    cities,
    error,
    setError,
    setCountry,
    country,
    onCountryChange,
    setAllPriceGroup,
    setSelectedPriceGroup,
    setAllDiscountGroup,
    setSelectedDiscountGroup,
    filterRegister,
    onSubmitFilterForm,
    selectedColumn,
    setSelectedColumn,
    searchText,
    setSearchText,
    handleItemsPerPage,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    actionsOption,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup,
    filterHandleSubmit,
    filterControl,
    fileInputRef,
    doubleActionOption
  } = useCustomer();

  return (
    <div className="">
      {rowData && (
        <FileInput
          module={rowData}
          moduleName="CUSTOMER"
          fileRef={fileInputRef}
          flexible={true}
        />
      )}
      <Modal onClose={modalCloseHandler} show={openModal} title="Add Comment">
        <form onSubmit={handleSubmit(onCommentSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <TextArea
              type="text"
              name="customerComment"
              placeholder="Enter Comment"
              register={register}
              errors={errors}
            />
          </div>
          <ModalFooter onClose={modalCloseHandler} submitButtonText="Submit" />
        </form>
      </Modal>
      <ConfirmationDialog
        show={openConfirmationModal}
        onClose={() => confirmationModalCloseHandler()}
        onConfirm={() => confirmationModalHandler()}
        message={
          confirmationActionType === 'delete'
            ? 'Are you sure you want to delete'
            : `Are you sure you want to ${
                selectedRow?.isActive ? 'deactivate' : 'activate'
              }`
        }
        content={
          <p>
            {selectedRow?.id}: {selectedRow?.firstName} {selectedRow?.lastName}?
          </p>
        }
      />
      <div className="">
        <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] ">
          <div className="tw-flex tw-items-center tw-justify-between tw-py-[24px]">
            <h1 className="h2 tw-font-medium">List of customer</h1>
            <CustomButton
              className="btn-primary tw-font-dm tw-text-sm tw-font-medium tw-leading-[18px]"
              text="Create customer"
              startIcon={<PlusIcon />}
              href="/customer/create"
            />
          </div>
          <div className="tw-mb-[80px]">
            <CustomDataTable
              initialColumns={initialColumns}
              initialTableData={rows}
              doubleActionOption={doubleActionOption}
              openFilterPopup={openFilterPopup}
              setOpenFilterPopup={setOpenFilterPopup}
              renderFilterContent={
                <ViewCustomerFilter
                  filterRegister={filterRegister}
                  allPriceGroup={allPriceGroup}
                  setAllPriceGroup={setAllPriceGroup}
                  selectedPriceGroup={selectedPriceGroup}
                  setSelectedPriceGroup={setSelectedPriceGroup}
                  allDiscountGroup={allDiscountGroup}
                  setAllDiscountGroup={setAllDiscountGroup}
                  selectedDiscountGroup={selectedDiscountGroup}
                  setSelectedDiscountGroup={setSelectedDiscountGroup}
                  country={country}
                  COUNTRIES={COUNTRIES}
                  onCountryChange={onCountryChange}
                  cities={cities}
                  filterHandleSubmit={filterHandleSubmit}
                  onFilterHandleSubmit={onSubmitFilterForm}
                  filterControl={filterControl}
                  filterModalCloseHandler={filterModalCloseHandler}
                />
              }
              setSearchText={setSearchText}
              isLoading={isLoading}
              dataTotallRecords={dataTotallRecords}
              tablePageNum={tablePageNum}
              setTablePageNum={setTablePageNum}
              tablePageSize={tablePageSize}
              setTablePageSize={setTablePageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
