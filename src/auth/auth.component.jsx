'use client';

import PropTypes from 'prop-types';
import AUTH from '@/common/constants/auth.constant';
import OnlyPublic from './only-public.component';
import Private from './private.component';
import NAVBARTITLE from '@/common/constants/navbar-title.constant';
import SuperAdmin from './super-admin.component';

/**
 * Return the component according to it's type
 * @param {component, type} props component and type of the component
 * @returns component
 */
export default function Auth({
  component,
  type = AUTH.PUBLIC,
  title = NAVBARTITLE.DOCUMENTS
}) {
  switch (type) {
    case AUTH.PUBLIC:
      return component;
    case AUTH.PRIVATE:
      return <Private component={component} title={title} />;
    case AUTH.ONLY_PUBLIC:
      return <OnlyPublic component={component} />;
    case AUTH.SUPER_ADMIN:
      return <SuperAdmin component={component} title={title} />;
  }
}

Auth.propTypes = {
  component: PropTypes.element.isRequired,
  type: PropTypes.string,
  title: PropTypes.string
};
