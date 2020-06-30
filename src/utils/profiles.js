import { notification } from 'antd';
import { RADIOS, ROAMING } from '../containers/ProfileDetails/constants/index';

const isBool = value => value === 'true';

export const formatSsidProfileForm = values => {
  const formattedData = {
    radioBasedConfigs: {},
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

export const formatRadiusForm = values => {
  const formattedData = { ...values, serviceRegionMap: {} };

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
