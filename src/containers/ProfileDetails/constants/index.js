export const RADIOS = ['is2dot4GHz', 'is5GHz', 'is5GHzU', 'is5GHzL'];
export const ROAMING = ['enable80211r', 'enable80211k', 'enable80211v'];
export const RFELEMENT_CONFIG_PROPERTIES = [
    'model_type', 
    'radioType',
    'rf', 
    'radioMode', 
    'autoChannelSelection',
    'beaconInterval',
    'forceScanDuringVoice',
    'rtsCtsThreshold',
    'channelBandwidth',
    'mimoMode',
    'maxNumClients',
    'multicastRate',
    'activeScanSettings', 
    'managementRate',
    'rxCellSizeDb',
    'probeResponseThresholdDb',
    'clientDisconnectThresholdDb',
    'eirpTxPower',
    'neighbouringListApConfig',
    'channelHopSettings', 
    'bestApSettings'
];
export const ACTIVE_SCAN_PROPERTIES = ['model_type', 'enabled', 'scanFrequencySeconds', 'scanDurationMillis'];
export const NEIGHBOURING_LIST_PROPERTIES =['model_type', 'minSignal', 'maxAps'];
export const CHANNEL_HOP_PROPERTIES = [
    'model_type', 
    'noiseFloorThresholdInDB',
    'noiseFloorThresholdTimeInSeconds',
    'nonWifiThresholdInPercentage',
    'nonWifiThresholdTimeInSeconds',
    'obssHopMode',
];
export const BEST_AP_POPERTIES = ['model_type', 'mlComputed', 'dropInSnrPercentage', 'minLoadFactor'];