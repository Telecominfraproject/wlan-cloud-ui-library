import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';

import { render } from 'tests/utils';
import ClientDeviceDetails from '..';

describe('<ClientDeviceDetails />', () => {
  const URL = '/network/client-devices';

  it('URL should change back to /network/client-devices when Back button is clicked', () => {
    const { getByRole } = render(
      <Router>
        <ClientDeviceDetails />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(window.location.pathname).toEqual(URL);
  });

  it('should show Alert when metricsError is true', () => {
    render(
      <Router>
        <ClientDeviceDetails metricsError />
      </Router>
    );
    expect(screen.getByText('Failed to load History.')).toBeVisible();
  });
});
