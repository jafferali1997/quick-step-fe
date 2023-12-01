'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import GalleryTab from '../../template/components/gallery-tab-component';
import StandardTab from '../../template/components/standard-tab.comoponent';
import {
  addDeliveryNotesTemplate,
  getSingleDeliveryNotes
} from '@/provider/features/delivery-notes/delivery-notes.slice';
import { selectTemplate } from '@/provider/features/order/order.slice';

export default function useTemplateChoose(handleTabClick, handleTabCompleted) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const isTemplateSelected = useSelector((state) => state.order.isTemplateSelected);

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleDeliveryNotesHandler(Number(searchParams.get('id')));
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedTemplateId) {
      dispatch(selectTemplate());
    }
  }, [selectedTemplateId]);

  const singleDeliveryNotesHandler = async (id) => {
    if (id) {
      const response = await dispatch(
        getSingleDeliveryNotes({ payload: id || Number(searchParams.get('id')) })
      );
      if (response?.payload.offerTemplate?.id) {
        setSelectedTemplateId(response?.payload.offerTemplate?.id);
      }
    }
  };

  const tabs = [
    {
      id: 'tab1',
      label: 'All Templates',
      // eslint-disable-next-line react/jsx-filename-extension
      content: <GalleryTab />
    },
    {
      id: 'tab2',
      label: 'Standard Template',
      content: <StandardTab />
    }
  ];

  const onSubmit = () => {
    handleTabClick('preview');
    handleTabCompleted('chooseTemplate');
    saveSelectedTemplate();
  };

  const saveSelectedTemplate = () => {
    const templateId = localStorage.getItem('getTemplateId');
    const deliveryNotesTemplateId =
      templateId !== undefined ? Number(templateId) : Number(selectedTemplateId);
    if (deliveryNotesTemplateId) {
      const payload = {
        deliveryNotesId: id,
        deliveryNotesTemplateId
      };
      dispatch(addDeliveryNotesTemplate({ payload }));
    }
  };

  return {
    isSubmit,
    setIsSubmit,
    onSubmit,
    tabs,
    isTemplateSelected
  };
}
