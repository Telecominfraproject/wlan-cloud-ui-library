import React, { useEffect, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Table, Collapse, Select, notification, Alert, Empty } from 'antd';
import _ from 'lodash';
import ThemeContext from 'contexts/ThemeContext';

import Button from 'components/Button';
import { sortRadioTypes } from 'utils/sortRadioTypes';

import styles from '../../index.module.scss';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;

const General = ({
  data,
  profiles,
  handleOnEquipmentSave,
  handleOnFormChange,
  loadingProfiles,
  errorProfiles,
  onFetchMoreProfiles,
  onSearchProfile,
}) => {
  const { radioTypes } = useContext(ThemeContext);
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
      width: 100,
      render: appliedRadios => appliedRadios?.map(i => radioTypes?.[i])?.join(',  '),
    },
  ];

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };

  const [selectedProfile, setSelectedProfile] = useState(data.profile);

  const childProfiles = useMemo(() => {
    const result = {
      rf: [],
      ssid: [],
    };
    if (selectedProfile?.childProfiles) {
      selectedProfile.childProfiles.forEach(profile => {
        if (profile.details.profileType === 'rf') {
          result.rf.push(profile);
        } else if (profile.details.profileType === 'ssid') {
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
      <Option value="enabled">enabled</Option>
      <Option value="disabled">disabled</Option>
    </Select>
  );

  const defaultOptionsBoolean = (
    <Select className={styles.Field}>
      <Option value="true">enabled</Option>
      <Option value="false">disabled</Option>
    </Select>
  );

  const renderItem = (label, obj = {}, dataIndex, renderInput, options = {}) => (
    <Item label={label} colon={false}>
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(obj)).map(i =>
          renderInput ? (
            renderInput(dataIndex, i, label, options)
          ) : (
            <span key={i} className={styles.spanStyle}>
              {dataIndex === 'radioType' ? radioTypes?.[obj[i]?.[dataIndex]] : obj[i]?.[dataIndex]}
            </span>
          )
        )}
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
        placeholder={`Enter ${label} for ${key}`}
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
            message: `Enter ${label} for ${key}`,
          },
        ]}
      >
        {typeof options.dropdown === 'function' ? options.dropdown(key) : options.dropdown}
      </Item>
    );
  };

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
    <Form {...layout} form={form} onValuesChange={handleOnFormChange}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary" name="save">
          Save
        </Button>
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
            showSearch
            filterOption={false}
            onSearch={onSearchProfile}
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

        <Item label="RF Profile">{childProfiles.rf?.[0]?.name || 'N/A'}</Item>
        <Item label="Summary">
          <Item>
            <Table
              rowKey="id"
              scroll={{ x: 'max-content' }}
              dataSource={childProfiles.ssid}
              columns={columns}
              pagination={false}
            />
          </Item>
        </Item>
      </Card>
      <Collapse expandIconPosition="right">
        <Panel header="Advanced Settings" name="settings">
          {renderItem(' ', data.details.radioMap, 'radioType')}
          <p>Radio Specific Parameters:</p>
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
          {renderItem('Active Channel', radioMap, 'channelNumber')}
          {renderItem('Backup Channel', radioMap, 'backupChannelNumber')}
          {renderItem(
            'Management Rate (Mbps)',
            advancedRadioMap,
            ['managementRate', 'value'],
            renderOptionItem,
            {
              mapName: 'advancedRadioMap',
              dropdown: (
                <Select className={styles.Field}>
                  <Option value="rate1mbps">1</Option>
                  <Option value="rate2mbps">2</Option>
                  <Option value="rate5dot5mbps">5.5</Option>
                  <Option value="rate6mbps">6</Option>
                  <Option value="rate9mbps">9</Option>
                  <Option value="rate11mbps">11</Option>
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
          {renderItem('Rx Cell Size', radioMap, ['rxCellSizeDb', 'value'], renderInputItem, {
            min: -100,
            max: 100,
            error: '-100 - 100 dBm',
            addOnText: 'dBm',
            mapName: 'radioMap',
          })}
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
              max: 100,
              error: '-100 - 100 dBm',
              addOnText: 'dBm',
              mapName: 'radioMap',
            }
          )}
          {renderItem('EIRP Tx Power', radioMap, ['eirpTxPower', 'value'], renderInputItem, {
            min: 0,
            max: 100,
            error: '0 - 100 dBm',
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
};

General.defaultProps = {
  data: {},
  profiles: [],
  handleOnFormChange: () => {},
  handleOnEquipmentSave: () => {},
  loadingProfiles: true,
  errorProfiles: null,
  onFetchMoreProfiles: () => {},
  onSearchProfile: () => {},
};

export default General;
