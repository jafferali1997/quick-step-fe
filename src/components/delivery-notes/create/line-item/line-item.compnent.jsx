/* eslint-disable react/no-array-index-key */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material/node';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import Select from '@/common/components/select/select.component';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';

import CreateProduct from '@/common/components/create-product-modal/create-product.component';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import { LINE_ITEM_MAIN_HEADING } from '@/common/constants/document.constants';
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  plusVat
} from '@/common/utils/product-calculations/amount-calculations';
import useLineItem from './use-line-item.hook';
import DeleteConfirmationModal from '@/common/components/delete-confirmation-modal/delete-confirmation-modal';
import SimpleSelect from '@/common/components/dropdowns/simple-select/simple-select';
import removePercentageSign from '@/common/utils/product-calculations/remove-percentage-sign';

export default function LineItem({ handleTabClick, handleTabCompleted }) {
  const {
    setIsSubmit,
    columns,
    ids,
    isIdAdded,
    allCheckboxHandler,
    checkBoxHandler,
    openPopup,
    setOpenPopup,
    handleActionClick,
    handleInputChangee,
    selectedRow,
    ref,
    handleDuplicate,
    handleRemove,
    toggleSwitch,
    handleToggleSwitch,
    options,
    data,
    handleSelectedProduct,
    deliveryNotesProducts,
    handleSelectedDiscountGroup,
    handleLineItemSubmit,
    ppToggle,
    open,
    handleClick,
    handleClose,
    anchorEl,
    handleAddNewProduct,
    handleAddNewHeading,
    handleAddNewShow,
    showHeading,
    mergedData,
    handleAddNewHeadingInput,
    showHeadingInput,
    errorMessage,
    handleStyling,
    showStyle,
    handleShowStyling,
    style,
    headingIndex,
    setData,
    lineItemHeader,
    theDiscount,
    positionNumber,
    inputRef,
    handleEditableFeilds,
    selectedField,
    selectedItemRow,
    handleEditableFeildsInput,
    lineItemIndexing,
    defaultTaxRate,
    openPP,
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    handleRemoveProducts,
    unitsOptions,
    taxRateOptions,
    selectedTaxRate,
    handleTaxRate,
    handleUnits
  } = useLineItem({ handleTabClick, handleTabCompleted });

  return (
    <div className="personal-details-wrapper tw-overflow-hidden">
      {openDeleteConfirmation && (
        <DeleteConfirmationModal
          type="danger"
          closeText="Cancel"
          confirmText="Yes, Delete"
          confirmationRef={ref}
          openConfirmationPopup={openDeleteConfirmation}
          setOpenConfirmationPopup={setOpenDeleteConfirmation}
          mainText="Are you really want to delete?"
          mainStyling="tw-text-base tw-text-center tw-text-[#46474F] tw-font-medium tw-not-italic tw-leading-6"
          subText="Are you really want to delete this row. "
          subStyling="tw-mt-2 tw-text-text-medium-gray tw-text-center tw-text-xs tw-not-italic tw-font-normal tw-leading-[18px]"
          action={handleRemoveProducts}
        />
      )}
      <form id="lineItemSubmit" onSubmit={handleLineItemSubmit}>
        <div className="tw-flex tw-min-h-[351px]  tw-flex-col tw-items-start tw-gap-4 tw-rounded-[20px] tw-border tw-border-solid tw-border-[#E2E2E2] tw-py-4">
          <div className="content-header tw-flex tw-w-full tw-px-4 xs:tw-flex-col xs:tw-gap-2 lg:tw-flex lg:tw-flex-row lg:tw-items-center lg:tw-justify-between ">
            <h3 className="form-inner-heading">Product</h3>
            <div className="tw-flex tw-items-center tw-gap-4 xs:tw-mt-2 lg:tw-mt-[0px] lg:tw-w-[900px] lg:tw-justify-end">
              {ids.length > 0 ? (
                <div className="tw-w-[42px] tw-gap-2.5 tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-px-3.5 tw-py-3">
                  <img
                    src="/assets/icons/copy.svg"
                    className="tw-cursor-pointer"
                    onClick={handleRemove}
                    alt=""
                  />
                </div>
              ) : null}

              <div className="tw-mr-[17px] tw-flex tw-gap-4 tw-text-xs tw-font-medium tw-leading-[18px]">
                <label className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                  <div className="tw-flex tw-gap-1">
                    With VAT
                    <img src="/assets/icons/Frame.svg" alt="" id="second-app-title" />
                  </div>
                </label>
                <CustomSwitch
                  name="isStatus"
                  type="switch"
                  className="tw-h-4 tw-h-5 tw-w-4 tw-flex-col-reverse"
                  checked={toggleSwitch}
                  onChange={handleToggleSwitch}
                />
              </div>

              <ReactTooltip
                anchorId="second-app-title"
                place="top"
                style={{ backgroundColor: '#F8FAFC', color: '#334155' }}
                className="tw-flex tw-text-lg tw-font-semibold tw-leading-6"
                html={`
                <div class="tw-flex tw-justify-between tw-px-4 tw-py-3 tw-gap-7" >
                  <div class="tw-flex tw-gap-[10px]">
                    <div><img src="/assets/icons/info.svg" width="19.2px" height="19.2px" /></div>
                   <div class="tw-font-semibold tw-text-lg tw-leading-6"> Tax assessed on the value<br />added to products</div>
                  </div>
                  <div><img src="/assets/icons/cross.svg" width="8px" height="8px" /></div>
                </div>
              `}
              />

              <ReactTooltip
                anchorId="add-pp"
                place="top"
                style={{ backgroundColor: '#F8FAFC', zIndex: 11 }}
                html={`
                  <div><img src="/assets/images/add-pp.png" width="320px" height="86px" /></div>
              `}
              />

              <ReactTooltip
                anchorId="bulk"
                place="top"
                style={{ backgroundColor: '#F8FAFC', zIndex: 11 }}
                html={`
                  <div><img src="/assets/images/bulk.png" width="320px" height="230px" /></div>
              `}
              />
              <div className="tw-flex tw-h-10 tw-w-[191px] tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-4 tw-py-2">
                <p className=" tw-whitespace-nowrap tw-text-sm tw-font-medium tw-not-italic tw-leading-[21px] tw-text-text-light-gray">
                  Import Bulk Products{' '}
                </p>
                <svg
                  id="bulk"
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
                      <rect
                        width="11"
                        height="11"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div>
                <CustomButton
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  text="Create Product"
                  className="btn-primary tw-text-[14px]"
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Options
                </CustomButton>
                <div className="!tw-w-full">
                  <Menu
                    className="!tw-w-full"
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button'
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <div className="tw-w-[160px]">
                      <MenuItem onClick={handleAddNewProduct}>New Product</MenuItem>
                      <MenuItem onClick={handleAddNewShow}>New Heading</MenuItem>
                    </div>
                  </Menu>
                </div>
              </div>
              <CreateProduct
                ref={ref}
                module="DELIVERY_NOTES"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                setData={setData}
                data={data}
                defaultTaxRate={defaultTaxRate}
                lineItemHeader={lineItemHeader}
                theDiscount={theDiscount}
                positionNumber={positionNumber}
              />
            </div>
          </div>

          <div className=" tw-w-full tw-bg-[#FBFBFB]  tw-py-[10px]">
            <div className="tw-w-full tw-max-w-[326px] tw-bg-secondary-gray tw-px-4">
              {/* <OnScrollSelect /> */}
              <Select
                name="product"
                options={options}
                onChange={(e, { value }) => handleSelectedProduct({ e, value })}
                defaultValue="Select Product"
                className="tw-text-sm"
              />
            </div>
          </div>

          <div className="tw-w-full tw-overflow-x-auto  tw-px-4">
            <div className="tw-rounder-[10px] tw-border tw-border-solid tw-border-disabled-input">
              <table class="... tw-mt-[-2px] tw-w-full tw-min-w-[800px] tw-border-collapse tw-rounded-[20px_0px_0px_0px] ">
                <thead>
                  <tr>
                    <th className="... rounded-t-lg tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                      <input
                        id="test"
                        type="checkbox"
                        checked={data?.length > 0 && data?.length === ids.length}
                        onChange={allCheckboxHandler}
                        className={` tw-h-4 tw-w-4 tw-appearance-none tw-rounded-sm tw-border tw-border-solid tw-border-[#909090] tw-bg-center tw-bg-no-repeat ${
                          data.length === ids.length && data?.length > 0
                            ? 'tw-bg-primary checked:tw-bg-tick'
                            : null
                        }`}
                      />
                      <label htmlFor="test" />
                    </th>
                    {columns?.map((col, index) => (
                      <th
                        className="...  rounded-t-lg tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-black"
                        key={index}
                      >
                        <div className="tw-flex tw-items-center tw-gap-2 tw-whitespace-nowrap">
                          {col.headerName}
                          {col.field === 'pp' ? (
                            <img src="/assets/icons/Frame.svg" alt="" id="add-pp" />
                          ) : col.field === 'netPrice' || col.field === 'totalPrice' ? (
                            <svg
                              width="
                          10.33px"
                              height="11.19px"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3427 12.9998C12.3976 13.994 11.1875 14.5416 9.93536 14.5416C7.8831 14.5416 6.10613 13.1004 5.26983 11.0171H10.9704C11.4647 11.0171 11.8654 10.6163 11.8654 10.122C11.8654 9.62769 11.4647 9.22691 10.9704 9.22691H4.81496C4.77896 8.92989 4.76079 8.63098 4.76054 8.33179C4.76054 7.98891 4.78468 7.6528 4.82972 7.32479H10.9704C11.4647 7.32479 11.8654 6.92402 11.8654 6.42971C11.8654 5.93539 11.4647 5.53458 10.9704 5.53458H5.31745C6.17168 3.5123 7.92026 2.12202 9.93536 2.12202C11.1875 2.12202 12.3976 2.66964 13.3427 3.66367C13.6829 4.02174 14.2492 4.03645 14.608 3.6959C14.9664 3.35521 14.9806 2.78866 14.6404 2.4304C13.3541 1.07723 11.6832 0.332031 9.93559 0.332031C6.95152 0.332031 4.40073 2.49931 3.41089 5.53484H1.01227C0.517961 5.53484 0.117188 5.93562 0.117188 6.42993C0.117188 6.92424 0.517961 7.32501 1.01227 7.32501H3.02734C2.99107 7.65532 2.97033 7.99076 2.97033 8.33201C2.97033 8.63488 2.98616 8.93299 3.01511 9.22713H1.01227C0.517961 9.22713 0.117188 9.62791 0.117188 10.1222C0.117188 10.6165 0.517961 11.0173 1.01227 11.0173H3.37536C4.33821 14.1115 6.91477 16.332 9.93536 16.332C11.6832 16.332 13.3536 15.5866 14.6399 14.2337C14.9803 13.8753 14.9664 13.3088 14.6078 12.9682C14.2496 12.6275 13.6829 12.6417 13.3427 12.9998Z"
                                fill="#7E7D7D"
                              />
                            </svg>
                          ) : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                {Object?.keys(mergedData)?.map((key, ind) => {
                  return mergedData[key]?.product?.map((row, pIndex) => {
                    const uniqueIndex = Number(`${ind}${pIndex}`);
                    const data_id = isIdAdded(uniqueIndex);
                    return (
                      <>
                        {row.productName !== LINE_ITEM_MAIN_HEADING && (
                          <tr key={uniqueIndex}>
                            <td className="... tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start">
                              <input
                                id="test"
                                type="checkbox"
                                checked={data_id}
                                value={uniqueIndex}
                                onChange={(e) => checkBoxHandler(e, row)}
                                className={` tw-h-4 tw-w-4 tw-appearance-none tw-rounded-sm tw-border tw-border-solid tw-border-[1px_solid_lightgray] tw-bg-center tw-bg-no-repeat ${
                                  data.length > 0 && ids.includes(uniqueIndex)
                                    ? 'tw-bg-primary checked:tw-bg-tick'
                                    : null
                                }`}
                              />
                              <label htmlFor="test" />
                            </td>
                            {columns?.map((column, index) => {
                              return (
                                <td
                                  className="tw-leading-[18px tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal"
                                  key={index}
                                  onClick={() =>
                                    column.edit &&
                                    handleEditableFeilds(row, column.field, uniqueIndex)
                                  }
                                >
                                  {row[column.field] === 'pp-icon' ? (
                                    <div className="tw-flex tw-items-center tw-justify-center tw-text-start hover:tw-cursor-pointer">
                                      <img
                                        src={
                                          ppToggle &&
                                          selectedRow &&
                                          selectedRow.id === row.id &&
                                          openPP === uniqueIndex
                                            ? '/assets/icons/add-pp.blue.svg'
                                            : '/assets/icons/add-pp-gray.svg'
                                        }
                                        alt=""
                                        width="16px"
                                        height="16px"
                                        onClick={() =>
                                          handleActionClick(row, uniqueIndex)
                                        }
                                      />
                                    </div>
                                  ) : row[column.field] === 'action' ? (
                                    <div className="tw-flex tw-gap-[27px] tw-text-start">
                                      <img
                                        onClick={() => handleDuplicate(row)}
                                        src="/assets/icons/delete.red.svg"
                                        alt=""
                                        width="13.47px"
                                        height="16px"
                                        className="hover:tw-cursor-pointer"
                                      />
                                      <img
                                        onClick={() => handleRemove(row, ind)}
                                        src="/assets/icons/copy.svg"
                                        alt=""
                                        width="14.06px"
                                        height="16px"
                                        className="hover:tw-cursor-pointer"
                                      />
                                    </div>
                                  ) : row[column.field] === 'taxRateDropdown' ? (
                                    <SimpleSelect
                                      isSearchable
                                      placeHolder={`${
                                        row.taxRate ||
                                        (selectedTaxRate &&
                                          removePercentageSign(selectedTaxRate.label)) ||
                                        (defaultTaxRate && defaultTaxRate.taxRate)
                                      } %`}
                                      options={taxRateOptions}
                                      onChange={(value) =>
                                        handleTaxRate({ row, value, uniqueIndex })
                                      }
                                    />
                                  ) : row[column.field] === 'unitDropdown' ? (
                                    <SimpleSelect
                                      isSearchable
                                      placeHolder={row.unit || 'Select'}
                                      options={unitsOptions}
                                      onChange={(value) =>
                                        handleUnits({ row, value, uniqueIndex })
                                      }
                                    />
                                  ) : row[column.field] === 'discount' ? (
                                    <SimpleSelect
                                      isSearchable
                                      placeHolder="Select"
                                      options={row?.discountGroups?.map((group) => ({
                                        value:
                                          (group.ProductDiscountGroup &&
                                            group.ProductDiscountGroup.discount) ||
                                          (group.ProductDiscountGroup &&
                                            group.ProductDiscountGroup.disco) ||
                                          (group.ProductDiscountGroup &&
                                            group.ProductDiscountGroup.dis) ||
                                          group.ProductDiscount,
                                        label:
                                          (group.ProductDiscountGroup &&
                                            group.ProductDiscountGroup.discount) ||
                                          (group.ProductDiscountGroup &&
                                            group.ProductDiscountGroup.disco) ||
                                          (group.ProductDiscountGroup &&
                                            group.ProductDiscountGroup.dis) ||
                                          group.ProductDiscount
                                      }))}
                                      defaultValue={
                                        theDiscount ||
                                        (row?.discountGroups &&
                                          row?.discountGroups[0]?.ProductDiscountGroup
                                            ?.discount) ||
                                        (row?.discountGroups &&
                                          row?.discountGroups[0]?.ProductDiscountGroup
                                            ?.disco) ||
                                        (row?.discountGroups &&
                                          row?.discountGroups[0]?.ProductDiscountGroup
                                            ?.dis) ||
                                        (row?.discountGroups &&
                                          row?.discountGroups[0]?.ProductDiscountGro) ||
                                        '0'
                                      }
                                      onChange={(e, value) =>
                                        handleSelectedDiscountGroup(e, value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); // Prevent form submission
                                        }
                                      }}
                                    />
                                  ) : row.id ? (
                                    <div className="tw-inline-block tw-max-h-[59px] tw-max-w-[100px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap">
                                      {selectedItemRow &&
                                      selectedItemRow.id === row.id &&
                                      selectedField === column.field &&
                                      lineItemIndexing === uniqueIndex ? (
                                        <CustomInput
                                          type={column.type}
                                          name={column.field}
                                          defaultValue={row[column.field]}
                                          placeholder={`${column.headerName}`}
                                          onKeyDown={(event) =>
                                            handleEditableFeildsInput({
                                              event,
                                              row,
                                              uniqueIndex
                                            })
                                          }
                                        />
                                      ) : (
                                        row[column.field]
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className={`tw-relative tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-leading-[17.5px] ${
                                        headingIndex === uniqueIndex ? style : null
                                      }`}
                                      onClick={() => handleShowStyling(uniqueIndex)}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: row[column.field]
                                        }}
                                      />
                                      {row[column.field] &&
                                      showStyle &&
                                      headingIndex === uniqueIndex &&
                                      row.productName ? (
                                        <div className="tw-absolute tw-bottom-[23px] tw-flex  tw-justify-between tw-gap-3 tw-rounded-[10px] tw-bg-white tw-px-4 tw-py-1 tw-text-black">
                                          <div
                                            className="tw-rounded-[10px] tw-px-2 tw-font-[bold] hover:tw-bg-[#E7EAEE]"
                                            onClick={() => handleStyling('b', row)}
                                          >
                                            B
                                          </div>
                                          <div
                                            className="tw-rounded-[10px] tw-px-2 tw-italic hover:tw-bg-[#E7EAEE]"
                                            onClick={() => handleStyling('i', row)}
                                          >
                                            i
                                          </div>
                                          <div
                                            className="tw-rounded-[10px] tw-px-2 tw-underline hover:tw-bg-[#E7EAEE]"
                                            onClick={() => handleStyling('u', row)}
                                          >
                                            U
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        )}
                        {selectedRow &&
                          selectedRow.id === row.id &&
                          openPP === uniqueIndex && (
                            <tr className="tw-h-[88px] tw-w-full  tw-bg-[#FBFBFB]">
                              <td colSpan={columns.length + 1}>
                                <div className="tw-grid tw-grid-cols-[316px_1fr] tw-items-center tw-gap-[24px] ">
                                  <div className="tw-flex tw-flex-col tw-border-r tw-border-solid tw-border-r-[#E7EAEE] tw-px-2 tw-py-4">
                                    <CustomInput
                                      id="name-input"
                                      type="text"
                                      name="purchasingPrice"
                                      placeholder="Enter Purchasing Price"
                                      value={row.notes && row.notes.purchasingPrice}
                                      onChange={(e) =>
                                        handleInputChangee(e, row.productIndex)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); // Prevent form submission
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="tw-px-2 tw-py-4">
                                    <CustomInput
                                      id="name-input"
                                      type="text"
                                      name="notes"
                                      placeholder="Enter Notes"
                                      value={row.notes && row.notes.notes}
                                      onChange={(e) =>
                                        handleInputChangee(e, row.productIndex)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); // Prevent form submission
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                      </>
                    );
                  });
                })}
              </table>

              {showHeading && (
                <div className="tw-mt-2 tw-px-2">
                  <div
                    onClick={handleAddNewHeading}
                    className=" tw-w-full tw-rounded-[6px] tw-border tw-border-solid tw-border-disabled-input tw-bg-[rgba(126,125,125,0.06)] tw-px-4 tw-py-2 tw-text-sm tw-font-normal tw-leading-[17.5px] tw-text-text-light-gray hover:tw-cursor-pointer"
                  >
                    Add Heading
                  </div>
                </div>
              )}

              {showHeadingInput && (
                <div className="tw-mt-2 tw-px-2 ">
                  <CustomInput
                    customRef={inputRef}
                    type="text"
                    name={style}
                    placeholder="Add Heading"
                    onKeyDown={(e) => handleAddNewHeadingInput(e, headingIndex)}
                    className="tw-rounded-[6px] tw-border tw-border-solid tw-border-disabled-input tw-bg-[rgba(126,125,125,0.06)] tw-px-4 tw-py-2 tw-text-sm tw-font-normal tw-leading-[17.5px]  hover:tw-cursor-pointer "
                  />
                </div>
              )}

              {errorMessage && (
                <div className="tw-mt-2 tw-px-2">
                  <div className="tw-w-full tw-rounded-[6px] tw-text-sm tw-font-normal tw-leading-[17.5px] tw-text-[red] ">
                    {errorMessage}
                  </div>
                </div>
              )}

              <div className="tw-mt-4 tw-flex tw-flex-col tw-justify-between tw-gap-3 tw-rounded-[0_0_20px_20px] tw-bg-[#FBFBFB] tw-px-5 tw-py-4">
                <div className="tw-flex tw-justify-between">
                  <div className="tw-text-sm tw-font-normal tw-leading-[17.5px]">
                    Net Amount
                  </div>
                  <div className="tw-text-start tw-text-sm tw-font-normal tw-leading-[17.5px]">
                    € {lineItemNetAmount(data)}
                  </div>
                </div>
                {toggleSwitch && (
                  <div className="tw-flex tw-justify-between">
                    <div className="tw-text-sm tw-font-normal tw-leading-[17.5px]">
                      Plus VAT
                    </div>
                    <div className="tw-text-start tw-text-sm tw-font-normal tw-leading-[17.5px]">
                      € {plusVat(data)}
                    </div>
                  </div>
                )}
                <div className="tw-flex tw-justify-between">
                  <div className="tw-text-sm tw-font-normal tw-leading-[17.5px]">
                    Invoice Amount
                  </div>
                  <div className="tw-text-start tw-text-sm tw-font-normal tw-leading-[17.5px]">
                    €{' '}
                    {toggleSwitch
                      ? invoiceAmountWithVAT(data)
                      : invoiceAmountWithOutVAT(data)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StepperFooter
          back={DOCUMENT_TABS.CUSTOMER_DETAILS}
          handleTabClick={handleTabClick}
          setIsSubmit={setIsSubmit}
          disabled={deliveryNotesProducts && deliveryNotesProducts.length === 0}
        />
      </form>
    </div>
  );
}
LineItem.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
