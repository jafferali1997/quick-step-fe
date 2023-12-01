import React from 'react';
import MenuDropDown from './menu-drop-down/menu-drop-down.component';

export default function StandardTab() {
  return (
    <div>
      <div className="tw-flex tw-items-center tw-gap-4 tw-pt-[18px]">
        <div className="tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-dark-gray">
          Standard Template
        </div>
        <div className="tw-rounded-3xl tw-border tw-border-solid tw-border-disabled-input tw-bg-[#ffffff] tw-px-[0.7rem] tw-py-px tw-text-xs tw-font-medium tw-leading-[18px] tw-text-text-light-gray">
          1
        </div>
      </div>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-pt-4 md:tw-grid-cols-3 lg:tw-grid-cols-4">
        <div className="tw-relative tw-m-4 tw-h-[203px] tw-w-full tw-rounded-[5px] tw-border tw-border-solid tw-px-1.5 tw-py-[11px] hover:tw-cursor-pointer hover:tw-border-primary">
          <div>
            <img src="/assets/images/PDF-invoice.png" alt="" />
          </div>
          <div className=" tw-mx-[-6px] tw-mb-[-9px] tw-min-h-[44px] tw-bg-[#FBFBFB]  ">
            <h3 className="tw-mx-[10px] tw-mb-5 tw-pt-[10px] tw-text-xs tw-font-medium tw-leading-[13.472px] tw-text-text-medium-gray">
              Standard Template
            </h3>
          </div>
          <div className="tw-absolute tw-bottom-[1.25rem] tw-right-[1.25rem] tw-flex tw-items-center tw-gap-3">
            <MenuDropDown />
          </div>
        </div>
      </div>
    </div>
  );
}
