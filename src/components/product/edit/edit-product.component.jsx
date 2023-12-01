'use client';

import useEditProduct from './use-edit-product.hook';
import ProductForm from '../components/product-form/product-form.component';
import Loadar from '@/common/components/loadar/loadar.component';

export default function EditProduct() {
  const {
    priceInputValues,
    handlePriceInput,
    discountInputValues,
    handleDiscountInput,
    ref,
    openPopup,
    setOpenPopup,
    selectedTag,
    handleTags,
    onSubmit,
    handleSubmit,
    register,
    categories,
    handleClickCategory,
    errors,
    selectedCategory,
    setSelectedCategory,
    data,
    control,
    isLoading,
    setValue,
    taxRate,
    setTaxRate
  } = useEditProduct();
  return (
    <>
      {isLoading && <Loadar />}
      {data && (
        <ProductForm
          priceInputValues={priceInputValues}
          handlePriceInput={handlePriceInput}
          discountInputValues={discountInputValues}
          handleDiscountInput={handleDiscountInput}
          ref={ref}
          categories={categories}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          selectedTag={selectedTag}
          handleTags={handleTags}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          control={control}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleClickCategory={handleClickCategory}
          data={data}
          setValue={setValue}
          taxRate={taxRate}
          setTaxRate={setTaxRate}
        />
      )}
    </>
  );
}
