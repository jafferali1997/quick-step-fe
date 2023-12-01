/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import BookModal from '@/common/components/book-modal/book-modal.component';
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  netAmount,
  plusVat,
  taxRate
} from '@/common/utils/product-calculations/amount-calculations';
import calculateProductTotalPrice from '@/common/utils/product-calculations/calculate-product-total';
import usePreview from './use-preview.hook';

function OrderBlankPreview({ orderId }) {
  const {
    ref,
    setOpenPopup,
    order,
    business,
    openPopup,
    handleBook,
    handleSave,
    handleOpenPopup,
    tableData,
    templateHeader,
    templateContact,
    templateFooter,
    CONTACT_INFO,
    FROM_CONTACT_INFO,
    isLoading,
    orderToData,
    tableFooterOptions,
    termsAndConditionsData,
    stripHTML,
    mapColumnNameToProductKey,
    productToLoad
  } = usePreview({
    orderId
  });

  const getOrderNoJSX = () => {
    return (
      <div className="tw-pt-5 tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
        Order # <span className="tw-text-[#7E7D7D]">{order?.displayId}</span>
      </div>
    );
  };

  const getContactInfo = (section) => {
    return (
      <div className="tw-flex tw-min-h-[222px] tw-flex-col tw-gap-[16px]">
        <h3 className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
          {section.sectionName === 'offerTo' ? 'Offer To' : 'Offer From'}
        </h3>
        {section.attributes &&
          section.attributes.map((attr) => {
            if (attr.attributeName !== 'sectionPosition') {
              const attributeName = CONTACT_INFO[attr.attributeName];
              const fromAttribute = FROM_CONTACT_INFO[attr.attributeName];

              // if (section.sectionName !== 'offerTo' && !fromAttribute) {
              //   return null;
              // }

              let attributeValue;
              section.sectionName === 'offerTo'
                ? (attributeValue = orderToData[attr.attributeName])
                : (attributeValue = business[attr.attributeName]);

              return (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {attributeValue && (
                    <p className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray">
                      <span className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
                        {section.sectionName === 'offerTo' && attributeName}
                      </span>
                      {section.sectionName === 'offerTo' && ':'}
                      <span
                        className={`${
                          section.sectionName === 'offerTo' &&
                          'tw-ml-2 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-light-gray'
                        } `}
                      >
                        {attributeValue && attributeValue.length >= 20
                          ? `${attributeValue.slice(0, 20)}...`
                          : attributeValue}
                      </span>
                    </p>
                  )}
                </>
              );
            }
            return null;
          })}
      </div>
    );
  };

  return (
    <div>
      {openPopup && (
        <BookModal
          bookingModule="order"
          ref={ref}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleBook={handleBook}
          handleSave={handleSave}
        />
      )}
      <form onSubmit={handleOpenPopup}>
        <div>
          {isLoading ? (
            <div className="tw-flex tw-justify-center tw-pt-3">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="tw-flex tw-flex-col tw-gap-6">
              {productToLoad.map((item, index) => (
                <div className={`canvas-element-blank-${orderId}-${index}`}>
                  <div className=" tw-w-full">
                    <div className="tw-flex tw-justify-end">
                      <img
                        src="/assets/icons/Rectangle.png"
                        alt=""
                        className="tw-mr-[-24px]"
                      />
                    </div>
                    <div className="tw-mt-[-43px] tw-bg-white tw-px-10 tw-pb-[25.003px]">
                      <div className="tw-flex tw-justify-between">
                        {templateHeader?.length &&
                          templateHeader?.map((section) => {
                            if (section.sectionName === 'offerId') {
                              return getOrderNoJSX();
                            }
                            return '';
                          })}
                      </div>
                      <div className="tw-mr-10 tw-mt-6 tw-flex tw-items-center tw-justify-between">
                        {templateContact?.length &&
                          templateContact.map((section) => {
                            return getContactInfo(section);
                          })}
                      </div>
                      {order.orderBody && order.orderBody.bodyDescription ? (
                        <p className="tw-my-6 tw-flex tw-items-center tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black hover:tw-cursor-pointer">
                          <span
                            className="tw-flex"
                            dangerouslySetInnerHTML={{
                              __html: order.orderBody.bodyDescription
                            }}
                          />
                        </p>
                      ) : null}
                      {/* end order header */}
                      <section className="tw-w-full tw-gap-4 tw-rounded-[20px] tw-border tw-border-solid tw-border-[#E2E2E2] tw-bg-[#FFFFFF] tw-p-4">
                        <div>
                          <div className="tw-mb-4 tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-[#192A3E]">
                            {' '}
                            Product
                          </div>
                          <hr />
                          <table className="tw-mt-4 tw-w-full tw-border-collapse tw-rounded-[20px_0px_0px_0px]">
                            <thead>
                              <tr>
                                {tableData?.map((column) => (
                                  <th
                                    key={column.name}
                                    className="rounded-t-lg tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#1d4ed80f] tw-px-2 tw-py-4 tw-text-center tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black"
                                    style={{
                                      backgroundColor: column.backgroundColor
                                    }}
                                  >
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: column.name
                                      }}
                                    />
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {item?.map((product) => {
                                return (
                                  <tr key={product.product.id}>
                                    {tableData?.map((column) => {
                                      const strippedColumnName = stripHTML(column.name);
                                      const mappedProductKey =
                                        mapColumnNameToProductKey(strippedColumnName);
                                      let valueToDisplay = '';
                                      if (mappedProductKey) {
                                        if (mappedProductKey === 'lineItemDiscount') {
                                          valueToDisplay = product[mappedProductKey];
                                        } else if (mappedProductKey === 'Total') {
                                          const netAmmount =
                                            Number(
                                              (product && product?.quantity) ||
                                                (product.product &&
                                                  product.product?.taxRate?.quantity)
                                            ) *
                                            Number(
                                              (product && product?.netPrice) ||
                                                (product.product &&
                                                  product.product?.taxRate?.netPrice)
                                            );
                                          const total =
                                            Number(netAmmount) -
                                            (Number(netAmmount) *
                                              Number(
                                                product && product?.lineItemDiscount
                                              )) /
                                              100;
                                          valueToDisplay = total && total.toFixed(2);
                                        } else if (mappedProductKey === 'unit') {
                                          valueToDisplay =
                                            product?.unit ||
                                            (product.product &&
                                              product.product?.unit?.unit[
                                                mappedProductKey
                                              ]);
                                        } else if (mappedProductKey === 'taxRate') {
                                          valueToDisplay =
                                            product?.taxRate ||
                                            (product.product &&
                                              product.product?.taxRate?.taxRate[
                                                mappedProductKey
                                              ]);
                                        } else {
                                          valueToDisplay =
                                            product[mappedProductKey] ||
                                            product.product[mappedProductKey];
                                        }
                                      }
                                      return (
                                        <td
                                          key={column.id}
                                          className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4  tw-text-center tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]"
                                        >
                                          {valueToDisplay}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className=" tw-mt-[15px] tw-flex tw-flex-row tw-items-start tw-justify-between tw-rounded-[20px] tw-bg-[#fafafa] tw-px-6 tw-py-4">
                          <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4">
                            {tableFooterOptions.netAmount && (
                              <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                                Net Amount
                              </div>
                            )}
                            {tableFooterOptions.plusVAT && order.isVat && (
                              <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                                Plus VAT
                              </div>
                            )}
                            {tableFooterOptions.invoiceAmount && (
                              <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                                Invoice Amount
                              </div>
                            )}
                          </div>
                          <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-text-right">
                            {tableFooterOptions.netAmount && (
                              <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                                € {lineItemNetAmount(order && order?.orderProducts)}
                              </div>
                            )}
                            {tableFooterOptions.plusVAT && order?.isVat && (
                              <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                                € {plusVat(order && order?.orderProducts)}
                              </div>
                            )}
                            {tableFooterOptions.invoiceAmount && (
                              <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                                {order && order.isVat
                                  ? invoiceAmountWithVAT(order && order?.orderProducts)
                                  : invoiceAmountWithOutVAT(
                                      order && order?.orderProducts
                                    )}
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                      {/* end table */}
                      <div className="tw-mb-6 tw-mt-6 hover:tw-cursor-pointer">
                        {templateFooter?.disclaimer && (
                          <div>
                            <div className="font-normal text-base leading-6 tw-text-black">
                              <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                                Disclaimer
                              </div>
                            </div>
                            <div
                              className=" tw-mt-2 tw-leading-[22px] tw-text-text-black"
                              dangerouslySetInnerHTML={{
                                __html: order?.orderDisclaimer?.disclaimerDescription
                              }}
                            />
                          </div>
                        )}
                        {templateFooter &&
                          (templateFooter?.paymentTerms ||
                            templateFooter?.delivery ||
                            templateFooter?.warranty) && (
                            <div className="tw-flex tw-flex-col tw-gap-2">
                              <h3 className="tw-mt-4 tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                                Terms & Condition
                              </h3>
                              {templateFooter?.paymentTerms && (
                                <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
                                    Payment terms :
                                  </div>

                                  <div
                                    className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray"
                                    dangerouslySetInnerHTML={{
                                      __html: termsAndConditionsData['Payment terms']
                                    }}
                                  />
                                </p>
                              )}
                              {templateFooter?.delivery && (
                                <p className="tw-flex tw-min-w-[218px] tw-items-center tw-gap-2 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px]  tw-text-text-black">
                                    Delivery :
                                  </div>

                                  <div
                                    className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray"
                                    dangerouslySetInnerHTML={{
                                      __html: termsAndConditionsData.Delivery
                                    }}
                                  />
                                </p>
                              )}
                              {templateFooter?.warranty && (
                                <p className="tw-flex tw-min-w-[218px] tw-items-center tw-gap-2 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                                  <div className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px]  tw-text-text-black">
                                    Warranty :
                                  </div>
                                  <div
                                    className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray"
                                    dangerouslySetInnerHTML={{
                                      __html: termsAndConditionsData.Warranty
                                    }}
                                  />
                                </p>
                              )}
                            </div>
                          )}
                        {templateFooter?.copyright && (
                          <div className="tw-mt-4">
                            <div className="font-normal text-base leading-6 tw-text-black">
                              <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                                Copyright
                              </div>
                            </div>
                            <div
                              className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray"
                              dangerouslySetInnerHTML={{ __html: order?.copyRight }}
                            />
                          </div>
                        )}
                      </div>
                      <div />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

OrderBlankPreview.propTypes = {
  orderId: PropTypes.string
};

export default OrderBlankPreview;
