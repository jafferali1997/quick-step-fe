import DOCUMENT from '@/common/constants/document.constants';
import calculateProductTotalPrice from '../product-calculations/calculate-product-total';

const statistics = ({ items, status, module = '' }) => {
  const moduleName =
    module === DOCUMENT.DELIVERY_NOTES ? 'deliveryNotes' : module.toLowerCase();
  const response = items
    ?.filter((item) => item.status === status)
    ?.map((product) =>
      product[`${moduleName}Products`]?.map((product) => {
        const total = calculateProductTotalPrice({
          discount:
            product.lineItemDiscount ||
            (product?.product &&
              product?.product?.discountGroups &&
              product?.product?.discountGroups?.[0]?.ProductDiscountGroup &&
              product?.product?.discountGroups?.[0]?.ProductDiscountGroup?.disco) ||
            (product?.product &&
              product?.product?.discountGroups &&
              product?.product?.discountGroups?.[0]?.ProductDiscountGroup &&
              product?.product?.discountGroups?.[0]?.ProductDiscountGroup?.discount) ||
            (product?.product &&
              product?.product?.discountGroups &&
              product?.product?.discountGroups?.[0]?.ProductDiscountGroup &&
              product?.product?.discountGroups?.[0]?.ProductDiscountGroup?.dis),
          netPrice: product.netPrice || (product.product && product.product.netPrice),
          quantity: product.quantity || (product.product && product.product.quantity),
          taxRate: product.taxRate || (product.product && product.product.taxRate)
        });
        return total;
      })
    )
    .flat()
    .reduce((initial, sum) => {
      return initial + Number(sum);
    }, 0);

  return response;
};

export const revenue = ({ items, module }) => {
  const response = items
    ?.filter((status) => status.status !== 'DRAFT')
    ?.map((product) =>
      product[`${module}Products`]?.map((product) =>
        Number(product.netPrice || (product.product && product.product.netPrice))
      )
    )
    .flat()
    .reduce((initial, sum) => {
      return initial + Number(sum);
    }, 0);

  return response;
};

export const cost = ({ items, module }) => {
  const response = items
    ?.filter((status) => status.status !== 'DRAFT')
    ?.map((product) =>
      product[`${module}Products`]?.map((product) =>
        Number(
          product.purchasePrice || (product.product && product.product.purchasePrice)
        )
      )
    )
    .flat()
    .reduce((initial, sum) => {
      return initial + Number(sum);
    }, 0);
  return response;
};

export default statistics;
