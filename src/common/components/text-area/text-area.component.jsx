import { TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';
import FieldError from '../field-error/field-error.component';
import FieldLabel from '../field-label/field-label.component';

export default function TextArea({
  placeholder = '',
  name,
  register = null,
  label = null,
  className = '',
  minRows = 4,
  maxRows = 10,
  value = null,
  disabled = false,
  defaultValue = null,
  onChange = null,
  errors = null,
  isRequired = false,
  inlineLabel = false,
  labelClassName = '',
  readOnly = false
}) {
  return (
    <div
      className={`${
        inlineLabel
          ? 'tw-flex tw-w-full tw-flex-row tw-items-center'
          : 'tw-flex tw-flex-col tw-gap-[8px] tw-text-xs tw-font-medium tw-capitalize tw-not-italic tw-leading-6 tw-text-text-black'
      }`}
    >
      {label && (
        <FieldLabel label={label} isRequired={isRequired} className={labelClassName} />
      )}

      <div className="tw-w-full">
        <TextareaAutosize
          {...(register && register(`${name}`))}
          name={name}
          minRows={minRows}
          maxRows={maxRows}
          placeholder={placeholder}
          className={`input-field default-input tw-min hover:tw-border-text-dark-gray focus:tw-border-[1px] focus:tw-border-text-dark-gray ${
            errors && errors[name] && 'error-field'
          } ${className} ${!disabled || 'disabled-input'} `}
          {...(defaultValue && { defaultValue })}
          {...(value && { value })}
          onChange={onChange}
          readOnly={readOnly}
          disabled={disabled}
        />
        {errors && errors[name] && (
          <FieldError className="tw-mt-1 tw-normal-case" error={errors[name].message} />
        )}
      </div>
    </div>
  );
}

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  inlineLabel: PropTypes.bool,
  labelClassName: PropTypes.string,
  readOnly: PropTypes.bool
};
