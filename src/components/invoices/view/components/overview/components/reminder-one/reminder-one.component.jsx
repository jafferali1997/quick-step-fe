import { Dialog, DialogContent } from '@mui/material/node';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import PlusIcon from '@/common/icons/plus.icon';
import capitalizeFirstLetter from '@/common/utils/capitalize-first-letter';
import useReminderOne from './use-reminder-one.hook';
import FieldError from '@/common/components/field-error/field-error.component';

const colors = ['red', 'blue', 'green'];

export default function InvoiceReminder({
  invoice,
  reminderLevel,
  createReminder,
  levelOfReminder,
  isLoadingForReminder
}) {
  const {
    email,
    taggedEmails,
    handleInputChange,
    handleInputKeyDown,
    removeEmail,
    editorRef,
    openCreateOneReminderPopup,
    setOpenCreateOneReminderPopup,
    selectedDaysValue,
    selectedDateValue,
    handleSelectDaysChange,
    handleSelectDateChange,
    handleFeeChange,
    isChecked,
    feeValue,
    subject,
    handleFeeValueChange,
    handleSubjectChange,
    handleEditorChange,
    handleSetReminder,
    message,
    open,
    MyOptions,
    handleClick,
    handleClose,
    editInvoiceReminder,
    setEditInvoiceReminder,
    errors,
    register,
    handleSubmit,
    inputFordays,
    invalidEmail,
    clearAllStates
  } = useReminderOne({ invoice, reminderLevel, createReminder });

  return (
    <div className="tw-mt-6 tw-min-h-[388px] tw-w-[568px] tw-rounded-[10px] tw-bg-[#fbfbfb]">
      <ReactTooltip
        anchorId="date-info"
        place="top"
        style={{ backgroundColor: '#fbfbfb', zIndex: 99 }}
        html={`
                  <div><img src="/assets/icons/reminder-info.svg" width="279px" height="50px"/></div>
              `}
      />
      {isLoadingForReminder ? (
        <div className="tw-flex tw-min-h-[388px] tw-items-center tw-justify-center tw-bg-white">
          <div class="circle-animation">
            <div class="circle" />
            <img src="/assets/images/loadar-logo.svg" alt="logo" />
          </div>
        </div>
      ) : levelOfReminder && levelOfReminder?.length !== 0 && !editInvoiceReminder ? (
        levelOfReminder?.map((reminder) => {
          return (
            <>
              <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-py-[18.5px]">
                <h3 className="tw-text-sm tw-font-bold tw-not-italic tw-leading-[21px] tw-text-text-black">
                  Reminder {reminderLevel}
                </h3>
                <div className="tw-flex tw-gap-4 ">
                  <div className="tw-flex tw-items-center tw-gap-2.5 tw-rounded-[5px] tw-bg-[#f2f2f2] tw-px-3 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray hover:tw-cursor-pointer">
                    {capitalizeFirstLetter(reminder.status)}
                  </div>
                  {capitalizeFirstLetter(reminder.status) !== 'Sent' && (
                    <div className="tw-relative" onClick={handleClick}>
                      <img
                        src="/assets/icons/more_vert.svg"
                        alt="more"
                        className="tw-h-5 tw-w-5 hover:tw-cursor-pointer"
                      />
                      {open && (
                        <div className="tw-absolute tw-right-1.5 tw-top-[29px] tw-flex tw-w-[97px] tw-flex-col tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-[#FFF] tw-p-2">
                          {MyOptions.map((option) => (
                            <div key={option} onClick={handleClose}>
                              <div
                                className="tw-flex tw-items-center tw-gap-2 hover:tw-cursor-pointer"
                                onClick={() => option.onclick(reminder)}
                              >
                                <img
                                  src={option.icon}
                                  alt="action"
                                  className="tw-h-4 tw-w-4"
                                />
                                <div>{option.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="tw-flex tw-gap-5">
                <div className="tw-flex tw-flex-col tw-gap-4 tw-px-4">
                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Email Address
                  </div>
                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    No of days
                  </div>
                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Reminder Date
                  </div>
                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Reminder fee
                  </div>
                  <div className="tw-flex tw-gap-1">
                    <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      Created Date
                    </div>
                    <img
                      src="/assets/icons/info.svg"
                      alt="info"
                      id="date-info"
                      className="tw-w-[9px tw-w-[9px]"
                    />
                  </div>
                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Subject
                  </div>
                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Message
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-4 tw-px-4">
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    {reminder.email}
                  </div>
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    {reminder.noOfDays}
                  </div>
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    {capitalizeFirstLetter(
                      reminder.triggerCondition?.replaceAll('_', ' ')
                    )}
                  </div>
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    € {reminder.fee}
                  </div>
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    {reminder.updatedAt.split('T')[0] || reminder.createdAt.split('T')[0]}
                  </div>
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    {reminder.subject}
                  </div>
                  <div
                    className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray"
                    dangerouslySetInnerHTML={{
                      __html: reminder.body
                    }}
                  />
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div>
          <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-py-[18.5px]">
            <h3 className="tw-text-sm tw-font-bold tw-not-italic tw-leading-[21px] tw-text-text-black">
              Reminder {reminderLevel}
            </h3>
          </div>
          <div className="tw-flex tw-items-center tw-justify-center">
            <div className="tw-inline-flex tw-flex-col tw-items-center tw-gap-4">
              {' '}
              <div>
                <svg
                  width="186"
                  height="186"
                  viewBox="0 0 186 186"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="93" cy="93" r="93" fill="#1D4ED8" fill-opacity="0.05" />
                  <g clipPath="url(#clip0_11055_227479)">
                    <path
                      d="M93.0023 139.5C98.5772 139.5 103.378 136.133 105.484 131.326H80.5201C82.6266 136.133 87.4276 139.5 93.0023 139.5ZM121.157 91.5218V85.5527C121.157 72.8702 112.726 62.1209 101.176 58.61V54.6738C101.176 50.1668 97.5093 46.5 93.0023 46.5C88.4952 46.5 84.8285 50.1668 84.8285 54.6738V58.61C73.2779 62.1209 64.848 72.87 64.848 85.5527V91.5218C64.848 102.662 60.6016 113.226 52.8911 121.267C52.5214 121.652 52.2732 122.138 52.1772 122.663C52.0812 123.188 52.1417 123.73 52.3513 124.221C52.5608 124.713 52.9101 125.132 53.3558 125.426C53.8014 125.72 54.3237 125.877 54.8578 125.877H131.147C131.681 125.877 132.203 125.72 132.649 125.426C133.094 125.131 133.444 124.713 133.653 124.221C133.863 123.73 133.923 123.188 133.827 122.663C133.731 122.138 133.483 121.652 133.113 121.267C125.403 113.226 121.157 102.662 121.157 91.5218ZM95.7269 57.5307C94.8301 57.4442 93.9214 57.3984 93.0023 57.3984C92.0832 57.3984 91.1744 57.4442 90.2777 57.5307V54.6738C90.2777 53.1715 91.4999 51.9492 93.0023 51.9492C94.5046 51.9492 95.7269 53.1715 95.7269 54.6738V57.5307ZM128.422 85.5527C128.422 87.0574 129.642 88.2773 131.147 88.2773C132.652 88.2773 133.871 87.0574 133.871 85.5527C133.871 74.6361 129.62 64.3729 121.901 56.6537C120.837 55.5898 119.112 55.5897 118.048 56.6537C116.984 57.7178 116.984 59.4428 118.048 60.5069C124.738 67.1969 128.422 76.0916 128.422 85.5527ZM54.8578 88.2773C56.3625 88.2773 57.5824 87.0574 57.5824 85.5527C57.5824 76.0918 61.2668 67.197 67.9566 60.507C69.0206 59.443 69.0206 57.7179 67.9566 56.6539C66.8927 55.5898 65.1675 55.5898 64.1034 56.6539C56.3843 64.3731 52.1331 74.6361 52.1331 85.5527C52.1331 87.0574 53.353 88.2773 54.8578 88.2773Z"
                      fill="#1D4ED8"
                      fill-opacity="0.45"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_11055_227479">
                      <rect
                        width="93"
                        height="93"
                        fill="white"
                        transform="translate(46.5 46.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="tw-text-center tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                No reminder created yet for this invoice.
              </p>
              <CustomButton
                className="btn-primary"
                text="Create Reminder"
                startIcon={<PlusIcon />}
                onClick={() => setOpenCreateOneReminderPopup(true)}
              />
            </div>
          </div>
          <Dialog
            className="!tw-rounded-[20px]"
            // ref={ref}
            open={openCreateOneReminderPopup}
            sx={{
              '& .MuiDialog-container': {
                '& .MuiPaper-root': {
                  width: '100%',
                  maxWidth: '600px'
                }
              },
              zIndex: 13000
            }}
          >
            <div className="my-scroll tw-max-h-full tw-w-full tw-max-w-full tw-overflow-y-auto ">
              <div className="tw-flex tw-h-14 tw-items-center tw-justify-between tw-bg-[#e3ecf4] tw-p-5">
                <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
                  {editInvoiceReminder ? 'Update Reminder' : 'Create Reminder'}
                </div>
                <div className="hover:tw-cursor-pointer" onClick={clearAllStates}>
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
              <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
                <div>
                  <div className=" tw-w-full tw-border-b tw-border-solid tw-border-b-disabled-input tw-bg-[#fefefe] tw-px-[15px] tw-pb-[5px] tw-pt-[5px]">
                    <div className="tw-flex tw-items-center tw-gap-[22px]">
                      <div className="tw-w-full  tw-max-w-[100px]">
                        <h4 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                          Recipients
                        </h4>
                      </div>
                      <div>
                        <div
                          className={`tw-flex tw-w-full tw-flex-wrap tw-gap-2 ${
                            taggedEmails && taggedEmails.length < 1
                              ? null
                              : 'tw-pb-[5px] tw-pt-[5px]'
                          }  `}
                        >
                          {taggedEmails.map((taggedEmail, index) => (
                            <div className="tag tw-flex tw-w-fit tw-items-center tw-gap-2.5 tw-rounded-[26px] tw-border tw-border-solid tw-border-disabled-input tw-px-2 tw-py-1">
                              <div
                                className="tw-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-[50%] tw-bg-[#2563EB]"
                                style={{ background: `${colors[index % colors.length]}` }}
                              >
                                <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[100%] tw-text-white">
                                  {taggedEmail.charAt(0)}
                                </p>
                              </div>
                              <p className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-medium-gray">
                                {taggedEmail}
                              </p>
                              <div onClick={() => removeEmail(index)}>
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_10275_252432)">
                                    <path
                                      d="M4.73291 4.0078L7.848 0.892657C8.05071 0.690027 8.05071 0.362392 7.848 0.159785C7.64537 -0.0428452 7.31774 -0.0428452 7.11513 0.159785L3.99996 3.2749L0.884918 0.159785C0.68219 -0.0428452 0.354677 -0.0428452 0.152046 0.159785C-0.050682 0.362416 -0.050682 0.690027 0.152046 0.892657L3.26707 4.0078L0.15207 7.12292C-0.0506577 7.32555 -0.0506577 7.65318 0.15207 7.85579C0.200135 7.90399 0.257251 7.94222 0.320136 7.96828C0.383021 7.99434 0.450435 8.00772 0.518506 8.00764C0.651164 8.00764 0.78387 7.95686 0.884942 7.85579L3.99996 4.74067L7.11513 7.85579C7.1632 7.90399 7.22032 7.94221 7.2832 7.96827C7.34609 7.99433 7.4135 8.00771 7.48157 8.00764C7.61422 8.00764 7.74693 7.95686 7.848 7.85579C8.05071 7.65316 8.05071 7.32555 7.848 7.12292L4.73291 4.0078Z"
                                      fill="#585858"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_10275_252432">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                        {taggedEmails && taggedEmails.length < 1 && (
                          <CustomInput
                            className="tw-border-none focus:tw-border-b focus:tw-border-solid"
                            placeholder="Enter Email of Recipient"
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            isRequired={true}
                            value={email}
                          />
                        )}
                      </div>
                      {invalidEmail ? (
                        <FieldError
                          className="tw-mt-1 tw-normal-case"
                          error="Invalid email"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className={`tw-w-full tw-border-b tw-border-solid tw-border-b-disabled-input tw-bg-[#fefefe] tw-px-[15px] ${
                      inputFordays
                        ? 'tw-pb-[5px] tw-pt-[5px] '
                        : 'tw-pb-[13px] tw-pt-[13px]'
                    } `}
                  >
                    <div className="tw-flex tw-items-center tw-gap-[22px]">
                      <div className="tw-w-full  tw-max-w-[100px]">
                        <h4 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                          No of days
                        </h4>
                      </div>
                      {inputFordays ? (
                        <CustomInput
                          type="number"
                          className="tw-appearance-none tw-border-none focus:tw-border-b focus:tw-border-solid"
                          placeholder="Enter No of Days"
                          name="days"
                          onChange={handleSelectDaysChange} // Attach the onChange event handler
                          value={selectedDaysValue}
                        />
                      ) : (
                        <div className="tw-flex tw-w-full tw-appearance-none ">
                          <select
                            name="days"
                            id="days"
                            style={{ outline: 'none' }}
                            onChange={handleSelectDaysChange} // Attach the onChange event handler
                            value={selectedDaysValue} // Set the selected value from state
                            className="tw-flex tw-w-[440px] tw-appearance-none tw-flex-col tw-items-start tw-gap-px tw-px-[13px] tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray "
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="new">Add New</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" tw-w-full tw-border-b tw-border-solid tw-border-b-disabled-input tw-bg-[#fefefe] tw-px-[15px] tw-pb-[13px] tw-pt-[13px]">
                    <div className="tw-flex tw-items-center tw-gap-[22px]">
                      <div className="tw-w-full  tw-max-w-[100px]">
                        <h4 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                          Reminder Date
                        </h4>
                      </div>
                      <div className="tw-w-full">
                        <select
                          name="days"
                          id="days"
                          style={{ outline: 'none' }}
                          onChange={handleSelectDateChange} // Attach the onChange event handler
                          value={selectedDateValue} // Set the selected value from state
                          className="tw-flex tw-w-[440px] tw-appearance-none tw-flex-col tw-items-start tw-gap-px tw-px-[13px] tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray "
                        >
                          <option value="BEFORE_DUE_DATE">Before Due Date</option>
                          <option value="AFTER_DUE_DATE">After Due Date</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="tw-w-full  tw-border-b tw-border-solid tw-border-b-disabled-input tw-bg-[#fefefe] tw-px-[15px] tw-pb-[13px] tw-pt-[13px]">
                    <div className="tw-flex tw-gap-[22px]">
                      <div className="tw-w-full  tw-max-w-[100px]">
                        <h4 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                          Reminder Fee
                        </h4>
                      </div>
                      <div className="tw-flex tw-flex-col tw-gap-[8.89px] tw-pl-3">
                        <div className="tw-flex tw-gap-2">
                          <div className="tw-flex tw-gap-[6.5px]">
                            <input
                              type="checkbox"
                              onChange={handleFeeChange}
                              checked={isChecked}
                              className="unchecked:tw-bg-[url('/assets/images/unchecked.svg')] tw-h-4 tw-w-4 tw-appearance-none tw-rounded-sm tw-border tw-border-gray-300 tw-bg-cover checked:tw-bg-[url('/assets/images/checked.svg')]"
                            />
                            <label
                              htmlFor="terms"
                              id="terms"
                              className="tw-fon tw-cursor-pointer tw-text-[12px]
             tw-font-normal tw-not-italic tw-leading-[18px]"
                            >
                              Include reminder fee
                            </label>
                          </div>
                        </div>
                        {isChecked && (
                          <div className="tw-w-full tw-max-w-[257.75px] ">
                            <CustomInput
                              defaultValue=""
                              type="text"
                              value={feeValue}
                              onChange={handleFeeValueChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" tw-w-full tw-border-b tw-border-solid tw-border-b-disabled-input tw-bg-[#fefefe] tw-px-[15px] tw-pb-[5px] tw-pt-[5px]">
                    <div className="tw-flex tw-items-center tw-gap-[22px]">
                      <div className="tw-w-full  tw-max-w-[100px]">
                        <h4 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                          Subject
                        </h4>
                      </div>
                      <div className="tw-w-full ">
                        <CustomInput
                          className="tw-border-none focus:tw-border-b focus:tw-border-solid"
                          placeholder="Enter Subject"
                          name="subject"
                          value={subject}
                          register={register}
                          errors={errors}
                          isRequired={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" tw-w-full  tw-bg-[#fefefe] tw-pb-[14px] tw-pr-[15px] tw-pt-[13px]">
                    <div className="tw-flex tw-items-center tw-gap-[22px]">
                      <div className="tw-w-full ">
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          value={message}
                          onEditorChange={handleEditorChange}
                          init={{
                            height: 235,
                            menubar: false,
                            toolbar:
                              'undo redo | formatselect | ' +
                              'bold italic  backcolor removeformat | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              ' help',
                            plugins: [
                              'advlist autolink lists link image charmap print preview anchor  textcolor colorpicker',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                            ],
                            content_style: `
                              body {
                                color: var(--new-colors-text-medium-gray, #585858);
                                font-family: 'DM Sans', sans-serif;
                                font-size: 12px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 18px;
                              }
                            `
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-items-center tw-gap-6 tw-px-[15px] tw-pb-[28px] tw-pt-[25.33px]">
                  <CustomButton
                    text={editInvoiceReminder ? 'Update' : 'save'}
                    className="btn-primary"
                    onClick={handleSubmit(handleSetReminder)}
                  />
                </div>
              </DialogContent>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
}

InvoiceReminder.propTypes = {
  invoice: PropTypes.string,
  reminderLevel: PropTypes.number,
  createReminder: PropTypes.string,
  levelOfReminder: PropTypes.string,
  isLoadingForReminder: PropTypes.bool
};
