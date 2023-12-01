'use client';

/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/button-has-type */
import CustomButton from '@/common/components/custom-button/custom-button.component';
import PlusIcon from '@/common/icons/plus.icon';
import Toaster from '@/common/components/toaster/toaster.component';
import useProduct from './use-product.hook';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import SearchIcon from '@/common/icons/search-icon';
import ConfirmationModal from '@/common/components/custom-model-confirmation/custom-model-confirmation';
import SearchableDropDown from '@/common/components/search-dropdown/search-dropdown.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import Modal from '@/common/components/modal/modal.component';
import PriceGroup from '../customer/create-customer/personal-details/components/price-group/price-group.component';
import DiscountGroup from '../customer/create-customer/personal-details/components/discount-group/discount-group.component';
import Select from '@/common/components/select/select.component';
import CustomDataTable from '@/common/components/custom-data-table/custom-data-table.component';
import ConfirmationDialog from '@/common/components/custom-dialog-confirmation/ConfirmationDialog';
import Loadar from '@/common/components/loadar/loadar.component';
import FilterModel from './components/filter-model.component';

export default function Product() {
  const {
    handleColShow,
    open,
    columns,
    columnState,
    rows,
    handleToggleColumn,
    showToaster,
    toasterMsg,
    setShowToaster,
    handleSearch,
    openConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    confirmationActionType,
    ref,
    setSearchText,
    selectedColumn,
    setSelectedColumn,
    register,
    handleSubmit,
    openFilterModal,
    setOpenFilterModal,
    filterModalCloseHandler,
    allPriceGroup,
    selectedPriceGroup,
    allDiscountGroup,
    selectedDiscountGroup,
    setAllPriceGroup,
    setSelectedPriceGroup,
    setAllDiscountGroup,
    setSelectedDiscountGroup,
    onSubmitFilterForm,
    options,
    selectedProduct,
    handleSelectProduct,
    productCategories,
    actionsOption,
    selectedRow,
    isLoading,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize,
    openFilterPopup,
    setOpenFilterPopup,
    parentCategoryOptions,
    parentCategoryLevel1Options,
    parentCategoryLevel2Options,
    parentCategoryLevel3Options
  } = useProduct();

  const initialColumns = [
    { id: '1', name: 'displayId', title: 'Product ID #', selected: true },
    { id: '2', name: 'productName', title: 'Product Name', selected: true },
    { id: '3', name: 'manufacturer', title: 'Manufacture', selected: true },
    { id: '4', name: 'grossPrice', title: 'Gross Price', selected: true },
    { id: '5', name: 'purchasePrice', title: 'Purchasing Price', selected: true },
    { id: '6', name: 'unit', title: 'Unit', selected: true },
    { id: '7', name: 'netPrice', title: 'Net Price', selected: true },
    { id: '8', name: 'minSellingPrice', title: 'Min Selling Price', selected: false },
    { id: '9', name: 'quantity', title: 'No. of Pieces', selected: false },
    { id: '10', name: 'taxRate', title: 'Tax Rate', selected: false },
    { id: '11', name: 'category', title: 'Category', selected: false }
  ];

  return (
    <div className="">
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
            {selectedRow?.id}: {selectedRow?.productName}?
          </p>
        }
      />
      <div className="">
        <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] ">
          <div className="tw-flex tw-items-center tw-justify-between tw-py-[24px]">
            <h1 className="h2 tw-font-medium">List of Product</h1>
            <CustomButton
              className="btn-primary tw-font-normal"
              text="Create product"
              startIcon={<PlusIcon />}
              href="/product/create"
            />
          </div>
          <div>
            <div className="tw-mb-[80px]">
              <CustomDataTable
                initialColumns={initialColumns}
                initialTableData={rows}
                actionsOption={actionsOption}
                setSearchText={setSearchText}
                isLoading={isLoading}
                dataTotallRecords={dataTotallRecords}
                tablePageNum={tablePageNum}
                setTablePageNum={setTablePageNum}
                tablePageSize={tablePageSize}
                setTablePageSize={setTablePageSize}
                openFilterPopup={openFilterPopup}
                setOpenFilterPopup={setOpenFilterPopup}
                // renderFilterContent={
                //   <FilterModel
                //     allPriceGroup={allPriceGroup}
                //     setAllPriceGroup={setAllPriceGroup}
                //     selectedPriceGroup={selectedPriceGroup}
                //     setSelectedPriceGroup={setSelectedPriceGroup}
                //     allDiscountGroup={allDiscountGroup}
                //     setAllDiscountGroup={setAllDiscountGroup}
                //     selectedDiscountGroup={selectedDiscountGroup}
                //     setSelectedDiscountGroup={setSelectedDiscountGroup}
                //     handleSubmit={handleSubmit}
                //     onSubmitFilterForm={onSubmitFilterForm}
                //     register={register}
                //     options={options}
                //     handleSelectProduct={handleSelectProduct}
                //     productCategories={productCategories}
                //     parentCategoryOptions={parentCategoryOptions}
                //     parentCategoryLevel1Options={parentCategoryLevel1Options}
                //     parentCategoryLevel2Options={parentCategoryLevel2Options}
                //     parentCategoryLevel3Options={parentCategoryLevel3Options}
                //   />
                // }
              />
            </div>
            <div className='className="tw-mt-[16px]"'>
              <Modal
                onClose={filterModalCloseHandler}
                show={openFilterModal}
                title="Filters"
              >
                <form onSubmit={handleSubmit(onSubmitFilterForm)}>
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <Select
                        name="productName"
                        label="Select Product Name"
                        options={options}
                        onChange={(e, value) => handleSelectProduct(value)}
                        defaultValue="Select Product Name"
                        register={register}
                      />
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <Select
                        name="productCategory"
                        label="Select Product Category"
                        options={productCategories}
                        defaultValue="Select Product Category"
                        register={register}
                      />
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <Select
                        name="subCategory1"
                        label="Select Sub-Category Level 1"
                        defaultValue="Select Sub-Category Level 1"
                        register={register}
                      />
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <Select
                        name="subCategory2"
                        label="Select Sub-Category Level 2"
                        defaultValue="Select Sub-Category Level 2"
                        register={register}
                      />
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <Select
                        name="subCategory3"
                        label="Select Sub-Category Level 3"
                        defaultValue="Select Sub-Category Level 3"
                        register={register}
                      />
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <PriceGroup
                        options={allPriceGroup}
                        setOptions={setAllPriceGroup}
                        selectedOptions={selectedPriceGroup}
                        setSelectedOptions={setSelectedPriceGroup}
                        className="tw-text-xs"
                      />
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <DiscountGroup
                        options={allDiscountGroup}
                        setOptions={setAllDiscountGroup}
                        selectedOptions={selectedDiscountGroup}
                        setSelectedOptions={setSelectedDiscountGroup}
                        className="tw-text-xs"
                      />
                    </div>
                    <hr />
                  </div>
                  <div className="tw-mt-5 tw-flex tw-justify-between">
                    <CustomButton
                      onClick={filterModalCloseHandler}
                      text="Clear all"
                      className="btn-cancel"
                    />
                    <CustomButton
                      text="Apply Filters"
                      type="submit"
                      className="btn-primary"
                    />
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
