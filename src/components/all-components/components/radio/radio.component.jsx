'use client';

import { useState } from 'react';
import ControlledRadioGroup from '@/common/components/custom-radio/controlled-radio-group/controlled-radio-group.component';
import CustomRadio from '@/common/components/custom-radio/custom-radio.component';
import CustomRadioGroup from '@/common/components/radio-group/radio-group.component';

export default function Radio() {
  const [radio, setRadio] = useState('radio1');

  return (
    <>
      <div className="tw-m-5">
        <h3 className="tw-text-2xl tw-font-bold">Radio</h3>
        <hr />
        <div className="tw-m-5">
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
            <CustomRadio value="v1" name="radio" label="Small Radio" size="sm" />
            <CustomRadio value="v2" name="radio" label="Default Radio" defaultChecked />
            <CustomRadio value="v3" name="radio" label="Disabled Radio" disabled />
            <CustomRadio
              value="v4"
              name="radio4"
              label="Disabled Checked Switch"
              defaultChecked
              disabled
            />
          </div>
          <hr />
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
            <CustomRadioGroup
              radioOptions={[
                { label: 'Radio 1', value: 'radio1', defaultChecked: true },
                { label: 'Radio 2', value: 'radio2' },
                { label: 'Radio 3', value: 'radio3' }
              ]}
              label="Radio Group (Select One):"
            />
          </div>
        </div>
      </div>
      <div className="tw-m-5">
        <h3 className="tw-text-2xl tw-font-bold">Controlled Radio Group</h3>
        <hr />
        <div className="tw-m-5">
          <ControlledRadioGroup
            radioOptions={[
              {
                label: 'Radio 1',
                value: 'radio1',
                element: <h3 className="tw-text-blue-700">Radio 1 is selected</h3>
              },
              {
                label: 'Radio 2',
                value: 'radio2',
                element: <h3 className="tw-text-blue-700">Radio 2 is selected</h3>
              },
              {
                label: 'Radio 3',
                value: 'radio3',
                element: <h3 className="tw-text-blue-700">Radio 3 is selected</h3>
              }
            ]}
            label="Radio Group (Select One):"
            name="radio"
            selectedValue={radio}
            setSelectedValue={setRadio}
          />
          {/* {radio === 'radio1' && (
            <h3 className="tw-text-blue-700">Radio 1 is selected</h3>
          )}
          {radio === 'radio2' && (
            <h3 className="tw-text-gray-700">Radio 2 is selected</h3>
          )}
          {radio === 'radio3' && <h3 className="tw-text-red-700">Radio 3 is selected</h3>} */}
        </div>
      </div>
    </>
  );
}
