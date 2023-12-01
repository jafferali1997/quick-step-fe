'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Navbar from '@/common/components/dashboard/navbar/navbar.component';
import SuperAdminSidebar from '@/common/components/dashboard/sidebar/super-admin-sidebar.component';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import { checkExpiryDateOfToken } from '@/common/utils/access-token.util';
import { getUser, isSuperAdmin } from '@/common/utils/users.util';

/**
 * Return the component if access token is verified and return to home page if its not
 * @param {component} props take a component
 * @returns component | redirect to home page
 */
export default function SuperAdmin({ component, title = NAVBARTITLE.DOCUMENTS }) {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (checkExpiryDateOfToken() !== true) {
      localStorage.removeItem('user');
      router.push('/');
    }
    if (!isSuperAdmin()) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="dashboard-main">
      <div className="sidebar tw-relative tw-basis-1/6">
        <SuperAdminSidebar setToggle={setToggle} toggle={toggle} />
      </div>
      <div className="content tw-basis-5/6 tw-bg-secondary-gray">
        <Navbar setToggle={setToggle} value={toggle} title={title} />
        {component}
      </div>
    </div>
  );
}

SuperAdmin.propTypes = {
  component: PropTypes.element.isRequired,
  title: PropTypes.string
};
