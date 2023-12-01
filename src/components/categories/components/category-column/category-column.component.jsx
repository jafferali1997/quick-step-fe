'use client';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PropTypes } from 'prop-types';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import PlusIcon from '@/common/icons/plus.icon';
import SearchIcon from '@/common/icons/search-icon';
import MenuDropDown from '../menu-drop-down/menu-drop-down.component';
import useCategoryColumn from './use-category-column.hook';
import CrossIcon from '@/common/icons/cross.icon';

export default function CategoryColumn({
  columnData,
  categoryLevel,
  handleClickCategory,
  categoryToRender,
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleRemoveColumn,
  borderClass,
  categoryIndex,
  showInputs,
  setShowInputs
}) {
  const {
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
  } = useCategoryColumn({
    handleAddCategory,
    categoryToRender,
    categoryIndex,
    showInputs,
    setShowInputs
  });

  return (
    <div
      className={`${borderClass} primary-scroll tw-flex tw-h-[600px] tw-w-[300px] tw-flex-col tw-gap-[16px] tw-overflow-y-auto tw-px-[20px] tw-py-[30px]`}
    >
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-3">
          {borderClass && (
            <div className="tw-p-1 hover:tw-cursor-pointer hover:tw-border hover:tw-border-solid hover:tw-border-disabled-input">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  handleRemoveColumn(categoryLevel);
                }}
              >
                <path
                  d="M6.00283 11.2293C5.90408 11.2299 5.80619 11.211 5.71478 11.1736C5.62336 11.1363 5.54021 11.0813 5.4701 11.0117L0.968187 6.50981C0.828439 6.36923 0.75 6.17906 0.75 5.98084C0.75 5.78262 0.828439 5.59245 0.968187 5.45186L5.4701 0.949951C5.61364 0.827029 5.79827 0.762797 5.98711 0.770091C6.17595 0.777385 6.35508 0.855667 6.48871 0.989295C6.62233 1.12292 6.70062 1.30205 6.70791 1.49089C6.7152 1.67973 6.65097 1.86436 6.52805 2.0079L2.55886 5.97709L6.52805 9.94627C6.63341 10.0508 6.70542 10.1842 6.73497 10.3296C6.76452 10.475 6.75029 10.6259 6.69407 10.7633C6.63785 10.9006 6.54218 11.0182 6.41914 11.1011C6.2961 11.1841 6.15122 11.2287 6.00283 11.2293Z"
                  fill="#7E7D7D"
                />
              </svg>
            </div>
          )}

          <h3 className="h3 tw-whitespace-nowrap">
            {categoryLevel === 1 ? 'Category' : `Sub Category ${categoryLevel - 1}`}
          </h3>
        </div>
        {showInput ? null : (
          <div className="hover:tw-cursor-pointer" onClick={handleButtonClick}>
            <CustomButton
              text="Add"
              className="btn-secondary tw-h-[33px] tw-w-[72px] tw-p-0"
              startIcon={<PlusIcon />}
            />
          </div>
        )}
      </div>

      {showInput && (
        <div className="tw-flex tw-max-w-[243px] tw-items-center tw-justify-between">
          <div className="tw-flex tw-h-10 tw-max-w-[202px] tw-items-center tw-justify-end tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-text-ultra-light-gray tw-py-px  tw-pr-0">
            <CustomInput
              value={value}
              onChange={handleAddButtonChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              type="text"
              className="tw-border-none "
              placeholder="Enter Category"
            />
            <div
              onClick={() => {
                handleSubmit();
                handleButtonClick();
              }}
              className="tw-flex tw-h-[38px] tw-w-[35px] tw-flex-col tw-items-center tw-justify-center tw-rounded-br-md tw-bg-[#eff6ff] tw-py-[11px] tw-pl-[9px] tw-pr-2.5 hover:tw-cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_15573_253404)">
                  <path
                    d="M15.7657 2.35933C15.4533 2.04689 14.9468 2.04689 14.6343 2.35933L5.04983 11.9439L1.3657 8.2598C1.0533 7.94736 0.546797 7.94739 0.234328 8.2598C-0.0781094 8.5722 -0.0781094 9.0787 0.234328 9.39114L4.48414 13.6409C4.79645 13.9533 5.30333 13.9531 5.61552 13.6409L15.7657 3.4907C16.0781 3.1783 16.0781 2.67177 15.7657 2.35933Z"
                    fill="#1D4ED8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15573_253404">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div onClick={handleButtonClick} className="hover:tw-cursor-pointer">
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.404297"
                width="26.5953"
                height="26"
                rx="4"
                fill="#E4E4E4"
                fill-opacity="0.4"
              />
              <path
                d="M14.8931 13L19.9551 7.93787C20.2845 7.60859 20.2845 7.07619 19.9551 6.74696C19.6258 6.41768 19.0934 6.41768 18.7642 6.74696L13.7021 11.809L8.64013 6.74696C8.3107 6.41768 7.7785 6.41768 7.44922 6.74696C7.11979 7.07623 7.11979 7.60859 7.44922 7.93787L12.5111 13L7.44926 18.062C7.11983 18.3913 7.11983 18.9237 7.44926 19.2529C7.52737 19.3312 7.62018 19.3934 7.72237 19.4357C7.82455 19.4781 7.9341 19.4998 8.04472 19.4997C8.26029 19.4997 8.47593 19.4172 8.64017 19.2529L13.7021 14.1909L18.7642 19.2529C18.8423 19.3312 18.9351 19.3933 19.0373 19.4357C19.1395 19.478 19.249 19.4998 19.3596 19.4997C19.5752 19.4997 19.7909 19.4172 19.9551 19.2529C20.2845 18.9236 20.2845 18.3913 19.9551 18.062L14.8931 13Z"
                fill="#7E7D7D"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="tw-bg-[#F2F6FD]">
        <CustomInput
          startIcon={<SearchIcon />}
          className="tw-bg-[#F2F6FD]"
          placeholder="Search"
          onChange={handleSearchButton}
          type="text"
        />
      </div>
      <div>
        <h4 className="h4">All Categories</h4>
      </div>
      {columnData.length !== 0 &&
        columnData
          .filter((item) =>
            item.categoryName.toLowerCase().includes(search.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={item.id}
              onClick={(e) => {
                if (!e.target.id.includes('three-dot')) {
                  handleClickCategory(item.id, item.categoryLevel + 1);
                  setClicked({ id: item.id, parentCategoryId: item.parentCategoryId });
                }
              }}
              className={`${
                clicked.id === item.id &&
                clicked.parentCategoryId === item.parentCategoryId
                  ? 'tw-bg-slate-200'
                  : ''
              } cate-btn tw-flex tw-h-[34px] tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-bg-secondary-white tw-px-[12px] tw-py-[8px]`}
            >
              <h5 className="h5">{item.categoryName}</h5>
              <MenuDropDown
                handleButtonClickedit={handleButtonClickedit}
                id={item.id}
                value={item.categoryName}
                level={item.categoryLevel}
                handleDeleteCategory={handleDeleteCategory}
              />
            </div>
          ))}
      <Dialog open={openPopup ?? false}>
        <div ref={ref} className="tw-w-[389px]">
          <div>
            <DialogTitle>Category</DialogTitle>
          </div>
          <DialogContent>
            <CustomInput
              placeholder="Category"
              label="Category Name"
              type="text"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <CustomButton
              onClick={() => setOpenPopup(false)}
              className=" btn-cancel"
              text="Cancel"
            />
            <CustomButton
              className="btn btn-primary "
              text="Update"
              onClick={() => {
                setOpenPopup(false);
                handleUpdateCategory(idToUpdateCategory, updateValue);
                setUpdateValue('');
              }}
            />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

CategoryColumn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columnData: PropTypes.array.isRequired,
  categoryLevel: PropTypes.number.isRequired,
  handleClickCategory: PropTypes.func.isRequired,
  categoryToRender: PropTypes.number.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleDeleteCategory: PropTypes.func.isRequired,
  handleUpdateCategory: PropTypes.func.isRequired,
  handleRemoveColumn: PropTypes.func.isRequired,
  borderClass: PropTypes.string,
  categoryIndex: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  showInputs: PropTypes.array.isRequired,
  setShowInputs: PropTypes.func.isRequired
};
