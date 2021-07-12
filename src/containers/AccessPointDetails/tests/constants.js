import {
  generateApProfile,
  generateSsidProfile,
  generateRfConfig,
} from 'containers/ProfileDetails/tests/utils';

import { generateFirmware } from './utils';

export const osData = [
  {
    details: {
      apPerformance: {
        freeMemory: 0,
        cpuTemperature: 0,
        cpuUtilized: [0],
      },
    },
  },
];

export const firmware = [
  generateFirmware(),
  generateFirmware(),
  generateFirmware(),
  generateFirmware(),
];

const alarms = [
  {
    severity: 'error',
    alarmCode: 'MemoryUtilization',
    details: {
      model_type: 'AlarmDetails',
      message: 'Available memory is too low',
      affectedEquipmentIds: null,
      generatedBy: null,
      contextAttrs: null,
    },
    createdTimestamp: '1594045789329',
    equipment: {
      id: 7,
      name: 'AP 7',
      __typename: 'Equipment',
    },
    __typename: 'Alarm',
  },
];

const profiles = [
  {
    ...generateApProfile(),
    childProfiles: [generateApProfile()],
  },
  {
    ...generateApProfile(),
    childProfiles: [generateApProfile()],
  },
  {
    ...generateApProfile(),
    childProfiles: [generateApProfile()],
  },
];

const locations = [
  {
    id: '0',
    key: '0',
    value: '0',
    children: [
      {
        id: 2,
        key: 2,
        name: 'Menlo Park',
        parentId: 0,
        title: 'Menlo Park',
        value: '2',
        children: [
          {
            id: 3,
            key: 3,
            name: 'Building 1',
            parentId: 2,
            title: 'Building 1',
            value: '3',
            children: [
              {
                id: 4,
                key: 4,
                name: 'Floor 1',
                parentId: 3,
                title: 'Floor 1',
                value: '4',
              },
              {
                id: 5,
                key: 5,
                name: 'Floor 2',
                parentId: 3,
                title: 'Floor 2',
                value: '5',
              },
              {
                id: 6,
                key: 6,
                name: 'Floor 3',
                parentId: 3,
                title: 'Floor 3',
                value: '6',
              },
            ],
          },
          {
            id: 7,
            key: 7,
            name: 'Building 2',
            parentId: 2,
            title: 'Building 2',
            value: '7',
          },
        ],
      },
      {
        id: 8,
        key: 8,
        name: 'Ottawa',
        parentId: 0,
        title: 'Ottawa',
        value: '8',
      },
      {
        id: 15,
        key: 15,
        name: 'Toronto',
        parentId: 0,
        title: 'Toronto',
        value: '15',
      },
    ],
  },
];
const radioMap = {
  is5GHzU: {
    model_type: 'ElementRadioConfiguration',
    radioType: 'is5GHzU',
    channelNumber: 149,
    manualChannelNumber: 149,
    backupChannelNumber: 154,
    autoChannelSelection: true,
    channelBandwidth: 'is80MHz',
    bannedChannels: [],
    rxCellSizeDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    probeResponseThresholdDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    clientDisconnectThresholdDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    eirpTxPower: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: 18,
    },
    bestApEnabled: null,
    neighbouringListApConfig: {
      model_type: 'NeighbouringAPListConfiguration',
      minSignal: -85,
      maxAps: 25,
    },
    minAutoCellSize: -80,
    perimeterDetectionEnabled: true,
    bestAPSteerType: 'both',
    deauthAttackDetection: null,
    allowedChannelsPowerLevels: [],
    activeChannel: 149,
  },
  is5GHzL: {
    model_type: 'ElementRadioConfiguration',
    radioType: 'is5GHzL',
    channelNumber: 36,
    manualChannelNumber: 36,
    backupChannelNumber: 44,
    autoChannelSelection: true,
    channelBandwidth: 'is80MHz',
    bannedChannels: [],
    rxCellSizeDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    probeResponseThresholdDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    clientDisconnectThresholdDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    eirpTxPower: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: 18,
    },
    bestApEnabled: null,
    neighbouringListApConfig: {
      model_type: 'NeighbouringAPListConfiguration',
      minSignal: -85,
      maxAps: 25,
    },
    minAutoCellSize: -80,
    perimeterDetectionEnabled: true,
    bestAPSteerType: 'both',
    deauthAttackDetection: null,
    allowedChannelsPowerLevels: [],
    activeChannel: 36,
  },
  is2dot4GHz: {
    model_type: 'ElementRadioConfiguration',
    radioType: 'is2dot4GHz',
    channelNumber: 6,
    manualChannelNumber: 6,
    backupChannelNumber: 11,
    autoChannelSelection: true,
    channelBandwidth: 'is20MHz',
    bannedChannels: [],
    rxCellSizeDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    probeResponseThresholdDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    clientDisconnectThresholdDb: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: -90,
    },
    eirpTxPower: {
      model_type: 'AutoOrManualValue',
      auto: true,
      value: 18,
    },
    bestApEnabled: null,
    neighbouringListApConfig: {
      model_type: 'NeighbouringAPListConfiguration',
      minSignal: -85,
      maxAps: 25,
    },
    minAutoCellSize: -80,
    perimeterDetectionEnabled: true,
    bestAPSteerType: 'both',
    deauthAttackDetection: null,
    allowedChannelsPowerLevels: [],
    activeChannel: 6,
  },
};

export const defaultProps = {
  data: {
    name: 'AP 1',
    locationId: 15,
    serial: 'serial-ap-1',
    inventoryId: 'ap-1',
    profileId: 7,
    alarms,
    details: {
      model_type: 'ApElementConfiguration',
      sampleDetailsStr: null,
      elementConfigVersion: 'AP-V1',
      equipmentType: 'AP',
      deviceMode: 'standaloneAP',
      gettingIP: 'dhcp',
      staticIP: null,
      staticIpMaskCidr: null,
      staticIpGw: null,
      gettingDNS: 'dhcp',
      staticDnsIp1: null,
      staticDnsIp2: null,
      peerInfoList: [],
      deviceName: 'Default Device Name',
      locationData: null,
      locallyConfiguredMgmtVlan: 0,
      locallyConfigured: false,
      deploymentType: 'CEILING',
      syntheticClientEnabled: null,
      frameReportThrottleEnabled: true,
      antennaType: 'OMNI',
      costSavingEventsEnabled: true,
      forwardMode: 'BRIDGE',
      radioMap,
      advancedRadioMap: {
        is2dot4GHz: {
          model_type: 'RadioConfiguration',
          radioType: 'is2dot4GHz',
          radioAdminState: 'enabled',
          fragmentationThresholdBytes: 2346,
          rtsCtsThreshold: 65535,
          autoChannelSelection: 'disabled',
          radioMode: 'modeN',
          mimoMode: 'twoByTwo',
          wmmState: 'enabled',
          uapsdState: 'enabled',
          maxNumClients: 100,
          stationIsolation: 'disabled',
          multicastRate: 'auto',
          managementRate: 'auto',
          activeScanSettings: {
            model_type: 'ActiveScanSettings',
            enabled: true,
            scanFrequencySeconds: 10,
            scanDurationMillis: 65,
          },
          channelHopSettings: {
            model_type: 'ChannelHopSettings',
            noiseFloorThresholdInDB: -75,
            noiseFloorThresholdTimeInSeconds: 180,
            nonWifiThresholdInPercentage: 50,
            nonWifiThresholdTimeInSeconds: 180,
            obssHopMode: 'NON_WIFI',
          },
          bestApSettings: {
            model_type: 'RadioBestApSettings',
            mlComputed: true,
            dropInSnrPercentage: 20,
            minLoadFactor: 50,
          },
          forceScanDuringVoice: 'disabled',
          legacyBSSRate: 'enabled',
          beaconInterval: 100,
          deauthAttackDetection: null,
        },
        is5GHzU: {
          model_type: 'RadioConfiguration',
          radioType: 'is5GHzU',
          radioAdminState: 'enabled',
          fragmentationThresholdBytes: 2346,
          rtsCtsThreshold: 65535,
          autoChannelSelection: 'disabled',
          radioMode: 'modeAC',
          mimoMode: 'twoByTwo',
          wmmState: 'enabled',
          uapsdState: 'enabled',
          maxNumClients: 100,
          stationIsolation: 'disabled',
          multicastRate: 'auto',
          managementRate: 'auto',
          activeScanSettings: {
            model_type: 'ActiveScanSettings',
            enabled: true,
            scanFrequencySeconds: 10,
            scanDurationMillis: 65,
          },
          channelHopSettings: {
            model_type: 'ChannelHopSettings',
            noiseFloorThresholdInDB: -75,
            noiseFloorThresholdTimeInSeconds: 180,
            nonWifiThresholdInPercentage: 50,
            nonWifiThresholdTimeInSeconds: 180,
            obssHopMode: 'NON_WIFI',
          },
          bestApSettings: {
            model_type: 'RadioBestApSettings',
            mlComputed: true,
            dropInSnrPercentage: 30,
            minLoadFactor: 40,
          },
          forceScanDuringVoice: 'disabled',
          legacyBSSRate: 'enabled',
          beaconInterval: 100,
          deauthAttackDetection: null,
        },
        is5GHzL: {
          model_type: 'RadioConfiguration',
          radioType: 'is5GHzL',
          radioAdminState: 'enabled',
          fragmentationThresholdBytes: 2346,
          rtsCtsThreshold: 65535,
          autoChannelSelection: 'disabled',
          radioMode: 'modeAC',
          mimoMode: 'twoByTwo',
          wmmState: 'enabled',
          uapsdState: 'enabled',
          maxNumClients: 100,
          stationIsolation: 'disabled',
          multicastRate: 'auto',
          managementRate: 'auto',
          activeScanSettings: {
            model_type: 'ActiveScanSettings',
            enabled: true,
            scanFrequencySeconds: 10,
            scanDurationMillis: 65,
          },
          channelHopSettings: {
            model_type: 'ChannelHopSettings',
            noiseFloorThresholdInDB: -75,
            noiseFloorThresholdTimeInSeconds: 180,
            nonWifiThresholdInPercentage: 50,
            nonWifiThresholdTimeInSeconds: 180,
            obssHopMode: 'NON_WIFI',
          },
          bestApSettings: {
            model_type: 'RadioBestApSettings',
            mlComputed: true,
            dropInSnrPercentage: 30,
            minLoadFactor: 40,
          },
          forceScanDuringVoice: 'disabled',
          legacyBSSRate: 'enabled',
          beaconInterval: 100,
          deauthAttackDetection: null,
        },
      },
    },
    profile: {
      name: 'ApProfile-3-radios',
      childProfiles: [
        generateSsidProfile(),
        {
          __typename: 'Profile',
          id: '5',
          name: 'test-rf',
          details: {
            model_type: 'RfConfiguration',
            rfConfigMap: {
              is2dot4GHz: generateRfConfig('is2dot4GHz', true, true),
              is5GHz: generateRfConfig('is5GHz', true, true),
              is5GHzL: generateRfConfig('is5GHzL', false),
              is5GHzU: generateRfConfig('is5GHzU', false),
            },
            profileType: 'rf',
          },
        },
      ],
      __typename: 'Profile',
    },
    status: {
      protocol: {
        detailsJSON: {
          model_type: 'EquipmentProtocolStatusData',
          poweredOn: true,
          protocolState: 'ready',
          reportedHwVersion: null,
          reportedSwVersion: null,
          reportedSwAltVersion: null,
          cloudProtocolVersion: null,
          reportedIpV4Addr: '192.168.1.120',
          reportedIpV6Addr: 'fe80:0:0:0:218:b4ff:fe5d:5e3f',
          reportedMacAddr: {
            model_type: 'MacAddress',
            address: 'dJzjex5J',
            addressAsString: '74:9c:e3:7b:1e:49',
          },
          countryCode: null,
          systemName: null,
          systemContact: null,
          systemLocation: null,
          bandPlan: null,
          serialNumber: 'serial-ap-1',
          baseMacAddress: {
            model_type: 'MacAddress',
            address: 'dJzjex5J',
            addressAsString: '74:9c:e3:7b:1e:49',
          },
          reportedApcAddress: null,
          lastApcUpdate: null,
          isApcConnected: null,
          ipBasedConfiguration: null,
          reportedSku: null,
          reportedCC: null,
          radiusProxyAddress: null,
          reportedCfgDataVersion: null,
          cloudCfgDataVersion: null,
          useTroubleshotThrottleConfig: null,
          dataThrottleCfgModeChanged: null,
          statusDataType: 'PROTOCOL',
        },
        details: {
          reportedMacAddr: '74:9c:e3:7b:1e:49',
          __typename: 'StatusDetails',
        },
        __typename: 'Status',
      },
      radioUtilization: {
        detailsJSON: {
          model_type: 'RadioUtilizationReport',
          radioUtilization: {
            is2dot4GHz: {
              model_type: 'EquipmentPerRadioUtilizationDetails',
              wifiFromOtherBss: {
                model_type: 'MinMaxAvgValueInt',
                minValue: 3,
                maxValue: 9,
                avgValue: 5,
              },
            },
            is5GHzU: {
              model_type: 'EquipmentPerRadioUtilizationDetails',
              wifiFromOtherBss: {
                model_type: 'MinMaxAvgValueInt',
                minValue: 2,
                maxValue: 6,
                avgValue: 9,
              },
            },
            is5GHzL: {
              model_type: 'EquipmentPerRadioUtilizationDetails',
              wifiFromOtherBss: {
                model_type: 'MinMaxAvgValueInt',
                minValue: 1,
                maxValue: 8,
                avgValue: 6,
              },
            },
          },
          capacityDetails: {
            is2dot4GHz: {
              model_type: 'EquipmentCapacityDetails',
              totalCapacity: 71,
              availableCapacity: 62,
              unavailableCapacity: 9,
              unusedCapacity: 9,
              usedCapacity: 53,
            },
            is5GHzU: {
              model_type: 'EquipmentCapacityDetails',
              totalCapacity: 98,
              availableCapacity: 85,
              unavailableCapacity: 13,
              unusedCapacity: 11,
              usedCapacity: 74,
            },
            is5GHzL: {
              model_type: 'EquipmentCapacityDetails',
              totalCapacity: 77,
              availableCapacity: 57,
              unavailableCapacity: 20,
              unusedCapacity: 37,
              usedCapacity: 20,
            },
          },
          avgNoiseFloor: {
            is2dot4GHz: -56,
            is5GHzU: -74,
            is5GHzL: -47,
          },
          statusDataType: 'RADIO_UTILIZATION',
        },
        __typename: 'Status',
      },
      clientDetails: {
        detailsJSON: {
          numClientsPerRadio: 0,
        },
      },
      osPerformance: {
        detailsJSON: {
          model_type: 'OperatingSystemPerformance',
          numCamiCrashes: 0,
          uptimeInSeconds: 3870,
          avgCpuUtilization: 76.990234,
          avgCpuPerCore: [73.59292, 93.00031],
          avgFreeMemory: 11710599,
          avgCpuTemperature: 28.633795,
          statusDataType: 'OS_PERFORMANCE',
        },
        __typename: 'Status',
      },
      __typename: 'StatusPagination',
    },
    __typename: 'Equipment',
  },
  profiles,
  locations,
  osData,
  onUpdateEquipmentFirmware: () => {},
  onUpdateEquipment: () => {},
  loadingProfiles: false,
  loadingFirmware: false,
  onDeleteEquipment: () => {},
  extraFields: [
    {
      label: 'Rx Cell Size',
      obj: radioMap,
      dataIndex: 'rxCellSizeDb',
      dependencies: 'autoCellSizeSelection',
    },
  ],
  isFormDirty: true,
};
