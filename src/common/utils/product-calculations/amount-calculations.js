import calculateProductTotalPrice from './calculate-product-total';

export const netAmount = (data) => {
  if (!Array.isArray(data)) {
    return 0;
  }

  const response = data?.reduce((sum, product) => {
    const result = product.netPrice || (product.product && product.product.netPrice);

    if (result) {
      return sum + result;
    }
    return sum;
  }, 0);

  return response || 0;
};

export const taxRate = (data) => {
  if (!Array.isArray(data)) {
    return 0;
  }

  const response = data?.reduce((sum, product) => {
    const result = product.taxRate || (product.taxRate && product.taxRate.taxRate);
    if (result) {
      const tax =
        result && String(result).includes('%')
          ? Number(result.split('%')[0])
          : Number(result);
      return sum + tax / 100;
    }
    return sum;
  }, 0);

  return response || 0;
};

export const quantity = (data) => {
  if (!Array.isArray(data)) {
    return 0;
  }

  const response = data?.reduce((sum, product) => {
    const result = product.quantity || (product.product && product.product.quantity);

    if (result) {
      return sum + result;
    }
    return sum;
  }, 0);

  return response || 0;
};

export const lineItemNetAmount = (data) => {
  if (!Array.isArray(data)) {
    return 0;
  }

  const response = data?.reduce((sum, product) => {
    const { discountGroups, quantity, netPrice } = product;
    const result = calculateProductTotalPrice({
      discountGroups,
      quantity: quantity || (product.product && product.product.quantity),
      netPrice: netPrice || (product.product && product.product.netPrice)
    });

    if (result) {
      return sum + Number(result);
    }
    return sum;
  }, 0);

  return response || 0;
};

export const plusVat = (data) => {
  if (!Array.isArray(data)) {
    return 0;
  }

  const response = data?.reduce((sum, product) => {
    const { discountGroups, netPrice } = product;
    const quantity = product.quantity || (product.product && product.product.quantity);
    const taxRate =
      product.taxRate ||
      (product.product && product.product.taxRate && product.product.taxRate.taxRate);

    // const result = taxRate * quantity;

    const total = calculateProductTotalPrice({
      discountGroups,
      quantity: quantity || (product.product && product.product.quantity),
      netPrice: netPrice || (product.product && product.product.netPrice)
    });

    const value = total / 100;
    const result = value * taxRate;

    if (result) {
      return sum + result;
    }
    return sum;
  }, 0);

  return (response && response.toFixed(2)) || 0;
};

export const invoiceAmountWithOutVAT = (data) => {
  return lineItemNetAmount(data);
};

export const invoiceAmountWithVAT = (data) => {
  return lineItemNetAmount(data) + plusVat(data);
};
