import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import FieldError from '@/common/components/field-error/field-error.component';
import FieldLabel from '../field-label/field-label.component';

export default function Select({
  options,
  placeholder,
  name = null,
  onChange = null,
  defaultValue = null,
  value = null,
  className = '',
  disabled = false,
  errors = null,
  register = null,
  label = null,
  isRequired = false,
  inlineLabel = false,
  labelClassName = '',
  readOnly = false
}) {
  return (
    <div
      className={`${
        inlineLabel
          ? ' tw-grid tw-w-full tw-grid-cols-[130px_1fr] tw-items-center'
          : 'tw-flex tw-w-full tw-flex-col tw-gap-2 tw-text-xs tw-font-medium tw-capitalize tw-not-italic tw-leading-6 tw-text-text-black'
      }`}
    >
      {label && (
        <FieldLabel label={label} isRequired={isRequired} className={labelClassName} />
      )}

      <div className="tw-w-full">
        <Autocomplete
          {...(register && register(`${name}`))}
          name={name}
          disablePortal
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingLeft: '0px!important'
            }
          }}
          // disableClearable
          options={options ?? []}
          renderOption={(props, option) => (
            <li {...props} key={option?.label}>
              {option?.label}
            </li>
          )}
          className={`select !tw-p-0 ${className} ${disabled ? 'disabled-input' : ''}  `}
          disabled={disabled}
          readOnly={readOnly}
          {...(value && { value })}
          {...(onChange && { onChange })}
          defaultValue={defaultValue}
          isOptionEqualToValue={(option, value) =>
            option && option.label === value && value.label
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: {
                  fontSize: 14,
                  borderColor: errors && errors[name] ? 'red' : ''
                }
              }}
              {...(register && register(name))}
              className={`default-input input-field !tw-p-0 !tw-text-[14px] ${className} `}
              placeholder={placeholder}
            />
          )}
        />

        {errors && errors[name] && (
          <FieldError className="tw-mt-1" error={errors[name].message} />
        )}
      </div>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // label should be unique because by default mui use label as key
      value: PropTypes.string
      //   Besides label we can send anything in the object, onChange value will give us the whole object
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string
  }),
  value: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  inlineLabel: PropTypes.bool,
  labelClassName: PropTypes.string,
  readOnly: PropTypes.bool
};
