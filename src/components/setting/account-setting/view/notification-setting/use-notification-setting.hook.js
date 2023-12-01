/* eslint-disable react/jsx-filename-extension */

import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';

function useNotificationSetting() {
  const notifications = [
    {
      label: 'Sub-User Actions',
      subLinks: [
        {
          lablel: 'Sub-User Actions',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          innerSublinks: [
            {
              lablel: 'Book offer document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Book order document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Book delivery note document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Book invoice document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Credits Notes',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Book credit note document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Delete draft offer document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Delete draft order document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Delete draft delivery note document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Delete draft invoice document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Delete draft credit notes document',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Change Status',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            },
            {
              lablel: 'Convert To',
              toggleSwitch: (
                <CustomSwitch
                  type="switch"
                  className="tw-h-5 tw-w-10 tw-flex-col-reverse"
                  name="isVat"
                />
              )
            }
          ]
        }
      ]
    },
    {
      label: 'Expenditure',
      subLinks: [
        {
          lablel: 'Create expenditures',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Pay expenditures',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        }
      ]
    },
    {
      label: 'Templates',
      subLinks: [
        {
          lablel: 'Create template',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Delete template',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        }
      ]
    },
    {
      label: 'General notification setting',
      subLinks: [
        {
          lablel: 'Add comments',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Create new customer',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Create new sub-user',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Upcoming events',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Invoice Reminder',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'File Upload',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Email Send',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Free trial expire',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'Upgrade',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        },
        {
          lablel: 'New comment added with document',
          toggleSwitch: (
            <CustomSwitch
              type="switch"
              className="tw-h-5 tw-w-10 tw-flex-col-reverse"
              name="isVat"
            />
          )
        }
      ]
    }
  ];

  return {
    notifications
  };
}

export default useNotificationSetting;
