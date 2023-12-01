import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import SmDownloadIcon from '@/common/icons/sm-download.icon';
import LineIcon from '@/common/icons/lineIcon';
import useDownloadDropdown from './use-download-dropdown.hook';

export default function DownloadDropdownBtn({
  text,
  dropdownoptions,
  setDownload,
  data = []
}) {
  const {
    open,
    anchorRef,
    buttonDivRef,
    menuWidth,
    dropdownClose,
    dropdownToggle,
    dropdownListKeyDown
  } = useDownloadDropdown({ text, setDownload });

  return (
    <Stack direction="row" spacing={2}>
      <div className="tw-flex tw-gap-[10px]" ref={buttonDivRef}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={dropdownToggle}
          className="tw-border-border-gray tw-flex tw-items-center tw-gap-[10px]  tw-rounded-md  tw-border-[1.5px] tw-border-solid  tw-border-[#D0D5DD] tw-font-dm tw-text-sm tw-font-medium tw-normal-case tw-leading-[17px] tw-text-text-dark-gray"
        >
          <SmDownloadIcon />
          {text}
          <LineIcon />
          <KeyboardArrowDownIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
              }}
            >
              <Paper style={{ width: menuWidth }}>
                <ClickAwayListener onClickAway={dropdownClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={dropdownListKeyDown}
                    className="tw-text-text-dark-semibold tw-z-[11] tw-mt-2 tw-rounded-md tw-p-3"
                  >
                    {dropdownoptions.map((option) => {
                      return (
                        <MenuItem
                          disabled={data && data.length === 0}
                          className="tw-z-[11] tw-p-0"
                          href={option.link}
                          key={option.id}
                          // onClick={dropdownClose}
                          onClick={() => option.onClick()}
                        >
                          <div
                            className="tw-text-dark-semibold tw-font-dm tw-text-sm tw-capitalize tw-leading-5  tw-text-black"
                            style={{
                              padding: '2px',
                              color: '#2C2E3E',
                              fontWeight: '500'
                            }}
                          >
                            {option.name}
                          </div>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

DownloadDropdownBtn.propTypes = {
  text: PropTypes.string,
  dropdownoptions: PropTypes.arrayOf,
  setDownload: PropTypes.func,
  data: PropTypes.arrayOf
};
