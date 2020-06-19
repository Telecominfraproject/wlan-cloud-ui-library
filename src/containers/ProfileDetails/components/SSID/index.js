import React, { useState } from 'react';

import { Card, Form, Input, Tooltip, Checkbox, Radio, Select, Button } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const SSIDForm = () => {
  const [bridge, setBridge] = useState(false);
  const [captivePortal, setCaptivePortal] = useState(false);
  const [vlan, setVlan] = useState(false);
  const [mode, setMode] = useState('');

  const hexadecimalRegex = e => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Card title="SSID">
        <Item
          label="SSID Name"
          name="ssid"
          rules={[{ required: true, message: 'Please input your new SSID name' }]}
        >
          <Input className={styles.Field} name="ssidName" placeholder="Enter SSID name" />
        </Item>

        <Item
          label="Broadcast SSID"
          name="broadcastSSID"
          rules={[
            {
              required: true,
              message: 'Please select your SSID visibility setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="showSSID">Show SSID</Radio>
            <Radio value="hideSSID">Hide SSID</Radio>
          </Radio.Group>
        </Item>

        <Item label="Bandwidth">
          <div className={styles.InlineDiv}>
            <Item
              name="downstreamBandwidth"
              rules={[
                {
                  required: true,
                  message: 'Downstream bandwidth limit can be a number between 0 and 100.',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || getFieldValue('downstream') <= 100) {
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
                hasFeedback
                className={styles.Field}
                placeholder="0-100"
                type="number"
                min={0}
                max={100}
                addonAfter={
                  <div>
                    Down Mbps&nbsp;
                    <Tooltip title="Down Mbps: Limit is 0 - 100 (0 means unlimited)">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                }
              />
            </Item>

            <Item
              name="upstreamBandwidth"
              rules={[
                {
                  required: true,
                  message: 'Upstream bandwidth limit can be a number between 0 and 100.',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || getFieldValue('upstream') <= 100) {
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
                hasFeedback
                className={styles.Field}
                placeholder="0-100"
                type="number"
                min={0}
                max={100}
                addonAfter={
                  <div>
                    Up Mbps&nbsp;
                    <Tooltip title="Up Mbps: Limit is 0 - 100 (0 means unlimited)">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                }
              />
            </Item>
          </div>
        </Item>

        <Item name="ssidUseOn" label="Use On">
          <Checkbox.Group>
            <Checkbox value="2.4Ghz">2.4 GHz</Checkbox>

            <Checkbox value="5Ghz">5 GHz</Checkbox>
          </Checkbox.Group>
        </Item>
      </Card>
      <Card title="Network Connectivity">
        <Item
          name="mode"
          rules={[
            {
              required: true,
              message: 'Please select your connectivity mode',
            },
          ]}
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
              >
                <InfoCircleOutlined />
              </Tooltip>
              &nbsp; Mode
            </span>
          }
        >
          <Radio.Group>
            <Radio value="bridge" onChange={() => setBridge(true)}>
              Bridge
            </Radio>
            <Radio value="NAT" onChange={() => setBridge(false)}>
              NAT
            </Radio>
          </Radio.Group>
        </Item>

        <Item
          name="localAccess"
          rules={[
            {
              message: 'Please select your local access configuration',
            },
          ]}
          label={
            <span>
              <Tooltip title="When a wireless network is configured with 'No Local Access', users will have internet access only. Any traffic to internal resources (other than DHCP and DNS) will be denied.">
                <InfoCircleOutlined />
              </Tooltip>
              &nbsp; Local Access
            </span>
          }
        >
          {bridge ? (
            <Radio.Group>
              <Radio value="access">Allow Local Access</Radio>
              <Radio value="noAccess">No Local Access</Radio>
            </Radio.Group>
          ) : (
            <span className={styles.Disclaimer}>Not Applicable</span>
          )}
        </Item>

        <Item
          label="Captive Portal"
          name="captive"
          rules={[
            {
              required: true,
              message: 'Please select your captive portal setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="notPortal" onChange={() => setCaptivePortal(false)}>
              Do Not Use
            </Radio>
            <Radio value="usePortal" onChange={() => setCaptivePortal(true)}>
              Use
            </Radio>
          </Radio.Group>
          {captivePortal && (
            <Item
              name="captiveID"
              rules={[
                {
                  required: true,
                  message: 'Please input your default captive ID',
                },
              ]}
              style={{ marginTop: '10px' }}
            >
              <Select className={styles.Field} placeholder="Select Captive Portal">
                <Option value="default">Default</Option>
              </Select>
            </Item>
          )}
        </Item>
      </Card>

      <Card title="Security and Encryption">
        <Item
          label="Mode"
          name="securityMode"
          rules={[
            {
              required: true,
              message: 'Please select your security and encryption mode',
            },
          ]}
        >
          <Select
            className={styles.Field}
            onChange={value => setMode(value)}
            placeholder="Select Security and Encryption Mode"
          >
            <Option value="open">Open (No ecryption)</Option>
            <Option value="wpaPersonal">WPA Personal</Option>
            <Option value="mixedPersonal">WPA & WPA2 Personal (mixed mode)</Option>
            <Option value="mixedEnterprise">WPA & WPA2 Enterprise (mixed mode)</Option>
            <Option value="wpa2Personal">WPA2 Personal</Option>
            <Option value="wpa2Enterprise">WPA2 Enterprise</Option>
            <Option value="wep">WEP</Option>
          </Select>
        </Item>

        {(mode === 'mixedEnterprise' || mode === 'wpa2Enterprise') && (
          <Item
            label="RADIUS Service"
            name="radius"
            rules={[
              {
                required: true,
                message: 'Please select your RADIUS service',
              },
            ]}
          >
            <Tooltip title="Add new RADIUS service">
              <Button icon={<PlusOutlined />} />
            </Tooltip>
          </Item>
        )}

        {(mode === 'wpa' || mode === 'mixedPersonal' || mode === 'wpa2Personal') && (
          <Item
            label="Security Key"
            name="key"
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
              className={styles.Field}
              placeholder="8-63 characters"
              maxLength={63}
            />
          </Item>
        )}

        {mode === 'wep' && (
          <>
            <span className={styles.Disclaimer}>
              When using WEP, high performance features like 11n and 11ac will not work with this
              SSID.
            </span>

            <Item
              label="WEP Key"
              name="wepKey"
              rules={[
                {
                  required: true,
                  message:
                    'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (
                      !value ||
                      getFieldValue('wepKey').length === 10 ||
                      getFieldValue('wepKey').length === 26
                    ) {
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
                className={styles.Field}
                placeholder="Enter WEP key"
                onKeyPress={e => hexadecimalRegex(e)}
                maxLength={26}
              />
            </Item>
            <Item
              label="Default Key ID "
              name="keyID"
              rules={[
                {
                  required: true,
                  message: 'Please select your default key ID',
                },
              ]}
            >
              <Select className={styles.Field} placeholder="Select default key ID">
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
              </Select>
            </Item>
          </>
        )}
        <Item label="VLAN" name="vlan">
          <Radio.Group>
            <Radio value="customVLAN" onChange={() => setVlan(true)}>
              Use Custom VLAN
            </Radio>
            <Radio value="defaultVLAN" onChange={() => setVlan(false)}>
              Use Default VLAN
            </Radio>
          </Radio.Group>

          {vlan && (
            <Item
              name="vlanValue"
              rules={[
                {
                  required: true,
                  message: 'Vlan expected between 2 and 4095',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (
                      !value ||
                      (getFieldValue('vlan') <= 4095 && getFieldValue('vlanValue') > 1)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Vlan expected between 2 and 4095'));
                  },
                }),
              ]}
              style={{ marginTop: '10px' }}
              hasFeedback
            >
              <Input
                className={styles.Field}
                placeholder="2-4095"
                type="number"
                min={2}
                max={4095}
                maxLength={4}
              />
            </Item>
          )}
        </Item>
      </Card>

      {mode !== 'wpaPersonal' && mode !== 'wep' && (
        <Card title="Roaming">
          <Item label="Advanced Settings" colon={false}>
            <div className={styles.InlineDiv}>
              <span>2.4GHz</span>
              <span>5GHz</span>
              <span>5GHzU</span>
              <span>5GHzL</span>
            </div>
          </Item>

          {mode !== 'open' && (
            <Item
              label={
                <span style={{ marginTop: '5px' }}>
                  <Tooltip title="When a wireless network is configured with 'Fast BSS Transitions', hand-offs from one base station to another are managed seamlessly.">
                    <InfoCircleOutlined />
                  </Tooltip>
                  &nbsp; Fast BSS
                  <br />
                  Transition (802.11r)
                </span>
              }
              name="802.11r"
              rules={[
                {
                  required: true,
                  message: 'Please select your 802.11r setting',
                },
              ]}
            >
              <Select className={styles.Field}>
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
            </Item>
          )}

          {(mode === 'wpa2Personal' || mode === 'wpa2Enterprise') && (
            <Item
              label="802.11w"
              name="802.11w"
              rules={[
                {
                  required: true,
                  message: 'Please select your 802.11w setting',
                },
              ]}
            >
              <Select className={styles.Field}>
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
            </Item>
          )}

          <Item label="802.11k ">
            <div className={styles.InlineDiv}>
              <Item
                name="802.11k2dot4GHz"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11w setting for 2.4GHz',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
              <Item
                name="802.11k5GHz"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11w setting for 5GHz',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
              <Item
                name="802.11k5GHzU"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11w setting for 5GHzU',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
              <Item
                name="802.11k5GHzL"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11w setting for 5GHzL',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item label="802.11v ">
            <div className={styles.InlineDiv}>
              <Item
                name="802.11v2dot4GHz"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11v setting for 2.4GHz',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
              <Item
                name="802.11v5GHz"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11v setting for 5GHz',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
              <Item
                name="802.11v5GHzU"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11v setting for 5GHzU',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
              <Item
                name="802.11v5GHzL"
                rules={[
                  {
                    required: true,
                    message: 'Please select your 802.11v setting for 5GHzL',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="auto">Auto</Option>
                  <Option value="enabled">Enabled</Option>
                  <Option value="disabled">Disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
        </Card>
      )}
    </>
  );
};

export default SSIDForm;
