import React from 'react';
import useScanQRCode from './use-scan-qr-code.hook';
import CustomButton from '@/common/components/custom-button/custom-button.component';

function ScanQRCode() {
  const { handleBackLogin, handleConfirmDelivery, successRendering } = useScanQRCode();
  return (
    <div className="tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center">
      <div className="tw-mx-auto tw-w-full tw-px-5 tw-text-center md:tw-w-3/4">
        {successRendering ? (
          <img
            className="tw-mx-auto tw-w-3/4 md:tw-w-2/4"
            src="/assets/icons/succes-tick.svg"
            alt="PNG"
          />
        ) : (
          <img
            className="tw-mx-auto tw-w-3/4 md:tw-w-2/4"
            src="/assets/icons/qr-welcome.svg"
            alt="PNG"
          />
        )}
        <p className="tw-py-10 tw-text-base md:tw-text-2xl">
          {successRendering
            ? 'Your Order Has Been Delivered Successfully'
            : 'Dear Customer, Please confirm that you have received the order'}
        </p>
        <CustomButton
          type="button"
          text={successRendering ? 'No' : 'Yes, Received'}
          onClick={successRendering ? handleBackLogin : handleConfirmDelivery}
          className="btn-primary tw-mx-auto tw-h-[50px] tw-rounded-md tw-px-[30px] tw-py-3 tw-text-base tw-leading-6"
        />
      </div>
    </div>
  );
}

export default ScanQRCode;
