'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Settings from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import useNavbar from './use-navbar.hook';

export default function Navbar({ setToggle, value, title }) {
  const {
    dispatch,
    user,
    anchorEl,
    setAnchorEl,
    open,
    handleClick,
    profileMenu,
    handleLogout,
    router
  } = useNavbar(setToggle, value);

  return (
    <div className="tw-shadow-custom2 tw-relative tw-z-10 tw-flex tw-min-h-[68px] tw-items-center tw-justify-between tw-bg-white tw-px-6 tw-py-3 tw-shadow-[0px_1px_0px_0px_rgba(18,32,59,0.09)]">
      <div className="tw-flex tw-items-center">
        <MenuIcon
          onClick={() => setToggle(!value)}
          className="tw-mr-1 tw-text-2xl tw-font-bold tw-text-text-light-gray xs:tw-inline-block semixl:tw-hidden"
        />
        <h1 className="tw-flex tw-items-center tw-text-2xl tw-font-bold tw-capitalize tw-not-italic tw-leading-9 tw-text-text-dark-gray xs:tw-text-lg lg:tw-text-2xl lg:tw-leading-9">
          {title}
        </h1>
      </div>

      <div className="tw-flex tw-items-center xs:tw-gap-2 lg:tw-gap-6">
        <div className="tw-relative tw-w-fit">
          <NotificationsIcon color="action" />
          <div className="tw-absolute tw-right-0 tw-top-0 tw-z-10 tw-flex tw-h-3 tw-w-3 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-font-dm tw-text-[8px] tw-text-white">
            9
          </div>
        </div>

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
                  {`${user?.userName ?? 'Username'}`}
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
          onClose={profileMenu}
          onClick={profileMenu}
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
          {/* <MenuItem onClick={profileMenu}>
            <Avatar /> Profile
          </MenuItem> */}
          {/* <MenuItem onClick={profileMenu}>
            <Avatar /> My account
          </MenuItem> */}
          {/* <Divider /> */}
          {/* <MenuItem onClick={profileMenu}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              profileMenu();
              router.push('/setting/profile-setting');
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  setToggle: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  title: PropTypes.string
};
