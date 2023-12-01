import CustomButton from '@/common/components/custom-button/custom-button.component';
import ArrowLeftIcon from '@/common/icons/arrow-left.icon';
import ErrorIcon from '@/common/icons/error.icon';
import SuccessIcon from '@/common/icons/success.icon';

export default function Button() {
  return (
    <div className="tw-m-5">
      <h3 className="tw-text-2xl tw-font-bold">Buttons</h3>
      <hr />
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-5">
        <CustomButton text="Primary Button" className="btn-primary tw-m-5" />
        <CustomButton
          text="Secondary Button"
          className="btn-secondary tw-m-5"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <CustomButton
          text="Disabled Button"
          className="btn-primary tw-m-5"
          onClick={() => {
            console.log('clicked');
          }}
          disabled
        />
        <CustomButton text="Outline Button" className="btn-outline tw-m-5" />
        <CustomButton
          text="Disabled Outline Button"
          className="btn-outline tw-m-5"
          disabled
        />
      </div>
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-5">
        <CustomButton
          text="Link Primary Button"
          className="btn-primary tw-m-5"
          href="#"
        />
        <CustomButton
          text="Link Secondary Button"
          className="btn-secondary tw-m-5"
          href="#"
        />
        <CustomButton
          text="Link Outline Button"
          className="btn-outline tw-m-5"
          href="#"
        />
      </div>
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-5">
        <CustomButton
          text="Left Icon Button"
          className="btn-primary tw-m-5"
          startIcon={<SuccessIcon />}
        />
        <CustomButton
          text="Right Icon Button"
          className="btn-secondary tw-m-5"
          endIcon={<ArrowLeftIcon className="tw-text-white" />}
        />
        <CustomButton
          text="Both Icon Button"
          className="btn-outline tw-m-5"
          href="#"
          startIcon={<ErrorIcon />}
          endIcon={<SuccessIcon />}
        />
      </div>
    </div>
  );
}
