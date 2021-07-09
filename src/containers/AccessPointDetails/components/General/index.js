import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  Form,
  Table,
  Collapse,
  Select as AntdSelect,
  notification,
  Alert,
  Empty,
} from 'antd';
import { Input, Select, RoleProtectedBtn } from 'components/WithRoles';
import _ from 'lodash';
import ThemeContext from 'contexts/ThemeContext';
import DisabledText from 'components/DisabledText';
import Tooltip from 'components/Tooltip';

import { sortRadioTypes } from 'utils/sortRadioTypes';
import { pageLayout } from 'utils/form';
import {
  USER_FRIENDLY_RATES,
  USER_FRIENDLY_BANDWIDTHS,
  ALLOWED_CHANNELS_STEP,
  MAX_CHANNEL_WIDTH_40MHZ_OR_80MHZ,
  MAX_CHANNEL_WIDTH_160MHZ,
} from './constants';

import styles from '../../index.module.scss';

const { Item } = Form;
const { Panel } = Collapse;

const { Option } = AntdSelect;

const General = ({
  data,
  profiles,
  handleOnEquipmentSave,
  handleOnFormChange,
  loadingProfiles,
  errorProfiles,
  onFetchMoreProfiles,
  onSearchProfile,
  extraFields,
  extraGeneralCards,
  isFormDirty,
}) => {
  const { radioTypes, routes } = useContext(ThemeContext);
  const history = useHistory();

  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Wireless Network',
      dataIndex: 'name',
      key: 'network',
    },
    {
      title: 'SSID',
      dataIndex: ['details', 'ssid'],
      key: 'ssid',
    },
    {
      title: 'Security Mode',
      dataIndex: ['details', 'secureMode'],
      key: 'security',
    },
    {
      title: 'Radio(s)',
      dataIndex: ['details', 'appliedRadios'],
      key: 'radios',
      render: appliedRadios => appliedRadios?.map(i => radioTypes?.[i])?.join(',  '),
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState(data.profile);

  const childProfiles = useMemo(() => {
    const result = {
      rf: [],
      ssid: [],
    };
    if (selectedProfile?.childProfiles) {
      selectedProfile.childProfiles.forEach(profile => {
        if (profile?.details?.profileType === 'rf') {
          result.rf.push(profile);
        } else if (profile?.details?.profileType === 'ssid') {
          result.ssid.push(profile);
        }
      });
    }
    return result;
  }, [selectedProfile]);

  const handleProfileChange = value => {
    const i = profiles.find(o => {
      return o.id === value;
    });
    setSelectedProfile(i);
  };

  const {
    id,
    equipmentType,
    inventoryId,
    customerId,
    locationId,
    latitude,
    longitude,
    serial,
    lastModifiedTimestamp,
    details: { advancedRadioMap = {}, radioMap = {} } = {},
  } = data;

  useEffect(() => {
    if (data?.details) {
      const currentRadios = Object.keys(advancedRadioMap);
      const formData = {
        advancedRadioMap: {},
        radioMap: {},
      };

      currentRadios.forEach(radio => {
        const isEnabled = childProfiles.rf?.[0]?.details?.rfConfigMap[radio].autoChannelSelection;
        formData.advancedRadioMap[radio] = {
          radioAdminState: advancedRadioMap[radio]?.radioAdminState || 'disabled',
          deauthAttackDetection: advancedRadioMap[radio]?.deauthAttackDetection ? 'true' : 'false',
          uapsdState: advancedRadioMap[radio]?.uapsdState || 'disabled',
          managementRate: {
            value: advancedRadioMap[radio]?.managementRate?.value || 'rate1mbps',
          },
          multicastRate: {
            value: advancedRadioMap[radio]?.multicastRate?.value || 'rate6mbps',
          },
          bestApSettings: {
            value: {
              dropInSnrPercentage:
                advancedRadioMap[radio]?.bestApSettings?.value?.dropInSnrPercentage || 0,
              minLoadFactor: advancedRadioMap[radio]?.bestApSettings?.value?.minLoadFactor || 0,
            },
          },
        };

        formData.radioMap[radio] = {
          rxCellSizeDb: {
            value: radioMap[radio]?.rxCellSizeDb?.value || 0,
          },
          [isEnabled ? 'channelNumber' : 'manualChannelNumber']: isEnabled
            ? radioMap[radio]?.channelNumber
            : radioMap[radio]?.manualChannelNumber,

          [isEnabled ? 'backupChannelNumber' : 'manualBackupChannelNumber']: isEnabled
            ? radioMap[radio]?.backupChannelNumber
            : radioMap[radio]?.manualBackupChannelNumber,

          probeResponseThresholdDb: {
            value: radioMap[radio]?.probeResponseThresholdDb?.value || 0,
          },
          clientDisconnectThresholdDb: {
            value: radioMap[radio]?.clientDisconnectThresholdDb?.value || 0,
          },
          eirpTxPower: {
            value: radioMap[radio]?.eirpTxPower?.value || 0,
          },
          perimeterDetectionEnabled: radioMap[radio]?.perimeterDetectionEnabled ? 'true' : 'false',
        };
      });

      form.setFieldsValue({ ...formData });
    }
  }, [data]);

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => {
        const formattedData = _.merge({}, data.details, values);

        const formatSourceSelection = radioMapKey =>
          Object.keys(formattedData?.[radioMapKey]).forEach(i =>
            Object.keys(formattedData?.[radioMapKey][i]).forEach(j => {
              if (
                formattedData?.[radioMapKey][i][j]?.source &&
                !_.isEqual(
                  formattedData?.[radioMapKey][i][j]?.value,
                  data?.details?.[radioMapKey]?.[i]?.[j]?.value
                )
              ) {
                // eslint-disable-next-line no-param-reassign
                formattedData[radioMapKey][i][j].source = 'manual';
              }
            })
          );

        formatSourceSelection('advancedRadioMap');
        formatSourceSelection('radioMap');

        handleOnEquipmentSave({
          id,
          equipmentType,
          inventoryId,
          customerId,
          profileId: selectedProfile?.id,
          locationId,
          name: values.access,
          baseMacAddress: data?.baseMacAddress,
          latitude,
          longitude,
          serial,
          lastModifiedTimestamp,
          formattedData,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Equipment settings could not be updated.',
        });
      });
  };

  const defaultOptions = (
    <Select className={styles.Field}>
      <Option value="enabled">Enabled</Option>
      <Option value="disabled">Disabled</Option>
    </Select>
  );

  const defaultOptionsBoolean = (
    <Select className={styles.Field}>
      <Option value="true">Enabled</Option>
      <Option value="false">Disabled</Option>
    </Select>
  );

  const renderItem = (label, obj = {}, dataIndex, renderInput, options = {}) => {
    if (extraFields.some(field => field.label === label)) {
      return null;
    }
    return (
      <Item label={label} colon={dataIndex !== 'radioType'} key={label}>
        <div className={styles.InlineDiv}>
          {sortRadioTypes(Object.keys(obj)).map(i =>
            renderInput ? (
              renderInput(dataIndex, i, label, options)
            ) : (
              <span key={i} className={styles.spanStyle}>
                {dataIndex === 'radioType'
                  ? radioTypes?.[obj[i]?.[dataIndex]]
                  : obj[i]?.[dataIndex]}
              </span>
            )
          )}
        </div>
      </Item>
    );
  };

  const renderConditionalItem = (label, obj = {}, dataIndex, dependency) => (
    <Item label={label} key={label}>
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(obj)).map(key => {
          const isEnabled = childProfiles.rf?.[0]?.details?.rfConfigMap?.[key]?.[dependency];

          if (isEnabled) {
            return (
              <DisabledText
                key={key}
                value={
                  USER_FRIENDLY_RATES[obj[key]?.[dataIndex]?.value] ||
                  obj[key]?.[dataIndex]?.value ||
                  'N/A'
                }
                title={`The ${radioTypes[key]} radio has "${_.startCase(
                  dependency
                )}" enabled in the RF Profile.`}
                text="Auto"
              />
            );
          }
          return (
            <DisabledText
              key={key}
              value={
                USER_FRIENDLY_RATES[
                  childProfiles.rf?.[0]?.details?.rfConfigMap?.[key]?.[dataIndex]
                ] || childProfiles.rf?.[0]?.details?.rfConfigMap?.[key]?.[dataIndex || 'N/A']
              }
              title={`The ${radioTypes[key]} radio has "${_.startCase(
                dependency
              )}" disabled in the RF Profile.`}
              text="Profile"
            />
          );
        })}
      </div>
    </Item>
  );

  const renderInputItem = (dataIndex, key, label, options = {}) => (
    <Item
      key={options.mapName + key + dataIndex}
      name={[options.mapName, key, ...dataIndex]}
      rules={[
        { required: true, message: options.error },
        ({ getFieldValue }) => ({
          validator(_rule, value) {
            if (
              !value ||
              (getFieldValue([options.mapName, key, ...dataIndex]) <= options.max &&
                getFieldValue([options.mapName, key, ...dataIndex]) >= options.min)
            ) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(options.error));
          },
        }),
      ]}
    >
      <Input
        className={styles.Field}
        placeholder={`Enter ${label} for ${radioTypes[key]}`}
        type="number"
        min={options.min}
        max={options.max}
        addonAfter={options?.addOnText ? options?.addOnText : ''}
      />
    </Item>
  );

  const renderOptionItem = (dataIndex, key, label, options = {}) => {
    return (
      <Item
        key={key + dataIndex}
        name={[options.mapName, key, ...dataIndex]}
        rules={[
          {
            required: true,
            message: `Enter ${label} for ${radioTypes[key]}`,
          },
        ]}
      >
        {typeof options.dropdown === 'function' ? options.dropdown(key) : options.dropdown}
      </Item>
    );
  };

  const renderChannelItem = label => {
    return (
      <Item label={label} colon={false}>
        <div className={styles.InlineDiv}>
          {sortRadioTypes(Object.keys(radioMap)).map(key => {
            const isEnabled = childProfiles.rf?.[0]?.details?.rfConfigMap[key].autoChannelSelection;
            const bandwidth = childProfiles.rf?.[0]?.details?.rfConfigMap[key].channelBandwidth;
            let channel;
            if (label === 'Active Channel') {
              channel = isEnabled
                ? {
                    dataIndex: 'channelNumber',
                    addOnText: (
                      <Tooltip
                        text="Auto"
                        title={`The ${radioTypes[key]} radio has "Auto Channel Selection" enabled in the RF Profile.`}
                      />
                    ),
                  }
                : {
                    dataIndex: 'manualChannelNumber',
                    addOnText: 'Manual',
                    dependencies: ['radioMap', key, 'manualBackupChannelNumber'],
                  };
            }
            if (label === 'Backup Channel') {
              channel = isEnabled
                ? {
                    dataIndex: 'backupChannelNumber',
                    addOnText: (
                      <Tooltip
                        text="Auto"
                        title={`The ${radioTypes[key]} radio has "Auto Channel Selection" enabled in the RF Profile.`}
                      />
                    ),
                  }
                : {
                    dataIndex: 'manualBackupChannelNumber',
                    addOnText: 'Manual',
                    dependencies: ['radioMap', key, 'manualChannelNumber'],
                  };
            }

            const powerLevels = data?.details?.radioMap?.[key]?.allowedChannelsPowerLevels ?? [];

            let allowedChannels = powerLevels
              .filter(item => {
                if (channel.dataIndex === 'manualBackupChannelNumber') {
                  return !item.dfs;
                }
                return item;
              })
              .map(item => item?.channelNumber)
              .sort((a, b) => a - b)
              .filter((__, index) => index % ALLOWED_CHANNELS_STEP[bandwidth] === 0);

            if (bandwidth !== 'is20MHz') {
              allowedChannels = allowedChannels.filter(item => {
                if (bandwidth === 'is160MHz') {
                  return item <= MAX_CHANNEL_WIDTH_160MHZ;
                }
                return item <= MAX_CHANNEL_WIDTH_40MHZ_OR_80MHZ;
              });
            }

            return (
              <Item
                key={`radioMap${key}${channel.dataIndex}`}
                name={['radioMap', key, channel.dataIndex]}
                dependencies={[channel.dependencies]}
                rules={[
                  { required: true, message: `Allowed Channels: ${allowedChannels.join(', ')}` },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!isEnabled) {
                        if (
                          parseInt(getFieldValue(['radioMap', key, 'manualChannelNumber']), 10) ===
                          parseInt(
                            getFieldValue(['radioMap', key, 'manualBackupChannelNumber']),
                            10
                          )
                        ) {
                          return Promise.reject(
                            new Error('Active and backup channels must be different')
                          );
                        }
                        const channelNumber = parseInt(
                          getFieldValue(['radioMap', key, channel.dataIndex]),
                          10
                        );
                        if (!value || allowedChannels.includes(channelNumber)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(`Allowed Channels: ${allowedChannels.join(', ')}`)
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder={`Enter ${label} for ${radioTypes[key]}`}
                  type="number"
                  min={Math.min(...allowedChannels)}
                  max={Math.max(...allowedChannels)}
                  addonAfter={channel.addOnText}
                  disabled={isEnabled}
                />
              </Item>
            );
          })}
        </div>
      </Item>
    );
  };

  const renderBandwidthLabels = () => (
    <Item label="Channel Bandwidth">
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(data?.details?.radioMap ?? {})).map(radio => (
          <DisabledText
            key={radio}
            value={
              USER_FRIENDLY_BANDWIDTHS[
                childProfiles?.rf?.[0]?.details?.rfConfigMap?.[radio].channelBandwidth
              ] ?? 'N/A'
            }
            showTooltip={false}
          />
        ))}
      </div>
    </Item>
  );

  if (errorProfiles) {
    return (
      <Alert
        message="Error"
        description="Failed to load Access Point profiles."
        type="error"
        showIcon
        data-testid="errorProfiles"
      />
    );
  }

  return (
    <Form {...pageLayout} form={form} onValuesChange={handleOnFormChange}>
      <div className={styles.InlineEndDiv}>
        <RoleProtectedBtn
          className={styles.saveButton}
          onClick={handleOnSave}
          type="primary"
          name="save"
          disabled={!isFormDirty}
        >
          Save
        </RoleProtectedBtn>
      </div>

      <Card title="Identity">
        <Item
          label="Access Point Name"
          name="access"
          initialValue={data.name}
          rules={[
            {
              required: true,
              message: 'Enter the Access Point name',
            },
          ]}
        >
          <Input className={styles.Field} placeholder="Enter Access Point Name" />
        </Item>
        <Item label="Model"> {data?.model}</Item>
        <Item label="Serial Number">{data?.serial} </Item>
        <Item label="SKU"> {data?.status?.protocol?.detailsJSON?.reportedSku}</Item>
        <Item label="Country Code"> {data?.status?.protocol?.detailsJSON?.countryCode}</Item>
        <Item label="Ethernet MAC Address">{data?.baseMacAddress}</Item>
        <Item label="Manufacturer"> {data?.manufacturer}</Item>
        <Item label="Asset ID"> {data?.inventoryId}</Item>
      </Card>

      <Card title="Profile">
        <Item
          label="Access Point Profile"
          name="apProfile"
          initialValue={data.profile.name}
          rules={[
            {
              required: true,
              message: 'Please select your Access Point Profile.',
            },
          ]}
        >
          <Select
            className={styles.Field}
            onChange={handleProfileChange}
            placeholder="Select Access Point profile..."
            onPopupScroll={onFetchMoreProfiles}
            showSearch={onSearchProfile}
            filterOption={false}
            onSearch={onSearchProfile}
            onSelect={() => onSearchProfile && onSearchProfile()}
            loading={loadingProfiles}
            notFoundContent={!loadingProfiles && <Empty />}
          >
            {profiles.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="RF Profile">
          <Link to={`${routes.profiles}/${childProfiles.rf?.[0]?.id}`}>
            {childProfiles.rf?.[0]?.name || 'N/A'}
          </Link>
        </Item>
        <Item label="Summary">
          <Item>
            <Table
              rowKey="id"
              scroll={{ x: 'max-content' }}
              dataSource={childProfiles.ssid}
              columns={columns}
              pagination={false}
              rowClassName={styles.Row}
              onRow={record => ({
                onClick: () => {
                  history.push(`${routes.profiles}/${record.id}`);
                },
              })}
            />
          </Item>
        </Item>
      </Card>

      {extraGeneralCards}
      <Collapse expandIconPosition="right">
        <Panel header="Advanced Settings" name="settings">
          {renderItem(' ', data.details.radioMap, 'radioType')}
          <p>Radio Specific Parameters:</p>
          {renderBandwidthLabels()}
          {renderItem('Enable Radio', advancedRadioMap, ['radioAdminState'], renderOptionItem, {
            dropdown: defaultOptions,
            mapName: 'advancedRadioMap',
          })}
          {renderItem(
            'Deauth Attack Detection',
            advancedRadioMap,
            ['deauthAttackDetection'],
            renderOptionItem,
            {
              mapName: 'advancedRadioMap',
              dropdown: defaultOptionsBoolean,
            }
          )}
          {renderItem('UAPSD', advancedRadioMap, ['uapsdState'], renderOptionItem, {
            mapName: 'advancedRadioMap',
            dropdown: defaultOptions,
          })}
          {renderChannelItem('Active Channel')}
          {renderChannelItem('Backup Channel')}
          {extraFields.map(field =>
            renderConditionalItem(field.label, field.obj, field.dataIndex, field.dependencies)
          )}
          {renderItem(
            'Management Rate (Mbps)',
            advancedRadioMap,
            ['managementRate', 'value'],
            renderOptionItem,
            {
              mapName: 'advancedRadioMap',
              dropdown: key => (
                <Select className={styles.Field}>
                  {key === 'is2dot4GHz' && (
                    <>
                      <Option value="rate1mbps">1</Option>
                      <Option value="rate2mbps">2</Option>
                      <Option value="rate5dot5mbps">5.5</Option>
                    </>
                  )}
                  <Option value="rate6mbps">6</Option>
                  <Option value="rate9mbps">9</Option>
                  {key === 'is2dot4GHz' && <Option value="rate11mbps">11</Option>}
                  <Option value="rate12mbps">12</Option>
                  <Option value="rate18mbps">18</Option>
                  <Option value="rate24mbps">24</Option>
                </Select>
              ),
            }
          )}
          {renderItem(
            'Multicast Rate (Mbps)',
            advancedRadioMap,
            ['multicastRate', 'value'],
            renderOptionItem,
            {
              mapName: 'advancedRadioMap',
              dropdown: (
                <Select className={styles.Field}>
                  <Option value="rate6mbps">6</Option>
                  <Option value="rate9mbps">9</Option>
                  <Option value="rate12mbps">12</Option>
                  <Option value="rate18mbps">18</Option>
                  <Option value="rate24mbps">24</Option>
                  <Option value="rate36mbps">36</Option>
                  <Option value="rate48mbps">48</Option>
                  <Option value="rate54mbps">54</Option>
                </Select>
              ),
            }
          )}
          {renderItem(
            'Probe Response Threshold',
            radioMap,
            ['probeResponseThresholdDb', 'value'],
            renderInputItem,
            {
              min: -100,
              max: 100,
              error: '-100 - 100 dBm',
              addOnText: 'dBm',
              mapName: 'radioMap',
            }
          )}
          {renderItem(
            'Client Disconnect Threshold',
            radioMap,
            ['clientDisconnectThresholdDb', 'value'],
            renderInputItem,
            {
              min: -100,
              max: 0,
              error: '-100 - 0 dBm',
              addOnText: 'dBm',
              mapName: 'radioMap',
            }
          )}
          {renderItem('EIRP Tx Power', radioMap, ['eirpTxPower', 'value'], renderInputItem, {
            min: 1,
            max: 32,
            error: '1 - 32 dBm',
            addOnText: 'dBm',
            mapName: 'radioMap',
          })}

          <p>Radio Resource Management:</p>
          {renderItem(
            'Perimeter Detection',
            radioMap,
            ['perimeterDetectionEnabled'],
            renderOptionItem,
            { dropdown: defaultOptionsBoolean, mapName: 'radioMap' }
          )}

          <p>Steering Threshold:</p>
          {renderItem(
            'SNR',
            advancedRadioMap,
            ['bestApSettings', 'value', 'dropInSnrPercentage'],
            renderInputItem,
            {
              min: 0,
              max: 100,
              error: '0 - 100%',
              addOnText: '% Drop',
              mapName: 'advancedRadioMap',
            }
          )}
          {renderItem(
            'Min Load',
            advancedRadioMap,
            ['bestApSettings', 'value', 'minLoadFactor'],
            renderInputItem,
            {
              min: 0,
              max: 100,
              error: '0 - 100%',
              addOnText: '%',
              mapName: 'advancedRadioMap',
            }
          )}
        </Panel>
      </Collapse>
    </Form>
  );
};

General.propTypes = {
  data: PropTypes.instanceOf(Object),
  profiles: PropTypes.instanceOf(Array),
  handleOnEquipmentSave: PropTypes.func,
  handleOnFormChange: PropTypes.func,
  loadingProfiles: PropTypes.bool,
  errorProfiles: PropTypes.instanceOf(Object),
  onFetchMoreProfiles: PropTypes.func,
  onSearchProfile: PropTypes.func,
  extraFields: PropTypes.instanceOf(Array),
  extraGeneralCards: PropTypes.node,
  isFormDirty: PropTypes.bool,
};

General.defaultProps = {
  data: {},
  profiles: [],
  handleOnFormChange: () => {},
  handleOnEquipmentSave: () => {},
  loadingProfiles: true,
  errorProfiles: null,
  onFetchMoreProfiles: () => {},
  onSearchProfile: null,
  extraFields: [],
  extraGeneralCards: null,
  isFormDirty: false,
};

export default General;
