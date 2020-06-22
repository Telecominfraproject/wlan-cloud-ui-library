import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Table, Collapse, Select, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import styles from '../../index.module.scss';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;

const General = ({ data }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      enableRadiois2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.radioAdminState,
      enableRadiois5GHzU: data.details.advancedRadioMap.is5GHzU.radioAdminState,
      enableRadiois5GHzL: data.details.advancedRadioMap.is5GHzL.radioAdminState,
      beaconRadiois2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.beaconInterval,
      beaconRadiois5GHzU: data.details.advancedRadioMap.is5GHzU.beaconInterval,
      beaconRadiois5GHzL: data.details.advancedRadioMap.is5GHzL.beaconInterval,
      deauthAttackis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.deauthAttackDetection,
      deauthAttackis5GHzU: data.details.advancedRadioMap.is5GHzU.deauthAttackDetection,
      deauthAttackis5GHzL: data.details.advancedRadioMap.is5GHzL.deauthAttackDetection,
      thresholdis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.rtsCtsThreshold,
      thresholdis5GHzU: data.details.advancedRadioMap.is5GHzU.rtsCtsThreshold,
      thresholdis5GHzL: data.details.advancedRadioMap.is5GHzL.rtsCtsThreshold,
      radioModeis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.radioMode,
      radioModeis5GHzU: data.details.advancedRadioMap.is5GHzU.radioMode,
      radioModeis5GHzL: data.details.advancedRadioMap.is5GHzL.radioMode,
      uapsdis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.uapsdState,
      uapsdis5GHzU: data.details.advancedRadioMap.is5GHzU.uapsdState,
      uapsdis5GHzL: data.details.advancedRadioMap.is5GHzL.uapsdState,
      maxDevicesis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.maxNumClients,
      maxDevicesis5GHzU: data.details.advancedRadioMap.is5GHzU.maxNumClients,
      maxDevicesis5GHzL: data.details.advancedRadioMap.is5GHzL.maxNumClients,
      bandwidthis2dot4GHz: data.details.radioMap.is2dot4GHz.channelBandwidth,
      bandwidthis5GHzU: data.details.radioMap.is5GHzU.channelBandwidth,
      bandwidthis5GHzL: data.details.radioMap.is5GHzL.channelBandwidth,
      perimeterDetectionis2dot4GHz:
        data.details.radioMap.is2dot4GHz.perimeterDetectionEnabled === true
          ? 'enabled'
          : 'disabled',
      perimeterDetectionis5GHzU:
        data.details.radioMap.is5GHzU.perimeterDetectionEnabled === true ? 'enabled' : 'disabled',
      perimeterDetectionis5GHzL:
        data.details.radioMap.is5GHzL.perimeterDetectionEnabled === true ? 'enabled' : 'disabled',
      signalis2dot4GHz: data.details.radioMap.is2dot4GHz.neighbouringListApConfig.minSignal,
      signalis5GHzU: data.details.radioMap.is5GHzU.neighbouringListApConfig.minSignal,
      signalis5GHzL: data.details.radioMap.is5GHzL.neighbouringListApConfig.minSignal,
      apsis2dot4GHz: data.details.radioMap.is2dot4GHz.neighbouringListApConfig.maxAps,
      apsis5GHzU: data.details.radioMap.is5GHzU.neighbouringListApConfig.maxAps,
      apsis5GHzL: data.details.radioMap.is5GHzL.neighbouringListApConfig.maxAps,
      noiseFlooris2dot4GHz:
        data.details.advancedRadioMap.is2dot4GHz.channelHopSettings.noiseFloorThresholdInDB,
      noiseFlooris5GHzU:
        data.details.advancedRadioMap.is5GHzU.channelHopSettings.noiseFloorThresholdInDB,
      noiseFlooris5GHzL:
        data.details.advancedRadioMap.is5GHzL.channelHopSettings.noiseFloorThresholdInDB,
      noiseFloorTimeis2dot4GHz:
        data.details.advancedRadioMap.is2dot4GHz.channelHopSettings
          .noiseFloorThresholdTimeInSeconds,
      noiseFloorTimeis5GHzU:
        data.details.advancedRadioMap.is5GHzU.channelHopSettings.noiseFloorThresholdTimeInSeconds,
      noiseFloorTimeis5GHzL:
        data.details.advancedRadioMap.is5GHzL.channelHopSettings.noiseFloorThresholdTimeInSeconds,
      dfsis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.channelHopSettings.obssHopMode,
      dfsis5GHzU: data.details.advancedRadioMap.is5GHzU.channelHopSettings.obssHopMode,
      dfsis5GHzL: data.details.advancedRadioMap.is5GHzL.channelHopSettings.obssHopMode,
      snris2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.bestApSettings.dropInSnrPercentage,
      snris5GHzU: data.details.advancedRadioMap.is5GHzU.bestApSettings.dropInSnrPercentage,
      snris5GHzL: data.details.advancedRadioMap.is5GHzL.bestApSettings.dropInSnrPercentage,
      minLoadis2dot4GHz: data.details.advancedRadioMap.is2dot4GHz.bestApSettings.minLoadFactor,
      minLoadis5GHzU: data.details.advancedRadioMap.is5GHzU.bestApSettings.minLoadFactor,
      minLoadis5GHzL: data.details.advancedRadioMap.is5GHzL.bestApSettings.minLoadFactor,
    });
  }, []);

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
      render: appliedRadios => appliedRadios.join(',  '),
    },
  ];

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };

  const handleOnSave = () => {
    form.validateFields().catch(() => {});
  };

  const renderItem = (label, obj, dataIndex, renderInput, dropdown, min, max, error) => (
    <Item label={label} colon={false}>
      <div className={styles.InlineDiv}>
        {Object.keys(obj).map(i =>
          renderInput ? (
            renderInput(dataIndex, i, label, dropdown, min, max, error)
          ) : (
            <span key={i} className={styles.spanStyle}>
              {dataIndex ? obj[i][dataIndex] : obj[i]}
            </span>
          )
        )}
      </div>
    </Item>
  );

  const renderOptionItem = (dataIndex, key, label, dropdown) => (
    <Item
      name={dataIndex + key}
      rules={[
        {
          required: true,
          message: `Enter ${label} for ${key}`,
        },
      ]}
    >
      {dropdown}
    </Item>
  );

  const renderInputItem = (dataIndex, key, label, min, max, error) => (
    <Item
      name={dataIndex + key}
      rules={[
        { required: true, message: error },
        ({ getFieldValue }) => ({
          validator(_rule, value) {
            if (
              !value ||
              (getFieldValue(dataIndex + key) <= max && getFieldValue(dataIndex + key) >= min)
            ) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(error));
          },
        }),
      ]}
    >
      <Input
        className={styles.Field}
        placeholder={`Enter ${label} for ${key}`}
        type="number"
        min={min}
        max={max}
      />
    </Item>
  );

  return (
    <Form {...layout} form={form}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary" name="save">
          Save
        </Button>
      </div>
      <Card title="Identity">
        <Item
          label="Access Point Name"
          name="access"
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
        <Item label="SKU"> {data.status.protocol.detailsJSON.reportedSku}</Item>
        <Item label="Country Code"> {data.status.protocol.detailsJSON.countryCode}</Item>
        <Item label="Ethernet MAC Address"> {data.status.protocol.details.reportedMacAddr}</Item>
        <Item label="Manufacturer"> </Item>
        <Item label="Asset ID"> {data.inventoryId}</Item>
      </Card>
      <Card title="Profile">
        <Item label="Access Point Profile"> {data.profile.name}</Item>
        <Item label="Summary">
          <Item>
            <Table
              rowKey="id"
              scroll={{ x: true }}
              dataSource={data.profile.childProfiles}
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
            'enableRadio',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="enabled">enabled</Option>
              <Option value="disabled">disabled</Option>
            </Select>
          )}

          {renderItem(
            <span>
              <Tooltip title="TU (Time Unit) is 1.024ms ">
                <InfoCircleOutlined />
              </Tooltip>
              &nbsp; Beacon Interval
            </span>,
            data.details.advancedRadioMap,
            'beaconRadio',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value={100}>100</Option>
              <Option value={200}>200</Option>
              <Option value={300}>300</Option>
              <Option value={400}>400</Option>
              <Option value={500}>500</Option>
            </Select>
          )}

          {renderItem(
            'Deauth Attack Detection',
            data.details.advancedRadioMap,
            'deauthAttack',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="enabled">enabled</Option>
              <Option value="disabled">disabled</Option>
            </Select>
          )}

          {renderItem(
            'RTS/CTS threshold',
            data.details.advancedRadioMap,
            'threshold',
            renderInputItem,
            0,
            65535,
            '0 - 65535 (Bytes)'
          )}

          {renderItem(
            'Radio Mode',
            data.details.advancedRadioMap,
            'radioMode',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="BGN">BGN</Option>
              <Option value="N">N</Option>
              <Option value="AC">AC</Option>
            </Select>
          )}

          {renderItem('Mimo Mode', data.details.advancedRadioMap, 'mimoMode')}

          {renderItem(
            'UAPSD',
            data.details.advancedRadioMap,
            'uapsd',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="enabled">enabled</Option>
              <Option value="disabled">disabled</Option>
            </Select>
          )}

          {renderItem(
            'SMPS Power Save Mode',
            data.details.advancedRadioMap,
            'smps',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="enabled">enabled</Option>
              <Option value="disabled">disabled</Option>
            </Select>
          )}

          {renderItem(
            'Maximum Devices',
            data.details.advancedRadioMap,
            'maxDevices',
            renderInputItem,
            0,
            100,
            '0 - 100'
          )}

          {renderItem('Active Channel', data.details.radioMap, 'activeChannel')}

          {renderItem('Backup Channel', data.details.radioMap, 'backupChannelNumber')}

          {renderItem(
            'Channel Bandwidth',
            data.details.advancedRadioMap,
            'bandwidth',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="20MHz">20MHz</Option>
              <Option value="40MHz">40MHz</Option>
              <Option value="80MHz">80MHz</Option>
            </Select>
          )}

          <p>Radio Resource Management:</p>

          {renderItem(
            'Perimeter Detection',
            data.details.advancedRadioMap,
            'perimeterDetection',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="enabled">enabled</Option>
              <Option value="disabled">disabled</Option>
            </Select>
          )}
          <p>Neighbouring AP List:</p>

          {renderItem(
            'Minimum Signal',
            data.details.advancedRadioMap,
            'signal',
            renderInputItem,
            -90,
            -50,
            '-90 - -50 dB'
          )}

          {renderItem(
            'Maximum APs',
            data.details.advancedRadioMap,
            'aps',
            renderInputItem,
            0,
            512,
            '0 - 512 APs'
          )}

          <p>Channel Hop Configuration:</p>

          {renderItem(
            'Noise Floor (db)',
            data.details.advancedRadioMap,
            'noiseFloor',
            renderInputItem,
            -90,
            -10,
            '-90 - -10 dB'
          )}
          {renderItem(
            'Noise Floor Time (secs)',
            data.details.advancedRadioMap,
            'noiseFloorTime',
            renderInputItem,
            120,
            600,
            '120 - 600 seconds'
          )}

          {renderItem(
            'DFS on/off',
            data.details.advancedRadioMap,
            'dfs',
            renderOptionItem,
            <Select className={styles.Field}>
              <Option value="enabled">enabled</Option>
              <Option value="disabled">disabled</Option>
            </Select>
          )}

          <p>Steering Threshold:</p>

          {renderItem(
            'SNR (% Drop)',
            data.details.advancedRadioMap,
            'snr',
            renderInputItem,
            0,
            100,
            '0 - 100%'
          )}

          {renderItem(
            'Min Load (%)',
            data.details.advancedRadioMap,
            'minLoad',
            renderInputItem,
            0,
            100,
            '0 - 100%'
          )}
        </Panel>
      </Collapse>
    </Form>
  );
};

General.propTypes = {
  data: PropTypes.instanceOf(Object),
};

General.defaultProps = {
  data: {},
};

export default General;
