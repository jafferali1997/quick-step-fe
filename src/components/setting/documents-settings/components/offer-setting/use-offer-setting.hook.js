import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createOfferDocumentSetting,
  getDocumentSetting,
  updateOfferDocumentSetting
} from '@/provider/features/setting/setting.slice';
import DOCUMENT from '@/common/constants/document.constants';

const validationSchema = yup.object().shape({
  offerExpiry: yup
    .number()
    .typeError('Offer expiry must be a numeric value')
    .min(1, 'Offer expiry must be at least 1')
    .max(9999999999, 'Offer expiry must be at most 10 digits'),

  offerNumberPrefix: yup
    .string()
    .matches(
      /^[A-Za-z\s]+$/,
      'Offer number prefix must contain only alphabetic characters'
    )
    .min(1, 'Offer number prefix must be at least 1 character')
    .max(150, 'Offer number prefix must be at most 150 characters'),

  offerNumberSuffix: yup
    .string()
    .matches(
      /^[A-Za-z\s]+$/,
      'Offer number suffix must contain only alphabetic characters'
    )
    .min(1, 'Offer number suffix must be at least 1 character')
    .max(150, 'Offer number suffix must be at most 150 characters'),

  offerNumberOffset: yup
    .number()
    .typeError('Offer number offset must be a numeric value')
    .min(1, 'Offer number offset must be at least 1')
    .max(9999999999, 'Offer number offset must be at most 10 digits')
});

export default function useOfferSetting() {
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
    setValue('offerExpiry', 14);
    getCurrentDocumentSetting();
  }, []);

  const getCurrentDocumentSetting = async () => {
    const response = await dispatch(
      getDocumentSetting({
        payload: {
          condition: { module: DOCUMENT.OFFER }
        }
      })
    );
    const setting = response.payload;
    if (setting) {
      setValue('offerExpiry', setting.documentSetting.expiryDays);
      setValue('offerNumberPrefix', setting.prefix);
      setValue('offerNumberSuffix', setting.suffix);
      setValue('offerNumberOffset', setting.offset);

      setTaggedEmails(
        setting.receiverEmails.map((item) => ({
          id: item.email.id,
          email: item.email.email
        }))
      );

      setSelectedTriggerAction(setting.documentSetting.triggerAction);
      setSelectedTriggerPoint(setting.documentSetting.triggerPoint);
    }
  };

  const handleOfferSettingSubmit = async (values) => {
    const payload = {
      prefix: values.offerNumberPrefix,
      offset: values.offerNumberOffset,
      suffix: values.offerNumberSuffix,
      expiryDays: values.offerExpiry,
      triggerAction: selectedTriggerAction,
      receiverEmails: taggedEmails,
      triggerPoint: selectedTriggerPoint
    };
    if (documentSetting) {
      const response = await dispatch(
        updateOfferDocumentSetting({ payload, id: documentSetting.id })
      );
      response.meta.requestStatus === 'fulfilled' && getCurrentDocumentSetting();
    } else {
      const response = await dispatch(createOfferDocumentSetting({ payload }));
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
    setEmail,
    handleInputKeyDown,
    removeEmail,
    taggedEmails,
    setTaggedEmails,
    email,
    register,
    handleSubmit,
    errors,
    handleOfferSettingSubmit,
    selectedTriggerAction,
    setSelectedTriggerAction,
    selectedTriggerPoint,
    setSelectedTriggerPoint
  };
}
