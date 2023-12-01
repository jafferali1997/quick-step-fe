'use client';

import Link from 'next/link';
import CategoryColumn from './components/category-column/category-column.component';
import useCreateCategories from './use-create-categories.hooks';
import ConfirmationDialog from '@/common/components/custom-dialog-confirmation/ConfirmationDialog';

export default function CreateCategories() {
  const {
    handleAddCategory,
    categories,
    handleClickCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleRemoveColumn,
    openConfirmationModal,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    selectedCategory,
    showInputs,
    setShowInputs
  } = useCreateCategories();
  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-[16px] tw-p-[24px]">
        <Link href="/dashboard">
          <img src="/assets/images/back-btn.svg" alt="back" />
        </Link>
        <h2 className="admin-top-heading">Create Category</h2>
      </div>
      <ConfirmationDialog
        show={openConfirmationModal}
        onClose={() => confirmationModalCloseHandler()}
        onConfirm={() => confirmationModalHandler()}
        message="Are you sure you want to delete?"
        content={<p>{selectedCategory}</p>}
      />
      <div className="common-box tw-m-4 tw-max-h-[650px] tw-max-w-[95%] tw-p-4">
        <div className="tw-overflow-x-auto">
          <div className="tw-grid-rows tw-m-auto tw-grid tw-auto-cols-min tw-grid-flow-col tw-p-0">
            {categories.map((item, index) => (
              <CategoryColumn
                categoryIndex={index}
                showInputs={showInputs}
                setShowInputs={setShowInputs}
                columnData={item.categories}
                categoryToRender={item.categoryToRender}
                categoryLevel={item.categoryLevel}
                handleClickCategory={handleClickCategory}
                handleAddCategory={handleAddCategory}
                handleDeleteCategory={handleDeleteCategory}
                handleUpdateCategory={handleUpdateCategory}
                handleRemoveColumn={handleRemoveColumn}
                borderClass={
                  index !== 0
                    ? 'tw-border-l-disabled-input tw-border-l tw-border-solid'
                    : null
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
