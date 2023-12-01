import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import TinyMcEditor from '../tinymc-editor/tinymc-editor';

function PageStructureModal({
  ref,
  openPopup,
  edit,
  header,
  title,
  description,
  handleClose,
  handleTitle,
  handleSave,
  handleDelete,
  handleEditorChange
}) {
  return (
    <div>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: '600px',
            borderRadius: '20px',
            display: 'flex'
          }
        }}
        className="scrol-bar"
        ref={ref}
        open={openPopup}
      >
        <div className="tw-max-h-full tw-w-[909px] tw-max-w-full ">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between tw-bg-[#e3ecf4] tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
              {edit ? `Edit ${header}` : `Add ${header}`}
            </div>
            <div className="hover:tw-cursor-pointer" onClick={handleClose}>
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
            <div className="tw-w-full">
              <div className="tw-mb-[-20px] tw-flex tw-justify-between tw-text-[10px] tw-font-normal tw-leading-[15px]">
                <div />
                <div className=" tw-text-[10px] tw-font-normal tw-leading-[15px] tw-text-text-medium-gray">
                  Max: {256 - ((title && title.length) || 0)}
                </div>
              </div>
              <CustomInput
                label="Title"
                name="Title "
                placeholder="Enter Title"
                type="tex"
                value={title}
                className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]"
                onChange={(e) => handleTitle(e)}
              />
              <div className="tw tw-mt-[19px] tw-flex tw-flex-col tw-gap-2">
                <div className="tw-flex tw-justify-between">
                  <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                    Text
                  </div>
                  <div className="tw-flex tw-justify-between tw-text-[10px] tw-font-normal tw-leading-[15px]">
                    <div />
                    <div className="tw-text-[10px] tw-font-normal tw-leading-[15px] tw-text-text-medium-gray">
                      Max: {5000 - ((description && description.length) || 0)}
                    </div>
                  </div>
                </div>
                <TinyMcEditor
                  description={description}
                  handleEditorChange={handleEditorChange}
                />
              </div>

              <div className="tw-mt-[35px] tw-flex tw-justify-between tw-gap-[20px]">
                <div>
                  {edit && (
                    <CustomButton
                      onClick={handleDelete}
                      text="delete"
                      className="btn-danger tw-bg-[#EF2020] tw-px-6 tw-py-2 tw-text-white"
                    />
                  )}
                </div>

                <div className="tw-flex tw-justify-end tw-gap-5">
                  <CustomButton
                    onClick={handleClose}
                    text="cancel"
                    className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-medium-gray"
                  />
                  <CustomButton
                    onClick={handleSave}
                    text={edit ? 'Update' : 'Add'}
                    className="btn-primary tw-px-6 tw-py-2 tw-text-sm tw-font-semibold tw-leading-[16.94px]"
                    disabled={!title || !description}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

PageStructureModal.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(React.Element) })
  ]),
  openPopup: PropTypes.bool,
  edit: PropTypes.bool,
  header: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  handleClose: PropTypes.func,
  handleTitle: PropTypes.func,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEditorChange: PropTypes.func
};

export default PageStructureModal;
