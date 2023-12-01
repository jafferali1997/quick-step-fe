'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getUser } from '@/common/utils/users.util';
import { isLoginVerified } from '@/common/utils/access-token.util';

/**
 * Return a component or return to home page if access token is verified
 * @param {component} props
 * @returns component | redirect to home page
 */
export default function OnlyPublic({ component }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (isLoginVerified() && typeof window === 'object') {
      router.push('/');
    }
  }, []);
  return component;
}

OnlyPublic.propTypes = {
  component: PropTypes.element.isRequired
};
