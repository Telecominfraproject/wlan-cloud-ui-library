import { notification } from 'antd';
import { RADIOS, ROAMING } from '../containers/ProfileDetails/constants/index';

const isBool = value => value === 'true';

export const formatSsidProfileForm = values => {
  const formattedData = {
    radioBasedConfigs: {},
    childProfileIds: [],
  };

  if (values.wepKey) {
    const wepKeyType = values.wepKey.length === 26 ? 'wep128' : 'wep64';
    const wepConfig = {
      _type: 'WepConfiguration',
      primaryTxKeyId: values.wepDefaultKeyId || 1,
      wepAuthType: 'open',
      wepKeys: [
        {
          _type: 'WepKey',
          txKey: values.wepKey,
          txKeyType: wepKeyType,
        },
        {
          _type: 'WepKey',
          txKey: values.wepKey,
          txKeyType: wepKeyType,
        },
        {
          _type: 'WepKey',
          txKey: values.wepKey,
          txKeyType: wepKeyType,
        },
        {
          _type: 'WepKey',
          txKey: values.wepKey,
          txKeyType: wepKeyType,
        },
      ],
    };
    formattedData.wepConfig = wepConfig;
  }
  formattedData.noLocalSubnets = isBool(values.noLocalSubnets);

  RADIOS.forEach(i => {
    formattedData.radioBasedConfigs[i] = {};
    ROAMING.forEach(j => {
      formattedData.radioBasedConfigs[i][j] =
        values[`${j}${i}`] === 'auto' ? null : isBool(values[`${j}${i}`]);
    });
  });

  if (values.captivePortal === 'usePortal') {
    formattedData.childProfileIds.push(parseInt(values.captivePortalId, 10));
  } else {
    formattedData.captivePortalId = null;
  }

  return formattedData;
};

export const formatApProfileForm = values => {
  const formattedData = { ...values };

  formattedData.equipmentDiscovery = isBool(values.equipmentDiscovery);
  formattedData.rtlsSettings.enabled = isBool(values.rtlsSettings.enabled);
  formattedData.syntheticClientEnabled = isBool(values.syntheticClientEnabled);
  formattedData.syslogRelay.enabled = isBool(values.syslogRelay.enabled);

  return formattedData;
};

export const formatBonjourGatewayForm = values => {
  const formattedData = { ...values };

  values.bonjourServices.forEach((i, index) => {
    formattedData.bonjourServices[index].supportAllServices = isBool(i.supportAllServices);
  });

  return formattedData;
};

export const formatRadiusForm = values => {
  const formattedData = { ...values, serviceRegionMap: {} };
  console.log('formateRaduisForm values',values);

  values.zones.forEach(i => {
    if (!(i.name in formattedData.serviceRegionMap)) {
      formattedData.serviceRegionMap[i.name] = {
        regionName: i.name,
        serverMap: {},
      };
    }
    values.services.forEach(j => {
      formattedData.serviceRegionMap[i.name].serverMap[j.name] = j.ips;
    });

    if (!i.subnets || i.subnets.length === 0) {
      notification.error({
        message: 'Error',
        description: 'At least 1 Subnet is required.',
      });

      throw Error('missing RADIUS subnet');
    }

    i.subnets.forEach(j => {
      if (!formattedData.subnetConfiguration) {
        formattedData.subnetConfiguration = {};
      }
      formattedData.subnetConfiguration[j.subnetName] = j;
      if (values.probeInterval) {
        formattedData.subnetConfiguration[j.subnetName].probeInterval = values.probeInterval;
      }
    });
  });

  return formattedData;
};

export const formatCaptiveForm = (values, details) => {
  const formattedData = { ...values };

  const getFileType = type => {
    if (type.startsWith('image/')) {
      return type === 'image/png' ? 'PNG' : 'JPG';
    }
    return type;
  };

  if (
    !values.logoFile ||
    (values.logoFile && values.logoFile.fileList && values.logoFile.fileList.length === 0)
  ) {
    // Deleted File
    formattedData.logoFile = null;
  } else if (values.logoFile && values.logoFile.file) {
    // New File
    formattedData.logoFile = {
      apExportUrl: values.logoFile.file.name,
      fileType: getFileType(values.logoFile.file.type),
      fileCategory: 'CaptivePortalLogo',
    };
  } else if (values.logoFile) {
    // Same File
    formattedData.logoFile = details.logoFile;
  }

  if (
    !values.backgroundFile ||
    (values.backgroundFile &&
      values.backgroundFile.fileList &&
      values.backgroundFile.fileList.length === 0)
  ) {
    formattedData.backgroundFile = null;
  } else if (values.backgroundFile && values.backgroundFile.file) {
    formattedData.backgroundFile = {
      apExportUrl: values.backgroundFile.file.name,
      fileType: getFileType(values.backgroundFile.file.type),
      fileCategory: 'CaptivePortalBackground',
    };
  } else if (values.backgroundFile) {
    formattedData.backgroundFile = details.backgroundFile;
  }

  if (!values?.externalCaptivePortalURL){
    formattedData.externalCaptivePortalURL = null;
  }

  return formattedData;
};

const exampleRadio = {
  model_type: "RfElementConfiguration",
  rf: null,
  radioMode: null, // not in yaml file yet
  autoChannelSelection: false,
  beaconInterval: 0,
  forceScanDuringVoice: 'disabled',
  rtsCtsThreshold: 0,
  channelBandwidth: 'is20MHz',
  mimoMode: 'none',
  maxNumClients: 0,
  multicastRate: 'rate6mbps',
  activeScanSettings: {
    model_type: "ActiveScanSettings",
    enabled: true,
    scanFrequencySeconds: 0,
    scanDurationMillis:0,
  },
  managementRate: 'rate1mbps',
  rxCellSizeDb: {
    model_type: "AutoOrManualValue",
    auto: null,
    value: 0,
  },
  probeResponseThresholdDb: {
    model_type: "AutoOrManualValue",
    auto: null,
    value: 0,
  },
  clientDisconnectThresholdDb: {
    model_type: "AutoOrManualValue",
    auto: null,
    value: 0,
  },
  eirpTxPower: {
    model_type: "AutoOrManualValue",
    auto: null,
    value: 0,
  },
  bestApEnabled: true,
  neighbouringListApConfig: {
    model_type: "NeighbouringAPListConfiguration",
    minSignal: 0,
    maxAps: 0,
  },
  minAutoCellSize: 0,
  perimeterDetectionEnabled: true,
  channelHopSettings: {
    model_type: "ChannelHopSettings",
    noiseFloorThresholdInDB: -75,
    noiseFloorThresholdTimeInSeconds: 180,
    nonWifiThresholdInPercentage: 50,
    nonWifiThresholdTimeInSeconds: 180,
    obssHopMode: 'NON_WIFI',
  },
  bestApSettings: {
    model_type: "RadioBestApSettings",
    mlComputed: true,
    dropInSnrPercentage: 10,
    minLoadFactor: 10,
  },
};

const exampleRfProfileDetails = {
  model_type: "RfConfiguration",
  rfConfigMap: {
    is2dot4GHz: exampleRadio,
    is5GHz: exampleRadio,
    is5GHzU: exampleRadio,
    is5GHzL: exampleRadio,
  },
};

export const formatRfProfileForm = values => {
  const formattedData = exampleRfProfileDetails;
  
  Object.keys(formattedData.rfConfigMap).forEach(radio => {
    Object.keys(formattedData.rfConfigMap[radio]).forEach(field => {
      if (field === 'rf') {
        if ('name' in values) {
          formattedData.rfConfigMap[radio][field] = values.name;
        }
      } else if (field === 'activeScanSettings') {
          if (`enabledactiveScanSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].activeScanSettings.enabled = 
              values[`enabledactiveScanSettings${radio}`];
          }
          if (`scanFrequencySecondsactiveScanSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].activeScanSettings.scanFrequencySeconds =
              values[`scanFrequencySecondsactiveScanSettings${radio}`];
          }
          if (`scanDurationMillisactiveScanSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].activeScanSettings.scanDurationMillis =
              values[`scanDurationMillisactiveScanSettings${radio}`];
          }
      } else if (field === 'rxCellSizeDb') {
          if (`valuerxCellSizeDb${radio}` in values) {
            formattedData.rfConfigMap[radio].rxCellSizeDb.value = values[`valuerxCellSizeDb${radio}`];
          }
      } else if (field === 'probeResponseThresholdDb') {
          if (`valueprobeResponseThresholdDb${radio}` in values) {
            formattedData.rfConfigMap[radio].probeResponseThresholdDb.value =
              values[`valueprobeResponseThresholdDb${radio}`];
          }
      } else if (field === 'clientDisconnectThresholdDb') {
          if (`valueclientDisconnectThresholdDb${radio}` in values) {
            formattedData.rfConfigMap[radio].clientDisconnectThresholdDb.value =
              values[`valueclientDisconnectThresholdDb${radio}`];
          }
      } else if (field === 'eirpTxPower') {
          if (`valueeirpTxPower${radio}` in values) {
            formattedData.rfConfigMap[radio].eirpTxPower.value =
              values[`valueeirpTxPower${radio}`];
          }
      } else if (field === 'neighbouringListApConfig') {
          if (`minSignalneighbouringListApConfig${radio}` in values){
            formattedData.rfConfigMap[radio].neighbouringListApConfig.minSignal =
              values[`minSignalneighbouringListApConfig${radio}`];
          } 
          if (`maxApsneighbouringListApConfig${radio}` in values) {
            formattedData.rfConfigMap[radio].neighbouringListApConfig.maxAps =
              values[`maxApsneighbouringListApConfig${radio}`];
          }
      } else if (field === 'channelHopSettings') {
          if (`noiseFloorThresholdInDBchannelHopSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].channelHopSettings.noiseFloorThresholdInDB =
              values[`noiseFloorThresholdInDBchannelHopSettings${radio}`];
          }
          if (`noiseFloorThresholdTimeInSecondschannelHopSettings${radio}`) {
            formattedData.rfConfigMap[radio].channelHopSettings.noiseFloorThresholdTimeInSeconds =
              values[`noiseFloorThresholdTimeInSecondschannelHopSettings${radio}`];
          }
          if (`nonWifiThresholdInPercentagechannelHopSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].channelHopSettings.nonWifiThresholdInPercentage =
              values[`nonWifiThresholdInPercentagechannelHopSettings${radio}`];
          }
          if (`nonWifiThresholdTimeInSecondschannelHopSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].channelHopSettings.nonWifiThresholdTimeInSeconds =
              values[`nonWifiThresholdTimeInSecondschannelHopSettings${radio}`];
          }
          if (`obssHopModechannelHopSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].channelHopSettings.obssHopMode =
              values[`obssHopModechannelHopSettings${radio}`];
          }
      } else if (field === 'bestApSettings') {
          if (`dropInSnrPercentagebestApSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].bestApSettings.dropInSnrPercentage =
              values[`dropInSnrPercentagebestApSettings${radio}`];
          }
          if (`minLoadFactorbestApSettings${radio}` in values) {
            formattedData.rfConfigMap[radio].bestApSettings.minLoadFactor =
              values[`minLoadFactorbestApSettings${radio}`];
          }
      } else if (`${field}${radio}` in values) {
          formattedData.rfConfigMap[radio][field] = values[`${field}${radio}`];
      }
    });
  });

  return formattedData;
};
