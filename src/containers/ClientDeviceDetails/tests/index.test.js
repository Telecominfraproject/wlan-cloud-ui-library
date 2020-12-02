import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';

import { render } from 'tests/utils';
import ClientDeviceDetails from '..';

describe('<ClientDeviceDetails />', () => {
  it('URL should change back to /network/client-devices when Back button is clicked', () => {
    const mockData = {
      details: {
        dhcpDetails: {
          leaseTimeInSeconds: 12312,
        },
      },
    };
    const { getByRole } = render(
      <Router>
        <ClientDeviceDetails data={mockData} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(window.location.pathname).toEqual('/');
  });

  it('should use default refresh function if one is not provided with', async () => {
    const { container } = render(
      <Router>
        <ClientDeviceDetails />
      </Router>
    );

    const button = container.querySelector('.ant-btn.Button.ant-btn-icon-only');
    fireEvent.click(button);
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
