import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CustomButton from '@/common/components/custom-button/custom-button.component';

export default function ConfirmationModal({
  show,
  close,
  onConfirm,
  onCancel,
  message,
  messageStyling,
  content,
  subContent,
  contentStyling,
  subContentStyling,
  img,
  crossImg,
  cancelText,
  confirmText,
  cancelTextStyling,
  confirmTextStyling,
  qrCode = false,
  qrCodeImage
}) {
  return (
    <Dialog
      open={show}
      onClose
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '474px',
          borderRadius: '20px',
          padding: '0'
        }
      }}
    >
      <div className="my-scroll tw-max-h-full tw-max-w-full tw-overflow-y-auto ">
        {crossImg && (
          <div className="tw-flex tw-justify-between">
            <div></div>
            <div
              className="tw-mx-6 tw-mt-6 hover:tw-cursor-pointer"
              onClick={() => close(false)}
            >
              <img src={crossImg} alt="img" />
            </div>
          </div>
        )}
        <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
          <div className="tw-flex tw-flex-col tw-items-center tw-rounded-[20px] tw-bg-white tw-px-6 tw-py-10">
            <div className="">
              <img src={img} alt="img" />
            </div>
            {message && <h3 className={messageStyling}>{message}</h3>}
            {content && <div className={contentStyling}>{content}</div>}
            {subContent && <div className={subContentStyling}>{subContent}</div>}
            {qrCode ? (
              <div className="tw-mt-[39px] tw-h-[135px] tw-w-[134px]">
                <img src={qrCodeImage} alt="img" className="tw-h-[135px] tw-w-[134px]" />
              </div>
            ) : (
              <div className="tw-mt-8 tw-flex tw-justify-center tw-gap-8">
                <CustomButton
                  onClick={onCancel}
                  text={cancelText}
                  className={cancelTextStyling}
                />
                <CustomButton
                  text={confirmText}
                  type="submit"
                  className={confirmTextStyling}
                  onClick={onConfirm}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

ConfirmationModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  message: PropTypes.string,
  messageStyling: PropTypes.string,
  content: PropTypes.string,
  subContent: PropTypes.string,
  contentStyling: PropTypes.string,
  subContentStyling: PropTypes.string,
  img: PropTypes.string,
  crossImg: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelTextStyling: PropTypes.string,
  confirmTextStyling: PropTypes.string,
  qrCode: PropTypes.bool,
  qrCodeImage: PropTypes.string
};
