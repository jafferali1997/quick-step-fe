import PropTypes from 'prop-types';

/**
 * @param className will accept the css classes
 * @returns functional component of SVG icon
 */

export default function OrderIcon({ className }) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <path d="M12.8438 0.767639V3.61817H15.6941L12.8438 0.767639Z" fill="white" />
      <path
        d="M12.375 4.55566C12.1161 4.55566 11.9062 4.34579 11.9062 4.08691V0.493164H5.1875C4.41209 0.493164 3.78125 1.12401 3.78125 1.89941V7.1397C3.93569 7.1257 4.09197 7.11816 4.25 7.11816C5.84775 7.11816 7.27803 7.84866 8.22456 8.99316H13.3125C13.5714 8.99316 13.7812 9.20304 13.7812 9.46191C13.7812 9.72079 13.5714 9.93066 13.3125 9.93066H8.84212C9.14162 10.5151 9.32584 11.1516 9.38472 11.8057H13.3125C13.5714 11.8057 13.7812 12.0155 13.7812 12.2744C13.7812 12.5333 13.5714 12.7432 13.3125 12.7432H9.38472C9.24453 14.2913 8.41741 15.644 7.21119 16.4932H14.5625C15.3379 16.4932 15.9688 15.8623 15.9688 15.0869V4.55566H12.375ZM13.3125 7.11816H6.4375C6.17863 7.11816 5.96875 6.90829 5.96875 6.64941C5.96875 6.39054 6.17863 6.18066 6.4375 6.18066H13.3125C13.5714 6.18066 13.7812 6.39054 13.7812 6.64941C13.7812 6.90829 13.5714 7.11816 13.3125 7.11816Z"
        fill="white"
      />
      <path
        d="M4.25 8.05566C1.92378 8.05566 0.03125 9.9482 0.03125 12.2744C0.03125 14.6006 1.92378 16.4932 4.25 16.4932C6.57622 16.4932 8.46875 14.6006 8.46875 12.2744C8.46875 9.9482 6.57622 8.05566 4.25 8.05566ZM3.98959 11.8057H4.51044C5.05606 11.8057 5.5 12.2496 5.5 12.7953V13.3161C5.5 13.7903 5.16469 14.1874 4.71875 14.2834V14.4619C4.71875 14.7208 4.50887 14.9307 4.25 14.9307C3.99113 14.9307 3.78125 14.7208 3.78125 14.4619V14.2834C3.33531 14.1874 3 13.7903 3 13.3161C3 13.0572 3.20988 12.8473 3.46875 12.8473C3.72762 12.8473 3.9375 13.0572 3.9375 13.3161C3.93752 13.3299 3.94302 13.3431 3.95279 13.3529C3.96255 13.3626 3.97579 13.3681 3.98959 13.3682H4.51044C4.52425 13.3681 4.53748 13.3626 4.54725 13.3529C4.55701 13.3431 4.56251 13.3299 4.56253 13.3161V12.7953C4.56251 12.7814 4.55701 12.7682 4.54725 12.7584C4.53748 12.7487 4.52425 12.7432 4.51044 12.7432H3.98959C3.44394 12.7432 3 12.2992 3 11.7536V11.2328C3 10.7586 3.33531 10.3614 3.78125 10.2654V10.0869C3.78125 9.82804 3.99113 9.61816 4.25 9.61816C4.50887 9.61816 4.71875 9.82804 4.71875 10.0869V10.2654C5.16469 10.3614 5.5 10.7586 5.5 11.2328C5.5 11.4916 5.29012 11.7015 5.03125 11.7015C4.77238 11.7015 4.5625 11.4916 4.5625 11.2328C4.56248 11.2189 4.55698 11.2057 4.54721 11.1959C4.53745 11.1862 4.52421 11.1807 4.51041 11.1807H3.98956C3.97575 11.1807 3.96252 11.1862 3.95275 11.1959C3.94299 11.2057 3.93749 11.2189 3.93747 11.2328V11.7536C3.93749 11.7674 3.94299 11.7806 3.95276 11.7904C3.96254 11.8002 3.97578 11.8056 3.98959 11.8057Z"
        fill="white"
      />
    </svg>
  );
}

OrderIcon.propTypes = {
  className: PropTypes.string
};