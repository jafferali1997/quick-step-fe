'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '@/common/components/dashboard/navbar/navbar.component';
import Sidebar from '@/common/components/dashboard/sidebar/sidebar.component';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import {
  checkExpiryDateOfToken,
  isLoginVerified
} from '@/common/utils/access-token.util';
import {
  getEmailForURL,
  getUser,
  is2FAEnabled,
  isEmailVerified,
  isPhoneVerified,
  isProfileCreated,
  isSuperAdmin
} from '@/common/utils/users.util';
import Loadar from '@/common/components/loadar/loadar.component';

/**
 * Return the component if access token is verified and return to home page if its not
 * @param {component} props take a component
 * @returns component | redirect to home page
 */
export default function Private({ component, title = NAVBARTITLE.DOCUMENTS }) {
  const [toggle, setToggle] = useState(false);
  const { logoutLoader } = useSelector((state) => state?.auth);

  const router = useRouter();
  const user = getUser();
  const email = getEmailForURL(user?.email);

  useEffect(() => {
    if (checkExpiryDateOfToken() !== true) {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, []);

  if (logoutLoader) {
    return <Loadar />;
  }

  if (!isSuperAdmin()) {
    if (!isProfileCreated() && user) {
      if (typeof window === 'object') {
        router.push(
          `/profile?userName=${user.userName}&email=${email}&userId=${user.id}`
        );
      }
    }

    if (!isEmailVerified() && user) {
      if (typeof window === 'object') {
        router.push(`/verify-email?type=email-verification&email=${email}`);
      }
    }

    if (
      is2FAEnabled() &&
      !isLoginVerified() &&
      isPhoneVerified() &&
      isEmailVerified() &&
      user
    ) {
      if (typeof window === 'object') {
        router.push(`/two-factor-auth?userId=${user.id}&phone=${user.phone}`);
      }
    }
  } else {
    router.push('/super-admin/dashboard');
  }

  return (
    <div className="content tw-basis-5/6 tw-bg-secondary-gray">
      <div className="navbar-main">
        <Navbar setToggle={setToggle} value={toggle} title={title} />
      </div>
      <div className="scroll-content">{component}</div>
    </div>
  );
}

Private.propTypes = {
  component: PropTypes.element.isRequired,
  title: PropTypes.string
};
