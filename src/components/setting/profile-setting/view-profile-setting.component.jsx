import React from 'react';
import OuterTabs from '@/common/components/custom-tab/outer-tab/outer-tab.component';
import useViewProfileSetting from './use-view-profile-setting.hook';

export default function ViewProfileSetting() {
  const { tabs } = useViewProfileSetting();
  return (
    <div className="tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] tw-pb-8 tw-pt-3">
      <div>
        <h2 className="tw-overflow-hidden tw-text-ellipsis tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-medium-gray">
          Profile Settings
        </h2>
      </div>
      <div className="tw-border-border-gray tw-mt-4 tw-rounded-[10px_10px_0px_0px] tw-border-[1px] tw-border-b-[none] tw-bg-[#FBFBFB]">
        <OuterTabs tabs={tabs} />
      </div>
    </div>
  );
}
