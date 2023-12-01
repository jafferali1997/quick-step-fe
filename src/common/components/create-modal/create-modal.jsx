import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import CustomSwitch from '../custom-switch/custom-switch.component';

function CreateModal({
  modalStyling,
  ref,
  addLabel,
  editLabel,
  addButtonText,
  editButtonText,
  inputLabel,
  inputPlaceholderText,
  closeText,
  toggleSwitch,
  openPopup,
  inputLabelValue,
  handleChangeInputLabelValue,
  handleClose,
  handleSubmitClick,
  edit = false,
  handleDefaulTaxRateSwitch,
  type,
  toggleSwitchValue
}) {
  return (
    <Dialog
      className="scrol-bar"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '20px',
          display: 'flex'
        }
      }}
      ref={ref}
      open={openPopup}
    >
      <div className={modalStyling}>
        <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between tw-bg-[#e3ecf4] tw-px-5">
          <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            {edit ? editLabel : addLabel}
          </div>
          <div className="hover:tw-cursor-pointer" onClick={handleClose}>
            <img src="/assets/icons/cancel-icon.svg" alt="cancel" />
          </div>
        </div>
        <DialogContent>
          <div className="tw-w-full">
            <CustomInput
              label={inputLabel}
              placeholder={inputPlaceholderText}
              type={type}
              className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]"
              value={inputLabelValue}
              onChange={(e) => handleChangeInputLabelValue(e.target.value)}
            />

            {toggleSwitch && (
              <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
                <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                  Set as Default
                </div>
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                  defaultChecked={toggleSwitchValue}
                  onChange={(e) => handleDefaulTaxRateSwitch(e)}
                />
              </div>
            )}

            <div className="tw-mt-[35px] tw-flex tw-justify-end tw-gap-[20px]">
              <div className="tw-flex tw-justify-end tw-gap-5">
                <CustomButton
                  onClick={handleClose}
                  text={closeText}
                  className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-medium-gray"
                />
                <CustomButton
                  onClick={handleSubmitClick}
                  text={edit ? editButtonText : addButtonText}
                  className="btn-primary tw-px-6 tw-py-2 tw-text-sm tw-font-semibold tw-leading-[16.94px]"
                  disabled={!inputLabelValue}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

CreateModal.propTypes = {
  modalStyling: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(React.Element) })
  ]),
  openPopup: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmitClick: PropTypes.func.isRequired,
  addLabel: PropTypes.string,
  editLabel: PropTypes.string,
  inputLabel: PropTypes.string,
  inputPlaceholderText: PropTypes.string,
  addButtonText: PropTypes.string,
  editButtonText: PropTypes.string,
  closeText: PropTypes.string,
  toggleSwitch: PropTypes.bool,
  inputLabelValue: PropTypes.string,
  handleChangeInputLabelValue: PropTypes.string,
  edit: PropTypes.bool,
  handleDefaulTaxRateSwitch: PropTypes.func,
  type: PropTypes.string,
  toggleSwitchValue: PropTypes.bool
};

export default CreateModal;
