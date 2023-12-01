'use client';

import { useState } from 'react';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import Toaster from '@/common/components/toaster/toaster.component';

export default function AllToaster() {
  const [showSuccessToaster, setShowSuccessToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);

  return (
    <div className="tw-m-5">
      <h3 className="tw-text-2xl tw-font-bold">Toasters</h3>
      <hr />
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-5">
        <CustomButton
          text="Show Success Toaster"
          onClick={
            () => {}
            // enqueueSnackbar('message', {
            //   variant: 'success'
            // })
          }
          className="btn-primary tw-m-5"
        />
        <Toaster
          show={showSuccessToaster}
          onClose={() => setShowSuccessToaster(false)}
          type="success"
          text="This is a success toaster — check it out!"
        />
        <CustomButton
          text="Show Error Toaster"
          onClick={() => setShowErrorToaster(true)}
          className="btn-outline tw-m-5 tw-border-danger tw-text-danger hover:tw-bg-danger hover:tw-text-white hover:tw-opacity-25"
        />
        <Toaster
          show={showErrorToaster}
          onClose={() => setShowErrorToaster(false)}
          type="error"
          text="This is a error toaster — check it out!"
        />
      </div>
    </div>
  );
}
