'use client';

import React, { useState } from 'react';

export default function useCountryPhoneInput(onChange) {
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const inputChangeHandler = (value, country) => {
    localStorage.setItem('countryCode', country.countryCode);
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phoneRegex.test(value)) {
      onChange(value);
      setIsValidPhoneNumber(true);
    } else {
      onChange('');
      setIsValidPhoneNumber(false);
    }
  };

  return {
    isValidPhoneNumber,
    inputChangeHandler
  };
}
