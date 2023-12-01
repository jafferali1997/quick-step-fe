import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  createGeneralSetting,
  generalSettingCurrentBusiness,
  updateGeneralSetting
} from '@/provider/features/setting/setting.slice';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .matches(/@my-quicksteps\.com$/, 'Email domain must be @my-quicksteps.com')
    .required('Email is required')
});

function useGeneralSetting() {
  const dispatch = useDispatch();
  const [noOfRecords, setNoOfRecord] = useState('Select no of records');
  const [prefix, setPrefix] = useState('');
  const [replyToEmail, setReplyToEmail] = useState('');
  const [enableGeneralSetting, setEnableGenearlSettings] = useState(false);

  const currentBusinessGeneralSetting = useSelector(
    (state) => state.setting.generalSettingCurrentBusiness.data
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
    currentBusinessSetting();
  }, []);

  const currentBusinessSetting = async () => {
    const response = await dispatch(generalSettingCurrentBusiness({}));
    if (response.error && response.error.message === 'Rejected') {
      setEnableGenearlSettings(true);
    } else if (response?.payload) {
      setValue('email', response.payload.senderEmail);
      setPrefix(response.payload.prefixForAttachments);
      setReplyToEmail(response.payload.replyEmail);
      if (response.payload.noRecordToDisplayInTable) {
        setNoOfRecord({
          label: response.payload.noRecordToDisplayInTable,
          value: response.payload.noRecordToDisplayInTable
        });
      } else {
        setNoOfRecord({
          label: 'Select no of records',
          value: ''
        });
      }
    }
  };

  const noOfRecordsOptions = [
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '250', value: '250' },
    { label: '500', value: '500' },
    { label: '1000', value: '1000' }
  ];

  const handleNoOfRecords = ({ label, value }) => {
    setNoOfRecord({ value, label });
  };

  const handleSaveGeneralSetting = async (value) => {
    if (currentBusinessGeneralSetting) {
      await dispatch(
        updateGeneralSetting({
          payload: {
            noRecordToDisplayInTable: Number(noOfRecords.value),
            senderEmail: value.email,
            replyEmail: replyToEmail,
            prefixForAttachments: prefix
          },
          id: currentBusinessGeneralSetting.id
        })
      );
    } else {
      await dispatch(
        createGeneralSetting({
          payload: {
            noRecordToDisplayInTable: Number(noOfRecords.value),
            senderEmail: value.email,
            replyEmail: replyToEmail,
            prefixForAttachments: prefix
          }
        })
      );
    }
    setEnableGenearlSettings(false);
  };

  return {
    noOfRecords,
    prefix,
    replyToEmail,
    setPrefix,
    setReplyToEmail,
    noOfRecordsOptions,
    enableGeneralSetting,
    setEnableGenearlSettings,
    handleSaveGeneralSetting,
    handleNoOfRecords,
    register,
    errors,
    handleSubmit
  };
}

export default useGeneralSetting;
