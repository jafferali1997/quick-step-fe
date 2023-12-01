import CustomCheckbox from '@/common/components/custom-checkbox/custom-checkbox.component';

export default function Checkbox() {
  return (
    <div className="tw-m-5">
      <h3 className="tw-text-2xl tw-font-bold">Checkbox</h3>
      <hr />
      <div className="tw-m-5">
        <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
          <CustomCheckbox label="Small Checkbox" size="small" />
          <CustomCheckbox label="Default Checkbox" />
          <CustomCheckbox label="Large Checkbox" size="large" />
          <CustomCheckbox label="Checked Checkbox" defaultChecked />
          <CustomCheckbox label="Disabled Checkbox" disabled />
          <CustomCheckbox label="Disabled Checked Checkbox" defaultChecked disabled />
        </div>
      </div>
    </div>
  );
}
