'use client';

import Loadar from '@/common/components/loadar/loadar.component';
import ProductForm from '../components/product-form/product-form.component';
import useDetailProduct from './use-detail-product.hook';

export default function DetailProduct() {
  const {
    priceInputValues,
    discountInputValues,
    selectedTag,
    selectedCategory,
    data,
    isLoading
  } = useDetailProduct();

  return (
    <>
      {isLoading && <Loadar />}
      {data && (
        <ProductForm
          priceInputValues={priceInputValues}
          discountInputValues={discountInputValues}
          selectedTag={selectedTag}
          data={data}
          disabled={true}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
}
