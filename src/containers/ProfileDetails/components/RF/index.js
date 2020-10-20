import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Tooltip  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

const { Item  } = Form;
const { Option } = Select;

const RFForm = ({form, details}) => {

    useEffect(() => {
        form.setFieldsValue({
            // TODO
        });
    }, [details]);

    const defaultOptions = (
        <Select className={styles.Field}>
          <Option value="enabled">enabled</Option>
          <Option value="disabled">disabled</Option>
        </Select>
      );
    
      const setInitialValue = (obj = {}, dataIndex, key, options = {}) => {
        const val = options.value ? obj[key][options.value][dataIndex] : obj[key][dataIndex];
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
            {Object.keys(obj).map(i =>
              renderInput ? (
                renderInput(obj, dataIndex, i, label, options)
              ) : (
                <span key={i} className={styles.spanStyle}>
                  {dataIndex ? obj[i][dataIndex] : obj[i]}
                </span>
              )
            )}
          </div>
        </Item>
      );

      const renderInputItem = (obj = {}, dataIndex, key, label, options = {}) => (
        <Item
          name={dataIndex + options?.value + key}
          initialValue={setInitialValue(obj, dataIndex, key, options)}
          rules={[
            { required: true, message: options.error },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (
                  !value ||
                  (getFieldValue(dataIndex + options?.value + key) <= options.max &&
                    getFieldValue(dataIndex + options?.value + key) >= options.min)
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

      const renderOptionItem = (obj = {}, dataIndex, key, label, options = {}) => (
        <Item
          name={dataIndex + options?.value + key}
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

    return (
        <div className={styles.Profiledetails}>
            <Card>
                {renderItem(' ', ["2.4GHz", "5GHz", "5GHzU", "5GHzL"])}
                {renderItem(
                    'Maximum Devices',
                    details.rfConfigMap,
                    'maxNumClients',
                    renderInputItem,
                    { min: 0, max: 100, error: '0 - 100' }
                )}
                {renderItem(
                    'Channel Bandwidth (MHz)', 
                    details.rfConfigMap, 
                    'channelBandwidth',
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
                    }
                )}
                {/* not found in yaml file */}
                {renderItem('Radio Mode', 
                details.rfConfigMap, 
                'radioMode', 
                renderOptionItem, 
                {
                    dropdown: (
                    <Select className={styles.Field}>
                        <Option value="modeBGN">BGN</Option>
                        <Option value="modeN">N</Option>
                        <Option value="modeAC">AC</Option>
                    </Select>
                    ),
                })}
                {/* details of beconInterval copied from ap table */}
                {renderItem(
                    <span>
                    <Tooltip title="TU (Time Unit) is 1.024ms ">
                        <InfoCircleOutlined />
                    </Tooltip>
                    &nbsp; Beacon Interval (kusecs)
                    </span>,
                    details.rfConfigMap,
                    'beaconInterval',
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
                    }
                )}
                {/* details of RTS/CTS threshold copied from ap table */}
                {renderItem(
                    'RTS/CTS threshold',
                    details.rfConfigMap,
                    'rtsCtsThreshold',
                    renderInputItem,
                    { min: 0, max: 65535, error: '0 - 65535 (Bytes)' }
                )}
                {renderItem('Mimo Mode', 
                    details.rfConfigMap, 
                    'mimoMode',
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
                    }
                )}
                {renderItem(
                    'Management Rate (Mbps)',
                    details.rfConfigMap,
                    'managementRate',
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
                    }
                )}
                {renderItem(
                    'Multicast Rate (Mbps)',
                    details.rfConfigMap,
                    'multicastRate',
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
                    }
                )}
                {renderItem(
                    'Rx Cell Size (dBm)',
                    details.rfConfigMap,
                    'value',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'rxCellSizeDb',
                    }
                )}
                {renderItem(
                    'Probe Response Threshold (dB)',
                    details.rfConfigMap,
                    'value',
                    renderInputItem, 
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'probeResponseThresholdDb',
                    }
                )}
                {renderItem(
                    'Client Disconnect Threshold (dBm)',
                    details.rfConfigMap,
                    'value',
                    renderInputItem, 
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'clientDisconnectThresholdDb', 
                    }
                )}
                {renderItem(
                    'EIRP Tx Power(dBm)',
                    details.rfConfigMap,
                    'value',
                    renderInputItem, 
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'eirpTxPower',
                    }
                )}
                <p>Active Scan Setting:</p>
                {renderItem(
                    'Multicast Rate (Mbps)',
                    details.rfConfigMap,
                    'enabled',
                    renderOptionItem,
                    {
                        dropdown: defaultOptions,
                        value: 'activeScanSettings',
                    },
                )}
                {renderItem(
                    'Scan Frequency (sec)',
                    details.rfConfigMap,
                    'scanFrequencySeconds',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value:'activeScanSettings',
                    }
                )}
                {renderItem(
                    'Scan Duration (ms)',
                    details.rfConfigMap,
                    'scanDurationMillis',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'activeScanSettings',
                    }
                )}
                <p>Neighbouring AP List:</p>
                {renderItem(
                    'Minimum Signal (dBm)',
                    details.rfConfigMap,
                    'minSignal',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'neighbouringListApConfig',
                    }
                )}
                {renderItem(
                    'Maximum APs',
                    details.rfConfigMap,
                    'maxAps',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'neighbouringListApConfig',
                    }
                )}
                <p>Client Steering Thresholds:</p>
                {renderItem(
                    'Min Load (%)',
                    details.rfConfigMap,
                    'minLoadFactor',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'bestApSettings',
                    }
                )}
                {renderItem(
                    'SNR (% Drop)',
                    details.rfConfigMap,
                    'dropInSnrPercentage',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'bestApSettings',
                    }
                )}
                <p>Channel Hop Configuration:</p>
                {renderItem(
                    'Noise Floor (dBm)',
                    details.rfConfigMap,
                    'noiseFloorThresholdInDB',
                    renderInputItem,
                    { 
                        min: -300, 
                        max: 300, 
                        error: '-300 - 300',
                        value: 'channelHopSettings',
                    }
                )}
                {renderItem(
                    'Noise Floor Time (sec)',
                    details.rfConfigMap,
                    'noiseFloorThresholdTimeInSeconds',
                    renderInputItem,
                    { 
                        min: -300, 
                        max: 300, 
                        error: '-300 - 300',
                        value: 'channelHopSettings', 
                    }
                )}
                {renderItem(
                    'Non WIFI (%)',
                    details.rfConfigMap,
                    'nonWifiThresholdInPercentage',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 100, 
                        error: '0 - 100',
                        value: 'channelHopSettings',
                    }
                )}
                {renderItem(
                    'Non WIFI Time (sec)',
                    details.rfConfigMap,
                    'nonWifiThresholdTimeInSeconds',
                    renderInputItem,
                    { 
                        min: 0, 
                        max: 500, 
                        error: '0 - 500',
                        value: 'channelHopSettings',
                    }
                )}
                {renderItem(
                    'OBSS Hop Mode',
                    details.rfConfigMap,
                    'obssHopMode',
                    renderOptionItem,
                    {
                        dropdown: (
                            <Select className={styles.Field}>
                                <Option value="NON_WIFI">Non-Wifi</Option>
                                <Option value="NON_WIFI_AND_OBSS">Non-Wifi and OBSS</Option>
                            </Select>
                        ),
                        value: 'channelHopSettings',
                    }
                )}
            </Card>
        </div>
    );
};

const defaultRadio = {
    radioMode: null, // not in yaml file yet
    autoChannelSelection: false,
    beaconInterval: 0,
    forceScanDuringVoice: 'disabled',
    rtsCtsThreshold: 0,
    channelBandwidth: 'is20MHz',
    mimoMode: 'none',
    maxNumClients: 0,
    multicastRate: 'rate6mbps',
    activeScanSettings: {
        enabled: true,
        scanFrequencySeconds: 0,
        scanDurationMillis:0,
    },
    managementRate: 'rate1mbps',
    rxCellSizeDb: {
        auto: null,
        value: 0,
    },
    probeResponseThresholdDb: {
        auto: null,
        value: 0,
    },
    clientDisconnectThresholdDb: {
        auto: null,
        value: 0,
    },
    eirpTxPower: {
        auto: null,
        value: 0,
    },
    bestApEnabled: true,
    neighbouringListApConfig: {
        minSignal: 0,
        maxAps: 0,
    },
    minAutoCellSize: 0,
    perimeterDetectionEnabled: true,
    channelHopSettings: {
        noiseFloorThresholdInDB: -75,
        noiseFloorThresholdTimeInSeconds: 180,
        nonWifiThresholdInPercentage: 50,
        nonWifiThresholdTimeInSeconds: 180,
        obssHopMode: 'NON_WIFI',
    },
    bestApSettings: {
        mlComputed: true,
        dropInSnrPercentage: 10,
        minLoadFactor: 10,
    },
};

RFForm.propTypes = {
    form: PropTypes.instanceOf(Object),
    details: PropTypes.instanceOf(Object),
  };
  
RFForm.defaultProps = {
    form: null,
    details: {
        rfConfigMap: {
            is2dot4GHz: defaultRadio,
            is5GHz: defaultRadio,
            is5GHzU: defaultRadio,
            is5GHzL: defaultRadio,
        }
    },
  };

export default RFForm;
