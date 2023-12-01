import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import SearchIcon from '@/common/icons/search-icon';
import useTemplateChoose from './use-template-choose.hook';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import InnerTabs from '@/common/components/custom-tab/Inner-tab/inner-tab.component';

export default function TemplateChoose({ handleTabClick, handleTabCompleted }) {
  const { isSubmit, setIsSubmit, onSubmit, tabs, isTemplateSelected } = useTemplateChoose(
    handleTabClick,
    handleTabCompleted
  );
  return (
    <div>
      <div className="tw--ml-3 tw-rounded-[1px] tw-bg-[#fbfbfb] tw-px-5  tw-py-4">
        <div className="tw-bg-white">
          <CustomInput
            startIcon={<SearchIcon />}
            placeholder="Search template by name"
            className="tw-h-[38px]"
          />
        </div>
        <div className="tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-gap-6 tw-pb-2">
          <InnerTabs tabs={tabs} />
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <StepperFooter
          back="footerDetails"
          handleTabClick={handleTabClick}
          setIsSubmit={setIsSubmit}
          disabled={!isTemplateSelected}
        />
      </form>
    </div>
  );
}
TemplateChoose.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
