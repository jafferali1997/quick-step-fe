import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { changePassword } from '@/provider/features/user/user.slice';

function useChangePassword() {
  const dispatch = useDispatch();

  const passwordSchema = yup.object().shape({
    oldPassword: yup.string(),
    newPassword: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Must match "new password" field value')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(passwordSchema)
  });

  const handleChangePassword = async (value) => {
    const { oldPassword, newPassword, confirmPassword } = value;
    await dispatch(
      changePassword({
        payload: {
          oldPassword,
          newPassword,
          confirmPassword
        }
      })
    );
  };

  return {
    register,
    errors,
    handleSubmit,
    handleChangePassword
  };
}

export default useChangePassword;
