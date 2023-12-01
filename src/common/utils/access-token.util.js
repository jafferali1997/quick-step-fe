'use client';

import { isJwtExpired } from 'jwt-check-expiration';
import authService from '@/provider/features/auth/auth.service';

/**
 * Retrive access token from local storage
 * @returns string | undefined
 */
export const getAccessToken = () => {
  if (typeof window === 'object' && window?.localStorage?.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'))?.loginVerifiedToken?.[0]?.token;
  }
  return undefined;
};

/**
 * Retrive isLoginVerified Status
 * @returns bool
 */
export const isLoginVerified = () => {
  if (typeof window === 'object' && window?.localStorage?.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'))?.loginVerifiedToken?.[0]
      ?.isLoginVerified;
  }
  return false;
};

/**
 * Retrive access token expiry date from local storage
 * @returns date | undefined
 */
export const getAccessTokenExpiry = () => {
  if (typeof window === 'object') {
    const accessTokenExpiry = JSON.parse(
      window.localStorage.getItem('accessTokenExpiry')
    );
    return accessTokenExpiry;
  }
  return null;
};

/**
 * Delete token for old users
 * @returns false | true
 */
export const checkForOldToken = async () => {
  if (typeof window === 'object' && window?.localStorage?.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      const response = await authService.logout();
      return response.Succeeded;
    }
    return false;
  }
  return false;
};

/**
 * Retrieve access token from local storage and check if it has expired
 * @returns string | null
 */
export const checkExpiryDateOfToken = () => {
  if (typeof window === 'object' && window?.localStorage?.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.loginVerifiedToken?.[0].token) {
      if (isJwtExpired(user?.loginVerifiedToken?.[0].token) === false) {
        return true;
      }
      return false;
    }
    return null;
  }
  return null;
};
