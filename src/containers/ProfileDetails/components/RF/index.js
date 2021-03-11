import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Select } from 'antd';
import ThemeContext from 'contexts/ThemeContext';

import { defaultRfProfile } from '../constants';
import styles from '../index.module.scss';
import { RADIOS } from '../../constants';

const { Item } = Form;
const { Option } = Select;

const RFForm = ({ form, details, extraFields }) => {
  const { radioTypes } = useContext(ThemeContext);
  const currentRadios = Object.keys(details.rfConfigMap).sort();

  useEffect(() => {
    const formData = {
      rfConfigMap: {},
    };

    currentRadios.forEach(radio => {
      formData.rfConfigMap[radio] = {
        radioType: details.rfConfigMap[radio]?.radioType || radio,
        radioMode: details.rfConfigMap[radio]?.radioMode || defaultRfProfile[radio].radioMode,
        beaconInterval:
          details.rfConfigMap[radio]?.beaconInterval || defaultRfProfile[radio].beaconInterval,
        forceScanDuringVoice:
          details.rfConfigMap[radio]?.forceScanDuringVoice ||
          defaultRfProfile[radio].forceScanDuringVoice,
        rtsCtsThreshold:
          details.rfConfigMap[radio]?.rtsCtsThreshold || defaultRfProfile[radio].rtsCtsThreshold,
        channelBandwidth:
          details.rfConfigMap[radio]?.channelBandwidth || defaultRfProfile[radio].channelBandwidth,
        mimoMode: details.rfConfigMap[radio]?.mimoMode || defaultRfProfile[radio].mimoMode,
        maxNumClients:
          details.rfConfigMap[radio]?.maxNumClients || defaultRfProfile[radio].maxNumClients,
        multicastRate:
          details.rfConfigMap[radio]?.multicastRate || defaultRfProfile[radio].multicastRate,
        managementRate:
          details.rfConfigMap[radio]?.managementRate || defaultRfProfile[radio].managementRate,
        rxCellSizeDb:
          details.rfConfigMap[radio]?.rxCellSizeDb || defaultRfProfile[radio].rxCellSizeDb,
        probeResponseThresholdDb:
          details.rfConfigMap[radio]?.probeResponseThresholdDb ||
          defaultRfProfile[radio].probeResponseThresholdDb,
        clientDisconnectThresholdDb:
          details.rfConfigMap[radio]?.clientDisconnectThresholdDb ||
          defaultRfProfile[radio].clientDisconnectThresholdDb,
        eirpTxPower: details.rfConfigMap[radio]?.eirpTxPower || defaultRfProfile[radio].eirpTxPower,
        autoChannelSelection: details.rfConfigMap[radio]?.autoChannelSelection ? 'true' : 'false',
        activeScanSettings: {
          enabled: details.rfConfigMap[radio]?.activeScanSettings?.enabled ? 'true' : 'false',
          scanFrequencySeconds:
            details.rfConfigMap[radio]?.activeScanSettings?.scanFrequencySeconds ||
            defaultRfProfile[radio].activeScanSettings.scanFrequencySeconds,
          scanDurationMillis:
            details.rfConfigMap[radio]?.activeScanSettings?.scanDurationMillis ||
            defaultRfProfile[radio].activeScanSettings.scanDurationMillis,
        },
        neighbouringListApConfig: {
          minSignal:
            details.rfConfigMap[radio]?.neighbouringListApConfig?.minSignal ||
            defaultRfProfile[radio].neighbouringListApConfig.minSignal,
          maxAps:
            details.rfConfigMap[radio]?.neighbouringListApConfig?.maxAps ||
            defaultRfProfile[radio].neighbouringListApConfig.maxAps,
        },
        channelHopSettings: {
          noiseFloorThresholdInDB:
            details.rfConfigMap[radio]?.channelHopSettings?.noiseFloorThresholdInDB ||
            defaultRfProfile[radio].channelHopSettings.noiseFloorThresholdInDB,
          noiseFloorThresholdTimeInSeconds:
            details.rfConfigMap[radio]?.channelHopSettings?.noiseFloorThresholdTimeInSeconds ||
            defaultRfProfile[radio].channelHopSettings.noiseFloorThresholdTimeInSeconds,
          nonWifiThresholdInPercentage:
            details.rfConfigMap[radio]?.channelHopSettings?.nonWifiThresholdInPercentage ||
            defaultRfProfile[radio].channelHopSettings.nonWifiThresholdInPercentage,
          nonWifiThresholdTimeInSeconds:
            details.rfConfigMap[radio]?.channelHopSettings?.nonWifiThresholdTimeInSeconds ||
            defaultRfProfile[radio].channelHopSettings.nonWifiThresholdTimeInSeconds,
          obssHopMode:
            details.rfConfigMap[radio]?.channelHopSettings?.obssHopMode ||
            defaultRfProfile[radio].channelHopSettings.obssHopMode,
        },
        bestApSettings: {
          mlComputed: details.rfConfigMap[radio]?.bestApSettings?.mlComputed || 'true',
          dropInSnrPercentage:
            details.rfConfigMap[radio]?.bestApSettings?.dropInSnrPercentage ||
            defaultRfProfile[radio].bestApSettings.dropInSnrPercentage,
          minLoadFactor:
            details.rfConfigMap[radio]?.bestApSettings?.minLoadFactor ||
            defaultRfProfile[radio].bestApSettings.minLoadFactor,
        },
      };
    });

    form.setFieldsValue({ ...formData });
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
        {currentRadios.map(i => renderInput(dataIndex, i, label, options))}
      </div>
    </Item>
  );

  const renderInputItem = (dataIndex, key, label, options = {}) => (
    <Item
      name={['rfConfigMap', key, ...dataIndex]}
      key={key}
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
      key={key}
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
    <div className={styles.ProfilePage}>
      <Card>
        <Item label={' '} colon={false}>
          <div className={styles.InlineDiv}>
            {currentRadios.map(radio => (
              <span key={radio} className={styles.spanStyle}>
                {radioTypes?.[radio]}
              </span>
            ))}
          </div>
        </Item>
        {renderItem('Maximum Devices', ['maxNumClients'], renderInputItem, {
          min: 0,
          max: 100,
          error: '0 - 100',
        })}
        {renderItem('Channel Bandwidth (MHz)', ['channelBandwidth'], renderOptionItem, {
          dropdown: key => {
            return (
              <Select className={styles.Field}>
                <Option value="is20MHz">20MHz</Option>
                {key !== 'is2dot4GHz' && (
                  <>
                    <Option value="is40MHz">40MHz</Option>
                    <Option value="is80MHz">80MHz</Option>
                    <Option value="is160MHz">160MHz</Option>
                  </>
                )}
              </Select>
            );
          },
        })}
        {renderItem('Radio Mode', ['radioMode'], renderOptionItem, {
          dropdown: key => {
            return (
              <Select className={styles.Field}>
                <Option value="modeN">N</Option>
                {key === 'is2dot4GHz' && (
                  <>
                    <Option value="modeB">B</Option>
                    <Option value="modeG">G</Option>
                  </>
                )}
                {key !== 'is2dot4GHz' && (
                  <>
                    <Option value="modeAC">AC</Option>
                    <Option value="modeGN">GN</Option>
                    <Option value="modeA">A</Option>
                    <Option value="modeAB">AB</Option>
                  </>
                )}
                <Option value="modeAX">AX</Option>
              </Select>
            );
          },
        })}
        {renderItem(
          <span>Beacon Interval (milliseconds)</span>,
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
          }
        )}
        {renderItem('RTS/CTS threshold', ['rtsCtsThreshold'], renderInputItem, {
          min: 0,
          max: 65535,
          error: '0 - 65535 (Bytes)',
          addOnText: 'bytes',
        })}
        {renderItem('MIMO Mode', ['mimoMode'], renderOptionItem, {
          dropdown: (
            <Select className={styles.Field}>
              <Option value="none">Auto</Option>
              <Option value="oneByOne">1x1</Option>
              <Option value="twoByTwo">2x2</Option>
              <Option value="threeByThree">3x3</Option>
              <Option value="fourByFour">4x4</Option>
            </Select>
          ),
        })}
        {renderItem('Management Rate (Mbps)', ['managementRate'], renderOptionItem, {
          dropdown: (
            <Select className={styles.Field}>
              <Option value="auto">Auto</Option>
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
        })}
        {renderItem('Multicast Rate (Mbps)', ['multicastRate'], renderOptionItem, {
          dropdown: (
            <Select className={styles.Field}>
              <Option value="auto">Auto</Option>
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
        })}
        {extraFields.map(field =>
          renderItem(
            field.label,
            field.dataIndex,
            field.renderInput === 'renderInputItem' ? renderInputItem : renderOptionItem,
            field.options
          )
        )}
        {renderItem('Probe Response Threshold', ['probeResponseThresholdDb'], renderInputItem, {
          min: -100,
          max: 100,
          error: '-100 - 100 dBm',
          addOnText: 'dBm',
        })}
        {renderItem(
          'Client Disconnect Threshold',
          ['clientDisconnectThresholdDb'],
          renderInputItem,
          {
            min: -100,
            max: 0,
            error: '-100 - 0 dBm',
            addOnText: 'dBm',
          }
        )}
        {renderItem('EIRP Tx Power', ['eirpTxPower'], renderInputItem, {
          min: 1,
          max: 32,
          error: '1 - 32 dBm',
          addOnText: 'dBm',
        })}
        <p>Active Scan Setting:</p>
        {renderItem('Enable', ['activeScanSettings', 'enabled'], renderOptionItem, {
          dropdown: defaultOptions,
        })}
        {renderItem(
          'Scan Frequency',
          ['activeScanSettings', 'scanFrequencySeconds'],
          renderInputItem,
          {
            min: 0,
            max: 100,
            error: '0 - 100 seconds',
            addOnText: 'sec',
          }
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
          }
        )}
        <p>Neighbouring AP List:</p>
        {renderItem('Minimum Signal', ['neighbouringListApConfig', 'minSignal'], renderInputItem, {
          min: -90,
          max: -50,
          error: '-90 - -50 dBm',
          addOnText: 'dBm',
        })}
        {renderItem('Maximum APs', ['neighbouringListApConfig', 'maxAps'], renderInputItem, {
          min: 0,
          max: 512,
          error: '0 - 512 APs',
        })}
        <p>Client Steering Thresholds:</p>
        {renderItem('Min Load', ['bestApSettings', 'minLoadFactor'], renderInputItem, {
          min: 0,
          max: 100,
          error: '0 - 100%',
          addOnText: '%',
        })}
        {renderItem('SNR', ['bestApSettings', 'dropInSnrPercentage'], renderInputItem, {
          min: 0,
          max: 100,
          error: '0 - 100%',
          addOnText: '% Drop',
        })}
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
          }
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
          }
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
          }
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
          }
        )}
        {renderItem('OBSS Hop Mode', ['channelHopSettings', 'obssHopMode'], renderOptionItem, {
          dropdown: (
            <Select className={styles.Field}>
              <Option value="NON_WIFI">Non-Wifi</Option>
              <Option value="NON_WIFI_AND_OBSS">Non-Wifi and OBSS</Option>
            </Select>
          ),
        })}
      </Card>
    </div>
  );
};

RFForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
  extraFields: PropTypes.instanceOf(Array),
};

RFForm.defaultProps = {
  form: {},
  details: {
    // eslint-disable-next-line no-return-assign, no-sequences
    rfConfigMap: RADIOS.reduce((acc, i) => ((acc[i] = {}), acc), {}),
  },
  extraFields: [],
};

export default RFForm;
