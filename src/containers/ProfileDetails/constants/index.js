export const RADIOS = ['is2dot4GHz', 'is5GHz', 'is5GHzL', 'is5GHzU'];
export const ROAMING = ['enable80211r', 'enable80211k', 'enable80211v'];
export const DEFAULT_NTP_SERVER = 'pool.ntp.org';
export const DEFAULT_HESS_ID = '00:00:00:00:00:00';
export const QOS_CONFIGURATION = [
  '53',
  '2',
  '22',
  '6',
  '8',
  '15',
  '0',
  '7',
  '255',
  '255',
  '16',
  '31',
  '32',
  '39',
  '255',
  '255',
  '40',
  '47',
  '255',
  '255',
];

export const ALLOWED_CHANNEL_BANDWIDTH = {
  auto: ['is20MHz', 'is40MHz', 'is80MHz', 'is160MHz'],
  modeN: ['is20MHz', 'is40MHz'],
  modeA: ['is20MHz'],
  modeAC: ['is20MHz', 'is40MHz', 'is80MHz', 'is160MHz'],
  modeAX: ['is20MHz', 'is40MHz', 'is80MHz', 'is160MHz'],
};

export const IP_REGEX = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

export const DOMAIN_REGEX = /@$|^(\*)$|^(\*\.)|^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]{1,253}$/;

export const PROFILES = {
  ssid: 'ssid',
  captivePortal: 'captive_portal',
  radius: 'radius',
  rf: 'rf',
  venue: 'passpoint_venue',
  operator: 'passpoint_operator',
  providerID: 'passpoint_osu_id_provider',
  accessPoint: 'equipment_ap',
  bonjour: 'bonjour',
  passpoint: 'passpoint',
};
