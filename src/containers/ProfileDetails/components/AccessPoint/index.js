import React, { useState } from 'react';
import { Card, Form, Input, Checkbox, Radio, Select, Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import SSIDForm from '../SSID';
import styles from '../index.module.scss';

const AccessPointForm = () => {
  const { Item } = Form;
  const { Option } = Select;

  const [addModal, setAddModal] = useState(false);

  const [vlan, setVlan] = useState(true);
  const [ntp, setNTP] = useState(true);
  const [led, setLed] = useState(true);

  const [rtls, setRtls] = useState(false);
  const [syslog, setSyslog] = useState(false);

  const columns = [
    {
      title: 'Profile Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'SSID',
      key: 'ssidName',
      width: 250,
    },
    {
      title: 'Security Mode',
      key: 'security',
      width: 400,
    },
    {
      title: 'Radio',
      key: 'radio',
      width: 250,
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: 80,
      render: <Button icon={<DeleteFilled />} />,
    },
  ];

  return (
    <div className={styles.ProfilePage}>
      <Modal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSuccess={() => {}}
        title="Add Wireless Network Profile"
        width={1200}
        content={
          <div>
            <Card title="Create Profile Name">
              <Item
                label="Profile Name"
                rules={[{ required: true, message: 'Please input your new profile name' }]}
              >
                <Input className={styles.Field} placeholder="Enter profile name" />
              </Item>
            </Card>
            <SSIDForm />
          </div>
        }
      />
      <Card title="LAN and Services ">
        <Item label="Management VLAN" valuePropName="checked" name="managementVlan">
          <Checkbox onChange={() => setVlan(!vlan)}>Use Default Management VLAN</Checkbox>
        </Item>

        {vlan && (
          <Item label=" " colon={false}>
            <Item
              name="vlanValue"
              rules={[
                {
                  required: vlan,
                  message: 'Vlan expected between 2 and 4095',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (
                      !value ||
                      (getFieldValue('vlanValue') <= 4095 && getFieldValue('vlanValue') > 1)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Vlan expected between 2 and 4095'));
                  },
                }),
              ]}
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
          </Item>
        )}

        <Item label="NTP" name="ntp" valuePropName="checked">
          <Checkbox onChange={() => setNTP(!ntp)} defaultChecked>
            Use Default Servers
          </Checkbox>
        </Item>
        {ntp && (
          <Item label=" " colon={false}>
            <Item
              name="ntpServer"
              rules={[{ required: ntp, message: 'Please enter your NTP server' }]}
            >
              <Input className={styles.Field} placeholder="Enter NTP server" />
            </Item>
          </Item>
        )}
        <Item label="LED Status" name="ledStatus" valuePropName="checked">
          <Checkbox value="led" onChange={() => setLed(!led)} defaultChecked>
            Show LED indicators on APs
          </Checkbox>
        </Item>

        <Item
          label="RTLS"
          name="rtls"
          rules={[
            {
              required: true,
              message: 'Please select your RTLS setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="disabledRTLS" onChange={() => setRtls(false)}>
              Disabled
            </Radio>
            <Radio value="enabledRTLS" onChange={() => setRtls(true)}>
              Enabled
            </Radio>
          </Radio.Group>
        </Item>
        {rtls && (
          <>
            <Item label=" " colon={false}>
              <Item
                name="RTLSipAddress"
                rules={[
                  {
                    required: rtls,
                    pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
                    message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                  },
                ]}
                hasFeedback
              >
                <Input className={styles.Field} placeholder="IP Address" />
              </Item>
              <Item
                name="RTLSport"
                rules={[
                  {
                    required: rtls,
                    message: 'Port expected between 1 - 65535',
                  },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('RTLSport') < 65535) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Port expected between 1 - 65535'));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input
                  className={styles.Field}
                  placeholder="Port"
                  type="number"
                  min={1}
                  max={65535}
                />
              </Item>
            </Item>
          </>
        )}
        <Item
          label="Syslog"
          name="syslog"
          rules={[
            {
              required: true,
              message: 'Please select your Syslog setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="disabledSyslog" onChange={() => setSyslog(false)}>
              Disabled
            </Radio>
            <Radio value="enabledSyslog" onChange={() => setSyslog(true)}>
              Enabled
            </Radio>
          </Radio.Group>
        </Item>
        {syslog && (
          <>
            <Item label=" " colon={false}>
              <div className={styles.InlineDiv}>
                <Item
                  name="SyslogIP"
                  rules={[
                    {
                      required: syslog,
                      pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
                      message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={styles.Field} placeholder="IP Address" />
                </Item>
                <Item
                  name="SyslogPort"
                  rules={[
                    {
                      required: syslog,
                      message: 'Port expected between 1 - 65535',
                    },
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        if (!value || getFieldValue('SyslogPort') < 65535) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Port expected between 1 - 65535'));
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    className={styles.Field}
                    placeholder="Port"
                    type="number"
                    min={1}
                    max={65535}
                    hasFeedback
                  />
                </Item>
              </div>
              <Item
                name="mode"
                rules={[
                  {
                    required: true,
                    message: 'Please select the Syslog mode',
                  },
                ]}
              >
                <Select className={styles.Field} placeholder="Select Syslog Mode">
                  <Option value="debug">Debug (DEBUG)</Option>
                  <Option value="info">Info. (INFO)</Option>
                  <Option value="notice">Notice (NOTICE)</Option>
                  <Option value="warning">Warning (WARNING)</Option>
                  <Option value="error">Error (ERR)</Option>
                  <Option value="critical">Critical (CRIT)</Option>
                  <Option value="Alert">Alert (ALERT)</Option>
                  <Option value="emergency">Emergency (EMERG)</Option>
                </Select>
              </Item>
            </Item>
          </>
        )}
        <Item
          label="Synthetic Client"
          name="syntheticClient"
          rules={[
            {
              required: true,
              message: 'Please select your Synthetic Client setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="disabledClient">Disabled</Radio>
            <Radio value="enabledClient">Enabled</Radio>
          </Radio.Group>
        </Item>
        <Item
          label="Equipment Discovery"
          name="equipmentDiscovery"
          rules={[
            {
              required: true,
              message: 'Please select your Equipment Discovery setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="disabledEq">Disabled</Radio>
            <Radio value="enabledEq">Enabled</Radio>
          </Radio.Group>
        </Item>
      </Card>
      <Card title="Wireless Networks (SSIDs) Enabled on This Profile">
        <Table columns={columns} pagination={false} />
        <Button onClick={() => setAddModal(true)}>Create Wireless Network</Button>
      </Card>
    </div>
  );
};

export default AccessPointForm;
