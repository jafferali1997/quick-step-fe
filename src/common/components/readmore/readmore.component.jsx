import React, { useState } from 'react';

export default function ReadMore({ text }) {
  const [isReadMore, setIsReadMore] = useState(true);

  return (
    <div>
      <p className="tw-font-dm tw-text-sm tw-font-normal tw-leading-5 tw-text-text-dark-gray">
        {isReadMore ? text.slice(0, 150) : text} {' '}
        <span onClick={()=> setIsReadMore(!isReadMore)} className="tw-font-dm tw-font-medium tw-text-base tw-leading-5 tw-text-text-dark-gray tw-cursor-pointer">
            {isReadMore ? "Read more..." : " Show less"}
        </span>
      </p>
    </div>
  );
}
