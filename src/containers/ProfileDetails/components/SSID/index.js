import React, { useState } from 'react';
import { Card, Form, Input, Tooltip, Checkbox, Radio, Select, Button } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

import styles from '../index.module.scss';

const SSIDForm = () => {
  const { Item } = Form;
  const { Option } = Select;

  const [bridge, setBridge] = useState(true);
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
          <div className={styles.InlineDiv}>
            <Input className={styles.Field} name="ssidName" placeholder="Enter SSID name" />
            <Radio.Group defaultValue="show">
              <Radio value="hide">Hide SSID </Radio>
              <Radio value="show">Show SSID</Radio>
            </Radio.Group>
          </div>
        </Item>
        <Item
          label="Bandwidth Limits"
          name="bandwidth"
          rules={[
            { required: true, message: 'Bandwidth Limit can be a number between 0 and 100.' },
          ]}
        >
          <div className={styles.InlineDiv}>
            <Input
              className={styles.Field}
              placeholder="0-100"
              type="number"
              min={0}
              max={100}
              addonBefore="Down Mbps"
              rules={[{ required: true, message: 'Bandwidth expected between 0 - 100' }]}
              addonAfter={
                <Tooltip title="Down Mbps: Limit is 0 - 100 (0 means unlimited)">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
            <Input
              className={styles.Field}
              placeholder="0-100"
              type="number"
              min={0}
              max={100}
              addonBefore="Up Mbps"
              rules={[{ required: true, message: 'Bandwidth expected between 0 - 100' }]}
              addonAfter={
                <Tooltip title="Up Mbps: Limit is 0 - 100 (0 means unlimited)">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              hasFeedback
            />
          </div>
        </Item>

        <Item name="checkbox-group" label="Use On">
          <Checkbox.Group>
            <Checkbox value="2.4Ghz">2.4 GHz</Checkbox>

            <Checkbox value="5Ghz">5 GHz</Checkbox>
          </Checkbox.Group>
        </Item>
      </Card>
      <Card title="Network Connectivity">
        <Item
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
          <Radio.Group defaultValue="bridge">
            <Radio value="bridge" onChange={() => setBridge(true)}>
              Bridge
            </Radio>
            <Radio value="NAT" onChange={() => setBridge(false)}>
              NAT
            </Radio>
          </Radio.Group>
        </Item>

        <Item
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
            <Radio.Group defaultValue="access">
              <Radio value="access">Allow Local Access</Radio>
              <Radio value="noAccess">No Local Access</Radio>
            </Radio.Group>
          ) : (
            <span className={styles.Disclaimer}>Not Applicable</span>
          )}
        </Item>

        <Item label="Captive Portal">
          <Radio.Group defaultValue="notPortal">
            <Radio value="notPortal" onChange={() => setCaptivePortal(false)}>
              Do Not Use
            </Radio>
            <Radio value="usePortal" onChange={() => setCaptivePortal(true)}>
              Use
            </Radio>
          </Radio.Group>
          {captivePortal && (
            <Item
              name="captive"
              rules={[
                {
                  required: true,
                  message: 'Please input your default captive ID',
                },
              ]}
            >
              <Select className={styles.Field} placeholder="Select Captive Portal Profile">
                <Option value="default">Default</Option>
              </Select>
            </Item>
          )}
        </Item>
      </Card>

      <Card title="Security and Encryption">
        <Item
          label="Mode"
          name="mode"
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
            When using WEP, high performance features like 11n and 11ac will not work with this
            SSID.
            <Item
              label="WEP Key"
              name="wepKey"
              rules={[
                {
                  required: true,
                  len: 10,
                  message:
                    'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key',
                },
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
        <Item label="VLAN">
          <Radio.Group defaultValue="defaultVLAN">
            <Radio value="customVLAN" onChange={() => setVlan(true)}>
              Use Custom VLAN
            </Radio>
            <Radio value="defaultVLAN" onChange={() => setVlan(false)}>
              Use Default VLAN
            </Radio>
          </Radio.Group>
          {vlan && (
            <Item
              name="vlan"
              rules={[{ required: true, message: 'VLAN expected between 2 - 4095' }]}
            >
              <Input
                className={styles.Field}
                placeholder="2-4095"
                type="number"
                min={2}
                max={4095}
              />
            </Item>
          )}
        </Item>
      </Card>

      {mode !== 'wpaPersonal' && mode !== 'wep' && (
        <Card title="Roaming">
          <Item label="Advanced Settings">
            <div className={styles.InlineDiv}>
              <span>2.4GHz</span>
              <span>5.0Ghz</span>
            </div>
          </Item>

          {mode !== 'open' && (
            <Item
              label={
                <span>
                  <Tooltip title="When a wireless network is configured with 'Fast BSS Transitions', hand-offs from one base station to another are managed seamlessly.">
                    <InfoCircleOutlined />
                  </Tooltip>
                  &nbsp; Fast BSS
                  <br />
                  Transition (802.11r)
                </span>
              }
            >
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
            </Item>
          )}

          {(mode === 'wpa2Personal' || mode === 'wpa2Enterprise') && (
            <Item label="802.11w">
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
            </Item>
          )}

          <Item label="802.11k ">
            <div className={styles.InlineDiv}>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
            </div>
          </Item>
          <Item label="802.11v ">
            <div className={styles.InlineDiv}>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled">Disabled</Option>
              </Select>
            </div>
          </Item>
        </Card>
      )}
    </>
  );
};

export default SSIDForm;
