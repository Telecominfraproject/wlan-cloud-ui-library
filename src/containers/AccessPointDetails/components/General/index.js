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

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };

  const handleOnSave = () => {
    form.validateFields().catch(() => {});
  };

  useEffect(() => {
    form.setFieldsValue({
      enableRadio2dot4: data.details.advancedRadioMap.is2dot4GHz.radioAdminState,
      enableRadio5U: data.details.advancedRadioMap.is5GHzU.radioAdminState,
      enableRadio5L: data.details.advancedRadioMap.is5GHzL.radioAdminState,
      beaconRadio2dot4: data.details.advancedRadioMap.is2dot4GHz.beaconInterval,
      beaconRadio5U: data.details.advancedRadioMap.is5GHzU.beaconInterval,
      beaconRadio5L: data.details.advancedRadioMap.is5GHzL.beaconInterval,
      deuthAttack2dot4: data.details.advancedRadioMap.is2dot4GHz.deauthAttackDetection,
      deuthAttack5U: data.details.advancedRadioMap.is5GHzU.deauthAttackDetection,
      deuthAttack5L: data.details.advancedRadioMap.is5GHzL.deauthAttackDetection,
      threshold2dot4: data.details.advancedRadioMap.is2dot4GHz.rtsCtsThreshold,
      threshold5U: data.details.advancedRadioMap.is5GHzU.rtsCtsThreshold,
      threshold5L: data.details.advancedRadioMap.is5GHzL.rtsCtsThreshold,
      radio2dot4: data.details.advancedRadioMap.is2dot4GHz.radioMode,
      radio5U: data.details.advancedRadioMap.is5GHzU.radioMode,
      radio5L: data.details.advancedRadioMap.is5GHzL.radioMode,
      uapsd2dot4: data.details.advancedRadioMap.is2dot4GHz.uapsdState,
      uapsd5U: data.details.advancedRadioMap.is5GHzU.uapsdState,
      uapsd5L: data.details.advancedRadioMap.is5GHzL.uapsdState,
      maxDevices2dot4: data.details.advancedRadioMap.is2dot4GHz.maxNumClients,
      maxDevices5U: data.details.advancedRadioMap.is5GHzU.maxNumClients,
      maxDevices5L: data.details.advancedRadioMap.is5GHzL.maxNumClients,
      bandwidth2dot4: data.details.radioMap.is2dot4GHz.channelBandwidth,
      bandwidth5U: data.details.radioMap.is5GHzU.channelBandwidth,
      bandwidth5L: data.details.radioMap.is5GHzL.channelBandwidth,
      perimeter2dot4: data.details.radioMap.is2dot4GHz.perimeterDetectionEnabled,
      perimeter5U: data.details.radioMap.is5GHzU.perimeterDetectionEnabled,
      perimeter5L: data.details.radioMap.is5GHzL.perimeterDetectionEnabled,
      signal2dot4: data.details.radioMap.is2dot4GHz.neighbouringListApConfig.minSignal,
      signal5U: data.details.radioMap.is5GHzU.neighbouringListApConfig.minSignal,
      signal5L: data.details.radioMap.is5GHzL.neighbouringListApConfig.minSignal,
      aps2dot4: data.details.radioMap.is2dot4GHz.neighbouringListApConfig.maxAps,
      aps5U: data.details.radioMap.is5GHzU.neighbouringListApConfig.maxAps,
      aps5L: data.details.radioMap.is5GHzL.neighbouringListApConfig.maxAps,
      noiseFloor2dot4:
        data.details.advancedRadioMap.is2dot4GHz.channelHopSettings.noiseFloorThresholdInDB,
      noiseFloor5U:
        data.details.advancedRadioMap.is5GHzU.channelHopSettings.noiseFloorThresholdInDB,
      noiseFloor5L:
        data.details.advancedRadioMap.is5GHzL.channelHopSettings.noiseFloorThresholdInDB,
      noiseFloorTime2dot4:
        data.details.advancedRadioMap.is2dot4GHz.channelHopSettings
          .noiseFloorThresholdTimeInSeconds,
      noiseFloorTime5U:
        data.details.advancedRadioMap.is5GHzU.channelHopSettings.noiseFloorThresholdTimeInSeconds,
      noiseFloorTime5L:
        data.details.advancedRadioMap.is5GHzL.channelHopSettings.noiseFloorThresholdTimeInSeconds,
      dfs2dot4: data.details.advancedRadioMap.is2dot4GHz.channelHopSettings.obssHopMode,
      dfs5U: data.details.advancedRadioMap.is5GHzU.channelHopSettings.obssHopMode,
      dfs5L: data.details.advancedRadioMap.is5GHzL.channelHopSettings.obssHopMode,
      snr2dot4: data.details.advancedRadioMap.is2dot4GHz.bestApSettings.dropInSnrPercentage,
      snr5U: data.details.advancedRadioMap.is5GHzU.bestApSettings.dropInSnrPercentage,
      snr5L: data.details.advancedRadioMap.is5GHzL.bestApSettings.dropInSnrPercentage,
      minLoad2dot4: data.details.advancedRadioMap.is2dot4GHz.bestApSettings.minLoadFactor,
      minLoad5U: data.details.advancedRadioMap.is5GHzU.bestApSettings.minLoadFactor,
      minLoad5L: data.details.advancedRadioMap.is5GHzL.bestApSettings.minLoadFactor,
    });
  }, []);

  const columns = [
    {
      title: 'Wireless Network	',
      dataIndex: 'name',
      key: 'network',
    },
    {
      title: 'SSID',
      dataIndex: ['details', 'ssid'],
      key: 'ssid',
    },
    {
      title: 'Security Mode	',
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
              message: 'Please enter the Access Point name.',
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
          <Item label=" " colon={false}>
            <div className={styles.InlineDiv}>
              <p>2.4 GHz</p>
              <p>5 GHzU</p>
              <p>5 GHzL</p>
            </div>
          </Item>
          <p>Radio Specific Parameters:</p>
          <Item label="Enable Radio">
            <div className={styles.InlineDiv}>
              <Item
                name="enableRadio2dot4"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the radio value for 2.4GHz.',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item
                name="enableRadio5U"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the radio value for 5GHz U.',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item
                name="enableRadio5L"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the radio value for 5GHz L.',
                  },
                ]}
              >
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item
            label={
              <span>
                <Tooltip title="TU (Time Unit) is 1.024ms ">
                  <InfoCircleOutlined />
                </Tooltip>
                &nbsp; Beacon Interval
              </span>
            }
          >
            <div className={styles.InlineDiv}>
              <Item name="beaconRadio2dot4">
                <Select className={styles.Field}>
                  <Option value={100}>100</Option>
                  <Option value={200}>200</Option>
                  <Option value={300}>300</Option>
                  <Option value={400}>400</Option>
                  <Option value={500}>500</Option>
                </Select>
              </Item>
              <Item name="beaconRadio5U">
                <Select className={styles.Field}>
                  <Option value={100}>100</Option>
                  <Option value={200}>200</Option>
                  <Option value={300}>300</Option>
                  <Option value={400}>400</Option>
                  <Option value={500}>500</Option>
                </Select>
              </Item>
              <Item name="beaconRadio5L">
                <Select className={styles.Field}>
                  <Option value={100}>100</Option>
                  <Option value={200}>200</Option>
                  <Option value={300}>300</Option>
                  <Option value={400}>400</Option>
                  <Option value={500}>500</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item label="Deauth Attack Detection">
            <div className={styles.InlineDiv}>
              <Item name="deuthAttack2dot4">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="deuthAttack5U">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="deuthAttack5L">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item label="RTS/CTS threshold">
            <div className={styles.InlineDiv}>
              <Item
                name="threshold2dot4"
                rules={[
                  { required: true, message: 'Enter the RTS/CTS threshold' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('threshold2dot4') > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Enter the RTS/CTS threshold'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter threshold for 2.4GHz"
                  type="number"
                />
              </Item>
              <Item
                name="threshold5U"
                rules={[
                  { required: true, message: 'Enter the RTS/CTS threshold' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('threshold5U') > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Enter the RTS/CTS threshold'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter threshold for 5GHzU"
                  type="number"
                />
              </Item>
              <Item
                name="threshold5L"
                rules={[
                  { required: true, message: 'Enter the RTS/CTS threshold' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('threshold5L') > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Enter the RTS/CTS threshold'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter threshold for 5GHzL"
                  type="number"
                />
              </Item>
            </div>
          </Item>
          <Item label="Radio Mode">
            <div className={styles.InlineDiv}>
              <Item name="radio2dot4">
                <Select className={styles.Field}>
                  <Option value="BGN">BGN</Option>
                  <Option value="N">N</Option>
                </Select>
              </Item>
              <Item name="radio5U">
                <Select className={styles.Field}>
                  <Option value="N">N</Option>
                  <Option value="AC">AC</Option>
                </Select>
              </Item>
              <Item name="radio5L">
                <Select className={styles.Field}>
                  <Option value="N">N</Option>
                  <Option value="AC">AC</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item label="Mimo Mode">
            <div className={styles.InlineDiv}>
              <span>{data.details.advancedRadioMap.is2dot4GHz.mimoMode}</span>
              <span>{data.details.advancedRadioMap.is5GHzU.mimoMode}</span>
              <span>{data.details.advancedRadioMap.is5GHzL.mimoMode}</span>
            </div>
          </Item>
          <Item label="UAPSD State">
            <div className={styles.InlineDiv}>
              <Item name="uapsd2dot4">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="uapsd5U">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="uapsd5L">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item label="SMPS Power Save Mode">
            <div className={styles.InlineDiv}>
              <Item name="smps2dot4">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="smps5U">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="smps5L">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <Item label="Maximum Devices">
            <div className={styles.InlineDiv}>
              <Item
                name="maxDevices2dot4"
                rules={[
                  { required: true, message: '0-100' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('maxDevices2dot4') <= 100 &&
                          getFieldValue('maxDevices2dot4') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Maximum devices can be a number between 0 and 100.')
                      );
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter maximum devices for 2.4 GHz"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
              <Item
                name="maxDevices5U"
                rules={[
                  { required: true, message: '0-100' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('maxDevices5U') <= 100 && getFieldValue('maxDevices5U') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Maximum devices can be a number between 0 and 100.')
                      );
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter maximum devices for 5GHzU"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
              <Item
                name="maxDevices5L"
                rules={[
                  { required: true, message: '0-100' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('maxDevices5L') <= 100 && getFieldValue('maxDevices5L') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Maximum devices can be a number between 0 and 100.')
                      );
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter maximum devices for 5GHzL"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
            </div>
          </Item>
          <Item label="Active Channel">
            <div className={styles.InlineDiv}>
              <span>{data.details.radioMap.is2dot4GHz.activeChannel}</span>
              <span>{data.details.radioMap.is5GHzU.activeChannel}</span>
              <span>{data.details.radioMap.is5GHzL.activeChannel}</span>
            </div>
          </Item>
          <Item label="Backup Channel">
            <div className={styles.InlineDiv}>
              <span>{data.details.radioMap.is2dot4GHz.backupChannelNumber}</span>
              <span>{data.details.radioMap.is5GHzU.backupChannelNumber}</span>
              <span>{data.details.radioMap.is5GHzL.backupChannelNumber}</span>
            </div>
          </Item>
          <Item label="Channel Bandwidth">
            <div className={styles.InlineDiv}>
              <Item name="bandwidth2dot4">
                <Select className={styles.Field}>
                  <Option value="20MHz">20MHz</Option>
                </Select>
              </Item>
              <Item name="bandwidth5U">
                <Select className={styles.Field}>
                  <Option value="20MHz">20MHz</Option>
                  <Option value="40MHz">40MHz</Option>
                  <Option value="80MHz">80MHz</Option>
                </Select>
              </Item>
              <Item name="bandwidth5L">
                <Select className={styles.Field}>
                  <Option value="20MHz">20MHz</Option>
                  <Option value="40MHz">40MHz</Option>
                  <Option value="80MHz">80MHz</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <p>Radio Resource Management:</p>
          <Item label="Perimeter Detection">
            <div className={styles.InlineDiv}>
              <Item name="perimeter2dot4">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="perimeter5U">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
              <Item name="perimeter5L">
                <Select className={styles.Field}>
                  <Option value="enabled">enabled</Option>
                  <Option value="disabled">disabled</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <p>Neighbouring AP List:</p>
          <Item label="Minimum Signal">
            <div className={styles.InlineDiv}>
              <Item
                name="signal2dot4"
                rules={[
                  { required: true, message: '-90 - -50' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('signal2dot4') <= -50 && getFieldValue('signal2dot4') >= -90)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('-90 - -50 dB'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter minimal signal (dB) for 2.4GHz"
                  type="number"
                  min={-90}
                  max={-50}
                />
              </Item>
              <Item
                name="signal5U"
                rules={[
                  { required: true, message: '-90 - -50 dB' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('signal5U') <= -50 && getFieldValue('signal5U') >= -90)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('-90 - -50 dB'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter minimal signal (dB) for 5GHzU"
                  type="number"
                  min={-90}
                  max={-50}
                />
              </Item>
              <Item
                name="signal5L"
                rules={[
                  { required: true, message: '-90 - -50 dB' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('signal5L') <= -50 && getFieldValue('signal5L') >= -90)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('-90 - -50 dB'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter minimal signal (dB) for 5GHzL"
                  type="number"
                  min={-90}
                  max={-50}
                />
              </Item>
            </div>
          </Item>
          <Item label="Maximum APs">
            <div className={styles.InlineDiv}>
              <Item
                name="aps2dot4"
                rules={[
                  { required: true, message: '0 - 512 APs' },

                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('aps2dot4') <= 512) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 512 APs'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter maximum number of neighbours for 2.4GHz"
                  type="number"
                  min={0}
                  max={512}
                />
              </Item>
              <Item
                name="aps5U"
                rules={[
                  { required: true, message: '0 - 512 APs' },

                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('aps5U') <= 512) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 512 APs'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter maximum number of neighbours for 5GHzU"
                  type="number"
                  min={0}
                  max={512}
                />
              </Item>
              <Item
                name="aps5L"
                rules={[
                  { required: true, message: '0 - 512 APs' },

                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('aps5L') <= 512) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 512 APs'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter maximum number of neighbours for 5GHzL"
                  type="number"
                  min={0}
                  max={512}
                />
              </Item>
            </div>
          </Item>
          <p>Channel Hop Configuration:</p>
          <Item label="Noise Floor (dB)">
            <div className={styles.InlineDiv}>
              <Item
                name="noiseFloor2dot4"
                rules={[
                  { required: true, message: '-90 - -10 dB' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('noiseFloor2dot4') <= -10 &&
                          getFieldValue('noiseFloor2dot4') >= -90)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('-90 - -10 dB'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter noise floor (dB) for 2.4GHz"
                  type="number"
                  min={-90}
                  max={-10}
                />
              </Item>
              <Item
                name="noiseFloor5U"
                rules={[
                  { required: true, message: '-90 - -10 dB' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('noiseFloor5U') <= -10 &&
                          getFieldValue('noiseFloor5U') >= -90)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('-90 - -10 dB'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter noise floor (dB) for 5GHzU"
                  type="number"
                  min={-90}
                  max={-10}
                />
              </Item>
              <Item
                name="noiseFloor5L"
                rules={[
                  { required: true, message: '-90 - -10 dB' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('noiseFloor5L') <= -10 &&
                          getFieldValue('noiseFloor5L') >= -90)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('-90 - -10 dB'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter noise floor (dB) for 5GHzL"
                  type="number"
                  min={-90}
                  max={-10}
                />
              </Item>
            </div>
          </Item>
          <Item label="Noise Floor Time (secs)">
            <div className={styles.InlineDiv}>
              <Item
                name="noiseFloorTime2dot4"
                rules={[
                  { required: true, message: '120 - 600 seconds' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('noiseFloorTime2dot4') <= 600 &&
                          getFieldValue('noiseFloorTime2dot4') >= 120)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('120 - 600 seconds'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter noise floor time (s) for 2.4GHz"
                  type="number"
                  min={120}
                  max={600}
                />
              </Item>
              <Item
                name="noiseFloorTime5U"
                rules={[
                  { required: true, message: '120 - 600 seconds' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('noiseFloorTime5U') <= 600 &&
                          getFieldValue('noiseFloorTime5U') >= 120)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('120 - 600 seconds'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter noise floor time (s) for 5GHzU"
                  type="number"
                  min={120}
                  max={600}
                />
              </Item>
              <Item
                name="noiseFloorTime5L"
                rules={[
                  { required: true, message: '120 - 600 seconds' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('noiseFloorTime5L') <= 600 &&
                          getFieldValue('noiseFloorTime5L') >= 120)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('120 - 600 seconds'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter noise floor time (s) for 5GHzL"
                  type="number"
                  min={120}
                  max={600}
                />
              </Item>
            </div>
          </Item>
          <Item label="DFS on/off">
            <div className={styles.InlineDiv}>
              <Item name="dfs2dot4">
                <Select className={styles.Field}>
                  <Option value="default">default</Option>
                </Select>
              </Item>
              <Item name="dfs5U">
                <Select className={styles.Field}>
                  <Option value="default">default</Option>
                </Select>
              </Item>
              <Item name="dfs5L">
                <Select className={styles.Field}>
                  <Option value="default">default</Option>
                </Select>
              </Item>
            </div>
          </Item>
          <p>Steering Threshold:</p>
          <Item label="SNR (% Drop)">
            <div className={styles.InlineDiv}>
              <Item
                name="snr2dot4"
                rules={[
                  { required: true, message: '0 - 100%' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('snr2dot4') <= 100 && getFieldValue('snr2dot4') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 100%'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter SNR percentage drop for 2.4GHz"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
              <Item
                name="snr5U"
                rules={[
                  { required: true, message: '0 - 100%' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('snr5U') <= 100 && getFieldValue('snr5U') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 100%'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter SNR percentage drop for 5GHzU"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
              <Item
                name="snr5L"
                rules={[
                  { required: true, message: '0 - 100%' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('snr5L') <= 100 && getFieldValue('snr5L') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 100%'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter SNR percentage drop for 5GHzL"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
            </div>
          </Item>
          <Item label="Min Load (%)">
            <div className={styles.InlineDiv}>
              <Item
                name="minLoad2dot4"
                rules={[
                  { required: true, message: '0 - 100%' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('minLoad2dot4') <= 100 && getFieldValue('minLoad2dot4') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 100%'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter minimum load % for 2.4GHz"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
              <Item
                name="minLoad5U"
                rules={[
                  { required: true, message: '0 - 100%' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('minLoad5U') <= 100 && getFieldValue('minLoad5U') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 100%'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter minimum load % for 5GHzU"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
              <Item
                name="minLoad5L"
                rules={[
                  { required: true, message: '0 - 100%' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (
                        !value ||
                        (getFieldValue('minLoad5L') <= 100 && getFieldValue('minLoad5L') >= 0)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('0 - 100%'));
                    },
                  }),
                ]}
              >
                <Input
                  className={styles.Field}
                  placeholder="Enter minimum load % for 5GHzL"
                  type="number"
                  min={0}
                  max={100}
                />
              </Item>
            </div>
          </Item>
        </Panel>
      </Collapse>
    </Form>
  );
};

General.propTypes = {
  data: PropTypes.instanceOf(Array),
};

General.defaultProps = {
  data: [],
};

export default General;
