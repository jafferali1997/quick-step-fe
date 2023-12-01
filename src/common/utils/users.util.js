'use client';

import ROLES from '../constants/role.constant';

/**
 * Retrive access token from local storage
 * @returns string | undefined
 */

export const getUser = () => {
  if (typeof window === 'object' && window?.localStorage?.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }
  return undefined;
};

/**
 * Retrive isPhoneVerified from local storage
 * @returns bool
 */

export const isPhoneVerified = (data) => {
  if ((typeof window === 'object' && window?.localStorage?.getItem('user')) || data) {
    const user = data ?? JSON.parse(localStorage.getItem('user'));
    return user.isPhoneVerified;
  }
  return false;
};

/**
 * Retrive isEmailVerified from local storage
 * @returns bool
 */

export const isEmailVerified = (data) => {
  if ((typeof window === 'object' && window?.localStorage?.getItem('user')) || data) {
    const user = data ?? JSON.parse(localStorage.getItem('user'));
    return user.isEmailVerified;
  }
  return false;
};

export const isProfileCreated = (data) => {
  if ((typeof window === 'object' && window?.localStorage?.getItem('user')) || data) {
    const user = data ?? JSON.parse(localStorage.getItem('user'));
    return user.currentBusinessId;
  }
  return false;
};

export const is2FAEnabled = (data) => {
  if ((typeof window === 'object' && window?.localStorage?.getItem('user')) || data) {
    const user = data ?? JSON.parse(localStorage.getItem('user'));
    return user.isTwoFactorAuth;
  }
  return false;
};

export const isSuperAdmin = (data) => {
  if ((typeof window === 'object' && window?.localStorage?.getItem('user')) || data) {
    const user = data ?? JSON.parse(localStorage.getItem('user'));
    return user.role === ROLES.SUPER_ADMIN.toString();
  }
  return false;
};

export const getEmailForURL = (email) => {
  // comment condition for production
  if (email?.includes('+')) return email.replace('+', '%2B');
  return email;
};
