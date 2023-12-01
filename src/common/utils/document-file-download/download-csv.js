import { enqueueSnackbar } from 'notistack';
import striptags from 'striptags';
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  plusVat
} from '../product-calculations/amount-calculations';
import calculateProductTotalPrice from '../product-calculations/calculate-product-total';

const handleDownloadCsv = ({ data, module }) => {
  let csvContent =
    'Company Name,First Name,Last Name,Address,Postal Code,Country,City,customer Id,Gender,Designation,Fax,Website Url,Mendate Referance,Mandate Generate Date,Account Owner Name,Contact Person Name,Mobile,Email,Address Label,Delivery Date,Expiry Date,Net Amount,Vat,Invoice Amount,Header Body,Disclaimer,Terms and Condition,Copyright,Product Name,Description,Quantity,Position No,Unit,Price,Tax,Discount,Total\n';

  data?.forEach((item) => {
    // Remove html tags from texts
    const cleanedBody = striptags(
      (item[`${module}Body`] && item[`${module}Body`].bodyDescription) ||
        (item.body && item.body.description)
    );
    const cleanedDisclaimer = striptags(
      (item[`${module}Disclaimer`] &&
        item[`${module}Disclaimer`]?.disclaimerDescription.replace(/&nbsp;/g, '')) ||
        (item.disclaimer && item.disclaimer.description.replace(/&nbsp;/g, ''))
    );
    const cleanedTermsAndCondition = striptags(
      (item?.termsAndConditions && item?.termsAndConditions.replace(/&nbsp;/g, '')) ||
        (item.disclaimer && item.disclaimer.replace(/&nbsp;/g, ''))
    );
    const cleanedCopyright = striptags(
      item?.copyRight && item?.copyRight.replace(/&nbsp;/g, '')
    );

    // VAT calculation
    const vat = plusVat(item[`${module}Products`]);

    // netAmount calculation
    const netAmount = lineItemNetAmount(item[`${module}Products`]).toFixed(2);

    // Invoice amount calculation
    const invoiceAmount = item.isVat
      ? invoiceAmountWithVAT(item[`${module}Products`]).toFixed(2)
      : invoiceAmountWithOutVAT(item[`${module}Products`]).toFixed(2);

    const products = item[`${module}Products`];
    const partialPaymentsLength = item?.partialPayments?.length || 0;

    if (products && products.length > 0) {
      let isFirstProduct = true;

      // Loop through products within the offer
      products.forEach((product) => {
        const total = calculateProductTotalPrice({
          taxRate:
            product?.taxRate?.taxRate ||
            (product.product && product.product?.taxRate?.taxRate) ||
            0,
          discountGroups:
            product.discountGroups || (product.product && product.product.discountGroups),
          quantity:
            product.quantity || (product.product && product.product.quantity) || 0,
          netPrice: product.netPrice || (product.product && product.product.netPrice) || 0
        });

        if (isFirstProduct) {
          csvContent += `${item?.customer?.companyName},${item?.customer?.firstName},${
            item?.customer?.lastName
          },"${item?.customer?.address}",${item?.customer?.postalCode},"${
            item?.customer?.country
          }","${item?.customer?.city}",${item?.customer && item?.customer.id},${
            item?.customer && item?.customer.gender
          },"${item?.customer && item?.customer.designation}","${
            item?.customer && item?.customer.companyFax
          }","${item?.customer && item?.customer.companyUrl}",${
            item?.customer && item?.customer.mendateReferance
          },${item?.customer && item?.customer.mandateGenerateDate?.split('T')[0]},${
            item?.customer && item?.customer.accountOwnerName
          },${item?.customerContactPerson && item?.customerContactPerson?.firstName} ${
            item?.customerContactPerson && item?.customerContactPerson?.lastName
          },${item?.customerContactPerson && item?.customerContactPerson.mobile},"${
            item?.customerContactPerson && item?.customerContactPerson.email
          }","${
            item?.customerCompanyAddress && item?.customerCompanyAddress.addressLabel
          }",${item && item?.deliveryDate},${
            item && item?.expiryDate
          },${netAmount},${vat},${invoiceAmount},"${cleanedBody}","${cleanedDisclaimer}","${cleanedTermsAndCondition}","${cleanedCopyright}",`;
          isFirstProduct = false;
        } else {
          csvContent += ',,,,,,,,,,,,,,,,,,,,,,,,,,,,';
        }

        csvContent += `"${product?.productName || product?.product?.productName}","${
          product?.description || product?.product?.description
        }",${product?.quantity || product?.product?.quantity},${
          product?.positionNo || product?.product?.positionNo
        },${
          (product?.unit && product?.unit?.unit) ||
          (product?.product && product?.product?.unit && product?.product?.unit.unit)
        },${product?.product?.netPrice || product?.netPrice},${
          product?.taxRate?.taxRate ||
          (product.product &&
            product.product?.taxRate &&
            product.product?.taxRate?.taxRate) ||
          0
        },${
          (product && product?.lineItemDiscount) ||
          (product?.discountGroups &&
            product?.discountGroups[0]?.ProductDiscountGroup.discount) ||
          (product?.discountGroups &&
            product?.discountGroups[0]?.ProductDiscountGroup.disco) ||
          (product?.discountGroups &&
            product?.discountGroups[0]?.ProductDiscountGroup.dis) ||
          0
        },${total}\n`;
      });
    } else if (partialPaymentsLength === 0) {
      // Include items without products or partial payments
      csvContent += `${item?.customer?.companyName},${item?.customer?.firstName},${
        item?.customer?.lastName
      },"${item?.customer?.address}",${item?.customer?.postalCode},"${
        item?.customer?.country
      }","${item?.customer?.city}",${item?.customer && item?.customer.id},${
        item?.customer && item?.customer.gender
      },"${item?.customer && item?.customer.designation}","${
        item?.customer && item?.customer.companyFax
      }","${item?.customer && item?.customer.companyUrl}",${
        item?.customer && item?.customer.mendateReferance
      },${item?.customer && item?.customer.mandateGenerateDate?.split('T')[0]},${
        item?.customer && item?.customer.accountOwnerName
      }, ${item?.customerContactPerson?.firstName} ${
        item?.customerContactPerson?.lastName
      },${item?.customerContactPerson && item?.customerContactPerson.mobile},"${
        item?.customerContactPerson && item?.customerContactPerson.email
      }","${item?.customerCompanyAddress && item?.customerCompanyAddress.addressLabel}",${
        item && item?.deliveryDate
      },${
        item && item?.expiryDate
      },${netAmount},${vat},${invoiceAmount},"${cleanedBody}","${cleanedDisclaimer}","${cleanedTermsAndCondition}","${cleanedCopyright}"\n`;
    }
  });

  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv' });
  enqueueSnackbar('CSV file downloaded successfully', {
    variant: 'success'
  });

  // Create a URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Create a link to download the Blob
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = `${module}.csv`;

  // Append the link to the document
  document.body.appendChild(downloadLink);

  // Simulate a click to trigger the download
  downloadLink.click();

  // Clean up the Blob URL
  URL.revokeObjectURL(blobUrl);
};

export default handleDownloadCsv;
