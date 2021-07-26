import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import ThemeContext from 'contexts/ThemeContext';

import { EditableContext } from '../EditableRow';

import styles from './index.module.scss';

const { Item } = Form;

const isNumeric = value => {
  return /^\s?\d+$/.test(value);
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  const { radioTypes } = useContext(ThemeContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    form
      .validateFields()
      .then(() => {
        setEditing(!editing);
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
      })
      .catch(() => {});
  };

  const validateInput = (input, key) => {
    if (key === 'clientDisconnectThreshold' || key === 'cellSize') {
      return input >= -100 && input <= 0;
    }

    if (key === 'probeResponseThreshold') {
      return input >= -100 && input <= -40;
    }

    return input >= 0 && input <= 100;
  };

  const validateChannelInput = key => {
    const dependentKey =
      key === 'manualChannelNumber' ? 'manualBackupChannelNumber' : 'manualChannelNumber';

    const input = form.getFieldValue(key).split(',');

    return Promise.all(
      input.map((channel, i) => {
        const channels = record.allowedChannels[i]
          .filter(item => {
            if (key === 'manualBackupChannelNumber') {
              return !item.dfs;
            }
            return item;
          })
          .map(item => item?.channelNumber, 10)
          .sort((a, b) => a - b);

        const parsedChannel = parseInt(channel, 10);

        if (!isNumeric(channel)) {
          return Promise.reject(
            new Error(`Enter a valid channel number for ${radioTypes[record.radioMap[i]]}`)
          );
        }

        if (!channels.includes(parsedChannel)) {
          return Promise.reject(
            new Error(
              `Allowed Channels for ${radioTypes[record.radioMap[i]]}: ${channels.join(', ')}`
            )
          );
        }
        if (record[dependentKey].includes(parsedChannel)) {
          return Promise.reject(
            new Error(
              `Active and Backup channels for ${
                radioTypes[record.radioMap[i]]
              } radio must be different`
            )
          );
        }
        return Promise.resolve();
      })
    )
      .then(() => Promise.resolve())
      .catch(e => Promise.reject(e));
  };

  const errorText = key => {
    if (key === 'clientDisconnectThreshold' || key === 'cellSize') {
      return '-100 - 0';
    }

    if (key === 'probeResponseThreshold') {
      return '-100 - -40';
    }

    if (key === 'snrDrop' || key === 'minLoad') {
      return `1 - 100`;
    }

    if (key === 'manualChannelNumber') {
      return `Enter Active Channels`;
    }
    return `Enter Backup Channels`;
  };

  const save = () => {
    form
      .validateFields()
      .then(values => {
        toggleEdit();
        handleSave({ ...record }, values);
      })
      .catch(() => {});
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Item
        data-testid={`bulkEditFormElement-${record.name}-${dataIndex}`}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: errorText(dataIndex),
          },
          () => ({
            validator(_rule, values) {
              if (typeof values === 'string') {
                if (values.split(',').length !== record.radioMap.length) {
                  return Promise.reject(new Error(`Enter a valid configuration`));
                }

                if (
                  dataIndex === 'manualChannelNumber' ||
                  dataIndex === 'manualBackupChannelNumber'
                ) {
                  return validateChannelInput(dataIndex);
                }

                if (!values || values.split(',').every(value => validateInput(value, dataIndex))) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(errorText(dataIndex)));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          data-testid={`bulkEditFormInput-${record.name}-${dataIndex}`}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Item>
    ) : (
      <div
        data-testid={`bulkEditTableCell-${record.name}-${dataIndex}`}
        className={styles.editableCellValueWrap}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
EditableCell.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  dataIndex: PropTypes.string,
  record: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    cellSize: PropTypes.instanceOf(Array),
    manualChannelNumber: PropTypes.instanceOf(Array),
    manualBackupChannelNumber: PropTypes.instanceOf(Array),
    clientDisconnectThreshold: PropTypes.instanceOf(Array),
    probeResponseThreshold: PropTypes.instanceOf(Array),
    snrDrop: PropTypes.instanceOf(Array),
    minLoad: PropTypes.instanceOf(Array),
    radioMap: PropTypes.instanceOf(Array),
    id: PropTypes.string,
    allowedChannels: PropTypes.instanceOf(Array),
  }),
  handleSave: PropTypes.func,
};

EditableCell.defaultProps = {
  title: '',
  editable: false,
  dataIndex: '',
  record: {},
  handleSave: () => {},
};
