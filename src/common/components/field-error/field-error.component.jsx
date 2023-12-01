import PropTypes from 'prop-types';
import FieldErrorIcon from '@/common/icons/field-error.icon';

export default function FieldError({ className = '', error = '' }) {
  return (
    <p
      className={`tw-flex tw-flex-row tw-font-dm tw-text-[12px] tw-font-normal tw-leading-[15px] tw-text-danger ${className} tw-items-center tw-justify-start tw-align-middle`}
    >
      <FieldErrorIcon className="tw-mr-[4px]" width={12} height={12} /> {error}
    </p>
  );
}

FieldError.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string
};
