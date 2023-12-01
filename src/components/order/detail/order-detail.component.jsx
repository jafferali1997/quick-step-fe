import { Link } from '@mui/material/node';
import CircularILoader from '@/common/components/circular-loader/circular-loader.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import FieldLabel from '@/common/components/field-label/field-label.component';
import FileInput from '@/common/components/file-input/file-input.component';
import TextArea from '@/common/components/text-area/text-area.component';
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  plusVat
} from '@/common/utils/product-calculations/amount-calculations';
import calculateProductTotalPrice from '@/common/utils/product-calculations/calculate-product-total';
import useOrderDetail from './use-order-detail.hook';

export default function OrderDetail() {
  const {
    orderId,
    data,
    comments,
    fileInputRef,
    handleUploadButtonClick,
    orderAttachment
  } = useOrderDetail();

  return (
    <div className="content">
      {data && data.id && (
        <FileInput
          module={data}
          moduleName="ORDER"
          fileRef={fileInputRef}
          flexible={true}
        />
      )}
      <div className="tw-min-h-[100vh] tw-w-full tw-bg-[#FBFBFB] tw-px-[23px] ">
        <div className="tw-flex tw-items-center tw-justify-between tw-py-[24px]">
          <div className="tw-flex tw-items-center tw-gap-[16px]">
            <Link href="/order/view">
              <img src="/assets/images/back-icon.svg" alt="img" />
            </Link>
            <h1 className="admin-top-heading "> Order Details</h1>
            <p className="admin-top-p">Order # {data?.displayId}</p>
          </div>
        </div>
        <div className="2bars tw-flex tw-gap-[24px] xs:tw-flex-col-reverse xs:tw-flex-wrap lg:tw-flex-row lg:tw-flex-nowrap">
          <div className="main-content tw-w-full tw-pb-5">
            <div className="form-box tw-w-full ">
              <h3 className="form-box-heading ">Personal Details</h3>
              <div className="form-box-grid">
                <CustomInput
                  label="Gender"
                  name="Gender"
                  placeholder="Male"
                  type="text"
                  readOnly
                  defaultValue={data?.customer?.gender}
                />
                <CustomInput
                  label="Designation"
                  name="designation"
                  placeholder="Software"
                  type="text"
                  readOnly
                  defaultValue={data?.customer?.designation}
                />
                <CustomInput
                  label="First Name"
                  name="First Name"
                  placeholder="John"
                  type="text"
                  readOnly
                  defaultValue={data?.customer?.firstName}
                />
                <CustomInput
                  label="Last Name"
                  name="Last Name"
                  placeholder="David"
                  type="text"
                  readOnly
                  defaultValue={data?.customer?.lastName}
                />
                <CustomInput
                  label="Company Name"
                  name="Company Name"
                  placeholder="Zapta Technology"
                  type="text"
                  readOnly
                  defaultValue={data?.customer?.companyName}
                />
                <CustomInput
                  label="Address Supplement"
                  name="Address Supplement"
                  placeholder="Mohrenstrasse 37 10117 Berlin, Germany."
                  type="text"
                  readOnly
                  defaultValue={data?.customerCompanyAddress?.address}
                />
                <CustomInput
                  label="Country"
                  name="Country"
                  placeholder="Germany"
                  type="text"
                  readOnly
                  defaultValue={data?.customer && data?.customer?.country}
                />
                <CustomInput
                  label="City"
                  name="City"
                  placeholder="Berlin"
                  type="text"
                  readOnly
                  defaultValue={data?.customer && data?.customer?.city}
                />
                <CustomInput
                  label="Postal Code"
                  name="Postal Code"
                  placeholder="26455"
                  type="text"
                  readOnly
                  defaultValue={data?.customer && data?.customer?.postalCode}
                />
                <CustomInput
                  label="Address"
                  name="Address"
                  placeholder="Mohrenstrasse 37 10117 Berlin, Germany."
                  type="text"
                  readOnly
                  defaultValue={
                    data?.customerCompanyAddress && data?.customerCompanyAddress?.address
                  }
                />
                <CustomInput
                  label="Address Label"
                  name="Address Label"
                  placeholder="Germany"
                  type="text"
                  readOnly
                  defaultValue={
                    data?.customerCompanyAddress &&
                    data?.customerCompanyAddress?.addressLabel
                  }
                />
                <CustomInput
                  label="Contact Person"
                  name="Contact Person"
                  placeholder="John David"
                  type="text"
                  readOnly
                  defaultValue={
                    data?.customerContactPerson &&
                    ` ${data?.customerContactPerson.firstName} ${data?.customerContactPerson.lastName} ${data?.customerContactPerson.address}`
                  }
                />
              </div>
            </div>
            <div className="form-box tw-mt-4 tw-w-full ">
              <h3 className="form-box-heading ">Header</h3>
              <div className="form-box-grid">
                <CustomInput
                  label="Company Name"
                  name="Company Name"
                  placeholder="Quicksteps"
                  type="text"
                  readOnly
                  defaultValue={
                    data?.businessDetail && data?.businessDetail?.businessName
                  }
                />
                <CustomInput
                  label="Company Slogan"
                  name="Company Slogan"
                  placeholder="one app replace everything"
                  type="text"
                  readOnly
                  defaultValue={data?.businessDetail && data?.businessDetail?.slogan}
                />
                <CustomInput
                  label="Date"
                  name="Date"
                  placeholder="26.01.2023"
                  type="text"
                  readOnly
                  defaultValue={data?.businessDetail && data?.orderDate}
                />
                <CustomInput
                  label="Company Email"
                  name="Company Email"
                  placeholder="Quicksteps12@gmail.com"
                  type="text"
                  readOnly
                  defaultValue={
                    data?.businessDetail && data?.businessDetail?.businessEmail
                  }
                />
                <CustomInput
                  label="Company Address"
                  name="Company Address"
                  placeholder="Mohrenstrasse 37 10117 Berlin, Germany."
                  type="text"
                  readOnly
                  defaultValue={data?.businessDetail && data?.businessDetail?.address}
                />
                <div className="tw-flex tw-max-w-[351.5px] tw-items-center tw-justify-between">
                  <label
                    className="tw-text-xs tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black"
                    htmlFor="logo"
                  >
                    Company Logo:
                  </label>
                  <div className="tw-h-[42px] tw-w-[130px]">
                    <img
                      className="tw-w-full tw-pr-5"
                      src="/assets/images/logo.png"
                      alt="logo"
                    />
                  </div>
                </div>
                <h3 className="form-box-heading ">Body</h3>
              </div>
              <div className="tw-w-full">
                <FieldLabel label="Body Text" className="tw-mb-2" />
                <div
                  className="input-field default-input tw-min disabled-input !tw-h-fit tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray hover:tw-border-text-dark-gray focus:tw-border-[1px] focus:tw-border-text-dark-gray"
                  dangerouslySetInnerHTML={{
                    __html: data?.orderBody && data?.orderBody?.bodyDescription
                  }}
                />
              </div>
            </div>
            <div className="form-box tw-mt-4 tw-w-full  ">
              <h3 className="form-box-heading ">Line Items</h3>

              <div className="tw-mt-4">
                <table class="... tw-w-full tw-border-collapse tw-rounded-[20px_0px_0px_0px] ">
                  <thead>
                    <tr className="tw-rounded-[10px] tw-bg-[#E7EAEE] tw-p-5">
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
                      <th className=" tw-px-2 tw-py-5 tw-text-start tw-text-sm tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        <span className="tw-flex tw-items-center tw-gap-2">€ Price </span>
                      </th>
                      <th className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Tax
                      </th>
                      <th className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        Discount
                      </th>
                      <th className="tw-rounded-[0_10px_0_0] tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-black">
                        <span className="tw-flex tw-items-center tw-gap-2">€ Total </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.orderProducts?.map((product) => {
                      return (
                        <tr>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.productName) ||
                              (product?.product && product?.product?.productName)}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.desciption) ||
                              (product?.product && product?.product?.desciption)}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.quantity) ||
                              (product?.product && product?.product?.quantity)}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.positionNo) ||
                              (product?.product && product?.product?.positionNo)}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.untit) ||
                              (product?.product &&
                                product?.product?.unit &&
                                product?.product?.unit?.unit)}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.netPrice) ||
                              (product?.product && product?.product?.netPrice)}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {(product && product.taxRate) ||
                              (product?.product &&
                                product?.product.taxRate &&
                                product?.product?.taxRate?.taxRate) ||
                              0}
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            {product?.lineItemDiscount || 0}%
                          </td>
                          <td className="tw-border-b tw-border-solid tw-border-b-[#E7EAEE] tw-px-2 tw-py-4 tw-text-start tw-text-xs tw-font-normal tw-leading-[18px] tw-text-[#646464]">
                            €{' '}
                            {calculateProductTotalPrice({
                              discountGroups:
                                (product && product.discountGroups) ||
                                (product.product && product.product.discountGroups),
                              quantity:
                                (product && product.quantity) ||
                                (product.product && product.product.quantity) ||
                                0,
                              netPrice:
                                (product && product.netPrice) ||
                                (product.product && product.product.netPrice) ||
                                0
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
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
                    € {lineItemNetAmount(data && data?.orderProducts).toFixed(2)}
                  </div>
                  <div className="tw-text-base tw-font-medium tw-leading-[19px] tw-text-[#646464]">
                    € {plusVat(data && data?.orderProducts)}
                  </div>
                  <div className="tw-text-base tw-font-semibold tw-leading-[19px] tw-text-text-black">
                    €{' '}
                    {data && data.isVat
                      ? invoiceAmountWithVAT(data && data?.orderProducts).toFixed(2)
                      : invoiceAmountWithOutVAT(data && data?.orderProducts).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-box tw-mt-4 tw-w-full ">
              <h3 className="form-box-heading ">Footer Details</h3>
              <div className="tw-flex tw-w-full tw-flex-col tw-gap-[16px] tw-py-[16px]">
                <FieldLabel label="Disclaimer Text" className="tw-mb-2" />
                {data?.orderDisclaimer && (
                  <div
                    className="input-field default-input tw-min disabled-input !tw-h-fit tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray hover:tw-border-text-dark-gray focus:tw-border-[1px] focus:tw-border-text-dark-gray"
                    dangerouslySetInnerHTML={{
                      __html: data?.orderDisclaimer?.disclaimerDescription
                    }}
                  />
                )}
                <FieldLabel label="Terms & Conditions" className="tw-mb-2" />
                <div
                  className="input-field default-input tw-min disabled-input !tw-h-fit tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray hover:tw-border-text-dark-gray focus:tw-border-[1px] focus:tw-border-text-dark-gray"
                  dangerouslySetInnerHTML={{ __html: data?.termsAndConditions }}
                />

                <FieldLabel label="Copy Right" className="tw-mb-2" />
                <div
                  className="input-field default-input tw-min disabled-input !tw-h-fit tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray hover:tw-border-text-dark-gray focus:tw-border-[1px] focus:tw-border-text-dark-gray"
                  dangerouslySetInnerHTML={{ __html: data?.copyRight }}
                />
              </div>
            </div>
          </div>
          <div className="right-side tw-h-fit lg:tw-sticky lg:tw-top-4">
            <div className="form-box tw-flex tw-h-[77px] tw-w-[336px] tw-items-center tw-justify-between ">
              <h3 className="form-box-heading ">Status</h3>
              <div className="tw-flex tw-items-center tw-justify-center tw-rounded-[5px] tw-bg-[#FFE8E8] tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-[#A60A0A]">
                Rejected
              </div>
            </div>
            <div className="form-box tw-mt-[16px] tw-flex  tw-w-[336px] tw-flex-col tw-gap-[16px]  ">
              <h3 className="form-box-heading ">Reason</h3>
              <TextArea
                placeholder=""
                name="comment"
                readOnly
                defaultValue={data?.rejectionReason}
              />
            </div>
            <div className="form-box tw-mt-[16px] tw-w-[336px]  ">
              <div className="tw-flex tw-items-center tw-justify-between">
                <h3 className="form-box-heading ">Uploaded files</h3>
                <CustomButton
                  text="Upload"
                  className="btn-secondary"
                  onClick={handleUploadButtonClick}
                />
              </div>
              <div className=" tw-mt-[16px] tw-flex tw-flex-col tw-gap-[12px] ">
                {orderAttachment.isLoading ? (
                  <CircularILoader />
                ) : (
                  orderAttachment &&
                  orderAttachment.data &&
                  orderAttachment.data.attachments &&
                  orderAttachment.data.attachments?.map(({ file }) => {
                    return (
                      <div
                        className="tw-mt-2 tw-flex tw-items-center tw-gap-4 hover:tw-cursor-pointer"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <div className="tw-inline-flex tw-flex-col tw-items-start tw-gap-3">
                          <div className="tw-flex tw-items-center tw-gap-1 tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-p-1">
                            {file && file.name && (
                              <div>
                                <img
                                  className="tw-h-8 tw-w-8"
                                  src={
                                    file.name.split('.').pop() === 'pdf'
                                      ? '/assets/icons/pdf-formate.svg'
                                      : file.name.split('.').pop() === 'jpg'
                                      ? '/assets/icons/jpg-formate.svg'
                                      : file.name.split('.').pop() === 'jpeg'
                                      ? '/assets/icons/jpeg-formate.svg'
                                      : '/assets/icons/png-formate.svg'
                                  }
                                  alt="file"
                                />
                              </div>
                            )}
                            <div className="tw-flex tw-flex-col tw-gap-1">
                              <div className="tw-max-w-[250px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-not-italic tw-leading-4">
                                {file && file.name}
                              </div>
                              <div className="tw-text-xs tw-font-normal tw-uppercase tw-not-italic tw-leading-[15px]">
                                {file && file.name.split('.').pop()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {comments.length !== 0 && (
              <div className="form-box tw-mt-[16px] tw-flex  tw-w-[336px] tw-flex-col tw-gap-[16px]  ">
                <h3 className="form-box-heading ">Comments</h3>
                {comments?.map(({ comment }) => {
                  return (
                    <TextArea
                      // placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's."
                      name="comment"
                      readOnly
                      value={comment && comment.comment}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
