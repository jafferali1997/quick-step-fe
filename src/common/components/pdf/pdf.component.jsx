import React from 'react';
import PropTypes from 'prop-types';
import calculateProductTotalPrice from '@/common/utils/product-calculations/calculate-product-total';

function ViewPdf({
  business,
  netAmount,
  taxrate,
  disclaimer,
  date,
  products,
  moduleType,
  moduleName
}) {
  return (
    <div className={`canvas-element-blank-${moduleType.id}`}>
      <div className="tw-flex tw-justify-between">
        <div></div>
        <div>
          {' '}
          <img
            src="/assets/icons/Rectangle.png"
            alt="img"
            width="188.06pxpx"
            height="86.84px"
          />
        </div>
      </div>
      <div className="tw-mt-[-90px] tw-flex tw-flex-col tw-gap-6 tw-px-10 tw-pb-[32px]">
        <div className="actual-receipt  iframe tw-flex tw-flex-col tw-gap-6 tw-px-5">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-gap-[14px]">
              <span className="tw-text-xl tw-font-normal tw-leading-[30px] tw-text-[#2C2E3E]">
                {Number(moduleType.id)}
              </span>
              <div className="tw-mt-3">
                <img
                  src="/assets/icons/info.png"
                  className="tw-mt-3"
                  alt="img"
                  width="10.48px"
                  height="12px"
                />
              </div>
            </div>
            <div>
              <img
                alt="null"
                src="/assets/images/logo.png"
                className="tw-h-[55.14px] tw-w-[170px]"
              />
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-justify-between">
            <h3 className="tw-text-base tw-font-medium tw-leading-[24px] tw-text-text-black">
              {moduleName} From
            </h3>
            <div>
              <h3 className="tw-flex tw-items-start tw-gap-[107px] tw-text-base tw-font-medium tw-leading-[24px] tw-text-text-black">
                <div className="tw-items-start">{moduleName} To</div>
                <div />
              </h3>
            </div>
          </div>
          <div className="tw-flex tw-justify-between">
            <div className="tw-flex tw-flex-col tw-items-start tw-gap-4">
              <div>
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  {business?.businessName}
                </p>
              </div>
              <div>
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  {business?.businessEmail}
                </p>
              </div>
              <div>
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  {date}
                </p>
              </div>
              <div>
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  {business?.address}
                </p>
              </div>
              <div>
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  {business?.slogan}
                </p>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-items-start tw-gap-4">
              <div className="tw-flex tw-gap-2">
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  Company Name:
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  {moduleType?.customer && moduleType?.customer.companyName}
                </p>
              </div>
              <div className="tw-flex tw-gap-2">
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  Name:
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  {moduleType?.customerContactPerson &&
                    moduleType.customerContactPerson.firstName}{' '}
                  {moduleType?.customerContactPerson &&
                    moduleType.customerContactPerson.lastName}
                </p>
              </div>
              <div className="tw-flex tw-gap-2">
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  Address:
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  {moduleType?.customer && moduleType?.customer.address}
                </p>
              </div>
              <div className="tw-flex tw-gap-2">
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  Postal Code:
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  {moduleType?.customer && moduleType?.customer.postalCode}
                </p>
              </div>
              <div className="tw-flex tw-gap-2">
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  Country:
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  {moduleType?.customer && moduleType?.customer.country}
                </p>
              </div>
              <div className="tw-flex tw-gap-2">
                <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                  City:
                </p>
                <p className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                  {moduleType?.customer && moduleType?.customer.city}
                </p>
              </div>
            </div>
          </div>

          <div className="tw-flex">
            <div className="tw-text-base tw-font-normal tw-leading-6 tw-text-black">
              Dear{' '}
              {moduleType?.customer && moduleType.customer.gender === 'FEMALE'
                ? 'Madam'
                : 'Sir'}
              ,{' '}
            </div>
            <div className="tw-ml-[3px] tw-text-base tw-font-normal tw-leading-6 tw-text-[#585858]">
              we would be happy to confirm your order.
            </div>
          </div>

          <section className="tw-w-full tw-gap-4 tw-rounded-[20px] tw-border tw-border-solid tw-border-[#E2E2E2]">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-rounded-[20px] tw-p-4">
              <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-[#192A3E]">
                Products
              </div>
              <hr />
              <div className="tw-rounded-[10px] tw-border tw-border-solid tw-border-[#E2E2E2]">
                <table class="tw-w-full">
                  <thead>
                    <tr className="tw-rounded-[10px_10px_0_0] tw-bg-[#E7EAEE] tw-p-5">
                      <th className="tw-rounded-[10px_0_0_0] tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Product
                      </th>
                      <th className=" tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Description
                      </th>
                      <th className=" tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Quantity
                      </th>
                      <th className=" tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Position No
                      </th>
                      <th className=" tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Unit
                      </th>
                      <th className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Tax
                      </th>
                      <th className=" tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        <span className=" tw-flex tw-items-center tw-gap-2">
                          {/* <div className="tw-mt-[15px]">
                            {' '}
                            <svg
                              width="
                  10.33px"
                              height="11.19px"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3427 12.9998C12.3976 13.994 11.1875 14.5416 9.93536 14.5416C7.8831 14.5416 6.10613 13.1004 5.26983 11.0171H10.9704C11.4647 11.0171 11.8654 10.6163 11.8654 10.122C11.8654 9.62769 11.4647 9.22691 10.9704 9.22691H4.81496C4.77896 8.92989 4.76079 8.63098 4.76054 8.33179C4.76054 7.98891 4.78468 7.6528 4.82972 7.32479H10.9704C11.4647 7.32479 11.8654 6.92402 11.8654 6.42971C11.8654 5.93539 11.4647 5.53458 10.9704 5.53458H5.31745C6.17168 3.5123 7.92026 2.12202 9.93536 2.12202C11.1875 2.12202 12.3976 2.66964 13.3427 3.66367C13.6829 4.02174 14.2492 4.03645 14.608 3.6959C14.9664 3.35521 14.9806 2.78866 14.6404 2.4304C13.3541 1.07723 11.6832 0.332031 9.93559 0.332031C6.95152 0.332031 4.40073 2.49931 3.41089 5.53484H1.01227C0.517961 5.53484 0.117188 5.93562 0.117188 6.42993C0.117188 6.92424 0.517961 7.32501 1.01227 7.32501H3.02734C2.99107 7.65532 2.97033 7.99076 2.97033 8.33201C2.97033 8.63488 2.98616 8.93299 3.01511 9.22713H1.01227C0.517961 9.22713 0.117188 9.62791 0.117188 10.1222C0.117188 10.6165 0.517961 11.0173 1.01227 11.0173H3.37536C4.33821 14.1115 6.91477 16.332 9.93536 16.332C11.6832 16.332 13.3536 15.5866 14.6399 14.2337C14.9803 13.8753 14.9664 13.3088 14.6078 12.9682C14.2496 12.6275 13.6829 12.6417 13.3427 12.9998Z"
                                fill="#7E7D7D"
                              />
                            </svg>
                          </div>{' '} */}
                          Price
                        </span>
                      </th>

                      <th className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Discount
                      </th>
                      <th className="tw-rounded-[0_10px_0_0] tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        <span className=" tw-flex tw-items-center tw-gap-2">
                          {/* <div className="tw-mt-3">
                            {' '} */}
                          {/* <svg
                              width="
                  10.33px"
                              height="11.19px"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3427 12.9998C12.3976 13.994 11.1875 14.5416 9.93536 14.5416C7.8831 14.5416 6.10613 13.1004 5.26983 11.0171H10.9704C11.4647 11.0171 11.8654 10.6163 11.8654 10.122C11.8654 9.62769 11.4647 9.22691 10.9704 9.22691H4.81496C4.77896 8.92989 4.76079 8.63098 4.76054 8.33179C4.76054 7.98891 4.78468 7.6528 4.82972 7.32479H10.9704C11.4647 7.32479 11.8654 6.92402 11.8654 6.42971C11.8654 5.93539 11.4647 5.53458 10.9704 5.53458H5.31745C6.17168 3.5123 7.92026 2.12202 9.93536 2.12202C11.1875 2.12202 12.3976 2.66964 13.3427 3.66367C13.6829 4.02174 14.2492 4.03645 14.608 3.6959C14.9664 3.35521 14.9806 2.78866 14.6404 2.4304C13.3541 1.07723 11.6832 0.332031 9.93559 0.332031C6.95152 0.332031 4.40073 2.49931 3.41089 5.53484H1.01227C0.517961 5.53484 0.117188 5.93562 0.117188 6.42993C0.117188 6.92424 0.517961 7.32501 1.01227 7.32501H3.02734C2.99107 7.65532 2.97033 7.99076 2.97033 8.33201C2.97033 8.63488 2.98616 8.93299 3.01511 9.22713H1.01227C0.517961 9.22713 0.117188 9.62791 0.117188 10.1222C0.117188 10.6165 0.517961 11.0173 1.01227 11.0173H3.37536C4.33821 14.1115 6.91477 16.332 9.93536 16.332C11.6832 16.332 13.3536 15.5866 14.6399 14.2337C14.9803 13.8753 14.9664 13.3088 14.6078 12.9682C14.2496 12.6275 13.6829 12.6417 13.3427 12.9998Z"
                                fill="#7E7D7D"
                              />
                            </svg>
                          </div>{' '} */}
                          € Total
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => {
                      return (
                        <tr>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product?.product && product?.product?.productName) ||
                              product?.productName ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {(product?.product && product?.product?.description) ||
                              product?.description ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {(product?.product && product?.product.quantity) ||
                              product.quantity ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {(product?.product && product?.product?.positionNo) ||
                              product?.positionNo ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {(product?.product && product?.product.unit) ||
                              product.unit ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {(product?.product && product?.product.netPrice) ||
                              product.netPrice ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {Number(product?.product && product.product.taxRate) ||
                              product.taxRate ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {(product?.product && product?.lineItemDiscount) ||
                              product.taxRate ||
                              0}
                            %
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464] tw-text-[#64646]">
                            {/* €{' '}
                            {calculateProductTotalPrice({
                              taxRate: product.taxRate || product.product.taxRate,
                              discountGroups:
                                product.discountGroups || product.product.discountGroups,
                              quantity: product.quantity || product.product.quantity,
                              netPrice: product.netPrice || product.product.netPrice
                            })} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="tw-flex tw-flex-row tw-items-start tw-justify-between tw-rounded-[10px] tw-bg-[#fafafa] tw-px-6 tw-py-4">
                <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4">
                  <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                    Net Amount
                  </div>
                  {moduleType.isVat && (
                    <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                      Plus VAT
                    </div>
                  )}
                  <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                    Invoice Amount
                  </div>
                </div>

                <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-text-right">
                  <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                    € {netAmount}
                  </div>
                  {moduleType?.isVat && (
                    <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                      € {netAmount * taxrate}
                    </div>
                  )}
                  <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                    € {netAmount + netAmount * taxrate}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="page-break tw-flex tw-flex-col tw-gap-6">
            <div>
              <div className="font-normal text-base leading-6 tw-text-black">
                <strong>Disclaimer</strong>
              </div>
              <div
                className=" tw-mt-2 tw-leading-[22px] tw-text-text-black"
                dangerouslySetInnerHTML={{
                  __html: disclaimer
                }}
              />
            </div>

            <div>
              <div className="font-normal text-base leading-6 tw-text-black">
                <strong>Terms & Condition</strong>
              </div>
              <div
                className="tw-mt-2 tw-leading-[22px] tw-text-text-black"
                dangerouslySetInnerHTML={{ __html: moduleType?.termsAndConditions }}
              />
            </div>

            <div>
              <div className="font-normal text-base leading-6 tw-text-black">
                <strong>Copyright</strong>
              </div>
              <div
                className="tw-mt-2  tw-leading-[22px] tw-text-text-black"
                dangerouslySetInnerHTML={{ __html: moduleType?.copyRight }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewPdf.propTypes = {
  business: PropTypes.string,
  netAmount: PropTypes.string.isRequired,
  taxrate: PropTypes.string.isRequired,
  moduleType: PropTypes.string,
  products: PropTypes.PropTypes.arrayOf(),
  disclaimer: PropTypes.string,
  date: PropTypes.string,
  moduleName: PropTypes.string
};

export default ViewPdf;
