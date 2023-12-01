import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/common/components/modal/modal.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';

export default function ConfirmationModal({
  show,
  onClose,
  onCancel,
  onConfirm,
  message,
  cancelText
}) {
  return (
    <Modal onClose={onClose} show={show} title="Confirmation" className="tw-z-auto">
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <h3 className="tw-items-center">{message}</h3>
      </div>
      <div className="tw-mt-5 tw-flex tw-justify-center tw-gap-6">
        <CustomButton
          onClick={cancelText ? onCancel : onClose}
          text={cancelText ? 'No' : 'Cancel'}
          className="btn-cancel"
        />
        <CustomButton
          text="Yes"
          type="submit"
          className="btn-primary"
          onClick={onConfirm}
        />
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  cancelText: PropTypes.string
};
