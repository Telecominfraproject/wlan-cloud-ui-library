import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Radio, Checkbox, Empty, Select as AntdSelect } from 'antd';
import { Input, Password, Select, RadioGroup, CheckboxGroup } from 'components/WithRoles';
import Tooltip from 'components/Tooltip';
import ThemeContext from 'contexts/ThemeContext';

import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';
import { DEFAULT_SSID_PROFILE } from '../constants';
import { RADIOS, ROAMING, PROFILES, IP_REGEX } from '../../constants/index';

const { Item } = Form;

const { Option } = AntdSelect;

const radioOptions = (
  <RadioGroup>
    <Radio value="true">Enabled</Radio>
    <Radio value="false">Disabled</Radio>
  </RadioGroup>
);

const SSIDForm = ({
  form,
  details,
  captiveProfiles,
  childProfiles,
  radiusProfiles,
  onSearchProfile,
  onFetchMoreProfiles,
  loadingCaptiveProfiles,
  loadingRadiusProfiles,
}) => {
  const { radioTypes } = useContext(ThemeContext);
  const [mode, setMode] = useState(details.secureMode || DEFAULT_SSID_PROFILE.secureMode);
  const [modeChanged, setModeChanged] = useState(false);

  const hexadecimalRegex = e => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const radioBasedValues = {};

    RADIOS.forEach(i => {
      ROAMING.forEach(j => {
        radioBasedValues[`${j}${i}`] =
          details?.radioBasedConfigs?.[i]?.[j]?.toString() ??
          DEFAULT_SSID_PROFILE.radioBasedConfigs[i][j].toString();
      });
    });

    const radiusProfile = childProfiles.find(profile => profile?.profileType === PROFILES.radius);

    form.setFieldsValue({
      ssid: details?.ssid || '',
      bandwidthLimitDown: details?.bandwidthLimitDown || DEFAULT_SSID_PROFILE.bandwidthLimitDown,
      bandwidthLimitUp: details?.bandwidthLimitUp || DEFAULT_SSID_PROFILE.bandwidthLimitUp,
      broadcastSsid: details?.broadcastSsid || DEFAULT_SSID_PROFILE.broadcastSsid,
      appliedRadios: details?.appliedRadios || DEFAULT_SSID_PROFILE.appliedRadios,
      forwardMode: details?.forwardMode || DEFAULT_SSID_PROFILE.forwardMode,
      noLocalSubnets: details?.noLocalSubnets ? 'true' : 'false',
      captivePortal: details?.captivePortalId ? 'usePortal' : 'notPortal',
      captivePortalId: details.captivePortalId && details.captivePortalId.toString(),
      secureMode: details.secureMode || DEFAULT_SSID_PROFILE.secureMode,
      vlan: details?.vlanId > 0 ? 'customVLAN' : 'defaultVLAN',
      keyStr: details.keyStr || DEFAULT_SSID_PROFILE.keyStr,
      wepKey: details?.wepConfig?.wepKeys?.[0]?.txKey || '',
      wepDefaultKeyId: details?.wepConfig?.primaryTxKeyId || 1,
      vlanId: details.vlanId || DEFAULT_SSID_PROFILE.vlanId,
      radiusServiceId: {
        value: radiusProfile?.id || null,
        label: radiusProfile?.name || null,
      },
      ...radioBasedValues,
      childProfileIds: [],
      radiusAcountingServiceInterval:
        details?.radiusAcountingServiceInterval ||
        DEFAULT_SSID_PROFILE.radiusAcountingServiceInterval,
      dynamicVlan: details?.dynamicVlan || DEFAULT_SSID_PROFILE.dynamicVlan,
      radiusClientConfiguration: {
        nasClientId:
          details?.radiusClientConfiguration?.nasClientId ??
          DEFAULT_SSID_PROFILE.radiusClientConfiguration.nasClientId,
        nasClientIp:
          details?.radiusClientConfiguration?.nasClientIp ??
          DEFAULT_SSID_PROFILE.radiusClientConfiguration.nasClientIp,
        userDefinedNasId:
          details?.radiusClientConfiguration?.userDefinedNasId ??
          DEFAULT_SSID_PROFILE.radiusClientConfiguration.userDefinedNasId,
        userDefinedNasIp:
          details?.radiusClientConfiguration?.userDefinedNasIp ??
          DEFAULT_SSID_PROFILE.radiusClientConfiguration.userDefinedNasIp,
      },
      useRadiusProxy:
        details?.useRadiusProxy?.toString() ?? DEFAULT_SSID_PROFILE.useRadiusProxy.toString(),
      enableProxyArpForHotspot:
        details?.enableProxyArpForHotspot?.toString() ??
        DEFAULT_SSID_PROFILE.enableProxyArpForHotspot.toString(),
    });
  }, [form, details]);

  const handleOnModeChanged = () => {
    if (!modeChanged) {
      setModeChanged(true);
    }
  };

  useEffect(() => {
    if (modeChanged) {
      const radioBasedValues = {};
      RADIOS.forEach(i => {
        radioBasedValues[`enable80211r${i}`] =
          mode === 'wpa3OnlyEAP' ||
          mode === 'wpa3OnlyEAP192' ||
          mode === 'wpa3MixedEAP' ||
          mode === 'wpa2OnlyRadius' ||
          mode === 'wpa2Radius' ||
          mode === 'wpaRadius'
            ? 'true'
            : 'false';
      });
      form.setFieldsValue({ ...radioBasedValues });
    }
  }, [mode, modeChanged]);

  return (
    <div className={styles.ProfilePage}>
      <Card title="SSID">
        <Item
          label="SSID Name"
          name="ssid"
          rules={[
            {
              required: true,
              message: 'Please input your new SSID name',
            },
            {
              pattern: /^[^!#;/+\]?$[\\"/\t\s][^+\]?$[\\"/\t]{0,30}[^ +\]?$[\\"/\t]$|^[^ !#;+\]"\t]$[\t]+$/,
              message: (
                <div>
                  An SSID name can be any alphanumeric, case-sensitive entry from 2 to 32 characters
                  with the following exceptions:
                  <ul>
                    <li>The first character cannot be: !, #, or ;</li>
                    <li>?, &quot;, $, /, [, \, ], and + are invalid characters</li>
                    <li>Trailing and leading spaces are not permitted</li>
                  </ul>
                </div>
              ),
            },
          ]}
        >
          <Input className={globalStyles.field} placeholder="Enter SSID name" />
        </Item>

        <Item
          label="Broadcast SSID"
          name="broadcastSsid"
          rules={[
            {
              required: true,
              message: 'Please select your SSID visibility setting',
            },
          ]}
        >
          <RadioGroup>
            <Radio value="enabled">Show SSID</Radio>
            <Radio value="disabled">Hide SSID</Radio>
          </RadioGroup>
        </Item>

        <Item label="Client Rate Limit">
          <div className={styles.InlineDiv}>
            <Item
              name="bandwidthLimitDown"
              rules={[
                {
                  required: true,
                  message: 'Downstream bandwidth limit can be a number between 0 and 100',
                },
                () => ({
                  validator(_rule, value) {
                    if (!value || (value <= 100 && value >= 0)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Downstream bandwidth limit can be a number between 0 and 100')
                    );
                  },
                }),
              ]}
            >
              <Input
                className={globalStyles.field}
                placeholder="0-100"
                type="number"
                min={0}
                max={100}
                addonAfter={
                  <Tooltip
                    title="Down Mbps: Limit is 0 - 100 (0 means unlimited)"
                    text="Down Mbps"
                  />
                }
              />
            </Item>

            <Item
              name="bandwidthLimitUp"
              rules={[
                {
                  required: true,
                  message: 'Upstream bandwidth limit can be a number between 0 and 100',
                },
                () => ({
                  validator(_rule, value) {
                    if (!value || (value <= 100 && value >= 0)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Upstream bandwidth limit can be a number between 0 and 100')
                    );
                  },
                }),
              ]}
            >
              <Input
                className={globalStyles.field}
                placeholder="0-100"
                type="number"
                min={0}
                max={100}
                addonAfter={
                  <Tooltip title="Up Mbps: Limit is 0 - 100 (0 means unlimited)" text="Up Mbps" />
                }
              />
            </Item>
          </div>
        </Item>

        <Item name="appliedRadios" label="Use On">
          <CheckboxGroup>
            {Object.keys(radioTypes || {})?.map(i => (
              <Checkbox key={i} value={i}>
                {radioTypes?.[i]}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Item>
      </Card>
      <Card title="Network Connectivity">
        <Item
          name="forwardMode"
          label={
            <span>
              <Tooltip
                title={
                  <div>
                    <div>
                      Bridge:
                      <br />
                      Devices are on the existing network(as specified by VLAN).
                    </div>
                    <br />
                    <div>
                      NAT:
                      <br />
                      Devices are on an isolated network within the SSID in NAT mode.
                    </div>
                  </div>
                }
              />
              Mode
            </span>
          }
        >
          <RadioGroup>
            <Radio value="BRIDGE" defaultSelected>
              Bridge
            </Radio>
            <Radio
              value="NAT"
              onChange={() => {
                form.setFieldsValue({ vlan: 'defaultVLAN' });
              }}
            >
              NAT
            </Radio>
          </RadioGroup>
        </Item>

        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.forwardMode !== currentValues.forwardMode
          }
        >
          {({ getFieldValue }) => {
            return (
              <>
                <Item
                  name="noLocalSubnets"
                  label={
                    <span>
                      <Tooltip
                        title="When a wireless network is configured with 'No Local Access', users will have internet access only. Any traffic to internal resources (other than DHCP and DNS) will be denied."
                        text="Local Access"
                      />
                    </span>
                  }
                >
                  {getFieldValue('forwardMode') === 'BRIDGE' ? (
                    <RadioGroup>
                      <Radio value="false">Allow Local Access</Radio>
                      <Radio value="true">No Local Access</Radio>
                    </RadioGroup>
                  ) : (
                    <span className={styles.Disclaimer}>Not Applicable</span>
                  )}
                </Item>

                <Item label="Captive Portal" name="captivePortal">
                  {getFieldValue('forwardMode') === 'NAT' ? (
                    <RadioGroup>
                      <Radio value="notPortal">Do Not Use</Radio>
                      <Radio value="usePortal">Use</Radio>
                    </RadioGroup>
                  ) : (
                    <span className={styles.Disclaimer}>Requires NAT Mode</span>
                  )}
                </Item>
              </>
            );
          }}
        </Item>

        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.forwardMode !== currentValues.forwardMode ||
            prevValues.captivePortal !== currentValues.captivePortal
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue('forwardMode') === 'NAT' &&
              getFieldValue('captivePortal') === 'usePortal' ? (
              <Item wrapperCol={{ offset: 5, span: 15 }} name="captivePortalId">
                <Select
                  className={globalStyles.field}
                  placeholder="Select Captive Portal"
                  onPopupScroll={e => onFetchMoreProfiles(e, PROFILES.captivePortal)}
                  showSearch={onSearchProfile}
                  filterOption={false}
                  onSearch={name => onSearchProfile(PROFILES.captivePortal, name)}
                  onSelect={() => onSearchProfile && onSearchProfile(PROFILES.captivePortal)}
                  loading={loadingCaptiveProfiles}
                  notFoundContent={!loadingCaptiveProfiles && <Empty />}
                >
                  {captiveProfiles.map(profile => (
                    <Option key={profile.id} value={profile.id}>
                      {profile.name}
                    </Option>
                  ))}
                </Select>
              </Item>
            ) : null;
          }}
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.forwardMode !== currentValues.forwardMode
          }
        >
          {({ getFieldValue }) => {
            return (
              <Item label="VLAN" name="vlan">
                {getFieldValue('forwardMode') === 'BRIDGE' ? (
                  <RadioGroup>
                    <Radio value="customVLAN">Use Custom VLAN</Radio>
                    <Radio value="defaultVLAN">Use Default VLAN</Radio>
                  </RadioGroup>
                ) : (
                  <span className={styles.Disclaimer}>Not Applicable</span>
                )}
              </Item>
            );
          }}
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.vlan !== currentValues.vlan ||
            prevValues.forwardMode !== currentValues.forwardMode
          }
        >
          {({ getFieldValue }) => {
            return (
              getFieldValue('forwardMode') === 'BRIDGE' &&
              getFieldValue('vlan') === 'customVLAN' && (
                <Item
                  wrapperCol={{ offset: 5, span: 15 }}
                  name="vlanId"
                  rules={[
                    {
                      required: getFieldValue('vlan'),
                      message: 'VLAN expected between 1 and 4095',
                    },
                    () => ({
                      validator(_rule, value) {
                        if (
                          !value ||
                          (getFieldValue('vlanId') <= 4095 && getFieldValue('vlanId') > 0)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('VLAN expected between 1 and 4095'));
                      },
                    }),
                  ]}
                  style={{ marginTop: '10px' }}
                  hasFeedback
                >
                  <Input
                    className={globalStyles.field}
                    placeholder="1-4095"
                    type="number"
                    min={1}
                    max={4095}
                    maxLength={4}
                  />
                </Item>
              )
            );
          }}
        </Item>

        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.forwardMode !== currentValues.forwardMode ||
            prevValues.vlan !== currentValues.vlan
          }
        >
          {({ getFieldValue }) => {
            return (
              <Item name="dynamicVlan" label="Dynamic VLAN">
                {getFieldValue('forwardMode') === 'BRIDGE' &&
                getFieldValue('vlan') === 'defaultVLAN' &&
                (mode === 'wpa3OnlyEAP' ||
                  mode === 'wpa3OnlyEAP192' ||
                  mode === 'wpa3MixedEAP' ||
                  mode === 'wpa2OnlyRadius' ||
                  mode === 'wpa2Radius' ||
                  mode === 'wpaRadius') ? (
                  <Select className={globalStyles.field} placeholder="Select Dynamic VLAN">
                    <Option value="disabled">Disabled</Option>
                    <Option value="enabled">Enabled</Option>
                    <Option value="enabled_reject_if_no_radius_dynamic_vlan">
                      <Tooltip
                        title="RADIUS Authentication is rejected if Dynamic VLAN is not given by the RADIUS"
                        text="Qualified Enabled"
                      />
                    </Option>
                  </Select>
                ) : (
                  <span className={styles.Disclaimer}>Disabled</span>
                )}
              </Item>
            );
          }}
        </Item>
        <Item name="enableProxyArpForHotspot" label="Proxy-ARP" hidden>
          {radioOptions}
        </Item>
      </Card>

      <Card title="Security and Encryption">
        <Item
          label="Mode"
          name="secureMode"
          rules={[
            {
              required: true,
              message: 'Please select your security and encryption mode',
            },
          ]}
        >
          <Select
            data-testid="securityMode"
            className={globalStyles.field}
            onChange={value => {
              setMode(value);
              handleOnModeChanged();
            }}
            placeholder="Select Security and Encryption Mode"
          >
            <Option value="wpa3OnlyEAP">WPA3 Enterprise</Option>
            <Option value="wpa3OnlyEAP192">WPA3-Enterprise 192-Bit (SHA384-SuiteB)</Option>
            <Option value="wpa3MixedEAP">WPA3 Enterprise (mixed mode)</Option>
            <Option value="wpa3OnlySAE">WPA3 Personal</Option>
            <Option value="wpa3MixedSAE">WPA3 Personal (mixed mode)</Option>
            <Option value="wpa2OnlyRadius">WPA2 Enterprise</Option>
            <Option value="wpa2Radius">WPA & WPA2 Enterprise (mixed mode)</Option>
            <Option value="wpa2OnlyPSK">WPA2 Personal</Option>
            <Option value="wpa2PSK">WPA & WPA2 Personal (mixed mode)</Option>
            <Option value="wpaRadius">WPA Enterprise</Option>
            <Option value="wpaPSK">WPA Personal</Option>
            <Option value="wep">WEP</Option>
            <Option value="open">Open (No Encryption)</Option>
          </Select>
        </Item>

        {mode === 'wep' && (
          <Item wrapperCol={{ offset: 5, span: 15 }}>
            <span className={styles.Disclaimer}>
              When using WEP, high performance features like 11n and 11ac will not work with this
              SSID.
            </span>
          </Item>
        )}

        {(mode === 'wpaPSK' ||
          mode === 'wpa2PSK' ||
          mode === 'wpa2OnlyPSK' ||
          mode === 'wpa3OnlySAE' ||
          mode === 'wpa3MixedSAE') && (
          <Item
            label="Security Key"
            name="keyStr"
            rules={[
              {
                required: true,
                message: 'Security key must be at least 8 characters long',
                min: 8,
                max: 63,
              },
            ]}
            hasFeedback
          >
            <Password
              visibilityToggle
              className={globalStyles.field}
              placeholder="8-63 characters"
              maxLength={63}
            />
          </Item>
        )}

        {mode === 'wep' && (
          <>
            <Item
              label="WEP Key"
              name="wepKey"
              rules={[
                {
                  required: true,
                  message:
                    'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key',
                },
                () => ({
                  validator(_rule, value) {
                    if (!value || value.length === 10 || value.length === 26) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key'
                      )
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                className={globalStyles.field}
                placeholder="Enter WEP key"
                onKeyPress={e => hexadecimalRegex(e)}
                maxLength={26}
              />
            </Item>
            <Item
              label="Default Key ID "
              name="wepDefaultKeyId"
              rules={[
                {
                  required: true,
                  message: 'Please select your default key ID',
                },
              ]}
            >
              <Select className={globalStyles.field} placeholder="Select vlan key ID">
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
              </Select>
            </Item>
          </>
        )}
      </Card>
      {(mode === 'wpaRadius' ||
        mode === 'wpa2Radius' ||
        mode === 'wpa2OnlyRadius' ||
        mode === 'wpa3OnlyEAP' ||
        mode === 'wpa3MixedEAP' ||
        mode === 'wpa3OnlyEAP192') && (
        <Card title="RADIUS">
          <Item
            label="RADIUS Proxy"
            name="useRadiusProxy"
            rules={[
              {
                required: true,
                message: 'Please select your RADIUS proxy setting',
              },
            ]}
          >
            <RadioGroup>
              <Radio value="true">Enabled</Radio>
              <Radio value="false">Disabled</Radio>
            </RadioGroup>
          </Item>
          <Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.useRadiusProxy !== currentValues.useRadiusProxy
            }
            noStyle
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue('useRadiusProxy') === 'false' && (
                  <Item
                    name="radiusServiceId"
                    label="RADIUS Profile"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a RADIUS profile',
                      },
                    ]}
                  >
                    <Select
                      className={globalStyles.field}
                      placeholder="Select RADIUS Profile"
                      onPopupScroll={e => onFetchMoreProfiles(e, PROFILES.radius)}
                      showSearch={onSearchProfile}
                      filterOption={false}
                      onSearch={name => onSearchProfile(PROFILES.radius, name)}
                      onSelect={() => onSearchProfile && onSearchProfile(PROFILES.radius)}
                      loading={loadingRadiusProfiles}
                      notFoundContent={!loadingRadiusProfiles && <Empty />}
                      labelInValue
                    >
                      {radiusProfiles.map(profile => (
                        <Option key={profile.id} value={profile.id}>
                          {profile.name}
                        </Option>
                      ))}
                    </Select>
                  </Item>
                )
              );
            }}
          </Item>
          <Item
            name="radiusAcountingServiceInterval"
            label="RADIUS Accounting Interval"
            rules={[
              {
                required: true,
                message: 'Please enter a RADIUS accounting interval',
              },
              () => ({
                validator(_rule, value) {
                  if (!value || (value >= 60 && value <= 600) || value === '0') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('0 or 60 - 600'));
                },
              }),
            ]}
          >
            <Input
              className={globalStyles.field}
              placeholder="0 or 60 - 600 "
              type="number"
              min={0}
              max={600}
              addonAfter={
                <Tooltip title="Interval can be 0 or a number between 60 and 600" text="Seconds" />
              }
            />
          </Item>
          <Item
            label="NAS ID"
            name={['radiusClientConfiguration', 'nasClientId']}
            rules={[
              {
                required: true,
                message: 'Please select NAS ID',
              },
            ]}
          >
            <Select
              data-testid="securityMode"
              className={globalStyles.field}
              placeholder="Select NAS ID"
            >
              <Option value="BSSID">BSSID</Option>
              <Option value="AP_BASE_MAC">AP Base MAC Address</Option>
              <Option value="USER_DEFINED">Manual</Option>
            </Select>
          </Item>
          <Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.radiusClientConfiguration?.nasClientId !==
              currentValues.radiusClientConfiguration?.nasClientId
            }
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue(['radiusClientConfiguration', 'nasClientId']) === 'USER_DEFINED' && (
                  <Item
                    wrapperCol={{ offset: 5, span: 15 }}
                    name={['radiusClientConfiguration', 'userDefinedNasId']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter NAS ID',
                      },
                      {
                        pattern: /^\s*(?:\S\s*){3,}$/,
                        message: 'NAS-ID must be atleast 3 characters',
                      },
                    ]}
                  >
                    <Input className={globalStyles.field} placeholder="Enter NAS ID" />
                  </Item>
                )
              );
            }}
          </Item>
          <Item
            label="NAS IP"
            name={['radiusClientConfiguration', 'nasClientIp']}
            rules={[
              {
                required: true,
                message: 'Please select NAS IP',
              },
            ]}
          >
            <Select
              data-testid="securityMode"
              className={globalStyles.field}
              placeholder="Select NAS IP"
            >
              <Option value="WAN_IP">WAN</Option>
              <Option value="PROXY_IP">Proxy</Option>
              <Option value="USER_DEFINED">Manual</Option>
            </Select>
          </Item>
          <Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.radiusClientConfiguration?.nasClientIp !==
              currentValues.radiusClientConfiguration?.nasClientIp
            }
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue(['radiusClientConfiguration', 'nasClientIp']) === 'USER_DEFINED' && (
                  <Item
                    wrapperCol={{ offset: 5, span: 15 }}
                    name={['radiusClientConfiguration', 'userDefinedNasIp']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please enter NAS IP',
                      },
                      {
                        pattern: IP_REGEX,
                        message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                      },
                    ]}
                  >
                    <Input className={globalStyles.field} placeholder="Enter NAS IP" />
                  </Item>
                )
              );
            }}
          </Item>
        </Card>
      )}

      <Card title="Roaming">
        <Item label="Advanced Settings" colon={false}>
          <div className={styles.InlineDiv}>
            {Object.keys(radioTypes || {})?.map(i => (
              <span key={i}>{radioTypes?.[i]}</span>
            ))}
          </div>
        </Item>

        {mode !== 'wpaPSK' &&
          mode !== 'wep' &&
          mode !== 'wpa2PSK' &&
          mode !== 'wpa2OnlyPSK' &&
          mode !== 'wpa3MixedSAE' &&
          mode !== 'wpa3OnlySAE' &&
          mode !== 'open' && (
            <Item
              label={
                <Tooltip
                  title="When a wireless network is configured with 'Fast BSS Transitions', hand-offs from one base station to another are managed seamlessly."
                  text="Fast BSS Transition (802.11r)"
                />
              }
            >
              <div className={styles.InlineDiv}>
                {RADIOS.map(i => (
                  <Item key={i} name={`enable80211r${i}`}>
                    {radioOptions}
                  </Item>
                ))}
              </div>
            </Item>
          )}

        <Item label="802.11k">
          <div className={styles.InlineDiv}>
            {RADIOS.map(i => (
              <Item key={i} name={`enable80211k${i}`}>
                {radioOptions}
              </Item>
            ))}
          </div>
        </Item>

        <Item label="802.11v">
          <div className={styles.InlineDiv}>
            {RADIOS.map(i => (
              <Item key={i} name={`enable80211v${i}`}>
                {radioOptions}
              </Item>
            ))}
          </div>
        </Item>
      </Card>

      <Item name="childProfileIds" hidden>
        <Input />
      </Item>
    </div>
  );
};

SSIDForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
  childProfiles: PropTypes.instanceOf(Array),
  captiveProfiles: PropTypes.instanceOf(Array),
  radiusProfiles: PropTypes.instanceOf(Array),
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingCaptiveProfiles: PropTypes.bool,
  loadingRadiusProfiles: PropTypes.bool,
};

SSIDForm.defaultProps = {
  form: null,
  details: {},
  childProfiles: [],
  captiveProfiles: [],
  radiusProfiles: [],
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingCaptiveProfiles: false,
  loadingRadiusProfiles: false,
};

export default SSIDForm;
