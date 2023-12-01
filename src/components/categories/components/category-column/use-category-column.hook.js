'use client';

import { useEffect, useRef, useState } from 'react';

export default function useCategoryColumn({
  handleAddCategory,
  categoryToRender,
  categoryIndex,
  showInputs,
  setShowInputs
}) {
  const [search, setSearch] = useState('');
  const [idToUpdateCategory, setIdToUpdateCategory] = useState();
  const [updateValue, setUpdateValue] = useState();
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [clicked, setClicked] = useState({ id: null, parentCategoryId: null });
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (clicked.parentCategoryId && categoryToRender !== clicked.parentCategoryId) {
      setClicked({ id: null, parentCategoryId: null });
    }
  }, [categoryToRender]);

  useEffect(() => {
    if (showInputs[categoryIndex] !== showInput) {
      setShowInput(showInputs[categoryIndex]);
    }
  }, [showInputs]);

  const handleButtonClick = () => {
    let tempLatest = [
      ...showInputs.map((item, index) => {
        if (index === categoryIndex) {
          return !item;
        }
        return item;
      })
    ];

    tempLatest = [
      ...tempLatest.map((item, index) => {
        if (tempLatest[categoryIndex] && index !== categoryIndex) {
          return false;
        }
        return item;
      })
    ];
    setShowInputs(tempLatest);
  };

  const handleAddButtonChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    handleAddCategory(categoryToRender, value);
    setValue('');
  };

  const handleSearchButton = (e) => {
    setSearch(e.target.value);
  };

  const handleButtonClickedit = (id, value) => {
    setUpdateValue(value);
    setIdToUpdateCategory(id);
    setOpenPopup(!openPopup);
  };

  return {
    handleButtonClick,
    showInput,
    value,
    handleAddButtonChange,
    search,
    handleSubmit,
    handleSearchButton,
    openPopup,
    setOpenPopup,
    handleButtonClickedit,
    idToUpdateCategory,
    setUpdateValue,
    updateValue,
    ref,
    clicked,
    setClicked
  };
}
