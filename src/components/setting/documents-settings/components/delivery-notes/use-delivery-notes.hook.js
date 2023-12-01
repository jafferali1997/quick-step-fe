import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createDeliveryNotesDocumentSetting,
  getDocumentSetting,
  updateDeliveryNotesDocumentSetting
} from '@/provider/features/setting/setting.slice';
import DOCUMENT from '@/common/constants/document.constants';

const validationSchema = yup.object().shape({
  deliveryNotesExpiry: yup
    .number()
    .typeError('Delivery notes expiry must be a numeric value')
    .min(1, 'Delivery notes expiry must be at least 1')
    .max(9999999999, 'Delivery notes expiry must be at most 10 digits'),

  deliveryNotesNumberPrefix: yup
    .string()
    .min(1, 'Delivery notes number prefix must be at least 1 character')
    .max(150, 'Delivery notes number prefix must be at most 150 characters'),

  deliveryNotesNumberSuffix: yup
    .string()
    .min(1, 'Delivery notes number suffix must be at least 1 character')
    .max(150, 'Delivery notes number suffix must be at most 150 characters'),

  deliveryNotesNumberOffset: yup
    .number()
    .typeError('Delivery notes number offset must be a numeric value')
    .min(1, 'Delivery notes number offset must be at least 1')
    .max(9999999999, 'Delivery notes number offset must be at most 10 digits')
});

export default function useDeliveryNotesSetting() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [taggedEmails, setTaggedEmails] = useState([]);
  const [selectedTriggerAction, setSelectedTriggerAction] = useState('');
  const [selectedTriggerPoint, setSelectedTriggerPoint] = useState('');

  const documentSetting = useSelector(
    (state) => state.setting.getDocumentSetting && state.setting.getDocumentSetting.data
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    setValue('deliveryNotesExpiry', 14);
    getCurrentDocumentSetting();
  }, []);

  const getCurrentDocumentSetting = async () => {
    const response = await dispatch(
      getDocumentSetting({
        payload: {
          condition: { module: DOCUMENT.DELIVERY_NOTES }
        }
      })
    );
    const setting = response.payload;
    setValue('deliveryNotesExpiry', setting.documentSetting.expiryDays);
    setValue('deliveryNotesNumberPrefix', setting.prefix);
    setValue('deliveryNotesNumberSuffix', setting.suffix);
    setValue('deliveryNotesNumberOffset', setting.offset);

    setTaggedEmails(
      setting.receiverEmails.map((item) => ({
        id: item.email.id,
        email: item.email.email
      }))
    );

    setSelectedTriggerAction(setting.documentSetting.triggerAction);
    setSelectedTriggerPoint(setting.documentSetting.triggerPoint);
  };

  const handleDeliveryNotesSettingSubmit = async (values) => {
    const payload = {
      prefix: values.deliveryNotesNumberPrefix,
      offset: values.deliveryNotesNumberOffset,
      suffix: values.deliveryNotesNumberSuffix,
      expiryDays: values.deliveryNotesExpiry,
      triggerAction: selectedTriggerAction,
      receiverEmails: taggedEmails,
      triggerPoint: selectedTriggerPoint
    };
    if (documentSetting) {
      const response = await dispatch(
        updateDeliveryNotesDocumentSetting({ payload, id: documentSetting.id })
      );
      response.meta.requestStatus === 'fulfilled' && getCurrentDocumentSetting();
    } else {
      const response = await dispatch(createDeliveryNotesDocumentSetting({ payload }));
      response.meta.requestStatus === 'fulfilled' && getCurrentDocumentSetting();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = email.trim();
    if (trimmedEmail) {
      if (validateEmail(trimmedEmail)) {
        setTaggedEmails([...taggedEmails, { email: trimmedEmail }]);
        setEmail(''); // Clear the input field
      }
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const removeEmail = (index) => {
    const updatedEmails = [...taggedEmails];
    updatedEmails.splice(index, 1);
    setTaggedEmails(updatedEmails);
  };

  return {
    register,
    handleSubmit,
    errors,
    handleDeliveryNotesSettingSubmit,
    selectedTriggerAction,
    setSelectedTriggerAction,
    selectedTriggerPoint,
    setSelectedTriggerPoint,
    handleInputKeyDown,
    removeEmail,
    setEmail,
    taggedEmails,
    email
  };
}
