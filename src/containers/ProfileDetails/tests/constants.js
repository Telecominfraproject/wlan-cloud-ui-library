import {
  generateCompanyNames,
  generateRadiusProfile,
  generateRfConfig,
  generateRfProfile,
  generateSsidProfile,
} from './utils';

const fakeSsid = generateSsidProfile();

export const mockAccessPoint = {
  details: {
    equipmentDiscovery: false,
    equipmentType: 'AP',
    ledControlEnabled: true,
    model_type: 'ApNetworkConfiguration',
    networkConfigVersion: 'AP-1',
    ntpServer: { model_type: 'AutoOrManualString', auto: true, value: 'pool.ntp.org' },
    profileType: 'equipment_ap',
    radioMap: {
      is2dot4GHz: {
        model_type: 'RadioProfileConfiguration',
        bestApEnabled: true,
        bestAPSteerType: 'both',
      },
      is5GHzL: {
        model_type: 'RadioProfileConfiguration',
        bestApEnabled: true,
        bestAPSteerType: 'both',
      },
      is5GHzU: {
        model_type: 'RadioProfileConfiguration',
        bestApEnabled: true,
        bestAPSteerType: 'both',
      },
    },
    rtlsSettings: null,
    syntheticClientEnabled: true,
    syslogRelay: null,
    vlan: 0,
    vlanNative: true,
    greTunnelConfigurations: [],
  },
  childProfileIds: [fakeSsid.id],
  childProfiles: [fakeSsid],
  ssidProfiles: [fakeSsid, generateSsidProfile(), generateSsidProfile()],
  onSearchProfile: () => {},
};

export const mockBonjourGateway = {
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
        serviceNames: generateCompanyNames(4),
      },
      {
        model_type: 'BonjourServiceSet',
        vlanId: 17,
        supportAllServices: false,
        serviceNames: generateCompanyNames(2),
      },
      {
        model_type: 'BonjourServiceSet',
        vlanId: 33,
        supportAllServices: false,
        serviceNames: generateCompanyNames(3),
      },
      {
        model_type: 'BonjourServiceSet',
        vlanId: 35,
        supportAllServices: false,
        serviceNames: generateCompanyNames(2),
      },
    ],
  },
  __typename: 'Profile',
};

export const mockCaptivePortal = {
  details: {
    authenticationType: 'guest',
    backgroundFile: null,
    backgroundPosition: 'left_top',
    backgroundRepeat: 'no_repeat',
    browserTitle: 'Access the network as Guest',
    expiryType: 'unlimited',
    externalCaptivePortalURL: null,
    externalPolicyFile: null,
    headerContent: 'Captive Portal',
    logoFile: null,
    macWhiteList: [],
    maxUsersWithSameCredentials: 42,
    model_type: 'CaptivePortalConfiguration',
    name: 'Captive-portal',
    profileType: 'captive_portal',
    radiusAuthMethod: 'CHAP',
    radiusServiceName: null,
    redirectURL: '',
    sessionTimeoutInMinutes: 60,
    successPageMarkdownText: 'Welcome to the network',
    userAcceptancePolicy: 'Use this network at your own risk. No warranty of any kind.',
    userList: [
      {
        model_type: 'TimedAccessUserRecord',
        username: 'test',
        password: 'test',
        activationTime: null,
        expirationTime: null,
        numDevices: 0,
        userDetails: {
          model_type: 'TimedAccessUserDetails',
          firstName: 'test',
          lastName: 'test',
          passwordNeedsReset: false,
        },
        userMacAddresses: [],
        lastModifiedTimestamp: 0,
      },
      {
        model_type: 'TimedAccessUserRecord',
        username: 'test2',
        password: 'test2',
        activationTime: null,
        expirationTime: null,
        numDevices: 0,
        userDetails: {
          model_type: 'TimedAccessUserDetails',
          firstName: 'test2',
          lastName: 'test2',
          passwordNeedsReset: false,
        },
        userMacAddresses: [],
        lastModifiedTimestamp: 0,
      },
    ],
    usernamePasswordFile: null,
    walledGardenAllowlist: ['1.1.1.1'],
  },
  radiusProfiles: [generateRadiusProfile()],
};

export const mockOperator = {
  operatorFriendlyName: [
    {
      asDuple: 'eng:test',
      defaultDupleSeparator: ':',
      dupleIso3Language: 'eng',
      dupleName: 'test',
      locale: 'eng',
      model_type: 'PasspointDuple',
    },
  ],
  serverOnlyAuthenticatedL2EncriptionNetwork: true,
  x509CertificateLocation: '/etc/ca.pem',
};

export const mockSsid = {
  radiusProfiles: [generateRadiusProfile(), generateRadiusProfile()],
  details: generateSsidProfile('wep').details,
};

export const mockVenue = {
  details: {
    model_type: 'PasspointVenueProfile',
    profileType: 'passpoint_venue',
    venueNameSet: [
      {
        asDuple: 'fra:Exemple de lieu',
        defaultDupleSeparator: ':',
        dupleName: 'Exemple de lieu',
        locale: 'fra',
        model_type: 'PasspointVenueName',
        venueUrl: 'http://www.example.com/info-fra',
      },
    ],
    venueTypeAssignment: {
      model_type: 'ProfileVenueTypeAssignment',
      venueDescription: null,
      venueGroupId: 2,
      venueTypeId: 8,
    },
  },
};
export const mockPasspoint = {
  details: {
    accessNetworkType: 'private_network',
    anqpDomainId: 0,
    associatedAccessSsidProfileIds: [],
    connectionCapabilitySet: [
      {
        connectionCapabilitiesIpProtocol: 'TCP',
        connectionCapabilitiesPortNumber: 9000,
        connectionCapabilitiesStatus: 'open',
      },
    ],
    disableDownstreamGroupAddressedForwarding: true,
    emergencyServicesReachable: true,
    enableInterworkingAndHs20: true,
    gasAddr3Behaviour: 'p2pSpecWorkaroundFromRequest',
    hessid: {
      addressAsString: '0a:0b:0c:0d:0e:0f',
    },
    internetConnectivity: true,
    ipAddressTypeAvailability: 'address_type_not_available',
    networkAuthenticationType: 'acceptance_of_terms_and_conditions',
    operatingClass: 0,
    passpointAccessNetworkType: 'private_network',
    passpointOperatorProfileId: 10,
    passpointOsuProviderProfileIds: [20, 21],
    passpointVenueProfileId: 30,
    osuSsidProfileId: 2,
    termsAndConditionsFile: null,
    unauthenticatedEmergencyServiceAccessible: false,
  },
  childProfileIds: ['30', '20', '10'],
  childProfiles: [
    {
      id: '30',
      name: 'Venue-Profile',
      profileType: 'passpoint_venue',
      details: {},
    },
    {
      id: '20',
      name: 'Id-Provider-Profile-1',
      profileType: 'passpoint_osu_id_provider',
      details: {},
    },
    {
      id: '10',
      name: 'Operator-Profile',
      profileType: 'passpoint_operator',
      details: {},
    },
  ],
  associatedSsidProfiles: [
    {
      id: '40',
      name: 'ssid-profile-1',
      profileType: 'ssid',
      details: {},
    },
  ],
  venueProfiles: [
    {
      id: '30',
      name: 'Venue-Profile',
      profileType: 'passpoint_venue',
      details: {
        model_type: 'PasspointVenueProfile',
        profileType: 'passpoint_venue',
        venueNameSet: [
          {
            asDuple: 'fra:Exemple de lieu',
            defaultDupleSeparator: ':',
            dupleName: 'Exemple de lieu',
            locale: 'fra_CA',
            model_type: 'PasspointVenueName',
            venueUrl: 'http://www.example.com/info-fra',
          },
        ],
        venueTypeAssignment: {
          model_type: 'ProfileVenueTypeAssignment',
          venueDescription: null,
          venueGroupId: 2,
          venueTypeId: 8,
        },
      },
    },
  ],
  operatorProfiles: [
    {
      id: '10',
      name: 'Operator-Profile',
      profileType: 'passpoint_operator',
      details: {
        operatorFriendlyName: [
          {
            asDuple: 'eng:test',
            defaultDupleSeparator: ':',
            dupleIso3Language: 'eng',
            dupleName: 'test',
            locale: 'eng',
            model_type: 'PasspointDuple',
          },
        ],
        serverOnlyAuthenticatedL2EncriptionNetwork: true,
        x509CertificateLocation: '/etc/ca.pem',
      },
    },
  ],
  idProviderProfiles: [
    {
      id: '20',
      name: 'Id-Provider-Profile-1',
      profileType: 'passpoint_osu_id_provider',
      details: {},
    },
    {
      id: '21',
      name: 'Id-Provider-Profile-2',
      profileType: 'passpoint_osu_id_provider',
      details: {},
    },
  ],
  ssidProfiles: [
    {
      id: '40',
      name: 'ssid-profile-1',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is2dot4GHz', 'is5GHzL', 'is5GHzU'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
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
        ssid: 'Default-SSID-1594386919128',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
    {
      id: '41',
      name: 'ssid-profile-2',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is2dot4GHz', 'is5GHzL', 'is5GHzU'],
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
  ],
  onSearchProfile: () => {},
};

export const mockProviderId = {
  details: {
    osuFriendlyname: [
      {
        asDuple: 'eng:test',
        defaultDupleSeparator: ':',
        dupleIso3Language: 'eng',
        dupleName: 'test',
        locale: 'eng',
        model_type: 'PasspointDuple',
      },
    ],
    osuServiceDescription: [
      {
        asDuple: 'eng:test',
        defaultDupleSeparator: ':',
        dupleIso3Language: 'eng',
        dupleName: 'test',
        locale: 'eng',
        model_type: 'PasspointDuple',
      },
    ],
    osuIconList: [
      {
        imageUrl: 'https://rogers.com/icon32eng.png',
        model_type: 'PasspointOsuIcon',
        iconLocale: 'fr_CA',
      },
    ],
    naiRealmList: [
      {
        eapMap: {
          'EAP-TTLS with username/password': ['Expanded EAP Method: Hardware Token'],
        },
        encoding: 0,
        model_type: 'PasspointNaiRealmInformation',
      },
    ],
    osuServerUri: 'https://example.com/oso',
    roamingOi: [1, 2],
    mccMncList: [],
  },
};

export const mockRadius = {
  details: generateRadiusProfile().details,
};

export const mockRf = {
  details: generateRfProfile(),
  extraFields: [
    {
      label: 'Rx Cell Size',
      dataIndex: ['rxCellSizeDb'],
      renderInput: 'renderInputItem',
      options: {
        min: -100,
        max: 100,
        error: '-100 - 100 dBm',
        addOnText: 'dBm',
      },
    },
  ],
};

export const mockProps = {
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
  ssidProfiles: [generateSsidProfile(), generateSsidProfile(), generateSsidProfile()],
  rfProfiles: [generateRfConfig()],
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
