import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, ROUTES } from 'tests/utils';
import {
  mockSsid,
  mockAccessPoint,
  mockBonjourGateway,
  mockCaptivePortal,
  mockRadius,
} from './constants';
import ProfileDetails from '..';

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

describe('<ProfileDetails />', () => {
  afterEach(() => {
    cleanup();
  });
  it('onUpdateProfile should be called when all fields are submitted correctly for profileType: ssid', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockSsid} onUpdateProfile={submitSpy} />
      </Router>
    );
    const button = getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();

    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: 'Test' },
    });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateProfile should be called when all fields are submitted correctly for profileType: captive_portal', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockCaptivePortal} onUpdateProfile={submitSpy} />
      </Router>
    );
    const button = getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();

    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: 'Test' },
    });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateProfile should be called when all fields are submitted correctly for profileType: equipment_ap', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockAccessPoint} onUpdateProfile={submitSpy} />
      </Router>
    );
    const button = getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();

    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: 'Test' },
    });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateProfile should be called when all fields are submitted correctly for profileType: bonjour', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockBonjourGateway} onUpdateProfile={submitSpy} />
      </Router>
    );

    const button = getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();

    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: 'Test' },
    });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateProfile should be called when all fields are submitted correctly for profileType: radius', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockRadius} onUpdateProfile={submitSpy} />
      </Router>
    );

    const button = getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();

    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: 'Test' },
    });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Back button click should show confirmation modal if form is changed', () => {
    const { getByText, getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockSsid} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    const paragraph = getByText(/Please confirm leaving without saving this wireless profile page/);
    expect(paragraph).toBeVisible();
  });

  it('Cancel button click should hide confirmation modal', async () => {
    const { getByRole, getByText, getByLabelText, queryByText } = render(
      <Router>
        <ProfileDetails {...mockSsid} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(getByText('Leave Page?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Leave Page?')).not.toBeInTheDocument();
    });
  });

  it('URL should change when back button is clicked', async () => {
    const { getByRole } = render(
      <Router>
        <ProfileDetails {...mockSsid} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
    });
  });

  it('Back button click on Leave Page should changes URL to /Profiles', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockSsid} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(getByText('Leave Page?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Leave Page' }));

    await waitFor(() => {
      expect(window.location.pathname).toEqual(ROUTES.profiles);
    });
  });

  it('Error msg should be displayed if input field of Profile Name is empty', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <ProfileDetails {...mockSsid} />
      </Router>
    );

    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: '' },
    });
    await waitFor(() => {
      expect(getByText('Please input your new profile name')).toBeVisible();
    });
  });
});
