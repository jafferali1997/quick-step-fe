import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, twoFactorAuth } from '@/provider/features/user/user.slice';

function useTwoFactorAuthentication() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.user.data);

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    await dispatch(getCurrentUser({ successCallBack: () => {} }));
  };

  const handleSwitchTwoFactorAuth = async (event) => {
    await dispatch(twoFactorAuth({ payload: { isTwoFactorAuth: event.target.checked } }));
    currentUser();
  };

  return { auth, handleSwitchTwoFactorAuth };
}

export default useTwoFactorAuthentication;
