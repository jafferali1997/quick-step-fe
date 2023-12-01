/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Dialog, DialogContent, Menu, MenuItem } from '@mui/material/node';
import useCustomDataTable from './use-custom-data-table.hook';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Select from '@/common/components/select/select.component';
import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import CustomSelect from '../custom-select/custom-select.component';
import SearchableDropDown from '../search-dropdown/search-dropdown.component';
import NoResultFound from '../no-result-found/no-result-found';
import InfoIcon from '@/common/icons/info.icon';
import useClickOutside from '@/common/hooks/use-click-outside';
import Loadar from '../loadar/loadar.component';
import SearchIcon from '@/common/icons/search-icon';
import { INVOICE_STATUS } from '@/common/constants/document-status.constant';
import capitalizeFirstLetter from '@/common/utils/capitalize-first-letter';

const col = [
  {
    id: 'ID #',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    isActive: 'Status',
    gender: 'Gender',
    address: 'Address',
    state: 'State', // TODO: Need to be removed (Should it be added?)
    country: 'Country',
    postalCode: 'Postal Code',
    companyName: 'Company Name',
    companyAddress: 'Company Address',
    companyPhone: 'Company Phone Number',
    companyEmail: 'Company Email Address',
    companyMobile: 'Company Mobile Number',
    companyFax: 'Fax Number',
    tin: 'TIN'
  }
];

export default function CustomDataTabe({
  initialColumns,
  initialTableData,
  actionsOption,
  statusOptions,
  doubleActionOption,
  buttonLabel,
  CustomIconPopup,
  handleSubmit,
  register,
  reset,
  onSubmitFilterForm,
  selectedInstallments,
  setSelectedInstallments,
  selectedPaymentAmount,
  setSelectedPaymentAmount,
  selectedStatus,
  setSelectedStatus,
  action,
  allData,
  statusAction,
  renderFilterContent,
  module,
  filterModelWidth = '429px',
  handleStatusChange,
  handleConvertClick,
  convertToOptions,
  isOfferDraft,
  isDateShow,
  isConvertShow,
  isCollectiveShow,
  handleBookOffer,
  isTabTable,
  customStatusOptions,
  isBookDraft,
  handleBook,
  setSearchText,
  isLoading,
  dataTotallRecords,
  tablePageNum,
  setTablePageNum,
  tablePageSize,
  setTablePageSize,
  openFilterPopup,
  setOpenFilterPopup,
  simpleSearch,
  hideColumn,
  paginationShow = true,
  tableHeaderShow = true,
  checkBoxShow = true
}) {
  const {
    columns,
    setColumns,
    tableData,
    setTableData,
    selectedRows,
    setSelectedRows,
    selectAll,
    setSelectAll,
    sortOrder,
    setSortOrder,
    handleSort,
    handleDragEnd,
    activeRow,
    setActiveRow,
    handleActionClick,
    handleStatusOptionChange,
    getStatusOptionClassName,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    handleItemsPerPageChange,
    indexOfLastItem,
    indexOfFirstItem,
    currentItems,
    totalPages,
    pageNumbers,
    getPageRangeText,
    ref,
    openPopup,
    setOpenPopup,
    searchAllOption,
    openColPopup,
    refCol,
    setOpenColPopup,
    columnState,
    setColumnState,
    handleToggleColumn,
    visibleColumns,
    selectedRow,
    setSelectedRow,
    handleButtonClick,
    activeRowCollaps,
    setActiveRowCollaps,
    renderCustomContent,
    renderCustomIconPopup,
    customIconPopup,
    setCustomIconPopup,
    convertMenu,
    setConverMenu,
    handleToggleAllColumns,
    selectAllColumn,
    refConvert,
    renderPageButtons
  } = useCustomDataTable(
    initialColumns,
    initialTableData,
    buttonLabel,
    CustomIconPopup,
    statusAction,
    action,
    allData,
    dataTotallRecords,
    tablePageNum,
    setTablePageNum,
    tablePageSize,
    setTablePageSize
  );
  useClickOutside([refConvert], [setConverMenu]);

  return (
    <>
      <div
        className={` tw-mt-4 tw-flex tw-w-full tw-flex-col tw-items-start tw-gap-4 ${
          isTabTable
            ? ''
            : ' tw-rounded-[10px] tw-border tw-border-solid tw-border-disabled-input'
        }  tw-bg-white tw-pb-0`}
      >
        {tableHeaderShow && (
          <div
            className={`tw-flex tw-w-full tw-items-center tw-justify-between ${
              isTabTable ? '' : 'tw-rounded-[10px_10px_0px_0px]'
            }  tw-bg-[#BBBBBB1A] tw-px-5 tw-py-3`}
          >
            <div className="flex-shrink-0 sm:w-1/2 tw-flex  tw-w-full tw-max-w-[380px] tw-gap-2.5 ">
              {simpleSearch ? (
                <CustomInput
                  placeholder="Search"
                  type="text"
                  className="tw-relative tw-max-h-[42px] tw-max-w-[323px]"
                  startIcon={<SearchIcon />}
                />
              ) : (
                <>
                  {' '}
                  <SearchableDropDown
                    setSearchText={setSearchText}
                    searchAllOption={searchAllOption}
                  />
                  <div
                    onClick={() => setOpenFilterPopup(true)}
                    className="tw-flex tw-h-[41px] tw-w-10 tw-items-center tw-justify-center tw-rounded-[5px] tw-border tw-border-solid tw-border-disabled-input tw-bg-white hover:tw-cursor-pointer"
                  >
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2943 4.79175C16.2943 4.22313 16.4629 3.66728 16.7788 3.19449C17.0947 2.72169 17.5437 2.3532 18.0691 2.1356C18.5944 1.91799 19.1725 1.86106 19.7302 1.97199C20.2878 2.08292 20.8001 2.35674 21.2022 2.75882C21.6043 3.16089 21.8781 3.67317 21.989 4.23087C22.1 4.78856 22.043 5.36663 21.8254 5.89196C21.6078 6.4173 21.2393 6.86632 20.7665 7.18222C20.2937 7.49813 19.7379 7.66675 19.1693 7.66675C18.4068 7.66675 17.6755 7.36385 17.1363 6.82468C16.5972 6.28551 16.2943 5.55425 16.2943 4.79175ZM1.91927 5.75008H13.4193C13.6734 5.75008 13.9172 5.64912 14.0969 5.46939C14.2766 5.28967 14.3776 5.04592 14.3776 4.79175C14.3776 4.53758 14.2766 4.29383 14.0969 4.11411C13.9172 3.93438 13.6734 3.83342 13.4193 3.83342H1.91927C1.6651 3.83342 1.42135 3.93438 1.24163 4.11411C1.0619 4.29383 0.960938 4.53758 0.960938 4.79175C0.960938 5.04592 1.0619 5.28967 1.24163 5.46939C1.42135 5.64912 1.6651 5.75008 1.91927 5.75008ZM7.66927 8.62508C7.07612 8.62675 6.49799 8.81184 6.01417 9.15498C5.53034 9.49812 5.16449 9.98252 4.96677 10.5417H1.91927C1.6651 10.5417 1.42135 10.6427 1.24163 10.8224C1.0619 11.0022 0.960938 11.2459 0.960938 11.5001C0.960938 11.7542 1.0619 11.998 1.24163 12.1777C1.42135 12.3574 1.6651 12.4584 1.91927 12.4584H4.96677C5.14258 12.9557 5.45179 13.395 5.86055 13.7283C6.26932 14.0616 6.7619 14.276 7.28437 14.3481C7.80684 14.4202 8.33907 14.3472 8.82283 14.137C9.30658 13.9269 9.7232 13.5877 10.0271 13.1567C10.331 12.7256 10.5105 12.2192 10.5459 11.693C10.5813 11.1668 10.4712 10.6409 10.2278 10.1731C9.98432 9.70518 9.61687 9.31328 9.16561 9.04026C8.71435 8.76723 8.19669 8.6236 7.66927 8.62508ZM21.0859 10.5417H13.4193C13.1651 10.5417 12.9213 10.6427 12.7416 10.8224C12.5619 11.0022 12.4609 11.2459 12.4609 11.5001C12.4609 11.7542 12.5619 11.998 12.7416 12.1777C12.9213 12.3574 13.1651 12.4584 13.4193 12.4584H21.0859C21.3401 12.4584 21.5839 12.3574 21.7636 12.1777C21.9433 11.998 22.0443 11.7542 22.0443 11.5001C22.0443 11.2459 21.9433 11.0022 21.7636 10.8224C21.5839 10.6427 21.3401 10.5417 21.0859 10.5417ZM9.58594 17.2501H1.91927C1.6651 17.2501 1.42135 17.3511 1.24163 17.5308C1.0619 17.7105 0.960938 17.9543 0.960938 18.2084C0.960938 18.4626 1.0619 18.7063 1.24163 18.8861C1.42135 19.0658 1.6651 19.1668 1.91927 19.1668H9.58594C9.8401 19.1668 10.0839 19.0658 10.2636 18.8861C10.4433 18.7063 10.5443 18.4626 10.5443 18.2084C10.5443 17.9543 10.4433 17.7105 10.2636 17.5308C10.0839 17.3511 9.8401 17.2501 9.58594 17.2501ZM21.0859 17.2501H18.0384C17.8124 16.6107 17.3675 16.0718 16.7826 15.7286C16.1976 15.3854 15.5101 15.2601 14.8417 15.3748C14.1733 15.4895 13.5669 15.8368 13.1298 16.3553C12.6926 16.8738 12.4529 17.5302 12.4529 18.2084C12.4529 18.8866 12.6926 19.543 13.1298 20.0615C13.5669 20.58 14.1733 20.9273 14.8417 21.042C15.5101 21.1567 16.1976 21.0314 16.7826 20.6882C17.3675 20.3451 17.8124 19.8062 18.0384 19.1668H21.0859C21.3401 19.1668 21.5839 19.0658 21.7636 18.8861C21.9433 18.7063 22.0443 18.4626 22.0443 18.2084C22.0443 17.9543 21.9433 17.7105 21.7636 17.5308C21.5839 17.3511 21.3401 17.2501 21.0859 17.2501Z"
                        fill="#585858"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
            <div className="tw-relative tw-flex tw-w-full tw-items-center  tw-justify-end tw-gap-2">
              {hideColumn ? null : (
                <div className="tw-relative">
                  <button
                    onClick={() => setOpenColPopup(!openColPopup)}
                    className="tw-relative tw-font-dm  tw-text-sm tw-font-normal tw-not-italic tw-leading-[21buttonx] tw-text-text-light-gray tw-underline"
                  >
                    Show columns
                  </button>
                  {openColPopup && (
                    <div
                      ref={refCol}
                      className="tw-absolute tw-left-[-200px] tw-top-10 tw-z-[100] tw-flex  tw-w-[257px] tw-flex-col tw-items-start tw-gap-[11px]  tw-rounded-md tw-border-[2px] tw-border-solid tw-border-[#BBBBBB1A] tw-bg-white tw-p-3 tw-shadow-2xl"
                    >
                      <div className="tw-flex tw-gap-2">
                        <input
                          type="checkbox"
                          className="unchecked:tw-bg-[url('/assets/images/unchecked.svg')] tw-h-4 tw-w-4 tw-appearance-none tw-rounded-sm tw-border tw-border-gray-300 tw-bg-cover checked:tw-bg-[url('/assets/images/checked.svg')]"
                          checked={selectAllColumn}
                          onChange={() => handleToggleAllColumns()}
                        />

                        <label
                          className="tw-font-dm tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-[#2C2E3E]"
                          htmlFor="selectAll"
                        >
                          Select All
                        </label>
                      </div>

                      {columns.map((col) => (
                        <div key={col.name} className="tw-flex tw-gap-2">
                          <input
                            id={col.name}
                            type="checkbox"
                            className="unchecked:tw-bg-[url('/assets/images/unchecked.svg')] tw-h-4 tw-w-4 tw-appearance-none tw-rounded-sm tw-border tw-border-gray-300 tw-bg-cover checked:tw-bg-[url('/assets/images/checked.svg')]"
                            checked={col.selected}
                            onChange={() => handleToggleColumn(col.name)}
                          />
                          <label
                            className="tw-font-dm tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-[#2C2E3E]"
                            htmlFor={col.name}
                          >
                            {col.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {(module === 'Offer' ||
                module === 'Order' ||
                module === 'Invoices' ||
                module === 'Delivery Notes') && (
                <>
                  {isConvertShow && (
                    <div className=" tw-relative tw-z-10  tw-max-h-[36px] ">
                      <CustomButton
                        text="Convert to"
                        disabled={selectedRows.length !== 1}
                        onClick={(e) => {
                          // handleConvertClick(e);
                          setConverMenu(() => !convertMenu);
                        }}
                        className="tw-relative tw-flex  tw-max-h-[36px] tw-w-[107.29px] tw-items-start tw-items-center tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-bg-[#FFF] tw-px-2 tw-py-[10px] tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray tw-opacity-[0.699999988079071]"
                        endIcon={
                          <div>
                            <img
                              src="/assets/icons/arrow-drop.svg"
                              alt=""
                              height="4.81"
                              width="8.01px"
                            />
                          </div>
                        }
                      />

                      {convertMenu && (
                        <div
                          anchorEl={convertMenu}
                          keepMounted
                          onClose={() => setConverMenu(false)}
                          open={convertMenu}
                          ref={refConvert}
                          className=" tw-absolute tw-top-10 tw-flex tw-w-[189px] tw-flex-col tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-p-3"
                        >
                          {convertToOptions?.map((option, i) => {
                            return (
                              <div
                                id={option.label}
                                className="w-flex tw-w-full tw-items-center tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#e6e6e67e] "
                                onClick={() =>
                                  option.onClick(
                                    selectedRows,
                                    setConverMenu,
                                    setSelectedRows
                                  )
                                }
                              >
                                {option.onClick}
                                {option.label}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  <div className=" tw-flex tw-max-h-[36px] tw-w-[145px] tw-items-center tw-rounded-md tw-border tw-border-solid tw-border-disabled-input  tw-bg-white">
                    <CustomInput
                      name="Date"
                      className="!tw-border-none tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-[#333]"
                      type="date"
                      defaultValue="25-2-23"
                      isRequired={true}
                    />
                  </div>
                  {isBookDraft && (
                    <CustomButton
                      text={`Book ${module}`}
                      onClick={() => handleBook({ selectedRows, setSelectedRows })}
                      disabled={selectedRows.length === 0}
                      className="btn-secondary  tw-rounded-md tw-bg-[#047857] tw-px-4 tw-py-[9px] tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-opacity-[0.699999988079071]"
                    />
                  )}
                  {isDateShow && (
                    <CustomButton
                      text="All"
                      className="tw-flex tw-max-h-[36px] tw-items-center tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-bg-[#FFF] tw-px-2 tw-py-[9px] tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray tw-opacity-[0.699999988079071]"
                      startIcon={
                        <div>
                          <img
                            src="/assets/icons/all.svg"
                            alt=""
                            height="16px"
                            width="16px"
                          />
                        </div>
                      }
                      endIcon={
                        <div>
                          <img
                            src="/assets/icons/arrow-drop.svg"
                            alt=""
                            height="4.81"
                            width="8.01px"
                          />
                        </div>
                      }
                    />
                  )}
                  {isCollectiveShow && (
                    <CustomButton
                      className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-whitespace-nowrap tw-rounded-md tw-bg-[#BBB] tw-px-4 tw-py-[9px] tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[color:var(--white,#FFF)]"
                      text="Collective Invoice"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <div className="tw-w-full">
          <div
            className={`custom-scroll  tw-max-w-full tw-overflow-x-auto ${
              isTabTable
                ? 'tw-rounded-[0px_0px_10px_10px] tw-border-b tw-border-solid tw-border-b-disabled-input'
                : ''
            }`}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <table className="tw-w-full">
                <thead className="tw-h-[59px]  tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#1d4ed808] tw-p-2 ">
                  <Droppable droppableId="columns" direction="horizontal">
                    {(provided) => (
                      <tr {...provided.droppableProps} ref={provided.innerRef}>
                        {checkBoxShow && (
                          <th className="tw-flex tw-h-[59.333px] tw-w-[59.333px] tw-shrink-0 tw-items-center tw-justify-center tw-gap-1 tw-px-0 tw-py-2">
                            <input
                              type="checkbox"
                              className="tw-h-4 tw-w-4 tw-bg-unchecked  checked:tw-bg-checked"
                              checked={selectAll}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  const ids = initialTableData.map((row) => row.id);
                                  setSelectedRows(ids);
                                  action(ids);
                                } else {
                                  setSelectedRows([]);
                                  action([]);
                                }
                                setSelectAll(e.target.checked);
                              }}
                            />
                          </th>
                        )}

                        {visibleColumns.map((column, index) => (
                          <Draggable
                            key={column.id}
                            draggableId={column.id}
                            index={index}
                          >
                            {(provided) => (
                              <th
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="tw-text-left "
                                key={column.id}
                              >
                                <div
                                  className="tw-flex tw-h-[59px] tw-cursor-pointer tw-items-center tw-gap-2 tw-p-2"
                                  onClick={() => handleSort(column.name.toLowerCase())}
                                >
                                  {' '}
                                  <span className="tw-whitespace-nowrap  tw-text-sm  tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                    {column.title}
                                  </span>
                                  <div className="tw-flex tw-flex-col">
                                    {sortOrder.column === column.name.toLowerCase() ? (
                                      <svg
                                        width="9"
                                        height="15"
                                        viewBox="0 0 9 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M0 6.3326L4.03846 0.499268L8.07692 6.3326H0ZM0 8.66724L4.03846 14.5006L8.07692 8.66724H0Z"
                                          fill="#BDBDBD"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="9"
                                        height="15"
                                        viewBox="0 0 9 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M0 6.3326L4.03846 0.499268L8.07692 6.3326H0ZM0 8.66724L4.03846 14.5006L8.07692 8.66724H0Z"
                                          fill="#BDBDBD"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </th>
                            )}
                          </Draggable>
                        ))}
                        {statusOptions && (
                          <th className="tw-text-left ">
                            <span className="tw-whitespace-nowrap  tw-text-sm  tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                              Status
                            </span>
                          </th>
                        )}

                        {buttonLabel && (
                          <th className=" tw-pl-0 tw-pr-4 tw-text-left">
                            <span className="tw-flex tw-items-center tw-gap-1 tw-whitespace-nowrap tw-text-sm  tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                              {buttonLabel}{' '}
                              <div title="Click on it and View More Data">
                                <InfoIcon />
                              </div>
                            </span>
                          </th>
                        )}
                        {CustomIconPopup && (
                          <th className="tw-px-2 tw-text-left">
                            <span className="tw-whitespace-nowrap  tw-text-sm  tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                              {CustomIconPopup.title}
                            </span>
                          </th>
                        )}

                        {actionsOption && (
                          <th className=" tw-pl-0 tw-pr-4 tw-text-left">
                            <span className="tw-whitespace-nowrap  tw-text-sm  tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                              Actions
                            </span>
                          </th>
                        )}

                        {doubleActionOption && (
                          <th className=" tw-pl-0 tw-pr-4 tw-text-left">
                            <span className="tw-whitespace-nowrap  tw-text-sm  tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                              Actions
                            </span>
                          </th>
                        )}
                        {provided.placeholder}
                      </tr>
                    )}
                  </Droppable>
                </thead>

                <tbody className="tw-p-2">
                  {currentItems?.map((row, index) => (
                    <React.Fragment key={row.id}>
                      <tr className="tw-h-[72px] tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-white tw-px-2 tw-py-4">
                        {checkBoxShow && (
                          <td className="tw-w-[40px] tw-text-center">
                            <input
                              type="checkbox"
                              className="tw-h-4 tw-w-4 tw-bg-unchecked  checked:tw-bg-checked"
                              checked={selectedRows.includes(row.id)}
                              onClick={() => {}}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRows([...selectedRows, row.id]);
                                  action([...selectedRows, row.id]);
                                } else {
                                  setSelectedRows(
                                    selectedRows.filter((id) => id !== row.id)
                                  );
                                  action(
                                    selectedRows.filter((id) => id !== row.id && row)
                                  );
                                }
                              }}
                            />
                          </td>
                        )}
                        {visibleColumns.map((column) => (
                          <td
                            className="tw-max-h-[59px] tw-max-w-[140px] tw-overflow-hidden tw-text-ellipsis  tw-whitespace-nowrap tw-pl-3 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray"
                            key={column.id}
                          >
                            <span
                              className={` ${
                                column.name === 'status' &&
                                (module === 'Invoices' || module === 'Expenditure') &&
                                row[column.name] === 'PAID'
                                  ? 'tw-flex tw-max-w-[44px] tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#0fff5f1a] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-secondary-green'
                                  : row[column.name] === 'OPEN' &&
                                    module !== 'Offer' &&
                                    module !== 'Delivery Notes' &&
                                    module !== 'Order' &&
                                    module !== 'Invoices'
                                  ? 'tw-flex tw-max-w-[52px] tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#ef20201a] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-danger'
                                  : column.name === 'status' && row.isActive === true
                                  ? 'tw-flex tw-w-fit tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#1d4ed81a] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-primary'
                                  : column.name === 'status' && row.isActive === false
                                  ? 'tw-flex tw-w-fit tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#ef20201a] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-danger'
                                  : (column.name === 'status' &&
                                      (module === 'Order' ||
                                        module === 'Delivery Notes' ||
                                        module === 'Invoices' ||
                                        module === 'Offer') &&
                                      row[column.name] === 'REJECTED') ||
                                    row[column.name] === INVOICE_STATUS.CANCELLED ||
                                    (column.name === 'status' &&
                                      row[column.name] === 'Rejected')
                                  ? ' tw-flex tw-max-w-[73px] tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#ffe8e8] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#A60A0A]'
                                  : column.name === 'status' &&
                                    row[column.name] === 'DRAFT'
                                  ? 'tw-max-w-[49px] tw-rounded-[5px] tw-bg-[#F2F2F2] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px]'
                                  : (column.name === 'status' && module === 'Offer') ||
                                    (column.name === 'status' && module === 'Order') ||
                                    (column.name === 'status' && module === 'Invoices') ||
                                    (module === 'Delivery Notes' &&
                                      row[column.name] === 'OPEN') ||
                                    row[column.name] === 'Open' ||
                                    row[column.name] === 'open'
                                  ? ''
                                  : column.name === 'status' &&
                                    row[column.name] === 'EXECUTED'
                                  ? ' tw-flex tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#F1FFB9] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#A58825]'
                                  : column.name === 'status' &&
                                    row[column.name] === 'EXECUTED'
                                  ? 'tw-flex tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#1D4ED8] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-primary'
                                  : column.name === 'status' &&
                                    (module === 'Order' ||
                                      module === 'Offer' ||
                                      module === 'Delivery Notes') &&
                                    row[column.name]?.toUpperCase() === 'INVOICED'
                                  ? 'tw-flex tw-items-center  tw-rounded-[5px] tw-bg-[#DCFFDE] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#0DA60A] '
                                  : (column.name === 'status' &&
                                      module === 'Delivery Notes' &&
                                      row[column.name] === 'DELIVERED') ||
                                    row[column.name] === 'Delivered' ||
                                    row[column.name] === 'delivered'
                                  ? 'tw-flex tw-max-w-[88px] tw-items-center tw-rounded-[5px] tw-bg-[#DCFFDE] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#0DA60A] '
                                  : column.name === 'status' &&
                                    module === 'Invoices' &&
                                    (row[column.name] === 'OVERDUE' ||
                                      row[column.name] === 'Overdue' ||
                                      row[column.name] === 'overdue')
                                  ? 'tw-flex tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#F1FFB9] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#A58825]'
                                  : column.name === 'status' &&
                                    module === 'Delivery Notes' &&
                                    row[column.name] === 'RETURNED'
                                  ? 'fdf'
                                  : column.name === 'status' &&
                                    row[column.name] === 'Block'
                                  ? 'tw-flex tw-max-w-[52px] tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#ef20201a] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-danger'
                                  : column.name === 'status' &&
                                    row[column.name] === 'Unblock'
                                  ? 'tw-flex tw-max-w-[69px] tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#1d4ed81a] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-primary'
                                  : ''
                              }`}
                            >
                              {' '}
                              {column.name === 'status' && row.isActive === true ? (
                                'Active'
                              ) : column.name === 'status' && row.isActive === false ? (
                                'In-active'
                              ) : column.name === 'status' &&
                                (module === 'Order' ||
                                  module === 'Delivery Notes' ||
                                  module === 'Offer') &&
                                (row[column.name] === 'REJECTED' ||
                                  row[column.name] === 'Rejected' ||
                                  row[column.name] === 'rejected') ? (
                                'Rejected'
                              ) : column.name === 'status' &&
                                module === 'Invoices' &&
                                row[column.name] === INVOICE_STATUS.CANCELLED ? (
                                capitalizeFirstLetter(INVOICE_STATUS.CANCELLED)
                              ) : (column.name === 'status' &&
                                  (module === 'Order' || module === 'Offer') &&
                                  row[column.name] === 'INVOICED') ||
                                (column.name === 'status' &&
                                  module === 'Delivery Notes' &&
                                  row[column.name] === 'INVOICED') ? (
                                <p className="tw-flex tw-max-w-[71px] tw-items-center tw-rounded-[5px] tw-bg-[#DCFFDE] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#0DA60A]">
                                  Invoiced
                                </p>
                              ) : column.name === 'status' &&
                                (module === 'Order' ||
                                  module === 'Delivery Notes' ||
                                  module === 'Offer') &&
                                row[column.name] === 'DRAFT' ? (
                                'Draft'
                              ) : column.name === 'status' &&
                                row[column.name] === 'INVOICED' ? (
                                <CustomSelect
                                  options={customStatusOptions}
                                  id={row.id}
                                  value={row[column.name]}
                                  defaultValue={row[column.name]}
                                  onChange={(event) =>
                                    handleStatusChange(row.id, event.target.value)
                                  }
                                  className={`${getStatusOptionClassName(
                                    row[column.name],
                                    row.id
                                  )} tw-max-h-[26px] tw-w-[120px] !tw-max-w-[130px]`}
                                />
                              ) : column.name === 'status' &&
                                row[column.name] === 'ACCEPTED' ? (
                                <CustomSelect
                                  options={customStatusOptions}
                                  id={row.id}
                                  value={row[column.name]}
                                  defaultValue={row[column.name]}
                                  onChange={(event) =>
                                    handleStatusChange(row.id, event.target.value)
                                  }
                                  className={`${getStatusOptionClassName(
                                    row[column.name],
                                    row.id
                                  )} tw-max-h-[26px] tw-w-[120px] !tw-max-w-[130px]`}
                                />
                              ) : column.name === 'status' &&
                                (module === 'Offer' ||
                                  module === 'Order' ||
                                  module === 'Invoices' ||
                                  module === 'Delivery Notes') &&
                                (row[column.name] === 'OPEN' ||
                                  row[column.name] === 'Open' ||
                                  row[column.name] === 'open') ? (
                                <div className="tw-w-[92px] ">
                                  <CustomSelect
                                    options={customStatusOptions}
                                    id={row.id}
                                    value={row[column.name]}
                                    defaultValue={row[column.name]}
                                    onChange={(event) =>
                                      handleStatusChange(row.id, event.target.value)
                                    }
                                    className={`${getStatusOptionClassName(
                                      row[column.name],
                                      row.id
                                    )} tw-max-h-[26px] `}
                                  />
                                </div>
                              ) : column.name === 'status' &&
                                row[column.name] === 'EXECUTED' ? (
                                <CustomSelect
                                  options={customStatusOptions}
                                  id={row.id}
                                  value={row[column.name]}
                                  defaultValue={row[column.name]}
                                  onChange={(event) =>
                                    handleStatusChange(row.id, event.target.value)
                                  }
                                  className={`${getStatusOptionClassName(
                                    row[column.name],
                                    row.id
                                  )} tw-max-h-[26px] tw-w-[120px] !tw-max-w-[130px]`}
                                />
                              ) : column.name === 'status' &&
                                row[column.name] === 'SENT' ? (
                                <CustomSelect
                                  options={customStatusOptions}
                                  id={row.id}
                                  value={row[column.name]}
                                  defaultValue={row[column.name]}
                                  onChange={(event) =>
                                    handleStatusChange(row.id, event.target.value)
                                  }
                                  className={`${getStatusOptionClassName(
                                    row[column.name],
                                    row.id
                                  )} tw-max-h-[26px] !tw-w-[92px] !tw-max-w-[92px]`}
                                />
                              ) : column.name === 'status' &&
                                module === 'Delivery Notes' &&
                                row[column.name] === 'RETURNED' ? (
                                <CustomSelect
                                  options={customStatusOptions}
                                  id={row.id}
                                  value={row[column.name]}
                                  defaultValue={row[column.name]}
                                  onChange={(event) =>
                                    handleStatusChange(row.id, event.target.value)
                                  }
                                  className={`${getStatusOptionClassName(
                                    row[column.name],
                                    row.id
                                  )} tw-max-h-[26px] tw-w-[120px] !tw-max-w-[130px]`}
                                />
                              ) : column.name === 'status' &&
                                module === 'Invoices' &&
                                (row[column.name] === 'OVERDUE' ||
                                  row[column.name] === 'Overdue' ||
                                  row[column.name] === 'overdue') ? (
                                <p className="tw-flex tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#F1FFB9] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#A58825]">
                                  {row[column.name]}
                                </p>
                              ) : (
                                row[column.name] || '---'
                              )}
                            </span>
                          </td>
                        ))}
                        {statusOptions && (
                          <td className="">
                            <CustomSelect
                              options={statusOptions}
                              id={row.id}
                              defaultValue={row.status}
                              onChange={(event) =>
                                handleStatusOptionChange(row.id, event.target.value)
                              }
                              className={getStatusOptionClassName(row.status, row.id)}
                            />
                          </td>
                        )}
                        {buttonLabel && (
                          <td>
                            {activeRowCollaps === row.id ? (
                              <div
                                className="tw-flex tw-justify-center hover:tw-cursor-pointer"
                                onClick={() => setActiveRowCollaps(false)}
                              >
                                <svg
                                  width="27"
                                  height="27"
                                  viewBox="0 0 27 27"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_9908_129310)">
                                    <path
                                      d="M17.3291 12.3657H9.26462C8.73236 12.3657 8.29688 12.8012 8.29688 13.3335C8.29688 13.8657 8.73236 14.3012 9.26462 14.3012H17.3291C17.8614 14.3012 18.2969 13.8657 18.2969 13.3335C18.2969 12.8012 17.8614 12.3657 17.3291 12.3657Z"
                                      fill="#BBBBBB"
                                    />
                                  </g>
                                  <rect
                                    x="0.75"
                                    y="1.0835"
                                    width="25.0953"
                                    height="24.5"
                                    rx="3.25"
                                    stroke="#BBBBBB"
                                    stroke-width="1.5"
                                  />
                                  <defs>
                                    <clipPath id="clip0_9908_129310">
                                      <rect
                                        width="10"
                                        height="10"
                                        fill="white"
                                        transform="translate(8.29688 8.3335)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            ) : (
                              <div
                                className="tw-flex tw-justify-center hover:tw-cursor-pointer"
                                onClick={() => {
                                  handleButtonClick(row);
                                  setActiveRowCollaps(row.id);
                                }}
                              >
                                <svg
                                  width="27"
                                  height="27"
                                  viewBox="0 0 27 27"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_9908_125932)">
                                    <path
                                      d="M17.404 12.4405H14.3683C14.3209 12.4405 14.2755 12.4216 14.242 12.3882C14.2085 12.3547 14.1897 12.3092 14.1897 12.2619V9.22617C14.1897 8.73309 13.79 8.33331 13.2969 8.33331C12.8038 8.33331 12.404 8.73309 12.404 9.22617V12.2619C12.404 12.3092 12.3852 12.3547 12.3517 12.3882C12.3182 12.4216 12.2728 12.4405 12.2254 12.4405H9.18973C8.69665 12.4405 8.29688 12.8402 8.29688 13.3333C8.29688 13.8264 8.69665 14.2262 9.18973 14.2262H12.2254C12.2728 14.2262 12.3182 14.245 12.3517 14.2785C12.3852 14.312 12.404 14.3574 12.404 14.4047V17.4405C12.404 17.9335 12.8038 18.3333 13.2969 18.3333C13.79 18.3333 14.1897 17.9335 14.1897 17.4405V14.4047C14.1897 14.3574 14.2085 14.312 14.242 14.2785C14.2755 14.245 14.3209 14.2262 14.3683 14.2262H17.404C17.8971 14.2262 18.2969 13.8264 18.2969 13.3333C18.2969 12.8402 17.8971 12.4405 17.404 12.4405Z"
                                      fill="#BBBBBB"
                                    />
                                  </g>
                                  <rect
                                    x="0.75"
                                    y="1.08331"
                                    width="25.0953"
                                    height="24.5"
                                    rx="3.25"
                                    stroke="#BBBBBB"
                                    stroke-width="1.5"
                                  />
                                  <defs>
                                    <clipPath id="clip0_9908_125932">
                                      <rect
                                        width="10"
                                        height="10"
                                        fill="white"
                                        transform="translate(8.29688 8.33331)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            )}
                          </td>
                        )}
                        {CustomIconPopup && (
                          <td className="tw-relative">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setCustomIconPopup(row);
                                CustomIconPopup?.handleClick(row);
                              }}
                              className="tw-relative tw-flex tw-justify-center hover:tw-cursor-pointer"
                            >
                              {renderCustomIconPopup()}
                            </div>
                          </td>
                        )}
                        {actionsOption && (
                          <td className="tw-relative">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveRow(row.id);
                              }}
                              className="tw-relative tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray hover:tw-cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M9.75 12.333C9.75 13.5735 10.7595 14.583 12 14.583C13.2405 14.583 14.25 13.5735 14.25 12.333C14.25 11.0925 13.2405 10.083 12 10.083C10.7595 10.083 9.75 11.0925 9.75 12.333ZM9.75 19.833C9.75 21.0735 10.7595 22.083 12 22.083C13.2405 22.083 14.25 21.0735 14.25 19.833C14.25 18.5925 13.2405 17.583 12 17.583C10.7595 17.583 9.75 18.5925 9.75 19.833ZM9.75 4.83301C9.75 6.07351 10.7595 7.08301 12 7.08301C13.2405 7.08301 14.25 6.07351 14.25 4.83301C14.25 3.59251 13.2405 2.58301 12 2.58301C10.7595 2.58301 9.75 3.59251 9.75 4.83301Z"
                                  fill="#585858"
                                />
                              </svg>
                            </div>

                            {actionsOption && activeRow === row.id && (
                              <ul
                                ref={ref}
                                className="tw-absolute tw-right-[70px] tw-top-[40px] tw-z-50 tw-flex tw-flex-col tw-gap-2  tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-bg-white tw-p-3"
                              >
                                {actionsOption.map((action) => (
                                  <li
                                    key={action.label}
                                    onClick={() => handleActionClick(action, row)}
                                    className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                  >
                                    <div className="tw-flex tw-items-center tw-gap-2">
                                      <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                        {action.icon}
                                      </div>
                                      <div className="tw-whitespace-nowrap tw-text-sm">
                                        {action.label}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                        )}
                        {doubleActionOption && (
                          <td className="tw-relative">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveRow(row.id);
                              }}
                              className="tw-relative tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray hover:tw-cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M9.75 12.333C9.75 13.5735 10.7595 14.583 12 14.583C13.2405 14.583 14.25 13.5735 14.25 12.333C14.25 11.0925 13.2405 10.083 12 10.083C10.7595 10.083 9.75 11.0925 9.75 12.333ZM9.75 19.833C9.75 21.0735 10.7595 22.083 12 22.083C13.2405 22.083 14.25 21.0735 14.25 19.833C14.25 18.5925 13.2405 17.583 12 17.583C10.7595 17.583 9.75 18.5925 9.75 19.833ZM9.75 4.83301C9.75 6.07351 10.7595 7.08301 12 7.08301C13.2405 7.08301 14.25 6.07351 14.25 4.83301C14.25 3.59251 13.2405 2.58301 12 2.58301C10.7595 2.58301 9.75 3.59251 9.75 4.83301Z"
                                  fill="#585858"
                                />
                              </svg>
                            </div>

                            {doubleActionOption && activeRow === row.id && (
                              <ul
                                ref={ref}
                                className="tw-absolute tw-right-[70px] tw-top-[40px] tw-z-50 tw-flex tw-flex-col tw-gap-2  tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-bg-white tw-p-3"
                              >
                                {row.status === 'PAID'
                                  ? doubleActionOption.paid?.map((action) => (
                                      <li
                                        key={action.label}
                                        onClick={() => handleActionClick(action, row)}
                                        className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                      >
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                          <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                            {action.icon}
                                          </div>
                                          <div className="tw-whitespace-nowrap">
                                            {action.label}
                                          </div>
                                        </div>
                                      </li>
                                    ))
                                  : doubleActionOption.open?.map((action) => (
                                      <li
                                        key={action.label}
                                        onClick={() => handleActionClick(action, row)}
                                        className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                      >
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                          <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                            {action.icon}
                                          </div>
                                          <div className="tw-whitespace-nowrap">
                                            {action.label}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                {row.status === 'Block'
                                  ? doubleActionOption.block?.map((action) => (
                                      <li
                                        key={action.label}
                                        onClick={() => handleActionClick(action, row)}
                                        className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                      >
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                          <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                            {action.icon}
                                          </div>
                                          <div className="tw-whitespace-nowrap">
                                            {action.label}
                                          </div>
                                        </div>
                                      </li>
                                    ))
                                  : doubleActionOption.unBlock?.map((action) => (
                                      <li
                                        key={action.label}
                                        onClick={() => handleActionClick(action, row)}
                                        className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                      >
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                          <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                            {action.icon}
                                          </div>
                                          <div className="tw-whitespace-nowrap">
                                            {action.label}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                {row.isActive === true
                                  ? doubleActionOption.active?.map((action) => (
                                      <li
                                        key={action.label}
                                        onClick={() => handleActionClick(action, row)}
                                        className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                      >
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                          <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                            {action.icon}
                                          </div>
                                          <div className="tw-whitespace-nowrap">
                                            {action.label}
                                          </div>
                                        </div>
                                      </li>
                                    ))
                                  : row.isActive === false
                                  ? doubleActionOption.inActive?.map((action) => (
                                      <li
                                        key={action.label}
                                        onClick={() => handleActionClick(action, row)}
                                        className="tw-flex tw-flex-col tw-gap-2 hover:tw-cursor-pointer hover:tw-bg-[#1D4ED808]"
                                      >
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                          <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                            {action.icon}
                                          </div>
                                          <div className="tw-whitespace-nowrap">
                                            {action.label}
                                          </div>
                                        </div>
                                      </li>
                                    ))
                                  : null}
                              </ul>
                            )}
                          </td>
                        )}
                      </tr>
                      {activeRowCollaps === row.id && (
                        <tr className="tw-relative tw-z-10 tw-h-[184px] tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-white tw-px-6 tw-py-2">
                          {renderCustomContent(module)}
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </DragDropContext>
            {isLoading ? (
              <Loadar />
            ) : currentItems?.length === 0 ? (
              <div className="tw-relative  tw-h-[400px] tw-w-full  ">
                <div className="tw-absolute tw-top-[10%] tw-mt-3 tw-flex tw-w-full tw-flex-col  tw-items-center tw-justify-center tw-gap-[48px] tw-text-center">
                  <NoResultFound />
                  <p className=" tw-overflow-hidden tw-text-ellipsis tw-text-center tw-text-[22px] tw-font-medium tw-capitalize tw-not-italic tw-leading-[33px] tw-text-text-black">
                    NOT RESULT FOUND
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {paginationShow && (
        <div
          className={` ${
            isTabTable ? ' tw-px-5' : ''
          } tw-mt-4 tw-flex tw-w-full tw-items-center tw-justify-between `}
        >
          <div className="tw-flex tw-items-center tw-gap-4">
            <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-[#333]">
              Show
            </p>
            <select
              className="tw-h-[27px] tw-rounded tw-border tw-border-solid tw-border-[#E0E7ED] tw-px-1  tw-text-center tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black"
              value={tablePageSize}
              onChange={handleItemsPerPageChange}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>{' '}
            {getPageRangeText()}
          </div>
          <div className="tw-flex tw-items-center tw-gap-3">
            <button
              disabled={tablePageNum === 1}
              onClick={() => setTablePageNum(tablePageNum - 1)}
              className={`tw-flex tw-h-8 tw-w-[44px] tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-[3px] tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1 disabled:tw-cursor-not-allowed ${
                tablePageNum === 1 ? 'tw-opacity-50' : ''
              } `}
            >
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
            {renderPageButtons()}
            <button
              disabled={tablePageNum === totalPages}
              onClick={() => setTablePageNum(tablePageNum + 1)}
              className={`tw-flex tw-h-8 tw-w-[44px] tw-items-center tw-justify-center tw-gap-2.5 tw-rounded-[3px] tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1 disabled:tw-cursor-not-allowed ${
                tablePageNum === totalPages ? 'tw-opacity-50' : ''
              }`}
            >
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
      )}
      <Dialog
        className="!tw-rounded-[20px]"
        ref={ref}
        open={openFilterPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: filterModelWidth // Set your width here
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-min-w-[429px] tw-overflow-y-auto">
          <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-p-5">
            <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
              Filters
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setOpenFilterPopup(false)}
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
          <DialogContent>{renderFilterContent}</DialogContent>
        </div>
      </Dialog>
    </>
  );
}
CustomDataTabe.propTypes = {
  initialColumns: PropTypes.arrayOf,
  initialTableData: PropTypes.arrayOf,
  actionsOption: PropTypes.arrayOf,
  doubleActionOption: PropTypes.arrayOf,
  statusOptions: PropTypes.arrayOf,
  buttonLabel: PropTypes.string,
  module: PropTypes.string,
  filterModelWidth: PropTypes.string,
  CustomIconPopup: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmitFilterForm: PropTypes.func,
  register: PropTypes.func,
  reset: PropTypes.func,
  selectedPaymentAmount: PropTypes.string,
  setSearchText: PropTypes.string,
  setSelectedPaymentAmount: PropTypes.func,
  allData: PropTypes.func,
  selectedInstallments: PropTypes.string,
  setSelectedInstallments: PropTypes.func,
  selectedStatus: PropTypes.func,
  setSelectedStatus: PropTypes.func,
  action: PropTypes.func,
  handleStatusChange: PropTypes.func,
  statusAction: PropTypes.func,
  handleConvertClick: PropTypes.func,
  handleBookOffer: PropTypes.func,
  convertToOptions: PropTypes.arrayOf,
  customStatusOptions: PropTypes.arrayOf,
  isOfferDraft: PropTypes.bool,
  isDateShow: PropTypes.bool,
  isConvertShow: PropTypes.bool,
  isCollectiveShow: PropTypes.bool,
  isTabTable: PropTypes.bool,
  isLoading: PropTypes.bool,
  renderFilterContent: PropTypes.element.isRequired,
  isBookDraft: PropTypes.bool.isRequired,
  openFilterPopup: PropTypes.bool.isRequired,
  handleBook: PropTypes.func.isRequired,
  dataTotallRecords: PropTypes.string,
  tablePageNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setTablePageNum: PropTypes.func,
  tablePageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setTablePageSize: PropTypes.func,
  setOpenFilterPopup: PropTypes.func,
  simpleSearch: PropTypes.bool,
  hideColumn: PropTypes.bool,
  paginationShow: PropTypes.bool,
  tableHeaderShow: PropTypes.bool,
  checkBoxShow: PropTypes.bool
};
