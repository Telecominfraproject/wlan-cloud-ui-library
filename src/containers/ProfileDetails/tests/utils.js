// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

const radios = ['is2dot4GHz', 'is5GHzL', 'is5GHzU'];

export function generateCompanyNames(size) {
  return Array(size)
    .fill()
    .map(() => faker.company.companyName());
}

export function generateGreTunnelConfig() {
  return {
    model_type: 'GreTunnelConfiguration',
    greTunnelName: faker.lorem.word(),
    greRemoteInetAddr: faker.internet.ip(),
    greParentIfName: 'wan',
    greRemoteMacAddr: {
      addressAsString: faker.internet.mac(),
    },
  };
}

export function generateSsidProfile(secureMode) {
  return {
    id: faker.random.number(50), // Max value 50
    name: faker.commerce.productName(),
    profileType: 'ssid',
    details: {
      appliedRadios: radios,
      bandwidthLimitDown: faker.random.number(100),
      bandwidthLimitUp: faker.random.number(100),
      bonjourGatewayProfileId: null,
      broadcastSsid: 'enabled',
      captivePortalId: null,
      enable80211w: null,
      forwardMode: 'BRIDGE',
      keyRefresh: 0,
      keyStr: faker.commerce.productName(),
      model_type: 'SsidConfiguration',
      noLocalSubnets: false,
      profileType: 'ssid',
      radioBasedConfigs: {},
      radiusServiceName: 'Radius-Profile',
      secureMode: secureMode || 'wpaEAP',
      ssid: 'Default-SSID-1594386919128',
      ssidAdminState: 'enabled',
      videoTrafficOnly: false,
      vlanId: 1,
      wepConfig: null,
    },
    __typename: 'Profile',
  };
}

export function generateRadiusProfile() {
  return {
    id: faker.random.number(50),
    name: faker.commerce.productName(),
    profileType: 'radius',
    details: {
      model_type: 'RadiusProfile',
      subnetConfiguration: {
        test: {
          model_type: 'RadiusSubnetConfiguration',
          subnetAddress: '111.111.111.11',
          subnetCidrPrefix: 9,
          subnetName: 'test',
          proxyConfig: {
            model_type: 'RadiusProxyConfiguration',
            floatingIpAddress: '222.222.222.22',
            floatingIfCidrPrefix: null,
            floatingIfGwAddress: null,
            floatingIfVlan: null,
            sharedSecret: null,
          },
          probeInterval: null,
          serviceRegionName: 'Ottawa',
        },
      },
      serviceRegionMap: {
        Ottawa: {
          model_type: 'RadiusServiceRegion',
          serverMap: {
            'Radius-Profile': [
              {
                model_type: 'RadiusServer',
                ipAddress: faker.internet.ip(),
                secret: faker.internet.password(),
                authPort: 1812,
                timeout: null,
              },
            ],
          },
          regionName: faker.address.city(),
        },
      },
      primaryRadiusAuthServer: {
        model_type: 'RadiusServer',
        ipAddress: faker.internet.ip(),
        secret: faker.internet.password(),
        port: 1812,
      },
      secondaryRadiusAuthServer: {
        model_type: 'RadiusServer',
        ipAddress: faker.internet.ip(),
        secret: faker.internet.password(),
        port: 1812,
      },
      primaryRadiusAccountingServer: {
        model_type: 'RadiusServer',
        ipAddress: faker.internet.ip(),
        secret: faker.internet.password(),
        port: 1812,
      },
      secondaryRadiusAccountingServer: {
        model_type: 'RadiusServer',
        ipAddress: faker.internet.ip(),
        secret: faker.internet.password(),
        port: 1812,
      },
      profileType: 'radius',
    },
    __typename: 'Profile',
  };
}

export function generateApProfile(radioMap) {
  return {
    id: faker.random.number(50),
    name: faker.commerce.productName(),
    profileType: 'equipment_ap',
    details: {
      equipmentType: 'AP',
      ledControlEnabled: true,
      model_type: 'ApNetworkConfiguration',
      networkConfigVersion: 'AP-1',
      ntpServer: { model_type: 'AutoOrManualString', auto: true, value: 'pool.ntp.org' },
      profileType: 'equipment_ap',
      radioMap,
      rtlsSettings: null,
      syntheticClientEnabled: true,
      syslogRelay: null,
      vlan: 0,
      vlanNative: true,
    },
    __typename: 'Profile',
  };
}

export function generateRfConfig(radioType, autoChannelSelection, autoCellSizeSelection) {
  return {
    model_type: 'RfElementConfiguration',
    radioType,
    radioMode: 'modeAC',
    rf: 'test-rf',
    beaconInterval: 100,
    forceScanDuringVoice: 'disabled',
    rtsCtsThreshold: 65535,
    channelBandwidth: 'is80MHz',
    mimoMode: 'twoByTwo',
    maxNumClients: 100,
    autoChannelSelection: autoChannelSelection || false,
    autoCellSizeSelection: autoCellSizeSelection || false,
    activeScanSettings: {
      model_type: 'ActiveScanSettings',
      enabled: true,
      scanFrequencySeconds: 10,
      scanDurationMillis: 65,
    },
    neighbouringListApConfig: {
      model_type: 'NeighbouringAPListConfiguration',
      minSignal: -85,
      maxAps: 25,
    },
    minAutoCellSize: -65,
    perimeterDetectionEnabled: true,
    channelHopSettings: {
      model_type: 'ChannelHopSettings',
      noiseFloorThresholdInDB: -75,
      noiseFloorThresholdTimeInSeconds: 180,
      nonWifiThresholdInPercentage: 50,
      nonWifiThresholdTimeInSeconds: 180,
      obssHopMode: 'NON_WIFI',
    },
    bestApEnabled: null,
    multicastRate: 'auto',
    managementRate: 'auto',
    rxCellSizeDb: -90,
    probeResponseThresholdDb: -90,
    clientDisconnectThresholdDb: -90,
    eirpTxPower: 18,
    useMaxTxPower: false,
    bestApSettings: {
      model_type: 'RadioBestApSettings',
      mlComputed: false,
      dropInSnrPercentage: 30,
      minLoadFactor: 40,
    },
  };
}

export function generateRfProfile(autoChannel) {
  return {
    model_type: 'RfConfiguration',
    id: faker.random.number(50),
    name: faker.company.companyName(),
    profileType: 'rf',
    rfConfigMap: {
      is2dot4GHz: generateRfConfig('is2dot4GHz', autoChannel),
      is5GHz: generateRfConfig('is5GHz', autoChannel),
      is5GHzL: generateRfConfig('is5GHzL', autoChannel),
      is5GHzU: generateRfConfig('is5GHzU', autoChannel),
    },
  };
}
