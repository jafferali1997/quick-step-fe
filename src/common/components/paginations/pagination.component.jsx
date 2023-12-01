'use client';

import React, { useState } from 'react';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PropTypes, { object } from 'prop-types';

// const data = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ];

export default function CustomPagination({ data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);
  const totalEntries = data.length;
  const firstEntry = startIndex + 1;
  const lastEntry = Math.min(endIndex, totalEntries);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <>
      {' '}
      <div className="tw-flex tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-[8px] tw-pl-1 tw-font-dm tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]">
          <div>
            <span className="tw-font-dm tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]">
              Show
            </span>
            <select
              className="tw-ml-2 tw-h-[27px] tw-w-[52px] tw-rounded tw-border tw-border-solid tw-border-[#E0E7ED] tw-px-1 tw-outline-none "
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <p className=" tw-pl-1">
            entries
            <span className="tw-leading-[18px]; tw-pl-1 tw-font-dm tw-text-xs tw-font-normal tw-not-italic">
              {firstEntry}
            </span>
            <span className="tw-pl-1 tw-text-text-ultra-light-gray">
              to {lastEntry} of {totalEntries} entries
            </span>
          </p>
        </div>
        <div className="tw-flex tw-w-[40%] tw-justify-end tw-gap-[12px]">
          <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
          />
        </div>
      </div>
    </>
  );
}
CustomPagination.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(object).isRequired
};
