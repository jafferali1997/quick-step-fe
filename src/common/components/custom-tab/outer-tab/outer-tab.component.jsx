/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import useOuterTab from './use-outer-tab.hook';

export default function OuterTabs({ tabs, inPopup }) {
  const { handleOuterTabClick, activeOuterTab } = useOuterTab(tabs);

  return (
    <div className="tabs tw-w-full ">
      <div
        className={` tw-flex tw-gap-[25px] tw-rounded-[10px_10px_0px_0px] tw-border-b tw-border-solid tw-border-b-disabled-input tw-bg-white tw-pt-5 ${
          inPopup ? 'tw-px-0' : 'tw-px-5 '
        } tw-py-0 `}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tw-flex tw-h-[39px] tw-items-center tw-justify-center tw-gap-2 tw-p-2 tw-text-center  tw-text-sm  tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray hover:tw-cursor-pointer ${
              activeOuterTab === tab.id &&
              'tw-border-b-2 tw-border-solid tw-border-b-secondary-green tw-text-center tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-[#2C2E3E]'
            }`}
            onClick={() => handleOuterTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tab-content ">
        {tabs.map(
          (tab) =>
            activeOuterTab === tab.id && (
              <div key={tab.id} className="tab-pane">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
OuterTabs.propTypes = {
  tabs: PropTypes.arrayOf,
  inPopup: PropTypes.bool
};
