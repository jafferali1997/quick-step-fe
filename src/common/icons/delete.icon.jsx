import React from 'react';
import { PropTypes } from 'prop-types';

export default function DeleteIcon({ id = null }) {
  return (
    <svg
      {...(id && { id })}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        {...(id && { id: `${id ? `${id}-inner` : ''}` })}
        d="M1.94391 5.1875L2.77419 15.2105C2.83369 15.9333 3.44938 16.5 4.17494 16.5H11.8251C12.5507 16.5 13.1663 15.9333 13.2258 15.2105L14.0561 5.1875H1.94391ZM5.65581 14.625C5.41044 14.625 5.204 14.4341 5.18844 14.1855L4.71969 6.62303C4.70366 6.36441 4.90003 6.14194 5.15822 6.12591C5.426 6.10713 5.63888 6.30581 5.65534 6.56444L6.12409 14.1269C6.14069 14.3948 5.92878 14.625 5.65581 14.625ZM8.46875 14.1562C8.46875 14.4153 8.25909 14.625 8 14.625C7.74091 14.625 7.53125 14.4153 7.53125 14.1562V6.59375C7.53125 6.33466 7.74091 6.125 8 6.125C8.25909 6.125 8.46875 6.33466 8.46875 6.59375V14.1562ZM11.2803 6.62306L10.8116 14.1856C10.7962 14.4316 10.5911 14.6367 10.3144 14.6241C10.0563 14.6081 9.85987 14.3856 9.87591 14.127L10.3447 6.56447C10.3607 6.30584 10.5873 6.11769 10.8418 6.12594C11.1 6.14197 11.2963 6.36444 11.2803 6.62306ZM14.0938 2.375H11.2812V1.90625C11.2812 1.13081 10.6504 0.5 9.875 0.5H6.125C5.34956 0.5 4.71875 1.13081 4.71875 1.90625V2.375H1.90625C1.38847 2.375 0.96875 2.79472 0.96875 3.3125C0.96875 3.83022 1.38847 4.25 1.90625 4.25H14.0938C14.6115 4.25 15.0312 3.83022 15.0312 3.3125C15.0312 2.79472 14.6115 2.375 14.0938 2.375ZM10.3438 2.375H5.65625V1.90625C5.65625 1.64762 5.86637 1.4375 6.125 1.4375H9.875C10.1336 1.4375 10.3438 1.64762 10.3438 1.90625V2.375Z"
        fill="#7E7D7D"
      />
    </svg>
  );
}

DeleteIcon.propTypes = {
  id: PropTypes.string
};