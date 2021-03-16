import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { EditableContext } from '../EditableRow';
import styles from './index.module.scss';

const { Item } = Form;
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

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const validateInput = (input, key) => {
    if (
      key === 'probeResponseThreshold' ||
      key === 'clientDisconnectThreshold' ||
      key === 'cellSize'
    ) {
      return input >= -100 && input <= 100;
    }
    if (key === 'snrDrop' || key === 'minLoad') {
      return input >= 0 && input <= 100;
    }
    return input >= -1 && input <= 165;
  };

  const validateChannelInput = key => {
    if (key === 'manualChannelNumber') {
      return (
        form
          .getFieldValue('manualChannelNumber')
          .split(',')
          .filter(channel => record.manualBackupChannelNumber.includes(parseInt(channel, 10)))
          .length === 0
      );
    }

    return (
      form
        .getFieldValue('manualBackupChannelNumber')
        .split(',')
        .filter(channel => record.manualChannelNumber.includes(parseInt(channel, 10))).length === 0
    );
  };

  const errorText = key => {
    if (
      key === 'probeResponseThreshold' ||
      key === 'clientDisconnectThreshold' ||
      key === 'cellSize'
    ) {
      return `-100 - 100`;
    }

    if (key === 'snrDrop' || key === 'minLoad') {
      return `1 - 100`;
    }

    return `1 - 165`;
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
                  if (!validateChannelInput(dataIndex)) {
                    return Promise.reject(
                      new Error(`Active and backup channels must be different`)
                    );
                  }
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
