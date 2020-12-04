import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, ROUTES } from 'tests/utils';
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
  fileUpload: () => {},
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
  rfProfiles: [
    {
      id: 5,
      name: 'TipWlan-rf',
      profileType: 'rf',
      details: {
        rfConfigMap: {
          is2dot4GHz: {
            activeScanSettings: {
              enabled: true,
              model_type: 'ActiveScanSettings',
              scanDurationMillis: 65,
              scanFrequencySeconds: 10,
            },
            autoChannelSelection: false,
            beaconInterval: 100,
            bestApEnabled: null,
            bestApSettings: {
              dropInSnrPercentage: 20,
              minLoadFactor: 50,
              mlComputed: true,
              model_type: 'RadioBestApSettings',
            },
            channelBandwidth: 'is20MHz',
            channelHopSettings: {
              model_type: 'ChannelHopSettings',
              noiseFloorThresholdInDB: -75,
              noiseFloorThresholdTimeInSeconds: 180,
              nonWifiThresholdInPercentage: 50,
              nonWifiThresholdTimeInSeconds: 180,
              obssHopMode: 'NON_WIFI',
            },
            clientDisconnectThresholdDb: 0,
            eirpTxPower: 0,
            forceScanDuringVoice: 'disabled',
            managementRate: 'rate1mbps',
            maxNumClients: 0,
            mimoMode: 'none',
            minAutoCellSize: null,
            model_type: 'RfElementConfiguration',
            multicastRate: 'rate6mbps',
            neighbouringListApConfig: {
              maxAps: 25,
              minSignal: -85,
              model_type: 'NeighbouringAPListConfiguration',
            },
            perimeterDetectionEnabled: true,
            probeResponseThresholdDb: -90,
            radioMode: 'modeN',
            rf: null,
            rtsCtsThreshold: 0,
            rxCellSizeDb: -90,
          },
          is5GHz: {
            activeScanSettings: {
              enabled: true,
              model_type: 'ActiveScanSettings',
              scanDurationMillis: 65,
              scanFrequencySeconds: 10,
            },
            autoChannelSelection: false,
            beaconInterval: 100,
            bestApEnabled: null,
            bestApSettings: {
              dropInSnrPercentage: 20,
              minLoadFactor: 50,
              mlComputed: true,
              model_type: 'RadioBestApSettings',
            },
            channelBandwidth: 'is20MHz',
            channelHopSettings: {
              model_type: 'ChannelHopSettings',
              noiseFloorThresholdInDB: -75,
              noiseFloorThresholdTimeInSeconds: 180,
              nonWifiThresholdInPercentage: 50,
              nonWifiThresholdTimeInSeconds: 180,
              obssHopMode: 'NON_WIFI',
            },
            clientDisconnectThresholdDb: 0,
            eirpTxPower: 0,
            forceScanDuringVoice: 'disabled',
            managementRate: 'rate1mbps',
            maxNumClients: 0,
            mimoMode: 'none',
            minAutoCellSize: null,
            model_type: 'RfElementConfiguration',
            multicastRate: 'rate6mbps',
            neighbouringListApConfig: {
              maxAps: 25,
              minSignal: -85,
              model_type: 'NeighbouringAPListConfiguration',
            },
            perimeterDetectionEnabled: true,
            probeResponseThresholdDb: -90,
            radioMode: 'modeN',
            rf: null,
            rtsCtsThreshold: 0,
            rxCellSizeDb: -90,
          },
          is5GHzL: {
            activeScanSettings: {
              enabled: true,
              model_type: 'ActiveScanSettings',
              scanDurationMillis: 65,
              scanFrequencySeconds: 10,
            },
            autoChannelSelection: false,
            beaconInterval: 100,
            bestApEnabled: null,
            bestApSettings: {
              dropInSnrPercentage: 20,
              minLoadFactor: 50,
              mlComputed: true,
              model_type: 'RadioBestApSettings',
            },
            channelBandwidth: 'is20MHz',
            channelHopSettings: {
              model_type: 'ChannelHopSettings',
              noiseFloorThresholdInDB: -75,
              noiseFloorThresholdTimeInSeconds: 180,
              nonWifiThresholdInPercentage: 50,
              nonWifiThresholdTimeInSeconds: 180,
              obssHopMode: 'NON_WIFI',
            },
            clientDisconnectThresholdDb: 0,
            eirpTxPower: 0,
            forceScanDuringVoice: 'disabled',
            managementRate: 'rate1mbps',
            maxNumClients: 0,
            mimoMode: 'none',
            minAutoCellSize: null,
            model_type: 'RfElementConfiguration',
            multicastRate: 'rate6mbps',
            neighbouringListApConfig: {
              maxAps: 25,
              minSignal: -85,
              model_type: 'NeighbouringAPListConfiguration',
            },
            perimeterDetectionEnabled: true,
            probeResponseThresholdDb: -90,
            radioMode: 'modeN',
            rf: null,
            rtsCtsThreshold: 0,
            rxCellSizeDb: -90,
          },
          is5GHzU: {
            activeScanSettings: {
              enabled: true,
              model_type: 'ActiveScanSettings',
              scanDurationMillis: 65,
              scanFrequencySeconds: 10,
            },
            autoChannelSelection: false,
            beaconInterval: 100,
            bestApEnabled: null,
            bestApSettings: {
              dropInSnrPercentage: 20,
              minLoadFactor: 50,
              mlComputed: true,
              model_type: 'RadioBestApSettings',
            },
            channelBandwidth: 'is20MHz',
            channelHopSettings: {
              model_type: 'ChannelHopSettings',
              noiseFloorThresholdInDB: -75,
              noiseFloorThresholdTimeInSeconds: 180,
              nonWifiThresholdInPercentage: 50,
              nonWifiThresholdTimeInSeconds: 180,
              obssHopMode: 'NON_WIFI',
            },
            clientDisconnectThresholdDb: 0,
            eirpTxPower: 0,
            forceScanDuringVoice: 'disabled',
            managementRate: 'rate1mbps',
            maxNumClients: 0,
            mimoMode: 'none',
            minAutoCellSize: null,
            model_type: 'RfElementConfiguration',
            multicastRate: 'rate6mbps',
            neighbouringListApConfig: {
              maxAps: 25,
              minSignal: -85,
              model_type: 'NeighbouringAPListConfiguration',
            },
            perimeterDetectionEnabled: true,
            probeResponseThresholdDb: -90,
            radioMode: 'modeN',
            rf: null,
            rtsCtsThreshold: 0,
            rxCellSizeDb: -90,
          },
        },
      },
    },
  ],
  childProfileIds: [1, 5],
  childProfiles: [
    {
      details: {},
      id: '1',
      name: 'TipWlan-cloud-1-radios',
      profileType: 'ssid',
      __typename: 'Profile',
    },
    {
      details: {},
      id: '5',
      name: 'TipWlan-rf',
      profileType: 'rf',
      __typename: 'Profile',
    },
  ],
};

describe('<ProfileDetails />', () => {
  afterEach(cleanup);

  it('onUpdateProfile should be called when all fields are submitted correctly profileType ssid', async () => {
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
    const { getByRole } = render(
      <Router>
        <ProfileDetails {...mockData} onUpdateProfile={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateProfile should be called when all fields are submitted correctly profileType equipment_ap', async () => {
    const submitSpy = jest.fn();

    const { getByRole } = render(
      <Router>
        <ProfileDetails {...mockProps} onUpdateProfile={submitSpy} profileType="equipment_ap" />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Save' }));

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
    const { getByRole } = render(
      <Router>
        <ProfileDetails onUpdateProfile={submitSpy} {...mockData} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('error notification should be visible when save button is clicked with no Radius services and profileType is radius', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <Router>
        <ProfileDetails {...mockProps} onUpdateProfile={submitSpy} profileType="radius" />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('At least 1 RADIUS Service is required.')).toBeVisible();
    });
  });

  it('error notification should be visible when save button is clicked with zero subnet and profileType is radius', async () => {
    const submitSpy = jest.fn();
    const mockDetails = {
      ...mockProps,
      profileType: 'radius',
      details: {
        ...mockProps.details,
        serviceRegionMap: {
          Ottawa: {
            model_type: 'RadiusServiceRegion',
            serverMap: {
              'Radius-Profile': [
                {
                  model_type: 'RadiusServer',
                  ipAddress: '192.168.0.1',
                  secret: 'testing123',
                  authPort: 1812,
                  timeout: null,
                },
              ],
            },
            regionName: 'Ottawa',
          },
        },
      },
    };
    const { getByRole, getByText } = render(
      <Router>
        <ProfileDetails {...mockDetails} onUpdateProfile={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('At least 1 Subnet is required.')).toBeVisible();
    });
  });

  it('error notification should be visible when save button is clicked with service zones and profileType is radius', async () => {
    const submitSpy = jest.fn();
    const mockDetails = {
      ...mockProps,
      profileType: 'radius',
      details: {
        ...mockProps.details,
        serviceRegionMap: {
          Ottawa: {
            model_type: 'RadiusServiceRegion',
            serverMap: {
              'Radius-Profile': [
                {
                  model_type: 'RadiusServer',
                  ipAddress: '192.168.0.1',
                  secret: 'testing123',
                  authPort: 1812,
                  timeout: null,
                },
              ],
            },
            regionName: 'Ottawa',
          },
        },
      },
    };
    const { getByRole, getByText } = render(
      <Router>
        <ProfileDetails {...mockDetails} onUpdateProfile={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: /deleteRadiusServiceZone/i }));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('At least 1 RADIUS Service Zone is required.')).toBeVisible();
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
    const { getByRole, getByText, getByLabelText } = render(
      <Router>
        <ProfileDetails {...mockProps} />
      </Router>
    );
    fireEvent.change(getByLabelText('Profile Name'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(getByText('Leave Form?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Leave Form?')).not.toBeVisible();
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
