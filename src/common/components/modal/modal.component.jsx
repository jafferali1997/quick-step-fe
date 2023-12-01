import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import useModal from './use-modal.hook';

export default function Modal({ show = false, title, children, onClose }) {
  const { open, register, handleSubmit, setValue, errors, handleClose } = useModal(show);

  return (
    <Dialog open={show} onClose={onClose} className="custom_modal_design">
      <div className="my-scroll tw-min-w-[429px] tw-overflow-y-auto">
        <div className="tw-flex tw-items-center tw-justify-between tw-bg-[#E3ECF4] tw-px-4 tw-py-[14px] ">
          <DialogTitle className="tw-bg-skyblue tw-rounded-tl-[20px] tw-rounded-tr-[20px] tw-px-0 tw-py-0 tw-font-dm tw-text-xl tw-font-bold tw-leading-8 tw-text-text-dark-gray">
            {title}
          </DialogTitle>
          <div className="hover:tw-cursor-pointer" onClick={() => onClose()}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5839_112469)">
                <path
                  d="M9.46582 8.01169L15.696 1.78141C16.1014 1.37615 16.1014 0.720878 15.696 0.315665C15.2907 -0.0895966 14.6355 -0.0895966 14.2303 0.315665L7.99993 6.5459L1.76984 0.315665C1.36438 -0.0895966 0.709353 -0.0895966 0.304092 0.315665C-0.101364 0.720926 -0.101364 1.37615 0.304092 1.78141L6.53413 8.01169L0.30414 14.2419C-0.101315 14.6472 -0.101315 15.3025 0.30414 15.7077C0.40027 15.8041 0.514502 15.8805 0.640272 15.9327C0.766042 15.9848 0.900871 16.0115 1.03701 16.0114C1.30233 16.0114 1.56774 15.9098 1.76988 15.7077L7.99993 9.47744L14.2303 15.7077C14.3264 15.8041 14.4406 15.8805 14.5664 15.9326C14.6922 15.9847 14.827 16.0115 14.9631 16.0114C15.2284 16.0114 15.4939 15.9098 15.696 15.7077C16.1014 15.3024 16.1014 14.6472 15.696 14.2419L9.46582 8.01169Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_5839_112469">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <DialogContent className="tw-px-4 !tw-pt-7 tw-pb-6">{children}</DialogContent>
      </div>
    </Dialog>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
  // onSubmit: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  // validationSchema: PropTypes.object
};
