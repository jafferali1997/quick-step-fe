import OuterTabs from '@/common/components/custom-tab/outer-tab/outer-tab.component';
import useGeneralSetting from './use-general-setting.hook';

function GeneralSetting() {
  const { tabs } = useGeneralSetting();
  return (
    <div className="tw-p-6">
      <div className="tw-overflow-hidden tw-text-ellipsis tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-medium-gray">
        General Setting
      </div>

      <div className="tw-border-border-gray tw-mt-4 tw-rounded-[10px] tw-border-[1px] ">
        <OuterTabs tabs={tabs} />
      </div>
    </div>
  );
}

export default GeneralSetting;
