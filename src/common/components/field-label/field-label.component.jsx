import PropTypes from 'prop-types';

export default function FieldLabel({ label, isRequired = false, className = '' }) {
  return (
    <label
      className={`tw-mr-1 tw-flex tw-min-w-fit tw-flex-row tw-text-[12px] tw-font-medium  tw-leading-[17.5px] tw-text-secondary-black ${className}`}
    >
      {label} {isRequired ? <span className="tw-ml-1 tw-text-danger">*</span> : null}
    </label>
  );
}

FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  className: PropTypes.string
};
