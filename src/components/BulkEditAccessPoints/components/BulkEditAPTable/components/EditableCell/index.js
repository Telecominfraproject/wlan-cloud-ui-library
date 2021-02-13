import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { EditableContext } from '../EditableRow';
import styles from './index.module.scss';

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
      <Form.Item
        data-testid={`bulkEditFormElement-${record.name}-${dataIndex}`}
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} IS REQUIRED.`,
          },
        ]}
      >
        <Input
          data-testid={`bulkEditFormInput-${record.name}-${dataIndex}`}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        data-testid={`bulkEditTableCell-${record.name}-${dataIndex}`}
        className={styles.editableCellValueWrap}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        style={{
          paddingRight: 24,
        }}
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
    channel: PropTypes.instanceOf(Array),
    clientDisconnectThreshold: PropTypes.instanceOf(Array),
    probeResponseThreshold: PropTypes.instanceOf(Array),
    snrDrop: PropTypes.instanceOf(Array),
    minLoad: PropTypes.instanceOf(Array),
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
