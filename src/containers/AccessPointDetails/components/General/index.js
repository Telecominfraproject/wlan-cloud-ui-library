import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Table, Collapse, Select, notification, Alert } from 'antd';
import _ from 'lodash';

import Loading from 'components/Loading';
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
}) => {
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
      render: appliedRadios => appliedRadios?.join(',  '),
    },
  ];

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };

  const [selectedProfile, setSelectedProfile] = useState(data.profile);

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
  } = data;

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => {
        const formattedData = _.cloneDeep(data.details);

        Object.keys(formattedData.advancedRadioMap).forEach(radio => {
          Object.keys(formattedData.advancedRadioMap[radio]).forEach(field => {
            if (field === 'bestApSettings') {
              if (`dropInSnrPercentage${radio}` in values) {
                formattedData.advancedRadioMap[radio][field].value.dropInSnrPercentage =
                  values[`dropInSnrPercentage${radio}`];
                if (
                  formattedData.advancedRadioMap[radio][field].value.dropInSnrPercentage !==
                  data.details.advancedRadioMap[radio][field].value.dropInSnrPercentage
                ) {
                  formattedData.advancedRadioMap[radio][field].source = 'manual';
                }
              }

              if (`minLoadFactor${radio}` in values) {
                formattedData.advancedRadioMap[radio][field].value.minLoadFactor =
                  values[`minLoadFactor${radio}`];
                if (
                  formattedData.advancedRadioMap[radio][field].value.minLoadFactor !==
                  data.details.advancedRadioMap[radio][field].value.minLoadFactor
                ) {
                  formattedData.advancedRadioMap[radio][field].source = 'manual';
                }
              }
            } else if (field === 'managementRate') {
              if (`${field}${radio}` in values) {
                formattedData.advancedRadioMap[radio][field].value = values[`${field}${radio}`];

                if (
                  formattedData.advancedRadioMap[radio][field].value !==
                  data.details.advancedRadioMap[radio][field].value
                ) {
                  formattedData.advancedRadioMap[radio][field].source = 'manual';
                }
              }
            } else if (field === 'deauthAttackDetection') {
              if (`${field}${radio}` in values) {
                formattedData.advancedRadioMap[radio][field] =
                  values[`${field}${radio}`] === 'enabled';
              }
            } else if (`${field}${radio}` in values) {
              if (field === 'multicastRate') {
                formattedData.advancedRadioMap[radio][field].value = values[`${field}${radio}`];
              } else {
                formattedData.advancedRadioMap[radio][field] = values[`${field}${radio}`];
              }
            }
          });
        });

        Object.keys(formattedData.radioMap).forEach(radio => {
          Object.keys(formattedData.radioMap[radio]).forEach(field => {
            if (`${field}${radio}` in values) {
              if (field === 'deauthAttackDetection' || field === 'perimeterDetectionEnabled') {
                formattedData.radioMap[radio][field] = values[`${field}${radio}`] === 'enabled';
              } else {
                formattedData.radioMap[radio][field].value = values[`${field}${radio}`];
                if (
                  formattedData.radioMap[radio][field].value !==
                  data.details.radioMap[radio][field].value
                ) {
                  formattedData.radioMap[radio][field].source = 'manual';
                }
              }
            }
          });
        });

        handleOnEquipmentSave({
          id,
          equipmentType,
          inventoryId,
          customerId,
          profileId: selectedProfile?.id,
          locationId,
          name: values.access,
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

  const setInitialValue = (obj = {}, dataIndex, key, options = {}) => {
    const val = options.value
      ? obj[key]?.[options.value]?.value?.[dataIndex] || obj[key]?.[options.value]?.[dataIndex]
      : obj[key]?.[dataIndex];

    if (val === undefined || val === null) {
      return 'disabled';
    }
    if (val === true) {
      return 'enabled';
    }
    if (val === false) {
      return 'disabled';
    }

    return val;
  };

  const renderItem = (label, obj = {}, dataIndex, renderInput, options = {}) => (
    <Item label={label} colon={false}>
      <div className={styles.InlineDiv}>
        {sortRadioTypes(Object.keys(obj)).map(i =>
          renderInput ? (
            renderInput(obj, dataIndex, i, label, options)
          ) : (
            <span key={i} className={styles.spanStyle}>
              {dataIndex ? obj[i]?.[dataIndex] : obj[i]}
            </span>
          )
        )}
      </div>
    </Item>
  );

  const getName = (dataIndex, key, options) => {
    if (dataIndex === 'value') {
      return options.value + key;
    }
    return dataIndex + key;
  };

  const renderOptionItem = (obj = {}, dataIndex, key, label, options = {}) => (
    <Item
      name={getName(dataIndex, key, options)}
      initialValue={setInitialValue(obj, dataIndex, key, options)}
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

  const renderInputItem = (obj = {}, dataIndex, key, label, options = {}) => (
    <Item
      name={getName(dataIndex, key, options)}
      initialValue={setInitialValue(obj, dataIndex, key, options)}
      rules={[
        { required: true, message: options.error },
        ({ getFieldValue }) => ({
          validator(_rule, value) {
            if (
              !value ||
              (getFieldValue(getName(dataIndex, key, options)) <= options.max &&
                getFieldValue(getName(dataIndex, key, options)) >= options.min)
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
      />
    </Item>
  );

  if (loadingProfiles) {
    return <Loading data-testid="loadingProfiles" />;
  }

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
        <Item label="Model"> {data.model}</Item>
        <Item label="Serial Number">{data.serial} </Item>
        <Item label="SKU"> {data.status.protocol.reportedSku}</Item>
        <Item label="Country Code"> {data.status.protocol.countryCode}</Item>
        <Item label="Ethernet MAC Address"> {data.status.protocol.details.reportedMacAddr}</Item>
        <Item label="Manufacturer"> {data.status.protocol.details.manufacturer}</Item>
        <Item label="Asset ID"> {data.inventoryId}</Item>
      </Card>

      <Card title="Profile">
        <Item
          label="Access Point Profile"
          name="apProfile"
          initialValue={data.profile.name}
          rules={[
            {
              required: true,
              message: 'Please select your Access Point Profile city.',
            },
          ]}
        >
          <Select
            className={styles.Field}
            onChange={handleProfileChange}
            placeholder="Select access point profile..."
            onPopupScroll={onFetchMoreProfiles}
          >
            {profiles.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="Summary">
          <Item>
            <Table
              rowKey="id"
              scroll={{ x: true }}
              dataSource={selectedProfile?.childProfiles}
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
          {renderItem(
            'Enable Radio',
            data.details.advancedRadioMap,
            'radioAdminState',
            renderOptionItem,
            { dropdown: defaultOptions }
          )}
          {renderItem(
            'Deauth Attack Detection',
            data.details.advancedRadioMap,
            'deauthAttackDetection',
            renderOptionItem,
            { dropdown: defaultOptions }
          )}
          {renderItem('UAPSD', data.details.advancedRadioMap, 'uapsdState', renderOptionItem, {
            dropdown: defaultOptions,
          })}
          {renderItem('Active Channel', data.details.radioMap, 'channelNumber')}
          {renderItem('Backup Channel', data.details.radioMap, 'backupChannelNumber')}

          {renderItem('Management Rate', data.details.advancedRadioMap, 'value', renderOptionItem, {
            value: 'managementRate',
            dropdown: (
              <Select className={styles.Field}>
                <Option value="auto">auto</Option>
                <Option value="rate1mbps">1 Mbps</Option>
                <Option value="rate2mbps">2 Mbps</Option>
                <Option value="rate5dot5mbps">5.5 Mpbs</Option>
                <Option value="rate6mbps">6 Mbps</Option>
                <Option value="rate9mbps">9 Mpbs</Option>
                <Option value="rate11mbps">11 Mpbs</Option>
                <Option value="rate12mbps">12 Mpbs</Option>
                <Option value="rate18mbps">18 Mpbs</Option>
                <Option value="rate24mbps">24 Mpbs</Option>
              </Select>
            ),
          })}

          {renderItem('Multicast Rate', data.details.advancedRadioMap, 'value', renderOptionItem, {
            value: 'multicastRate',
            dropdown: (
              <Select className={styles.Field}>
                <Option value="auto">auto</Option>
                <Option value="rate6mbps">6 Mbps</Option>
                <Option value="rate9mbps">9 Mbps</Option>
                <Option value="rate12mbps">12 Mpbs</Option>
                <Option value="rate18mbps">18 Mbps</Option>
                <Option value="rate24mbps">24 Mpbs</Option>
                <Option value="rate36mbps">36 Mpbs</Option>
                <Option value="rate48mbps">48 Mpbs</Option>
                <Option value="rate54mbps">54 Mpbs</Option>
              </Select>
            ),
          })}

          {renderItem('Rx Cell Size Db', data.details.radioMap, 'value', renderInputItem, {
            min: -1000,
            max: 1000,
            error: '-1000 - 1000',
            value: 'rxCellSizeDb',
          })}

          {renderItem(
            'Probe Response Threshold Db',
            data.details.radioMap,
            'value',
            renderInputItem,
            {
              min: -1000,
              max: 1000,
              error: '-1000 - 1000',
              value: 'probeResponseThresholdDb',
            }
          )}

          {renderItem(
            'Client Disconnect Threshold Db',
            data.details.radioMap,
            'value',
            renderInputItem,
            {
              min: -1000,
              max: 1000,
              error: '-1000 - 1000',
              value: 'clientDisconnectThresholdDb',
            }
          )}

          {renderItem('Eir Tx Power', data.details.radioMap, 'value', renderInputItem, {
            min: -1000,
            max: 1000,
            error: '-1000 - 1000',
            value: 'eirpTxPower',
          })}

          <p>Radio Resource Management:</p>
          {renderItem(
            'Perimeter Detection',
            data.details.radioMap,
            'perimeterDetectionEnabled',
            renderOptionItem,
            { dropdown: defaultOptions }
          )}
          <p>Steering Threshold:</p>
          {renderItem(
            'SNR (% Drop)',
            data.details.advancedRadioMap,
            'dropInSnrPercentage',
            renderInputItem,
            {
              min: 0,
              max: 100,
              error: '0 - 100%',
              value: 'bestApSettings',
            }
          )}
          {renderItem(
            'Min Load (%)',
            data.details.advancedRadioMap,
            'minLoadFactor',
            renderInputItem,
            {
              min: 0,
              max: 100,
              error: '0 - 100%',
              value: 'bestApSettings',
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
};

General.defaultProps = {
  data: {},
  profiles: [],
  handleOnFormChange: () => {},
  handleOnEquipmentSave: () => {},
  loadingProfiles: true,
  errorProfiles: null,
  onFetchMoreProfiles: () => {},
};

export default General;
