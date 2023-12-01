import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import DownloadDropdownBtn from '../download-dropdown-button/download-dropdown-button.component';

export default function StepperFooter({
  handleTabClick,
  back = null,
  setIsSubmit = null,
  submitText = null,
  finish = false,
  disabled = false
}) {
  const dropdownoptions = [
    { id: 1, name: 'option1', link: '/option1' },
    { id: 2, name: 'option2', link: '/option2' },
    { id: 3, name: 'option3', link: '/option3' }
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const convertedFrom = searchParams.get('from');
  const id = searchParams.get('id');
  const displayId = searchParams.get('d-id');

  return (
    <div className="footer-buttons">
      <div className="back-button">
        {back && (
          <CustomButton
            className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-[35px] tw-py-2 tw-text-sm tw-font-bold tw-leading-[21px] tw-text-text-medium-gray"
            text="Back"
            onClick={() => {
              if (handleTabClick) handleTabClick(back);
              if (
                window.location.pathname?.includes([
                  'delivery' || 'offer' || 'order' || 'invoices'
                ])
              ) {
                if (convertedFrom) {
                  router.push(
                    `${window.location.pathname}?from=${convertedFrom}&id=${id}&d-id=${displayId}&currentTab=${DOCUMENT_TABS.LINE_ITEMS}&completedTabs=${DOCUMENT_TABS.CUSTOMER_DETAILS}`
                  );
                } else {
                  router.push(
                    `${window.location.pathname}?id=${id}&d-id=${displayId}&currentTab=${DOCUMENT_TABS.LINE_ITEMS}&completedTabs=${DOCUMENT_TABS.CUSTOMER_DETAILS}`
                  );
                }
              }
            }}
          />
        )}
      </div>
      {finish ? (
        <div className="next-button">
          <DownloadDropdownBtn
            className="btn-primary"
            text="Download Orders"
            dropdownoptions={dropdownoptions}
          />
        </div>
      ) : (
        <div className="next-button">
          <CustomButton
            disabled={disabled}
            type="submit"
            className="btn-primary tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-normal-case tw-leading-6"
            onClick={() => {
              if (setIsSubmit) {
                setIsSubmit(true);
              }
            }}
            text={submitText ?? 'Save and Next'}
          />
        </div>
      )}
    </div>
  );
}

StepperFooter.propTypes = {
  handleTabClick: PropTypes.func,
  back: PropTypes.string,
  finish: PropTypes.bool,
  setIsSubmit: PropTypes.func,
  submitText: PropTypes.string,
  disabled: PropTypes.bool
};
