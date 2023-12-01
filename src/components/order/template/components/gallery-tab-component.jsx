import React from 'react';
// eslint-disable-next-line import/no-cycle
import useTemplate from '../use-templates.hook';
import Modal from '@/common/components/modal/modal.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import MenuDropDown from './menu-drop-down/menu-drop-down.component';
import ConfirmationDialog from '@/common/components/custom-dialog-confirmation/ConfirmationDialog';
import PlusTemplateIcon from '@/common/icons/plusTemplate.icon';

export default function GalleryTab() {
  const {
    open,
    setOpen,
    modalCloseHandler,
    register,
    errors,
    handleSubmit,
    onSubmit,
    allTemplateData,
    handleDeleteTemplate,
    openConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    handleEditTemplate,
    handleViewTemplate,
    handleRenameTemplate,
    isLoading,
    getTemplateId,
    selectTemplateId
  } = useTemplate();
  return (
    <>
      <Modal show={open} onClose={modalCloseHandler} title="Add Template Name">
        {isLoading ? (
          <div className="tw-flex tw-justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              type="text"
              name="templateName"
              className="form-control"
              placeholder="Enter template name"
              isRequired
              register={register}
              errors={errors}
            />
            <div className="tw-mt-5 tw-flex tw-justify-end tw-gap-6">
              <CustomButton
                onClick={modalCloseHandler}
                text="Cancel"
                className="btn-cancel"
              />
              <CustomButton text="Next" type="submit" className="btn-primary" />
            </div>
          </form>
        )}
      </Modal>
      <ConfirmationDialog
        show={openConfirmationModal}
        onClose={() => confirmationModalCloseHandler()}
        onConfirm={() => confirmationModalHandler()}
        message="Are you sure you want to delete it?"
      />
      <div>
        <div className="tw-flex tw-items-center tw-gap-4 tw-pt-[18px]">
          <div className="tw-ml-4 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-dark-gray">
            Your Gallery
          </div>
        </div>
      </div>
      <div className="tw-mx-4 tw-mb-4 tw-grid tw-grid-cols-1 tw-gap-4 tw-pt-4 md:tw-grid-cols-3 lg:tw-grid-cols-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="tw-relative tw-h-[203px] tw-w-full tw-rounded-md tw-border tw-border-solid tw-border-[#EDEDED] tw-bg-[#FBFBFB80] tw-px-4 tw-py-2"
        >
          <PlusTemplateIcon />
          <p className="tw-text-xs tw-font-medium tw-leading-[18px] tw-text-[color:var(--new-colors-text-dark-gray,#46474F)]">
            Create Your Own Template
          </p>
        </button>
        {allTemplateData?.map((template) => (
          <div
            key={template.id}
            onClick={() => getTemplateId(template.id)}
            className={`tw-relative tw-h-auto tw-w-full tw-rounded-[5px] tw-border tw-border-solid tw-px-1.5 tw-py-[11px] hover:tw-cursor-pointer ${
              selectTemplateId === String(template.id) ? 'tw-border-primary' : ''
            }`}
          >
            <div>
              <img src="/assets/images/PDF-invoice.png" alt="" />
            </div>
            <div className=" tw-mx-[-6px] tw-mb-[-9px] tw-min-h-[44px] tw-bg-[#FBFBFB]  ">
              <h3 className="tw-mx-[10px] tw-mb-5 tw-pt-[10px] tw-text-xs tw-font-medium tw-leading-[13.472px] tw-text-text-medium-gray">
                {template.templateName}
              </h3>
            </div>
            <div className="tw-absolute tw-bottom-[1.25rem] tw-right-[1.25rem] tw-flex tw-items-center tw-gap-3">
              <MenuDropDown
                handleDeleteTemplate={handleDeleteTemplate}
                handleEditTemplate={handleEditTemplate}
                handleViewTemplate={handleViewTemplate}
                handleRenameTemplate={handleRenameTemplate}
                id={template.id}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
