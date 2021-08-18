import {
  RADIOS,
  ROAMING,
  DEFAULT_NTP_SERVER,
  DEFAULT_HESS_ID,
  QOS_CONFIGURATION,
} from '../containers/ProfileDetails/constants/index';

export const formatFile = file => {
  return {
    uid: file.apExportUrl,
    name: file.apExportUrl,
    type: file.fileType,
  };
};

const isBool = value => value === 'true';

const getFileType = type => {
  if (type.startsWith('image/')) {
    return type === 'image/png' ? 'PNG' : 'JPG';
  }
  if (type.startsWith('text/')) {
    return 'TEXT';
  }

  return type;
};

export const formatSsidProfileForm = values => {
  const formattedData = {
    radioBasedConfigs: {},
    childProfileIds: [],
  };

  if (values.vlan === 'defaultVLAN') {
    formattedData.vlanId = 0;
  }
  if (values.vlan === 'customVLAN') {
    formattedData.dynamicVlan = 'disabled';
  }

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
      formattedData.radioBasedConfigs[i][j] = isBool(values[`${j}${i}`]);
    });
  });

  if (values.forwardMode === 'NAT' && values.captivePortal === 'usePortal') {
    formattedData.childProfileIds.push(parseInt(values.captivePortalId, 10));
  } else {
    formattedData.captivePortalId = null;
  }

  if (
    values.secureMode === 'wpaRadius' ||
    values.secureMode === 'wpa2Radius' ||
    values.secureMode === 'wpa2OnlyRadius' ||
    values.secureMode === 'wpa3OnlyEAP' ||
    values.secureMode === 'wpa3MixedEAP' ||
    values.secureMode === 'wpa3OnlyEAP192'
  ) {
    if (!isBool(values.useRadiusProxy)) {
      formattedData.childProfileIds.push(values.radiusServiceId.value);
      formattedData.radiusServiceId = values.radiusServiceId.value;
    } else {
      formattedData.radiusServiceId = null;
    }
    formattedData.useRadiusProxy = isBool(values.useRadiusProxy);
  }

  if (
    !(
      values.secureMode === 'wpaRadius' ||
      values.secureMode === 'wpa2Radius' ||
      values.secureMode === 'wpa2OnlyRadius' ||
      values.secureMode === 'wpa3OnlyEAP' ||
      values.secureMode === 'wpa3MixedEAP' ||
      values.secureMode === 'wpa3OnlyEAP192'
    ) ||
    values.forwardMode === 'NAT'
  ) {
    formattedData.dynamicVlan = 'disabled';
  }

  if (values.passpointConfig !== 'disabled') {
    formattedData.childProfileIds.push(values.passpointProfileId.value);
  }

  return formattedData;
};

export const formatApProfileForm = values => {
  const formattedData = { ...values };

  formattedData.rtlsSettings.enabled = isBool(values.rtlsSettings.enabled);
  formattedData.syntheticClientEnabled = isBool(values.syntheticClientEnabled);
  formattedData.syslogRelay.enabled = isBool(values.syslogRelay.enabled);

  if (formattedData.ntpServer.auto) {
    formattedData.ntpServer.value = DEFAULT_NTP_SERVER;
  }

  if (values.radiusProxyConfigurations?.length) {
    formattedData.radiusProxyConfigurations = [];
    values.radiusProxyConfigurations.forEach((config, index) => {
      const useRadSec = isBool(config.useRadSec);
      const { useAccounting } = config;
      formattedData.radiusProxyConfigurations.push({
        ...config,
        useRadSec,
        name: `ProxyConfiguration${index + 1}`,
        caCert: useRadSec
          ? {
              apExportUrl: config.caCert.file.name,
              fileType: 'PEM',
              fileCategory: 'RadSecAuthentication',
            }
          : null,
        clientCert:
          useRadSec && config.clientCert
            ? {
                apExportUrl: config.clientCert.file.name,
                fileType: 'PEM',
                fileCategory: 'RadSecAuthentication',
              }
            : null,
        clientKey:
          useRadSec && config.clientKey
            ? {
                apExportUrl: config.clientKey.file.name,
                fileType: 'KEY',
                fileCategory: 'RadSecAuthentication',
              }
            : null,
        passphrase: useRadSec ? config.passphrase : null,
        sharedSecret: !useRadSec ? config.sharedSecret : null,
        acctSharedSecret: !useRadSec ? config.acctSharedSecret : null,
        dynamicDiscovery: config.realm.some(i => i === '*') ? config.dynamicDiscovery : false,
        ...(!useAccounting && { acctPort: null, acctServer: null, acctSharedSecret: null }),
      });
    });
  }

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
  const formattedData = { ...values };

  formattedData.primaryRadiusAuthServer = { ...values.authenticationServer[0] };

  formattedData.secondaryRadiusAuthServer = values.authenticationServer?.[1]
    ? { ...values.authenticationServer?.[1] }
    : null;

  formattedData.primaryRadiusAccountingServer = values.accountingServer?.[0]
    ? { ...values.accountingServer?.[0] }
    : null;

  formattedData.secondaryRadiusAccountingServer = values.accountingServer?.[1]
    ? { ...values.accountingServer?.[1] }
    : null;

  return formattedData;
};

export const formatCaptiveForm = (values, details) => {
  const formattedData = { ...values };

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

  if (values.authenticationType === 'radius') {
    formattedData.radiusServiceId = parseInt(values.radiusServiceId.value, 10);
    formattedData.childProfileIds.push(parseInt(values.radiusServiceId.value, 10));
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

  if (typeof values?.passpointVenueProfileId === 'object') {
    formattedData.passpointVenueProfileId = values?.passpointVenueProfileId?.value;
    formattedData.childProfileIds.push(formattedData.passpointVenueProfileId);
  } else {
    formattedData.childProfileIds.push(values.passpointVenueProfileId);
  }

  if (typeof values?.passpointOperatorProfileId === 'object') {
    formattedData.passpointOperatorProfileId = values?.passpointOperatorProfileId?.value;
    formattedData.childProfileIds.push(formattedData.passpointOperatorProfileId);
  } else {
    formattedData.childProfileIds.push(values.passpointOperatorProfileId);
  }

  if (typeof values?.passpointOsuProviderProfileIds === 'object') {
    formattedData.passpointOsuProviderProfileIds = values?.passpointOsuProviderProfileIds?.map(
      i => i.value
    );
    formattedData.passpointOsuProviderProfileIds.forEach(i =>
      formattedData?.childProfileIds?.push(i)
    );
  } else {
    formattedData.childProfileIds.push(values?.passpointOsuProviderProfileIds);
  }

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

  if (!values.hessid.addressAsString) {
    formattedData.hessid.addressAsString = DEFAULT_HESS_ID;
  }

  formattedData.additionalStepsRequiredForAccess = isBool(values.additionalStepsRequiredForAccess)
    ? 1
    : 0;

  formattedData.qosMapSetConfiguration = isBool(formattedData.qosMapSetConfiguration)
    ? QOS_CONFIGURATION
    : null;

  if (!isBool(values.useOperatingClass)) {
    formattedData.operatingClass = 0;
  }

  return formattedData;
};

export const formatProviderProfileForm = values => {
  const formattedData = { ...values };

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
        naiRealms: formattedData.naiRealms,
        eapMap: formattedData.eapMap || {},
        encoding: formattedData.encoding || 0,
        eapMethods: Object.keys(formattedData.eapMap),
      },
    ];
  }

  formattedData.osuNaiShared = values.osuNaiShared ?? '';
  formattedData.osuNaiStandalone = values.osuNaiStandalone ?? '';

  return formattedData;
};

export const profileTypes = {
  ssid: 'SSID',
  equipment_ap: 'Access Point',
  bonjour: 'Bonjour Gateway',
  captive_portal: 'Captive Portal',
  radius: 'Radius',
  rf: 'RF',
  passpoint: 'Passpoint',
  passpoint_osu_id_provider: 'Passpoint ID Provider',
  passpoint_operator: 'Passpoint Operator',
  passpoint_venue: 'Passpoint Venue',
};
