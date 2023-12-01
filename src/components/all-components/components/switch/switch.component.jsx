import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';

export default function Switch() {
  return (
    <div className="tw-m-5">
      <h3 className="tw-text-2xl tw-font-bold">Switch</h3>
      <hr />
      <div className="tw-m-5">
        <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2">
          <CustomSwitch label="Small Switch" size="sm" />
          <CustomSwitch label="Default Switch" defaultChecked />
          <CustomSwitch label="Disabled Switch" disabled />
          <CustomSwitch label="Disabled Checked Switch" defaultChecked disabled />
        </div>
      </div>
    </div>
  );
}
