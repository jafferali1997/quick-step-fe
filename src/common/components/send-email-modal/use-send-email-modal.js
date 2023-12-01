'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { documentSendAsEmail } from '@/provider/features/document-conversion/document-conversion.slice';

export default function useEmailSendModal({ sendEmailModel, setSendEmailModel }) {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [recipientEmails, setRecipientEmails] = useState([]);
  const [bccEmails, setBccEmails] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const schema = yup.object().shape({
    recipient: yup
      .array()
      .of(yup.string().email('Invalid email format'))
      .required('Required'),
    BCC: yup.array().of(yup.string().email('Invalid email format')).required('Required'),
    subject: yup.string().required('Required')
  });

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const recipientInput = watch('recipient', []);
  const bccInput = watch('BCC', []);

  useEffect(() => {
    setValue('recipient', recipientEmails);
    setValue('BCC', bccEmails);
  }, [recipientEmails, bccEmails, setValue]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setAttachedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeAttachedFile = (index) => {
    setAttachedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const message = editorRef.current.getContent();

    const payload = {
      toAddresses: data?.recipient,
      bccAddresses: data?.BCC,
      subject: data?.subject,
      body: message,
      attachments: attachedFiles
    };
    const response = await dispatch(documentSendAsEmail({ payload }));
    response.meta.requestStatus === 'fulfilled' && setSendEmailModel(false);
  };

  return {
    handleSubmit,
    errors,
    onSubmit,
    register,
    editorRef,
    handleFileChange,
    attachedFiles,
    removeAttachedFile,
    setRecipientEmails,
    setBccEmails,
    recipientEmails,
    bccEmails
  };
}
