import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createInvoiceDocumentSetting,
  getDocumentSetting,
  updateInvoiceDocumentSetting
} from '@/provider/features/setting/setting.slice';
import DOCUMENT from '@/common/constants/document.constants';

const validationSchema = yup.object().shape({
  invoiceExpiry: yup
    .number()
    .typeError('Invoice expiry must be a numeric value')
    .min(1, 'Invoice expiry must be at least 1')
    .max(9999999999, 'Invoice expiry must be at most 10 digits'),

  invoiceNumberPrefix: yup
    .string()
    .min(1, 'Invoice number prefix must be at least 1 character')
    .max(150, 'Invoice number prefix must be at most 150 characters'),

  invoiceNumberSuffix: yup
    .string()
    .min(1, 'Invoice number suffix must be at least 1 character')
    .max(150, 'Invoice number suffix must be at most 150 characters'),

  invoiceNumberOffset: yup
    .number()
    .typeError('Invoice number offset must be a numeric value')
    .min(1, 'Invoice number offset must be at least 1')
    .max(9999999999, 'Invoice number offset must be at most 10 digits')
});

export default function useInvoiceSetting() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [taggedEmails, setTaggedEmails] = useState([]);
  const [selectedTriggerAction, setSelectedTriggerAction] = useState('');
  const [selectedTriggerPoint, setSelectedTriggerPoint] = useState('');
  const [attachPdfToggle, setAttachPdfToggle] = useState(false);
  const [reminderValues, setReminderValues] = useState([
    {
      fee: '',
      reminderLevel: 0
    },
    {
      fee: '',
      reminderLevel: 0
    },
    {
      fee: '',
      reminderLevel: 0
    }
  ]);

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
    setValue('invoiceExpiry', 14);
    getCurrentDocumentSetting();
  }, []);

  const handleReminderChange = (e, index) => {
    const newValue = e.target.value;
    const updatedValues = [...reminderValues];
    updatedValues[index].fee = Number(newValue);
    updatedValues[index].reminderLevel = index + 1;
    setReminderValues(updatedValues);
  };

  const getCurrentDocumentSetting = async () => {
    const response = await dispatch(
      getDocumentSetting({
        payload: {
          condition: { module: DOCUMENT.INVOICE }
        }
      })
    );
    const setting = response.payload;
    setValue('invoiceExpiry', setting.documentSetting.expiryDays);
    setValue('invoiceNumberPrefix', setting.prefix);
    setValue('invoiceNumberSuffix', setting.suffix);
    setValue('invoiceNumberOffset', setting.offset);

    setTaggedEmails(
      setting.receiverEmails.map((item) => ({
        id: item.email.id,
        email: item.email.email
      }))
    );

    setAttachPdfToggle(setting.documentSetting.attachPdfToReminder);
    setSelectedTriggerAction(setting.documentSetting.triggerAction);
    setSelectedTriggerPoint(setting.documentSetting.triggerPoint);

    if (setting.reminderFees?.length === 0) {
      setReminderValues([
        {
          fee: '',
          reminderLevel: 0
        },
        {
          fee: '',
          reminderLevel: 0
        },
        {
          fee: '',
          reminderLevel: 0
        }
      ]);
    } else if (setting.reminderFees?.length === 1) {
      setReminderValues([
        ...setting.reminderFees,
        {
          fee: '',
          reminderLevel: 0
        },
        {
          fee: '',
          reminderLevel: 0
        }
      ]);
    } else if (setting.reminderFees?.length === 2) {
      setReminderValues([
        ...setting.reminderFees,
        {
          fee: '',
          reminderLevel: 0
        }
      ]);
    }
  };

  const handleInvoiceSettingSubmit = async (values) => {
    const payload = {
      prefix: values.invoiceNumberPrefix,
      offset: values.invoiceNumberOffset,
      suffix: values.invoiceNumberSuffix,
      expiryDays: values.invoiceExpiry,
      triggerAction: selectedTriggerAction,
      receiverEmails: taggedEmails,
      triggerPoint: selectedTriggerPoint,
      attachPdfToReminder: attachPdfToggle,
      reminderFees:
        reminderValues.length &&
        reminderValues
          .map((value) => ({
            id: value.id,
            fee: Number(value.fee),
            reminderLevel: Number(value.reminderLevel)
          }))
          .filter((reminder) => reminder.reminderLevel !== 0)
    };

    if (documentSetting) {
      const response = await dispatch(
        updateInvoiceDocumentSetting({ payload, id: documentSetting.id })
      );
      response.meta.requestStatus === 'fulfilled' && getCurrentDocumentSetting();
    } else {
      const response = await dispatch(createInvoiceDocumentSetting({ payload }));
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
    handleInvoiceSettingSubmit,
    selectedTriggerAction,
    setSelectedTriggerAction,
    selectedTriggerPoint,
    setSelectedTriggerPoint,
    reminderValues,
    handleReminderChange,
    attachPdfToggle,
    setAttachPdfToggle,
    handleInputKeyDown,
    removeEmail,
    setEmail,
    taggedEmails,
    email
  };
}
