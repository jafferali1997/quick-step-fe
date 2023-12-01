/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import OfferSetting from './components/offer-setting/offer-setting.component';
import OrderSetting from './components/order-setting/order-setting.component';
import DeliveryNotes from './components/delivery-notes/delivery-notes.component';
import InvoicesSetting from './components/invoices/invoices.component';
import ProductSetting from './components/product/product.component';

export default function useDocumentsSettings() {
  const tabs = [
    {
      id: 'offer',
      label: 'Offer Settings',
      content: <OfferSetting />
    },
    {
      id: 'order',
      label: 'Order Setting',
      content: <OrderSetting />
    },
    {
      id: 'delivery_Notes',
      label: 'Delivery notes Setting',
      content: <DeliveryNotes />
    },
    {
      id: 'invoice',
      label: 'Invoice Setting',
      content: <InvoicesSetting />
    },
    {
      id: 'product',
      label: 'Product Setting',
      content: <ProductSetting />
    }
  ];
  return { tabs };
}
