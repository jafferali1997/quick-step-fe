import React from 'react';
import GalleryTab from '@/components/order/template/components/gallery-tab-component';
import StandardTab from '@/components/order/template/components/standard-tab.comoponent';

export default function useTempalateContent() {
  const tabs = [
    {
      id: 'tab1',
      label: 'Standard Template',
      // eslint-disable-next-line react/jsx-filename-extension
      content: <StandardTab />
    },
    {
      id: 'tab2',
      label: 'Your Gallery',
      content: <GalleryTab />
    }
  ];
  return {
    tabs
  };
}
