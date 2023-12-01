'use client';

import { useState } from 'react';
import {
  ALL_CHARACTER_ARRAY,
  ALL_CONTROLS
} from '@/common/constants/characters-array.constant';

export default function useCustomInput(onChange, regex, matchRegex) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordMouseDownHandler = (event) => {
    event.preventDefault();
  };

  const inputChangeHandler = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return {
    inputChangeHandler,
    showPassword,
    setShowPassword,
    passwordMouseDownHandler
  };
}
