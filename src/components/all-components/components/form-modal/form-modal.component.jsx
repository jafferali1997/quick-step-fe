'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '@/common/components/custom-input/custom-input.component';
import Modal from '@/common/components/modal/modal.component';
import ModalFooter from '@/common/components/modal/components/modal-footer.component';
import CustomButton from '@/common/components/custom-button/custom-button.component';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(5, 'First name must be at least 5 characters long')
    .max(10, 'First name must be at most 10 characters long')
    .required('First Name is required'),
  lastName: yup.string().required('Last Name is required')
});

export default function FormModal() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  const modalCloseHandler = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    console.log(data);
    modalCloseHandler();
  };

  return (
    <div className="tw-m-5">
      <h3 className="tw-text-2xl tw-font-bold">Form Modal & Simple Modal</h3>
      <hr />
      <CustomButton
        className="btn-primary tw-m-5"
        onClick={() => setOpen(true)}
        text="Open From Modal"
      />

      <Modal show={open} onClose={modalCloseHandler} title="Form Modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <CustomInput
              type="text"
              name="firstName"
              placeholder="First Name"
              isRequired
              register={register}
              errors={errors}
            />
            <CustomInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              isRequired
              register={register}
              errors={errors}
            />
          </div>
          <ModalFooter onClose={modalCloseHandler} submitButtonText="Submit" />
        </form>
      </Modal>
    </div>
  );
}
