export const RADIOS = ['is2dot4GHz', 'is5GHz', 'is5GHzU', 'is5GHzL'];
export const ROAMING = ['enable80211r', 'enable80211k', 'enable80211v'];
export const DEFAULT_NTP_SERVER = 'pool.ntp.org';
export const DEFAULT_HESS_ID = '00:00:00:00:00:00';
export const EAP_METHODS = {
  'EAP-TLS with certificate': ' eap_tls',
  'EAP-TTLS with username/password': 'eap_ttls',
  'EAP-AKA Authentication': 'eap_aka_authentication',
  'EAP-MSCHAP-V2 with username/password': 'eap_mschap_v2',
  'EAP-AKA': 'eap_aka',
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
