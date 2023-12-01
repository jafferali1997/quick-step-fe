'use client';

import PropTypes from 'prop-types';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import useProductModal from './use-product-modal.hook';
import CustomSelect from '@/common/components/custom-select/custom-select.component';

export default function ProductModal({ data, setData, openPopup, setOpenPopup }) {
  const { value, handleSetValue, setValue } = useProductModal(data);
  return (
    <div>
      {openPopup && (
        <>
          <div>
            <form>
              {value?.map((item, index) =>
                item.type === 'select' ? (
                  <CustomSelect
                    label={
                      <span>
                        {item.label}
                        <span className="tw-ml-1 tw-text-danger">*</span>
                      </span>
                    }
                    value={item.value}
                    onChange={(e) => handleSetValue(index, e.target.value)}
                    options={item.options}
                  />
                ) : (
                  <div className="tw-mt-4">
                    <CustomInput
                      label={
                        <span>
                          {item.label}
                          <span className="tw-ml-1 tw-text-danger">*</span>
                        </span>
                      }
                      type={item.type ?? 'text'}
                      value={item.value}
                      onChange={(e) => handleSetValue(index, e.target.value)}
                    />
                  </div>
                )
              )}
            </form>
          </div>
          <div className="tw-mt-4 tw-flex tw-justify-between tw-gap-4">
            <CustomButton
              className="btn-secondary tw-h-[40px] tw-w-[98px] tw-px-[35px] tw-py-[8px]"
              text={value?.[0]?.button}
              onClick={() => {
                setData(value);
                setValue();
                setOpenPopup(false);
              }}
            />
            <CustomButton
              onClick={() => setOpenPopup(false)}
              className="btn-white-cancel tw-h-[40px] tw-w-[98px] tw-px-[35px] tw-py-[8px]"
              text="Cancel"
            />
          </div>
        </>
      )}
    </div>
  );
}

ProductModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  openPopup: PropTypes.bool.isRequired,
  setOpenPopup: PropTypes.func.isRequired
};
