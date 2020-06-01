import React from 'react';
import { Card, Form, Input, Tooltip, Checkbox, Radio, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Container from 'components/Container';

import styles from './index.module.scss';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 12,
  },
};
const { Item } = Form;
const { Option } = Select;

const SSIDForm = () => {
  return (
    <Container>
      <Card className={styles.Card} title="SSID">
        <Form {...layout}>
          <Item
            name="name"
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
            name="bandwidth"
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
                placeholder="0-100"
                addonBefore="Down Mbps"
                addonAfter={
                  <Tooltip title="Down Mbps: Limit is 0 - 100 (0 means unlimited)">
                    <InfoCircleOutlined />
                  </Tooltip>
                }
              />
              <Input
                className={styles.Field}
                type="number"
                min={0}
                max={100}
                placeholder="0-100"
                addonBefore="UP Mbps"
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

              <Checkbox value="5.0Ghz">5.0 GHz</Checkbox>
            </Checkbox.Group>
          </Item>
        </Form>
      </Card>
      <Card className={styles.Card} title="Network Connectivity">
        <Form {...layout}>
          <Item
            name="mode"
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
            <>
              <Radio.Group defaultValue="bridge">
                <Radio value="bridge">Bridge</Radio>
                <Radio value="NAT">NAT</Radio>
              </Radio.Group>
            </>
          </Item>

          <Item
            name="local_access"
            label={
              <span>
                <Tooltip title="When a wireless network is configured with 'No Local Access', users will have internet access only. Any traffic to internal resources (other than DHCP and DNS) will be denied.">
                  <InfoCircleOutlined />
                </Tooltip>
                &nbsp; Local Access
              </span>
            }
          >
            <>
              <Radio.Group defaultValue="access">
                <Radio value="access">Allow Local Access </Radio>
                <Radio value="noAccess">No Local Access</Radio>
              </Radio.Group>
            </>
          </Item>
          <Item name="portal" label="Captive Portal">
            <>
              <Radio.Group defaultValue="notPortal">
                <Radio value="notPortal">Do Not Use </Radio>
                <Radio value="usePortal">Use</Radio>
              </Radio.Group>
            </>
          </Item>
          <Item name="gateway" label="Bonjour Gateway">
            <>
              <Radio.Group defaultValue="notGateway">
                <Radio value="notGateway">Do Not Use </Radio>
                <Radio value="useGateway">Use</Radio>
              </Radio.Group>
            </>
          </Item>
        </Form>
      </Card>
      <Card className={styles.Card} title="Security and Encryption">
        <Form {...layout}>
          <Item label="Mode">
            <Select className={styles.Field} defaultValue="mixed_personal">
              <Option value="open">Open (No ecryption)</Option>
              <Option value="wpaPersonal">WPA Personal</Option>
              <Option value="mixedPersonal" selected>
                WPA & WPA2 Personal (mixed mode)
              </Option>
              <Option value="mixedEnterprise">WPA & WPA2 Enterprise (mixed mode)</Option>
              <Option value="wpa2Personal">WPA2 Personal</Option>
              <Option value="wpa2Enterprise">WPA2 Enterprise</Option>
              <Option value="wep">WEP</Option>
            </Select>
          </Item>
          <Item
            label="Security Key"
            name="key"
            rules={[
              {
                required: true,
                message: 'Please input your security key',
              },
            ]}
          >
            <Input.Password visibilityToggle className={styles.Field} />
          </Item>
          <Item name="gateway" label="VLAN">
            <>
              <Radio.Group defaultValue="defaultVLAN">
                <Radio name="customVLAN" value="customVLAN">
                  Use Custom VLAN
                </Radio>
                <Radio name="defaultVLAN" value="defaultVLAN">
                  Use Default VLAN
                </Radio>
              </Radio.Group>
            </>
          </Item>
        </Form>
      </Card>

      <Card className={styles.Card} title="Roaming">
        <Form {...layout}>
          <Item label="Advanced Settings">
            <div className={styles.InlineDiv}>
              <span>2.4GHz</span>
              <span>5.0Ghz</span>
            </div>
          </Item>

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
              <Option value="disabled" selected>
                Disabled
              </Option>
            </Select>
          </Item>
          <Item label="802.11k ">
            <div className={styles.InlineDiv}>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled" selected>
                  Disabled
                </Option>
              </Select>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled" selected>
                  Disabled
                </Option>
              </Select>
            </div>
          </Item>
          <Item label="802.11v ">
            <div className={styles.InlineDiv}>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled" selected>
                  Disabled
                </Option>
              </Select>
              <Select className={styles.Field} defaultValue="auto">
                <Option value="auto">Auto</Option>
                <Option value="enabled">Enabled</Option>
                <Option value="disabled" selected>
                  Disabled
                </Option>
              </Select>
            </div>
          </Item>
        </Form>
      </Card>
    </Container>
  );
};

export default SSIDForm;
