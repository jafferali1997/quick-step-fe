const calculateProductTotalPrice = ({
  discount = 0,
  discountGroups = [],
  quantity = 0,
  netPrice = 0
}) => {
  // Net amount = quantity * net price
  // Total = Net Amount - (Net Amount * Discount Percentage)

  const netAmmount = quantity * Number(netPrice);

  const calculatedDiscount =
    discount ||
    (discountGroups &&
      discountGroups?.length &&
      discountGroups[0]?.ProductDiscountGroup &&
      discountGroups[0].ProductDiscountGroup?.discount) ||
    (discountGroups &&
      discountGroups?.length &&
      discountGroups?.[0]?.ProductDiscountGroup &&
      discountGroups?.[0].ProductDiscountGroup?.disco) ||
    (discountGroups &&
      discountGroups?.length &&
      discountGroups?.[0]?.ProductDiscountGroup &&
      discountGroups?.[0]?.ProductDiscountGroup?.dis) ||
    (discountGroups && discountGroups.length && discountGroups?.[0].ProductDiscount);

  const discountInPercentage = calculatedDiscount / 100;

  // Calculate the discount
  const totalPrice =
    Number(netAmmount) - Number(netAmmount) * Number(discountInPercentage);

  return totalPrice.toFixed(2);
};

export default calculateProductTotalPrice;
