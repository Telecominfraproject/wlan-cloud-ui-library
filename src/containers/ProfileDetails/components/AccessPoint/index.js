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
    <>
      <Modal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        title="Add Wireless Network Profile"
        width={1200}
        content={
          <div>
            <Card>
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
        <Item label="Management VLAN">
          <Checkbox onChange={() => setVlan(!vlan)} defaultChecked>
            Use Default Management VLAN
          </Checkbox>
          {!vlan && (
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

        <Item label="NTP">
          <Checkbox onChange={() => setNTP(!ntp)} defaultChecked>
            Use Default Servers
          </Checkbox>
          {!ntp && (
            <Item name="ntp" rules={[{ required: true, message: 'Please enter your NTP server' }]}>
              <Input className={styles.Field} placeholder="Enter NTP server" />
            </Item>
          )}
        </Item>
        <Item label="LED Status">
          <Checkbox onChange={() => setLed(!led)} defaultChecked>
            Show LED indicators on APs
          </Checkbox>
        </Item>

        <Item label="RTLS">
          <Radio.Group defaultValue="disabledRTLS">
            <Radio value="disabledRTLS" onChange={() => setRtls(false)}>
              Disabled
            </Radio>
            <Radio value="enabledRTLS" onChange={() => setRtls(true)}>
              Enabled
            </Radio>
          </Radio.Group>
          {rtls && (
            <>
              <Item
                name="ipAddress"
                rules={[
                  {
                    required: true,
                    message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                  },
                ]}
              >
                <Input className={styles.Field} placeholder="IP Address" />
              </Item>
              <Item
                name="port"
                rules={[{ required: true, message: 'Port expected between 1 - 65535' }]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Port"
                  type="number"
                  min={1}
                  max={65535}
                />
              </Item>
            </>
          )}
        </Item>
        <Item label="Syslog">
          <Radio.Group defaultValue="disabledSyslog">
            <Radio value="disabledSyslog" onChange={() => setSyslog(false)}>
              Disabled
            </Radio>
            <Radio value="enabledSyslog" onChange={() => setSyslog(true)}>
              Enabled
            </Radio>
          </Radio.Group>
          {syslog && (
            <>
              <div className={styles.InlineDiv}>
                <Input
                  className={styles.Field}
                  placeholder="IP Address"
                  rules={[
                    {
                      required: true,
                      message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                    },
                  ]}
                />
                <Input
                  className={styles.Field}
                  placeholder="Enter NTP server"
                  type="number"
                  min={1}
                  max={65535}
                  rules={[{ required: true, message: 'Port expected between 1 - 65535' }]}
                />
              </div>
              <Item
                name="syslogMode"
                rules={[
                  {
                    required: true,
                    message: 'Please select your default syslog mode',
                  },
                ]}
              >
                <Select className={styles.Field} placeholder="Select syslog mode">
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
            </>
          )}
        </Item>
        <Item label="Synthetic Client">
          <Radio.Group defaultValue="disabledClient">
            <Radio value="disabledClient">Disabled</Radio>
            <Radio value="enabledClient">Enabled</Radio>
          </Radio.Group>
        </Item>
        <Item label="Equipment Discovery">
          <Radio.Group defaultValue="disabledEq">
            <Radio value="disabledEq">Disabled</Radio>
            <Radio value="enabledEq">Enabled</Radio>
          </Radio.Group>
        </Item>
      </Card>
      <Card title="Wireless Networks (SSIDs) Enabled on This Profile">
        <Table columns={columns} pagination={false} />
        <Button onClick={() => setAddModal(true)}> Create Wireless Networks</Button>
      </Card>
    </>
  );
};

export default AccessPointForm;
