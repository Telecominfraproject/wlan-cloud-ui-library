import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Checkbox, Radio, Select, Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import ThemeContext from 'contexts/ThemeContext';

import Modal from 'components/Modal';
import Button from 'components/Button';
import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';

const AccessPointForm = ({
  form,
  details,
  childProfiles,
  ssidProfiles,
  rfProfiles,
  onFetchMoreProfiles,
  onFetchMoreRfProfiles,
}) => {
  const { radioTypes } = useContext(ThemeContext);
  const { Item } = Form;
  const { Option } = Select;

  const [greModalVisible, setGreModalVisible] = useState(false);
  const [greList, setGreList] = useState(details?.greTunnelConfigurations || []);
  const [greForm] = Form.useForm();

  const [vlan, setVlan] = useState(details?.vlanNative === undefined ? true : details.vlanNative);
  const [ntp, setNTP] = useState(details?.ntpServer?.auto);

  const [rtls, setRtls] = useState(details?.rtlsSettings?.enabled);
  const [syslog, setSyslog] = useState(details?.syslogRelay?.enabled);

  const currentRfId = useMemo(() => childProfiles.find(i => i.profileType === 'rf')?.id, [
    childProfiles,
  ]);
  const [selectedChildProfiles, setSelectdChildProfiles] = useState(
    childProfiles.filter(i => i.profileType === 'ssid') || []
  );

  const handleOnChangeSsid = selectedItem => {
    setSelectdChildProfiles([
      ...selectedChildProfiles,
      ssidProfiles.find(i => i.id === selectedItem),
    ]);
  };

  const handleRemoveSsid = id => {
    setSelectdChildProfiles(
      selectedChildProfiles.filter(i => parseInt(i.id, 10) !== parseInt(id, 10))
    );
  };

  const handleAddGre = () => {
    greForm
      .validateFields()
      .then(values => {
        setGreList([...greList, values]);
        setGreModalVisible(false);
        greForm.resetFields();
      })
      .catch(() => {});
  };

  const handleRemoveGre = item => {
    setGreList([...greList.filter(i => i !== item)]);
  };

  useEffect(() => {
    form.setFieldsValue({
      vlanNative: details?.vlanNative === undefined ? true : details?.vlanNative,
      vlan: details?.vlan,
      ntpServer: {
        auto: details?.ntpServer?.auto,
        value: details?.ntpServer?.value,
      },
      ledControlEnabled: details?.ledControlEnabled,
      rtlsSettings: {
        enabled: details?.rtlsSettings?.enabled ? 'true' : 'false',
        srvHostIp: details?.rtlsSettings?.srvHostIp,
        srvHostPort: details?.rtlsSettings?.srvHostPort,
      },
      syslogRelay: {
        enabled: details?.syslogRelay?.enabled ? 'true' : 'false',
        srvHostIp: details?.syslogRelay?.srvHostIp,
        srvHostPort: details?.syslogRelay?.srvHostPort,
        severity: details?.syslogRelay?.severity || 'DEBUG',
      },
      syntheticClientEnabled: details?.syntheticClientEnabled ? 'true' : 'false',
      equipmentDiscovery: details?.equipmentDiscovery ? 'true' : 'false',
      greTunnelConfigurations: greList,
      rfProfileId: currentRfId,
      childProfileIds: selectedChildProfiles.map(i => i.id),
    });
  }, [form, details, selectedChildProfiles, greList]);

  const columns = [
    {
      title: 'Profile Name',
      dataIndex: 'name',
    },
    {
      title: 'SSID',
      dataIndex: ['details', 'ssid'],
    },
    {
      title: 'Security Mode',
      dataIndex: ['details', 'secureMode'],
    },
    {
      title: 'Radio',
      dataIndex: ['details', 'appliedRadios'],
      render: appliedRadios => appliedRadios?.map(i => radioTypes?.[i])?.join(',  '),
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <Button
          title="removeSsid"
          icon={<DeleteFilled />}
          onClick={() => handleRemoveSsid(record?.id)}
        />
      ),
    },
  ];

  const columnsGre = [
    {
      title: 'Name',
      dataIndex: 'greTunnelName',
    },
    {
      title: 'Parent Interface Name',
      dataIndex: 'greParentIfName',
    },
    {
      title: 'Remote Ip Address',
      dataIndex: 'greRemoteInetAddr',
    },
    {
      title: 'Remote MAC Address',
      dataIndex: ['greRemoteMacAddr', 'addressAsString'],
      render: item => item ?? 'N/A',
    },
    {
      title: '',
      width: 80,
      render: item => (
        <Button
          title="removeGre"
          icon={<DeleteFilled />}
          onClick={() => {
            handleRemoveGre(item);
          }}
        />
      ),
    },
  ];

  const enabledRadioOptions = () => (
    <Radio.Group>
      <Radio value="false">Disabled</Radio>
      <Radio value="true">Enabled</Radio>
    </Radio.Group>
  );

  const filteredOptions = ssidProfiles.filter(
    i => !selectedChildProfiles.map(ssid => parseInt(ssid.id, 10)).includes(parseInt(i.id, 10))
  );

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="LAN and Services ">
        <Item label="Management VLAN" valuePropName="checked" name="vlanNative">
          <Checkbox data-testid="vlanCheckbox" onChange={() => setVlan(!vlan)}>
            Use Default Management VLAN
          </Checkbox>
        </Item>

        {!vlan && (
          <Item label=" " colon={false}>
            <Item
              name="vlan"
              rules={[
                {
                  required: !vlan,
                  message: 'Vlan expected between 2 and 4095',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || (getFieldValue('vlan') <= 4095 && getFieldValue('vlan') > 1)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Vlan expected between 2 and 4095'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                data-testid="vlanInput"
                className={globalStyles.field}
                placeholder="2-4095"
                type="number"
                min={2}
                max={4095}
                maxLength={4}
              />
            </Item>
          </Item>
        )}

        <Item label="NTP" name={['ntpServer', 'auto']} valuePropName="checked">
          <Checkbox data-testid="ntpCheckbox" onChange={() => setNTP(!ntp)}>
            Use Default Servers
          </Checkbox>
        </Item>
        {!ntp && (
          <Item label=" " colon={false}>
            <Item
              name={['ntpServer', 'value']}
              rules={[{ required: !ntp, message: 'Please enter your NTP server' }]}
            >
              <Input className={globalStyles.field} placeholder="Enter NTP server" />
            </Item>
          </Item>
        )}
        <Item label="LED Status" name="ledControlEnabled" valuePropName="checked">
          <Checkbox disabled>Show LED indicators on APs</Checkbox>
        </Item>

        <Item
          label="RTLS"
          name={['rtlsSettings', 'enabled']}
          rules={[
            {
              required: true,
              message: 'Please select your RTLS setting',
            },
          ]}
        >
          <Radio.Group disabled>
            <Radio value="false" onChange={() => setRtls(false)}>
              Disabled
            </Radio>
            <Radio value="true" onChange={() => setRtls(true)}>
              Enabled
            </Radio>
          </Radio.Group>
        </Item>
        {rtls && (
          <>
            <Item data-testid="rtlsInputFields" label=" " colon={false}>
              <Item
                name={['rtlsSettings', 'srvHostIp']}
                rules={[
                  {
                    required: rtls,
                    pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
                    message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                  },
                ]}
                hasFeedback
              >
                <Input
                  className={globalStyles.field}
                  placeholder="IP Address"
                  data-testid="svrIpAdress"
                />
              </Item>
              <Item
                name={['rtlsSettings', 'srvHostPort']}
                rules={[
                  {
                    required: rtls,
                    message: 'Port expected between 1 - 65535',
                  },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue(['rtlsSettings', 'srvHostPort']) < 65535) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Port expected between 1 - 65535'));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input
                  className={globalStyles.field}
                  placeholder="Port"
                  type="number"
                  min={1}
                  max={65535}
                  data-testid="svrPort"
                />
              </Item>
            </Item>
          </>
        )}
        <Item
          label="Syslog"
          name={['syslogRelay', 'enabled']}
          rules={[
            {
              required: true,
              message: 'Please select your Syslog setting',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="false" onChange={() => setSyslog(false)}>
              Disabled
            </Radio>
            <Radio value="true" onChange={() => setSyslog(true)}>
              Enabled
            </Radio>
          </Radio.Group>
        </Item>
        {syslog && (
          <>
            <Item data-testid="syslogInputFields" label=" " colon={false}>
              <div className={styles.InlineDiv}>
                <Item
                  name={['syslogRelay', 'srvHostIp']}
                  rules={[
                    {
                      required: syslog,
                      pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
                      message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={globalStyles.field} placeholder="IP Address" />
                </Item>
                <Item
                  name={['syslogRelay', 'srvHostPort']}
                  rules={[
                    {
                      required: syslog,
                      message: 'Port expected between 1 - 65535',
                    },
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        if (!value || getFieldValue(['syslogRelay', 'srvHostPort']) < 65535) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Port expected between 1 - 65535'));
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input
                    className={globalStyles.field}
                    placeholder="Port"
                    type="number"
                    min={1}
                    max={65535}
                  />
                </Item>
              </div>
              <Item
                name={['syslogRelay', 'severity']}
                rules={[
                  {
                    required: true,
                    message: 'Please select the Syslog mode',
                  },
                ]}
              >
                <Select
                  data-testid="select"
                  className={globalStyles.field}
                  placeholder="Select Syslog Mode"
                >
                  <Option value="DEBUG">Debug (DEBUG)</Option>
                  <Option value="INFO">Info. (INFO)</Option>
                  <Option value="NOTICE">Notice (NOTICE)</Option>
                  <Option value="WARNING">Warning (WARNING)</Option>
                  <Option value="ERR">Error (ERR)</Option>
                  <Option value="CRIT">Critical (CRIT)</Option>
                  <Option value="ALERT">Alert (ALERT)</Option>
                  <Option value="EMERG">Emergency (EMERG)</Option>
                </Select>
              </Item>
            </Item>
          </>
        )}
        <Item
          label="Synthetic Client"
          name="syntheticClientEnabled"
          rules={[
            {
              required: true,
              message: 'Please select your Synthetic Client setting',
            },
          ]}
        >
          {enabledRadioOptions()}
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
          {enabledRadioOptions()}
        </Item>
      </Card>
      <Card title="RF Enabled on This Profile">
        <Item name="rfProfileId">
          <Select
            onPopupScroll={onFetchMoreRfProfiles}
            showSearch
            placeholder="Select a RF Profile"
          >
            {rfProfiles.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Card>
      <Card title="Wireless Networks (SSIDs) Enabled on This Profile">
        <Item>
          <Select
            onPopupScroll={onFetchMoreProfiles}
            data-testid="ssidProfile"
            showSearch
            placeholder="Select a SSID Profile"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={handleOnChangeSsid}
            value="Select a SSID Profile"
          >
            {filteredOptions.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Table
          dataSource={selectedChildProfiles}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
        <Item name="childProfileIds" style={{ display: 'none' }}>
          <Input />
        </Item>
      </Card>

      <Card
        title="GRE Configuration"
        extra={
          <Button type="solid" onClick={() => setGreModalVisible(true)} data-testid="addGre">
            Add
          </Button>
        }
      >
        <Table
          dataSource={greList}
          columns={columnsGre}
          pagination={false}
          rowKey="greTunnelName"
        />
        <Item name="greTunnelConfigurations" noStyle>
          <Modal
            visible={greModalVisible}
            onSuccess={() => handleAddGre()}
            onCancel={() => {
              setGreModalVisible(false);
              greForm.resetFields();
            }}
            title="Add GRE Configuration"
            content={
              <Form form={greForm} {...layout}>
                <Item
                  name="greTunnelName"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Name field cannot be empty',
                    },
                  ]}
                >
                  <Input className={globalStyles.field} placeholder="Enter Name" />
                </Item>
                <Item
                  name="greParentIfName"
                  label="Parent Interface Name"
                  rules={[
                    {
                      required: true,
                      message: 'Parent Interface Name field cannot be empty',
                    },
                  ]}
                >
                  <Input className={globalStyles.field} placeholder="Enter Parent Interface Name" />
                </Item>
                <Item
                  name="greRemoteInetAddr"
                  label="Remote Ip Address"
                  rules={[
                    {
                      required: true,
                      message: 'Remote Ip Address field cannot be empty',
                    },
                    {
                      pattern: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm,
                      message: 'Please enter a valid Ip Address format.',
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={globalStyles.field} placeholder="Enter Remote Ip Address" />
                </Item>
                <Item
                  label="Remote MAC Address"
                  name={['greRemoteMacAddr', 'addressAsString']}
                  rules={[
                    {
                      pattern: /^([0-9a-fA-F]{2}[:]){5}[0-9a-fA-F]{2}$/,
                      message: 'Please enter a valid MAC Address.',
                    },
                  ]}
                  hasFeedback
                >
                  <Input className={globalStyles.field} placeholder="Enter MAC Address" />
                </Item>
              </Form>
            }
          />
        </Item>
      </Card>
    </div>
  );
};

AccessPointForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
  ssidProfiles: PropTypes.instanceOf(Array),
  childProfiles: PropTypes.instanceOf(Array),
  rfProfiles: PropTypes.instanceOf(Array),
  onFetchMoreProfiles: PropTypes.func,
  onFetchMoreRfProfiles: PropTypes.func,
};

AccessPointForm.defaultProps = {
  form: null,
  details: {},
  childProfiles: [],
  ssidProfiles: [],
  rfProfiles: [],
  onFetchMoreProfiles: () => {},
  onFetchMoreRfProfiles: () => {},
};

export default AccessPointForm;
