import { DialogActions } from '@mui/material/node';
import PropTypes from 'prop-types';
import CustomButton from '../../custom-button/custom-button.component';

export default function ModalFooter({
  cancelButtonText = 'Cancel',
  submitButtonText,
  onClose,
  submitOnclick
}) {
  return (
    <DialogActions className="tw-gap-4 tw-pt-4">
      <CustomButton className="btn-cancel " onClick={onClose} text={cancelButtonText} />
      {submitButtonText && (
        <CustomButton
          type="submit"
          onClick={submitOnclick}
          className="btn-primary !tw-h-fit tw-rounded-md tw-bg-primary tw-px-4 tw-py-[10px] tw-font-dm tw-text-sm tw-font-semibold tw-leading-4 tw-text-white tw-opacity-100"
          text={submitButtonText}
        />
      )}
    </DialogActions>
  );
}

ModalFooter.propTypes = {
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  onClose: PropTypes.func,
  submitOnclick: PropTypes.func
};
