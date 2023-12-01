import useLineItem from '@/components/offer/create/line-item/use-line-item.hook';
import { useState, useEffect } from 'react';
// import usePagination from './pagination.hook';

const DynamicPagination = ({ itemsPerPage, data, setData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
//   const { data, setData } = useLineItem({});

  useEffect(() => {
    // Calculate the total number of pages based on the data length and items per page
    const totalPagesCount = Math.ceil(data.length / itemsPerPage);
    setCurrentPage(1); // Reset the current page to the first page
    setTotalPages(totalPagesCount);


  }, [data, itemsPerPage]);

  const displayData = data.slice(startIndex, endIndex);
//   setData(displayData)
  console.log(displayData)


  const handlePagination = (pageNumber) => {
    // Check if the requested page number is within the valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
  setData(displayData)

    }
  };


 

  return (
    <div>
      {/* Render the displayed data */}
      {displayData.map((item) => (
        <div key={item.id}>{item.description}</div>
      ))}

      {/* Render pagination controls */}
      <div className="tw-flex tw-justify-between">
        <div></div>
        <div className="tw-flex tw-gap-4">
          {' '}
          <button
            onClick={() => handlePagination(currentPage - 1)}
            className="tw-flex tw-w-11 tw-flex-row tw-items-center tw-justify-center tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1"
          >
            {'<'}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePagination(index + 1)}
              //   style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
              className={`tw-flex tw-flex-row tw-items-center tw-justify-center tw-px-2.5 tw-py-1 ${
                currentPage === index + 1
                  ? 'tw-bg-primary tw-text-white'
                  : 'tw-bg-[#E4E4E4]'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePagination(currentPage + 1)}
            className="tw-flex tw-w-11 tw-flex-row tw-items-center tw-justify-center tw-bg-[#E4E4E4] tw-px-2.5 tw-py-1"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicPagination;
