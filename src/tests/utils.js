/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';

import ThemeProvider from 'contexts/ThemeProvider';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider company="Test" logo="test.png" logoMobile="test.png">
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
