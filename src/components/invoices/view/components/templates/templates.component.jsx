'use client';

import React from 'react';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import InnerTabs from '@/common/components/custom-tab/Inner-tab/inner-tab.component';
import SearchIcon from '@/common/icons/search-icon';
import useTempalateContent from './use-template-content.hoot';
import useTemplate from '@/components/invoices/template/use-templates.hook';

export default function TemplateContent() {
  const { tabs } = useTempalateContent();
  const { handleSearch } = useTemplate();
  return (
    <div className="">
      <div className="tw-mt-[17px] tw-rounded-[1px] tw-bg-[#fbfbfb]  tw-pl-5 tw-pt-4">
        <div className="tw-bg-white tw-pr-5">
          <CustomInput
            placeholder="Search template by name"
            type="text"
            onChange={handleSearch}
            className="tw-h-[38px]"
            startIcon={<SearchIcon />}
          />
        </div>
        <div className="tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-gap-6">
          <InnerTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
