const credType = [
  {
    value: 'SIM',
    label: 'SIM',
  },
  {
    value: 'USIM',
    label: 'USIM',
  },
  {
    value: 'NFC Secure Element',
    label: 'NFC Secure Element',
  },
  {
    value: 'Hardware Token',
    label: 'Hardware Token',
  },
  {
    value: 'Softoken',
    label: 'Softoken',
  },
  {
    value: 'Certificate',
    label: 'Certificate',
  },
  {
    value: 'username/password',
    label: 'username/password',
  },
  {
    value: 'none (server-side authentication only)',
    label: 'none (server-side authentication only)',
  },
  {
    value: 'Anonymous',
    label: 'Anonymous',
  },
  {
    value: 'Vendor Specific',
    label: 'Vendor Specific',
  },
];

const nonEapCredType = [
  {
    value: 'PAP',
    label: 'PAP',
  },
  {
    value: 'CHAP',
    label: 'CHAP',
  },
  {
    value: 'MSCHAP',
    label: 'MSCHAP',
  },
  {
    value: 'MSCHAPV2',
    label: 'MSCHAPV2',
  },
];

export const authOptions = [
  {
    value: 'Expanded EAP Method',
    label: 'Expanded EAP Method',
    children: credType,
  },
  {
    value: 'Non-EAP Inner Authentication Type',
    label: 'Non-EAP Inner Authentication Type',
    children: nonEapCredType,
  },
  {
    value: 'Inner Authentication EAP Method Type',
    label: 'Inner Authentication EAP Method Type',
    children: credType,
  },
  {
    value: 'Expanded Inner EAP Method',
    label: 'Expanded Inner EAP Method',
    children: credType,
  },
  {
    value: 'Credential Type',
    label: 'Credential Type',
    children: credType,
  },
  {
    value: 'Tunneled EAP Method Credential Type',
    label: 'Tunneled EAP Method Credential Type',
    children: credType,
  },
  {
    value: 'Nai Realm EAP Auth Vendor Specific',
    label: 'Nai Realm EAP Auth Vendor Specific',
    children: credType,
  },
];

export const akaMethodLabels = {
  eap_aka_authentication: 'EAP-AKA Prime Authentication',
  eap_aka: 'EAP-AKA',
};
