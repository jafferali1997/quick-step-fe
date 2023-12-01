import { Dialog, DialogContent } from '@mui/material/node';
import PropTypes from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import TextArea from '@/common/components/text-area/text-area.component';
import CloseIcon from '@/common/icons/Close.icon';
import FileIcon from '@/common/icons/file.icon';
import LinkIcon from '@/common/icons/link.icon';
import ReasonIcon from '@/common/icons/reason.icon';
import capitalizeFirstLetter from '@/common/utils/capitalize-first-letter';
import formatDate from '@/common/utils/formate-date';
import useOverView from '@/components/order/view/components/overview/use-overview.hook';
import FileInput from '@/common/components/file-input/file-input.component';

export default function OrderAddData({
  handleData = null,
  rowData,
  id,
  action,
  allData
}) {
  const {
    orderComments,
    handleComment,
    orderHistory,
    ref,
    openPopup,
    setOpenPopup,
    comment,
    handleAddComment,
    setComment,
    reason,
    setReason,
    setRejectionOpenPopup,
    handleAddReason,
    refRejection,
    rejectionOpenPopup
  } = useOverView({
    action,
    allData,
    rowData
  });

  return (
    <div className="tw-absolute   tw-w-[1071px]  ">
      <tr>
        <td>
          <div
            className={`jut tw-mx-6 tw-my-2 tw-grid tw-h-[168px] tw-w-full ${
              rowData.status.toLowerCase() === 'rejected'
                ? 'gap-4  tw-grid-cols-4'
                : 'gap-4 tw-grid-cols-3 '
            }  tw-gap-[10px] tw-rounded-[9px] tw-border tw-border-solid tw-border-[#E7EAEE] tw-bg-[#fbfbfb] tw-py-4`}
          >
            <div
              className={`tw-border-r tw-border-solid tw-border-r-disabled-input tw-p-2 ${
                rowData.status.toLowerCase() === 'rejected' ? '' : 'tw-min-w-0 '
              }`}
            >
              <div className="tw-flex tw-justify-between">
                <h5 className=" tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Comments
                </h5>
                <CustomButton
                  id="comment"
                  text="Add Comment"
                  name="addComment"
                  onClick={() => handleComment(rowData)}
                  className="tw-items tw-h-9 tw-justify-center tw-rounded-[3px] tw-bg-[#047857] tw-p-2 tw-font-medium tw-not-italic tw-leading-[18px] hover:tw-bg-[#047857]"
                />
              </div>
              <div className="primary-scroll tw-mt-3 tw-max-h-[79px] tw-overflow-y-auto">
                {orderComments?.map((order) => {
                  return (
                    <div
                      className={`tw-mt-3 ${
                        rowData.status.toLowerCase() === 'rejected'
                          ? 'tw-w-[276px]'
                          : 'tw-w-[335px]'
                      }tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-p-2`}
                    >
                      <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                        <span className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                          {' '}
                          Created by:{' '}
                        </span>{' '}
                        {order.comment && order.comment.createdByName}
                      </p>
                      <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                        <span className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                          {' '}
                          Created at:{' '}
                        </span>{' '}
                        {formatDate(order.comment && order.comment.updatedAt) ||
                          formatDate(order.comment && order.comment.createdAt)}
                      </p>
                      <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                        {order.comment && order.comment.comment}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`tw-border-r tw-border-solid tw-border-r-disabled-input tw-p-2 ${
                rowData.status.toLowerCase() === 'rejected' ? '' : 'tw-min-w-0 '
              }`}
            >
              <FileInput module={rowData} moduleName="ORDER" />
            </div>
            <div
              className={` ${
                rowData.status.toLowerCase() === 'rejected'
                  ? 'tw-border-r tw-border-solid tw-border-r-disabled-input'
                  : 'tw-min-w-[350px]'
              } `}
            >
              <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px]">
                History
              </div>
              <div className="primary-scroll tw-max-h-[100px] tw-overflow-y-auto ">
                <p className="tw-mt-2 tw-border-b tw-border-solid tw-border-b-disabled-input tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                  {rowData?.createdByName}{' '}
                  <span className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                    {' '}
                    create Orders at{' '}
                  </span>{' '}
                  {formatDate(rowData?.createdAt)}
                </p>
                {rowData && rowData.status === 'DRAFT' ? (
                  <p className="tw-mt-2 tw-mt-2 tw-flex tw-gap-1 tw-border-b tw-border-solid tw-border-b-disabled-input tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                    Status change:
                    <span className="tw-text-text-medium-gray">Draft</span>
                  </p>
                ) : (
                  rowData &&
                  rowData.status === 'OPEN' && (
                    <p className="tw-mt-2 tw-flex tw-gap-1 tw-border-b tw-border-solid tw-border-b-disabled-input tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                      Status change:
                      <span className="tw-text-text-medium-gray">Open</span>
                    </p>
                  )
                )}
                {orderHistory &&
                  orderHistory?.map((order) => {
                    return (
                      <>
                        {rowData &&
                        rowData?.status !== 'DRAFT' &&
                        order.currentStatus !== 'DRAFT' ? (
                          <p className="tw-mt-2 tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                            Status change:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {order && order.currentStatus
                                ? capitalizeFirstLetter(order.currentStatus)
                                : ''}
                            </span>{' '}
                            to{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {order && order.previousStatus
                                ? capitalizeFirstLetter(order.previousStatus)
                                : ''}
                            </span>
                            <br />
                            Status change by:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {order && order.createdByName
                                ? capitalizeFirstLetter(order.createdByName)
                                : ''}
                            </span>{' '}
                            <br />
                            Status change at:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {formatDate(order?.updatedAt) ||
                                formatDate(order?.createdAt)}
                            </span>{' '}
                          </p>
                        ) : null}

                        {order?.convertedFrom && (
                          <p className="tw-mt-2 tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                            Converted From:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {order && order.convertedFrom
                                ? capitalizeFirstLetter(order.convertedFrom)
                                : ''}
                            </span>{' '}
                            <br />
                            Converted To:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              Order
                            </span>{' '}
                            <br />
                            Converted by:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {order && order.createdByName
                                ? capitalizeFirstLetter(order.createdByName)
                                : ''}
                            </span>{' '}
                            <br />
                            Converted at:{' '}
                            <span className="tw-mr-[1px] tw-text-text-medium-gray">
                              {formatDate(order?.updatedAt) ||
                                formatDate(order?.createdAt)}
                            </span>{' '}
                          </p>
                        )}
                      </>
                    );
                  })}
              </div>
            </div>

            {rowData.status.toLowerCase() === 'rejected' && (
              <div className="tw-overflow-y-hidden tw-p-2">
                <h5 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Reason
                </h5>
                <p className="tw-mt-3 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                  {rowData?.rejectionReason && rowData?.rejectionReason}
                </p>
              </div>
            )}
          </div>
        </td>
      </tr>
      <Dialog
        className="scrol-bar"
        ref={ref}
        open={openPopup}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '479px',
              borderRadius: '20px'
            }
          },
          zIndex: 13000
        }}
      >
        <div className="tw-h-full tw-w-full">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between tw-bg-[#e3ecf4] tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-black">
              Comments
            </div>
            <div className="hover:tw-cursor-pointer" onClick={() => setOpenPopup(false)}>
              <CloseIcon />
            </div>
          </div>
          <DialogContent>
            <div className="tw-w-full">
              <TextArea
                label="Add Comment"
                name="comment "
                placeholder="Enter Comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <div className="tw-mt-6 tw-flex tw-justify-between tw-gap-[20px]">
                <div />

                <div className="tw-flex tw-justify-end tw-gap-5">
                  <CustomButton
                    onClick={() => setOpenPopup(false)}
                    text="Close"
                    className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-medium-gray"
                  />
                  <CustomButton
                    onClick={() => handleAddComment(id)}
                    name="save"
                    text="Save"
                    className="btn-primary  tw-items-center tw-justify-center tw-px-4 tw-py-[11px] tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px]"
                    disabled={!comment}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      <Dialog className="scrol-bar" ref={refRejection} open={rejectionOpenPopup}>
        <div className="tw-max-h-full tw-w-[909px] tw-max-w-full ">
          <div className="tw-flex tw-h-14 tw-items-center  tw-justify-between tw-bg-[#e3ecf4] tw-px-5">
            <div className=" tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
              Reason
            </div>
            <div
              className="hover:tw-cursor-pointer"
              onClick={() => setRejectionOpenPopup(false)}
            >
              <ReasonIcon />
            </div>
          </div>
          <DialogContent>
            <div className="tw-w-full">
              <TextArea
                label="Rejected reason"
                name="reason "
                placeholder="Enter Reason"
                type="tex"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <div className="tw-mt-6 tw-flex tw-justify-between tw-gap-[20px]">
                <div />
                <div className="tw-flex tw-justify-end tw-gap-5">
                  <CustomButton
                    onClick={() => setRejectionOpenPopup(false)}
                    text="Close"
                    className="tw-border tw-border-solid tw-border-text-ultra-light-gray tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-leading-[17.5px] tw-text-text-medium-gray"
                  />
                  <CustomButton
                    onClick={handleAddReason}
                    name="add"
                    text="Add"
                    className="btn-primary tw-items-center tw-justify-center tw-px-4 tw-py-[11px] tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px]"
                    disabled={!reason}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
OrderAddData.propTypes = {
  id: PropTypes.string,
  rowData: PropTypes.arrayOf,
  handleData: PropTypes.func,
  action: PropTypes.func,
  allData: PropTypes.func
};
