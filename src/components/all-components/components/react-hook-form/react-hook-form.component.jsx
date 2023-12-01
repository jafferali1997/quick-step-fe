'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import SimpleSelect from '@/common/components/custom-select/simple-select.component';
// import Select from '@/common/components/select/select.component';
import CustomCheckbox from '@/common/components/custom-checkbox/custom-checkbox.component';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import CustomRadioGroup from '@/common/components/radio-group/radio-group.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';

const validationSchema = yup.object({
  firstName: yup.string().max(5, 'company name must be at most 5 characters long'),
  select: yup.string().required(),
  gender: yup.string().required()
});

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    setValue('select', 'OTHER');
    // setValue('gender', 'FEMALE');
  }, []);

  return (
    <div className="tw-m-5">
      <h3 className="tw-text-2xl tw-font-bold">React Hook Form</h3>
      <hr />
      <div className="tw-m-5 tw-border-text-dark-gray">
        <form
          onSubmit={handleSubmit((data) => {
            // alert(JSON.stringify(errors))
            alert(JSON.stringify(data));
          })}
        >
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1">
            <div className="tw-w-1/2">
              <CustomInput
                type="text"
                name="firstName"
                label="First Name:"
                placeholder="First Name"
                register={register}
                errors={errors}
                isRequired
              />
            </div>
            <div className="tw-w-1/2">
              <CustomInput
                type="text"
                name="lastName"
                label="Last Name:"
                placeholder="Last Name"
                register={register}
                isRequired
              />
            </div>
          </div>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1">
            <div className="tw-w-1/2">
              <CustomSelect
                label="Gender"
                placeholder="Select Gender"
                name="gender"
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' }
                ]}
                control={control}
                errors={errors}
              />
            </div>
            {/* <div className="tw-w-1/2">
              <SimpleSelect
                label="Select Gender"
                placeholder="Select Gender"
                name="select"
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' },
                  
                ]}
                register={register}
                errors={errors}
              />
            </div> */}
            <div className="tw-w-1/2">
              {/* <Select
                label="Select User"
                placeholder="Select User"
                name="user"
                options={[
                  { label: 'Hamza', value: 'hamza' },
                  { label: 'Areeb', value: 'areeb' },
                  { label: 'Jaffer', value: 'jaffer' }
                ]}
                register={register}
              /> */}
              <section>
                <label>MUI Select</label>
                <Controller
                  name="Select_MUI"
                  control={control}
                  defaultValue="20"
                  className="default-input input-field"
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  )}
                />
              </section>
            </div>
          </div>
          <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1">
            <div className="tw-w-1/2">
              <CustomCheckbox
                name="checkbox"
                label="Checkbox"
                register={register}
                isRequired
              />
            </div>
            <div className="tw-w-1/2">
              <CustomSwitch name="switch" label="Switch" register={register} isRequired />
            </div>

            <div className="tw-w-1/2">
              <CustomRadioGroup
                register={register}
                name="radio"
                label="Select Gender"
                radioOptions={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' }
                ]}
                defaultValue="other"
              />
            </div>
            <CustomButton type="Submit" className="btn-primary" text="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
