/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ColorPicker from 'react-best-gradient-color-picker';
import { Dialog, DialogContent } from '@mui/material/node';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import useEditTemplate from './use-edit-template.hook';
import capitalizeFirstLetter from '@/common/utils/capitalize-first-letter';

export default function EditTemplate() {
  const {
    handleOnDragEnd,
    items,
    handleOnDragEndLogo,
    itemsLogo,
    activeDiv,
    handleDivClick,
    offerToOptions,
    handleOfferToOptionsChange,
    offerFromOptions,
    handleOfferFromOptionsChange,
    offerFooterOptions,
    tempSettingOpen,
    handleOfferFooterOptionsChange,
    setTempSettingOpen,
    offerLogoOptions,
    handleOfferLogoOptionsChange,
    columns,
    handleDragEnd,
    handleUpdate,
    editorRef,
    tableFooterOptions,
    handleColumnClick,
    defautlBodyText,
    handleBodyText,
    handleTableColumnOptionsChange,
    handleTableFooterOptionsChange,
    columnBackgroundColor,
    setColumnBackgroundColor,
    showModal,
    setShowModal,
    selectedColumn,
    handleColumnStyle,
    docType,
    isLoading,
    goBack,
    stripHTML
  } = useEditTemplate();

  return (
    <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[24px] tw-pb-20">
      {isLoading ? (
        <div className="tw-flex tw-justify-center tw-pt-3">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-gap-4 tw-pb-[16px] tw-pt-[24px]">
              <button className="hover:tw-cursor-pointer" type="button" onClick={goBack}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0008 19C14.8692 19.0008 14.7387 18.9756 14.6169 18.9258C14.495 18.876 14.3842 18.8027 14.2908 18.71L8.29079 12.71C8.10454 12.5227 8 12.2692 8 12.005C8 11.7408 8.10454 11.4874 8.29079 11.3L14.2908 5.30003C14.4821 5.1362 14.7282 5.05059 14.9798 5.06032C15.2315 5.07004 15.4703 5.17437 15.6484 5.35246C15.8265 5.53056 15.9308 5.7693 15.9405 6.02097C15.9502 6.27265 15.8646 6.51873 15.7008 6.71003L10.4108 12L15.7008 17.29C15.8412 17.4293 15.9372 17.6071 15.9766 17.8009C16.016 17.9947 15.997 18.1958 15.9221 18.3789C15.8471 18.5619 15.7196 18.7186 15.5556 18.8292C15.3917 18.9397 15.1986 18.9992 15.0008 19Z"
                    fill="#7E7D7D"
                  />
                  <rect
                    x="0.25"
                    y="0.25"
                    width="23.5"
                    height="23.5"
                    rx="3.75"
                    stroke="#7E7D7D"
                    stroke-width="0.5"
                  />
                </svg>
              </button>
              <h1 className="tw-text-[22px] tw-font-medium tw-capitalize tw-not-italic tw-leading-[27.5px] tw-text-text-dark-gray">
                Edit {capitalizeFirstLetter(docType)} Template
              </h1>
            </div>
          </div>
          <div className="tw-flex tw-gap-6">
            <div className="tw-w-full">
              <div className="tw-rounded-xl tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-px-5 tw-pb-[25.003px] tw-pt-5">
                <div className="tw-mb-3 tw-flex tw-justify-end">
                  {tempSettingOpen ? (
                    <div
                      className="hover:tw-cursor-pointer"
                      onClick={() => setTempSettingOpen(false)}
                    >
                      <svg
                        width="26"
                        height="28"
                        viewBox="0 0 26 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="26"
                          y="27.4141"
                          width="25.121"
                          height="27.414"
                          rx="12.5605"
                          transform="rotate(-180 26 27.4141)"
                          fill="#F2F6FD"
                        />
                        <path
                          d="M12 8.707C11.6095 8.31653 10.9765 8.31653 10.586 8.707C10.1955 9.09747 10.1955 9.73053 10.586 10.121L13.4649 12.9999C13.8554 13.3904 13.8554 14.0236 13.4649 14.4141L10.586 17.293C10.1955 17.6835 10.1955 18.3165 10.586 18.707C10.9765 19.0975 11.6095 19.0975 12 18.707L16.2929 14.4141C16.6834 14.0236 16.6834 13.3904 16.2929 12.9999L12 8.707Z"
                          fill="#262626"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="hover:tw-cursor-pointer"
                      onClick={() => setTempSettingOpen(true)}
                    >
                      <svg
                        width="26"
                        height="28"
                        viewBox="0 0 26 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.878906"
                          width="25.121"
                          height="27.414"
                          rx="12.5605"
                          fill="#F2F6FD"
                        />
                        <path
                          d="M14.8789 18.7071C15.2694 19.0975 15.9024 19.0975 16.2929 18.7071V18.7071C16.6834 18.3166 16.6834 17.6835 16.2929 17.2931L13.414 14.4142C13.0235 14.0236 13.0235 13.3905 13.414 13L16.2929 10.1211C16.6834 9.7306 16.6834 9.09753 16.2929 8.70707V8.70707C15.9024 8.3166 15.2694 8.3166 14.8789 8.70706L10.586 13C10.1955 13.3905 10.1955 14.0236 10.586 14.4142L14.8789 18.7071Z"
                          fill="#262626"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <DragDropContext onDragEnd={handleOnDragEndLogo}>
                  <Droppable droppableId="itemsLogo">
                    {(provided) => (
                      <div
                        className="tw-flex tw-justify-between"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {itemsLogo.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) =>
                              item.isImage ? (
                                offerLogoOptions.logo && (
                                  <div
                                    className="tw-flex tw-w-[185px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-px-[29px] tw-pb-[10px] tw-pt-[9px]"
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    onClick={() => handleDivClick('logo')}
                                  >
                                    <div className="tw-flex tw-flex-col tw-items-center tw-gap-[6px]">
                                      <img
                                        alt="null"
                                        src="/assets/images/logo.png"
                                        className="tw-h-[41px] tw-w-[127px]"
                                      />
                                    </div>
                                  </div>
                                )
                              ) : (
                                <div
                                  className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onClick={() => handleDivClick('logo')}
                                >
                                  Offer #<span className="tw-text-[#7E7D7D]">______</span>
                                </div>
                              )
                            }
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                {/* offer header */}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="items">
                    {(provided) => (
                      <div
                        className="tw-mt-6 tw-flex tw-items-center tw-justify-between"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {items.map((item, index) =>
                          item.isOfferTo ? (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  className="tw-flex tw-min-h-[222px] tw-flex-col  tw-gap-[16px]"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onClick={() => handleDivClick('offer to')}
                                >
                                  <h3 className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                    Offer To
                                  </h3>
                                  {offerToOptions.companyName && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Company Name :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerToOptions.contactPerson && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Contact Person :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerToOptions.customerNo && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Customer No :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerToOptions.deliveryDate && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Delivery Date :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerToOptions.city && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      City :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerToOptions.country && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Country :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ) : (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  className="tw-flex tw-min-h-[222px] tw-flex-col  tw-gap-[16px]"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onClick={() => handleDivClick('offer from')}
                                >
                                  <h3 className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                                    Offer From
                                  </h3>
                                  {offerFromOptions.companyName && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Company Name :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerFromOptions.contactPerson && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Company Email :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerFromOptions.customerNo && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Date :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerFromOptions.deliveryDate && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Company Address :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                  {offerFromOptions.city && (
                                    <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                                      Company Slogan :
                                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                                        ___________
                                      </span>
                                    </p>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <p
                  onClick={() => handleDivClick('body text')}
                  className=" tw-my-6 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black hover:tw-cursor-pointer"
                >
                  Body Text
                  <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                    ________________________________________________________
                  </span>
                </p>
                {/* end offer header */}
                <section
                  className="tw-bg-[#FFFFFF tw-w-full tw-gap-4 tw-rounded-[20px] tw-border tw-border-solid tw-border-[#E2E2E2] tw-p-6 hover:tw-cursor-pointer"
                  onClick={() => handleDivClick('table data')}
                >
                  <div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <table className="... tw-w-full tw-border-collapse tw-rounded-[20px_0px_0px_0px]">
                        <thead>
                          <tr>
                            <Droppable droppableId="columns" direction="horizontal">
                              {(provided) => (
                                <th
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className="tw-flex tw-justify-between"
                                >
                                  {columns?.map(
                                    (column, index) =>
                                      column.display && (
                                        <Draggable
                                          key={column.id}
                                          draggableId={column.id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <span
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref={provided.innerRef}
                                              className="rounded-t-lg tw-w-full tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#FAFAFA] tw-px-2 tw-py-4 tw-text-center tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black"
                                              onClick={(event) => {
                                                event.stopPropagation();
                                                handleColumnClick(column);
                                              }}
                                              style={{
                                                backgroundColor: column.backgroundColor
                                              }}
                                            >
                                              {stripHTML(column.name)}
                                            </span>
                                          )}
                                        </Draggable>
                                      )
                                  )}
                                  {provided.placeholder}
                                </th>
                              )}
                            </Droppable>
                          </tr>
                        </thead>
                        <tbody />
                      </table>
                    </DragDropContext>
                  </div>
                  <div
                    className=" tw-mt-[15px] tw-flex tw-flex-row tw-items-start tw-justify-between tw-rounded-[20px] tw-bg-[#fafafa] tw-px-6 tw-py-4"
                    onClick={() => handleDivClick('table footer')}
                  >
                    <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4">
                      {tableFooterOptions.netAmount && (
                        <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                          Net Amount
                        </div>
                      )}
                      {tableFooterOptions.plusVAT && (
                        <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                          Plus VAT
                        </div>
                      )}
                      {tableFooterOptions.invoiceAmount && (
                        <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                          Invoice Amount
                        </div>
                      )}
                    </div>
                    <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-text-right">
                      {tableFooterOptions.netAmount && (
                        <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                          ____
                        </div>
                      )}
                      {tableFooterOptions.plusVAT && (
                        <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                          ____
                        </div>
                      )}
                      {tableFooterOptions.invoiceAmount && (
                        <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                          ____
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                {/* end table */}
                <div
                  className="hover:tw-cursor-pointer"
                  onClick={() => handleDivClick('offer footer')}
                >
                  {offerFooterOptions.disclaimer && (
                    <p className="tw-mt-6 tw-text-[13px] tw-font-medium tw-not-italic tw-leading-[25px] tw-text-text-black">
                      Disclaimer
                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                        ______________________________________________________
                      </span>
                    </p>
                  )}
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <h3 className="tw-mt-4 tw-text-[15px] tw-font-medium tw-not-italic tw-leading-[25px] tw-text-text-black">
                      Terms & Condition
                    </h3>
                    {offerFooterOptions.paymentTerms && (
                      <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray">
                        Payment terms :
                        <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                          ___________________________________________________
                        </span>
                      </p>
                    )}
                    {offerFooterOptions.delivery && (
                      <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray">
                        Delivery :
                        <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                          ____________________________________________________
                        </span>
                      </p>
                    )}
                    {offerFooterOptions.warranty && (
                      <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray">
                        Warranty :
                        <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                          ____________________________________________________
                        </span>
                      </p>
                    )}
                  </div>
                  {offerFooterOptions.copyright && (
                    <p className="tw-mt-6 tw-flex tw-min-w-[218px] tw-gap-2 tw-text-[15px] tw-font-medium tw-not-italic tw-leading-[25px] tw-text-text-black">
                      Copyright
                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                        __________________________________________________________
                      </span>
                    </p>
                  )}
                </div>
                <div className="tw-mt-6 tw-flex tw-justify-between">
                  <CustomButton className="btn-cancel" text="Cancel" onClick={goBack} />
                  <CustomButton
                    className="btn-primary"
                    text="Save"
                    onClick={handleUpdate}
                  />
                </div>
              </div>
            </div>
            {tempSettingOpen && (
              <div className="side-sticky tw-top-3 tw-h-fit tw-max-h-[400px]">
                <div className="tw-h-[568px] tw-w-[358px] tw-rounded-xl tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-pl-4 tw-pr-2.5 tw-pt-4">
                  <h3 className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                    Template Settings
                  </h3>
                  {activeDiv === 'offer to' && (
                    <div className="tw-mt-6">
                      <div className="tw-flex tw-items-center tw-justify-between tw-px-0 tw-py-1">
                        <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Offer To
                        </p>
                      </div>
                      <div className="tw-mt-[21px] tw-flex tw-max-w-[200px] tw-flex-col tw-gap-[14px]">
                        <CustomSwitch
                          label="Company Name"
                          // register={register}
                          name="companyName"
                          type="switch"
                          checked={offerToOptions.companyName}
                          onChange={() => handleOfferToOptionsChange('companyName')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Contact Person"
                          // register={register}
                          name="contactPerson"
                          type="switch"
                          checked={offerToOptions.contactPerson}
                          onChange={() => handleOfferToOptionsChange('contactPerson')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Customer No"
                          // register={register}
                          name="customerNo"
                          type="switch"
                          checked={offerToOptions.customerNo}
                          onChange={() => handleOfferToOptionsChange('customerNo')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Delivery Date"
                          // register={register}
                          name="deliveryDate"
                          type="switch"
                          checked={offerToOptions.deliveryDate}
                          onChange={() => handleOfferToOptionsChange('deliveryDate')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="City"
                          // register={register}
                          name="city"
                          type="switch"
                          checked={offerToOptions.city}
                          onChange={() => handleOfferToOptionsChange('city')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Country"
                          // register={register}
                          name="country"
                          type="switch"
                          checked={offerToOptions.country}
                          onChange={() => handleOfferToOptionsChange('country')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                      </div>
                    </div>
                  )}
                  {activeDiv === 'offer from' && (
                    <div className="tw-mt-6">
                      <div className="tw-flex tw-items-center tw-justify-between tw-px-0 tw-py-1">
                        <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Offer From
                        </p>
                      </div>
                      <div className="tw-mt-[21px] tw-flex tw-max-w-[200px] tw-flex-col tw-gap-[14px]">
                        <CustomSwitch
                          label="Company Name"
                          // register={register}
                          name="companyName"
                          type="switch"
                          checked={offerFromOptions.companyName}
                          onChange={() => handleOfferFromOptionsChange('companyName')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Company Email"
                          // register={register}
                          name="contactPerson"
                          type="switch"
                          checked={offerFromOptions.contactPerson}
                          onChange={() => handleOfferFromOptionsChange('contactPerson')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Date"
                          // register={register}
                          name="customerNo"
                          type="switch"
                          checked={offerFromOptions.customerNo}
                          onChange={() => handleOfferFromOptionsChange('customerNo')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Company Address"
                          // register={register}
                          name="deliveryDate"
                          type="switch"
                          checked={offerFromOptions.deliveryDate}
                          onChange={() => handleOfferFromOptionsChange('deliveryDate')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Company Slogan"
                          // register={register}
                          name="city"
                          type="switch"
                          checked={offerFromOptions.city}
                          onChange={() => handleOfferFromOptionsChange('city')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                      </div>
                    </div>
                  )}
                  {activeDiv === 'body text' && (
                    <div className="tw-mt-6">
                      <div className="tw-mt-[21px] tw-flex tw-flex-col tw-gap-[14px]">
                        <Editor
                          // eslint-disable-next-line no-undef
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue={`${defautlBodyText}`}
                          value={`${defautlBodyText}`}
                          onEditorChange={handleBodyText}
                          init={{
                            height: 235,
                            menubar: false,
                            plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                              'undo redo | formatselect | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                            content_style:
                              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {activeDiv === 'table data' && (
                    <div className="tw-mt-6">
                      <div className="tw-flex tw-items-center tw-justify-between tw-px-0 tw-py-1">
                        <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Product Table
                        </p>
                      </div>
                      <div className="tw-mt-[21px] tw-flex tw-max-w-[200px] tw-flex-col tw-gap-[14px]">
                        {columns?.map((column) => (
                          <CustomSwitch
                            key={column.id}
                            label={stripHTML(column.name)}
                            name={column.name}
                            type="switch"
                            checked={column.display}
                            onChange={() => handleTableColumnOptionsChange(column.name)}
                            isRequired={false}
                            parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                          />
                        ))}
                      </div>
                      <div className="tw-mt-[21px] tw-flex tw-max-w-[200px] tw-flex-col tw-gap-[14px]">
                        <CustomSwitch
                          label="Net amount"
                          // register={register}
                          name="netAmount"
                          type="switch"
                          checked={tableFooterOptions.netAmount}
                          onChange={() => handleTableFooterOptionsChange('netAmount')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Plus VAT"
                          // register={register}
                          name="plusVAT"
                          type="switch"
                          checked={tableFooterOptions.plusVAT}
                          onChange={() => handleTableFooterOptionsChange('plusVAT')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Invoice Amount"
                          // register={register}
                          name="invoiceAmount"
                          type="switch"
                          checked={tableFooterOptions.invoiceAmount}
                          onChange={() => handleTableFooterOptionsChange('invoiceAmount')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                      </div>
                    </div>
                  )}
                  {activeDiv === 'table header' && (
                    <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-[24px]">
                      <div className="tw-flex tw-flex-col tw-gap-[12px]">
                        <div>
                          <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                            Background Color
                          </p>
                          <div
                            className="tw-rounded-3px tw-border-gray tw-flex tw-w-[120px] tw-cursor-pointer tw-items-center tw-rounded-[4px] tw-border tw-border-solid tw-p-1"
                            onClick={() => setShowModal(true)}
                          >
                            <div
                              className="tw-mr-2 tw-h-6 tw-w-6 tw-rounded tw-border tw-border-gray-300"
                              style={{ backgroundColor: columnBackgroundColor }}
                            />
                            <span>{columnBackgroundColor}</span>
                          </div>
                        </div>
                        <div>
                          <Dialog
                            className="scrol-bar"
                            open={showModal}
                            sx={{
                              '& .MuiDialog-container': {
                                '& .MuiPaper-root': {
                                  width: '355px',
                                  maxWidth: '355px',
                                  padding: '10px 0px'
                                }
                              },
                              zIndex: 13000
                            }}
                          >
                            <div className="my-scroll tw-max-h-full tw-w-[355px] tw-max-w-full tw-overflow-y-auto tw-px-6">
                              <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
                                <div
                                  className="hover:tw-cursor-pointer"
                                  onClick={() => setShowModal(false)}
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
                              <DialogContent>
                                <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                  <div>
                                    <ColorPicker
                                      value={columnBackgroundColor}
                                      onChange={setColumnBackgroundColor}
                                    />
                                  </div>
                                </div>
                              </DialogContent>
                            </div>
                          </Dialog>
                        </div>
                      </div>
                      <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={`${selectedColumn}`}
                        value={`${selectedColumn}`}
                        onEditorChange={handleColumnStyle}
                        init={{
                          height: 235,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar:
                            'undo redo | formatselect | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                    </div>
                  )}
                  {activeDiv === 'offer footer' && (
                    <div className="tw-mt-6">
                      <div className="tw-flex tw-items-center tw-justify-between tw-px-0 tw-py-1">
                        <p className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Offer Footer
                        </p>
                      </div>
                      <div className="tw-mt-[21px] tw-flex tw-max-w-[200px] tw-flex-col tw-gap-[14px]">
                        <CustomSwitch
                          label="Disclaimer"
                          // register={register}
                          name="disclaimer"
                          type="switch"
                          checked={offerFooterOptions.disclaimer}
                          onChange={() => handleOfferFooterOptionsChange('disclaimer')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Payment terms"
                          // register={register}
                          name="paymentTerms"
                          type="switch"
                          checked={offerFooterOptions.paymentTerms}
                          onChange={() => handleOfferFooterOptionsChange('paymentTerms')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Delivery"
                          // register={register}
                          name="delivery"
                          type="switch"
                          checked={offerFooterOptions.delivery}
                          onChange={() => handleOfferFooterOptionsChange('delivery')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Warranty"
                          // register={register}
                          name="warranty"
                          type="switch"
                          checked={offerFooterOptions.warranty}
                          onChange={() => handleOfferFooterOptionsChange('warranty')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                        <CustomSwitch
                          label="Copyright"
                          // register={register}
                          name="copyright"
                          type="switch"
                          checked={offerFooterOptions.copyright}
                          onChange={() => handleOfferFooterOptionsChange('copyright')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                      </div>
                    </div>
                  )}
                  {activeDiv === 'logo' && (
                    <div className="tw-mt-6">
                      <div className="tw-flex tw-items-center tw-justify-between tw-px-0 tw-py-1">
                        <p className="tw-pb-3 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Logo Display
                        </p>
                      </div>
                      <div className=" tw-w-[326px] tw-rounded-md tw-border tw-border-dashed tw-border-disabled-input tw-px-[42px] tw-py-[28px]">
                        <div className=" tw-flex tw-flex-col tw-items-center tw-gap-[6px]">
                          <img
                            alt="null"
                            src="/assets/images/logo.png"
                            className="tw-h-[78px] tw-w-[242px]"
                          />
                        </div>
                      </div>
                      <div className="tw-mt-[21px] tw-flex tw-max-w-[200px] tw-flex-col ">
                        <p className="tw-pb-3 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                          Logo Display
                        </p>
                        <CustomSwitch
                          label="show"
                          // register={register}
                          name="logo"
                          type="switch"
                          checked={offerLogoOptions.logo}
                          onChange={() => handleOfferLogoOptionsChange('logo')}
                          isRequired={false}
                          parentDivClassName="tw-flex tw-flex-wrap tw-items-center tw-justify-between"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
