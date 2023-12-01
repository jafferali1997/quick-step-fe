import React from 'react';
import Breadcrumbs from '@mui/material/node/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';

export default function Breadscrumb({ breadscrumbs, current }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadscrumbs.map((item) => {
        return (
          <Link
            key={item.id}
            className="tw-font-dm tw-text-base tw-font-normal tw-leading-5 tw-text-text-gray3 hover:tw-underline"
            href={item.link}
          >
            {item.name}
          </Link>
        );
      })}

      <h4 className='tw-font-dm tw-font-medium tw-text-base tw-leading-5 tw-text-primary'>{current}</h4>
    </Breadcrumbs>
  );
}
