/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PersonDetail from './components/person-detail/personal-details.component';
import ContactInfo from './components/contact-info/contact-info.component';

export default function useViewProfileSetting() {
  const tabs = [
    {
      id: 'tab1',
      label: 'Personal Details',
      content: <PersonDetail />
    },
    {
      id: 'tab2',
      label: 'Contact info',
      content: <ContactInfo />
    }
  ];
  return { tabs };
}
