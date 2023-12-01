import { DialogContent } from '@mui/material/node';
import React from 'react';
import PropTypes from 'prop-types';

function ExpenditurePdf({ viewReceipt }) {
  return (
    <div className={`expenditure-${viewReceipt.id}`}>
      <div className="my-scroll tw-max-h-full tw-max-w-full tw-overflow-y-auto">
        <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
          <div className=" tw-flex tw-min-h-[798px]">
            <div className="tw-w-full tw-min-w-[495px] tw-px-6">
              <div className="tw-flex tw-justify-end tw-pt-[21px] hover:tw-cursor-pointer"></div>
              <div className="tw-mt-[43px] tw-flex tw-items-center tw-justify-between">
                <h2 className="tw-text-base tw-font-bold tw-not-italic tw-leading-6 tw-text-text-black">
                  Expenditure Receipt
                </h2>
              </div>
              <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-4">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Customer:
                  </p>
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    {`${viewReceipt?.customer && viewReceipt?.customer?.companyName} ${
                      viewReceipt?.customer?.firstName || viewReceipt?.customer?.firstName
                        ? `( ${
                            viewReceipt?.customer && viewReceipt?.customer?.firstName
                              ? viewReceipt?.customer?.firstName
                              : ''
                          } ${
                            viewReceipt?.customer && viewReceipt?.customer?.lastName
                              ? viewReceipt?.customer?.lastName
                              : ''
                          } )`
                        : ''
                    } `}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Cash Discount:
                  </p>
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    {viewReceipt?.cashDiscount ?? 0} %
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Cash Discount Validity Date:
                  </p>
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    {viewReceipt?.cashDiscountValidity}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Payment Amount:
                  </p>
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    € {viewReceipt?.paymentAmount}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Due Date:
                  </p>
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    {viewReceipt?.dueDate}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Receipt Date:
                  </p>
                  <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    {viewReceipt?.receiptDate}
                  </p>
                </div>
              </div>
              <div className="tw-mt-6 tw-flex tw-w-full tw-flex-col tw-gap-2 tw-rounded-xl tw-bg-[#FBFBFB] tw-px-4 tw-pb-[17px] tw-pt-2.5">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Customer:
                  </p>
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    {`${viewReceipt?.customer && viewReceipt?.customer?.companyName} ${
                      viewReceipt?.customer?.firstName || viewReceipt?.customer?.firstName
                        ? `( ${
                            viewReceipt?.customer && viewReceipt?.customer?.firstName
                              ? viewReceipt?.customer?.firstName
                              : ''
                          } ${
                            viewReceipt?.customer && viewReceipt?.customer?.lastName
                              ? viewReceipt?.customer?.lastName
                              : ''
                          } )`
                        : ''
                    } `}{' '}
                  </p>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    Full Payment
                  </p>
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                    € {viewReceipt?.paymentAmount}
                  </p>
                </div>
                <div className="tw-my-2 tw-min-h-[1px] tw-w-full tw-bg-[#CFCFCF]"></div>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                    Balance
                  </p>
                  <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                    €
                    {Number(viewReceipt?.paymentAmount) -
                      Number(viewReceipt?.paymentAmount) *
                        (Number(viewReceipt?.cashDiscount) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </div>
  );
}

export default ExpenditurePdf;

ExpenditurePdf.propTypes = {
  viewReceipt: PropTypes.func
};
