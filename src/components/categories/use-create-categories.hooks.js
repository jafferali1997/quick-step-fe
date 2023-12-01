'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategory,
  updateProductCategory
} from '@/provider/features/product-category/product-category.slice';

export default function useCreateCategories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([
    {
      categoryToRender: 0,
      categoryLevel: 1,
      categories: []
    }
  ]);
  const [showInputs, setShowInputs] = useState([false]);
  const [categoryLevelToGet, setCategoryLevelToGet] = useState(1);
  const [categoryToRender, setCategoryToRender] = useState(0);
  const allProductCategoryRes = useSelector((state) => state.productCategory.getAll);
  const prodctCategoryRef = useRef(true);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedcategoryLevel, setSetSelectedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategories = (array) => {
    setCategories(array);
    if (array.length !== showInputs.length) {
      setShowInputs(
        array.map((item, index) =>
          showInputs[index] !== undefined ? showInputs[index] : false
        )
      );
    }
  };

  const onDeleteCategory = (id, level) => {
    const categoryToDelete = categories.find((item) => item.categoryToRender === id);

    const newArray = [
      ...categories
        .filter((item) =>
          categoryToDelete ? item.categoryLevel < categoryToDelete?.categoryLevel : true
        )
        .map((item) => {
          if (item.categoryLevel === level) {
            return {
              ...item,
              categories: item.categories.filter((innerItem) => innerItem.id !== id)
            };
          }
          return item;
        })
    ];
    handleCategories(newArray);
  };

  const getAllCategoryApi = (data, type = null) => {
    const { categoryLevelToGet, parentCategoryId, categoryLevel } = data;
    dispatch(
      getAllProductCategory({
        payload: {
          condition: {
            categoryLevel:
              categoryLevel === 1 ? categoryLevel : categoryLevelToGet ?? categoryLevel,
            ...(parentCategoryId && { parentCategoryId })
          }
        }
      })
    );
  };

  useEffect(() => {
    if (prodctCategoryRef.current) {
      prodctCategoryRef.current = false;
      getAllCategoryApi({ categoryLevelToGet: 1 });
    }
  }, [dispatch]);

  useEffect(() => {
    if (allProductCategoryRes.isSuccess) {
      if (
        categories.find(
          (item) => item.categoryLevel === allProductCategoryRes.data[0].categoryLevel
        )
      ) {
        handleCategories([
          ...categories.map((item) => {
            if (item.categoryLevel === allProductCategoryRes.data[0].categoryLevel) {
              return {
                ...item,
                categoryToRender: allProductCategoryRes.data[0].parentCategoryId ?? 0,
                categories: allProductCategoryRes.data
              };
            }
            return item;
          })
        ]);
      } else {
        handleCategories([
          ...categories,
          {
            categoryToRender: allProductCategoryRes.data[0].parentCategoryId,
            categoryLevel: allProductCategoryRes.data[0].categoryLevel,
            categories: allProductCategoryRes.data
          }
        ]);
      }
    }
    if (allProductCategoryRes.message === 'Record Not Found') {
      if (categories.find((item) => item.categoryLevel === categoryLevelToGet)) {
        handleCategories([
          ...categories.map((item) => {
            if (item.categoryLevel === categoryLevelToGet) {
              return {
                ...item,
                categoryToRender,
                categories: []
              };
            }
            return item;
          })
        ]);
      } else {
        handleCategories([
          ...categories,
          {
            categoryToRender,
            categoryLevel: categoryLevelToGet,
            categories: []
          }
        ]);
      }
    }
  }, [allProductCategoryRes]);

  const handleAddCategory = (parentCategoryId, categoryName) => {
    dispatch(
      createProductCategory({
        payload: { parentCategoryId, categoryName },
        successCallBack: getAllCategoryApi
      })
    );
  };

  const confirmationModalCloseHandler = () => {
    setOpenConfirmationModal(false);
  };

  const handleDeleteCategory = (id, value, level) => {
    setOpenConfirmationModal(true);
    setSelectedId(id);
    setSelectedCategory(value);
    setSetSelectedCategory(level);
  };

  const confirmationModalHandler = () => {
    if (selectedId) {
      dispatch(
        deleteProductCategory({
          payload: selectedId,
          successCallBack: () => onDeleteCategory(selectedId, selectedcategoryLevel)
        })
      );
      setOpenConfirmationModal(false);
      setSelectedId(null);
    }
  };

  const handleUpdateCategory = (id, data) => {
    dispatch(
      updateProductCategory({
        payload: { id, data: { categoryName: data } },
        successCallBack: getAllCategoryApi
      })
    );
  };

  const handleClickCategory = (id, categoryLevel) => {
    if (
      !categories.find(
        (category) =>
          category.categoryLevel === categoryLevel && category.categoryToRender === id
      )
    ) {
      setCategoryLevelToGet(categoryLevel);
      setCategoryToRender(id);
      getAllCategoryApi({ categoryLevelToGet: categoryLevel, parentCategoryId: id });
    }
    handleCategories([
      ...categories.filter((item) => item.categoryLevel <= categoryLevel)
    ]);
  };

  const handleRemoveColumn = (categoryLevel) => {
    const newArray = [...categories.filter((item) => item.categoryLevel < categoryLevel)];
    handleCategories(newArray);
  };

  return {
    categories,
    handleClickCategory,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleRemoveColumn,
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    selectedCategory,
    showInputs,
    setShowInputs
  };
}
