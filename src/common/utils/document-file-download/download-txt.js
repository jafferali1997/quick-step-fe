import { enqueueSnackbar } from 'notistack';
import striptags from 'striptags'; // Import the striptags library
import {
  invoiceAmountWithOutVAT,
  invoiceAmountWithVAT,
  lineItemNetAmount,
  plusVat
} from '../product-calculations/amount-calculations';
import calculateProductTotalPrice from '../product-calculations/calculate-product-total';

const handleDownloadTxt = ({ data, module }) => {
  let txtContent = '';

  // Loop through the data and generate XML elements for each module
  data?.map((item) => {
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

    // Body Title
    const bodyTitle =
      (item[`${module}Body`] && item[`${module}Body`].bodyTitle) ||
      (item.body && item.body.bodyTitle);

    // Footer Title
    const footerTitle =
      item[`${module}Disclaimer`] && item[`${module}Disclaimer`].disclaimerTitle;

    // VAT calculation
    const vat = plusVat(item[`${module}Products`]);

    // netAmount calculation
    const netAmount = lineItemNetAmount(item[`${module}Products`]).toFixed(2);

    // Invoice amount calculation
    const invoiceAmount = item.isVat
      ? invoiceAmountWithVAT(item[`${module}Products`]).toFixed(2)
      : invoiceAmountWithOutVAT(item[`${module}Products`]).toFixed(2);

    // products structs
    const products = item[`${module}Products`]
      ?.map((product, index) => {
        const total = calculateProductTotalPrice({
          discountGroups:
            product.discountGroups ||
            (product.product && product.product && product.product.discountGroups),
          quantity:
            product.quantity || (product.product && product.product.quantity) || 0,
          netPrice: product.netPrice || (product.product && product.product.netPrice) || 0
        });

        return `
        Product - ${index + 1}
        - Product Name: ${
          product?.productName || (product?.product && product?.product?.productName) || 0
        }
        - Description: ${
          product?.description || (product?.product && product?.product?.description) || 0
        }
        - Quantity: ${
          product?.quantity || (product?.product && product?.product?.quantity) || 0
        }
        - Position No: ${
          product?.positionNo || (product?.product && product?.product?.positionNo) || 0
        }
        - Unit: ${product?.unit || (product?.product && product?.product?.unit) || 0}
        - Price: ${
          product?.netPrice || (product?.product && product?.product?.netPrice) || 0
        }
        - Tax: ${
          product?.taxRate?.taxRate ||
          (product.product &&
            product.product?.taxRate &&
            product.product?.taxRate?.taxRate) ||
          0
        }
        - Discount: ${
          (product && product?.lineItemDiscount) ||
          (product?.discountGroups &&
            product?.discountGroups[0]?.ProductDiscountGroup.discount) ||
          (product?.discountGroups &&
            product?.discountGroups[0]?.ProductDiscountGroup.disco) ||
          (product?.discountGroups &&
            product?.discountGroups[0]?.ProductDiscountGroup.dis) ||
          0
        }%
        - Total: ${total}`;
      })
      .join('\n');

    // TXT file structure
    txtContent += `
    ${module}id-${item.id}:
    ${module}data:
    - Company: ${item?.customer?.companyName}
    - First Name: ${item?.customer && item.customer.firstName}
    - Last Name: ${item?.customer && item.customer.lastName}
    - CustomerId: ${item?.customer && item?.customer.id}
    - Gender: ${item?.customer && item?.customer.gender}
    - Designation: ${item?.customer && item?.customer.designation}
    - Fax: ${item?.customer && item?.customer.companyFax}
    - WebsiteUrl: ${item?.customer && item?.customer.companyUrl}
    - MendateReferance: ${item?.customer && item?.customer.mendateReferance}
    - MandateGenerateDate: ${
      item?.customer && item?.customer.mandateGenerateDate?.split('T')[0]
    }
    - AccountOwnerName: ${item?.customer && item?.customer.accountOwnerName}
    - ContactPersonName: ${
      item?.customerContactPerson && item?.customerContactPerson?.firstName
    } ${item?.customerContactPerson && item?.customerContactPerson?.lastName}
    - AddressLabel: ${
      item?.customerCompanyAddress && item?.customerCompanyAddress.addressLabel
    }
    - DeliveryDate: ${item && item?.deliveryDate}
    - ExpiryDate: ${item && item?.expiryDate}
    - Gender: ${item?.customer && item?.customer.gender}
    - Address: ${item?.customer && item?.customer.address}
    - Country: ${item?.customer && item?.customer.country}
    - City: ${item?.customer && item?.customer.city}
    - IBAN: ${item?.customer && item?.customer.iban}
    - BIC: ${item?.customer && item?.customer.bic}
    - Account Owner: ${item?.customer && item?.customer.accountOwnerName}
    - Postal Code: ${item?.customer && item?.customer.postalCode}
    - Status: ${item && item?.status}
    - Mobile: ${item?.customerContactPerson && item?.customerContactPerson.mobile}
    - Email: ${item?.customerContactPerson && item?.customerContactPerson.email}
    - Mobile: ${item?.customerContactPerson && item?.customerContactPerson.mobile}
    - Header Body:
       Body Title: ${bodyTitle}
       Body Description: ${cleanedBody}
    - Footer:
       Disclaimer Title: ${footerTitle}
       Disclaimer Description: ${cleanedDisclaimer}
       Terms & Conditions:
      ${cleanedTermsAndCondition}
       Copyright:
        ${cleanedCopyright}
      
    - Products:
    ${products}
      
    Net Amount: € ${netAmount}
    Plus VAT: € ${vat}
    Invoice Amount: € ${invoiceAmount}
      
    --------------------------------------------------------------------------------------------------\n\n`;

    return '';
  });
  // Create a Blob from the TXT content
  const blob = new Blob([txtContent], { type: 'text/plain' });
  enqueueSnackbar('TXT file downloaded successfully!', {
    variant: 'success'
  });

  // Create a URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Create a link to download the Blob
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = `${module}.txt`;

  // Append the link to the document
  document.body.appendChild(downloadLink);

  // Simulate a click to trigger the download
  downloadLink.click();

  // Clean up the Blob URL
  URL.revokeObjectURL(blobUrl);
};

export default handleDownloadTxt;
