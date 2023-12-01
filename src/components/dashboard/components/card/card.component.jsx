import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function DashboardCard({ item }) {
  const [extendedtoggle, setExtendedToggle] = useState(false);

  return (
    <div className="tw-border-border-gray2 tw-rounded-[20px] tw-border-[1px] tw-bg-white tw-px-4 tw-py-[14px]">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between">
        <img
          className="tw-h-[54px] tw-w-[60px] tw-rounded-[14px]"
          src={item.icon}
          alt="card icon"
        />

        <div className="tw-flex tw-flex-col tw-gap-2 tw-text-right">
          <div className="tw-flex tw-items-center tw-justify-end tw-gap-1">
            <img className="tw-h-5 tw-w-5" src={item.trendicon} alt="trend icon" />
            <span
              className={`tw-font-dm tw-text-base tw-font-medium tw-leading-5 ${
                item.trendstatus == 'up' ? 'tw-text-green-500' : 'tw-text-red-500'
              }`}
            >
              {item.trendvalue}
            </span>
          </div>
          <h2 className="tw-font-dm tw-text-base tw-font-normal tw-leading-6 ">
            {item.trendlable}
          </h2>
        </div>
      </div>

      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3">
        <div>
          <h2 className="tw-mb-3 tw-mt-[18px] tw-font-dm tw-text-xl tw-font-medium tw-leading-6 tw-text-secondary-black">
            {item.value}
          </h2>
          <p className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray">
            {item.valuelable}
          </p>
        </div>
      </div>

      {item.extended?.map((data) => {
        return (
          <div
            key={data.id}
            className={`${
              extendedtoggle ? 'tw-block' : 'tw-hidden'
            } tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2`}
          >
            <p className="tw-font-dm tw-text-sm tw-font-normal tw-leading-5 tw-text-dark-gray">
              {data.label}
            </p>
            <p className="tw-font-dm tw-text-[20px] tw-font-medium tw-leading-[30px] tw-text-dark-gray">
              {data.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

DashboardCard.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    trendicon: PropTypes.string,
    trendstatus: PropTypes.string,
    trendvalue: PropTypes.string,
    trendlable: PropTypes.string,
    value: PropTypes.string,
    valuelable: PropTypes.string,
    extended: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        value: PropTypes.string
      })
    )
  })
};
