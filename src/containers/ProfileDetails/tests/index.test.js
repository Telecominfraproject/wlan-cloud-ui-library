import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, ROUTES } from 'tests/utils';
import { mockProps } from './constants';
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
  it('onUpdateProfile should be called when all fields are submitted correctly profileType ssid', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockProps} onUpdateProfile={submitSpy} profileType="ssid" />
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

  it('should work when profileType is captive_portal', async () => {
    const submitSpy = jest.fn();
    const mockData = {
      fileUpload: () => {},
      id: 5,
      profileType: 'captive_portal',
      customerId: 2,
      name: 'Captive-portal',
      childProfiles: [],
      childProfileIds: [],
      createdTimestamp: '1594830328991',
      lastModifiedTimestamp: '1594830328991',
      details: {
        model_type: 'CaptivePortalConfiguration',
        name: 'Captive-portal',
        browserTitle: 'Access the network as Guest',
        headerContent: 'Captive Portal',
        userAcceptancePolicy: 'Use this network at your own risk. No warranty of any kind.',
        successPageMarkdownText: 'Welcome to the network',
        redirectURL: '',
        externalCaptivePortalURL: null,
        sessionTimeoutInMinutes: 60,
        logoFile: null,
        backgroundFile: null,
        walledGardenAllowlist: [],
        usernamePasswordFile: null,
        authenticationType: 'guest',
        radiusAuthMethod: 'CHAP',
        maxUsersWithSameCredentials: 42,
        externalPolicyFile: null,
        backgroundPosition: 'left_top',
        backgroundRepeat: 'no_repeat',
        radiusServiceName: null,
        expiryType: 'unlimited',
        userList: [],
        macWhiteList: [],
        profileType: 'captive_portal',
      },
      __typename: 'Profile',
    };
    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockData} onUpdateProfile={submitSpy} />
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

  it('onUpdateProfile should be called when all fields are submitted correctly profileType equipment_ap', async () => {
    const submitSpy = jest.fn();
    const mockDetails = {
      ...mockProps,
      details: {
        ...mockProps.details,
        ntpServer: {
          auto: false,
          value: 'testNtp',
        },
      },
    };

    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockDetails} onUpdateProfile={submitSpy} profileType="equipment_ap" />
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

    const mockData = {
      profileType: 'bonjour',
      name: 'bonjour-profile',
      details: {
        model_type: 'BonjourGatewayProfile',
        profileDescription: 'test-description',
        profileType: 'bonjour',
        bonjourServices: [
          {
            model_type: 'BonjourServiceSet',
            vlanId: null,
            supportAllServices: false,
            serviceNames: ['AirPlay', 'GoogleCast', 'SFTP', 'SAMBA'],
          },
          {
            model_type: 'BonjourServiceSet',
            vlanId: 17,
            supportAllServices: false,
            serviceNames: ['AirPort', 'SFTP'],
          },
          {
            model_type: 'BonjourServiceSet',
            vlanId: 33,
            supportAllServices: false,
            serviceNames: ['AirTunes', 'SFTP', 'AFP'],
          },
          {
            model_type: 'BonjourServiceSet',
            vlanId: 24,
            supportAllServices: true,
            serviceNames: null,
          },
          {
            model_type: 'BonjourServiceSet',
            vlanId: 26,
            supportAllServices: true,
            serviceNames: null,
          },
        ],
      },
      __typename: 'Profile',
    };
    const { getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails onUpdateProfile={submitSpy} {...mockData} />
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

  it('onUpdateProfile should not be called on Radius page when any one of the fields is not submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Router>
        <ProfileDetails {...mockProps} onUpdateProfile={submitSpy} profileType="radius" />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: '' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onUpdateProfile should not be called when any one of the fields is not submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Router>
        <ProfileDetails {...mockProps} onUpdateProfile={submitSpy} profileType="ssid" />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), {
      target: { value: '' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('Back button click should show confirmation modal if form is changed', () => {
    const { getByText, getByRole, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test1' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    const paragraph = getByText('Please confirm exiting without saving this Profile form.');
    expect(paragraph).toBeVisible();
  });

  it('Cancel button click should hide confirmation modal', async () => {
    const { getByRole, getByText, getByLabelText, queryByText } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(getByText('Leave Form?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Leave Form?')).not.toBeInTheDocument();
    });
  });

  it('URL should changes to /profiles when back button is clicked', async () => {
    const { getByRole } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    await waitFor(() => {
      expect(window.location.pathname).toEqual(ROUTES.profiles);
    });
  });

  it('Back button click on Leave Form should chnages URL to /Profiles', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(getByText('Leave Form?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Back' }));

    await waitFor(() => {
      expect(window.location.pathname).toEqual(ROUTES.profiles);
    });
  });

  it('Error msg should be displayed if input field of Profile Name is empty', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <ProfileDetails {...mockProps} />
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
