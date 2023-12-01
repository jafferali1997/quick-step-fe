import React from 'react';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import SearchIcon from '@/common/icons/search-icon';
import useTemplate from './use-templates.hook';
import InnerTabs from '@/common/components/custom-tab/Inner-tab/inner-tab.component';

export default function ViewTemplate() {
  const { tabs } = useTemplate();
  return (
    <div className="tw-m-6 tw-min-h-[489px] tw-max-w-[1119px] tw-rounded-[20px] tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-p-5">
      <h2 className="tw-text-[22px] tw-font-medium tw-capitalize tw-leading-[33px] tw-text-text-dark-gray">
        Templates
      </h2>
      <div className="tw-mx-[-20px] tw-mt-[17px] tw-rounded-[1px] tw-bg-[#fbfbfb]  tw-pl-5 tw-pt-4">
        <div className="tw-bg-white tw-pr-5">
          <CustomInput
            startIcon={<SearchIcon />}
            placeholder="Search template by name"
            className="tw-h-[38px] "
          />
        </div>
        <div className="tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-gap-6">
          <InnerTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
