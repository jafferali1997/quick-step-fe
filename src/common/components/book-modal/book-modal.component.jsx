import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

function BookModal({
  bookingModule,
  ref,
  openPopup,
  setOpenPopup,
  handleBook,
  handleSave
}) {
  return (
    <Dialog
      className="scrol-bar"
      ref={ref}
      open={openPopup}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '471px',
            padding: '40px 24px',
            borderRadius: '20px'
          }
        },
        zIndex: 13000
      }}
    >
      <div className="tw-max-h-full tw-w-[471px] tw-max-w-full tw-px-6 ">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
          <div className="hover:tw-cursor-pointer" onClick={() => setOpenPopup(false)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.46582 8.01169L15.696 1.78141C16.1014 1.37615 16.1014 0.720878 15.696 0.315665C15.2907 -0.0895966 14.6355 -0.0895966 14.2303 0.315665L7.99993 6.5459L1.76984 0.315665C1.36438 -0.0895966 0.709353 -0.0895966 0.304092 0.315665C-0.101364 0.720926 -0.101364 1.37615 0.304092 1.78141L6.53413 8.01169L0.30414 14.2419C-0.101315 14.6472 -0.101315 15.3025 0.30414 15.7077C0.40027 15.8041 0.514502 15.8805 0.640272 15.9327C0.766042 15.9848 0.900871 16.0115 1.03701 16.0114C1.30233 16.0114 1.56774 15.9098 1.76988 15.7077L7.99993 9.47744L14.2303 15.7077C14.3264 15.8041 14.4406 15.8805 14.5664 15.9326C14.6922 15.9847 14.827 16.0115 14.9631 16.0114C15.2284 16.0114 15.4939 15.9098 15.696 15.7077C16.1014 15.3024 16.1014 14.6472 15.696 14.2419L9.46582 8.01169Z"
                fill="#7E7D7D"
              />
            </svg>
          </div>
        </div>
        <DialogContent>
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
            <div>
              <svg
                width="73"
                height="72"
                viewBox="0 0 73 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4674_101549)">
                  <path
                    d="M36.5 -0.000244141C16.6028 -0.000244141 0.5 16.1008 0.5 35.9998C0.5 55.8966 16.601 71.9998 36.5 71.9998C56.3972 71.9998 72.5 55.8988 72.5 35.9998C72.5 16.1026 56.399 -0.000244141 36.5 -0.000244141ZM35.4348 52.8493C33.3971 52.8493 31.8334 51.1434 31.8334 49.2004C31.8334 47.2101 33.4445 45.5517 35.4348 45.5517C37.4252 45.5517 39.0834 47.2102 39.0834 49.2005C39.0834 51.1432 37.4723 52.8493 35.4348 52.8493ZM40.8367 34.4158C38.2305 36.4534 38.183 37.875 38.183 40.339C38.183 41.2396 37.7091 42.282 35.3872 42.282C33.4442 42.282 32.781 41.5712 32.781 39.1071C32.781 35.0318 34.5817 33.089 35.9559 31.9043C37.5197 30.5774 40.1734 29.1086 40.1734 26.5498C40.1734 24.3698 38.2779 23.3273 35.9085 23.3273C31.0751 23.3273 32.1177 26.9763 29.5586 26.9763C28.2792 26.9763 26.7155 26.1231 26.7155 24.2751C26.7155 21.7163 29.6534 17.9252 36.0507 17.9252C42.1161 17.9252 46.1441 21.2898 46.1441 25.7441C46.1441 30.1984 42.1161 33.4207 40.8367 34.4158Z"
                    fill="#BBBBBB"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4674_101549">
                    <rect
                      width="72"
                      height="72"
                      fill="white"
                      transform="translate(0.5 -0.000244141)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="tw-mt-2 tw-text-center">
              Choose the option to save the {bookingModule}
            </div>
            <div className="tw-mt-[14px] tw-flex tw-gap-5">
              <CustomButton
                className="tw-items-center tw-justify-center tw-rounded-md tw-border-[1.5px] tw-border-solid tw-border-primary tw-px-[30px] tw-py-[7px] tw-text-base tw-font-bold tw-not-italic tw-leading-[26px] tw-text-primary"
                text="Save as draft"
                onClick={handleSave}
              />
              <CustomButton
                className="btn-primary tw-items-center tw-px-[30px] tw-py-[7px] tw-text-sm tw-font-semibold tw-not-italic tw-leading-[normal]"
                text="Book"
                onClick={handleBook}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

BookModal.propTypes = {
  bookingModule: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(React.Element) })
  ]),
  openPopup: PropTypes.bool.isRequired,
  setOpenPopup: PropTypes.func.isRequired,

  handleBook: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default BookModal;
