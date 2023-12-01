/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import useInnerTab from './use-inner-tab.hook';

export default function InnerTabs({ tabs }) {
  const { handleTabClick, activeTab } = useInnerTab(tabs);

  return (
    <div className="tabs tw-w-full ">
      <div className=" tw-flex tw-gap-4 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tw-text-xs tw-leading-[18px] tw-text-text-light-gray ${
              activeTab === tab.id &&
              'tw-rounded-[18px] tw-bg-[#1D4ED8] tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-leading-[18px] tw-text-white'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content tw-bg-white">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="tab-pane">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
InnerTabs.propTypes = {
  tabs: PropTypes.arrayOf
};
