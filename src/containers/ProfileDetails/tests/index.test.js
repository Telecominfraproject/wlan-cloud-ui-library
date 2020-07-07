import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'tests/utils';
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

const mockProps = {
  onUpdateProfile: () => {},
  name: 'Radius-Profile1',
  profileType: '',
  details: {
    appliedRadios: ['is5GHzL', 'is2dot4GHz', 'is5GHzU'],
    bandwidthLimitDown: 0,
    bandwidthLimitUp: 0,
    bonjourGatewayProfileId: null,
    broadcastSsid: 'enabled',
    captivePortalId: null,
    enable80211w: null,
    forwardMode: 'BRIDGE',
    keyRefresh: 0,
    keyStr: 'testing123',
    model_type: 'SsidConfiguration',
    noLocalSubnets: false,
    profileType: 'ssid',
    radioBasedConfigs: {
      is2dot4GHz: {
        enable80211k: null,
        enable80211r: null,
        enable80211v: null,
        model_type: 'RadioBasedSsidConfiguration',
      },
      is5GHz: {
        enable80211k: null,
        enable80211r: null,
        enable80211v: null,
        model_type: 'RadioBasedSsidConfiguration',
      },
      is5GHzU: {
        enable80211k: null,
        enable80211r: null,
        enable80211v: null,
        model_type: 'RadioBasedSsidConfiguration',
      },
      is5GHzL: {
        enable80211k: null,
        enable80211r: null,
        enable80211v: null,
        model_type: 'RadioBasedSsidConfiguration',
      },
    },
    radiusServiceName: 'Radius-Profile',
    secureMode: 'wpaEAP',
    ssid: '123',
    ssidAdminState: 'enabled',
    videoTrafficOnly: false,
    vlanId: 1,
    wepConfig: null,
  },
  ssidProfiles: [
    {
      id: 2,
      name: 'Radius-Profile1',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is5GHzL', 'is2dot4GHz', 'is5GHzU'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: 'BRIDGE',
        keyRefresh: 0,
        keyStr: 'testing123',
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: 'Radius-Profile',
        secureMode: 'wpaEAP',
        ssid: '123',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
    {
      id: 3,
      name: 'TipWlan-cloud-3-radios',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is5GHzL', 'is2dot4GHz', 'is5GHzU'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
        keyRefresh: 0,
        keyStr: null,
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: null,
        secureMode: 'open',
        ssid: 'TipWlan-cloud-3-radios',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
    {
      id: 4,
      name: 'TipWlan-cloud-2-radios',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is5GHz', 'is2dot4GHz'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
        keyRefresh: 0,
        keyStr: null,
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: null,
        secureMode: 'open',
        ssid: 'TipWlan-cloud-2-radios',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
  ],
  childProfileIds: [1],
};

describe('<ProfileDetails />', () => {
  afterEach(cleanup);

  it('onUpdateProfile should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <ProfileDetails {...mockProps} onUpdateProfile={submitSpy} profileType="ssid" />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
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

  it('onUpdateProfile should not be called when any one of the fields is not submitted correctly', async () => {
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

  it('Back button click should show confirmation modal', () => {
    const { getByText, getByRole } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: /back/i }));

    const paragraph = getByText('Please confirm exiting without saving this Profile form.');
    expect(paragraph).toBeVisible();
  });

  it('Cancel button click should hide confirmation modal', async () => {
    const { getByRole, getByText } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(getByText('Leave Form?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Leave Form?')).not.toBeVisible();
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

  // it('Error msg should be displayed if input field of SSID Name is empty', async () => {
  //   const { getByLabelText, getByText } = render(
  //     <Router>
  //       <ProfileDetails {...mockProps} />
  //     </Router>
  //   );

  //   fireEvent.change(getByLabelText('SSID Name'), { target: { value: '' } });
  //   await waitFor(() => {
  //     expect(getByText('Please input your new SSID name')).toBeVisible();
  //   });
  // });
});
