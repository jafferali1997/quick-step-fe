'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTabHook from './tab.hook';

function Tab({ tabs, gridCol, navMaxWidth }) {
  const {
    syntaticTabs,
    activeTab,
    setActiveTab,
    completedTab,
    setCompletedTab,
    handleTabClick,
    resetTabCompleted,
    Component
  } = useTabHook({ tabs });

  return (
    <div className="tabs">
      <div className="custom-scroll xs:tw-overflow-x-auto">
        <div
          className={`tab-navigation xs:tw-min-w-[450px] xs:tw-px-8 tw-max-w-[${navMaxWidth}]  ${gridCol}`}
        >
          {/* {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))} */}
          {tabs.map((tab) => (
            <>
              <div
                key={tab.id}
                className={`${
                  tab.id === activeTab
                    ? 'activeTab'
                    : completedTab.includes(tab.id)
                    ? 'done'
                    : ''
                } tab-item tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-center`}
              >
                <div className="icon tw-border-[ #BBBBBB] tw-inline-block tw-flex tw-h-[40px] tw-w-[40px] tw-items-center tw-justify-center tw-rounded-[50%] tw-border-[1px]">
                  <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
                </div>
                <div
                  className="title tw-font-DM tw-text-lightgray tw-absolute  tw-top-[100%] tw-mt-3 tw-whitespace-nowrap  tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-ultra-light-gray
              "
                >
                  {tab.label}
                </div>
              </div>
              <div className="seperator tw-h-[2px] tw-bg-[#BBBBBB]" />
            </>
          ))}
        </div>
      </div>

      <div className="tab-content">{Component}</div>
    </div>
  );
}

export default Tab;

Tab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tabs: PropTypes.arrayOf(PropTypes.object),
  gridCol: PropTypes.string,
  navMaxWidth: PropTypes.string
};
