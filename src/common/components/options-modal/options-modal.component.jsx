import { Dialog } from '@mui/material/node';
import PropTypes from 'prop-types';
import CustomButton from '../custom-button/custom-button.component';

function OptionsModal({
  ref,
  openPopup = false,
  closePopup,
  messageLable = '',
  firstOptionLabel = '',
  secondOptionLabel = '',
  handleFirstOption,
  handleSecondOption
}) {
  return (
    <div>
      <Dialog
        className="scrol-bar"
        ref={ref}
        open={openPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '471px',
              padding: '40px 24px'
            }
          },
          zIndex: 13000
        }}
      >
        <div className="tw-max-h-full tw-w-[471px] tw-max-w-full tw-px-6 ">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
            <div className="hover:tw-cursor-pointer" onClick={() => closePopup(false)}>
              <img
                src="/assets/icons/gray-cross-img.svg"
                className="tw-h-4 tw-w-4"
                alt="cancel"
              />
            </div>
          </div>
          <div>
            {' '}
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
              <div>
                <img
                  src="/assets/icons/gray-question.svg"
                  className="tw-h-[72px] tw-w-[73px]"
                  alt="img"
                />
              </div>
              <div className="tw-mt-2">{messageLable}</div>
              <div className="tw-mt-[14px] tw-flex tw-gap-[32px]">
                <CustomButton
                  className="tw-flex tw-h-[40px] tw-items-center tw-justify-center tw-rounded-md tw-border-[1.5px] tw-border-solid tw-border-primary  tw-text-sm tw-font-medium tw-not-italic tw-leading-[26px] tw-text-primary"
                  text={firstOptionLabel}
                  onClick={handleFirstOption}
                />
                <CustomButton
                  className="btn-primary tw-h-[40px]  tw-items-center tw-px-[30px] tw-py-[7px] tw-text-sm tw-font-medium tw-not-italic tw-leading-[normal]"
                  text={secondOptionLabel}
                  onClick={handleSecondOption}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

OptionsModal.propTypes = {
  ref: PropTypes.string,
  openPopup: PropTypes.bool,
  closePopup: PropTypes.bool,
  messageLable: PropTypes.string,
  firstOptionLabel: PropTypes.string,
  secondOptionLabel: PropTypes.string,
  handleFirstOption: PropTypes.func,
  handleSecondOption: PropTypes.func
};

export default OptionsModal;
