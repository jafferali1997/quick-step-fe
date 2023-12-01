import PropTypes from 'prop-types';
import BookModal from '@/common/components/book-modal/book-modal.component';
import CustomChooseDropdown from '@/common/components/custom-choose-dropdown/custom-choose-dropdown';
import StepperFooter from '@/common/components/stepper-footer/stepper-footer.component';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  plusVat
} from '@/common/utils/product-calculations/amount-calculations';
import calculateProductTotalPrice from '@/common/utils/product-calculations/calculate-product-total';
import usePreview from './use-preview.hook';

function DeliveryNotesPreview({ handleTabClick, handleTabCompleted }) {
  const {
    ref,
    setOpenPopup,
    deliveryNotes,
    business,
    id,
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
    deliveryNotesToData,
    tableFooterOptions,
    termsAndConditionsData,
    stripHTML,
    mapColumnNameToProductKey,
    openChooseTemplate,
    setOpenChooseTemplate,
    getListOfSimpleTemplates,
    getListOfStandardTemplates,
    handleCreateTemplate,
    handleEditTemplate,
    handleSearchTemplate,
    search,
    handleSelectedBodytemplate,
    selectedTemplate,
    displayId
  } = usePreview({
    handleTabClick,
    handleTabCompleted
  });

  const getLogoJSX = () => {
    return (
      <div className="tw-flex tw-w-[185px] tw-items-center tw-justify-center tw-px-0 tw-pb-[11.997px] tw-pt-[11px]">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-[6px]">
          <img
            alt="null"
            src="/assets/images/logo.png"
            className="tw-h-[55.14px] tw-w-[170px]"
          />
        </div>
      </div>
    );
  };

  const getDeliveryNotesNoJSX = () => {
    return (
      <div className=" tw-pt-6 tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
        <div className="tw-text-xl tw-font-bold tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
          Preview
        </div>
        <div className="tw-mt-[28.57px] tw-flex tw-gap-[14px]">
          <span className="tw-text-[#7E7D7D] ">{displayId}</span>
          <img src="/assets/icons/info.svg" alt="info" width="12px" height="12px" />
        </div>
      </div>
    );
  };

  const getContactInfo = (section) => {
    return (
      <div className="tw-flex tw-min-h-[222px] tw-flex-col tw-gap-[16px]">
        <h3 className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
          {section.sectionName === 'offerTo'
            ? 'Delivery Notes To'
            : 'Delivery Notes From'}
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
                ? (attributeValue = deliveryNotesToData[attr.attributeName])
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
          bookingModule="delivery notes"
          ref={ref}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleBook={handleBook}
          handleSave={handleSave}
        />
      )}
      <form onSubmit={handleOpenPopup}>
        <div className="tw-flex tw-flex-col tw-gap-6 tw-pr-5">
          <div className="tw-flex tw-justify-between">
            <CustomChooseDropdown
              dropdownWidth="[339px]"
              dropdownHeight="9"
              labelName="templateName"
              documentType="DELIVERY_NOTES"
              openChooseDropdown={openChooseTemplate}
              setOpenChooseDropdown={setOpenChooseTemplate}
              selectedItem={selectedTemplate}
              search={search}
              handleSearchItem={handleSearchTemplate}
              listOfItems={getListOfSimpleTemplates}
              listOfItemsTwo={getListOfStandardTemplates}
              handleSelectedItem={handleSelectedBodytemplate}
              handleEditItem={handleEditTemplate}
              createItem={true}
              showTemplateStuff={true}
              handleCreateItem={handleCreateTemplate}
            />

            {/* <DownloadDropdownBtn text="Download Pdf" dropdownoptions={dropdownoptions} /> */}
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="tw-flex tw-justify-center tw-pt-3">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="tw-flex tw-gap-6">
              <div className="tw-w-full">
                <div className="tw-bg-white tw-pb-[25.003px] tw-pt-5">
                  <div className="tw-flex tw-justify-between">
                    {templateHeader?.length &&
                      templateHeader?.map((section) => {
                        if (section.sectionName === 'offerId') {
                          return getDeliveryNotesNoJSX();
                        } else if (section.sectionName === 'offerLogo') {
                          return getLogoJSX();
                        }
                        return '';
                      })}
                  </div>
                  <div className="tw-mt-[36.57px] tw-flex tw-items-center tw-justify-between">
                    {templateContact?.length &&
                      templateContact.map((section) => {
                        return getContactInfo(section);
                      })}
                  </div>
                  <p className="tw-my-6 tw-flex tw-items-center tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black hover:tw-cursor-pointer">
                    <span
                      className="tw-flex"
                      dangerouslySetInnerHTML={{
                        __html:
                          deliveryNotes.deliveryNotesBody &&
                          deliveryNotes.deliveryNotesBody.bodyDescription
                      }}
                    />
                  </p>
                  {/* end deliveryNotes header */}
                  <section className="tw-bg-[#FFFFFF  tw-w-full tw-gap-4 tw-rounded-[20px] tw-border tw-border-solid tw-border-[#E2E2E2] tw-p-6">
                    <div>
                      <table className="tw-w-full tw-border-collapse tw-rounded-[20px_0px_0px_0px]">
                        <thead>
                          <tr>
                            {tableData?.map((column) => (
                              <th
                                key={column.name}
                                className="rounded-t-lg tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#FAFAFA] tw-px-2 tw-py-4 tw-text-center tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black"
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
                          {deliveryNotes?.deliveryNotesProducts?.map((product) => {
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
                                            100 || 0;
                                      valueToDisplay = total && total.toFixed(2);
                                    } else if (mappedProductKey === 'unit') {
                                      valueToDisplay =
                                        product?.unit ||
                                        (product.product &&
                                          product.product?.unit?.unit[mappedProductKey]);
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
                    {tableFooterOptions.netAmount ||
                    tableFooterOptions.plusVAT ||
                    tableFooterOptions.invoiceAmount ? (
                      <div className=" tw-mt-[15px] tw-flex tw-flex-row tw-items-start tw-justify-between tw-rounded-[20px] tw-bg-[#fafafa] tw-px-6 tw-py-4">
                        <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4">
                          {tableFooterOptions.netAmount && (
                            <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                              Net Amount
                            </div>
                          )}
                          {tableFooterOptions.plusVAT && deliveryNotes.isVat && (
                            <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                              Plus VAT
                            </div>
                          )}
                          {tableFooterOptions.deliveryNotesAmount && (
                            <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                              deliveryNotes Amount
                            </div>
                          )}
                        </div>
                        <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-text-right">
                          {tableFooterOptions.netAmount && (
                            <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                              €{' '}
                              {lineItemNetAmount(
                                deliveryNotes && deliveryNotes?.deliveryNotesProducts
                              )}
                            </div>
                          )}
                          {tableFooterOptions.plusVAT && deliveryNotes?.isVat && (
                            <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                              €{' '}
                              {plusVat(
                                deliveryNotes && deliveryNotes?.deliveryNotesProducts
                              )}
                            </div>
                          )}
                          {tableFooterOptions.deliveryNotesAmount && (
                            <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                              €{' '}
                              {deliveryNotes && deliveryNotes.isVat
                                ? invoiceAmountWithVAT(
                                    deliveryNotes && deliveryNotes?.deliveryNotesProducts
                                  )
                                : invoiceAmountWithOutVAT(
                                    deliveryNotes && deliveryNotes?.deliveryNotesProducts
                                  )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
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
                            __html:
                              deliveryNotes?.deliveryNotesDisclaimer
                                ?.disclaimerDescription
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
                          dangerouslySetInnerHTML={{ __html: deliveryNotes?.copyRight }}
                        />
                      </div>
                    )}
                  </div>
                  <div />
                </div>
              </div>
            </div>
          )}
        </div>
        <StepperFooter
          submitText="Save"
          handleTabClick={handleTabClick}
          back={DOCUMENT_TABS.PAGE_STRUCTURE}
        />
      </form>
    </div>
  );
}

export default DeliveryNotesPreview;
DeliveryNotesPreview.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
