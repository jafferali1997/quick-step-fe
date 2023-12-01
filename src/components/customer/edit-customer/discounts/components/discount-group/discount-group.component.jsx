import PropTypes, { object } from 'prop-types';
import { FormProvider } from 'react-hook-form';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Modal from '@/common/components/modal/modal.component';
import MultiSelect from '@/common/components/multi-select/multi-select.component';
import useDiscountGroup from './use-discount-group.hook';
import ModalFooter from '@/common/components/modal/components/modal-footer.component';

export function stopPropagate(callback) {
  return (e) => {
    e.stopPropagation();
    e.preventDefault();
    callback();
  };
}

export default function DiscountGroup({
  options,
  setOptions,
  selectedOptions,
  setSelectedOptions
}) {
  const {
    register,
    handleSubmit,
    errors,
    methods,
    open,
    modalCloseHandler,
    discountGroupSubmit,
    setOpen
  } = useDiscountGroup(options, setOptions);

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-[8px]">
        <label className=" tw-flex tw-flex-col tw-gap-[8px] tw-text-xs tw-font-medium tw-capitalize tw-not-italic tw-leading-6 tw-text-text-black">
          Discount Group
        </label>

        <MultiSelect
          placeholder="Select Discount Group(s)"
          options={options?.filter((option) => !selectedOptions.includes(option))}
          defaultOptions={selectedOptions}
          addClickHandler={() => setOpen(true)}
          className="tw-h-11"
          handleChange={(value) => {
            setSelectedOptions(value);
          }}
        />
      </div>
      <Modal onClose={modalCloseHandler} show={open} title="Add Discount Group">
        {/* <FormProvider {...methods}> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(discountGroupSubmit)(e);
          }}
        >
          <div className="tw-flex tw-flex-col tw-gap-2">
            <CustomInput
              type="text"
              name="discountGroupName"
              placeholder="Discount Group"
              register={register}
            />
            {/* <CustomInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              isRequired
              register={register}
            /> */}
          </div>
          <ModalFooter onClose={modalCloseHandler} submitButtonText="Submit" />
        </form>
        {/* </FormProvider> */}
      </Modal>
    </>
  );
}

const groupShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
});

DiscountGroup.propTypes = {
  options: PropTypes.arrayOf(groupShape).isRequired,
  setOptions: PropTypes.func.isRequired,
  selectedOptions: PropTypes.arrayOf(groupShape).isRequired,
  setSelectedOptions: PropTypes.func.isRequired
};
