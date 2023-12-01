'use client';

import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FieldError from '../field-error/field-error.component';
import FieldLabel from '../field-label/field-label.component';

export default function CustomSelect({
  options,
  placeholder = '',
  className = '',
  value = null,
  onChange = null,
  defaultValue = '',
  register = null,
  name,
  errors = null,
  label = null,
  isRequired = false,
  inlineLabel = false,
  labelClassName = '',
  control = null,
  disabled = false
}) {
  return (
    <div
      className={`${
        inlineLabel
          ? 'tw-grid tw-w-full  tw-grid-cols-[130px_1fr] tw-items-center'
          : 'tw-flex tw-flex-col tw-gap-[8px] tw-text-xs tw-font-medium tw-capitalize tw-not-italic tw-leading-6 tw-text-text-black'
      }`}
    >
      {label && (
        <FieldLabel label={label} isRequired={isRequired} className={labelClassName} />
      )}

      <div className="tw-w-full">
        {control && (
          <Controller
            name={name}
            {...(control && { control })}
            disabled={disabled}
            defaultValue={defaultValue !== '' ? defaultValue : placeholder}
            className="tw-w-fit"
            render={({ field }) => (
              <Select
                {...field}
                {...(onChange && { onChange })}
                {...(value && { value })}
                {...(register && register(`${name}`))}
                className={`tw-h-[40px] tw-w-full !tw-py-0 tw-px-[18px] tw-font-dm tw-text-text-dark-gray placeholder:tw-text-text-ultra-light-gray ${
                  errors && errors[name] && 'error-field'
                } ${className} ${!disabled || 'disabled-input'} `}
              >
                <MenuItem
                  className="tw-text-secondary-black"
                  value={defaultValue !== '' ? defaultValue : placeholder}
                  selected
                  disabled
                >
                  <p className="tw-pt-[4px] tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                    {defaultValue !== '' ? defaultValue : placeholder}
                  </p>
                </MenuItem>
                {options?.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        )}

        {!control && (
          <Select
            name={name}
            defaultValue={defaultValue}
            {...(onChange && { onChange })}
            {...(value && { value })}
            className={`tw-h-[40px] tw-w-full !tw-py-0 tw-px-[18px] tw-font-dm tw-text-text-dark-gray placeholder:tw-text-text-ultra-light-gray disabled:selection:tw-text-text-ultra-light-gray ${
              errors && errors[name] && 'error-field'
            } ${className} ${!disabled || 'disabled-input'} `}
            disabled={disabled}
          >
            {/* <MenuItem
              className="tw-text-disabled-input"
              value={defaultValue}
              selected
              disabled
            >
              {defaultValue}
            </MenuItem> */}
            {options?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}

        {errors && errors[name] && (
          <FieldError className="tw-mt-1" error={errors[name].message} />
        )}
      </div>
    </div>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  isRequired: PropTypes.bool,
  register: PropTypes.func,
  inlineLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  labelClassName: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any
};
