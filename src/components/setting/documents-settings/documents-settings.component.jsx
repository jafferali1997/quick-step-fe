import React from 'react';
import useDocumentsSettings from './use-documents-settings.hook';
import OuterTabs from '@/common/components/custom-tab/outer-tab/outer-tab.component';

export default function DocumentsSettings() {
  const { tabs } = useDocumentsSettings();
  return (
    <div className="tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] tw-pb-8 tw-pt-6">
      <div>
        <h2 className="tw-overflow-hidden tw-text-ellipsis tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-medium-gray">
          Documents Settings
        </h2>
      </div>
      <div className="tw-border-border-gray tw-mt-4 tw-rounded-[10px_10px_10px_10px] tw-border-[1px] tw-border-b-[none] tw-bg-[#FBFBFB]">
        <OuterTabs tabs={tabs} />
      </div>
    </div>
  );
}
