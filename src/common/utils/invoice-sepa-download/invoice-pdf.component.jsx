import PropTypes from 'prop-types';
import { netAmount, taxRate } from '../product-calculations/amount-calculations';

function InvoicePdf({ invoice, products }) {
  return (
    <div
      className={` tw-w-[400px] tw-bg-[#FBFBFB] tw-px-10 tw-pb-8 tw-pt-3 invoice-sepa-pdf-${invoice.id}`}
    >
      <div className="tw-mt-6 tw-flex tw-flex tw-w-full tw-flex-col tw-justify-center tw-gap-4">
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            Company:
          </p>
          <p className="tw-ml-4 tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            {invoice?.company}
          </p>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            First Name:
          </p>
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            {invoice?.firstName}
          </p>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            Last Name:
          </p>
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            {invoice?.lastName}
          </p>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            Invoice Number:
          </p>
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            {invoice?.id}
          </p>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            Total Amount:
          </p>
          <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
            {netAmount(products && products.products) +
              netAmount(products && products.products) *
                taxRate(products && products.products)}
          </p>
        </div>
      </div>
    </div>
  );
}

InvoicePdf.propTypes = {
  invoice: PropTypes.string,
  products: PropTypes.string
};

export default InvoicePdf;
