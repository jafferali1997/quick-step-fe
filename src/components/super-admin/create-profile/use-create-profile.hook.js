'use client';

import React, { useState } from 'react';

export default function useCreateProfile() {
  const [passOpen, setPassOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleOpenUpdate = () => {
    setPassOpen(true);
  };

  return {
    passOpen,
    setPassOpen,
    handleOpenUpdate,
    phone,
    setPhone,
    handlePhoneChange
  };
}
