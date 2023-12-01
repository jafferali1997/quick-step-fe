import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import MultiSelect from '@/common/components/multi-select/multi-select.component';
import OtpInput from '@/common/components/otp-input/otp-input.component';
import Select from '@/common/components/select/select.component';
import TextArea from '@/common/components/text-area/text-area.component';
import ErrorIcon from '@/common/icons/error.icon';
import SuccessIcon from '@/common/icons/success.icon';

export default function Input() {
  return (
    <>
      <div className="tw-m-5">
        <h3 className="tw-text-2xl tw-font-bold">Multi Select</h3>
        <hr />
        <MultiSelect
          options={[
            { id: '1', label: 'Test 1', value: 'test1' },
            { id: '2', label: 'Test 2', value: 'test2' },
            { id: '3', label: 'Test 3', value: 'test3' }
          ]}
          handleChange={() => {}}
        />
      </div>
      <div className="tw-m-5">
        <h3 className="tw-text-2xl tw-font-bold">Input Fields</h3>
        <hr />
        <div className="tw-m-5 tw-flex tw-flex-row tw-gap-2">
          <div className="tw-w-1/2">
            {/* <CustomSelect
              label="Simple Select"
              placeholder="Select Gender"
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
            /> */}
          </div>
          <div className="tw-w-1/2">
            <Select
              options={[
                { label: 'Test 1', value: 'test1' },
                { label: 'Test 2', value: 'test2' },
                { label: 'Test 3', value: 'test3' }
              ]}
              // defaultValue={{ label: 'Test 3', value: 'test3' }}
              placeholder="Single Select with Search Option"
            />
          </div>
        </div>
        <div className="tw-m-5">
          <CustomInput
            type="text"
            name="firstName"
            label="Simple Field:"
            placeholder="Simple Input Field with required"
            isRequired
          />
        </div>
        <div className="tw-m-5">
          <CustomInput
            type="text"
            name="inlineLabelField"
            label="Input Field With Inline Label:"
            placeholder="Input Field With Inline Label:"
            inlineLabel
          />
        </div>
        <div className="tw-m-5 tw-flex tw-flex-row tw-gap-2">
          <div className="tw-w-1/2">
            <CustomInput
              type="text"
              name="firstName"
              label="Input Field with Start Icon:"
              placeholder="First Name"
              className="tw-mr-2"
              isRequired
              startIcon={<SuccessIcon />}
            />
          </div>
          <div className="tw-w-1/2">
            <CustomInput
              type="text"
              name="firstName"
              label="Input Field with End Icon:"
              placeholder="First Name"
              isRequired
              startIcon={<SuccessIcon />}
            />
          </div>
        </div>
        <div className="tw-m-5 tw-flex tw-flex-row">
          <div className="tw-w-1/2">
            <CustomInput
              type="text"
              name="firstName"
              label="Input Field with Start Icon:"
              placeholder="First Name"
              isRequired
              inlineLabel
              startIcon={<SuccessIcon />}
              endIcon={<ErrorIcon />}
            />
          </div>
        </div>
        <div className="tw-m-5">
          <CustomInput
            type="password"
            name="passwordField"
            label="Password:"
            placeholder="password"
          />
        </div>
        <div className="tw-m-5">
          <CustomInput
            type="text"
            name="errorField"
            label="Input Field With Error:"
            placeholder="Input Field With Error:"
            errors={{ errorField: { message: 'Wrong Input' } }}
          />
        </div>
        <div className="tw-m-5">
          <TextArea label="Text Area" placeholder="Text Area" />
        </div>
      </div>
      <div className="tw-m-5">
        <h3 className="tw-text-2xl tw-font-bold">Otp Input</h3>
        <hr />
        <div className="tw-m-5">
          <OtpInput value="1234" onChange={(e) => console.log(e)} maxInput={4} />
        </div>
      </div>
    </>
  );
}
