import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Tooltip  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';
import { RADIOS } from '../../constants';

const { Item  } = Form;
const { Option } = Select;

const RFForm = ({ form, details}) => {

    useEffect(() => {
        const formData = {
            rfConfigMap: {},
        };
        const currentRadios = details.rfConfigMap ? Object.keys(details.rfConfigMap) : RADIOS;

        currentRadios.forEach(radio => {
            formData.rfConfigMap[radio] = {
                radioType: details.rfConfigMap[radio]?.radioType || radio,
                radioMode: details.rfConfigMap[radio]?.radioMode || 'modeN',
                beaconInterval: details.rfConfigMap[radio]?.beaconInterval || 0,
                forceScanDuringVoice: details.rfConfigMap[radio]?.forceScanDuringVoice || 'disabled',
                rtsCtsThreshold: details.rfConfigMap[radio]?.rtsCtsThreshold || 0,
                channelBandwidth: details.rfConfigMap[radio]?.channelBandwidth || 'is20MHz',
                mimoMode: details.rfConfigMap[radio]?.channelBandwidth || 'none',
                maxNumClients: details.rfConfigMap[radio]?.maxNumClients || 0,
                multicastRate: details.rfConfigMap[radio]?.multicastRate || 'rate6mbps',
                activeScanSettings: {
                    enabled: details.rfConfigMap[radio]?.activeScanSettings?.enabled ? 'true' : 'false',
                    scanFrequencySeconds: details.rfConfigMap[radio]?.activeScanSettings?.scanFrequencySeconds || 0,
                    scanDurationMillis: details.rfConfigMap[radio]?.activeScanSettings?.scanDurationMillis || 0,
                },
                managementRate: details.rfConfigMap[radio]?.managementRate || 'rate1mbps',
                rxCellSizeDb: details.rfConfigMap[radio]?.rxCellSizeDb || 0,
                probeResponseThresholdDb: details.rfConfigMap[radio]?.probeResponseThresholdDb || 0,
                clientDisconnectThresholdDb: details.rfConfigMap[radio]?.clientDisconnectThresholdDb || 0,
                eirpTxPower: details.rfConfigMap[radio]?.eirpTxPower || 0,
                neighbouringListApConfig: {
                    minSignal: details.rfConfigMap[radio]?.neighbouringListApConfig?.minSignal || 0,
                    maxAps: details.rfConfigMap[radio]?.neighbouringListApConfig?.maxAps || 0,
                },
                channelHopSettings: {
                    noiseFloorThresholdInDB: details.rfConfigMap[radio]?.channelHopSettings?.noiseFloorThresholdInDB || -75,
                    noiseFloorThresholdTimeInSeconds: details.rfConfigMap[radio]?.channelHopSettings?.noiseFloorThresholdTimeInSeconds || 180,
                    nonWifiThresholdInPercentage: details.rfConfigMap[radio]?.channelHopSettings?.nonWifiThresholdInPercentage || 50,
                    nonWifiThresholdTimeInSeconds: details.rfConfigMap[radio]?.channelHopSettings?.nonWifiThresholdTimeInSeconds || 180,
                    obssHopMode: details.rfConfigMap[radio]?.channelHopSettings?.obssHopMode || 'NON_WIFI',
                },
                bestApSettings: {
                    mlComputed: details.rfConfigMap[radio]?.bestApSettings?.mlComputed || 'true',
                    dropInSnrPercentage: details.rfConfigMap[radio]?.bestApSettings?.dropInSnrPercentage || 10,
                    minLoadFactor: details.rfConfigMap[radio]?.bestApSettings?.minLoadFactor || 10,
                }
            };
        });

        form.setFieldsValue({...formData});
    }, [form, details]);

    const defaultOptions = (
        <Select className={styles.Field}>
          <Option value="true">Enabled</Option>
          <Option value="false">Disabled</Option>
        </Select>
      );

    const renderItem = (label, dataIndex, renderInput, options = {}) => (
        <Item label={label} colon={false}>
          <div className={styles.InlineDiv}>
            {Object.keys(details.rfConfigMap).map(i => (
                renderInput(dataIndex, i, label, options)
            ))}
          </div>
        </Item>
      );

      const renderInputItem = (dataIndex, key, label, options = {}) => (
        <Item
          name={['rfConfigMap', key, ...dataIndex]}
          rules={[
            { required: true, message: options.error },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (
                  !value ||
                  (getFieldValue(['rfConfigMap', key, ...dataIndex]) <= options.max &&
                    getFieldValue(['rfConfigMap', key, ...dataIndex]) >= options.min)
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

      const renderOptionItem = (dataIndex, key, label, options = {}) => (
        <Item
          name={['rfConfigMap', key, ...dataIndex]}
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

    return (
        <div className={styles.ProfileDetails}>
            <Card>
                <Item label={' '} colon={false}>
                    <div className={styles.InlineDiv}>
                        {Object.keys(details.rfConfigMap).map(radio =>
                            <span key={radio} className={styles.spanStyle}>
                                {radio}
                            </span>
                        )}
                    </div>
                </Item>
                {renderItem(
                    'Maximum Devices',
                    ['maxNumClients'],
                    renderInputItem,
                    { min: 0, max: 100, error: '0 - 100' },
                )}
                {renderItem(
                    'Channel Bandwidth (MHz)', 
                    ['channelBandwidth'],
                    renderOptionItem,
                    {
                        dropdown: key => {
                        return (
                        <Select className={styles.Field}>
                            <Option value="is20MHz">20MHz</Option>
                            {key === 'is2dot4GHz' ? null : <Option value="is40MHz">40MHz</Option>}
                            {key === 'is2dot4GHz' ? null : <Option value="is80MHz">80MHz</Option>}
                            {key === 'is2dot4GHz' ? null : <Option value="is160MHz">160MHz</Option>}
                        </Select>
                        );
                    },
                    },
                )}
                {renderItem(
                    'Radio Mode', 
                    ['radioMode'], 
                    renderOptionItem, 
                    {
                        dropdown: (
                            <Select className={styles.Field}>
                                <Option value="modeN">N</Option>
                                <Option value="modeAC">AC</Option>
                                <Option value="modeGN">GN</Option>
                                <Option value="modeX">X</Option>
                                <Option value="modeA">A</Option>
                                <Option value="modeB">B</Option>
                                <Option value="modeG">G</Option>
                                <Option value="modeAB">AB</Option>
                            </Select>
                        ),
                    },
                )}
                {renderItem(
                    <span>
                    <Tooltip title="TU (Time Unit) is 1.024ms ">
                        <InfoCircleOutlined />
                    </Tooltip>
                    &nbsp; Beacon Interval (kusecs)
                    </span>,
                    ['beaconInterval'],
                    renderOptionItem,
                    {
                        dropdown: (
                            <Select className={styles.Field}>
                                <Option value={100}>100</Option>
                                <Option value={200}>200</Option>
                                <Option value={300}>300</Option>
                                <Option value={400}>400</Option>
                                <Option value={500}>500</Option>
                            </Select>
                        ),
                    },
                )}
                {renderItem(
                    'RTS/CTS threshold',
                    ['rtsCtsThreshold'],
                    renderInputItem,
                    { min: 0, max: 65535, error: '0 - 65535 (Bytes)', addOnText: 'bytes', },
                )}
                {renderItem(
                    'Mimo Mode', 
                    ['mimoMode'],
                    renderOptionItem,
                    {
                        dropdown: (
                            <Select className={styles.Field}>
                                <Option value="none">none</Option>
                                <Option value="oneByOne">oneByOne</Option>
                                <Option value="twoByTwo">twoByTwo</Option>
                                <Option value="threeByThree">threeByThree</Option>
                                <Option value="fourByFour">fourByFour</Option>
                            </Select>
                        ),
                    },
                )}
                {renderItem(
                    'Management Rate (Mbps)',
                    ['managementRate'],
                    renderOptionItem,
                    {
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
                    },
                )}
                {renderItem(
                    'Multicast Rate (Mbps)',
                    ['multicastRate'],
                    renderOptionItem,
                    {
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
                    },
                )}
                {renderItem(
                    'Rx Cell Size',
                    ['rxCellSizeDb'],
                    renderInputItem,
                    { 
                        min: -100, 
                        max: 100, 
                        error: '-100 - 100 dBm',
                        addOnText: 'dBm',
                    },
                )}
                {renderItem(
                    'Probe Response Threshold',
                    ['probeResponseThresholdDb'],
                    renderInputItem, 
                    { 
                        min: -100, 
                        max: 100, 
                        error: '-100 - 100 dBm',
                        addOnText: 'dBm',
                    },
                )}
                {renderItem(
                    'Client Disconnect Threshold',
                    ['clientDisconnectThresholdDb'],
                    renderInputItem, 
                    { 
                        min: -100, 
                        max: 100, 
                        error: '-100 - 100 dBm',
                        addOnText: 'dBm',
                    },
                )}
                {renderItem(
                    'EIRP Tx Power',
                    ['eirpTxPower'],
                    renderInputItem, 
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100 dBm',
                        addOnText: 'dBm',
                    },
                )}
                <p>Active Scan Setting:</p>
                {renderItem(
                    'Enable',
                    ['activeScanSettings', 'enabled'],
                    renderOptionItem,
                    {
                        dropdown: defaultOptions,
                    },
                )}
                {renderItem(
                    'Scan Frequency',
                    ['activeScanSettings', 'scanFrequencySeconds'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100 seconds',
                        addOnText: 'sec',
                    },
                )}
                {renderItem(
                    'Scan Duration',
                    ['activeScanSettings', 'scanDurationMillis'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100 milliseconds',
                        addOnText: 'ms',
                    },
                )}
                <p>Neighbouring AP List:</p>
                {renderItem(
                    'Minimum Signal',
                    ['neighbouringListApConfig', 'minSignal'],
                    renderInputItem,
                    { 
                        min: -90, 
                        max: -50, 
                        error: '-90 - -50 dBm',
                        addOnText: 'dBm',
                    },
                )}
                {renderItem(
                    'Maximum APs',
                    ['neighbouringListApConfig', 'maxAps'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 512, 
                        error: '0 - 512 APs',
                    }
                )}
                <p>Client Steering Thresholds:</p>
                {renderItem(
                    'Min Load',
                    ['bestApSettings', 'minLoadFactor'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100%',
                        addOnText: '%',
                    },
                )}
                {renderItem(
                    'SNR',
                    ['bestApSettings', 'dropInSnrPercentage'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100%',
                        addOnText: '% Drop',
                    },
                )}
                <p>Channel Hop Configuration:</p>
                {renderItem(
                    'Noise Floor',
                    ['channelHopSettings', 'noiseFloorThresholdInDB'],
                    renderInputItem,
                    { 
                        min: -90, 
                        max: -10, 
                        error: '-90 - -10 dB',
                        addOnText: 'dBm',
                    },
                )}
                {renderItem(
                    'Noise Floor Time',
                    ['channelHopSettings', 'noiseFloorThresholdTimeInSeconds'],
                    renderInputItem,
                    { 
                        min: 120, 
                        max: 600, 
                        error: '120 - 600 seconds',
                        addOnText: 'sec',
                    },
                )}
                {renderItem(
                    'Non WIFI',
                    ['channelHopSettings', 'nonWifiThresholdInPercentage'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100%',
                        addOnText: '%',
                    },
                )}
                {renderItem(
                    'Non WIFI Time',
                    ['channelHopSettings', 'nonWifiThresholdTimeInSeconds'],
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 500, 
                        error: '0 - 500 seconds',
                        addOnText: 'sec',
                    },
                )}
                {renderItem(
                    'OBSS Hop Mode',
                    ['channelHopSettings', 'obssHopMode'],
                    renderOptionItem,
                    {
                        dropdown: (
                            <Select className={styles.Field}>
                                <Option value="NON_WIFI">Non-Wifi</Option>
                                <Option value="NON_WIFI_AND_OBSS">Non-Wifi and OBSS</Option>
                            </Select>
                        ),
                    }
                )}
            </Card>
        </div>
    );
};

RFForm.propTypes = {
    form: PropTypes.instanceOf(Object),
    details: PropTypes.instanceOf(Object),
  };
  
RFForm.defaultProps = {
    form: {},
    details: {
        rfConfigMap: {
            is2dot4GHz: {},
            is5GHz: {},
            is5GHzU: {},
            is5GHzL: {},
        },
    },
  };

export default RFForm;
