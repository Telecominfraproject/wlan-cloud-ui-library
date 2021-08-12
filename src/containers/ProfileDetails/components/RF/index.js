import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { Card, Form, Select as AntdSelect } from 'antd';
import { Input, Select } from 'components/WithRoles';
import DisabledText from 'components/DisabledText';

import ThemeContext from 'contexts/ThemeContext';

import { DEFAULT_RF_PROFILE } from '../constants';
import styles from '../index.module.scss';
import { RADIOS, ALLOWED_CHANNEL_BANDWIDTH } from '../../constants';

const { Item } = Form;
const { Option } = AntdSelect;

const defaultOptions = (
  <Select>
    <Option value="true">Enabled</Option>
    <Option value="false">Disabled</Option>
  </Select>
);

const RFForm = ({ form, details, extraFields }) => {
  const { radioTypes } = useContext(ThemeContext);
  const currentRadios = Object.keys(details.rfConfigMap).sort();

  useEffect(() => {
    const formData = {
      rfConfigMap: {},
    };

    currentRadios.forEach(radio => {
      formData.rfConfigMap[radio] = {
        radioType: details.rfConfigMap[radio]?.radioType ?? radio,
        radioMode: details.rfConfigMap[radio]?.radioMode ?? DEFAULT_RF_PROFILE[radio].radioMode,
        beaconInterval:
          details.rfConfigMap[radio]?.beaconInterval ?? DEFAULT_RF_PROFILE[radio].beaconInterval,
        forceScanDuringVoice:
          details.rfConfigMap[radio]?.forceScanDuringVoice ??
          DEFAULT_RF_PROFILE[radio].forceScanDuringVoice,
        rtsCtsThreshold:
          details.rfConfigMap[radio]?.rtsCtsThreshold ?? DEFAULT_RF_PROFILE[radio].rtsCtsThreshold,
        channelBandwidth:
          details.rfConfigMap[radio]?.channelBandwidth ??
          DEFAULT_RF_PROFILE[radio].channelBandwidth,
        mimoMode: details.rfConfigMap[radio]?.mimoMode ?? DEFAULT_RF_PROFILE[radio].mimoMode,
        maxNumClients:
          details.rfConfigMap[radio]?.maxNumClients ?? DEFAULT_RF_PROFILE[radio].maxNumClients,
        multicastRate:
          details.rfConfigMap[radio]?.multicastRate ?? DEFAULT_RF_PROFILE[radio].multicastRate,
        managementRate:
          details.rfConfigMap[radio]?.managementRate ?? DEFAULT_RF_PROFILE[radio].managementRate,
        rxCellSizeDb:
          details.rfConfigMap[radio]?.rxCellSizeDb ?? DEFAULT_RF_PROFILE[radio].rxCellSizeDb,
        probeResponseThresholdDb:
          details.rfConfigMap[radio]?.probeResponseThresholdDb ??
          DEFAULT_RF_PROFILE[radio].probeResponseThresholdDb,
        clientDisconnectThresholdDb:
          details.rfConfigMap[radio]?.clientDisconnectThresholdDb ??
          DEFAULT_RF_PROFILE[radio].clientDisconnectThresholdDb,
        eirpTxPower:
          details.rfConfigMap[radio]?.eirpTxPower ?? DEFAULT_RF_PROFILE[radio].eirpTxPower,
        autoChannelSelection:
          details.rfConfigMap[radio]?.autoChannelSelection?.toString() ??
          DEFAULT_RF_PROFILE[radio].autoChannelSelection.toString(),
        autoCellSizeSelection:
          details.rfConfigMap[radio]?.autoCellSizeSelection?.toString() ??
          (extraFields.length
            ? DEFAULT_RF_PROFILE[radio].autoCellSizeSelection.toString()
            : 'false'),
        maxAutoCellSize:
          details.rfConfigMap[radio]?.maxAutoCellSize ?? DEFAULT_RF_PROFILE[radio].maxAutoCellSize,
        minAutoCellSize:
          details.rfConfigMap[radio]?.minAutoCellSize ?? DEFAULT_RF_PROFILE[radio].minAutoCellSize,
        useMaxTxPower:
          details.rfConfigMap[radio]?.useMaxTxPower?.toString() ??
          DEFAULT_RF_PROFILE[radio].useMaxTxPower.toString(),
        channelHopSettings: {
          noiseFloorThresholdInDB:
            details.rfConfigMap[radio]?.channelHopSettings?.noiseFloorThresholdInDB ??
            DEFAULT_RF_PROFILE[radio].channelHopSettings.noiseFloorThresholdInDB,
          noiseFloorThresholdTimeInSeconds:
            details.rfConfigMap[radio]?.channelHopSettings?.noiseFloorThresholdTimeInSeconds ??
            DEFAULT_RF_PROFILE[radio].channelHopSettings.noiseFloorThresholdTimeInSeconds,
          nonWifiThresholdInPercentage:
            details.rfConfigMap[radio]?.channelHopSettings?.nonWifiThresholdInPercentage ??
            DEFAULT_RF_PROFILE[radio].channelHopSettings.nonWifiThresholdInPercentage,
          nonWifiThresholdTimeInSeconds:
            details.rfConfigMap[radio]?.channelHopSettings?.nonWifiThresholdTimeInSeconds ??
            DEFAULT_RF_PROFILE[radio].channelHopSettings.nonWifiThresholdTimeInSeconds,
          obssHopMode:
            details.rfConfigMap[radio]?.channelHopSettings?.obssHopMode ??
            DEFAULT_RF_PROFILE[radio].channelHopSettings.obssHopMode,
        },
        bestApSettings: {
          mlComputed: details.rfConfigMap[radio]?.bestApSettings?.mlComputed ?? 'true',
          dropInSnrPercentage:
            details.rfConfigMap[radio]?.bestApSettings?.dropInSnrPercentage ??
            DEFAULT_RF_PROFILE[radio].bestApSettings.dropInSnrPercentage,
          minLoadFactor:
            details.rfConfigMap[radio]?.bestApSettings?.minLoadFactor ??
            DEFAULT_RF_PROFILE[radio].bestApSettings.minLoadFactor,
        },
      };
    });

    form.setFieldsValue({ ...formData });
  }, [form, details]);

  const itemWithDependency = (dependencies, key, inputField, disabledText = '') => (
    <Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        Object.keys(dependencies).some(
          i => prevValues.rfConfigMap?.[key]?.[i] !== currentValues.rfConfigMap?.[key]?.[i]
        )
      }
      key={key}
    >
      {({ getFieldValue }) => {
        const dependentField = Object.keys(dependencies).find(
          i => getFieldValue(['rfConfigMap', key, i]) === dependencies[i]
        );
        const value = getFieldValue(['rfConfigMap', key, dependentField]);
        let formattedValue = '';
        if (value === 'true' || value === 'false') {
          formattedValue = value === 'true' ? 'enabled' : 'disabled';
        } else {
          formattedValue = `value: ${startCase(value)}`;
        }

        return dependentField ? (
          <DisabledText
            title={`The ${radioTypes[key]} radio has "${startCase(
              dependentField
            )}" ${formattedValue}`}
            value={disabledText || 'N/A'}
          />
        ) : (
          inputField
        );
      }}
    </Item>
  );

  const renderItem = (label, dataIndex, renderInput, options = {}) => {
    const Wrapper = (
      <Item label={label} key={label} hidden={options.hidden ?? false}>
        <div className={styles.InlineDiv}>
          {currentRadios.map(i => renderInput(dataIndex, i, label, options))}
        </div>
      </Item>
    );

    if (options.dependencies) {
      return (
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            Object.keys(options.dependencies).some(key =>
              currentRadios.some(
                radio =>
                  prevValues.rfConfigMap?.[radio]?.[key] !==
                  currentValues.rfConfigMap?.[radio]?.[key]
              )
            )
          }
          key={label}
        >
          {({ getFieldValue }) => {
            return Object.keys(options.dependencies).every(key =>
              currentRadios.some(
                radio => getFieldValue(['rfConfigMap', radio, key]) !== options.dependencies[key]
              )
            )
              ? Wrapper
              : null;
          }}
        </Item>
      );
    }

    return Wrapper;
  };

  const renderInputItem = (dataIndex, key, label, options = {}) => {
    const inputField = (
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
          placeholder={`Enter ${label} for ${radioTypes?.[key]}`}
          type="number"
          min={options.min}
          max={options.max}
          addonAfter={options?.addOnText ? options?.addOnText : ''}
        />
      </Item>
    );

    if (options.dependencies) {
      return itemWithDependency(options.dependencies, key, inputField, options.disabledText);
    }
    return inputField;
  };

  const renderOptionItem = (dataIndex, key, label, options = {}) => {
    const inputField = (
      <Item
        key={key}
        name={['rfConfigMap', key, ...dataIndex]}
        rules={[
          {
            required: true,
            message: `Select ${label} for ${radioTypes?.[key]}`,
          },
        ]}
      >
        {typeof options.dropdown === 'function' ? options.dropdown(key) : options.dropdown}
      </Item>
    );

    if (options.dependencies) {
      return itemWithDependency(options.dependencies, key, inputField, options.disabledText);
    }
    return inputField;
  };

  const channelBandwidthSelect = () => {
    const optionItem = key => {
      return (
        <Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.rfConfigMap?.[key]?.radioMode !== currentValues.rfConfigMap?.[key]?.radioMode
          }
          key={key}
        >
          {({ getFieldValue }) => {
            const value = getFieldValue(['rfConfigMap', key, 'radioMode']);
            return (
              <>
                <Item
                  key={key}
                  name={['rfConfigMap', key, 'channelBandwidth']}
                  rules={[
                    {
                      required: true,
                      message: `Select Channel Bandwidth for ${radioTypes?.[key]}`,
                    },
                  ]}
                >
                  <Select placeholder="Select Bandwidth">
                    <Option value="is20MHz">20MHz</Option>
                    {key !== 'is2dot4GHz' && value !== 'modeA' && (
                      <>
                        <Option value="is40MHz">40MHz</Option>
                        {value !== 'modeN' && (
                          <>
                            <Option value="is80MHz">80MHz</Option>
                            <Option value="is160MHz">160MHz</Option>
                          </>
                        )}
                      </>
                    )}
                  </Select>
                </Item>
              </>
            );
          }}
        </Item>
      );
    };

    return (
      <Item label="Channel Bandwidth" key="Channel Bandwidth">
        <div className={styles.InlineDiv}>{currentRadios.map(i => optionItem(i))}</div>
      </Item>
    );
  };

  const onRadioModeChange = (value, radio) => {
    const rfConfigMap = form.getFieldValue('rfConfigMap');
    const channelBandwidth = form.getFieldValue(['rfConfigMap', radio, 'channelBandwidth']);
    form.setFieldsValue({
      rfConfigMap: {
        ...rfConfigMap,
        [radio]: {
          ...rfConfigMap[radio],
          ...(radio !== 'is2dot4GHz' &&
            !ALLOWED_CHANNEL_BANDWIDTH[value].includes(channelBandwidth) && {
              channelBandwidth: null,
            }),
          ...(value === 'modeA' && { autoCellSizeSelection: 'false' }),
        },
      },
    });
  };

  return (
    <div className={styles.ProfilePage}>
      <Card>
        <Item wrapperCol={{ offset: 5, span: 15 }}>
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
        {renderItem('Radio Mode', ['radioMode'], renderOptionItem, {
          dropdown: key => {
            return (
              <Select onChange={value => onRadioModeChange(value, key)}>
                <Option value="auto">Auto</Option>
                {key === 'is2dot4GHz' && (
                  <>
                    <Option value="modeG">G</Option>
                  </>
                )}
                {key !== 'is2dot4GHz' && (
                  <>
                    <Option value="modeA">A</Option>
                    <Option value="modeAC">AC</Option>
                  </>
                )}
                <Option value="modeN">N</Option>
                <Option value="modeAX">AX</Option>
              </Select>
            );
          },
        })}
        {channelBandwidthSelect()}
        {renderItem('Beacon Interval', ['beaconInterval'], renderInputItem, {
          min: 50,
          max: 65535,
          error: '50 - 65535',
          addOnText: 'ms',
        })}
        {renderItem('RTS/CTS threshold', ['rtsCtsThreshold'], renderInputItem, {
          min: 0,
          max: 65535,
          error: '0 - 65535 (Bytes)',
          addOnText: 'bytes',
        })}
        {renderItem('MIMO Mode', ['mimoMode'], renderOptionItem, {
          dropdown: (
            <Select>
              <Option value="none">Auto</Option>
              <Option value="oneByOne">1x1</Option>
              <Option value="twoByTwo">2x2</Option>
              <Option value="threeByThree">3x3</Option>
              <Option value="fourByFour">4x4</Option>
              <Option value="eightByEight">8x8</Option>
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
        {renderItem('Management Rate (Mbps)', ['managementRate'], renderOptionItem, {
          dropdown: key => (
            <Select>
              <Option value="auto">Auto</Option>
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
          dependencies: { autoCellSizeSelection: 'true' },
        })}
        {renderItem('Multicast Rate (Mbps)', ['multicastRate'], renderOptionItem, {
          dropdown: (
            <Select>
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
          dependencies: { autoCellSizeSelection: 'true' },
        })}
        {renderItem('Probe Response Threshold', ['probeResponseThresholdDb'], renderInputItem, {
          min: -100,
          max: -40,
          error: '-100 - -40 dBm',
          addOnText: 'dBm',
          dependencies: { autoCellSizeSelection: 'true' },
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
            dependencies: { autoCellSizeSelection: 'true' },
          }
        )}
        {renderItem('Max EIRP Tx Power', ['useMaxTxPower'], renderOptionItem, {
          dropdown: defaultOptions,
          dependencies: { autoCellSizeSelection: 'true' },
        })}
        {renderItem('EIRP Tx Power', ['eirpTxPower'], renderInputItem, {
          min: 1,
          max: 32,
          error: '1 - 32 dBm',
          addOnText: 'dBm',
          dependencies: { autoCellSizeSelection: 'true', useMaxTxPower: 'true' },
        })}

        {renderItem('Min Load', ['bestApSettings', 'minLoadFactor'], renderInputItem, {
          min: 0,
          max: 100,
          error: '0 - 100%',
          addOnText: '%',
          hidden: true,
        })}
        {renderItem('SNR', ['bestApSettings', 'dropInSnrPercentage'], renderInputItem, {
          min: 0,
          max: 100,
          error: '0 - 100%',
          addOnText: '% Drop',
          hidden: true,
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
            <Select>
              <Option value="NON_WIFI">Non-IBSS</Option>
              <Option value="NON_WIFI_AND_OBSS">Non-IBSS Time</Option>
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
