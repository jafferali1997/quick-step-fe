import { Switch } from '@mui/material';
import PropTypes from 'prop-types';
import FieldLabel from '../field-label/field-label.component';
import FieldError from '../field-error/field-error.component';

export default function CustomSwitch({
  label = null,
  defaultChecked = false,
  checked = false,
  onChange = null,
  parentDivClassName = '',
  className = '',
  size = null,
  disabled = false,
  errors = null,
  register = null,
  name = null,
  isRequired = false,
  inlineLabel = true,
  labelRight = true,
  labelClassName = '',
  readOnly = false
}) {
  return (
    <div className="">
      <div
        className={` ${
          inlineLabel
            ? 'tw-flex tw-w-full tw-flex-row-reverse tw-flex-wrap tw-items-center tw-justify-end tw-gap-3 tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-leading-[18px] tw-text-text-dark-gray'
            : 'tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black'
        } ${parentDivClassName} `}
      >
        {label && !labelRight && (
          <FieldLabel
            label={label}
            isRequired={isRequired}
            className={` ${labelClassName}`}
          />
        )}

        <input
          {...(register && register(`${name}`))}
          name={name}
          type="checkbox"
          className={`custom_switch_input ${className}`}
          {...(checked && { checked })}
          {...(onChange && { onChange })}
          readOnly={readOnly}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />

        {/* <Switch
          {...(register && register(`${name}`))}
          name={name}
          className={`${className}`}
          {...(checked && { checked })}
          {...(onChange && { onChange })}
          readOnly={readOnly}
          defaultChecked={defaultChecked}
          disabled={disabled}
          sx={{
            '--Switch-trackRadius': '153px',
            '--Switch-trackWidth': '56px',
            '--Switch-trackHeight': '24px',
            '--Switch-gap': '8px'
          }}
        /> */}
        {label && labelRight && (
          <FieldLabel label={label} isRequired={isRequired} className={labelClassName} />
        )}
      </div>

      {errors && errors[name] && (
        <FieldError className="tw-mt-1" error={errors[name].message} />
      )}
    </div>
  );
}

CustomSwitch.propTypes = {
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  parentDivClassName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  register: PropTypes.func,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  inlineLabel: PropTypes.bool,
  labelClassName: PropTypes.string,
  readOnly: PropTypes.bool,
  labelRight: PropTypes.bool
};
