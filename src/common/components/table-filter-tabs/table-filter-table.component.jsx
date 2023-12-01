'use client';

import React from 'react';
import PropTypes from 'prop-types';

export default function TableFilterTabs({ filteropions, action }) {
  return (
    <div className="tw-mx-5 tw-flex tw-items-center tw-gap-6 tw-border-b-2 tw-border-solid tw-border-disabled-input">
      {filteropions.map((item) => {
        return (
          <div key={item.id}>
            <input
              className="table_filter_radio tw-hidden"
              type="radio"
              name={item.name}
              id={item.label}
              value={item.label}
              onClick={action(item)}
            />
            <label
              className="tw-inline-block tw-translate-y-[2px] tw-border-green-600 tw-border-b-[1] tw-p-2 tw-font-dm tw-text-sm tw-font-normal tw-leading-5 tw-text-text-medium-gray hover:tw-cursor-pointer hover:tw-text-green-600"
              for={item.label}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
TableFilterTabs.propTypes = {
  filteropions: PropTypes.arrayOf(),
  action: PropTypes.func
};
