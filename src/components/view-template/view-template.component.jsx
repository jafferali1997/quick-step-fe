import React from 'react';
import useViewTemplate from './use-view-template.hook';

export default function ViewTemplate() {
  const {
    tableData,
    templateHeader,
    templateContact,
    templateFooter,
    CONTACT_INFO,
    docType,
    isLoading,
    goBack
  } = useViewTemplate();

  const getLogoJSX = () => {
    return (
      <div className=" tw-flex tw-w-[185px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-px-[29px] tw-pb-[10px] tw-pt-[9px]">
        <div className=" tw-flex tw-flex-col tw-items-center tw-gap-[6px]">
          <img
            alt="null"
            src="/assets/images/logo.png"
            className="tw-h-[41px] tw-w-[127px]"
          />
        </div>
      </div>
    );
  };

  const getOfferNoJSX = () => {
    return (
      <div className="tw-text-base tw-font-medium tw-not-italic tw-leading-6 tw-text-text-dark-gray">
        Offer #<span className="tw-text-[#7E7D7D]">______</span>
      </div>
    );
  };

  const getContactInfo = (section) => {
    return (
      <div className="tw-flex tw-min-h-[222px] tw-flex-col tw-gap-[16px]">
        <h3 className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
          {section.sectionName === 'offerTo' ? 'Offer To' : 'Offer From'}
        </h3>
        {section.attributes &&
          section.attributes.map((attr) => {
            if (attr.attributeName !== 'sectionPosition') {
              return (
                <p className="tw-flex tw-min-w-[218px] tw-justify-between tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-medium-gray">
                  {CONTACT_INFO[attr.attributeName]}
                  <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                    ___________
                  </span>
                </p>
              );
            }
            return '';
          })}
      </div>
    );
  };

  return (
    <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[24px] tw-pb-20 ">
      {isLoading ? (
        <div className="tw-flex tw-justify-center tw-pt-3">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className=" tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-gap-4  tw-pb-[16px] tw-pt-[24px]">
              <button className="hover:tw-cursor-pointer" type="button" onClick={goBack}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0008 19C14.8692 19.0008 14.7387 18.9756 14.6169 18.9258C14.495 18.876 14.3842 18.8027 14.2908 18.71L8.29079 12.71C8.10454 12.5227 8 12.2692 8 12.005C8 11.7408 8.10454 11.4874 8.29079 11.3L14.2908 5.30003C14.4821 5.1362 14.7282 5.05059 14.9798 5.06032C15.2315 5.07004 15.4703 5.17437 15.6484 5.35246C15.8265 5.53056 15.9308 5.7693 15.9405 6.02097C15.9502 6.27265 15.8646 6.51873 15.7008 6.71003L10.4108 12L15.7008 17.29C15.8412 17.4293 15.9372 17.6071 15.9766 17.8009C16.016 17.9947 15.997 18.1958 15.9221 18.3789C15.8471 18.5619 15.7196 18.7186 15.5556 18.8292C15.3917 18.9397 15.1986 18.9992 15.0008 19Z"
                    fill="#7E7D7D"
                  />
                  <rect
                    x="0.25"
                    y="0.25"
                    width="23.5"
                    height="23.5"
                    rx="3.75"
                    stroke="#7E7D7D"
                    strokeWidth="0.5"
                  />
                </svg>
              </button>
              <h1 className="tw-text-[22px] tw-font-medium tw-capitalize tw-not-italic tw-leading-[27.5px] tw-text-text-dark-gray">
                View {docType && docType?.toLowerCase()} Template
              </h1>
            </div>
          </div>
          <div className="tw-flex tw-gap-6">
            <div className=" tw-w-full">
              <div className=" tw-rounded-xl tw-border tw-border-solid tw-border-disabled-input tw-bg-white tw-px-5 tw-pb-[25.003px] tw-pt-5">
                <div className="tw-flex tw-justify-between">
                  {templateHeader.length &&
                    templateHeader.map((section) => {
                      if (section.sectionName === 'offerId') {
                        return getOfferNoJSX();
                      } else if (section.sectionName === 'offerLogo') {
                        return getLogoJSX();
                      }
                      return '';
                    })}
                </div>

                <div className="tw-mt-6 tw-flex tw-items-center tw-justify-between">
                  {templateContact.length &&
                    templateContact.map((section) => {
                      return getContactInfo(section);
                    })}
                </div>

                <p className=" tw-my-6 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black hover:tw-cursor-pointer">
                  Body Text
                  <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                    ________________________________________________________
                  </span>
                </p>
                {/* end offer header */}
                <section className="tw-bg-[#FFFFFF   tw-w-full tw-gap-4 tw-rounded-[20px] tw-border tw-border-solid tw-border-[#E2E2E2] tw-p-6">
                  <div>
                    <table className="... tw-w-full tw-border-collapse tw-rounded-[20px_0px_0px_0px] ">
                      <thead>
                        <tr>
                          <th className="tw-flex tw-justify-between">
                            {tableData?.map((column, index) => (
                              <span
                                key={column.name}
                                className=" rounded-t-lg tw-w-full tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-bg-[#FAFAFA] tw-px-2 tw-py-4 tw-text-center tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black"
                                style={{
                                  backgroundColor: column.backgroundColor
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: column.name
                                }}
                              />
                            ))}
                          </th>
                        </tr>
                      </thead>
                      <tbody />
                    </table>
                  </div>
                  <div className=" tw-mt-[15px] tw-flex tw-flex-row tw-items-start tw-justify-between tw-rounded-[20px] tw-bg-[#fafafa] tw-px-6 tw-py-4">
                    <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4">
                      <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                        Net Amount
                      </div>
                      <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                        Plus VAT
                      </div>
                      <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                        Invoice Amount
                      </div>
                    </div>

                    <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-text-right">
                      <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                        ____
                      </div>
                      <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                        ____
                      </div>
                      <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                        ____
                      </div>
                    </div>
                  </div>
                </section>
                {/* end table */}
                <div className="tw-mb-6 hover:tw-cursor-pointer">
                  {templateFooter.disclaimer && (
                    <p className="tw-mt-6 tw-text-[13px] tw-font-medium tw-not-italic tw-leading-[25px] tw-text-text-black">
                      Disclaimer
                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                        ______________________________________________________
                      </span>
                    </p>
                  )}
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <h3 className="tw-mt-4 tw-text-[15px] tw-font-medium tw-not-italic tw-leading-[25px] tw-text-text-black">
                      Terms & Condition
                    </h3>
                    {templateFooter.paymentTerms && (
                      <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray">
                        Payment terms :
                        <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                          ___________________________________________________
                        </span>
                      </p>
                    )}
                    {templateFooter.delivery && (
                      <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray">
                        Delivery :
                        <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                          ____________________________________________________
                        </span>
                      </p>
                    )}
                    {templateFooter.warranty && (
                      <p className="tw-flex tw-min-w-[218px] tw-gap-2 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray">
                        Warranty :
                        <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                          ____________________________________________________
                        </span>
                      </p>
                    )}
                  </div>
                  {templateFooter.copyright && (
                    <p className="tw-mt-6 tw-flex tw-min-w-[218px] tw-gap-2 tw-text-[15px] tw-font-medium tw-not-italic tw-leading-[25px] tw-text-text-black">
                      Copyright
                      <span className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-ultra-light-gray">
                        __________________________________________________________
                      </span>
                    </p>
                  )}
                </div>
                <div />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
