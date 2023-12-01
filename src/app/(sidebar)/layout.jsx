'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Navbar from '@/common/components/dashboard/navbar/navbar.component';
import Sidebar from '@/common/components/dashboard/sidebar/sidebar.component';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';

export default function Layout({ children }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="dashboard-main">
      <div className="sidebar tw-relative tw-basis-1/6">
        <Sidebar setToggle={setToggle} toggle={toggle} />
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};
