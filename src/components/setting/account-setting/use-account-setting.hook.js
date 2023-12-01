/* eslint-disable react/jsx-filename-extension */
import ChangePassword from './view/change-password/change-password.component';
import NotificationSetting from './view/notification-setting/notification-setting.component';
import TwoFactorAuthentication from './view/two-factor-authentication/tw-factor-authentication.component';

function useAccountSetting() {
  const tabs = [
    {
      id: 'tab1',
      label: 'Two Factor Authentication',
      content: <TwoFactorAuthentication />
    },
    {
      id: 'tab2',
      label: 'Change Password',
      content: <ChangePassword />
    },
    {
      id: 'tab3',
      label: 'Notification Setting',
      content: <NotificationSetting />
    }
  ];

  return { tabs };
}

export default useAccountSetting;
