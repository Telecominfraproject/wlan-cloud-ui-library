import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, getByTestId } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render } from 'tests/utils';
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

const mockProps = {
  data: {
    name: 'AP 1',
    locationId: 4,
    serial: 'serial-ap-1',
    inventoryId: 'ap-1',
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
      radioMap: {
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
      },
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
      name: 'ApProfile',
      childProfiles: [
        {
          id: 1,
          name: 'Connectus-cloud',
          details: {
            model_type: 'SsidConfiguration',
            ssid: 'Default-SSID-1592229836294',
            appliedRadios: ['is5GHzU', 'is5GHzL', 'is2dot4GHz'],
            ssidAdminState: 'enabled',
            secureMode: 'open',
            vlanId: 1,
            keyStr: null,
            broadcastSsid: 'enabled',
            keyRefresh: 0,
            noLocalSubnets: false,
            radiusServiceName: null,
            captivePortalId: null,
            bandwidthLimitDown: 0,
            bandwidthLimitUp: 0,
            videoTrafficOnly: false,
            radioBasedConfigs: {
              is5GHz: {
                model_type: 'RadioBasedSsidConfiguration',
                enable80211r: null,
                enable80211k: null,
                enable80211v: null,
              },
              is2dot4GHz: {
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
              is5GHzL: {
                model_type: 'RadioBasedSsidConfiguration',
                enable80211r: null,
                enable80211k: null,
                enable80211v: null,
              },
            },
            bonjourGatewayProfileId: null,
            enable80211w: null,
            wepConfig: null,
            forwardMode: null,
            profileType: 'ssid',
          },
          __typename: 'Profile',
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
      clientDetails: null,
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
  osData: [
    {
      values: [
        {
          CpuUtilCore1: 1,
          CpuUtilCore2: 2,
          CpuTemperature: 3,
          avgFreeMemory: 4,
        },
      ],
    },
  ],
  profiles: [
    [
      {
        id: 6,
        name: 'ApProfile-3-radios',
        profileType: 'equipment_ap',
        details: {
          model_type: 'ApNetworkConfiguration',
          networkConfigVersion: 'AP-1',
          equipmentType: 'AP',
          vlanNative: true,
          vlan: 0,
          ntpServer: {
            model_type: 'AutoOrManualString',
            auto: true,
            value: 'pool.ntp.org',
          },
          syslogRelay: null,
          rtlsSettings: null,
          syntheticClientEnabled: true,
          ledControlEnabled: true,
          equipmentDiscovery: false,
          radioMap: {
            is2dot4GHz: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
            is5GHzU: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
            is5GHzL: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
          },
          profileType: 'equipment_ap',
        },
        childProfiles: [
          {
            id: 3,
            name: 'TipWlan-cloud-3-radios',
            details: {
              model_type: 'SsidConfiguration',
              ssid: 'TipWlan-cloud-3-radios',
              appliedRadios: ['is5GHzU', 'is5GHzL', 'is2dot4GHz'],
              ssidAdminState: 'enabled',
              secureMode: 'open',
              vlanId: 1,
              keyStr: null,
              broadcastSsid: 'enabled',
              keyRefresh: 0,
              noLocalSubnets: false,
              radiusServiceName: null,
              captivePortalId: null,
              bandwidthLimitDown: 0,
              bandwidthLimitUp: 0,
              videoTrafficOnly: false,
              radioBasedConfigs: {
                is5GHz: {
                  model_type: 'RadioBasedSsidConfiguration',
                  enable80211r: null,
                  enable80211k: null,
                  enable80211v: null,
                },
                is2dot4GHz: {
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
                is5GHzL: {
                  model_type: 'RadioBasedSsidConfiguration',
                  enable80211r: null,
                  enable80211k: null,
                  enable80211v: null,
                },
              },
              bonjourGatewayProfileId: null,
              enable80211w: null,
              wepConfig: null,
              forwardMode: null,
              profileType: 'ssid',
            },
            __typename: 'Profile',
          },
        ],
        __typename: 'Profile',
      },
      {
        id: 7,
        name: 'ApProfile-2-radios',
        profileType: 'equipment_ap',
        details: {
          model_type: 'ApNetworkConfiguration',
          networkConfigVersion: 'AP-1',
          equipmentType: 'AP',
          vlanNative: true,
          vlan: 0,
          ntpServer: {
            model_type: 'AutoOrManualString',
            auto: true,
            value: 'pool.ntp.org',
          },
          syslogRelay: null,
          rtlsSettings: null,
          syntheticClientEnabled: true,
          ledControlEnabled: true,
          equipmentDiscovery: false,
          radioMap: {
            is5GHz: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
            is2dot4GHz: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
          },
          profileType: 'equipment_ap',
        },
        childProfiles: [
          {
            id: 4,
            name: 'TipWlan-cloud-2-radios',
            details: {
              model_type: 'SsidConfiguration',
              ssid: 'TipWlan-cloud-2-radios',
              appliedRadios: ['is2dot4GHz', 'is5GHz'],
              ssidAdminState: 'enabled',
              secureMode: 'open',
              vlanId: 1,
              keyStr: null,
              broadcastSsid: 'enabled',
              keyRefresh: 0,
              noLocalSubnets: false,
              radiusServiceName: null,
              captivePortalId: null,
              bandwidthLimitDown: 0,
              bandwidthLimitUp: 0,
              videoTrafficOnly: false,
              radioBasedConfigs: {
                is5GHz: {
                  model_type: 'RadioBasedSsidConfiguration',
                  enable80211r: null,
                  enable80211k: null,
                  enable80211v: null,
                },
                is2dot4GHz: {
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
                is5GHzL: {
                  model_type: 'RadioBasedSsidConfiguration',
                  enable80211r: null,
                  enable80211k: null,
                  enable80211v: null,
                },
              },
              bonjourGatewayProfileId: null,
              enable80211w: null,
              wepConfig: null,
              forwardMode: null,
              profileType: 'ssid',
            },
            __typename: 'Profile',
          },
        ],
        __typename: 'Profile',
      },
      {
        id: 8,
        name: 'EnterpriseApProfile',
        profileType: 'equipment_ap',
        details: {
          model_type: 'ApNetworkConfiguration',
          networkConfigVersion: 'AP-1',
          equipmentType: 'AP',
          vlanNative: true,
          vlan: 0,
          ntpServer: {
            model_type: 'AutoOrManualString',
            auto: true,
            value: 'pool.ntp.org',
          },
          syslogRelay: null,
          rtlsSettings: null,
          syntheticClientEnabled: true,
          ledControlEnabled: true,
          equipmentDiscovery: false,
          radioMap: {
            is5GHz: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
            is2dot4GHz: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
            is5GHzU: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
            is5GHzL: {
              model_type: 'RadioProfileConfiguration',
              bestApEnabled: true,
              bestAPSteerType: 'both',
            },
          },
          profileType: 'equipment_ap',
        },
        childProfiles: [
          {
            id: 2,
            name: 'TipWlan-cloud-Enterprise',
            details: {
              model_type: 'SsidConfiguration',
              ssid: 'Default-SSID-1593463091151',
              appliedRadios: ['is5GHzU', 'is5GHzL', 'is2dot4GHz'],
              ssidAdminState: 'enabled',
              secureMode: 'wpaEAP',
              vlanId: 1,
              keyStr: 'testing123',
              broadcastSsid: 'enabled',
              keyRefresh: 0,
              noLocalSubnets: false,
              radiusServiceName: 'Radius-Profile',
              captivePortalId: null,
              bandwidthLimitDown: 0,
              bandwidthLimitUp: 0,
              videoTrafficOnly: false,
              radioBasedConfigs: {
                is5GHz: {
                  model_type: 'RadioBasedSsidConfiguration',
                  enable80211r: null,
                  enable80211k: null,
                  enable80211v: null,
                },
                is2dot4GHz: {
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
                is5GHzL: {
                  model_type: 'RadioBasedSsidConfiguration',
                  enable80211r: null,
                  enable80211k: null,
                  enable80211v: null,
                },
              },
              bonjourGatewayProfileId: null,
              enable80211w: null,
              wepConfig: null,
              forwardMode: null,
              profileType: 'ssid',
            },
            __typename: 'Profile',
          },
        ],
        __typename: 'Profile',
      },
    ],
  ],
  firmware: {
    id: '1',
    modelId: 'ap2220',
    versionName: 'ap2220-2020-06-25-ce03472',
    description: '',
    filename:
      'https://tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ap2220/ap2220-2020-06-25-ce03472.tar.gz',
    commit: 'ce03472',
    releaseDate: '1593463091769',
    __typename: 'Firmware',
  },

  locations: [
    {
      key: 0,
      title: 'Network',
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
      ],
    },
  ],
  handleRefresh: () => {},
};

describe('<AccessPointDetails />', () => {
  afterEach(() => {
    cleanup();
  });

  it('general tab should show the general form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /general/i }));

    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
  });

  it('status tab should show the status form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
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
        <AccessPointDetails {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /os/i }));

    const paragraph = getByText('Operating System Statistics');
    expect(paragraph).toBeVisible();
  });

  it('handleSubmit should  be called on location tab', async () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));
    const paragraph = getByText('City');
    expect(paragraph).toBeVisible();
  });

  it('handleSubmit should not be called if city is empty in location tab', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} onUpdateEquipment={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Please select your location city.')).toBeVisible();
    });
  });

  it('handleSubmit should  be called on location tab', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} onUpdateEquipment={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));

    fireEvent.change(getByLabelText('City'), { target: { value: 'Menlo Park' } });
    fireEvent.change(getByLabelText('Building'), { target: { value: 'Building 1' } });
    fireEvent.change(getByLabelText('Floor'), { target: { value: 'Floor 1' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('firmware tab should show the firmware form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /firmware/i }));

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });

  it('firmware tab should show the change the target version on user input', async () => {
    const history = createMemoryHistory();
    const { getByRole, getByText, getByLabelText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /firmware/i }));

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByLabelText('Target Version');
    fireEvent.change(targetVersion, mockProps.firmware.id);

    expect(targetVersion.value).toEqual(mockProps.firmware.id);
  });

  it('URL changes to /network/access-points on clicking the back button', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(window.location.pathname).toEqual('/network/access-points');
  });

  it('handleSubmit should not be called if access point name is empty on general tab', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();

    fireEvent.change(getByPlaceholderText('Enter Access Point Name'), {
      target: { value: null },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Enter the Access Point name')).toBeVisible();
    });
  });

  it('handleSubmit should  be called if access point name is entered on general tab', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} onUpdateEquipment={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();

    fireEvent.change(getByPlaceholderText('Enter Access Point Name'), {
      target: { value: 'testName' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('advanced setting tab should load on clicking the dropdown ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));
  });

  it(' handleSubmit should  be called if advanced settings are filled', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} onUpdateEquipment={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('RTS/CTS threshold value must be positive for the is2dot4GHz setting', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is2dot4GHz'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHzU setting', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHzU'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHzL setting', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHzL'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('error if the maximum device exceeds 100 for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is2dot4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the maximum device exceeds 100 for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the maximum device exceeds 100 for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the minimum signal exceeds bounds for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Minimum Signal for is2dot4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -50 dB')).toBeVisible();
    });
  });

  it('error if the minimum signal exceeds bounds for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Minimum Signal for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -50 dB')).toBeVisible();
    });
  });

  it('error if the minimum signal exceeds bounds for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Minimum Signal for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -50 dB')).toBeVisible();
    });
  });

  it('error if the maximum number of neighbours exceeds 512 for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum APs for is2dot4GHz'), {
      target: { value: 513 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 512 APs')).toBeVisible();
    });
  });

  it('error if the maximum number of neighbours exceeds 512 for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum APs for is5GHzL'), {
      target: { value: 513 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 512 APs')).toBeVisible();
    });
  });

  it('error if the maximum number of neighbours exceeds 512 for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum APs for is5GHzU'), {
      target: { value: 513 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 512 APs')).toBeVisible();
    });
  });

  it('error if the noise floorl exceeds bounds for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor (db) for is2dot4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the noise floor exceeds bounds for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor (db) for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the noise floor exceeds bounds for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor (db) for is5GHzL'), {
      target: { value: 650 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the noise floor time exceeds bounds for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time (secs) for is2dot4GHz'), {
      target: { value: 650 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the noise floor time exceeds bounds for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time (secs) for is5GHzU'), {
      target: { value: 119 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the noise floor time exceeds bounds for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time (secs) for is5GHzL'), {
      target: { value: 601 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the steering threshold exceeds bounds for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR (% Drop) for is2dot4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the steering threshold exceeds bounds for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR (% Drop) for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the steering threshold exceeds bounds for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR (% Drop) for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the minimum load percentage exceeds bounds for the is2dot4GHz setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is2dot4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the minimum load percentage exceeds bounds for the is5GHzU setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the minimum load percentage exceeds bounds for the is5GHzL setting ', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
});
