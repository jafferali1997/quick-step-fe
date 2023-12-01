import { Pagination, PaginationItem, styled } from '@mui/material/node';
import React from 'react';
import usePaginationHook from './pagination-enteries.hook';

function PaginationComponent({
  data,
  action,
  currentPage,
  setCurrentPage,
  itemsPerPage
}) {
  const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    backgroundColor: '#E4E4E4',
    color: 'black',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main
    },
    borderRadius: '4px',
    margin: '4px'
  }));

  const { totalPages, handlePagination } = usePaginationHook({
    data,
    action,
    currentPage,
    itemsPerPage,
    setCurrentPage
  });

  return (
    <div className="tw-flex tw-justify-between">
      <div className="tw-flex tw-items-center tw-gap-[8px] tw-pl-1 tw-font-dm tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]">
        <div>
          <span className="tw-font-dm tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px]">
            Show
          </span>
          <select className="tw-ml-2 tw-h-[27px] tw-w-[52px] tw-rounded tw-border tw-border-solid tw-border-[#E0E7ED] tw-px-1 tw-outline-none ">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <p className=" tw-pl-1">
          entries
          <span className="tw-leading-[18px]; tw-pl-1 tw-font-dm tw-text-xs tw-font-normal tw-not-italic">
            {currentPage === 1 ? currentPage : currentPage * itemsPerPage - itemsPerPage}
          </span>
          <span className="tw-pl-1 tw-text-text-ultra-light-gray">
            to {currentPage * itemsPerPage} of {data.length} entries
          </span>
        </p>
      </div>
      <div className="tw-flex tw-w-[40%] tw-justify-end tw-gap-[12px]">
        <Pagination
          color="primary"
          shape="rounded"
          count={totalPages}
          page={currentPage}
          renderItem={(item) => <StyledPaginationItem {...item} />}
          onChange={(event, value) => handlePagination(value)}
        />
      </div>
    </div>
  );
}

export default PaginationComponent;
