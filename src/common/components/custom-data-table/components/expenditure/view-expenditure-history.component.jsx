import React from 'react';
import PropTypes from 'prop-types';
import useViewExpenditureHistory from './use-view-expenditure-history.hook';

export default function ViewExpendiuteHistory({ id }) {
  const { historyData, changeData } = useViewExpenditureHistory(id);

  return (
    <div className="tw-absolute tw-h-[184px] tw-w-full    tw-px-6 tw-py-2">
      <div className=" tw-flex tw-h-40 tw-w-full tw-flex-col tw-gap-3 tw-rounded-[10px] tw-border tw-border-solid tw-border-[#E7EAEE] tw-bg-[#fafafa] tw-px-2 tw-py-4">
        <h3 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
          History
        </h3>
        <div className="primary-scroll tw-max-h-[150px] tw-overflow-y-auto">
          <div dangerouslySetInnerHTML={{ __html: changeData }} />
        </div>
      </div>
      <pre> </pre>
    </div>
  );
}
ViewExpendiuteHistory.propTypes = {
  id: PropTypes.string
};
