'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import Menu from '@mui/material/Menu';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, ListItemIcon, Tooltip } from '@mui/material/node';
import { Logout, Settings } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import { logout } from '@/provider/features/auth/auth.slice';
import { getAccessToken, isLoginVerified } from '@/common/utils/access-token.util';

const menus = [
  { id: 'home', menu: 'Home', link: '/' },
  { id: 'features', menu: 'Features', link: '/' },
  { id: 'pricing', menu: 'Pricing', link: '/' },
  { id: 'faq', menu: 'FAQ', link: '/' },
  { id: 'helpcenter', menu: 'Help Center', link: '/' }
];

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [loginVerified, setLoginVerified] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setLoginVerified(isLoginVerified());

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (response?.payload) {
      window.location.href = '/';
    }
  };

  return (
    <div className="tw-sticky tw-top-0 tw-z-[99] tw-bg-white tw-px-2 tw-px-4 tw-py-5 tw-shadow-custom">
      <div className="tw-m-auto tw-flex tw-w-full tw-max-w-7xl tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center sm:tw-gap-3 lg:tw-gap-[80px]">
          <div className="tw-flex tw-items-center tw-gap-3">
            <img
              onClick={() => setOpenSidebar(!openSidebar)}
              className="xs:tw-block lg:tw-hidden"
              width="22px"
              height="16px"
              src="assets/images/navbar/hamburger.svg"
              alt="hamburger"
            />
            <a href="/">
              <img
                className="lg xs:tw-h-8 lg:tw-h-[48px]"
                src="/assets/images/logo.png"
                alt="site logo"
              />
            </a>
          </div>
          <ul
            className={`${
              openSidebar ? 'menuopen' : 'menuclose'
            } !tw-mt-0 tw-items-center tw-transition-all tw-duration-300 tw-ease-in xs:tw-absolute xs:tw-left-0 xs:tw-top-full xs:tw-mt-2 xs:tw-flex xs:tw-h-header-calc-viewport xs:tw-w-full xs:tw-flex-col xs:tw-gap-y-7 xs:tw-bg-white lg:tw-relative lg:tw-flex lg:tw-h-fit lg:tw-w-fit lg:tw-flex-row lg:tw-items-center lg:tw-gap-8 `}
          >
            {menus.map((menu) => {
              return (
                <li key={menu.id} className="tw-inline-block tw-w-fit">
                  <a
                    className="tw-font-dm tw-text-base tw-font-normal tw-capitalize tw-leading-6 hover:tw-border-b-2 hover:tw-border-primary-purple hover:tw-text-primary-purple"
                    href={menu.link}
                  >
                    {menu.menu}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tw-flex tw-items-center tw-gap-6">
          <img
            height="21px"
            width="21px"
            src="assets/images/navbar/globe-icon.svg"
            alt="globe icon"
          />

          {loginVerified === true && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    className="tw-m-0 tw-flex tw-items-center tw-gap-2"
                  >
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 10 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.37501 3.5C2.37501 2.05025 3.55026 0.875 5.00001 0.875C6.44976 0.875 7.62501 2.05025 7.62501 3.5C7.62501 4.94975 6.44976 6.125 5.00001 6.125C3.55026 6.125 2.37501 4.94975 2.37501 3.5Z"
                        fill="#BBBBBB"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.188237 11.7281C0.233352 9.10908 2.37033 7 5.00001 7C7.62975 7 9.76677 9.10918 9.81179 11.7283C9.81477 11.902 9.7147 12.061 9.55681 12.1335C8.16909 12.7702 6.62548 13.125 5.0002 13.125C3.37476 13.125 1.83101 12.7701 0.443198 12.1333C0.285307 12.0608 0.185245 11.9018 0.188237 11.7281Z"
                        fill="#BBBBBB"
                      />
                    </svg>

                    <div className="tw-flex tw-items-center">
                      <span className="tw-font-dm tw-text-base tw-font-normal tw-leading-6 tw-text-text-dark-gray">
                        {`${user?.userName}`}
                      </span>
                      <ExpandMoreIcon />
                    </div>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                // onClose={profileMenu}
                // onClick={profileMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                // onClick={() =>
                //   router.push(
                //     `/profile?email=${user.email}&userId=${user.id}&userName=${user.userName}`
                //   )
                // }
                >
                  <Link href="/">Profile</Link>
                </MenuItem>
                <MenuItem>
                  {/* <ListItemIcon>
                    {/* <Logout fontSize="small" /> */}

                  <Link href="/dashboard">Dashboard</Link>
                </MenuItem>
              </Menu>
            </>
          )}
          {loginVerified === false && (
            <>
              <CustomButton
                href="/login"
                className="btn-outline tw-h-auto tw-rounded-[10px] tw-border-2 tw-px-5 tw-py-2 tw-font-dm tw-text-lg tw-font-medium tw-capitalize tw-leading-6"
                text="Login"
              />
              <CustomButton
                href="/sign-up"
                className="btn-primary tw-h-auto tw-rounded-[10px] tw-bg-primary-blue tw-px-5 tw-py-[10px] tw-font-dm tw-text-lg tw-font-medium tw-capitalize tw-leading-6"
                text="Signup"
              />
            </>
          )}

          {/* <div className="tw-flex tw-items-center tw-gap-6 tw-rounded-[36px] tw-border-2 tw-border-disabled-input tw-px-4 tw-py-2">
            <img
              height="15px"
              width="19px"
              src="assets/images/navbar/hamburger.svg"
              alt="hamburger icon"
            />

            <div className="tw-h-8 tw-w-8 tw-overflow-hidden tw-rounded-2xl">
              <img
                className="tw-h-full tw-w-full tw-object-cover tw-object-center"
                src="assets/images/navbar/profile.png"
                alt=""
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
