import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createOrderDocumentSetting,
  getDocumentSetting,
  updateOrderDocumentSetting
} from '@/provider/features/setting/setting.slice';
import DOCUMENT from '@/common/constants/document.constants';

const validationSchema = yup.object().shape({
  orderExpiry: yup
    .number()
    .typeError('Order expiry must be a numeric value')
    .min(1, 'Order expiry must be at least 1')
    .max(9999999999, 'Order expiry must be at most 10 digits'),

  orderNumberPrefix: yup
    .string()
    .min(1, 'Order number prefix must be at least 1 character')
    .max(150, 'Order number prefix must be at most 150 characters'),

  orderNumberSuffix: yup
    .string()
    .min(1, 'Order number suffix must be at least 1 character')
    .max(150, 'Order number suffix must be at most 150 characters'),

  orderNumberOffset: yup
    .number()
    .typeError('Order number offset must be a numeric value')
    .min(1, 'Order number offset must be at least 1')
    .max(9999999999, 'Order number offset must be at most 10 digits')
});

export default function useOrderSetting() {
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
    setValue('orderExpiry', 14);
    getCurrentDocumentSetting();
  }, []);

  const getCurrentDocumentSetting = async () => {
    const response = await dispatch(
      getDocumentSetting({
        payload: {
          condition: { module: DOCUMENT.ORDER }
        }
      })
    );
    const setting = response.payload;
    setValue('orderExpiry', setting.documentSetting.expiryDays);
    setValue('orderNumberPrefix', setting.prefix);
    setValue('orderNumberSuffix', setting.suffix);
    setValue('orderNumberOffset', setting.offset);

    setTaggedEmails(
      setting.receiverEmails.map((item) => ({
        id: item.email.id,
        email: item.email.email
      }))
    );

    setSelectedTriggerAction(setting.documentSetting.triggerAction);
    setSelectedTriggerPoint(setting.documentSetting.triggerPoint);
  };

  const handleOrderSettingSubmit = async (values) => {
    const payload = {
      prefix: values.orderNumberPrefix,
      offset: values.orderNumberOffset,
      suffix: values.orderNumberSuffix,
      expiryDays: values.orderExpiry,
      triggerAction: selectedTriggerAction,
      receiverEmails: taggedEmails,
      triggerPoint: selectedTriggerPoint
    };
    if (documentSetting) {
      const response = await dispatch(
        updateOrderDocumentSetting({ payload, id: documentSetting.id })
      );
      response.meta.requestStatus === 'fulfilled' && getCurrentDocumentSetting();
    } else {
      const response = await dispatch(createOrderDocumentSetting({ payload }));
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
    handleOrderSettingSubmit,
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
