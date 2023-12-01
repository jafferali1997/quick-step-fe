import React from 'react';
import PropTypes from 'prop-types';
import useSearchableDropdown from './use-search-dropdown.hook';
import SearchIcon from '@/common/icons/search-icon';
import CustomInput from '../custom-input/custom-input.component';

function SearchableDropDown({
  columns,
  setSearchText,
  selectedColumn,
  setSelectedColumn
}) {
  const { ref, open, setOpen, handleSearch, handleSearchFilter } = useSearchableDropdown({
    setSearchText,
    setSelectedColumn
  });

  const allColumnOption = { headerName: 'All', field: 'all' };
  let columnsWithAllOption = [];

  if (columns?.length > 0) {
    columnsWithAllOption = [allColumnOption, ...columns];
  } else {
    columnsWithAllOption = [allColumnOption];
  }

  return (
    <div className="tw-relative tw-h-fit tw-w-full  tw-bg-white">
      <CustomInput
        placeholder="Search"
        type="text"
        onChange={handleSearch}
        className="tw-relative"
        startIcon={<SearchIcon />}
      />
      {/* <div
        className=" tw-absolute tw-bottom-[0.6rem] tw-right-[5.6px] tw-flex tw-cursor-pointer  tw-items-center tw-gap-[6px]"
        onClick={() => setOpen(!open)}
      >
        <div className="tw-flex tw-items-center tw-gap-2 ">
          <div className="tw-text-[#BBBBBB]">| </div>
          <div className="tw-text-[10px] tw-font-normal tw-leading-[15px]">
            {selectedColumn || 'All'}
          </div>
        </div>
        <div>
          <img src="/assets/icons/arrow-drop.svg" alt="" height="4.81" width="8.01px" />
        </div>
      </div> */}

      {open && (
        <div
          ref={ref}
          className="tw-width-[257px] tw-absolute tw-right-[0px] tw-top-[48px] tw-z-[100] tw-flex tw-flex-col tw-gap-[11px] tw-bg-white tw-p-2.5 tw-shadow-2xl"
        >
          {columnsWithAllOption &&
            columnsWithAllOption
              .filter((col) => col.field !== 'actions')
              .map((col) => (
                <div key={col.field} className="tw-flex tw-gap-2">
                  <input
                    id={col.headerName}
                    type="checkbox"
                    className="unchecked:tw-bg-[url('/assets/images/unchecked.svg')] tw-h-4 tw-w-4 tw-appearance-none tw-rounded-sm tw-border tw-border-gray-300 tw-bg-cover checked:tw-bg-[url('/assets/images/checked.svg')]"
                    onChange={(e) => handleSearchFilter(e, col.field)}
                    checked={selectedColumn === col.field}
                  />
                  <label
                    className="tw-font-dm tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-[#2C2E3E]"
                    htmlFor={col.headerName}
                  >
                    {col.headerName}
                  </label>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
SearchableDropDown.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string
    })
  ),
  setSearchText: PropTypes.func,
  selectedColumn: PropTypes.string,
  setSelectedColumn: PropTypes.func
};
export default SearchableDropDown;
