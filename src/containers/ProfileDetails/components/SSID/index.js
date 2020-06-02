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

  return (
    <>
      <Card title="SSID">
        <Item
          label="SSID Name"
          rules={[{ required: true, message: 'Please input your new SSID name' }]}
        >
          <div className={styles.InlineDiv}>
            <Input className={styles.Field} name="ssidName" />
            <Radio.Group defaultValue="show">
              <Radio value="hide">Hide SSID </Radio>
              <Radio value="show">Show SSID</Radio>
            </Radio.Group>
          </div>
        </Item>
        <Item
          label="Bandwidth Limits"
          rules={[
            { required: true, message: 'Bandwidth Limit can be a number between 0 and 100.' },
          ]}
        >
          <div className={styles.InlineDiv}>
            <Input
              className={styles.Field}
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
              type="number"
              min={2}
              max={4095}
              addonBefore="Up Mbps"
              rules={[{ required: true, message: 'Bandwidth expected between 0 - 100' }]}
              addonAfter={
                <Tooltip title="Up Mbps: Limit is 0 - 100 (0 means unlimited)">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
          </div>
        </Item>

        <Item name="checkbox-group" label="Use On">
          <Checkbox.Group>
            <Checkbox value="2.4Ghz">2.4 GHz</Checkbox>

            <Checkbox value="5Ghz">5.0 GHz</Checkbox>
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
            <span className={styles.NotApplicable}>Not Applicable</span>
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
            <Select className={styles.Field} placeholder="Select Captive Portal Profile">
              <Option value="default">Default</Option>
            </Select>
          )}
        </Item>
      </Card>

      <Card title="Security and Encryption">
        <Item label="Mode">
          <Select className={styles.Field} onChange={value => setMode(value)}>
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
            rules={[
              {
                required: true,
                message: 'Please select your RADIUS service',
              },
            ]}
          >
            <Tooltip title="Add new RADIUS service">
              <Button icon={<PlusOutlined />} on />
            </Tooltip>
          </Item>
        )}

        {(mode === 'wpa' || mode === 'mixedPersonal' || mode === 'wpa2Personal') && (
          <Item
            label="Security Key"
            rules={[
              {
                required: true,
                message: 'Please input your security key',
              },
            ]}
          >
            <Input.Password visibilityToggle className={styles.Field} />
          </Item>
        )}

        {mode === 'wep' && (
          <>
            <p>
              When using WEP, high performance features like 11n and 11ac will not work with this
              SSID.
            </p>
            <Item
              label="WEP Key"
              rules={[
                {
                  required: true,
                  message:
                    'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key',
                },
              ]}
            >
              <Input className={styles.Field} />
            </Item>
            <Item label="Default Key ID ">
              <Select className={styles.Field}>
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
            <Input
              className={styles.Field}
              placeholder="2-4095"
              type="number"
              rules={[{ required: true, message: 'VLAN expected between 2 - 4095' }]}
              min={2}
              max={4095}
            />
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
