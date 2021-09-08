import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Form,
  Radio,
  Select as AntdSelect,
  Table,
  Empty,
  List,
  Divider,
  Tag,
  Typography,
} from 'antd';
import WithRoles, {
  RadioGroup as Group,
  Select,
  Input,
  Checkbox,
  RoleProtectedBtn,
  Search,
  Password,
  Upload,
} from 'components/WithRoles';
import {
  DeleteFilled,
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  FormOutlined,
} from '@ant-design/icons';
import ThemeContext from 'contexts/ThemeContext';

import { PROFILES, IP_REGEX, DOMAIN_REGEX } from 'containers/ProfileDetails/constants';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import { formatFile } from 'utils/profiles';
import { sortRadioTypes } from 'utils/sortRadioTypes';
import styles from '../index.module.scss';
import { DEFAULT_AP_PROFILE } from '../constants';

import RfProfileForm from '../RF';
import ProfileSelect from '../ProfileSelect';
import ModalButton from '../ModalButton';
import FormModal from './components/FormModal';
import SSIDForm from '../SSID';

const { Item } = Form;
const { Option } = AntdSelect;
const { Text } = Typography;

const MAX_GRE_TUNNELS = 1;
const MAX_RADIUS_PROXIES = 5;

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
  fileUpload,
  handleOnFormChange,
  loading,
  isModalProfile,
  captiveProfiles,
  radiusProfiles,
  passpointProfiles,
  loadingCaptiveProfiles,
  loadingRadiusProfiles,
  loadingPasspointProfiles,
  onCreateChildProfile,
  onUpdateChildProfile,
  onFetchChildProfile,
  childProfile,
  loadingChildProfile,
}) => {
  const { radioTypes } = useContext(ThemeContext);

  const setInitialNtpServer = () => {
    if (details?.ntpServer) {
      return !details.ntpServer?.auto ? details.ntpServer?.value?.split(':') : [];
    }
    return [];
  };

  const [greModalVisible, setGreModalVisible] = useState(false);
  const [greList, setGreList] = useState(details?.greTunnelConfigurations || []);
  const [ntpServers, setNtpServers] = useState();
  const [ntpServerSearch, setNtpServerSearch] = useState('');
  const [ntpServerValidation, setNtpServerValidation] = useState({});

  const currentRfProfile = useMemo(() => childProfiles.find(i => i.profileType === 'rf'), [
    childProfiles,
  ]);
  const [selectedChildProfiles, setSelectedChildProfiles] = useState(
    childProfiles.filter(i => i.profileType === PROFILES.ssid) || []
  );

  const [certFiles, setCertFiles] = useState({});

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
    const sortedProxyConfigurations = details?.radiusProxyConfigurations
      ?.slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    setCertFiles(
      sortedProxyConfigurations?.reduce(
        (prev, curr, index) => ({
          ...prev,
          [`caCert${index}`]: curr.caCert ? [formatFile(curr.caCert)] : [],
          [`clientCert${index}`]: curr.clientCert ? [formatFile(curr.clientCert)] : [],
          [`clientKey${index}`]: curr.clientKey ? [formatFile(curr.clientKey)] : [],
        }),
        {}
      )
    );

    form.setFieldsValue({
      ntpServer: {
        auto: details?.ntpServer?.auto ?? DEFAULT_AP_PROFILE.ntpServer.auto,
      },
      ledControlEnabled: details?.ledControlEnabled || DEFAULT_AP_PROFILE.ledControlEnabled,
      rtlsSettings: {
        enabled: details?.rtlsSettings?.enabled ? 'true' : 'false',
        srvHostIp: details?.rtlsSettings?.srvHostIp || DEFAULT_AP_PROFILE.rtlsSettings.srvHostIp,
        srvHostPort:
          details?.rtlsSettings?.srvHostPort || DEFAULT_AP_PROFILE.rtlsSettings.srvHostPort,
      },
      syslogRelay: {
        enabled: details?.syslogRelay?.enabled ? 'true' : 'false',
        srvHostIp: details?.syslogRelay?.srvHostIp || DEFAULT_AP_PROFILE.syslogRelay.srvHostIp,
        srvHostPort:
          details?.syslogRelay?.srvHostPort || DEFAULT_AP_PROFILE.syslogRelay.srvHostPort,
        severity: details?.syslogRelay?.severity || DEFAULT_AP_PROFILE.syslogRelay.severity,
      },
      syntheticClientEnabled: details?.syntheticClientEnabled ? 'true' : 'false',
      rfProfileId: {
        value: currentRfProfile?.id || null,
        label: currentRfProfile?.name || null,
      },
      radiusProxyConfigurations: sortedProxyConfigurations?.map(config => ({
        ...config,
        acctPort: config?.acctPort > 0 ? config.acctPort : null,
        useAccounting: !!config.acctServer,
        useRadSec: config.useRadSec.toString(),
        dynamicDiscovery: config.dynamicDiscovery.toString(),
        caCert: config.caCert ? { file: formatFile(config.caCert) } : null,
        clientCert: config.clientCert ? { file: formatFile(config.clientCert) } : null,
        clientKey: config.clientKey ? { file: formatFile(config.clientKey) } : null,
      })),
    });

    setNtpServers(setInitialNtpServer());
  }, [form, details]);

  useEffect(() => {
    form.setFieldsValue({
      childProfileIds: selectedChildProfiles.map(i => i.id),
      selectedSsidProfiles: selectedChildProfiles,
      greTunnelConfigurations: greList,
    });
  }, [selectedChildProfiles, greList]);

  useEffect(() => {
    setSelectedChildProfiles(
      selectedChildProfiles.map(profile =>
        parseInt(profile.id, 10) === parseInt(childProfile.id, 10) ? childProfile : profile
      )
    );
  }, [childProfile]);
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
      render: appliedRadios =>
        sortRadioTypes([...appliedRadios])
          ?.map(i => radioTypes?.[i])
          ?.join(',  '),
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <ModalButton
          profileId={record.id}
          profileType={PROFILES.ssid}
          title={`Edit ${record?.name}`}
          content={SSIDForm}
          contentProps={{
            captiveProfiles,
            radiusProfiles,
            passpointProfiles,
            loadingCaptiveProfiles,
            loadingRadiusProfiles,
            loadingPasspointProfiles,
            onSearchProfile,
            onFetchMoreProfiles,
          }}
          icon={<FormOutlined />}
          tooltipTitle="Edit Profile"
          onSubmit={onUpdateChildProfile}
          form={form}
          handleOnFormChange={handleOnFormChange}
          onFetchChildProfile={onFetchChildProfile}
          childProfile={childProfile}
          loadingChildProfile={loadingChildProfile}
        />
      ),
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <RoleProtectedBtn
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
        <RoleProtectedBtn
          title="removeGre"
          icon={<DeleteFilled />}
          onClick={() => {
            handleRemoveGre(item);
          }}
        />
      ),
    },
  ];

  const enabledRadioOptions = options => {
    return (
      <Group {...options}>
        <Radio value="false">Disabled</Radio>
        <Radio value="true">Enabled</Radio>
      </Group>
    );
  };
  const handleOnFileChange = fileList => {
    let list = [...fileList];

    list = list.slice(-1);
    list = list.map(i => ({ ...i, url: i?.response?.url }));

    return list;
  };

  const handleFileUpload = file => {
    fileUpload(file.name, file);
    return false;
  };

  const handleOnChangeCertFile = (fileList, key) => {
    const list = handleOnFileChange(fileList);
    if (list) setCertFiles({ ...certFiles, [key]: list });
  };

  const selectedChildProfilesByRadio = useMemo(() => {
    const result = {
      is2dot4GHz: [],
      is5GHz: [],
      is5GHzU: [],
      is5GHzL: [],
    };

    selectedChildProfiles.forEach(profile => {
      profile.details.appliedRadios.forEach(appliedRadio => {
        result[appliedRadio].push(profile);
      });
    });

    return result;
  }, [selectedChildProfiles]);

  const filteredOptions = ssidProfiles.filter(
    i => !selectedChildProfiles.map(ssid => parseInt(ssid.id, 10)).includes(parseInt(i.id, 10))
  );

  const isProfileDisabled = appliedRadios => {
    let result = false;
    appliedRadios.forEach(radio => {
      if (selectedChildProfilesByRadio[radio].length >= 8) result = true;
    });
    return result;
  };

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

    if (!value.match(DOMAIN_REGEX)) {
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

  const onChangeRadSec = (e, index) => {
    const fields = form.getFieldValue(['radiusProxyConfigurations']);

    form.setFieldsValue({
      radiusProxyConfigurations: fields.map((field, i) => {
        if (i === index) {
          return e.target.value === 'true'
            ? { ...fields[index], port: 2083, acctPort: 2083 }
            : { ...fields[index], port: 1812, acctPort: 1813 };
        }
        return field;
      }),
    });
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="LAN and Services" loading={loading}>
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
                    <Search
                      placeholder="Enter NTP server..."
                      enterButton="Add"
                      onSearch={handleOnAddServer}
                      value={ntpServerSearch}
                      onChange={handleOnChangeNtpServer}
                    />
                  </Item>
                  {ntpServers?.length > 0 && (
                    <List
                      className={styles.List}
                      itemLayout="horizontal"
                      dataSource={ntpServers}
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
                  )}

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
          {enabledRadioOptions({ disabled: true })}
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
                      placeholder="Enter SRV IP Address"
                      data-testid="svrIpAdress"
                      addonBefore="SVR IP Address"
                    />
                  </Item>
                  <Item
                    wrapperCol={{ offset: 5, span: 15 }}
                    name={['rtlsSettings', 'srvHostPort']}
                    rules={[
                      {
                        required: true,
                        message: 'Port can be a number between 1 and 65535',
                      },
                      () => ({
                        validator(_rule, value) {
                          if (!value || getFieldValue(['rtlsSettings', 'srvHostPort']) < 65535) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Port can be a number between 1 and 65535')
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Enter SRV Port"
                      type="number"
                      min={1}
                      max={65535}
                      data-testid="svrPort"
                      addonBefore="SVR Port"
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
          {enabledRadioOptions()}
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
                        <Input
                          placeholder="Enter Syslog IP Address"
                          addonBefore="Syslog IP Address"
                        />
                      </Item>
                      <Item
                        name={['syslogRelay', 'srvHostPort']}
                        rules={[
                          {
                            required: true,
                            message: 'Port can be a number between 1 and 65535',
                          },
                          () => ({
                            validator(_rule, value) {
                              if (!value || getFieldValue(['syslogRelay', 'srvHostPort']) < 65535) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error('Port can be a number between 1 and 65535')
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input
                          placeholder="Enter Syslog Port"
                          type="number"
                          min={1}
                          max={65535}
                          addonBefore="Syslog Port"
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
                    <Select data-testid="select" placeholder="Select Syslog Mode">
                      <Option value="DEBUG">Debug (DEBUG)</Option>
                      <Option value="INFO">Info. (INFO)</Option>
                      <Option value="NOTICE">Notice (NOTICE)</Option>
                      <Option value="WARING">Warning (WARNING)</Option>
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
      <Card title="RF Enabled on This Profile" loading={loading}>
        <ProfileSelect
          name="rfProfileId"
          profileType={PROFILES.rf}
          profiles={rfProfiles}
          onSearchProfile={onSearchProfile}
          onFetchMoreProfiles={onFetchMoreProfiles}
          loadingProfiles={loadingRFProfiles}
          content={RfProfileForm}
          currentProfileId={currentRfProfile.id}
          onUpdateChildProfile={onUpdateChildProfile}
          onCreateChildProfile={onCreateChildProfile}
          isModalProfile={isModalProfile}
          form={form}
          handleOnFormChange={handleOnFormChange}
          onFetchChildProfile={onFetchChildProfile}
          childProfile={childProfile}
          loadingChildProfile={loadingChildProfile}
        />
      </Card>
      <Card title="Wireless Networks (SSIDs) Enabled on This Profile" loading={loading}>
        <Item>
          <div className={styles.SelectContainer}>
            <Select
              onPopupScroll={e => onFetchMoreProfiles(e, PROFILES.ssid)}
              data-testid="ssidProfile"
              showSearch={onSearchProfile}
              placeholder="Select a SSID profile"
              filterOption={false}
              onSearch={name => onSearchProfile(PROFILES.ssid, name)}
              onSelect={() => onSearchProfile && onSearchProfile(PROFILES.ssid)}
              loading={loadingSSIDProfiles}
              notFoundContent={!loadingSSIDProfiles && <Empty />}
              onChange={handleOnChangeSsid}
              value="Select a SSID profile"
            >
              {filteredOptions.map(i => (
                <Option
                  key={i.id}
                  value={i.id}
                  disabled={isProfileDisabled(i?.details?.appliedRadios)}
                >
                  {i.name}
                </Option>
              ))}
            </Select>
            <ModalButton
              profileType={PROFILES.ssid}
              content={SSIDForm}
              contentProps={{
                captiveProfiles,
                radiusProfiles,
                passpointProfiles,
                loadingCaptiveProfiles,
                loadingRadiusProfiles,
                loadingPasspointProfiles,
                onSearchProfile,
                onFetchMoreProfiles,
              }}
              onSubmit={onCreateChildProfile}
              form={form}
              handleOnFormChange={handleOnFormChange}
            />
          </div>
        </Item>
        <div style={{ marginBottom: 8 }}>
          <Text>Max 8 per radio: </Text>
          {Object.keys(radioTypes).map(radio => (
            <Tag
              key={radio}
              color={selectedChildProfilesByRadio[radio].length < 8 ? 'processing' : 'error'}
            >
              {radioTypes[radio]}: {selectedChildProfilesByRadio[radio].length}
            </Tag>
          ))}
        </div>
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
        loading={loading}
        extra={
          <WithRoles>
            <>
              {greList.length >= MAX_GRE_TUNNELS && (
                <Tooltip
                  className={styles.ToolTip}
                  title={`Maximum ${MAX_GRE_TUNNELS} GRE Tunnel`}
                />
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
          </WithRoles>
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
      <Form.List name="radiusProxyConfigurations">
        {(fields, { add, remove }) => (
          <Card
            title="RADIUS Proxy Configuration"
            loading={loading}
            bodyStyle={{ padding: fields.length <= 0 && '0' }}
            extra={
              <WithRoles>
                {fields.length >= MAX_RADIUS_PROXIES && (
                  <Tooltip
                    className={styles.ToolTip}
                    title={`Maximum ${MAX_RADIUS_PROXIES} RADIUS Proxies`}
                  />
                )}
                <Button
                  type="solid"
                  onClick={() => {
                    add();
                  }}
                  data-testid="addProxy"
                  disabled={fields.length >= MAX_RADIUS_PROXIES}
                >
                  Add
                </Button>
              </WithRoles>
            }
          >
            {fields.map(field => (
              <div key={field.name}>
                <Divider orientation="left"> Proxy Configuration {field.name + 1}</Divider>
                <Item
                  name={[field.name, 'useRadSec']}
                  label="RADSEC"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your RADSEC setting',
                    },
                  ]}
                  initialValue="true"
                >
                  {enabledRadioOptions({ onChange: e => onChangeRadSec(e, field.name) })}
                </Item>

                <Item
                  name={[field.name, 'server']}
                  label="Authentication Server"
                  rules={[
                    {
                      required: true,
                      pattern: IP_REGEX,
                      message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Enter Server" />
                </Item>
                <Item
                  name={[field.name, 'port']}
                  label="Authentication Port"
                  rules={[
                    {
                      required: true,
                      message: 'Port can be a number between 1 and 65535',
                    },
                    () => ({
                      validator(_rule, value) {
                        if (!value || (value > 0 && value < 65535)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Port can be a number between 1 and 65535')
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                  initialValue="2083"
                >
                  <Input
                    placeholder="Enter Authentication Port"
                    type="number"
                    min={1}
                    max={65535}
                  />
                </Item>
                <Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.radiusProxyConfigurations?.[field.name]?.useRadSec !==
                    currentValues.radiusProxyConfigurations?.[field.name]?.useRadSec
                  }
                >
                  {({ getFieldValue }) => {
                    return (
                      getFieldValue(['radiusProxyConfigurations', field.name, 'useRadSec']) ===
                        'false' && (
                        <Item
                          name={[field.name, 'sharedSecret']}
                          label="Authentication Shared Secret"
                          rules={[
                            {
                              required: true,
                              message: 'Authentication Shared Secret is required',
                            },
                          ]}
                        >
                          <Password placeholder="Enter Authentication Shared Secret" />
                        </Item>
                      )
                    );
                  }}
                </Item>

                <Item
                  label="RADIUS Accounting"
                  name={[field.name, 'useAccounting']}
                  valuePropName="checked"
                  initialValue
                >
                  <Checkbox>Use RADIUS Accounting Server</Checkbox>
                </Item>

                <Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.radiusProxyConfigurations?.[field.name]?.useAccounting !==
                    currentValues.radiusProxyConfigurations?.[field.name]?.useAccounting
                  }
                >
                  {({ getFieldValue }) => {
                    return (
                      getFieldValue(['radiusProxyConfigurations', field.name, 'useAccounting']) && (
                        <>
                          <Item wrapperCol={{ offset: 5, span: 15 }}>
                            <div className={styles.InlineDiv}>
                              <Item
                                name={[field.name, 'acctServer']}
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
                                  placeholder="Enter Accounting Server"
                                  addonBefore="Accounting Server"
                                />
                              </Item>
                              <Item
                                name={[field.name, 'acctPort']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Accounting Port is required',
                                  },
                                  () => ({
                                    validator(_rule, value) {
                                      if (!value || (value > 0 && value < 65535)) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error('Port can be a number between 1 and 65535')
                                      );
                                    },
                                  }),
                                ]}
                                hasFeedback
                                initialValue="2083"
                              >
                                <Input
                                  placeholder="Enter Accounting Port"
                                  type="number"
                                  min={1}
                                  max={65535}
                                  addonBefore="Accounting Port"
                                />
                              </Item>
                            </div>
                          </Item>
                          <Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.radiusProxyConfigurations?.[field.name]?.useRadSec !==
                              currentValues.radiusProxyConfigurations?.[field.name]?.useRadSec
                            }
                          >
                            {() => {
                              return (
                                getFieldValue([
                                  'radiusProxyConfigurations',
                                  field.name,
                                  'useRadSec',
                                ]) === 'false' && (
                                  <Item
                                    wrapperCol={{ offset: 5, span: 15 }}
                                    name={[field.name, 'acctSharedSecret']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Accounting Shared Secret is required',
                                      },
                                    ]}
                                  >
                                    <Password
                                      placeholder="Enter Accounting Shared Secret"
                                      addonBefore="Accounting Shared Secret"
                                    />
                                  </Item>
                                )
                              );
                            }}
                          </Item>
                        </>
                      )
                    );
                  }}
                </Item>

                <Item label="Realm">
                  <Form.List name={[field.name, 'realm']} initialValue={['']}>
                    {(realmFields, { add: addRealm, remove: removeRealm }) => {
                      return (
                        <>
                          {realmFields.map(realm => (
                            <div key={realm.name}>
                              <Item
                                name={realm.name}
                                dependencies={fields.map(item => [
                                  'radiusProxyConfigurations',
                                  item.name,
                                  'realm',
                                ])}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Realm Domain is required',
                                  },
                                  {
                                    pattern: DOMAIN_REGEX,
                                    message: 'Enter a valid Realm Domain',
                                  },
                                  () => ({
                                    validator(_rule, value) {
                                      const domains = fields.flatMap(item =>
                                        form.getFieldValue([
                                          'radiusProxyConfigurations',
                                          item.name,
                                          'realm',
                                        ])
                                      );

                                      const occurence = domains.filter(item => item === value)
                                        .length;

                                      if (!value || occurence <= 1) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error(
                                          'Realm domains across all RADIUS Proxy Configurations must be unique'
                                        )
                                      );
                                    },
                                  }),
                                ]}
                              >
                                <Input
                                  placeholder={`Enter Realm ${realm.name + 1}`}
                                  addonAfter={
                                    realmFields.length > 1 && (
                                      <MinusCircleOutlined
                                        data-testid={`removeRealm${realm.name}`}
                                        onClick={() => removeRealm(realm.name)}
                                      />
                                    )
                                  }
                                />
                              </Item>
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => addRealm()}>
                            <PlusOutlined /> Add Realm
                          </Button>
                        </>
                      );
                    }}
                  </Form.List>
                </Item>
                <Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.radiusProxyConfigurations?.[field.name]?.realm !==
                    currentValues.radiusProxyConfigurations?.[field.name]?.realm
                  }
                >
                  {({ getFieldValue }) => {
                    const wildCardUsed = getFieldValue([
                      'radiusProxyConfigurations',
                      field.name,
                      'realm',
                    ])?.some(i => i === '*');

                    return (
                      wildCardUsed && (
                        <Item
                          name={[field.name, 'dynamicDiscovery']}
                          label="Auto Discovery"
                          rules={[
                            {
                              required: true,
                              message: 'Please select your Auto Discovery setting',
                            },
                          ]}
                          initialValue="true"
                        >
                          {enabledRadioOptions()}
                        </Item>
                      )
                    );
                  }}
                </Item>

                <Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.radiusProxyConfigurations?.[field.name]?.useRadSec !==
                    currentValues.radiusProxyConfigurations?.[field.name]?.useRadSec
                  }
                >
                  {({ getFieldValue }) => {
                    const radSecUsed =
                      getFieldValue(['radiusProxyConfigurations', field.name, 'useRadSec']) ===
                      'true';

                    return (
                      radSecUsed && (
                        <>
                          <Item
                            name={[field.name, 'caCert']}
                            label="CA Certification"
                            rules={[
                              {
                                required: true,
                                message: 'CA Certification file is required',
                              },
                            ]}
                            tooltip="PEM File"
                          >
                            <Upload
                              data-testid={`caCertFile${field.key}`}
                              accept=".pem"
                              fileList={certFiles?.[`caCert${field.key}`]}
                              beforeUpload={handleFileUpload}
                              onChange={({ fileList }) =>
                                handleOnChangeCertFile(fileList, `caCert${field.key}`)
                              }
                              showUploadList={{
                                showRemoveIcon: false,
                              }}
                            >
                              <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                          </Item>

                          <Item
                            name={[field.name, 'clientCert']}
                            label="Client Certification"
                            tooltip="PEM File"
                          >
                            <Upload
                              data-testid={`clientCertFile${field.key}`}
                              accept=".pem"
                              fileList={certFiles?.[`clientCert${field.key}`]}
                              beforeUpload={handleFileUpload}
                              onChange={({ fileList }) =>
                                handleOnChangeCertFile(fileList, `clientCert${field.key}`)
                              }
                              showUploadList={{
                                showRemoveIcon: false,
                              }}
                            >
                              <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                          </Item>

                          <Item
                            name={[field.name, 'clientKey']}
                            label="Client Key"
                            tooltip="KEY File"
                          >
                            <Upload
                              accept=".key"
                              data-testid={`clientKeyFile${field.key}`}
                              fileList={certFiles?.[`clientKey${field.key}`]}
                              beforeUpload={handleFileUpload}
                              onChange={({ fileList }) =>
                                handleOnChangeCertFile(fileList, `clientKey${field.key}`)
                              }
                              showUploadList={{
                                showRemoveIcon: false,
                              }}
                            >
                              <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                          </Item>
                          <Item name={[field.name, 'passphrase']} label="Certificate Passphrase">
                            <Password placeholder="Enter Passphrase" />
                          </Item>
                        </>
                      )
                    );
                  }}
                </Item>
                <RoleProtectedBtn
                  className={styles.RadiusDelete}
                  data-testid={`removeProxy${field.name}`}
                  type="danger"
                  onClick={() => {
                    remove(field.name);
                  }}
                >
                  Remove
                </RoleProtectedBtn>
              </div>
            ))}
          </Card>
        )}
      </Form.List>
      <Item name="selectedSsidProfiles" hidden>
        <Input />
      </Item>
    </div>
  );
};

AccessPointForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
  childProfiles: PropTypes.instanceOf(Array),
  ssidProfiles: PropTypes.instanceOf(Array),
  rfProfiles: PropTypes.instanceOf(Array),
  captiveProfiles: PropTypes.instanceOf(Array),
  radiusProfiles: PropTypes.instanceOf(Array),
  passpointProfiles: PropTypes.instanceOf(Array),
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingSSIDProfiles: PropTypes.bool,
  loadingRFProfiles: PropTypes.bool,
  loadingCaptiveProfiles: PropTypes.bool,
  loadingRadiusProfiles: PropTypes.bool,
  loadingPasspointProfiles: PropTypes.bool,
  handleOnFormChange: PropTypes.func,
  fileUpload: PropTypes.func,
  loading: PropTypes.bool,
  onCreateChildProfile: PropTypes.func,
  onUpdateChildProfile: PropTypes.func,
  isModalProfile: PropTypes.bool,
  childProfile: PropTypes.instanceOf(Object),
  loadingChildProfile: PropTypes.bool,
  onFetchChildProfile: PropTypes.func,
};

AccessPointForm.defaultProps = {
  form: null,
  details: {},
  childProfiles: [],
  ssidProfiles: [],
  rfProfiles: [],
  captiveProfiles: [],
  radiusProfiles: [],
  passpointProfiles: [],
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingSSIDProfiles: false,
  loadingRFProfiles: false,
  loadingCaptiveProfiles: false,
  loadingRadiusProfiles: false,
  loadingPasspointProfiles: false,
  handleOnFormChange: () => {},
  fileUpload: () => {},
  loading: false,
  onCreateChildProfile: () => {},
  onUpdateChildProfile: () => {},
  isModalProfile: false,
  childProfile: {},
  loadingChildProfile: false,
  onFetchChildProfile: () => {},
};

export default AccessPointForm;
