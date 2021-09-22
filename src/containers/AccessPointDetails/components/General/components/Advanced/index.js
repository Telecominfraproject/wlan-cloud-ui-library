import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Select as AntdSelect } from 'antd';
import { Input, Select } from 'components/WithRoles';
import _ from 'lodash';
import DisabledText from 'components/DisabledText';
import Tooltip from 'components/Tooltip';

import { sortRadioTypes } from 'utils/sortRadioTypes';
import { USER_FRIENDLY_RATES, USER_FRIENDLY_BANDWIDTHS } from '../../constants';

import styles from '../../../../index.module.scss';

const { Option } = AntdSelect;

const Advanced = ({ extraFields, childProfiles, data, radioTypes, form, Item }) => {
  const { details: { advancedRadioMap = {}, radioMap = {} } = {} } = data;

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
        };
      });

      console.log(formData);

      form.setFieldsValue({ ...formData });
    }
  }, [data]);

  useEffect(() => {
    if (data?.details) {
      const currentRadios = Object.keys(advancedRadioMap);
      const formData = {
        radioMap: {},
      };
      currentRadios.forEach(radio => {
        const isEnabled =
          childProfiles.rf?.[0]?.details?.rfConfigMap?.[radio]?.autoChannelSelection;
        formData.radioMap[radio] = {
          [isEnabled ? 'channelNumber' : 'manualChannelNumber']: isEnabled
            ? radioMap[radio]?.channelNumber
            : radioMap[radio]?.manualChannelNumber,
          [isEnabled ? 'backupChannelNumber' : 'manualBackupChannelNumber']: isEnabled
            ? radioMap[radio]?.backupChannelNumber
            : radioMap[radio]?.manualBackupChannelNumber,
        };
      });

      console.log(formData);

      form.setFieldsValue({ ...formData });
    }
  }, [data]);

  const renderItem = (label, obj = {}, dataIndex, renderInput, options = {}) => {
    if (extraFields.some(field => field.label === label)) {
      return null;
    }
    return (
      <Item
        label={label}
        colon={dataIndex !== 'radioType'}
        key={label}
        hidden={options.hidden ?? false}
      >
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
                )}" enabled in the RF Profile`}
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
              )}" disabled in the RF Profile`}
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

            let channel;
            if (label === 'Active Channel') {
              channel = isEnabled
                ? {
                    dataIndex: 'channelNumber',
                    addOnText: (
                      <Tooltip
                        text="Auto"
                        title={`The ${radioTypes[key]} radio has "Auto Channel Selection" enabled in the RF Profile`}
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
                        title={`The ${radioTypes[key]} radio has "Auto Channel Selection" enabled in the RF Profile`}
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

            const allowedChannels = powerLevels
              .filter(item => {
                if (channel.dataIndex === 'manualBackupChannelNumber') {
                  return !item.dfs;
                }
                return item;
              })
              .map(item => item?.channelNumber)
              .sort((a, b) => a - b);

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
        {sortRadioTypes(Object.keys(radioMap)).map(radio => (
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

  return (
    <>
      {renderItem(' ', data?.details?.radioMap, 'radioType')}
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
          max: -40,
          error: '-100 - -40 dBm',
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
          hidden: true,
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
          hidden: true,
        }
      )}
    </>
  );
};

Advanced.propTypes = {
  extraFields: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Object),
  childProfiles: PropTypes.instanceOf(Object),
  radioTypes: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
  Item: PropTypes.node,
};

Advanced.defaultProps = {
  extraFields: [],
  data: {},
  childProfiles: {},
  radioTypes: {},
  form: null,
  Item: Form.Item,
};

export default Advanced;
