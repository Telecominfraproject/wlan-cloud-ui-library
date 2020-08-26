import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'tests/utils';
import { defaultProps } from './constants';
import AccessPointDetails from '..';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('<AccessPointDetails />', () => {
  afterEach(() => {
    cleanup();
  });

  it('general tab should show the general form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /general/i }));

    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
  });

  it('status tab should show the status form', async () => {
    const history = createMemoryHistory();
    const data = { ...defaultProps, data: { ...defaultProps.data, alarmsCount: 1 } };
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...data} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /status/i }));

    const paragraph = getByText('Noise Floor');
    expect(paragraph).toBeVisible();
  });

  it('os tab should show the os form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /os/i }));

    const paragraph = getByText('Operating System Statistics');
    expect(paragraph).toBeVisible();
  });

  it('location tab should show the location form', async () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));
    const paragraph = getByText('Level 0');
    expect(paragraph).toBeVisible();
  });

  it('firmware tab should show the firmware form', async () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /firmware/i }));
    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });
  it('URL changes to /network/access-points on clicking the back button', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(window.location.pathname).toEqual('/network/access-points');
  });
});
