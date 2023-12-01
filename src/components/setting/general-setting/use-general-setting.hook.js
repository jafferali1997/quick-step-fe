/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import GeneralSetting from './view/general-setting/general-setting.component';
import TaxRate from './view/tax-rate/tax-rate.component';
import Units from './view/units/units.component';

function useGeneralSetting() {
  const tabs = [
    {
      id: 'tab1',
      label: 'General Settings',
      content: <GeneralSetting />
    },
    {
      id: 'tab2',
      label: 'Tax Rate',
      content: <TaxRate />
    },
    {
      id: 'tab3',
      label: 'Units',
      content: <Units />
    }
  ];

  return { tabs };
}

export default useGeneralSetting;
