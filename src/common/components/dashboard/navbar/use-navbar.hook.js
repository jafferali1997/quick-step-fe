import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout, setLogoutLoader } from '@/provider/features/auth/auth.slice';

export default function useNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const profileMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const _user = JSON.parse(localStorage.getItem('user'));
      setUser(_user);
    }
  }, []);

  const handleLogout = async () => {
    dispatch(setLogoutLoader(true));
    const response = await dispatch(logout());
    if (response?.payload) {
      router.push('/');
    }
  };

  return {
    dispatch,
    user,
    anchorEl,
    setAnchorEl,
    open,
    handleClick,
    profileMenu,
    handleLogout,
    router
  };
}
