'use client';

import React from 'react';
import DownloadDropdownBtn from '@/common/components/download-dropdown-button/download-dropdown-button.component';
import PlusIcon from '@/common/icons/plus.icon';
import useAdminViewOffer from './use-admin-view-offer.hook';
import CustomDataTabel from '@/common/components/custom-data-table/custom-data-table.component';
import Select from '@/common/components/select/select.component';
import FiltersModal from '@/common/components/custom-filters-modal/custom-filters-modal';

export default function AdminViewOffer() {
  const {
    offers,
    initialColumns,
    openFilterModal,
    setOpenFilterPopup,
    openFilterPopup,
    filterModalCloseHandler,
    register,
    handleSubmit,
    onSubmitFilterForm,
    selectedNoOfItems,
    setSelectedNoOfItems,
    selectedNetPrice,
    setSelectedNetPrice,
    selectedGrossPrice,
    setSelectedGrossPrice
  } = useAdminViewOffer();
  return (
    <div className="tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] tw-pb-8 tw-pt-3">
      <div className="tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
        <h2 className="tw-font-dm tw-text-[22px] tw-font-medium tw-capitalize tw-leading-8 tw-text-text-dark-gray">
          Offers
        </h2>

        <div className="tw-h-[37px] tw-w-full tw-max-w-[502px] tw-bg-[#BBBBBB26]">
          <Select
            // value={selectedCustomer}
            name="customer"
            // options={options}
            // onChange={(e, value) => handleSelectCustomer(value)}
            defaultValue="Select business owner"
          />
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
      <div className="tw-border-border-gray tw-mt-4 tw-rounded-[10px_10px_0px_0px] tw-border-[1px] tw-border-b-[none] tw-bg-[#FBFBFB]">
        <div className="tw-w-full tw-pb-5">
          <CustomDataTabel
            initialColumns={initialColumns}
            // initialTableData={data}
            // actionsOption={actionsOption}
            // buttonLabel="View Data"
            // module="Offer"
            // customStatusOptions={OFFER_STATUS_OPTIONS}
            // handleStatusChange={handleChange}
            // handleConvertClick={handleConvertClick}
            // convertToOptions={convertToOptions}
            // isDateShow={true}
            // isConvertShow={true}
            // isTabTable={true}
            // action={action}
            // allData={allData}
            // setSearchText={setSearchText}
            // isLoading={isLoading}
            // dataTotallRecords={dataTotallRecords}
            // tablePageNum={tablePageNum}
            // setTablePageNum={setTablePageNum}
            // tablePageSize={tablePageSize}
            // setTablePageSize={setTablePageSize}
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
              />
            }
            filterModelWidth="440px"
          />
        </div>
      </div>
    </div>
  );
}
