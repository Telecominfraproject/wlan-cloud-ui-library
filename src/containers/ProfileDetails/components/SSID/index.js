import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Checkbox, Radio, Select } from 'antd';
import Tooltip from 'components/Tooltip';
import ThemeContext from 'contexts/ThemeContext';

import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';
import { defaultSsidProfile } from '../constants';
import { RADIOS, ROAMING } from '../../constants/index';

const { Item } = Form;
const { Option } = Select;

const SSIDForm = ({
  form,
  details,
  captiveProfiles,
  childProfiles,
  onFetchMoreCaptiveProfiles,
  radiusProfiles,
  onFetchMoreRadiusProfiles,
}) => {
  const { radioTypes } = useContext(ThemeContext);
  const [mode, setMode] = useState(details.secureMode || 'open');

  const hexadecimalRegex = e => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  const dropdownOptions = (
    <Select className={globalStyles.field}>
      <Option value="auto">Auto</Option>
      <Option value="true">Enabled</Option>
      <Option value="false">Disabled</Option>
    </Select>
  );

  useEffect(() => {
    const radioBasedValues = {};

    RADIOS.forEach(i => {
      ROAMING.forEach(j => {
        radioBasedValues[`${j}${i}`] = details?.radioBasedConfigs?.[i]?.[j]?.toString() ?? 'auto';
      });
    });

    form.setFieldsValue({
      ssid: details?.ssid || '',
      bandwidthLimitDown: details?.bandwidthLimitDown || defaultSsidProfile.bandwidthLimitDown,
      bandwidthLimitUp: details?.bandwidthLimitUp || defaultSsidProfile.bandwidthLimitUp,
      broadcastSsid: details?.broadcastSsid || defaultSsidProfile.broadcastSsid,
      appliedRadios: details?.appliedRadios || defaultSsidProfile.appliedRadios,
      forwardMode: details?.forwardMode || defaultSsidProfile.forwardMode,
      noLocalSubnets: details?.noLocalSubnets ? 'true' : 'false',
      captivePortal: details?.captivePortalId ? 'usePortal' : 'notPortal',
      captivePortalId: details.captivePortalId && details.captivePortalId.toString(),
      secureMode: details.secureMode || defaultSsidProfile.secureMode,
      vlan: details?.vlanId > 0 ? 'customVLAN' : 'defaultVLAN',
      keyStr: details.keyStr || defaultSsidProfile.keyStr,
      wepKey: details?.wepConfig?.wepKeys?.[0]?.txKey || '',
      wepDefaultKeyId: details?.wepConfig?.primaryTxKeyId || 1,
      vlanId: details.vlanId || defaultSsidProfile.vlanId,
      radiusServiceName:
        {
          value: childProfiles?.[0]?.id || null,
          label: childProfiles?.[0]?.name || null,
        } || null,
      ...radioBasedValues,
      childProfileIds: [],
    });
  }, [form, details]);

  return (
    <div className={styles.ProfilePage}>
      <Card title="SSID">
        <Item
          label="SSID Name"
          name="ssid"
          rules={[{ required: true, message: 'Please input your new SSID name' }]}
        >
          <Input className={globalStyles.field} name="ssidName" placeholder="Enter SSID name" />
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
          <Radio.Group>
            <Radio value="enabled">Show SSID</Radio>
            <Radio value="disabled">Hide SSID</Radio>
          </Radio.Group>
        </Item>

        <Item label="Bandwidth">
          <div className={styles.InlineDiv}>
            <Item
              name="bandwidthLimitDown"
              rules={[
                {
                  required: true,
                  message: 'Downstream bandwidth limit can be a number between 0 and 100.',
                },
                () => ({
                  validator(_rule, value) {
                    if (!value || (value <= 100 && value >= 0)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Downstream bandwidth limit can be a number between 0 and 100.')
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
                  message: 'Upstream bandwidth limit can be a number between 0 and 100.',
                },
                () => ({
                  validator(_rule, value) {
                    if (!value || (value <= 100 && value >= 0)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Upstream bandwidth limit can be a number between 0 and 100.')
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
          <Checkbox.Group>
            {Object.keys(radioTypes || [])?.map(i => (
              <Checkbox key={i} value={i}>
                {radioTypes?.[i]}
              </Checkbox>
            ))}
          </Checkbox.Group>
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
          <Radio.Group>
            <Radio value="BRIDGE" defaultSelected>
              Bridge
            </Radio>
            <Radio value="NAT">NAT</Radio>
          </Radio.Group>
        </Item>

        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.forwardMode !== currentValues.forwardMode
          }
        >
          {({ getFieldValue }) => {
            return (
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
                  <Radio.Group>
                    <Radio value="false">Allow Local Access</Radio>
                    <Radio value="true">No Local Access</Radio>
                  </Radio.Group>
                ) : (
                  <span className={styles.Disclaimer}>Not Applicable</span>
                )}
              </Item>
            );
          }}
        </Item>

        <Item label="Captive Portal" name="captivePortal">
          <Radio.Group>
            <Radio value="notPortal">Do Not Use</Radio>
            <Radio value="usePortal">Use</Radio>
          </Radio.Group>
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.captivePortal !== currentValues.captivePortal
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue('captivePortal') === 'usePortal' ? (
              <Item label=" " colon={false} name="captivePortalId">
                <Select
                  className={globalStyles.field}
                  placeholder="Select Captive Portal"
                  onPopupScroll={onFetchMoreCaptiveProfiles}
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
            onChange={value => setMode(value)}
            placeholder="Select Security and Encryption Mode"
          >
            <Option value="open">Open (No Encryption)</Option>
            <Option value="wpaPSK">WPA Personal</Option>
            <Option value="wpaRadius">WPA Enterprise</Option>
            <Option value="wpa2PSK">WPA & WPA2 Personal (mixed mode)</Option>
            <Option value="wpa2Radius">WPA & WPA2 Enterprise (mixed mode)</Option>
            <Option value="wpa2OnlyPSK">WPA2 Personal</Option>
            <Option value="wpa2OnlyRadius">WPA2 Enterprise</Option>
            <Option value="wep">WEP</Option>
            <Option value="wpa3OnlySAE">WPA3 Enterprise</Option>
            <Option value="wpa3MixedSAE">WPA3 Enterprise (mixed mode)</Option>
            <Option value="wpa3OnlyEAP">WPA3 Personal</Option>
            <Option value="wpa3MixedEAP">WPA3 Personal (mixed mode)</Option>
          </Select>
        </Item>

        {mode === 'wep' && (
          <Item label=" " colon={false}>
            <span className={styles.Disclaimer}>
              When using WEP, high performance features like 11n and 11ac will not work with this
              SSID.
            </span>
          </Item>
        )}

        {(mode === 'wpaRadius' ||
          mode === 'wpa2Radius' ||
          mode === 'wpa2OnlyRadius' ||
          mode === 'wpa3OnlyEAP' ||
          mode === 'wpa3MixedEAP') && (
          <Item
            name="radiusServiceName"
            label="RADIUS Service"
            rules={[
              {
                required: true,
                message: 'Please select a RADIUS service',
              },
            ]}
          >
            <Select
              className={globalStyles.field}
              placeholder="Select RADIUS Service"
              onPopupScroll={onFetchMoreRadiusProfiles}
              labelInValue
            >
              {radiusProfiles.map(profile => (
                <Option key={profile.id} value={profile.id}>
                  {profile.name}
                </Option>
              ))}
            </Select>
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
                message: 'Please input your security key',
                min: 8,
                max: 63,
              },
            ]}
            hasFeedback
          >
            <Input.Password
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
                  <Radio.Group>
                    <Radio value="customVLAN">Use Custom VLAN</Radio>
                    <Radio value="defaultVLAN">Use Default VLAN</Radio>
                  </Radio.Group>
                ) : (
                  <span className={styles.Disclaimer}>Not Applicable</span>
                )}
              </Item>
            );
          }}
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.vlan !== currentValues.vlan}
        >
          {({ getFieldValue }) => {
            return getFieldValue('forwardMode') === 'BRIDGE' &&
              getFieldValue('vlan') === 'customVLAN' ? (
              <Item label=" " colon={false}>
                <Item
                  name="vlanId"
                  rules={[
                    {
                      required: getFieldValue('vlan'),
                      message: 'Vlan expected between 1 and 4095',
                    },
                    () => ({
                      validator(_rule, value) {
                        if (
                          !value ||
                          (getFieldValue('vlanId') <= 4095 && getFieldValue('vlanId') > 0)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Vlan expected between 1 and 4095'));
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
              </Item>
            ) : null;
          }}
        </Item>
      </Card>

      {mode !== 'wpaPSK' &&
        mode !== 'wep' &&
        mode !== 'wpa2PSK' &&
        mode !== 'wpa2OnlyPSK' &&
        mode !== 'wpa3MixedSAE' &&
        mode !== 'wpa3OnlySAE' && (
          <Card title="Roaming">
            <Item label="Advanced Settings" colon={false}>
              <div className={styles.InlineDiv}>
                {Object.keys(radioTypes || [])?.map(i => (
                  <span key={i}>{radioTypes?.[i]}</span>
                ))}
              </div>
            </Item>

            {mode !== 'open' && (
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
                      {dropdownOptions}
                    </Item>
                  ))}
                </div>
              </Item>
            )}

            <Item label="802.11k">
              <div className={styles.InlineDiv}>
                {RADIOS.map(i => (
                  <Item key={i} name={`enable80211k${i}`}>
                    {dropdownOptions}
                  </Item>
                ))}
              </div>
            </Item>

            <Item label="802.11v">
              <div className={styles.InlineDiv}>
                {RADIOS.map(i => (
                  <Item key={i} name={`enable80211v${i}`}>
                    {dropdownOptions}
                  </Item>
                ))}
              </div>
            </Item>
          </Card>
        )}

      <Item name="childProfileIds" style={{ display: 'none' }}>
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
  onFetchMoreCaptiveProfiles: PropTypes.func,
  onFetchMoreRadiusProfiles: PropTypes.func,
};

SSIDForm.defaultProps = {
  form: null,
  details: {},
  childProfiles: [],
  captiveProfiles: [],
  radiusProfiles: [],
  onFetchMoreCaptiveProfiles: () => {},
  onFetchMoreRadiusProfiles: () => {},
};

export default SSIDForm;
