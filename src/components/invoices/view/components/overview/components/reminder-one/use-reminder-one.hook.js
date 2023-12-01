import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function useReminderOne({ invoice, reminderLevel, createReminder }) {
  const editorRef = useRef(null);
  const [message, setMessage] = useState('message');
  const [feeValue, setFeeValue] = useState(0);
  const [taggedEmails, setTaggedEmails] = useState([]);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDaysValue, setSelectedDaysValue] = useState(1); // State to store the selected value
  const [selectedDateValue, setSelectedDateValue] = useState('BEFORE_DUE_DATE'); // State to store the selected value
  const [openCreateOneReminderPopup, setOpenCreateOneReminderPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [inputFordays, setInputFordays] = useState(false);
  const [editInvoiceReminder, setEditInvoiceReminder] = useState('');

  const open = Boolean(anchorEl);

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required')
  });

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const { email, subject } = watch();

  const clearAllStates = () => {
    setValue('subject', '');
    setIsChecked(false);
    setFeeValue('');
    setSelectedDaysValue('');
    setSelectedDateValue('');
    setMessage('');
    setInvalidEmail(false);
    setOpenCreateOneReminderPopup(false);
    setEditInvoiceReminder('');
  };

  const editReminder = (reminder) => {
    setEditInvoiceReminder(reminder);
    setOpenCreateOneReminderPopup(true);

    setValue('email', reminder.email);
    setValue('subject', reminder.subject);
    setIsChecked(true);
    setFeeValue(reminder.fee);
    setSelectedDaysValue(reminder.noOfDays);
    setSelectedDateValue(reminder.triggerCondition);
    setMessage(reminder.body);
  };

  const deleteReminder = (reminder) => {};

  const MyOptions = [
    { icon: '/assets/icons/edit-gray.svg', label: 'Edit', onclick: editReminder },
    { icon: '/assets/icons/delete-gray.svg', label: 'Delete', onclick: deleteReminder }
  ];

  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectDaysChange = (event) => {
    const { value } = event.target;
    if (value === 'new') {
      setInputFordays(true);
    } else {
      if (value >= 100 || value < 0) return;
      setSelectedDaysValue(value); // Update the state with the selected value
    }
  };

  const handleSelectDateChange = (event) => {
    const newValue = event.target.value; // Get the selected value from the event
    setSelectedDateValue(newValue); // Update the state with the selected value
  };

  const handleFeeChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
  };

  const handleInputChange = (e) => {
    const inputEmail = e.target.value;

    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (inputEmail && inputEmail.length) {
      if (emailPattern.test(inputEmail)) {
        setValue('email', inputEmail);
        setInvalidEmail(false);
      } else {
        setInvalidEmail(true);
      }
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail) {
      if (trimmedEmail.slice(-1) === ',') {
        setInvalidEmail(true);
        return;
      }

      setTaggedEmails([...taggedEmails, trimmedEmail]);
      setValue('email', '');
    }
  };

  const removeEmail = (index) => {
    const updatedEmails = [...taggedEmails];
    updatedEmails.splice(index, 1);
    setTaggedEmails(updatedEmails);
  };

  const handleFeeValueChange = (event) => {
    setFeeValue(event.target.value);
  };

  const handleEditorChange = (content) => {
    setMessage(content);
  };

  const handleSetReminder = () => {
    const payload = {
      id: invoice.id,
      email: email || taggedEmails[0],
      subject,
      body: message,
      noOfDays: Number(selectedDaysValue),
      triggerCondition: selectedDateValue,
      reminderLevel,
      fee: Number(feeValue)
    };

    editInvoiceReminder
      ? createReminder({ payload, editInvoiceReminder, setEditInvoiceReminder })
      : createReminder({ payload, setOpenCreateOneReminderPopup });
  };

  return {
    email,
    taggedEmails,
    setTaggedEmails,
    invalidEmail,
    setInvalidEmail,
    handleInputChange,
    handleInputKeyDown,
    removeEmail,
    editorRef,
    openCreateOneReminderPopup,
    setOpenCreateOneReminderPopup,
    selectedDaysValue,
    selectedDateValue,
    handleSelectDaysChange,
    handleSelectDateChange,
    handleFeeChange,
    isChecked,
    feeValue,
    subject,
    handleFeeValueChange,
    handleEditorChange,
    handleSetReminder,
    message,
    open,
    MyOptions,
    handleClick,
    handleClose,
    editInvoiceReminder,
    setEditInvoiceReminder,
    errors,
    register,
    handleSubmit,
    inputFordays,
    clearAllStates
  };
}
