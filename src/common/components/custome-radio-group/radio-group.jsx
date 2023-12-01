import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material/node';
import React from 'react';
import PropTypes from 'prop-types';

function CustomRadioGroup({ value, onChange, options }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={onChange}
        className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray"
      >
        {options?.map((op) => (
          <FormControlLabel value={op.value} control={<Radio />} label={op.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

CustomRadioGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf
};

export default CustomRadioGroup;
