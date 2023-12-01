'use client';

import CustomerIcon from '@/common/icons/sidebar/administrations/customer.icon';
import ProductIcon from '@/common/icons/sidebar/administrations/products.icon';
import UserRolesIcon from '@/common/icons/sidebar/administrations/users-roles.icon';
import DatabaseIcon from '@/common/icons/sidebar/clouds/database.icon';
import DashboardIcon from '@/common/icons/sidebar/dashboard.icon';
import CorrespondenceIcon from '@/common/icons/sidebar/documents/correspondence.icon';
import CreditNotesIcon from '@/common/icons/sidebar/documents/credit-notes.icon';
import DeliveryNotesIcon from '@/common/icons/sidebar/documents/delivery-notes.icon';
import InquiriesIcon from '@/common/icons/sidebar/documents/inquiries.icon';
import InvoiceIcon from '@/common/icons/sidebar/documents/invoice.icon';
import OfferIcon from '@/common/icons/sidebar/documents/offer.icon';
import OrderIcon from '@/common/icons/sidebar/documents/order.icon';
import PurchaseOrderIcon from '@/common/icons/sidebar/documents/purchase-order.icon';
import RecurringInvoiceIcon from '@/common/icons/sidebar/documents/recurring-invoices.icon';
import EmployeesIcon from '@/common/icons/sidebar/employee-management/employees.icon';
import ExpendituresIcon from '@/common/icons/sidebar/expenses/expenditures.icon';
import GeneralIcon from '@/common/icons/sidebar/settings/general.icon';
import DocumentSettingIcon from '@/common/icons/sidebar/settings/settings.icon';
import { setSidebarToggleItem } from '@/provider/features/auth/auth.slice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const sidebarLinks = [
  { label: 'Dashboard', icon: <DashboardIcon className="" />, href: '/dashboard' },
  {
    label: 'Documents',
    icon: null,
    subLinks: [
      { lablel: 'Offer', icon: <OfferIcon />, href: '/offer/view' },
      { lablel: 'Order', icon: <OrderIcon />, href: '/order/view' },
      {
        lablel: 'Delivery Notes',
        icon: <DeliveryNotesIcon />,
        href: '/delivery-notes/view'
      },
      { lablel: 'Invoice', icon: <InvoiceIcon />, href: '/invoices/view' },
      { lablel: 'Credits Notes', icon: <CreditNotesIcon />, href: '#' },
      {
        lablel: 'Recurring Invoices',
        icon: <RecurringInvoiceIcon />,
        href: '#'
      },
      { lablel: 'Purchase Order', icon: <PurchaseOrderIcon />, href: '#' },
      { lablel: 'Inquiries', icon: <InquiriesIcon />, href: '#' },
      { lablel: 'Correspondence', icon: <CorrespondenceIcon />, href: '#' }
    ]
  },
  {
    label: 'Administrations',
    icon: null,
    subLinks: [
      { lablel: 'Customer', icon: <CustomerIcon />, href: '/customer' },
      { lablel: 'Products', icon: <ProductIcon />, href: '/product' },
      { lablel: 'Categories', icon: <ProductIcon />, href: '/category/create' },
      { lablel: 'Business Owner', icon: <EmployeesIcon />, href: '/business-owner/view' },
      { lablel: 'Users & Roles', icon: <UserRolesIcon />, href: '#' }
    ]
  },
  {
    label: 'Employee Management',
    icon: null,
    subLinks: [{ lablel: 'Employees', icon: <EmployeesIcon />, href: '#' }]
  },
  {
    label: 'Expenses',
    icon: null,
    subLinks: [
      { lablel: 'Expenditures', icon: <ExpendituresIcon />, href: '/expenditure' }
    ]
  },
  {
    label: 'Cloud',
    icon: null,
    subLinks: [{ lablel: 'Repository', icon: <DatabaseIcon />, href: '/repository' }]
  },
  {
    label: 'Setting',
    icon: null,
    subLinks: [
      {
        lablel: 'General Setting',
        icon: <GeneralIcon />,
        href: '/setting/general-setting'
      },
      {
        lablel: 'Profile Setting',
        icon: <GeneralIcon />,
        href: '/setting/profile-setting'
      },
      {
        lablel: 'Account Setting',
        icon: <ProductIcon />,
        href: '/setting/account-setting'
      },
      {
        lablel: 'Document Setting',
        icon: <DocumentSettingIcon />,
        href: '/setting/document-setting'
      }
    ]
  }
];

export default function Sidebar({ toggle, setToggle }) {
  const router = usePathname();
  const dispatch = useDispatch();
  const { sidebarToggleItem } = useSelector((state) => state?.auth);
  const handleChange = (panel) => (event, sidebarToggleItem) => {
    dispatch(setSidebarToggleItem(sidebarToggleItem ? panel : false));
  };

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
      <div className="multistep-wrapper tw-flex tw-flex-col tw-gap-6 tw-bg-primary-blue tw-pl-6 tw-pr-5">
        {sidebarLinks.map((navLink) => {
          if (navLink.subLinks) {
            return (
              <Accordion
                expanded={sidebarToggleItem === navLink.label}
                onChange={handleChange(navLink.label)}
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

Sidebar.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired
};
