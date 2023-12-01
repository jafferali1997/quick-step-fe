import PropTypes from 'prop-types';

/**
 * @param className will accept the css classes
 * @returns functional component of SVG icon
 */

export default function ArrowLeftIcon({ className }) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.02173 9.10079C5.14284 9.10304 5.26166 9.06758 5.36173 8.99934C5.46181 8.93109 5.5382 8.83343 5.58033 8.71986C5.62247 8.6063 5.62826 8.48244 5.59691 8.36544C5.56556 8.24843 5.49862 8.14406 5.40536 8.06677L1.83591 5.01103L5.40756 1.95528C5.47281 1.90771 5.52749 1.84714 5.56816 1.77737C5.60882 1.70761 5.63458 1.63018 5.64381 1.54996C5.65304 1.46974 5.64555 1.38848 5.6218 1.3113C5.59805 1.23413 5.55855 1.16271 5.50582 1.10157C5.45308 1.04042 5.38824 0.990869 5.31538 0.956042C5.24253 0.921215 5.16325 0.901867 5.08255 0.89922C5.00184 0.896572 4.92147 0.910681 4.84649 0.940659C4.77151 0.970636 4.70356 1.01583 4.64693 1.07339L0.563781 4.56347C0.499567 4.61832 0.448007 4.68643 0.412653 4.76313C0.377298 4.83982 0.35899 4.92327 0.35899 5.00772C0.35899 5.09217 0.377298 5.17562 0.412653 5.25231C0.448007 5.329 0.499567 5.39712 0.563781 5.45197L4.64693 8.95307C4.7504 9.04519 4.88324 9.09754 5.02173 9.10079Z"
        fill="#FEFEFE"
      />
    </svg>
  );
}

ArrowLeftIcon.propTypes = {
  className: PropTypes.string
};