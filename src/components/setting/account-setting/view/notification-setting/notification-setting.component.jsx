import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Link } from '@mui/material/node';
import useNotificationSetting from './use-notification-setting.hook';

function NotificationSetting() {
  const { notifications } = useNotificationSetting();
  return (
    <div className="tw-bg-[#FFF] tw-px-5 tw-py-8 ">
      <div className="multistep-wrapper-notifications tw-flex tw-flex-col tw-gap-6">
        {notifications.map((navLink) => {
          if (navLink.subLinks) {
            return (
              <Accordion
                key={navLink.label}
                className="!tw-before:none !tw-m-0 !tw-rounded-[10px] tw-border tw-border-solid tw-border-disabled-input  !tw-shadow-none"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="tw-mb-4 !tw-h-fit !tw-min-h-fit tw-rounded-[10px_10px_0_0] !tw-bg-[#1D4ED820]  tw-py-[9px] tw-pl-[15px] tw-pr-3.5"
                >
                  <div className=" tw-flex tw-items-center tw-gap-2">
                    <span className="tw-text-xl tw-font-medium tw-not-italic tw-leading-[30px] tw-text-text-black">
                      {navLink.label}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="!tw-px-0 !tw-py-0">
                  <div className=" !tw-mb-[22px] tw-mt-2 tw-flex tw-flex-col tw-gap-3">
                    {navLink.subLinks.map((subLink) => {
                      return (
                        <div
                          key={subLink.lablel}
                          className="tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray"
                        >
                          <div className="tw-items-center tw-pl-4">
                            <div className="tw-flex tw-max-w-[277px] tw-items-center tw-justify-between ">
                              <span className="tw-text-base  tw-font-medium tw-not-italic tw-leading-6 tw-text-text-black">
                                {subLink.lablel}
                              </span>
                              <div>{subLink.toggleSwitch}</div>
                            </div>
                            {subLink.innerSublinks &&
                              subLink.innerSublinks.map((innerLinks) => {
                                return (
                                  <div className="tw-flex tw-max-w-[282px] tw-items-center tw-justify-between tw-gap-4 tw-pl-2">
                                    <div className="tw-mt-3 tw-flex tw-flex-col tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
                                      {innerLinks.lablel}
                                    </div>
                                    <div className="tw-mt-3">
                                      {innerLinks.toggleSwitch}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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

export default NotificationSetting;
