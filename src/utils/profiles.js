import { notification } from 'antd';
import _ from 'lodash';
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
  const formattedData = _.cloneDeep({ ...values, serviceRegionMap: {} });
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
      formattedData.subnetConfiguration[j.subnetName] = _.cloneDeep(j);
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

  if (!values?.externalCaptivePortalURL) {
    formattedData.externalCaptivePortalURL = null;
  }

  return formattedData;
};

export const formatRfProfileForm = values => {
  const formattedData = { ...values };
  const currentRadios = Object.keys(formattedData.rfConfigMap);

  currentRadios.forEach(radio => {
    formattedData.rfConfigMap[radio].radioType = radio;
    formattedData.rfConfigMap[radio].rf = values.name;
    formattedData.rfConfigMap[radio].activeScanSettings.enabled = isBool(
      values.rfConfigMap[radio].activeScanSettings.enabled
    );
    formattedData.rfConfigMap[radio].bestApSettings.mlComputed = isBool(
      values.rfConfigMap[radio].bestApSettings.mlComputed
    );
  });

  return formattedData;
};

export const formatPasspointForm = (values, details) => {
  const formattedData = { ...values };

  const getFileType = type => {
    if (type.startsWith('image/')) {
      return type === 'image/png' ? 'PNG' : 'JPG';
    }
    return type;
  };

  if (
    !values.termsAndConditionsFile ||
    (values.termsAndConditionsFile &&
      values.termsAndConditionsFile.fileList &&
      values.termsAndConditionsFile.fileList.length === 0)
  ) {
    // Deleted File
    formattedData.termsAndConditionsFile = null;
  } else if (values.termsAndConditionsFile && values.termsAndConditionsFile.file) {
    // New File
    formattedData.termsAndConditionsFile = {
      apExportUrl: values.termsAndConditionsFile.file.name,
      fileType: getFileType(values.termsAndConditionsFile.file.type),
      fileCategory: 'ExternalPolicyConfiguration',
    };
  } else if (values.termsAndConditionsFile) {
    // Same File
    formattedData.termsAndConditionsFile = details.termsAndConditionsFile;
  }

  formattedData.passpointVenueProfileId = parseInt(values.passpointVenueProfileId, 10);
  formattedData.passpointOperatorProfileId = parseInt(values.passpointOperatorProfileId, 10);
  formattedData.passpointOsuProviderProfileIds = values.passpointOsuProviderProfileIds.map(i =>
    parseInt(i, 10)
  );
  formattedData.anqpDomainId = parseInt(values.anqpDomainId, 10);
  formattedData.enableInterworkingAndHs20 = isBool(values.enableInterworkingAndHs20);
  formattedData.emergencyServicesReachable = isBool(values.emergencyServicesReachable);
  formattedData.unauthenticatedEmergencyServiceAccessible = isBool(
    values.unauthenticatedEmergencyServiceAccessible
  );
  formattedData.internetConnectivity = isBool(values.internetConnectivity);
  formattedData.disableDownstreamGroupAddressedForwarding = isBool(
    values.disableDownstreamGroupAddressedForwarding
  );
  return formattedData;
};

export const formatProviderProfileForm = values => {
  const formattedData = { ...values };
  formattedData.roamingOi = values.roamingOi.replace(/\s/g, '').split(',');

  if (!formattedData.osuServerUri) {
    formattedData.osuServerUri = '';
    formattedData.osuFriendlyName = [];
    formattedData.osuServiceDescription = [];
    formattedData.osuIconList = [];
  }

  if (typeof formattedData.eapMap !== 'undefined') {
    Object.keys(formattedData.eapMap).forEach(i => {
      if (formattedData?.eapMap[i].length === 0) {
        // eslint-disable-next-line no-param-reassign
        delete formattedData?.eapMap[i];
      }
    });
    formattedData.naiRealmList = [
      {
        eapMap: formattedData.eapMap || {},
        encoding: formattedData.encoding || 0,
      },
    ];
  }

  return formattedData;
};
