'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import DashboardIcon from '@/common/icons/sidebar/dashboard.icon';
import EmployeesIcon from '@/common/icons/sidebar/employee-management/employees.icon';

const sidebarLinks = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/super-admin/dashboard' },
  {
    label: 'Administrations',
    icon: null,
    subLinks: [
      {
        lablel: 'Business Owner',
        icon: <EmployeesIcon />,
        href: '/super-admin/business-owner'
      }
    ]
  }
];

export default function SuperAdminSidebar({ toggle, setToggle }) {
  const router = usePathname();

  return (
    <div
      className={`${
        toggle ? 'open' : ''
      } offcanva tw-fixed tw-z-[9999] tw-h-screen tw-w-[273px] tw-bg-primary-blue tw-bg-hero-pattern tw-bg-right-top tw-bg-no-repeat`}
    >
      <div className="tw-absolute tw-right-1 tw-top-1 tw-z-[9999] tw-rounded-[4px] tw-border-[1px] tw-border-x-secondary-light-blue xs:tw-block semixl:tw-hidden">
        <ChevronLeftIcon className="tw-text-white" onClick={() => setToggle(!toggle)} />
      </div>
      <div className="tw-p-6">
        <Link className="tw-block" href="/dashboard">
          <img
            className="tw-mx-auto tw-block"
            src="/assets/images/sidebar/quickStepLogo.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className="multistep-wrapper tw-flex tw-flex-col tw-gap-6 tw-pl-6 tw-pr-5">
        {sidebarLinks.map((navLink) => {
          if (navLink.subLinks) {
            return (
              <Accordion
                key={navLink.label}
                className="!tw-before:none !tw-m-0 !tw-bg-primary-blue !tw-shadow-none"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="!tw-m-0 !tw-h-fit !tw-min-h-fit tw-bg-primary-blue !tw-px-0 !tw-py-0"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    {/* <ArrowIcon className="arrow-cotrol" /> */}
                    <span className="tw-font-dm tw-text-base tw-leading-6 tw-text-white">
                      {navLink.label}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="tw-bg-primary-blue !tw-px-0 !tw-py-0">
                  <ul className="tw-mt-2 tw-flex tw-flex-col tw-gap-2">
                    {navLink.subLinks.map((subLink) => {
                      return (
                        <Link
                          key={subLink.lablel}
                          href={subLink.href}
                          className={`nav-link ${
                            router === subLink.href ? 'nav-link-select' : ''
                          } tw-cursor-pointer tw-rounded-md tw-px-6 tw-py-2`}
                        >
                          <div className="tw-flex tw-items-center tw-gap-2">
                            {subLink.icon}
                            <span className="tw-font-dm tw-text-base tw-leading-6 tw-text-white">
                              {subLink.lablel}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </ul>
                </AccordionDetails>
              </Accordion>
            );
          } else {
            return (
              <Link
                key={navLink.label}
                href={navLink.href}
                className="tw-mt-7 tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2"
              >
                {navLink.icon}
                <span className="tw-font-dm tw-text-sm tw-text-white">
                  {navLink.label}
                </span>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

SuperAdminSidebar.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired
};
