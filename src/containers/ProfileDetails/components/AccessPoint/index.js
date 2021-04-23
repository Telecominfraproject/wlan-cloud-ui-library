import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Checkbox, Radio, Select, Table, Empty, List } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import ThemeContext from 'contexts/ThemeContext';

import { PROFILES, IP_REGEX } from 'containers/ProfileDetails/constants';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';
import { defaultApProfile } from '../constants';

import FormModal from './components/FormModal';

const MAX_GRE_TUNNELS = 1;
const AccessPointForm = ({
  form,
  details,
  childProfiles,
  ssidProfiles,
  rfProfiles,
  onSearchProfile,
  onFetchMoreProfiles,
  loadingSSIDProfiles,
  loadingRFProfiles,
  handleOnFormChange,
}) => {
  const { radioTypes } = useContext(ThemeContext);
  const { Item } = Form;
  const { Option } = Select;

  const [greModalVisible, setGreModalVisible] = useState(false);
  const [greList, setGreList] = useState(details?.greTunnelConfigurations || []);
  const [ntpServers, setNtpServers] = useState([]);
  const [ntpServerSearch, setNtpServerSearch] = useState('');
  const [ntpServerValidation, setNtpServerValidation] = useState({});

  const currentRfId = useMemo(() => childProfiles.find(i => i.profileType === 'rf')?.id, [
    childProfiles,
  ]);
  const [selectedChildProfiles, setSelectedChildProfiles] = useState(
    childProfiles.filter(i => i.profileType === PROFILES.ssid) || []
  );

  const handleOnChangeSsid = selectedItem => {
    setSelectedChildProfiles([
      ...selectedChildProfiles,
      ssidProfiles.find(i => i.id === selectedItem),
    ]);
    handleOnFormChange();
  };

  const handleRemoveSsid = id => {
    setSelectedChildProfiles(
      selectedChildProfiles.filter(i => parseInt(i.id, 10) !== parseInt(id, 10))
    );
    handleOnFormChange();
  };

  const handleAddGre = values => {
    setGreList([
      ...greList,
      {
        ...values,
      },
    ]);
    setGreModalVisible(false);
    handleOnFormChange();
  };

  const handleRemoveGre = item => {
    setGreList(greList.filter(i => i !== item));
    handleOnFormChange();
  };

  useEffect(() => {
    form.setFieldsValue({
      vlanNative: details?.vlanNative === undefined ? true : details?.vlanNative,
      vlan: details?.vlan || defaultApProfile.vlan,
      ntpServer: {
        auto: details?.ntpServer?.auto ?? defaultApProfile.ntpServer.auto,
        value: details?.ntpServer?.value ?? defaultApProfile.ntpServer.value,
      },
      ledControlEnabled: details?.ledControlEnabled || defaultApProfile.ledControlEnabled,
      rtlsSettings: {
        enabled: details?.rtlsSettings?.enabled ? 'true' : 'false',
        srvHostIp: details?.rtlsSettings?.srvHostIp || defaultApProfile.rtlsSettings.srvHostIp,
        srvHostPort:
          details?.rtlsSettings?.srvHostPort || defaultApProfile.rtlsSettings.srvHostPort,
      },
      syslogRelay: {
        enabled: details?.syslogRelay?.enabled ? 'true' : 'false',
        srvHostIp: details?.syslogRelay?.srvHostIp || defaultApProfile.syslogRelay.srvHostIp,
        srvHostPort: details?.syslogRelay?.srvHostPort || defaultApProfile.syslogRelay.srvHostPort,
        severity: details?.syslogRelay?.severity || defaultApProfile.syslogRelay.severity,
      },
      syntheticClientEnabled: details?.syntheticClientEnabled ? 'true' : 'false',
      rfProfileId: currentRfId,
    });
    setNtpServers(details?.ntpServer?.value?.split(':'));
  }, [form, details]);

  useEffect(() => {
    form.setFieldsValue({
      childProfileIds: selectedChildProfiles.map(i => i.id),
      greTunnelConfigurations: greList,
    });
  }, [selectedChildProfiles, greList]);

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
      title: 'Remote IP Address',
      dataIndex: 'greRemoteInetAddr',
    },
    {
      title: 'VLAN IDs',
      dataIndex: 'vlanIdsInGreTunnel',
      render: items => (!items?.length ? 'N/A' : items?.join(', ')),
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

  const validateNtpServer = (_rule, value) => {
    const ntpServerParts = value.split('.').reverse();

    if (ntpServers.length >= 4) {
      return Promise.reject(new Error('Unable to add more than 4 items to the server list'));
    }

    if (ntpServerParts.length < 2) {
      return Promise.reject(
        new Error('Hostnames must have at least 1 subdomain label. e.g. ntp.pool.org')
      );
    }

    if (!ntpServerParts.every(part => part.length >= 1 && part.length <= 63)) {
      return Promise.reject(new Error('Hostname labels must be between 1 and 63 characters long'));
    }

    if (value.length > 253) {
      return Promise.reject(new Error('Hostnames may not exceed 253 characters in length'));
    }

    if (ntpServers.includes(value)) {
      return Promise.reject(new Error('This item already exists in the server list'));
    }

    // from https://www.regextester.com/23
    if (
      !value.match(
        /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/
      )
    ) {
      return Promise.reject(new Error('Unrecognized hostname'));
    }

    return Promise.resolve();
  };

  const handleOnAddServer = value => {
    validateNtpServer(null, value)
      .then(() => {
        setNtpServers([...ntpServers, value.toLowerCase().trim()]);
        setNtpServerSearch('');
      })
      .catch(() => {});
  };

  const handleOnDeleteServer = item => {
    setNtpServers(ntpServers.filter(i => i !== item));
    handleOnFormChange();
  };

  const handleOnChangeNtpServer = event => {
    setNtpServerSearch(event.target.value);
    validateNtpServer(null, event.target.value)
      .then(() => {
        setNtpServerValidation({
          status: null,
          help: null,
        });
        handleOnFormChange();
      })
      .catch(e => {
        setNtpServerValidation({
          status: 'error',
          help: e.message,
        });
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      ntpServer: {
        value: ntpServers?.join(':'),
      },
    });
  }, [ntpServers]);

  return (
    <div className={styles.ProfilePage}>
      <Card title="LAN and Services ">
        <Item label="Management VLAN" valuePropName="checked" name="vlanNative">
          <Checkbox data-testid="vlanCheckbox">Use Default Management VLAN</Checkbox>
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.vlanNative !== currentValues.vlanNative
          }
        >
          {({ getFieldValue }) => {
            return (
              !getFieldValue('vlanNative') && (
                <Item
                  wrapperCol={{ offset: 5, span: 15 }}
                  name="vlan"
                  rules={[
                    {
                      required: true,
                      message: 'Vlan expected between 2 and 4095',
                    },
                    () => ({
                      validator(_rule, value) {
                        if (
                          !value ||
                          (getFieldValue('vlan') <= 4095 && getFieldValue('vlan') > 1)
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
                    data-testid="vlanInput"
                    className={globalStyles.field}
                    placeholder="2-4095"
                    type="number"
                    min={2}
                    max={4095}
                    maxLength={4}
                  />
                </Item>
              )
            );
          }}
        </Item>
        <Item label="NTP" name={['ntpServer', 'auto']} valuePropName="checked">
          <Checkbox data-testid="ntpCheckbox">Use Default Servers</Checkbox>
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.ntpServer?.auto !== currentValues.ntpServer?.auto
          }
        >
          {({ getFieldValue }) => {
            return (
              !getFieldValue(['ntpServer', 'auto']) && (
                <>
                  <Item
                    rules={[
                      {
                        validator: validateNtpServer,
                      },
                    ]}
                    wrapperCol={{ offset: 5, span: 15 }}
                    validateStatus={ntpServerValidation.status}
                    help={ntpServerValidation.help}
                  >
                    <Input.Search
                      placeholder="Enter NTP server..."
                      enterButton="Add"
                      onSearch={handleOnAddServer}
                      value={ntpServerSearch}
                      onChange={handleOnChangeNtpServer}
                    />
                  </Item>
                  <List
                    className={styles.List}
                    itemLayout="horizontal"
                    dataSource={ntpServers}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <span>
                              <span>
                                No Data Visible.
                                <br />
                                Please enter at least 1 NTP server or use default servers.
                              </span>
                            </span>
                          }
                        />
                      ),
                    }}
                    renderItem={item => (
                      <List.Item
                        extra={
                          <Button type="danger" onClick={() => handleOnDeleteServer(item)}>
                            Remove
                          </Button>
                        }
                      >
                        <List.Item.Meta title={item} />
                      </List.Item>
                    )}
                  />
                  <Item name={['ntpServer', 'value']} hidden>
                    <Input />
                  </Item>
                </>
              )
            );
          }}
        </Item>
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
            <Radio value="false">Disabled</Radio>
            <Radio value="true">Enabled</Radio>
          </Radio.Group>
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.rtlsSettings?.enabled !== currentValues.tlsSettings?.enabled
          }
        >
          {({ getFieldValue }) => {
            return (
              getFieldValue(['rtlsSettings', 'enabled']) === 'true' && (
                <>
                  <Item
                    data-testid="rtlsInputFields"
                    wrapperCol={{ offset: 5, span: 15 }}
                    name={['rtlsSettings', 'srvHostIp']}
                    rules={[
                      {
                        required: true,
                        pattern: IP_REGEX,
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
                    wrapperCol={{ offset: 5, span: 15 }}
                    name={['rtlsSettings', 'srvHostPort']}
                    rules={[
                      {
                        required: true,
                        message: 'Port expected between 1 - 65535',
                      },
                      () => ({
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
                </>
              )
            );
          }}
        </Item>
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
            <Radio value="false">Disabled</Radio>
            <Radio value="true">Enabled</Radio>
          </Radio.Group>
        </Item>
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.syslogRelay?.enabled !== currentValues.syslogRelay?.enabled
          }
        >
          {({ getFieldValue }) => {
            return (
              getFieldValue(['syslogRelay', 'enabled']) === 'true' && (
                <>
                  <Item data-testid="syslogInputFields" wrapperCol={{ offset: 5, span: 15 }}>
                    <div className={styles.InlineDiv}>
                      <Item
                        name={['syslogRelay', 'srvHostIp']}
                        rules={[
                          {
                            required: true,
                            pattern: IP_REGEX,
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
                            required: true,
                            message: 'Port expected between 1 - 65535',
                          },
                          () => ({
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
                  </Item>
                  <Item
                    wrapperCol={{ offset: 5, span: 15 }}
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
                </>
              )
            );
          }}
        </Item>

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
      </Card>
      <Card title="RF Enabled on This Profile">
        <Item name="rfProfileId">
          <Select
            onPopupScroll={e => onFetchMoreProfiles(e, PROFILES.rf)}
            showSearch={onSearchProfile}
            placeholder="Select a RF Profile"
            filterOption={false}
            onSearch={name => onSearchProfile(PROFILES.rf, name)}
            onSelect={() => onSearchProfile && onSearchProfile(PROFILES.rf)}
            loading={loadingRFProfiles}
            notFoundContent={!loadingRFProfiles && <Empty />}
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
            onPopupScroll={e => onFetchMoreProfiles(e, PROFILES.ssid)}
            data-testid="ssidProfile"
            showSearch={onSearchProfile}
            placeholder="Select a SSID Profile"
            filterOption={false}
            onSearch={name => onSearchProfile(PROFILES.ssid, name)}
            onSelect={() => onSearchProfile && onSearchProfile(PROFILES.ssid)}
            loading={loadingSSIDProfiles}
            notFoundContent={!loadingSSIDProfiles && <Empty />}
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
        <Item name="childProfileIds" hidden>
          <Input />
        </Item>
      </Card>

      <Card
        title="GRE Tunnel Configuration"
        extra={
          <>
            {greList.length >= MAX_GRE_TUNNELS && (
              <Tooltip className={styles.ToolTip} title={`Maximum ${MAX_GRE_TUNNELS} GRE Tunnel`} />
            )}
            <Button
              type="solid"
              onClick={() => setGreModalVisible(true)}
              data-testid="addGre"
              disabled={greList.length >= MAX_GRE_TUNNELS}
            >
              Add
            </Button>
          </>
        }
      >
        <Table
          dataSource={greList}
          columns={columnsGre}
          pagination={false}
          rowKey="greTunnelName"
        />
        <Item name="greTunnelConfigurations" noStyle>
          <FormModal
            onSubmit={handleAddGre}
            title="Add GRE Configuration"
            visible={greModalVisible}
            onClose={() => setGreModalVisible(false)}
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
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingSSIDProfiles: PropTypes.bool,
  loadingRFProfiles: PropTypes.bool,
  handleOnFormChange: PropTypes.func,
};

AccessPointForm.defaultProps = {
  form: null,
  details: {},
  childProfiles: [],
  ssidProfiles: [],
  rfProfiles: [],
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingSSIDProfiles: false,
  loadingRFProfiles: false,
  handleOnFormChange: () => {},
};

export default AccessPointForm;
