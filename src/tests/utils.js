/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

import ThemeProvider from 'contexts/ThemeProvider';
import RolesProvider from 'contexts/RolesProvider';

export const DOWN_ARROW = { keyCode: 40 };

export const ROUTES = {
  root: '/',
  login: '/login',
  dashboard: '/dashboard',
  network: '/network',
  accessPoints: '/network/access-points',
  clientDevices: '/network/client-devices',
  bulkEdit: '/network/access-points/bulk-edit',
  profiles: '/profiles',
  addprofile: '/addprofile',
  system: '/system',
  autoprovision: '/system/autoprovision',
  firmware: '/system/firmware',
  blockedlist: '/system/blockedlist',
  manufacturer: '/system/manufacturer',
  alarms: '/alarms',
  account: '/account',
  users: '/admin/users',
};

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider
      company="Test"
      logo="test.png"
      logoMobile="test.png"
      routes={ROUTES}
      radioTypes={{
        is2dot4GHz: '2.4GHz',
        is5GHzL: '5GHz (L)',
        is5GHzU: '5GHz (U)',
        is5GHz: '5GHz',
      }}
    >
      <RolesProvider roleIsWritable>{children}</RolesProvider>
    </ThemeProvider>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
