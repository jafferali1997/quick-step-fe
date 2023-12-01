import { Dialog, DialogContent } from '@mui/material/node';
import React from 'react';
import usePreview from '../create/preview/use-preview.hook';
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  netAmount,
  plusVat,
  taxRate
} from '@/common/utils/product-calculations/amount-calculations';

function ViewReceipt() {
  const { ref, businessData, invoice } = usePreview();
  return (
    <Dialog
      className="scrol-bar"
      ref={ref}
      open={true}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '300px'
          }
        },
        zIndex: 13000
      }}
    >
      <div className="tw-inline-flex tw-flex-col tw-pb-[33.595px] tw-pt-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-dark-gray" />
        </div>
        <DialogContent>
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
            <div>
              <img
                alt="null"
                src="/assets/images/logo.png"
                className="tw-h-[36.40px] tw-w-[112.25px]"
              />
            </div>
            <div className="tw-text-[10px] tw-font-normal tw-not-italic tw-leading-[15px] tw-text-text-dark-gray">
              {businessData.businessName} | {businessData.address}
            </div>
          </div>
          <div className="tw-mt-[25px] tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-items-start tw-gap-2">
              <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                Invoices #
              </span>
              <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                {invoice && invoice.displayId}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2">
              <div className="tw-flex tw-justify-between ">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Company name
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {invoice?.customer && invoice?.customer.companyName}
                </span>
              </div>
              <div className="tw-flex tw-justify-between ">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Name
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {invoice?.customerContactPerson &&
                    invoice.customerContactPerson.firstName}{' '}
                  {invoice?.customerContactPerson &&
                    invoice.customerContactPerson.lastName}
                </span>
              </div>
              <div className="tw-flex tw-justify-between ">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Address
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {invoice?.customer && invoice?.customer.address}
                </span>
              </div>
              <div className="tw-flex tw-justify-between ">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Postal code
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {invoice?.customer && invoice?.customer.postalCode}
                </span>
              </div>

              <div className="tw-flex tw-justify-between ">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  City
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {invoice?.customer && invoice?.customer.city}
                </span>
              </div>

              <div className="tw-flex tw-justify-between ">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Country
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  {invoice?.customer && invoice?.customer.country}
                </span>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2">
              <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                Products
              </div>
              {invoice?.products?.map((product) => {
                return (
                  <div className="tw-flex tw-justify-between ">
                    <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                      {product?.productName || (product && product.product.productName)}
                    </span>
                    <div className="tw-flex tw-flex-col tw-items-end tw-gap-1">
                      <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                        € {product?.netPrice || (product && product.product.netPrice)}
                      </span>
                      <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                        € {product?.quantity || (product && product.product.quantity)} x{' '}
                        {product?.netPrice || (product && product.product.netPrice)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="tw-py-6">
            <hr />
          </div>

          <div className="tw-flex tw-flex-col tw-gap-2">
            <div className="tw-flex tw-justify-between">
              <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                Net Amount
              </span>
              <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                € {lineItemNetAmount(invoice && invoice?.invoiceProducts)}
              </span>
            </div>
            {invoice?.isVat && (
              <div className="tw-flex tw-justify-between">
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  Plus VAT
                </span>
                <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                  € {plusVat(invoice && invoice?.invoiceProducts)}
                </span>
              </div>
            )}
            <div className="tw-flex tw-justify-between">
              <span className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                Invoice Amount
              </span>
              <span className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                €{' '}
                {invoice?.isVat
                  ? invoiceAmountWithVAT(invoice && invoice?.invoiceProducts)
                  : invoiceAmountWithOutVAT(invoice && invoice?.invoiceProducts)}
              </span>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default ViewReceipt;
